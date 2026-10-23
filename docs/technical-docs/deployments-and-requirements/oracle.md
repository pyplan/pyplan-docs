---
id: oracle
title: Oracle (OCI Kubernetes Engine)
sidebar_label: Oracle
sidebar_position: 5
---

# Oracle (OCI Kubernetes Engine)

Pyplan runs on Oracle Cloud Infrastructure with OCI Kubernetes Engine (OKE). The application is deployed with a Helm chart, optionally synchronized by Argo CD.

## Requirements

On top of the [common requirements](./deployments-summary#common-requirements):

### OKE cluster

- OKE cluster — K8S API supported: `v1.32`, `v1.33`, `v1.34`.
- Node pools with a specific label.
- OKE add-ons: OKE Autoscaling Driver.
- Pyplan resource namespace.
- Argo CD for continuous deployment *(optional)*.

### Ingress and storage

- NGINX ingress controller.
- File system in File Storage (FSS) as persistent volume.
- A DNS with a valid SSL certificate.

### Access and Internet

- Bastion host — Linux OS, in case CI/CD environments are not used.
- Internet access to:
  - Install Pyplan with a Helm chart and synchronize the application with Argo CD *(optional)*.
  - AWS S3 service to update Pyplan AI-powered assistant bots *(optional)*.
  - OpenAI API for AI-powered assistant bots *(optional)*.

## Related articles

- [Deployments and Requirements: Summary](./deployments-summary)
