---
id: gcp-big-query
title: GCP - BigQuery Connection
sidebar_label: GCP BigQuery
sidebar_position: 4
---

# GCP - BigQuery Connection

## Requirements

To connect to the `google-cloud-bigquery` library, a Credentials file associated with the BigQuery project is required. Example structure:

```json
{
  "type": "service_account",
  "project_id": "xxxx",
  "private_key_id": "xxxx",
  "private_key": "-----BEGIN PRIVATE KEY-----\nPRIVATE_KEY_CONTENT\n-----END PRIVATE KEY-----\n",
  "client_email": "xxxx",
  "client_id": "xxxx",
  "auth_uri": "xxxx",
  "token_uri": "xxxx",
  "auth_provider_x509_cert_url": "xxxx",
  "client_x509_cert_url": "xxxx",
  "universe_domain": "xxxx"
}
```

---

## GCP Library

Install the required library:

```bash
pip install google-cloud-bigquery
```

---

## Connection

```python
from google.cloud import bigquery
from google.oauth2 import service_account

credentials = service_account.Credentials.from_service_account_file(
    'path/to-file'
)

project_id = 'xxxx'
dataset_id = 'xxxx'
table_name = 'xxxx'

client = bigquery.Client(credentials=credentials, project=project_id)

# Test the connection with a table
table_ref = client.dataset(dataset_id).table(table_name)
table = client.get_table(table_ref)
rows = client.list_rows(table)
for row in rows:
    print(row)
```
