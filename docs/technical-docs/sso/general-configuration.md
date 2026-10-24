---
sidebar_position: 3
title: General Configuration 
---

# General Configuration

## Metadata File

- Available in one of the following formats:
  - Public URL
  - XML file

## Mandatory Attributes

- **Attributes Names**:
  - **givenName**
    - Attribute Value "User name"
    - type "basic"
  - **surname**
    - Attribute Value "User last name"
    - type "basic"
  - **email**
    - Attribute Value "User email"
    - type "basic"
  - **role (Optional)**
    - Attribute Value "User permission group name"
    - type "basic"
  - **department (Optional)**
    - Attribute Value "User department group name"
    - type "basic"

For more information on the use of Role&Department, please see [Security Options](/user-guide/security-options)

## Identity Providers That Reject the `code` Parameter

Some identity providers, such as Keycloak, reject return URLs that contain reserved OAuth/OIDC query parameters like `code`. For them, Pyplan accepts the company code in the URL path. See [Keycloak](./keycloak.md).

