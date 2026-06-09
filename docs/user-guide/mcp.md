---
sidebar_position: 14
title: Pyplan MCP
---

# Pyplan MCP

The **Model Context Protocol (MCP)** is a standard that allows AI clients to connect to external systems through a structured interface. In Pyplan, MCP makes it possible to connect a compatible client, authenticate with our Pyplan instance, discover available applications, open an application, load domain-specific skills, and execute tools against the running application.

This article explains how we register the Pyplan MCP server, what capabilities it exposes, and how we create dynamic tools in a Pyplan application so they can be discovered through MCP.

## What Pyplan MCP Provides

Once the MCP server is connected and authorized, Pyplan exposes a two-level architecture:

1. **MCP tools** — A fixed set of tools the client can call directly.
2. **Skills and domain tools** — Domain-specific documentation and tool schemas loaded on demand via `get_skill`, whose tools are executed through `call_tool`.

The standard workflow is the following:

1. We register the Pyplan MCP server in the client.
2. We authenticate through the OAuth 2.1 flow.
3. We list the applications available to the current user.
4. We open one application (optionally selecting a specific version).
5. We load skills to learn the available domain tools.
6. We execute domain tools via `call_tool` with structured parameters.

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

## MCP Tools

After the server is connected, Pyplan MCP exposes the following direct tools that the client can invoke:

### list_applications

List all Pyplan applications available for the authenticated user. Returns public applications, applications available through teams, and applications in the user's workspace, along with user and company context.

This is the starting point for all application-specific interactions, because the application URI returned here is used to open the target application.

### list_app_versions

List the versions of a specific application. Returns the default version plus every other active or closed version with its metadata (status, creation date, labels, description).

Use this before `open_application` when working with a specific version rather than the default.

| Parameter | Type | Description |
|-----------|------|-------------|
| `uri` | string | The application folder path returned by `list_applications`. |

### open_application

Open a Pyplan application by its URI. This creates a running instance of the application associated with the current MCP session.

Opening the application is required before loading skills that depend on it or executing domain tools.

| Parameter | Type | Description |
|-----------|------|-------------|
| `uri` | string | The application folder path returned by `list_applications`. |
| `version` | string (optional) | Specific version name to open. If omitted, the default version is opened. |

### save_application

Persist the currently open application's changes to disk. This should only be called when the user explicitly requests a save.

Mutations performed via `call_tool` accumulate in the engine's memory safely across many tool calls within the same session — there is no risk of losing work without saving.

### close_application

Close the currently open application and release its engine. If there are unsaved changes, the call fails unless `force` is set to `true`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `force` | boolean (optional) | When `true`, discard unsaved changes and close. Default `false`. |

### create_app_version

Create a new version of the open application by copying from an existing version. The session can optionally switch to the new version.

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | string | New version name. |
| `from_version` | string (optional) | Base version to copy from. Defaults to the application's default version. |
| `description` | string (optional) | Free-text description. |
| `labels` | list of strings (optional) | Label strings for the version. |
| `open_after_creating` | boolean (optional) | Switch the session to the new version after creating it. Default `false`. |

### save_as_new_app_version

Save the open application's in-memory changes as a new version. The session moves to the new version after saving.

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | string | New version name. |
| `description` | string (optional) | Free-text description. |
| `labels` | list of strings (optional) | Label strings for the version. |

### get_skill

Load documentation and tool definitions for specific Pyplan domains. Each skill returns the rules, available tool schemas, and usage patterns for its domain.

This is the mechanism that allows the LLM client to learn what operations are available and how to invoke them through `call_tool`.

| Parameter | Type | Description |
|-----------|------|-------------|
| `skills` | list of strings | List of skill names to load (see [Available Skills](#available-skills)). |

### call_tool

Execute a domain tool by its ID with the specified parameters. The tool schemas are obtained by loading the relevant skill first via `get_skill`.

Requires an open application.

| Parameter | Type | Description |
|-----------|------|-------------|
| `tool_id` | string | The tool ID from the skill documentation. |
| `params` | object (optional) | Parameters matching the tool's documented schema. |

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

Pyplan MCP allows us to connect AI clients to Pyplan through a standard protocol. After registration and OAuth authorization, we have access to nine direct MCP tools:

| Tool | Purpose |
|------|---------|
| `list_applications` | Discover available applications. |
| `list_app_versions` | List versions of an application. |
| `open_application` | Open an application (optionally a specific version). |
| `save_application` | Persist changes to disk. |
| `close_application` | Close the application and release resources. |
| `create_app_version` | Create a new version from an existing one. |
| `save_as_new_app_version` | Save current changes as a new version. |
| `get_skill` | Load domain-specific documentation and tool schemas. |
| `call_tool` | Execute domain tools with structured parameters. |

The skill system provides access to 13 domains (plus sub-skills) covering development, data entry, interfaces, file management, secrets, and application-specific custom tools. To make an application-specific tool visible, we define it with `@mcp_tool`, document its parameters clearly, and return a serializable result.