---
id: faqs
title: Frequently Asked Questions
sidebar_label: Frequently Asked Questions
sidebar_position: 1
---

# Frequently Asked Questions

Welcome to the Pyplan Frequently Asked Questions (FAQ) page. This section serves as a comprehensive resource for addressing common queries regarding Pyplan.

Our FAQ page is designed to provide concise and precise answers to your inquiries, ranging from basic usage to advanced functionalities. We prioritize clarity and accuracy to ensure you can quickly find the information you need.

## About Pyplan

### What is Pyplan?

Pyplan is a no-code / low-code platform for building and sharing Planning and Analytics applications. It enables teams to create interactive dashboards, planning models, and data-driven applications without requiring deep programming expertise.

### How to complete your first login on Pyplan?

When you receive your invitation email, click the activation link to set your password. Then navigate to your organization's Pyplan URL and enter your credentials. If your organization uses SSO (SAML 2.0), you will be redirected to your identity provider for authentication.

### How to set up Multifactor Authentication?

Multifactor Authentication (MFA) can be configured from your user profile settings. Go to **Profile → Security** and follow the steps to enable MFA using an authenticator app (e.g., Google Authenticator or Microsoft Authenticator).

### How can I change my password in Pyplan?

1. Click on your user avatar in the top-right corner.
2. Select **Profile**.
3. Navigate to the **Security** tab.
4. Enter your current password and then your new password.
5. Click **Save**.

### How can I reset my password if I forget it?

On the login page, click **Forgot password?** and enter your registered email address. You will receive an email with a link to set a new password. If your organization uses SSO, contact your system administrator instead.

### I activate the option to view totals in tables but they are not displayed.

This can occur when the node computing the totals is not configured to aggregate along the required dimension. Make sure that:

- The dimension used for totals is correctly defined in the model.
- The aggregation function (e.g., `sum`, `mean`) is applied along the correct axis.
- The interface component's totals option is enabled both at the node level and the interface level.

---

## About Apps

### How can I import data from external sources into my Pyplan app?

Pyplan supports multiple methods for connecting to external data:

- **File upload**: Upload CSV, Excel, or other files directly via the File Manager.
- **Python libraries**: Use standard Python libraries (`pandas`, `boto3`, `pyodbc`, etc.) within your model nodes to connect to databases, cloud storage, or APIs.
- **sFTP**: Synchronize files using Pyplan's Secure File Transfer Protocol server.
- **Cloud integrations**: Connect to Azure Data Lake, GCP BigQuery, Snowflake, and others using the available Python connectors.
- **REST APIs**: Use Pyplan's API endpoints for programmatic data exchange.

For more details, see [Connecting to Data Sources](/technical-docs/connecting-to-data-sources).

### Can I share an interface with non-Pyplan users?

Yes. Pyplan allows you to publish interfaces as public-facing applications. You can configure access so that external users can view or interact with specific interfaces without requiring a full Pyplan account. Contact your administrator for configuration options.

### How to open an app in a new instance from within an already open app?

You can open an app in a new browser tab by holding **Ctrl** (or **Cmd** on macOS) and clicking on the app link, or by right-clicking and selecting **Open in new tab**. Within the Pyplan interface, some navigation components also support multi-instance behavior — consult the app designer for app-specific navigation options.
