---
sidebar_position: 4.1
title: "HTML Interfaces: Filters and Tables"
sidebar_label: Filters and Tables in HTML Interfaces
---

# Filters and Tables in HTML Interfaces

[HTML interfaces](./html-interfaces.md) come with a standard filter bar and a standard table. Both are built in two halves — a Python object that knows the data, and a single call on the page that renders it — and both give the user the same rich behavior in every interface without any extra code.

## Filters

### What the user can do

The filter bar shows one field per dimension. Each field:

- shows the picked members as text, with a **+N** badge when there are more than fit; hovering it shows the whole selection;
- opens a dropdown that lists the selected members first, offers a search box when the list is long, and loads members page by page from the model;
- offers **Select all** (up to 2,000 members by default; past that, narrow the list with the search first) and, for a multi-select field, a button to clear it. A single-select field always holds a value;
- opens the node's information when you click its label.

The bar stays pinned at the top of the page while you scroll. Ticking several members in a row sends a single change, when you stop or close the dropdown, and then the widgets the bar refreshes reload.

The selection is remembered while the browser tab lives, so leaving the interface and coming back finds it as you left it. A [custom view](./html-interfaces.md#custom-views) saves it for good.

### Building a filter bar

On the Python side, declare the filters in `CONTROLS`, and apply the selection with `self.apply_filters` in each callback that shows filtered data:

```python
from pyplan_core.html_interface import HTMLInterfaceBase, HtmlFilter, callback


class HTMLInterface(HTMLInterfaceBase):

    CONTROLS = [
        HtmlFilter('region', source='regions'),
        HtmlFilter('channel', source='sales_detail.channel', title='Channel'),
        HtmlFilter('year', source='years', multi=False),
    ]

    @callback
    def get_kpis(self, filters: dict = None) -> dict:
        data = self.apply_filters(sales_detail, filters)
        return {'revenue': float(data['revenue'].sum())}
```

On the page, one call renders the whole bar:

```html
<div class="card"><div id="filters"></div></div>

<script>
  pyplan.ui.filters('#filters', { refresh: ['kpi_summary', 'sales_table'] });
  pyplan.loadAll();
</script>
```

The page adds the current selection, as `filters`, to every callback of the interface (unless the call passes its own `filters`), so a callback only has to declare a `filters` parameter to receive it. A callback that doesn't declare it ignores the filters.

`HtmlFilter(id, source=…)` takes, among others:

| Parameter | Meaning |
|---|---|
| `source` | Where the members come from: an index node (`'regions'`), a column of a node (`'sales_detail.channel'`), or a list of values. |
| `title` | The field's label. By default it is made from the id. |
| `multi` | `False` for a single-select field. |
| `default` | The members selected the first time the interface opens. |
| `bind` | A selector node the filter writes into. See below. |
| `cascade` | Narrows the members to the ones that exist under the other filters' selection. A filter whose members come from an index also needs `frame`, the DataFrame node to narrow over. |
| `width`, `placeholder`, `max_values` | How the field looks. |

`self.apply_filters(data, filters)` works with pandas and polars DataFrames and with xarray DataArrays. It matches labels to the column's type and skips the filters whose column the data doesn't have.

#### Filters bound to a selector

By default a filter only filters what the page shows: the model never sees it. With `bind='selector_node'`, the filter writes its selection into that selector node, so every node that depends on it is recalculated, and the filter takes its members and its single or multiple selection from the selector. Since it changes the model, it changes it for the whole session, not only for this interface.

#### Options of the bar

`pyplan.ui.filters(element, options)` accepts:

| Option | Meaning |
|---|---|
| `refresh` | The widgets to reload when the selection changes. By default, every widget of the page. A bound filter reloads only the ones whose nodes depend on its selector. |
| `only` | Render only these filters (to split them between several bars, or use `pyplan.ui.filter(element, id)` for a single one). |
| `onChange(values)` | Handle the change yourself instead of reloading widgets. |
| `variant` | `'stacked'` (default) or `'outlined'`. |
| `persist` | `false` to stop remembering the selection. |
| `sticky` | `false` to stop pinning the bar to the top. |

The handle it returns has `values()`, `set(id, values)` and `clear()`.

## Tables

### What the user can do

A table of the standard library offers, with no code from the author:

- **Sort** — click a column heading to sort ascending, descending, or back to the original order. Sorting covers the whole table, not only the page shown.
- **Filter columns** — the funnel on a heading filters by members, or by a condition on numbers (equal, greater than, between…).
- **Drilldown** — click a row label (or a column heading) and choose **Drilldown by** a dimension to open its detail; click again to close it.
- **Levels** — click a dimension's name to show it by levels (for a date: year, quarter and month) and choose how levels roll up (sum, average, maximum, minimum or count).
- **Layout** — the layout button beside the table's title opens a panel to drag fields between rows, columns and values, change each value's aggregation and turn subtotals on or off. Changes apply at once or, with live update off, when you apply them.
- **Pick cells** like in a spreadsheet — click, drag, Shift + click, arrows, Ctrl/⌘ + A. The footer shows the sum, average and count of the picked cells; right-click it to add others (minimum, maximum…).
- **Copy** — Ctrl/⌘ + C copies the picked cells, ready to paste into Excel. The right-click menu also copies them as shown, with headings, or the whole table.
- **Export** — **Export table…**, on the right-click menu, downloads the whole table — every row, with your filters and layout — to Excel or CSV, as you see it or as a list.
- **Excel** — the Excel button beside the title downloads the table to Excel or opens it with the Pyplan Excel add-in. On an [editable table](./html-interface-editing-data.md) it also offers to download it to edit in Excel and bring the edited sheet back. The button needs permission to export components, and the author can hide it with `excel=False`.

The table remembers its page, order, filters, drilldown, levels and layout while the browser tab lives; a [custom view](./html-interfaces.md#custom-views) saves them, except the page. **Refresh** puts the table back as defined. Exporting requires permission to export components.

### Building a table

On the Python side, a callback builds an `HtmlTable` and returns its `respond(request)`. The table does the sorting, filtering, paging, drilldown and exports on the server, so the callback must always receive `request` and pass it through:

```python
from pyplan_core.html_interface import HTMLInterfaceBase, HtmlTable, callback


class HTMLInterface(HTMLInterfaceBase):

    @callback
    def get_revenue(self, request: dict = None, filters: dict = None) -> dict:
        data = self.apply_filters(sales_detail, filters)
        return HtmlTable(
            data,
            rows=['region', 'channel'],
            columns='month',
            values='revenue',
            format='money',
            subtotals=True,
            total_row=True,
        ).respond(request)
```

On the page, the table loads itself as a widget, named by its container's `data-pyplan-widget`:

```html
<div class="card pp-table-card">
  <h3 data-pyplan-nodes="sales_detail">Revenue by region</h3>
  <div id="revenue" data-pyplan-widget="revenue_table" data-pyplan-skeleton="table"></div>
</div>

<script>
  pyplan.ui.table('#revenue', { callback: 'get_revenue' });
  pyplan.loadAll();
</script>
```

`HtmlTable` accepts a pandas or polars DataFrame or an xarray DataArray. Its main arguments:

| Argument | Meaning |
|---|---|
| `rows`, `columns`, `values` | The fields shown as rows, across the top, and as measures. With `aggregate=True` (default) the data is pivoted and summed (`agg` changes how). |
| `values_in` | `'rows'` puts the measures down the side, one row per measure under each row's labels, with only the column fields across the top. |
| `subtotals`, `total_row`, `total_column`, `column_subtotals` | Totals and subtotals. `total_row='frozen'` keeps the total row in view at the bottom, and `total_column='frozen'` the total column at the right edge. |
| `empty_as_zero` | Shows as 0 a sum with no values (a month with no actuals yet), which is otherwise shown empty. |
| `format`, `currency` | How values are shown: `'num'`, `'int'`, `'money'`, `'pct'` (a share: 0.12 shows as 12%), dates like `'month'`, or a `{field: format}` map with decimals, prefixes and how negatives look. |
| `calculated`, `calculated_rows` | Measures or rows computed from others (a margin, a variance). |
| `render` | Inline visuals in cells: bars, heat colors, chips, sparklines, deltas. |
| `tone` | Colors a value as good, bad or a warning. |
| `drilldown`, `hierarchies`, `filterable`, `selectable` | Turn on or restrict drilldown, levels, column filters and row picking. For an index with a hierarchy map, `hierarchies=self.index_hierarchies('products')` takes its levels from the model. |
| `frozen`, `frozen_rows`, `page_size` | Frozen columns or rows, and rows per page. |
| `configurable`, `cell_selection`, `cell_stats`, `excel` | Turn off the layout panel, cell picking, the footer statistics or the Excel button. |
| `edit`, `menu` | Make the table editable, and its right-click menu. See [Editing Data](./html-interface-editing-data.md). |

`pyplan.ui.table(element, options)` accepts, among others, `pageSize`, `height`, `select` (`'single'` or `'multi'`) with `onSelect`, `onRowClick(row)` to open a detail, `render` to draw a cell yourself, `exportable: false` and `persist: false`. Its handle has `reload()`, `state()`, `selection()` and `select(ids)`.

:::tip Report tables
For a small statement that doesn't come from a single node — a profit and loss with hand-picked lines, for example — a plain `<table class="pp-table">` gets Pyplan's table styles, with classes for subtotal and total rows (`is-subtotal`, `is-total`), numeric cells (`num`) and colored values (`is-good`, `is-bad`, `is-warn`).
:::

### Comparing scenarios

When the user compares [scenarios](../scenarios.md), a table can show the values of each scenario side by side. The callback builds its data with `self.get_scenario_comparison('sales', current=sales)` — the node's values in each selected scenario, or `current` when none is selected — and the page reloads it when the comparison changes with `pyplan.on('scenarios', …)`. The node must be among the ones the scenarios saved. `self.is_comparing_scenarios()` tells whether any scenario is selected, and `self.get_selected_scenarios()` returns their names in the order chosen, handy for a legend or to order columns.
