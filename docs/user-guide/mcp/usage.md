---
sidebar_position: 2
title: MCP Usage
sidebar_label: Usage
---

# MCP Usage

The **MCP Usage** page is the audit trail of everything done in Pyplan through the Model Context Protocol. It answers five questions for every call an external client makes: **who** ran it, with **which client**, **what** they did, **on what application**, and with **what result**.

To access this page, we open **AI Management** and select **MCP Usage**.

:::info
This page is not a cost report. Serving MCP spends no Pyplan AI tokens — the model belongs to the client (Claude, Cursor, and so on) — so there is nothing to bill here. For token and cost analysis of Pyplan's own agents, we use [AI Traces](../ai-management/ai-traces.md) and the AI Costs report instead.

The one exception is invoking an **application agent** through `call_tool`: that runs a Pyplan agent, so it does consume Pyplan tokens and appears in AI Traces with its cost. MCP Usage records that the call happened; AI Traces records what it cost.
:::

## 1. What gets recorded

Every call to the Pyplan MCP server is recorded as one row, whichever tool the client invoked: discovery calls (`list_companies`, `list_applications`, `list_app_versions`), application lifecycle calls (`open_application`, `save_application`, `close_application`, version creation), skill loads (`get_skill`), and every domain tool executed through `call_tool`.

Each row keeps:

- **User**: name and email of the person the client acted on behalf of, plus their company.
- **Client**: the display name the MCP client registered with (for example *Claude*, *Claude Code*, or *Cursor*), and the kind of credential used.
- **Action**: the MCP operation, and for `call_tool` the identifier of the domain tool that ran (`create_nodes`, `edit_html_interface`, `evaluate_code`, and so on). For skill loads, the names of the skills requested.
- **Application**: the application and version the call acted on.
- **Result**: how the call ended, with a short reason when it failed.

:::warning
Tool parameters, tool results, and application data are deliberately **not** stored. The log answers "who did what, where, and how did it end" — never "what was in it". That is what makes it safe to keep for a long period.
:::

## 2. Reading the result of a call

Results are grouped by cause rather than by HTTP status, because "the caller asked for something it may not have" and "Pyplan failed" are very different situations and only the second one is a defect:

| Result | Meaning |
|--------|---------|
| **OK** | The call completed successfully. |
| **Denied** | The user lacks the permission the action requires. |
| **Invalid** | The call itself was wrong: an unknown tool, missing or malformed parameters, or a conflict such as closing an application with unsaved changes. |
| **App closed** | The application instance the call targeted no longer exists, usually because it was closed from another window. |
| **AI off** | AI features — and therefore MCP — are disabled for that company. |
| **Error** | The call failed inside Pyplan. |

When a call fails, we can hover the result to read the reason reported to the client.

:::tip
A steady number of **Denied** results is not necessarily a problem: an assistant exploring what it can do will hit permission limits. A rising number of **Error** results is what deserves attention, since that is the only bucket that points at Pyplan itself.
:::

## 3. Summary indicators

Above the table, the page summarizes the activity that matches the current filters, so the indicators and the rows always describe the same set of calls.

The headline tiles show:

- **Calls**: total MCP calls in scope.
- **Users** and **Applications**: how many distinct users and applications were involved.
- **Writes**: the share of tool calls that change the application, as opposed to reading from it. This is what tells us whether MCP is being used to build or only to consult.
- **Denied** and **Error rate**: the two failure rates, kept separate for the reason explained above.

Below the tiles, ranked panels break the activity down:

- **Most used tools** and **Tools that fail most**, so we can see both what clients do and where they get stuck.
- **Clients**, which shows adoption per MCP client.
- **Activity**, a per-day strip that separates successful from failed calls.

Selecting **More indicators** adds the rankings by **user**, **application**, **operation**, and **most loaded skills**. The skills ranking is a useful signal of where documentation is worth writing, since it reflects which domains clients actually load before working.

## 4. Filters and search

The page includes filters that narrow the list before we look at a specific call:

- **Date from** and **Date to**, in the page header.
- **Client**, from the filter icon in the column header, to isolate a kind of credential: MCP client, access token, Pyplan session, or the in-app assistant.
- **Result**, from the filter icon in its column header, to isolate one or more of the outcomes described above. Both column filters accept several values at once.
- The page search box, which matches user, client, operation, tool, and application.

Table columns can also be sorted, and the summary above recalculates with every filter, including the search box.

### 4.1 The in-app assistant

Pyplan's own in-app assistant reaches the very same MCP endpoints through an internal session. Its activity is recorded, but it is **hidden by default** so the page shows external clients only.

Enabling **Include in-app assistant** brings it into both the table and the indicators, which is how we compare in-app adoption against external clients.

## 5. Retention

MCP usage events are kept on the same window as AI traces — 400 days by default, configurable by the deployment — and are then deleted automatically. Because the rows carry no payloads, keeping them for that period is enough to answer an audit question long after the fact without retaining customer content.

## Summary

With **MCP Usage**, we can move from "MCP is connected" to knowing exactly how it is being used:

- We review every MCP call in the main list, with its user, client, action, application, and result.
- We separate permission denials and malformed calls from real Pyplan failures.
- We measure adoption per client and per user, and whether MCP is used to read or to build.
- We narrow the scope with filters, search, and the in-app assistant toggle.
