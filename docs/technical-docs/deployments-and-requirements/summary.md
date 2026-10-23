---
id: deployments-summary
title: Summary
sidebar_label: Summary
sidebar_position: 1
---

# Deployments and Requirements

Pyplan offers several deployment options:

- **Pyplan Enterprise SaaS** — Pyplan Cloud offers a world-class analytics and planning platform without the complexities of installing and managing your own deployment. It shares security responsibilities with an industry-leading cloud infrastructure provider and valued partner, Amazon Web Services. For more details refer to [Pyplan Cloud Architecture](../pyplan-cloud-architecture).
- **On customer cloud** — Pyplan can be deployed in the customer's cloud using the managed Kubernetes service of each provider:
  - [AWS (Amazon EKS)](./aws)
  - [Azure (Azure Kubernetes Service)](./azure)
  - [Google Cloud (Google Kubernetes Engine)](./google-cloud)
  - [Oracle (OCI Kubernetes Engine)](./oracle)

## Building blocks on each cloud

The building blocks are the same everywhere; what changes is the cloud service that provides each one.

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

## Common requirements

These apply to every cloud. Each provider's page lists what it needs on top of them.

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
