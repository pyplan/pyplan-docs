---
sidebar_position: 2
title: Microsoft Entra ID
---

# Microsoft Entra ID / Azure AD

# Requirements

To integrate Pyplan with Microsoft AD it will be necessary to create an **Azure Enterprise App**.

# Instructions

## Azure Portal — Microsoft Azure

Access the Azure Active Directory — App Registrations:  
[https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps](https://portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/RegisteredApps)

## Create the New App

![Enterprise Apps service](../img/sso/enterpriceapp.png)

*Enterprise Apps service*

![Create new enterprise app](../img/sso/enterpriceapp2.png)

![New app configuration](../img/sso/enterpriceapp3.png)

## Assign Users and Groups

![Assign users and groups](../img/sso/ssousers.png)

## SSO Configuration

The following section edits the connections between the IDP and Pyplan.

![SSO attributes step 1](../img/sso/ssoattributes.png)

![SSO attributes step 2](../img/sso/ssoattributes2.png)

Select the SAML configuration:

![Select SAML configuration](../img/sso/ssoattributes3.png)

Configure it with the following parameters:

| Field | Value |
|---|---|
| **Identifier (Entity ID)** | `https://[DNS_CLUSTER_INGRESS]/api/saml2/metadata/?code=[COMPANY_NAME]` |
| **Reply URL** | `https://[DNS_CLUSTER_INGRESS]/api/saml2/acs/?code=[COMPANY_NAME]` |
| **Sign On URL** | `https://[DNS_CLUSTER_INGRESS]/api/saml2/login/?next=[DNS_CLUSTER_INGRESS]&code=[COMPANY_NAME]` |
| **Relay State** | *(Empty)* |
| **Logout URL** | `https://[DNS_CLUSTER_INGRESS]/api/saml2/ls/?code=[COMPANY_NAME]` |

![SAML configuration example](../img/sso/sso-saml-config.png)

*Example*

## SAML Certificates

Edit the **Signing Option** and the **Algorithm**.

![Edit signing option and algorithm](../img/sso/saml-signing-option.png)

![Sign SAML assertion — mandatory setting](../img/sso/saml-sign-assertion.png)

:::info
The **Sign SAML assertion** setting is mandatory.
:::

## Azure Groups (Optional)

Pyplan allows matching an Azure group with a set of specific permissions within the application to facilitate the tasks of the security team.

For more information: [Security Options](/user-guide/security-options)

### Configure the Default Role & Department

The next step is to add two **Claims** to the environment with these parameters:

- **Namespace:** `http://schemas.xmlsoap.org/ws/2005/05/identity/claims`
- **Source attribute for Role & Department:** `user.usertype` *(consent with the customer)*

![Claims configuration step 1](../img/sso/azure-groups-claims-1.png)

![Claims configuration step 2](../img/sso/azure-groups-claims-2.png)

![Claims configuration step 3](../img/sso/azure-groups-claims-3.png)

![Claims configuration step 4](../img/sso/azure-groups-claims-4.png)


