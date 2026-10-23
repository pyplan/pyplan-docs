---
id: deployments-and-requirements
title: Deployments and Requirements
sidebar_label: Deployments and Requirements
sidebar_position: 2
---

# Deployment Options

Pyplan offers several deployment options:

- **Pyplan Enterprise SaaS**: In order to ensure a strong, secure foundation, Pyplan Cloud shares security responsibilities with an industry-leading cloud infrastructure provider and valued partner such as Amazon Web Services. These cloud computing services are used by Pyplan for internal purposes as well as Pyplan clients for their own cloud deployments.
- **On customer cloud**: Pyplan can be deployed in customer clouds (AWS, Azure, Google Cloud, OCI) using the Kubernetes service provided by each cloud provider.

## Pyplan Enterprise SaaS

Pyplan Cloud solution offers businesses a world-class analytics and planning platform without the complexities of installing and managing their own deployment. For more details refer to [Pyplan Cloud Architecture](./pyplan-cloud-architecture).

## On Customer Cloud

Pyplan runs on the managed Kubernetes service of each cloud provider. The building blocks are the same everywhere; what changes is the cloud service that provides each one.

| Building block | AWS | Azure | Google Cloud |
|---|---|---|---|
| Kubernetes cluster | Amazon EKS | Azure Kubernetes Service (AKS) | Google Kubernetes Engine (GKE) |
| Infrastructure as code | CloudFormation | Terraform | Terraform |
| Ingress | Application Load Balancer + AWS WAF | Gateway API (AKS application routing) | Gateway API (GKE Gateway controller) |
| TLS certificate | AWS Certificate Manager | Azure Key Vault | Certificate Manager |
| PostgreSQL 16 | Amazon RDS | Azure Database for PostgreSQL Flexible Server | In the cluster, or Cloud SQL |
| Shared file storage (`/data`) | Amazon EFS | Azure Files Premium | Filestore |
| Secrets | AWS Secrets Manager | Azure Key Vault | Secret Manager |
| Container images | Amazon ECR | Azure Container Registry | Docker Hub or Artifact Registry |

### Common requirements

These apply to every cloud. The sections below list what each provider needs on top of them.

- **Kubernetes**: a private cluster on a supported version — K8S API supported: `v1.34`, `v1.35`, `v1.36`.
- **Two kinds of nodes**, each with its own label:
  - **Application nodes** (`env: Pyplan`) for the API, UI, WebSocket, Celery workers, the AI component (MCP), Redis and Argo CD.
  - **Engine nodes** for the calculation engines. Each connected user gets an engine pod that is removed when the session ends, so this node pool scales with **concurrent users, not licensed users**, and can scale to zero.
- **Pyplan resource namespace** (`pyplan` by default).
- **PostgreSQL 16** with `max_connections` set to 1000, reachable only from the cluster.
- **Shared file system** (ReadWriteMany) mounted at `/data`: user models and the daily database dumps. It must be backed up daily.
- **Redis** for the user sessions. It runs in the cluster with persistence on its own disk, so restarting it does not log users out.
- **A DNS name with a valid TLS certificate.** HTTP is redirected to HTTPS.
- **Outbound Internet access** to pull or import the container images during installation and updates, and to the AI provider if the Pyplan AI features are enabled.
- **Administrative access** through a CI/CD pipeline with workload identity federation (recommended). No long-lived cloud keys are stored in the pipeline.
- **Argo CD** for continuous deployment *(recommended)*: it keeps the cluster in sync with a Git branch, so updating or rolling back Pyplan is a commit.
- **Container images**: `pyplan_ui`, `pyplan_api`, `pyplan_engine` (Arm or x86 builds), `redis:alpine`, `busybox` and `bitnami/kubectl` for maintenance tasks, and `pyplan_ai` if the AI integration is enabled.

### AWS

![Pyplan architecture on Amazon EKS](./img/deployments/pyplan-architecture-aws-eks.png)

**Network**

- VPC with 3 public and 3 private subnets in different Availability Zones. A `/16` (65,536 addresses) is enough.
- DNS hostnames and DNS resolution enabled.
- One NAT gateway per public subnet, and route tables that send the private subnets' Internet traffic through them.
- Subnet tags for Karpenter: `kubernetes.io/role/internal-elb: 1` and `karpenter.sh/discovery: [CLUSTER_NAME]`.
- Private hosted zone in Route 53 for the EFS and RDS endpoints *(optional)*.

**EKS cluster**

- Private API endpoint; worker nodes only in the private subnets.
- EKS add-ons: EKS Pod Identity, EFS CSI driver, EBS CSI driver, Secrets Store CSI provider, VPC CNI, kube-proxy, CoreDNS and Metrics Server.
- **Karpenter** for node autoscaling, and the **AWS Load Balancer Controller** for the ingress.
- Application node group: `c7g.xlarge` (4 vCPU / 8 GB, Graviton), label `env: Pyplan`, Amazon Linux 2023 Arm, 2 – 4 nodes.
- Engine nodes: provisioned by Karpenter, label `env: PyplanArmEngines`, Amazon Linux 2023.

**Database: Amazon RDS for PostgreSQL**

- PostgreSQL 16, Multi-AZ, `db.t3.small` as the minimum instance class, 20 GB of storage.
- Parameter group with `max_connections: 1000`.
- No public access; security group that only allows port 5432 from the cluster security group.
- Automated backups with 30 days of retention, and encryption at rest.

**Storage: Amazon EFS**

- EFS Standard (Multi-AZ), General Purpose performance mode, encryption at rest.
- One mount target per private subnet; security group that only allows port 2049 (NFS) from the cluster security group.
- Daily backup with AWS Backup.

**Ingress, TLS and secrets**

- Application Load Balancer (internet-facing or internal) created by the AWS Load Balancer Controller, with the TLS certificate in **AWS Certificate Manager** and an **AWS WAF** web ACL.
- Application secrets in **AWS Secrets Manager**, read by the pods through the Secrets Store CSI driver and EKS Pod Identity.
- Container images in a private **Amazon ECR** repository *(recommended)*.

**Administrative access**

- CI/CD pipeline authenticated with OIDC, with separate roles for the infrastructure and for the cluster configuration.
- Bastion host *(optional)*: a private instance without inbound ports, reached through AWS Systems Manager. If the customer already has CI/CD or an equivalent secure access path, Pyplan adapts to it.

### Azure

![Pyplan architecture on Azure Kubernetes Service](./img/deployments/pyplan-architecture-azure-aks.png)

**Network**

**Azure CNI Overlay with the Cilium data plane.** The VNet only provides one address per node and per private endpoint; pods get their addresses from a Pod CIDR outside the VNet, so a `/25` VNet is enough.

| Subnet | Example CIDR | Purpose |
|---|---|---|
| Cluster VNet | `10.50.0.0/25` | Address space of the cluster and its private services |
| Nodes | `10.50.0.0/26` | Nodes of the three node pools and the internal load balancer IP |
| Private endpoints | `10.50.0.64/27` | PostgreSQL, Storage Account, Container Registry and Key Vault |
| Gateway *(optional)* | `10.50.0.96/27` | Azure Application Gateway, if the design requires one |
| Pod CIDR (outside the VNet) | `10.244.0.0/16` | Pod addresses; not routed, but must not overlap the corporate network |
| Service CIDR (outside the VNet) | `172.20.0.0/23` | Kubernetes Service addresses; must not overlap the corporate network |

**AKS cluster**

- Private cluster, Standard tier, with Microsoft Entra ID integration and Azure RBAC (no local accounts).
- Three node pools, each with a 128 GB OS disk per node:

| Node pool | VM size | Nodes | Label / taint | Runs |
|---|---|---|---|---|
| System | `Standard_D4ps_v6` (4 vCPU / 16 GB) | 2 – 3 | taint `CriticalAddonsOnly` | AKS critical pods only |
| Pyplan Core | `Standard_D4ps_v6` (4 vCPU / 16 GB) | 3 – 9 | `env: Pyplan` | Pyplan application pods |
| Engines | `Standard_E16ps_v6` (16 vCPU / 128 GB) | 0 – 10 | `env: PyplanEngines` | Calculation engines |

- With engines of 1 vCPU / 8 GB, a `Standard_E16ps_v6` holds 14 sessions: engine nodes at peak = concurrent users × 1.2 / 14, rounded up (100 concurrent users → 9 nodes).
- AKS application routing add-on with **Gateway API** enabled: an Istio-based gateway for ingress only, with no service mesh.

**Database: Azure Database for PostgreSQL Flexible Server**

- PostgreSQL 16, General Purpose, `GP_Standard_D2s_v3` (2 vCores, 8 GB RAM) and 32 GB of storage as the minimum.
- Automated backups with point-in-time restore, 30 days of retention, geo-redundant. Zone-redundant high availability *(optional)*.
- Authentication with Microsoft Entra ID (managed identity) and password. Public network access denied; access through a private endpoint.
- `max_connections: 1000` and all the PostgreSQL extensions enabled.

**Storage: Azure Files Premium**

- Premium storage account (FileStorage, `Premium_LRS`) with a file share of at least 100 GB, accessed through a private endpoint.
- Daily backup with Azure Backup, 30 days of retention.
- Pyplan grows the share by 20% when it passes 80% of its size, up to a configurable limit.

**Security and images**

- **Azure Key Vault** (RBAC authorization, private endpoint) for the application secrets and the TLS certificate, read by the pods through the Secrets Store CSI driver with a managed identity.
- **Azure Container Registry** with a private endpoint: the images are imported into it and the nodes pull them with the kubelet managed identity.
- **Managed identities** for Key Vault, Container Registry and PostgreSQL: no passwords or API keys between services.

**Access and Internet**

- CI/CD pipeline authenticated with workload identity federation (recommended); people access the cluster with their Microsoft Entra ID account. No bastion machine: ad-hoc operations use `az aks command invoke`.
- Permanent outbound access to the destinations AKS requires to operate (Microsoft's *Outbound network and FQDN rules for AKS clusters*); it can go through the corporate firewall.

### Google Cloud

![Pyplan architecture on Google Kubernetes Engine](./img/deployments/pyplan-architecture-gcp-gke.png)

**Network**

VPC-native networking: one subnet for the nodes, with two secondary ranges for the pods and the Services. Pod and Service addresses are VPC addresses, so they must not overlap the corporate network or its peerings.

| Range | Example CIDR | Purpose |
|---|---|---|
| Cluster subnet (primary) | `10.0.0.0/18` | One address per node; Private Google Access enabled |
| Pods (secondary) | `10.48.0.0/14` | A `/24` per node, up to 110 pods per node |
| Services (secondary) | `10.52.0.0/20` | Kubernetes Service addresses |

- Cloud Router and Cloud NAT for outbound traffic, with static external IPs to allowlist in third-party firewalls.
- The control plane needs no range of its own: it connects through Private Service Connect.

**GKE cluster**

- GKE Standard, **regional** cluster, Kubernetes `1.36` on the REGULAR release channel, nodes in two zones.
- **GKE Dataplane V2** (eBPF), which enforces the NetworkPolicies. It can only be selected when the cluster is created.
- Private nodes (no external IPs). Control plane access through the **DNS-based endpoint**, authorized with IAM (`container.clusters.connect`) and recorded in Cloud Audit Logs: no bastion VM and no authorized networks.
- Add-ons: HTTP Load Balancing, Gateway API (Standard channel), Horizontal Pod Autoscaling, Filestore CSI driver, Workload Identity and Secret Manager secret sync.
- Two node pools on Arm (C4A, Google Axion), each with a 128 GB Hyperdisk Balanced boot disk per node (C4A only supports Hyperdisk). Sizing for 200 concurrent users with engines of 0.5 vCPU / 2 GiB:

| Node pool | Machine type | Nodes | Label | Runs |
|---|---|---|---|---|
| `pyplan` | `c4a-standard-8` (8 vCPU / 32 GB) | 3 – 6 | `env: Pyplan` | Application pods, Redis, PostgreSQL, Argo CD |
| `pyplan-engines` | `c4a-standard-16` (16 vCPU / 64 GB) | 0 – 10 | `env: PyplanArmEngines` | Calculation engines (about 28 per node) |

- Regional quota for this sizing: about 232 C4A vCPUs and 2.4 TB of Hyperdisk Balanced, counting one upgrade node per pool.

**Database: PostgreSQL**

- By default PostgreSQL 16 runs in the cluster, with reserved resources (4 vCPU / 16 GiB) and its own 100 GiB Hyperdisk.
- **Cloud SQL for PostgreSQL** is also supported: 4 vCPUs / 15 GB recommended, SSD storage, high availability and point-in-time recovery for production, private IP only.

**Storage: Filestore**

- Created dynamically by the Filestore CSI driver (StorageClass `pyplan-filestore`) in the cluster's VPC.
- Tier `basic_hdd` (`basic_ssd` for production), 1 TB minimum, ReadWriteMany.
- NFS (port 2049) allowed from the GKE nodes. Daily backup of the instance.

**Ingress, TLS and secrets**

- **GKE Gateway controller** (`gke-l7-global-external-managed`): a global external Application Load Balancer with container-native load balancing to the pods, on a reserved static IP address.
- The TLS certificate in **Certificate Manager**, and an SSL policy with the `RESTRICTED` profile and TLS 1.2 as the minimum version.
- Application secrets in **Secret Manager**, copied into the cluster by GKE secret sync with Workload Identity.

**Access**

- CI/CD pipeline authenticated with Workload Identity Federation (no service account keys), impersonating a service account with only the GKE, network, Certificate Manager and Secret Manager roles it needs.

### Oracle

- OKE cluster — K8S API supported: `v1.32`, `v1.33`, `v1.34`
- Node pools with a specific label
- Enable OKE add-ons:
  - OKE Autoscaling Driver
- Pyplan resource namespace
- Argo CD for continuous deployment *(optional)*
- NGINX ingress controller
- File system in FSS as persistent volume
- Bastion host — Linux OS in case CI/CD environments are not used
- Internet access to:
  - Install Pyplan with a Helm chart and synchronize the application with Argo CD *(optional)*
  - AWS S3 service to update Pyplan AI-powered assistant bots *(optional)*
  - OpenAI API for AI-powered assistant bots *(optional)*
- A DNS with a valid SSL certificate
