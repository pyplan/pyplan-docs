---
id: az-datalake-conn
title: Azure Datalake Connection
sidebar_label: Azure Datalake
sidebar_position: 3
---

# Azure Datalake Connection

## Requirements

### Default

- `account_name`: Storage Account name
- `file_system`: File System name of the Datalake
- `tenant_id`: Directory Id of the Service Principal associated with the Datalake
- Enable the firewalls in the Datalake: Request the corresponding IPs to the Pyplan Team.

### ClientSecretCredential

- `client_id`: Application ID of the Service Principal associated with the Datalake.
- `client_secret`: Client secret of the Service Principal associated with the Datalake.

### SharedKeyCredential

- `sas_token`: To connect to Azure Data Lake Storage Gen2 using a SAS token, the `SharedKeyCredential` class must be used instead of `ClientSecretCredential`.

---

## Different types of connections according to credential type

### Connection - ClientSecretCredential

Integration through a Service Principal together with its `clientId` and secret respectively.

```python
from azure.storage.filedatalake import DataLakeServiceClient
from azure.core.exceptions import ResourceExistsError
from azure.core._match_conditions import MatchConditions
from azure.storage.filedatalake._models import ContentSettings
from azure.identity import ClientSecretCredential
import os, uuid, sys

account_name = "stgexample"
client_id = '1ej6d366-5a17-1234-1e16-da015a30303d'
client_secret = 'Ama5Q~rTrmbmZGGzRAm5ieBUO6RsD23.qRRzRaum'
tenant_id = '777d4d4b-c777-6m5f-4j68-2230d441d7j2'
file_system = "data"

credential = ClientSecretCredential(tenant_id, client_id, client_secret)

account_url = "https://{}.dfs.core.windows.net/".format(account_name)

datalake_service = DataLakeServiceClient(
    account_url=account_url, credential=credential
)

result = datalake_service
```

### Connection - SharedKeyCredential

Integration through a SAS token.

```python
from azure.storage.filedatalake import DataLakeServiceClient
from azure.storage.filedatalake._models import FileSystemProperties
from azure.core._match_conditions import MatchConditions
from azure.core.exceptions import ResourceExistsError
from azure.storage.filedatalake._models import ContentSettings
from datetime import datetime, timedelta
from azure.identity import ClientSecretCredential

# Example values
account_name = "stgexample"
sas_token = "sas_token"
file_system_name = "data"

account_url = f"https://{account_name}.dfs.core.windows.net/?{sas_token}"

# Initialize DataLakeServiceClient with SAS token
datalake_service_client = DataLakeServiceClient(account_url=account_url)

# Example: Create a new file system
try:
    file_system_client = datalake_service_client.create_file_system(file_system=file_system_name)
    print("File system created:", file_system_client.url)
except ResourceExistsError:
    print("File system already exists.")

# Example: List file systems
file_systems = datalake_service_client.list_file_systems()
print("List of file systems:")
for fs in file_systems:
    print(fs.name)
```

### Connection - SharedKeyCredential with Azure Key Vault

Integration through a SAS token obtained from Azure Key Vault.

```python
from azure.storage.filedatalake import DataLakeServiceClient
from azure.core._match_conditions import MatchConditions
from azure.core.exceptions import ResourceExistsError
from azure.storage.filedatalake._models import ContentSettings
from datetime import datetime, timedelta
from azure.identity import DefaultAzureCredential
from azure.keyvault.secrets import SecretClient
from azure.identity import ChainedTokenCredential
import json

# Example Values
account_name = "stgexample"
vault_name = "key_vault_name"
sas_secret_name = "sas_secret_name"
file_system_name = "data"

# Get the client ID, tenant ID, and client secret from a secret json
with open("config.json", "r") as f:
    config = json.load(f)

client_id = config["azure"]["client_id"]
tenant_id = config["azure"]["tenant_id"]

# Initialize the DefaultAzureCredential which uses environment variables,
# managed identity, or shared token cache for authentication
credential = ChainedTokenCredential(DefaultAzureCredential())

# Initialize the Key Vault client
key_vault_uri = f"https://{vault_name}.vault.azure.net/"
secret_client = SecretClient(vault_url=key_vault_uri, credential=credential)

# Get the SAS token from Azure Key Vault
sas_token = secret_client.get_secret(sas_secret_name).value

account_url = f"https://{account_name}.dfs.core.windows.net/?{sas_token}"

# Initialize DataLakeServiceClient with SAS token
datalake_service_client = DataLakeServiceClient(account_url=account_url)

# Example: Create a new file system
try:
    file_system_client = datalake_service_client.create_file_system(file_system=file_system_name)
    print("File system created:", file_system_client.url)
except ResourceExistsError:
    print("File system already exists.")

# Example: List file systems
file_systems = datalake_service_client.list_file_systems()
print("List of file systems:")
for fs in file_systems:
    print(fs.name)
```

---

## Related articles

- [Create an Azure Service Principal](https://learn.microsoft.com/en-us/azure/databricks/getting-started/connect-to-azure-storage#--step-1-create-an-azure-service-principal)
- [Data Lake Storage directory, file, and ACL management (Python)](https://learn.microsoft.com/en-us/azure/storage/blobs/data-lake-storage-directory-file-acl-python?tabs=azure-ad)
