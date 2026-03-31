---
id: data-sources-summary
title: Summary
sidebar_label: Summary
sidebar_position: 1
---

# Connecting to Data Sources

Pyplan Enterprise can be connected to different data origins using the different Pyplan libraries available for that purpose.

## Data Exchange Between Tenants and Pyplan Cloud

There are different alternatives to have access to data placed in the customer's network from Pyplan Cloud. The main ones are:

- **[Data synchronization using Secure File Transfer Protocol (sFTP)](./sftp)** — Use Pyplan's sFTP server to synchronize files between your environment and Pyplan Cloud.
- **Use of specific Python libraries** — Python clients for the main cloud providers (AWS, Azure, GCP):
  - [Azure Datalake Connection](./az-datalake-conn)
  - [GCP - BigQuery Connection](./gcp-big-query)
  - [Snowflake Connection](./snowflake)
  - Others
- **[Integration using APIs](/user-guide/app-management/api-endpoints)** — Use Pyplan's REST API to exchange data programmatically.
- **[Connecting with Power BI using Pyplan APIs](./powerbi)** — Integrate Pyplan output data directly with Power BI dashboards.
