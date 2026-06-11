---
sidebar_position: 6
title: HTML Visualization Component
---

# HTML Visualization Component

The **HTML Visualization** component turns the data of a Pyplan node into a custom, fully styled HTML view rendered inside an `iframe`. Unlike the static [HTML component](./html-component.md), it is **data-bound**: it takes the result of a node, runs it through a small Python `render()` method, and returns the HTML to display — so the output reacts to changes in the Pyplan node and to the interface's filters.

It is the right choice when the standard table, chart, and indicator components cannot express the layout you need: bespoke KPI dashboards, styled summary cards, mixed chart-and-table panels, or any data-driven block where you want full control over the markup, CSS, and JavaScript.

HTML Visualization components are designed to be **built and refined by Pyplan's AI assistant**. You describe the visualization you want, and the assistant writes (or edits) the Python render code for you. You can also edit that code by hand at any time.

## How it works

An HTML Visualization component has two parts working together:

| Part | Content |
|---|---|
| **Data source** | A model node, selected as the component's node. Its result becomes a pandas `DataFrame` available to the render code. |
| **Render code** | A small Python class that receives the processed `DataFrame` and returns a complete HTML document (markup, styles, and optional JavaScript). |

When the interface loads — or when a filter changes — Pyplan runs the data pipeline (data source → filters) and passes the resulting `DataFrame` to your `render()` method. Whatever HTML string it returns is shown inside an `iframe`, which keeps the component's styles and scripts isolated from the rest of the interface.

### The render code

The render code is a class named `MyComponent` that extends `ppc.HtmlVisualization` and implements a single `render()` method. The method receives the processed data as `df` and must return a **complete** HTML document:

```python
import pyplan_core.interface.components.core as ppc
import pyplan_core.interface.classes as ppcl
from pyplan_core.interface.components.events import BaseEvent


class MyComponent(ppc.HtmlVisualization):

    def render(self, df: pd.DataFrame, event: BaseEvent = None, **kwargs) -> str:
        """Render the component as an HTML string (shown inside an iframe)."""
        # Shape the data here with pandas/numpy, then build the HTML.
        html_table = df.iloc[:100].to_html(index=False, classes="table table-striped")
        return f"""<html>
        <head>
            <link rel="stylesheet"
                  href="https://cdn.jsdelivr.net/npm/bootstrap@5/dist/css/bootstrap.min.css">
        </head>
        <body>{html_table}</body>
        </html>"""


component: MyComponent = MyComponent.model_validate(component_definition)
result = component
```

A few things to know about the render code:

- **`df` is the component's own data, already prepared.** It is the result of the component's node, automatically converted to a `DataFrame` and **filtered** by any active interface filters. Use `df` directly — don't re-fetch the same node.
- **Shape the data inside `render()`.** Aggregations, derived KPIs, deltas, rankings, and pivots are computed there from the raw rows with pandas/numpy. Don't assume the data arrives pre-aggregated.
- **To read a *different* node**, resolve it by id: `current_model.getNode("other_node_id").result`.
- `pd` (pandas), `np` (numpy), and `pp` (pyplan) are already in scope — don't re-import them.
- The class must be named `MyComponent`, `render()` must return a full HTML document (`html` + `head` + `body`), and the file must end with the `model_validate` + `result = component` block.

### Libraries you can use

Inside `render()` you can build charts with **Plotly** (`plotly.graph_objects` / `plotly.express`) and export them to HTML. In the HTML itself you can pull in any public CDN — Chart.js, D3, Plotly.js, Tailwind, Bootstrap, Google Fonts, Font Awesome — since the output runs in its own `iframe`.

## Adding the component

1. In an interface in **edit mode**, open the components menu and drag the **HTML Visualization** component onto the grid.
2. Select the **node** that provides the data. Its result is what `render()` receives as `df`.
3. Build the visualization — the recommended path is to ask Pyplan's AI assistant (see below). Until you customize it, the component renders the node's data as a default Bootstrap-styled table (first 100 rows).
4. Resize the component on the grid so the rendered output fits comfortably.

## Building it with the AI assistant

The fastest way to create or change an HTML Visualization is to **chat with Pyplan's AI assistant** while the component is selected. A specialized assistant generates production-grade HTML renders for this component type: it reads the node's data, writes the complete Python render code, applies a consistent design system, and saves it back to the component.

Typical requests:

- *"Show this as a KPI dashboard with the total, the year-over-year change, and a sparkline."*
- *"Turn this into a styled bar chart of sales by region, sorted descending."*
- *"Make the table compact, right-align the numeric columns, and highlight negative values in red."*

You can keep iterating in plain language, and you can always open the code to fine-tune it by hand afterwards. When you ask for a change, the assistant edits only the parts that need to change rather than rewriting everything.

## Filters and interaction

Because the component is data-bound, it participates in the interface's filtering just like a table:

- It exposes a **filter icon** on its columns, so users can filter the underlying data; the visualization re-renders with the filtered `df`.
- It reacts to **index/selector filters** elsewhere in the interface that share an index with its data.
- An optional **quick pivot area** can be shown above the component.

This means a chart or dashboard built with HTML Visualization stays in sync with the rest of the interface without any extra wiring.

## HTML Visualization vs. the other HTML options

Pyplan offers several ways to work with HTML. It helps to know how they differ:

| Option | What it is | When to use it |
|---|---|---|
| **[HTML component](./html-component.md)** | Static formatted content (text, images, links) written in a visual or code editor. | Headers, descriptions, instructions, branding — content that does not depend on a Pyplan node data. |
| **[Dynamic HTML component](./dynamic-html-component.md)** | A block of hand-written HTML wired to actions through an actions table (clicks open interfaces, run nodes, send attributes…). | A custom card, banner, or interactive block whose markup you write yourself. |
| **HTML Visualization component** | A node's data transformed into custom HTML by a Python `render()` method, shown in an `iframe`. | A data-driven visualization (chart, KPI dashboard, styled table) that reacts to Pyplan node changes and to filters. |
| **[HTML interface](../html-interfaces.md)** | The *whole interface* is a self-contained web page calling Python callbacks. | A fully custom screen or tool, not a single component on a grid. |

The key distinction: the **HTML component** is static, the **Dynamic HTML component** wires static markup to actions, and the **HTML Visualization component** generates its markup *from data* every time the data or filters change.

:::tip
Let the AI assistant produce the first version, then refine it. Describe the data story you want ("compare this year vs last", "rank the top 10", "show as cards"), and edit the resulting code only where you need precise control.
:::
