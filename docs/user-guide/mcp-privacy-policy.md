---
sidebar_position: 15
title: MCP Privacy Policy
description: Privacy policy for the Pyplan Model Context Protocol (MCP) connector.
---

# Privacy Policy — Pyplan MCP Connector

**Last updated:** June 15, 2026

This Privacy Policy explains how Pyplan ("Pyplan", "we", "us") collects, uses, and protects information when you connect a Pyplan tenant to an AI assistant — such as Anthropic's Claude — through the Pyplan Model Context Protocol (MCP) connector (the "Connector").

This policy applies only to the Connector. Your use of the underlying Pyplan platform is governed by the [Pyplan Terms of Service](https://pyplan.com/) and the master privacy policy of the Pyplan deployment you are signed in to.

---

## 1. Who is the data controller

The data controller for personal data processed through the Connector is the organization that owns the Pyplan tenant you connect to. Pyplan acts as a data processor on behalf of that organization, in accordance with the customer agreement in place.

For questions about this policy, contact: **support@pyplan.com**.

---

## 2. What the Connector does

The Connector is a Model Context Protocol server that exposes a controlled set of operations against a Pyplan tenant so an AI assistant can, on behalf of an authenticated user:

- List Pyplan applications the user has access to.
- Open, close, and read metadata of those applications.
- Read results from model nodes (tables, cubes, indicators).
- Execute tools that the application's author has explicitly exposed (for example, scenario simulations or report generation).
- Create, save, and list application versions.

The Connector does not give the AI assistant any access beyond what the authenticated Pyplan user is already permitted to do through the Pyplan UI. All role, department, team, and company permissions configured in Pyplan are enforced server-side.

---

## 3. Information we process

When you use the Connector, the following categories of data may be processed:

**Account and authentication data**
- Pyplan user identifier, username, email, company, department, and role.
- OAuth tokens (access and refresh tokens) issued to the Connector to act on your behalf.
- MFA / SSO session information passed through during authentication.

**Application data**
- The contents and outputs of Pyplan applications you choose to interact with through the assistant: node results, model inputs, scenario outputs, app metadata, and version history.
- Any data you instruct the assistant to write back to Pyplan (for example, new scenario versions or updated inputs).

**Operational and request data**
- The tool calls the assistant makes to the Connector, the parameters provided, and the responses returned.
- Timestamps, source IP address, request identifiers, and basic error/diagnostic information.

We do not collect special categories of personal data (such as health or biometric data) through the Connector.

---

## 4. Where the data comes from and where it goes

Data flows as follows:

1. **You → AI assistant.** You type a prompt to the assistant (for example, Claude).
2. **AI assistant → Connector.** The assistant calls the Connector using the OAuth token issued for your session.
3. **Connector → Pyplan tenant.** The Connector calls the Pyplan API, scoped to your user's permissions.
4. **Pyplan tenant → Connector → AI assistant.** Results are returned to the assistant so it can respond to you.

The AI assistant provider (for example, Anthropic) processes the prompts and the data returned by the Connector under its own privacy policy. Pyplan does not control how the assistant provider stores or uses that data once it leaves the Connector; please review the provider's policy (for Claude: [https://www.anthropic.com/legal/privacy](https://www.anthropic.com/legal/privacy)).

---

## 5. How we use the information

Pyplan uses the information processed by the Connector to:

- Authenticate you and authorize each request against your Pyplan permissions.
- Execute the operations you request through the assistant.
- Maintain availability, security, and integrity of the Connector and the underlying Pyplan service.
- Diagnose errors and improve reliability.
- Comply with legal obligations and enforce our terms.

We do not use the contents of your applications, model data, or prompts to train AI models.

---

## 6. Legal bases for processing (GDPR)

Where the EU General Data Protection Regulation applies, Pyplan relies on the following legal bases:

- **Performance of a contract** with the Pyplan customer that owns the tenant.
- **Legitimate interests** in securing, operating, and improving the Connector.
- **Legal obligation** where required by applicable law.
- **Consent**, where you have explicitly enabled the Connector for your account.

---

## 7. Sharing with third parties

Pyplan does not sell personal data. We share data only with:

- **The AI assistant provider** you have chosen to connect (for example, Anthropic), strictly as needed to fulfill the requests you initiate.
- **Cloud infrastructure providers** that host Pyplan and the Connector (such as AWS, Azure, GCP, or OCI), under data processing agreements.
- **Authorities**, when legally required.

All subprocessors are bound by confidentiality and data protection obligations consistent with this policy.

---

## 8. Data location and international transfers

The Connector does **not** move data between regions. Each request is routed to the single Pyplan tenant you authenticated against, and data stays within that tenant's hosting region.

Pyplan tenants are hosted in one of the following ways, chosen by the customer at provisioning time:

- **Pyplan Cloud — United States** (AWS, US East / N. Virginia region).
- **Pyplan Cloud — Europe** (AWS, EU region).
- **Customer-hosted deployment**, in the customer's own AWS, Azure, GCP, or OCI account, in the region the customer selects.

Pyplan does not replicate, mirror, or transfer tenant data between these regions. A tenant provisioned in Europe is served entirely from Europe; a tenant provisioned in the United States is served entirely from the United States; a customer-hosted tenant is served entirely from the customer's own cloud account.

If you are located in a different region from your tenant (for example, an EU-based user accessing a US-hosted tenant chosen by your organization), the request you make through the Connector travels to that tenant's region in order to be served — this is the same data path you already use when accessing Pyplan through the browser, and no additional copy of the data is created by the Connector.


---

## 9. Data retention

- **OAuth tokens** are retained for the lifetime of the authorized session and are revoked when you disconnect the Connector or rotate credentials.
- **Operational logs** (tool calls, timestamps, error data) are retained for up to 90 days for security, debugging, and abuse prevention, then deleted or anonymized.
- **Application data** itself is not duplicated by the Connector — it remains in your Pyplan tenant under your tenant's retention policy.

---

## 10. Security

Pyplan applies industry-standard technical and organizational measures, including:

- TLS 1.2+ in transit for all Connector traffic.
- Encryption at rest for stored tokens and logs.
- Strict scoping of OAuth tokens to a single user and tenant.
- Server-side enforcement of Pyplan role, department, team, and company permissions.
- Optional multi-factor authentication and SSO at the Pyplan tenant level.
- Regular vulnerability scanning and access reviews.

No system is perfectly secure; if you suspect a security issue, please contact **support@pyplan.com**.

---

## 11. Your rights

Depending on your jurisdiction, you may have the right to access, correct, delete, port, or restrict processing of your personal data, and to object to certain processing. To exercise these rights:

- For data inside your Pyplan tenant, contact your tenant administrator first.
- For requests to Pyplan as a processor or controller, contact **support@pyplan.com**.

You may also disconnect the Connector at any time from your AI assistant's settings, which revokes its access to your Pyplan tenant.

---

## 12. Children

The Connector is not directed to children under 16, and Pyplan does not knowingly process personal data of children through the Connector.

---

## 13. Changes to this policy

We may update this policy from time to time. Material changes will be announced through Pyplan documentation and, where appropriate, through in-product notice. The "Last updated" date at the top of this page reflects the most recent revision.

---

## 14. Contact

**Pyplan**
Privacy: support@pyplan.com
Security: support@pyplan.com
Website: [https://pyplan.com](https://pyplan.com)
Documentation: [https://docs.pyplan.com](https://docs.pyplan.com)
