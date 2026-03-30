---
id: connecting-to-data-sources
title: Connecting to Data Sources
sidebar_label: Connecting to Data Sources
sidebar_position: 3
---

# Connecting to Data Sources

Pyplan Enterprise can be connected to different data origins using the different Pyplan libraries available for that purpose.

## Data Exchange Between Tenants and Pyplan Cloud

There are different alternatives to have access to data placed in the customer's network from Pyplan Cloud. The main ones are:

- **[Data synchronization using Secure File Transfer Protocol (sFTP)](https://docs.pyplan.com/technical-docs/connecting-to-data-sources/sftp)** — Use Pyplan's sFTP server to synchronize files between your environment and Pyplan Cloud.
- **Use of specific Python libraries** — Python clients for the main cloud providers (AWS, Azure, GCP):
  - [Azure Datalake Connection](https://docs.pyplan.com/technical-docs/connecting-to-data-sources/az-datalake-conn)
  - [GCP - BigQuery Connection](https://docs.pyplan.com/technical-docs/connecting-to-data-sources/gcp-big-query)
  - [Snowflake Connection](https://docs.pyplan.com/technical-docs/connecting-to-data-sources/snowflake)
  - Others
- **[Integration using APIs](https://docs.pyplan.com/user-guide/app-management/api-endpoints)** — Use Pyplan's REST API to exchange data programmatically.
- **[Connecting with Power BI using Pyplan APIs](https://docs.pyplan.com/technical-docs/connecting-to-data-sources/powerbi)** — Integrate Pyplan output data directly with Power BI dashboards.
