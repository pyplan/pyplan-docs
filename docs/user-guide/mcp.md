---
sidebar_position: 14
title: Pyplan MCP
---

# Pyplan MCP

The **Model Context Protocol (MCP)** is a standard that allows AI clients to connect to external systems through a structured interface. In Pyplan, MCP makes it possible to connect a compatible client, authenticate with our Pyplan instance, discover available applications, open one or more applications (even across different companies), load domain-specific skills, and execute tools against the running applications.

This article explains how we register the Pyplan MCP server, what capabilities it exposes, and how we create dynamic tools in a Pyplan application so they can be discovered through MCP.

## What Pyplan MCP Provides

Once the MCP server is connected and authorized, Pyplan exposes a two-level architecture:

1. **MCP tools** — A fixed set of tools the client can call directly.
2. **Skills and domain tools** — Domain-specific documentation and tool schemas loaded on demand via `get_skill`, whose tools are executed through `call_tool`.

The standard workflow is the following:

1. We register the Pyplan MCP server in the client.
2. We authenticate through the OAuth 2.1 flow and select a default company.
3. We list the applications available in the current company.
4. We open one application (optionally selecting a specific version), which returns an `instance_id`.
5. We load skills to learn the available domain tools.
6. We execute domain tools via `call_tool`, passing the `instance_id` and structured parameters.

:::info
Domain tools (those described inside skills) are NOT MCP tools. They are executed exclusively through the `call_tool` MCP tool.
:::

## Register the MCP Server

To use Pyplan MCP in any compatible LLM client, we register an HTTP MCP server that points to the Pyplan endpoint.

In general terms, the configuration only needs:

- A server name.
- The transport type set to HTTP (Streamable HTTP).
- The Pyplan MCP URL ending in `/ai/mcp`. Example: https://dev.pyplan.com/ai/mcp

The authentication flow uses **OAuth 2.1**, so the client redirects us to the browser to complete authorization.

## Authentication Flow

Pyplan MCP uses an OAuth 2.1 flow integrated with the Pyplan session. During the authorization process, the client redirects the user to the Pyplan login flow and then returns to the MCP client once access is granted.

From the user perspective, the steps are simple:

1. We start using the `pyplan-mcp` server from the client.
2. The client opens the authorization flow in the browser.
3. We sign in to our Pyplan instance if necessary.
4. We grant access to the MCP client.
5. The MCP session is created and the server becomes available in the chat.

:::tip
If the session expires or the underlying Pyplan token becomes invalid, the MCP server may request a new authentication flow. In that case, we reconnect the server and authorize it again.
:::

## Working with Companies and Sessions

A Pyplan user can belong to several **companies**. During authorization we select a **default company**, but we are not locked to it: the MCP session can move between the companies we belong to without reconnecting.

There are two ways to work with a company:

- **Change the default** with `switch_company`. This updates the company used by `list_applications` and `open_application` when no company is specified, and it is remembered across sessions (including future days) until the Pyplan session expires or is revoked.
- **Target a company per call** by passing `company_id` to `list_applications`, `list_app_versions`, or `open_application`. This works in another company for a single operation without changing the default.

:::warning
Moving to another company — whether by `switch_company` or by passing a different `company_id` — must be an explicit user decision. The assistant does not switch companies on its own initiative (for example, it will not reach into another company just to look for an application). Use `list_companies` to see which companies are available and which one is the default.
:::

### Multiple open applications at once

Opening an application returns an `instance_id` that identifies that running instance. We can keep **several applications open at the same time — even in different companies** — by opening each one and keeping its `instance_id`. The instances are independent and do not interfere with each other.

The rule that makes this reliable is simple: **every application-scoped tool takes an `instance_id`**. We forward the `instance_id` returned by `open_application` on each subsequent call (`get_skill` for app skills, `call_tool`, `save_application`, `close_application`, `create_app_version`, `save_as_new_app_version`). When more than one application is open, passing `instance_id` is required — if it is omitted, the last-opened application is used as a fallback.

This design has two benefits:

- **Cross-application workflows.** For example, we can copy nodes from an application in company B into an application in company A: open both, read from the first instance, and create the nodes in the second instance — each call carrying its own `instance_id`.
- **Independent parallel sessions.** Two separate chat windows using the same MCP connection never clobber each other, because each one carries its own `instance_id` and `company_id`.

## MCP Tools

After the server is connected, Pyplan MCP exposes the following direct tools that the client can invoke:

### list_companies

List the companies the authenticated user can work in, and indicate which one is the current default (`is_current`). Applications, teams, files, and permissions are scoped to a company, so this is how we see the available companies and confirm where we are working.

### switch_company

Set the default company for the session. This changes the company used by `list_applications` and `open_application` when no `company_id` is provided, and the choice is remembered across sessions. It does not close any application already open — those keep their own company and remain valid through their `instance_id`.

To work in another company for a single operation without changing the default, pass `company_id` directly to the discovery tools instead of switching.

| Parameter | Type | Description |
|-----------|------|-------------|
| `company_id` | integer | Target company id, obtained from `list_companies`. |

:::warning
Only switch companies when the user explicitly asks for it.
:::

### list_applications

List all Pyplan applications available for the authenticated user. Returns public applications, applications available through teams, and applications in the user's workspace, along with user and company context.

This is the starting point for all application-specific interactions, because the application URI returned here is used to open the target application.

| Parameter | Type | Description |
|-----------|------|-------------|
| `company_id` | integer (optional) | Company to list applications for. If omitted, the session's default company is used. |

### list_app_versions

List the versions of a specific application. Returns the default version plus every other active or closed version with its metadata (status, creation date, labels, description).

Use this before `open_application` when working with a specific version rather than the default.

| Parameter | Type | Description |
|-----------|------|-------------|
| `uri` | string | The application folder path returned by `list_applications`. |
| `company_id` | integer (optional) | Company the application belongs to. If omitted, the session's default company is used. |

### open_application

Open a Pyplan application by its URI. This creates a running instance of the application and returns an `instance_id` that identifies it.

Opening the application is required before loading skills that depend on it or executing domain tools. We keep the returned `instance_id` and pass it to every application-scoped tool afterwards. Several applications can be open at the same time (see [Multiple open applications at once](#multiple-open-applications-at-once)); each returns its own `instance_id`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `uri` | string | The application folder path returned by `list_applications`. |
| `version` | string (optional) | Specific version name to open. If omitted, the default version is opened. |
| `company_id` | integer (optional) | Company the application belongs to. If omitted, the session's default company is used. |

### save_application

Persist an open application's changes to disk. This should only be called when the user explicitly requests a save.

Mutations performed via `call_tool` accumulate in the engine's memory safely across many tool calls within the same session — there is no risk of losing work without saving.

| Parameter | Type | Description |
|-----------|------|-------------|
| `instance_id` | string (optional) | The application instance to save, as returned by `open_application`. Required when more than one application is open; otherwise the last-opened one is used. |

### close_application

Close an open application and release its engine. If there are unsaved changes, the call fails unless `force` is set to `true`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `force` | boolean (optional) | When `true`, discard unsaved changes and close. Default `false`. |
| `instance_id` | string (optional) | The application instance to close, as returned by `open_application`. Required when more than one application is open; otherwise the last-opened one is used. |

### create_app_version

Create a new version of the open application by copying from an existing version. The session can optionally switch to the new version.

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | string | New version name. |
| `from_version` | string (optional) | Base version to copy from. Defaults to the application's default version. |
| `description` | string (optional) | Free-text description. |
| `labels` | list of strings (optional) | Label strings for the version. |
| `open_after_creating` | boolean (optional) | Switch the session to the new version after creating it. Default `false`. |
| `instance_id` | string (optional) | The application instance to act on, as returned by `open_application`. Required when more than one application is open; otherwise the last-opened one is used. |

### save_as_new_app_version

Save the open application's in-memory changes as a new version. The session moves to the new version after saving.

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | string | New version name. |
| `description` | string (optional) | Free-text description. |
| `labels` | list of strings (optional) | Label strings for the version. |
| `instance_id` | string (optional) | The application instance to act on, as returned by `open_application`. Required when more than one application is open; otherwise the last-opened one is used. |

### get_skill

Load documentation and tool definitions for specific Pyplan domains. Each skill returns the rules, available tool schemas, and usage patterns for its domain.

This is the mechanism that allows the LLM client to learn what operations are available and how to invoke them through `call_tool`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `skills` | list of strings | List of skill names to load (see [Available Skills](#available-skills)). |
| `instance_id` | string (optional) | Required for skills that need an open application (see the table below). Pass the `instance_id` returned by `open_application`. Not needed for static skills such as `ABOUT_PYPLAN` or `DEVELOPMENT`. |

### call_tool

Execute a domain tool by its ID with the specified parameters. The tool schemas are obtained by loading the relevant skill first via `get_skill`.

Requires an open application. Each call runs against exactly one instance, so cross-application workflows (for example, copying data between two open apps) read from one `instance_id` and write to another in separate calls.

| Parameter | Type | Description |
|-----------|------|-------------|
| `tool_id` | string | The tool ID from the skill documentation. |
| `params` | object (optional) | Parameters matching the tool's documented schema. |
| `instance_id` | string (optional) | The application instance to run the tool against, as returned by `open_application`. Required when more than one application is open; otherwise the last-opened one is used. |

## Skills

Skills are domain-specific documentation bundles that the LLM loads on demand. Each skill contains rules, code patterns, and tool schemas for a particular area of Pyplan.

### Available Skills

| Skill | Description | Requires open app |
|-------|-------------|:-----------------:|
| `ABOUT_PYPLAN` | Fundamental rules, workflow, global imports, code conventions. **Mandatory** — should be loaded once per session. | No |
| `DEVELOPMENT` | Create, update, delete, and navigate nodes. Evaluate code. Includes all development tool schemas. | No |
| `FORMS` | Create Form nodes (FormColumn, FormSettings, code patterns). | No |
| `FORMS_DATA` | Modify data in existing forms. Tools: modify_form_data, add_rows, remove_rows, get_form_context, batch operations. | No |
| `INPUT_CUBES` | Create InputCube nodes (dimensions, settings, code patterns). | No |
| `INPUT_CUBES_DATA` | Modify data in existing input cubes. Tools: modify_input_cube_data, get_input_cube_context. | No |
| `SELECTORS` | Create selector and date-selector nodes. | No |
| `SECRETS` | Pyplan Secrets Manager usage (`pp.get_secret`). | No |
| `AGENTS_AND_MCP` | Create custom AI agents and MCP tool nodes inside the application. | No |
| `FILES` | Upload, download, list, and search files in the application workspace. | Yes |
| `HTML_INTERFACES` | Create full-page HTML/JS interfaces with Python `@callback` methods. This is the **default interface type**. | Yes |
| `COMPONENT_INTERFACES` | Component-based (drag & drop) interfaces built from standard Pyplan widgets (Form, Button, Index, Chart, Table, etc.). | Yes |
| `SPECIFIC_APP_TOOLS` | Dynamic list of tools and agents defined in the currently open application. | Yes |

#### Component Interfaces Sub-Skills

The `COMPONENT_INTERFACES` skill has specialized sub-skills for specific widget types:

| Skill | Description |
|-------|-------------|
| `COMPONENT_INTERFACES_HTML_VISUALIZATION` | HTML visualization widgets within component interfaces. |
| `COMPONENT_INTERFACES_DYNAMIC_HTML` | Dynamic HTML widgets within component interfaces. |
| `COMPONENT_INTERFACES_FORM` | Form widgets within component interfaces. |
| `COMPONENT_INTERFACES_INDEX` | Index selector widgets within component interfaces. |
| `COMPONENT_INTERFACES_BUTTON` | Button widgets within component interfaces. |

### How Skills and Tools Work Together

The interaction model follows this pattern:

1. The LLM calls `get_skill(["ABOUT_PYPLAN", "DEVELOPMENT"])` to load domain documentation.
2. The skill response includes tool schemas (tool IDs, parameters, descriptions).
3. The LLM calls `call_tool(tool_id="create_node", params={...})` to execute a specific operation.
4. The result is returned to the LLM for further processing.

This design provides several advantages:

- The LLM only loads the documentation it needs for the current task.
- Tool schemas are always up to date because they are served dynamically.
- Each domain can define its own conventions and rules independently.

## How Dynamic Application Tools Work

Beyond the built-in skills, each Pyplan application can expose its own tools and agents. These become visible through the `SPECIFIC_APP_TOOLS` skill.

The discovery flow works as follows:

1. We open an application through `open_application`.
2. We call `get_skill(["SPECIFIC_APP_TOOLS"])`.
3. Pyplan inspects the running application instance and returns its custom tools.
4. The LLM executes those tools via `call_tool` with the appropriate parameters.

This design gives us two important advantages:

- Each application can expose its own business-specific tools.
- The MCP client sees only the tools that are relevant to the currently open application.

:::info
If a tool does not appear through `SPECIFIC_APP_TOOLS`, verify that the correct application is open and that the node is properly exposed as an MCP tool.
:::

## How To Create a Dynamic Tool in a Pyplan Application

For a tool to be discoverable through the `SPECIFIC_APP_TOOLS` skill, the node result must be an `MCPTool` created with the `@mcp_tool` decorator.

The recommended pattern is the following:

```python
from pyplan_core.classes.ai.Agent import mcp_tool
from typing import Annotated

@mcp_tool
def _fn(
    amount: Annotated[float, 'Amount to convert'],
    source_currency: Annotated[str, 'Source currency code, for example USD'],
    target_currency: Annotated[str, 'Target currency code, for example EUR'],
) -> dict:
    """
    Convert an amount from one currency to another using the configured rate source.
    """
    rate = 0.92
    converted_amount = amount * rate
    return {
        'source_currency': source_currency,
        'target_currency': target_currency,
        'original_amount': amount,
        'converted_amount': converted_amount,
        'rate': rate,
    }

result = _fn
```

In this pattern:

- We import `mcp_tool` from `pyplan_core.classes.ai.Agent`.
- We decorate the function with `@mcp_tool`.
- We describe parameters using `Annotated[...]` so the MCP schema can include clear documentation.
- We return plain Python values or serializable objects.
- We assign the decorated function to `result`.

## Rules for Discoverable Tools

To ensure that a tool is correctly exposed through MCP, we follow these rules:

1. The node result must be the decorated function assigned to `result`.
2. The function signature must use explicit parameter types.
3. The parameter descriptions must be clear and precise.
4. The docstring must explain what the tool does, because MCP uses this information in the generated schema.
5. The returned value must be serializable.
6. The tool must not depend on interactive agent behavior.

In practice, this means that MCP tools should behave like direct executable functions with well-defined inputs and outputs.

:::warning
Creating a regular Python function in a node is not enough. If the node is not exposed with `@mcp_tool` and returned as `result`, the MCP server will not discover it as a dynamic tool.
:::

## When To Use Dynamic Tools

Dynamic tools are particularly useful when:

- We need a predictable input and output contract.
- We want to expose a specific business action to external AI clients.
- We need the client to understand the parameter schema explicitly.
- We want the action to be reusable and deterministic.

In practice, dynamic tools complement the built-in skills: we use natural-language interaction (through `get_skill` and `call_tool`) for development and exploration, while dynamic tools provide structured, repeatable operations for specific business processes.

## Summary

Pyplan MCP allows us to connect AI clients to Pyplan through a standard protocol. After registration and OAuth authorization, we have access to eleven direct MCP tools:

| Tool | Purpose |
|------|---------|
| `list_companies` | List the companies the user can work in and show the current default. |
| `switch_company` | Set the session's default company (only on explicit user request). |
| `list_applications` | Discover available applications (optionally in a specific company). |
| `list_app_versions` | List versions of an application. |
| `open_application` | Open an application (optionally a specific version / company), returning its `instance_id`. |
| `save_application` | Persist changes to disk. |
| `close_application` | Close the application and release resources. |
| `create_app_version` | Create a new version from an existing one. |
| `save_as_new_app_version` | Save current changes as a new version. |
| `get_skill` | Load domain-specific documentation and tool schemas. |
| `call_tool` | Execute domain tools with structured parameters. |

A user can belong to several companies and select a default during authorization; `switch_company` or a per-call `company_id` lets the session move between them. Applications are identified by an `instance_id`, so several apps — even in different companies — can stay open at once, and parallel chats remain independent.

The skill system provides access to 13 domains (plus sub-skills) covering development, data entry, interfaces, file management, secrets, and application-specific custom tools. To make an application-specific tool visible, we define it with `@mcp_tool`, document its parameters clearly, and return a serializable result.