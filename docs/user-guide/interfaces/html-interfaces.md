---
sidebar_position: 4
title: HTML Interfaces
---

# HTML Interfaces

An **HTML interface** is a type of interface whose entire screen is a single, self-contained web page (HTML, CSS and JavaScript) instead of a grid of draggable components. It is rendered as a fully interactive mini-app that talks to your Pyplan model, so you can build bespoke dashboards, forms and tools whose layout and styling go beyond what the standard components express.

HTML interfaces are designed to be **created by Pyplan's AI agents** — or by external AI clients through [Pyplan MCP](../mcp.md) tools. You describe the dashboard or tool you want, and the agent generates both the page and the Python code that connects it to your model. You can then refine the result by talking to the agent or by editing the code directly.

:::info Default interface type for agents
When you ask an agent to create an interface, Pyplan builds an **HTML interface by default**. They are the recommended way for agents to produce custom screens; the classic [component interfaces](./creation.md) remain available and are built manually by assembling components on a grid.
:::

## HTML interfaces vs. other options

Pyplan offers three different ways to work with custom presentation. It helps to understand how they differ before choosing one:

| Option | What it is | When to use it |
|---|---|---|
| **Component interface** | A grid of draggable components (tables, charts, selectors, indicators, buttons…). See [Creating an Interface](./creation.md). | The standard choice for most dashboards and input/output screens. |
| **[Dynamic HTML component](./interface-components/dynamic-html-component.md)** | A *single component* placed inside a component interface, where a block of HTML is wired to the model through an actions table. | You need a custom card, banner or block **inside** an otherwise standard interface. |
| **HTML interface** | The *whole interface* is a web page with its own logic, calling Python methods you define. | You need a fully custom layout or a tailored tool that the standard components can't express. |

The key distinction: a Dynamic HTML component lives *inside* a component interface, while an HTML interface *replaces* the component grid entirely and drives its interaction through Python code you (or the agent) write.

## How an HTML interface is built

An HTML interface has two parts, stored together on the same interface:

| Part | Content |
|---|---|
| **HTML** | The page shown to the user: markup, styles and inline JavaScript. |
| **Python code** | A class that defines the methods the page can call to read and write model data. |

The Python code runs **inside your model's namespace** — exactly like a node definition — so it can reference any node by name. The page calls into that Python code through a small built-in bridge, `window.pyplan`. Nothing else is needed to connect the two.

### The Python side: callbacks

The Python code is a class named `HTMLInterface` that extends `HTMLInterfaceBase`. Only methods decorated with `@callback` can be called from the page; everything else stays private.

```python
from pyplan_core.html_interface import HTMLInterfaceBase, callback


class HTMLInterface(HTMLInterfaceBase):

    # A read-only getter: returns data for the page to display.
    @callback
    def get_sales(self, page: int = 0, page_size: int = 50) -> list:
        # Reference model nodes by name, just like in a node definition.
        df = sales_data[sales_data.year == selected_year]
        start = page * page_size
        return df.iloc[start:start + page_size].to_dict("records")

    # A mutator: changes the model, then reports which widgets are now stale.
    @callback
    def set_year(self, year: int) -> dict:
        self.set_input('selected_year', year)
        return {"refresh": self.get_nodes_to_refresh(['sales_table', 'profit_kpi'])}
```

A few things to note:

- **Getters** read from the model and return JSON-friendly data (lists, dicts, numbers, strings).
- **Mutators** change the model and return the list of widgets that need to be refreshed, so the page can re-fetch only what changed.
- Method parameters are typed (`int`, `float`, `str`, `bool`, `list`), and Pyplan coerces the values coming from the page automatically.
- **Selectors are read by name.** If the user changes a selector elsewhere in the app, the next callback automatically sees the updated value.

To change model data from a callback, use the built-in helpers instead of touching the model internals directly:

- `self.set_input(node_id, value)` — set a **selector** or an **input scalar**. For a multi-select selector, pass the full list of selected values.
- `self.set_form_values(node_id, changes)` — apply one or more cell edits to a **form**, where `changes` is a list of `{'row', 'column', 'value'}` items.
- `self.get_nodes_to_refresh(node_ids)` — given the widgets your interface renders, returns the subset that became stale after a change.

### The HTML side: `window.pyplan`

The page calls Python through `window.pyplan.callback(method, params)`, which returns a promise with the result:

```html
<table id="sales"><tbody></tbody></table>

<script>
  async function load() {
    const rows = await window.pyplan.callback("get_sales", { page: 0, page_size: 50 });
    const tbody = document.querySelector("#sales tbody");
    tbody.innerHTML = rows
      .map(r => `<tr><td>${r.year}</td><td>${r.amount}</td></tr>`)
      .join("");
  }
  load();
</script>
```

The same `window.pyplan` bridge also offers:

- `window.pyplan.callback(method, params)` — call a Python `@callback` and await its result.
- `window.pyplan.on(event, handler)` — react to events sent from Pyplan.
- `window.pyplan.toast(message, kind)` — show a notification (`"info"`, `"success"`, `"warning"`, `"error"`). Errors from a failed callback are surfaced automatically.
- `window.pyplan.import(url)` — dynamically import an external JavaScript module (see [External libraries and resources](#external-libraries-and-resources)).

## Creating and editing an HTML interface

HTML interfaces are meant to be built **by Pyplan's AI agents** — or by external AI clients through [Pyplan MCP](../mcp.md) tools — and they are the type Pyplan creates by default whenever you ask an agent to make an interface. Describe the dashboard or tool you want — the data it should show, the actions it should offer — and the agent generates the HTML layout together with the Python callbacks that connect it to your model.

From there you can:

- **Iterate with the agent** — ask for changes in plain language ("add a year selector", "show the KPI as a card", "make the table editable").
- **Edit the code directly** — open the interface's editor to adjust the HTML or the Python callbacks by hand. A live preview lets you see your changes as you work.

When an HTML interface has no content yet, Pyplan shows a prompt inviting you to describe what you want to build.

## Linking to the model and the rest of Pyplan

One of Pyplan's strengths is that the influence diagram explains *how* a number is computed. HTML interfaces surface that directly.

### Node references

Mark any title or heading that represents a model node with the `data-pyplan-nodes` attribute:

```html
<h3 data-pyplan-nodes="sales_forecast">YoY Growth %</h3>
```

When you hover that title it hints that it is interactive, and clicking it opens a popup showing the node's title, id and documentation, plus a **Go to node** link that jumps to the node in the influence diagram. A title that summarizes several nodes can list them all by separating the ids with commas (`data-pyplan-nodes="revenue,cost"`).

### Navigation links

A plain anchor is enough to navigate within Pyplan — the interface intercepts the click and routes it through the app:

```html
<a href="/interfaces/<INTERFACE_ID>">Open another interface</a>
<a href="/code/go-to?nodeId=sales_data">Open the sales_data node</a>
<a href="/files">Files manager</a>
<a href="https://docs.pyplan.com" target="_blank">External link</a>
```

In-app paths (those starting with `/`) keep the app shell mounted, while external links (`http`, `https`, `mailto`…) open in a new tab.

### External libraries and resources

You can use external charting libraries, fonts, stylesheets and images by writing their URLs as you would on the open web (for example a `<script src="https://cdn.jsdelivr.net/...">`). Pyplan automatically re-routes those requests through a same-origin proxy, so they keep working even on corporate networks that restrict outbound traffic. For dynamically imported JavaScript modules, use `window.pyplan.import('https://…')` instead of a bare `import()`.

## Working with an HTML interface

Because an HTML interface is a single page rather than a grid of components, a few toolbar actions behave differently from component interfaces:

- **Refresh** reloads the interface — it re-fetches the page and re-runs its initial calls. This also picks up any edits made to the interface's code.
- **Custom views** and **screenshot** are not available for HTML interfaces (custom views apply to the component grid, and the page is sandboxed). The rest of the interface tools work as usual.

## Security and sandboxing

HTML interfaces run in a **sandboxed frame with an isolated origin**. In practice this means the page:

- cannot read cookies, local storage or the surrounding application's data;
- cannot make authenticated requests on its own — all communication with your model goes exclusively through `window.pyplan.callback`, over a short-lived session token Pyplan manages for you;
- cannot embed third-party web pages.

This keeps a generated interface safely contained while still letting it interact richly with your model.

## Limitations

- HTML interfaces are a single page; they do not use the draggable component grid, custom views, or the per-component settings of component interfaces.
- Persisting state must go through the model (via callbacks) — the page itself has no access to cookies or local storage.
- Embedding external HTML documents through `<iframe>` is not supported; external scripts, styles, fonts and images are.
