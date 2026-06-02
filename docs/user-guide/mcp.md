---
sidebar_position: 14
title: Pyplan MCP
---

# Pyplan MCP

The **Model Context Protocol (MCP)** is a standard that allows AI clients to connect to external systems through a structured interface. In Pyplan, MCP makes it possible to connect a compatible client, authenticate with our Pyplan instance, discover available applications, open an application, and use both built-in and application-specific tools.

This article explains how we register the Pyplan MCP server, what capabilities it exposes, and how we create dynamic tools in a Pyplan application so they can be discovered through MCP.

## What Pyplan MCP Provides

Once the MCP server is connected and authorized, Pyplan exposes a set of capabilities designed to work with the applications available to the authenticated user.

The standard workflow is the following:

1. We register the Pyplan MCP server in the client.
2. We authenticate through the OAuth 2.1 flow.
3. We list the applications available to the current user.
4. We open one application.
5. We discover the dynamic tools exposed by that application.
6. We execute those tools with structured parameters.

In addition to the dynamic tools created inside an application, Pyplan MCP also exposes built-in capabilities to:

- List the applications available to the authenticated user.
- Open an application and keep its running instance associated with the MCP session.
- Build and modify the application logic and interfaces using AI assistance.
- Discover application-specific tools.
- Execute application-specific tools.

:::info
Dynamic tools become available only after we open a Pyplan application. Before that step, the MCP client can use only the built-in server capabilities.
:::

## Register the MCP Server

To use Pyplan MCP in any compatible LLM client, we register an HTTP MCP server that points to the Pyplan endpoint.

In general terms, the configuration only needs:

- A server name.
- The transport type set to HTTP.
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

## Available Capabilities

After the server is connected, Pyplan MCP exposes a combination of built-in capabilities and dynamic application tools.

### 1. List available applications

The server can return the applications the current user can access, including:

- Public applications.
- Applications available through teams.
- Applications in the user's workspace.
- User and company context associated with the session.

This is the starting point for all application-specific interactions, because the application URI returned here is later used to open the target application.

### 2. Open an application

Once we identify the desired application, we open it through MCP using its URI. This creates or reuses a running Pyplan instance associated with the current MCP session.

Opening the application is required before using:

- The built-in AI capabilities for building and interacting with the application.
- The dynamic tools defined inside the application.

### 3. Build and interact with the application using AI

After an application is open, Pyplan MCP enables us to work with the application through natural language. We can:

- Build and modify the calculation logic of the application.
- Create and update interfaces (dashboards, forms, visualizations).
- Explore data, request calculations, and analyze results.
- Manage files, inputs, and application structure.

This means that from any compatible AI client we can develop, maintain, and interact with a Pyplan application without leaving the chat environment.

### 4. Discover application tools

Once the application is open, the MCP server can inspect it and return the dynamic tools exposed by that specific app.

Each discovered tool includes metadata such as:

- A unique identifier.
- A tool name.
- A description.
- A parameter schema.

This metadata is what allows the MCP client to understand which parameters are required and how to invoke the tool correctly.

### 5. Execute application tools

After discovery, the MCP client can execute any exposed tool by sending its identifier together with the required parameters.

The execution happens in the context of the open Pyplan application, so the tool can use the model logic, nodes, and business rules already defined in that app.

## How Dynamic Tools Work

Dynamic tools are not registered globally in the MCP server. Instead, they are defined inside each Pyplan application and become visible only when that application is open.

The discovery flow works as follows:

1. We open an application through MCP.
2. Pyplan inspects the running application instance.
3. Pyplan returns the tools exposed by that application.
4. The MCP client uses the returned schema to show and execute those tools.

This design gives us two important advantages:

- Each application can expose its own business-specific tools.
- The MCP client sees only the tools that are relevant to the currently open application.

:::info
If a tool does not appear in MCP, the first thing to verify is whether the correct application is open and whether the node result is actually exposed as an MCP tool.
:::

## How To Create a Dynamic Tool in a Pyplan Application

For a tool to be discoverable through MCP, the node result must be an `MCPTool` created with the `@mcp_tool` decorator.

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

In practice, dynamic tools complement the built-in AI capabilities: we use natural-language interaction for development and exploration, while dynamic tools provide structured, repeatable operations for specific business processes.

## Summary

Pyplan MCP allows us to connect AI clients to Pyplan through a standard protocol. After registration and OAuth authorization, we can list applications, open one application, build and interact with it using AI, discover dynamic tools, and execute them.

To make an application-specific tool visible through MCP, we must define it in the application as an `MCPTool` using `@mcp_tool`, document its parameters clearly, and return a serializable result. Once the application is open, the MCP client can discover that tool automatically and invoke it with structured parameters.