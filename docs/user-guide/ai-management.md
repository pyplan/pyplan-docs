---
sidebar_position: 10
title: AI Management
---

# AI Management

The **AI Management** section centralizes operational visibility and configuration for AI usage in Pyplan. From this area, we can review execution traces, maintain providers and models, and define token-based pricing tiers used for cost calculation.

To open this section, we go to the left sidebar and expand **AI Management**.

:::info
In this section, access depends on permissions. We need visibility permissions to review traces, and management permissions to create, edit, or delete providers, models, and pricing tiers.
:::

## 1. AI Traces

The **AI Traces** page helps us inspect AI execution history and investigate behavior for agents, tools, and model calls.

### 1.1 What we can review in the trace list

In the main table, we can review key execution data such as:

- Workflow name
- Agent
- Provider
- Model
- Tools count
- Token usage
- Duration
- Execution date
- Status

We can also:

- Search by text from the page header search box.
- Sort columns to focus on recent or relevant executions.
- Use pagination to navigate large result sets.

### 1.2 Filters available in AI Traces

We can refine results using:

- **Provider** filter
- **Status** filter
- **Date from** and **Date to** filters

These filters help us narrow down investigations when we need to analyze a specific period, provider, or execution outcome.

### 1.3 Viewing trace detail

To inspect a specific execution, we select a row and click **View trace**.

In the detail view, we can analyze:

- The span tree of the execution
- Parent-child span relationships
- Status and duration per span
- Trace payload and error details when available

:::tip
When troubleshooting, we can first filter by status and date range, then open the trace detail to inspect spans in execution order.
:::

## 2. Providers

The **Providers** page is where we manage AI vendors available in the platform.

### 2.1 Provider list

The list displays providers with:

- **Name**
- **Code**

From this page, we can search, sort, and select a provider.

### 2.2 Creating a provider

To create a provider:

1. We click **New provider**.
2. We complete the required fields:
- **Name**
- **Code**
3. We save the record.

### 2.3 Editing and deleting a provider

To update a provider:

1. We select a provider from the table.
2. We click **Edit provider**.
3. We update fields and save.

To remove a provider:

1. We select a provider.
2. We choose **Delete provider**.
3. We confirm in the dialog.

## 3. Models

The **Models** page defines which AI models are available and how they are associated with providers.

### 3.1 Model list and filter

The table includes:

- **Model code**
- **Provider**
- **Description**
- **Active** status

We can filter by provider directly in the provider column filter and combine it with search and sorting.

### 3.2 Creating or editing a model

To create a model:

1. We click **New model**.
2. We select **Provider**.
3. We enter **Model code**.
4. We optionally add a **Description**.
5. We define whether the model is **Active**.
6. We save.

To edit a model, we select it from the list and click **Edit model**.

### 3.3 Activating or deactivating models

From the list, we can change the **Active** switch for each model. This allows us to keep model definitions while controlling operational availability.

## 4. Pricing

The **Pricing** page manages token-based pricing tiers for each model.

### 4.1 Pricing tier list

Each tier contains:

- **Model**
- **Tokens min**
- **Tokens max** (optional, unlimited when empty)
- **Input price**
- **Cache price**
- **Output price**

We can filter the table by model, and we can also search, sort, and paginate.

### 4.2 Creating or editing a pricing tier

To create a tier:

1. We click **New tier**.
2. We select the **Model**.
3. We define **Tokens min** and, optionally, **Tokens max**.
4. We enter **Input price**, **Cache price**, and **Output price**.
5. We save.

To edit a tier, we select a row and click **Edit tier**.

### 4.3 Validation rules for ranges

When we define ranges, the platform validates pricing tiers to keep consistency.

- **Tokens max** must be greater than **Tokens min**.
- Tiers for the same model must not overlap.

:::warning
If ranges overlap for the same model, the platform rejects the update until the token intervals are adjusted.
:::

## Summary

With **AI Management**, we can manage AI operations end-to-end:

- We monitor executions in **AI Traces**.
- We maintain vendors in **Providers**.
- We configure available engines in **Models**.
- We control token-cost definitions in **Pricing**.

This structure helps us keep AI behavior observable, configurable, and aligned with governance and cost control needs.
