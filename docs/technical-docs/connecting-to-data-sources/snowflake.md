---
id: snowflake
title: Snowflake Connection
sidebar_label: Snowflake
sidebar_position: 5
---

# Snowflake Connection

## Requirements

### Default

- `account`: Organization Account (e.g. `xxx.snowflakecomputing.com`)
- `user`: User who will access the database
- `private_key`: Private key (usually an RSA key of type `.p8`)
- `database`: Database name
- `schema`: Schema name
- Enable the firewalls in the Snowflake Endpoint: Request the corresponding IPs to the Pyplan Team.

---

## Connections according to credential type

### Connection - Private Key RSA

Integration with the Snowflake Python connector using an RSA key:

```python
import snowflake.connector as sc
from cryptography.hazmat.primitives import serialization

key_path = "rsa_key_pyplan.p8"  # Set as secret on the Pyplan platform
key_pass = b'xxxx'              # Set as secret on the Pyplan platform

# Open the private key file
with open(key_path, "rb") as key:
    private_key = serialization.load_pem_private_key(
        key.read(),
        password=key_pass
    )

# Connect using the private_key object
ctx = sc.connect(
    account='xxx.snowflakecomputing.com',
    user='PYPLAN_XXX',
    private_key=private_key,
    database='xxx',
    schema='xxx'
)

# Query
cs = ctx.cursor()
try:
    cs.execute("SELECT current_version()")
    print("Snowflake version:", cs.fetchone()[0])
finally:
    cs.close()
    ctx.close()
```

---

## Related articles

- [Snowflake Python Connector — Connecting](https://docs.snowflake.com/en/developer-guide/python-connector/python-connector-connect)
