---
sidebar_position: 4
title: HTML Interfaces
---

# HTML Interfaces

An **HTML interface** is a type of interface whose entire screen is a single, self-contained web page (HTML, CSS and JavaScript) instead of a grid of draggable components. It is rendered as a fully interactive mini-app that talks to your Pyplan model, so you can build bespoke dashboards, forms and tools whose layout and styling go beyond what the standard components express.

HTML interfaces are designed to be **created by Pyplan's AI agents** — or by external AI clients through [Pyplan MCP](../mcp/overview.md) tools. You describe the dashboard or tool you want, and the agent generates both the page and the Python code that connects it to your model. You can then refine the result by talking to the agent or by editing the code directly.

:::info Default interface type for agents
When you ask an agent to create an interface, Pyplan builds an **HTML interface by default**. They are the recommended way for agents to produce custom screens; the classic [component interfaces](./creation.md) remain available and are built manually by assembling components on a grid.
:::

## HTML interfaces vs. other options

Pyplan offers three different ways to work with custom presentation. It helps to understand how they differ before choosing one:

| Option | What it is | When to use it |
|---|---|---|
| **Component interface** | A grid of draggable components (tables, charts, selectors, indicators, buttons…). See [Creating an Interface](./creation.md). | The standard choice for most dashboards and input/output screens. |
| **[HTML Menu component](./interface-components/html-menu-component.md)** | A *single component* placed inside a component interface, where a block of HTML is wired to the model through an actions table. | You need a custom card, banner or block **inside** an otherwise standard interface. |
| **[HTML Visualization component](./interface-components/html-visualization-component.md)** | A *single component* placed inside a component interface, where a Pyplan node's data is turned into custom HTML by a Python `render()` method. | You need a data-driven visualization (chart, KPI dashboard, styled table) that reacts to the change in a Pyplan node and filters, **inside** a standard interface. |
| **HTML interface** | The *whole interface* is a web page with its own logic, calling Python methods you define. | You need a fully custom layout or a tailored tool that the standard components can't express — including data entry over a form node, with an [editable table](./html-interface-editing-data.md). |

The key distinction: a HTML Menu component lives *inside* a component interface, while an HTML interface *replaces* the component grid entirely and drives its interaction through Python code you (or the agent) write.

## How an HTML interface is built

An HTML interface has two parts, stored together on the same interface:

| Part | Content |
|---|---|
| **HTML** | The page shown to the user: markup, styles and inline JavaScript. |
| **Python code** | A class that defines the methods the page can call to read and write model data. |

The Python code runs **inside your model's namespace** — exactly like a node definition — so it can reference any node by name, and `pd` and `np` are available. The page calls into that Python code through a small built-in bridge, `window.pyplan`. Nothing else is needed to connect the two.

You rarely build either part from scratch: Pyplan ships a **standard library** of filters, tables, [editable forms](./html-interface-editing-data.md), KPI cards, charts and dialogs that already look like Pyplan, follow the light and dark themes, speak the user's language and remember what the user did. An interface built with it is mostly a matter of saying *what* to show.

### The Python side: callbacks

The Python code is a class named `HTMLInterface` that extends `HTMLInterfaceBase`. Only methods decorated with `@callback` can be called from the page; everything else stays private.

```python
from pyplan_core.html_interface import HTMLInterfaceBase, HtmlFilter, HtmlTable, callback


class HTMLInterface(HTMLInterfaceBase):

    # The filters shown on the page, one per dimension.
    CONTROLS = [HtmlFilter('region', source='regions')]

    # The widgets the page shows, named after the nodes they display.
    WIDGET_NODES = ['sales', 'profit_kpi']

    # A getter: returns a table, filtered by what the user picked.
    @callback
    def get_sales(self, request: dict = None, filters: dict = None) -> dict:
        data = self.apply_filters(sales, filters)
        return HtmlTable(data, rows=['region'], columns='month', values='amount',
                         format='money', total_row=True).respond(request)

    # A mutator: changes the model, then says which widgets became stale.
    @callback
    def set_year(self, year: int) -> dict:
        self.set_input('selected_year', year)
        return {"refresh": self.get_nodes_to_refresh(self.WIDGET_NODES)}
```

A few things to note:

- **Getters** read from the model and return JSON-friendly data (lists, dicts, numbers, strings), or a table built with `HtmlTable`.
- **Mutators** change the model and return `{"refresh": [...]}`: the widgets that need to load again. `self.get_nodes_to_refresh(node_ids)` works that list out from the model itself, following every dependency, so only what really changed reloads.
- Scalar parameters (`int`, `float`, `str`, `bool`) are converted automatically from what the page sends; lists and dicts arrive as they are.
- **Selectors are read by name.** If the user changes a selector elsewhere in the app, the next callback automatically sees the updated value.
- The class instance lives for the user's session, so it can cache data on `self` between calls.

To change model data from a callback, use the built-in helpers instead of touching the model internals directly:

| Helper | What it does |
|---|---|
| `self.set_input(node_id, value)` | Sets a **selector** or an **input scalar**. For a multi-select selector, pass the full list of selected values. |
| `self.get_nodes_to_refresh(node_ids)` | Given the widgets the interface renders, returns the ones that became stale after a change. |
| `self.apply_filters(data, filters)` | Applies the filter selection to a DataFrame or DataArray. See [Filters and Tables](./html-interface-filters-and-tables.md). |
| `self.set_form_values(node_id, changes, confirm=True)` | Writes values into a **form** from code (`changes` is a list of `{'row', 'column', 'value'}`). For a table the user types into, use an [editable table](./html-interface-editing-data.md) instead. |
| `self.confirm_form_changes(node_id)`, `self.cancel_form_changes(node_id)` | Confirms or discards the pending changes of a form. |
| `self.add_form_rows(node_id, ...)`, `self.remove_form_rows(node_id, row_ids)` | Adds or removes rows of a form. |
| `self.broadcast(event, data, interface_id=None, usernames=None)` | Sends a message to the other sessions that have the application open. See [Messages to other sessions](#messages-to-other-sessions). |

### The page side: widgets

Each block of the page that shows model data is a **widget**: a container with an id, and a function that loads it. The page registers its widgets and loads them all once; after a change, it reloads only the ones the callback reported.

```html
<div class="card">
  <h3 data-pyplan-nodes="profit_kpi">Profit</h3>
  <div id="profit" data-pyplan-widget="profit_kpi" data-pyplan-skeleton="kpi"></div>
</div>

<script>
  pyplan.widget('profit_kpi', async () => {
    const res = await pyplan.callback('get_profit', {});
    pyplan.ui.kpi(document.getElementById('profit'), {
      title: 'Profit', value: pyplan.fmt.money(res.value), delta: res.vs_last_year
    });
  });

  async function onYearChange(year) {
    await pyplan.refresh(await pyplan.callback('set_year', { year }));
  }

  pyplan.loadAll();
</script>
```

The same id ties the three sides together: the node in `WIDGET_NODES`, `pyplan.widget(id)` and `data-pyplan-widget="id"`. While a widget loads, Pyplan paints a **loading skeleton** shaped like what is coming (`data-pyplan-skeleton`: `chart`, `table`, `kpi`, `kpis`, `form`, `text`…) over the previous content, so a fast refresh never flashes an empty box. A widget that fails shows an error message without stopping the others.

### The `window.pyplan` bridge

| API | What it does |
|---|---|
| `pyplan.callback(method, params)` | Calls a Python `@callback` and returns a promise with its result. A failed call shows an error notification unless the page catches it. |
| `pyplan.widget(id, loader)`, `pyplan.load(id)`, `pyplan.loadAll()`, `pyplan.refresh(result)` | Register, load and reload widgets. `refresh` takes the `{refresh: [...]}` a mutator returned. |
| `pyplan.ui.filters`, `pyplan.ui.table` | The standard filter bar and table. See [Filters and Tables](./html-interface-filters-and-tables.md). |
| `pyplan.filters()` | The current selection of every filter on the page, for code outside a callback (callbacks already receive it). |
| `pyplan.ui.kpi`, `pyplan.ui.kpis` | KPI cards. See [KPIs, charts and dialogs](#kpis-charts-and-dialogs). |
| `pyplan.chart.plot` | Plotly charts that follow Pyplan's look and theme. |
| `pyplan.ui.dialog` | A modal dialog. |
| `pyplan.ui.maximize(card)`, `pyplan.ui.restore()` | Maximizes a card to the whole page, and restores it. See [Maximizing a card](#maximizing-a-card). |
| `pyplan.fmt.num`, `.int`, `.money`, `.pct`, `.compact` | Number formatting in the user's number format. |
| `pyplan.state.get(key)`, `pyplan.state.set(key, value)` | Small view state (a chosen tab, a collapsed panel) kept while the browser tab lives. See [What the page remembers](#what-the-page-remembers). |
| `pyplan.on(event, handler)` | Reacts to `theme` (light or dark), `locale` (the user's language), `scenarios` (the scenarios being compared changed), `broadcast` (a message from another session) and `ready`. |
| `pyplan.broadcast(event, data, options)` | Sends a message to the other sessions that have the application open. See [Messages to other sessions](#messages-to-other-sessions). |
| `pyplan.theme`, `pyplan.locale`, `pyplan.language`, `pyplan.numberLocale`, `pyplan.t(map)` | The user's theme, language (as a locale like `es-AR` or a short code like `es`) and number format, and a helper to pick the text in the user's language. |
| `pyplan.toast(message, kind)` | Shows a notification (`"info"`, `"success"`, `"warning"`, `"error"`). |
| `pyplan.esc(value)` | Escapes a value to insert it into HTML. |
| `pyplan.import(url)` | Dynamically imports an external JavaScript module (see [External libraries and resources](#external-libraries-and-resources)). |

### KPIs, charts and dialogs

- **KPI cards** — `pyplan.ui.kpis(element, specs)` renders a row of cards, each with a title, a value, a comparison badge (`delta`), an optional sparkline (`spark`) and a footer. A card's `node` makes its title open the node's information, and `link` turns it into a link to another interface.
- **Charts** — `pyplan.chart.plot(element, traces, layout)` draws a [Plotly](https://plotly.com/javascript/) chart with Pyplan's palette, fonts and number format. It repaints when the user switches between light and dark, keeps the user's zoom when its data reloads and resizes with its card. The interface loads Plotly itself, with a fixed version (for example `https://cdn.plot.ly/plotly-2.35.2.min.js`).
- **Dialogs** — `pyplan.ui.dialog({title, subtitle, onPrev, onNext})` opens a modal over the page, closed with Esc, the × button or a click outside. With `onPrev`/`onNext` the user can move between records with arrows. Its body holds the same widgets as the page, a table included.

The page also gets Pyplan's design system: color tokens (`--pp-*`) with light and dark values, and classes for cards (`.card`), buttons (`.pp-btn`), form fields (`.pp-field`), rows of cards (`.pp-row`) and tables (`.pp-table`). Native inputs and selects are already styled.

## Linking to the model and the rest of Pyplan

One of Pyplan's strengths is that the influence diagram explains *how* a number is computed. HTML interfaces surface that directly.

### Node references

Mark any title or heading that represents a model node with the `data-pyplan-nodes` attribute:

```html
<h3 data-pyplan-nodes="sales_forecast">YoY Growth %</h3>
```

When you hover that title it hints that it is interactive, and clicking it opens a popup showing the node's title, id and documentation, plus a **Go to node** link that jumps to the node in the influence diagram. A title that summarizes several nodes can list them all by separating the ids with commas (`data-pyplan-nodes="revenue,cost"`). Filter labels and KPI titles open the same popup.

### Navigation links

A plain anchor is enough to navigate within Pyplan — the interface intercepts the click and routes it through the app:

```html
<a href="/interfaces/<INTERFACE_ID>">Open another interface</a>
<a href="/code/go-to?nodeId=sales_data">Open the sales_data node</a>
<a href="/files">Files manager</a>
<a href="https://docs.pyplan.com" target="_blank">External link</a>
```

In-app paths (those starting with `/`) keep the app shell mounted, while external links (`http`, `https`, `mailto`…) open in a new tab. Links to an anchor of the page (`#section`) scroll within it.

### External libraries and resources

You can use external charting libraries, fonts, stylesheets and images by writing their URLs as you would on the open web (for example a `<script src="https://cdn.jsdelivr.net/...">`). Pyplan automatically re-routes those requests through a same-origin proxy, so they keep working even on corporate networks that restrict outbound traffic. For dynamically imported JavaScript modules, use `window.pyplan.import('https://…')` instead of a bare `import()`.

### Theme, language and numbers

An HTML interface follows the user's settings: it switches between light and dark with the app, and `pyplan.locale` and `pyplan.numberLocale` tell it the user's language and number format. The standard library uses them on its own; text the page writes itself can be translated with `pyplan.t({en: '…', es: '…', pt: '…'})`, and numbers formatted with `pyplan.fmt`.

### Messages to other sessions

An HTML interface can tell the other people working on the same application that something changed — for example, that a user confirmed new figures — so their pages can reload or show a notice. The message goes to the other live sessions of the same company and application, never back to the session that sent it.

From Python, a callback sends it with `self.broadcast`:

```python
@callback
def save(self, edits: list) -> dict:
    self.set_form_values('sales_form', edits)
    self.broadcast('sales-saved', {'rows': len(edits)})
    return {"refresh": self.get_nodes_to_refresh(self.WIDGET_NODES)}
```

The page can also send one with `pyplan.broadcast('sales-saved', {rows: 3})`. Every HTML interface that receives it handles it with `pyplan.on('broadcast', …)`:

```js
pyplan.on('broadcast', (msg) => {
  // msg = { event, data, from: { userName, userFullName, interfaceId } }
  if (msg.event === 'sales-saved') {
    pyplan.toast(`${msg.from.userFullName} updated the sales plan`, 'info');
    pyplan.load('sales_table');
  }
});
```

A few things to note:

- `interface_id` (`interfaceId` on the page) limits the message to the sessions showing that interface, and `usernames` to those users.
- `data` must be JSON-friendly. `self.broadcast` returns how many sessions received the message, and `pyplan.broadcast` resolves to `{recipients}`.
- A message that cannot be delivered never makes the callback fail: it is logged and `self.broadcast` returns 0.
- Messages are not stored: a page that isn't open at that moment doesn't get them.

## Creating and editing an HTML interface

HTML interfaces are meant to be built **by Pyplan's AI agents** — or by external AI clients through [Pyplan MCP](../mcp/overview.md) tools — and they are the type Pyplan creates by default whenever you ask an agent to make an interface. Describe the dashboard or tool you want — the data it should show, the actions it should offer — and the agent proposes a plan, then generates the HTML layout together with the Python callbacks that connect it to your model.

When an HTML interface has no content yet, Pyplan shows a prompt inviting you to describe what you want to build and send it to the agent.

From there you can:

- **Iterate with the agent** — ask for changes in plain language ("add a year selector", "show the KPI as a card", "make the table editable").
- **Edit the code directly** — with the edit (pencil) button, which requires permission to update interfaces. The screen splits into a live preview and an editor with **Python** and **HTML** tabs:
  - **Preview** applies your changes to the running interface so you can try them; **Confirm**, at the top, keeps them for good.
  - **Reset** goes back to the code as it was when you started editing.
  - The editor's footer lists the callbacks the Python code defines (hover one to see its parameters), or the error that keeps it from compiling.
  - **Inspect mode** (the crosshair button, on the HTML tab): click any element of the preview and the editor jumps to the line that builds it. Press Esc to leave it.
  - **Ask AI** (**Ctrl/⌘ + I**, or right-click in the editor): opens the inline assistant over the code of the tab we are on. We describe the change, and the assistant proposes it with both tabs in mind; when it only needs to change the other tab, it says so. Its changes are undone with **Ctrl/⌘ + Z**, like any edit.

## Working with an HTML interface

Because an HTML interface is a single page rather than a grid of components, a few toolbar actions behave differently from component interfaces:

- **Refresh** reloads the interface — it re-fetches the page and re-runs its initial calls. This also picks up any edits made to the interface's code. The page opens as defined or, when a custom view is shown, as that view saved it.
- **Custom views** work on HTML interfaces too, but they save the page's setup rather than a grid. See [Custom views](#custom-views) below.
- The toolbar's **Screenshot** button is not shown for HTML interfaces. An agent can still capture what the page shows when it needs to see it.

### Custom views

As with component interfaces, each user can keep several **custom views** of an HTML interface, open them from the bookmark button on the toolbar and choose which one opens by default (see [Custom Views of an Interface](./creation.md#custom-views-of-an-interface)). What changes is what a view holds and when it is saved.

A custom view of an HTML interface saves how the page is set up:

- the selection of its filters;
- for each table, its order, column filters, drilldown, levels and layout;
- the small view state the page keeps with `pyplan.state` (a chosen tab, a collapsed panel).

It doesn't save the page's code, so a view keeps working when the interface is edited. Nor does it save a table's page, its picked rows or its scroll: each table opens on its first page.

To save a view, we set the page up as we want it and then:

1. Click the bookmark button on the interface toolbar.
2. Select **Save as new view…** to create a view, or **Save changes to "…"** to update the view being shown.

Unlike component interfaces, where changes go into the view as we make them, an HTML interface only changes its view when we choose **Save changes to "…"**. While we work, the page keeps our current selection; picking the view again in the menu, or **Refresh**, brings the saved view back.

When a view holds the selection of a [filter bound to a selector](./html-interface-filters-and-tables.md#filters-bound-to-a-selector), opening the view also writes that selection into the model.

:::info When the interface changes
If the interface changed since the view was saved — a filter, a member or a table field it used is gone — the page applies what still fits and tells us once. Saving the view again updates it.
:::

### Maximizing a card

Every card (`.card`) that holds a chart or a table gets a **Maximize** button to the right of its title, which expands the card to the whole interface. The same button, now **Restore**, or **Esc** brings it back. Filters and KPI cards don't get the button.

The author can change which cards offer it with the `data-pyplan-maximize` attribute: `"false"` on a card removes the button from that card, `"false"` on `<body>` removes it from the whole page, and `"true"` adds it to a card that wouldn't get it on its own.

### What the page remembers

| What | How long it lasts |
|---|---|
| Filter selections, how each table is set up (order, column filters, drilldown, levels, layout, page and scroll) and `pyplan.state` | While the browser tab lives, per application and interface. **Refresh** clears it. |
| A [custom view](#custom-views) | Saved for the user until changed or deleted, and updated only with **Save changes to "…"**. It doesn't keep a table's page, its picked rows or the scroll. |
| Changes typed into an editable table | Pending until the user confirms or cancels them. See [Forms and Editing Data](./html-interface-editing-data.md). |
| Filters bound to a selector, and values set with `set_input` | They are model values: they change the model for the whole session. |

## Security and sandboxing

HTML interfaces run in a **sandboxed frame with an isolated origin**. In practice this means the page:

- cannot read cookies, local storage or the surrounding application's data;
- cannot make authenticated requests on its own — all communication with your model goes exclusively through `window.pyplan.callback`, over a session token Pyplan manages for you.

Secrets don't belong in the page: read them in Python with `pp.get_secret()`. Exporting tables to Excel or CSV requires the user's permission to export components.

This keeps a generated interface safely contained while still letting it interact richly with your model.

## Good practices

The agents follow these rules, and they are worth keeping when you edit an interface yourself:

- **Business logic belongs in nodes**, not in callbacks: a callback only reshapes model data for display, so the numbers on the page are the same ones the diagram explains.
- **Use the standard library** instead of rebuilding filters, tables of node data, KPI cards, charts' styling or dialogs by hand.
- **Never hardcode members** of a dimension (regions, products…): read them from the model, so the interface keeps working when they change.
- **Pivot multi-dimensional data** — time across the top, the remaining dimensions as rows or filters — rather than flattening it to one row per combination.
- **Prefer small edits** to rewriting the whole interface.

## Limitations

- HTML interfaces are a single page; they do not use the draggable component grid or the per-component settings of component interfaces.
- The page itself has no access to cookies or local storage: anything that must outlive the browser tab belongs in the model (through callbacks) or in a custom view.
- Embedding other web pages through `<iframe>` is not supported: Pyplan's proxy serves external scripts, styles, fonts and images, not HTML documents.
