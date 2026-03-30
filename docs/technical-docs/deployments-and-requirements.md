---
id: deployments-and-requirements
title: Deployments and Requirements
sidebar_label: Deployments and Requirements
sidebar_position: 2
---

# Deployment Options

Pyplan offers several deployment options:

- **Pyplan Enterprise SaaS**: In order to ensure a strong, secure foundation, Pyplan Cloud shares security responsibilities with an industry-leading cloud infrastructure provider and valued partner such as Amazon Web Services. These cloud computing services are used by Pyplan for internal purposes as well as Pyplan clients for their own cloud deployments.
- **On customer cloud**: Pyplan can be deployed in customer clouds (AWS, Azure, GCP, OCI) using the Kubernetes service provided by each cloud provider.

## Pyplan Enterprise SaaS

Pyplan Cloud solution offers businesses a world-class analytics and planning platform without the complexities of installing and managing their own deployment. For more details refer to [Pyplan Cloud - AWS](./pyplan-cloud-aws).

## On Customer Cloud

Pyplan can be deployed on all major cloud providers using the Kubernetes service. The services required depend on each provider.

### AWS

- VPC
- EKS cluster — K8S API Supported: `v1.32`, `v1.33`, `v1.34`
- Enable EKS Add-ons:
  - EKS IAM-oidc-provider
  - EFS-CSI Driver
  - EKS Autoscaling Driver
- PostgreSQL RDS instance
- EKS nodegroups with a specific label
- Argo-CD for continuous deployment *(Optional)*
- Pyplan resource namespace
- ALB ingress controller
- Kubernetes Metrics Server
- Fileshare in EFS as persistent volume
- Bastion host — Linux OS, aws CLI and eksctl CLI in case CI/CD environments are not used
- SSL certificate (AWS ACM)

### Azure

- AKS cluster — K8S API Supported: `v1.32`, `v1.33`, `v1.34`
- PostgreSQL Flexible server
- AKS nodepools with a specific label
- Pyplan resource namespace
- NGINX ingress controller
- Argo-CD for continuous deployment *(Optional)*
- Storage accounts:
  - Azure-file premium as persistent volume
  - A daily backup of the Azure-file created by the Pyplan application, once it is synchronized with Argo-CD *(Optional)*
- Internet access to:
  - Install Pyplan with a helm chart and synchronize the application with Argo-CD *(Optional)*
  - AWS S3 service to update Pyplan AI-powered assistant bots *(Optional)*
  - OpenAI API for AI-powered assistant bots *(Optional)*
- A DNS with a valid SSL certificate
- Azure VM Bastion machine for cluster control in case CI/CD environments are not used
- Azure Key Vault for secrets management *(Optional)*
- Azure Container Registry for private docker image management *(Optional)*
- Integration with Azure Managed Identity *(Optional)*

### Google

- GKE cluster — K8S API Supported: `v1.32`, `v1.33`, `v1.34`
- GKE nodepools with a specific label
- Pyplan resource namespace
- Argo-CD for continuous deployment *(Optional)*
- GKE ingress controller
- File Storage:
  - Fileshare as persistent volume (Filestorage CSI Addon enabled)
  - A daily backup of the Bucket files
- Bastion host — Linux OS in case CI/CD environments are not used
- Internet access to:
  - Install Pyplan with a helm chart and synchronize the application with Argo-CD *(Optional)*
  - AWS S3 service to update Pyplan AI-powered assistant bots *(Optional)*
  - OpenAI API for AI-powered assistant bots *(Optional)*
- A DNS with a valid SSL certificate (pre-shared Certificate)

### Oracle

- OKE cluster — K8S API Supported: `v1.32`, `v1.33`, `v1.34`
- Nodepools with a specific label
- Enable OKE Add-ons:
  - OKE Autoscaling Driver
- Pyplan resource namespace
- Argo-CD for continuous deployment *(Optional)*
- NGINX ingress controller
- File system in FSS as persistent volume
- Bastion host — Linux OS in case CI/CD environments are not used
- Internet access to:
  - Install Pyplan with a helm chart and synchronize the application with Argo-CD *(Optional)*
  - AWS S3 service to update Pyplan AI-powered assistant bots *(Optional)*
  - OpenAI API for AI-powered assistant bots *(Optional)*
- A DNS with a valid SSL certificate
