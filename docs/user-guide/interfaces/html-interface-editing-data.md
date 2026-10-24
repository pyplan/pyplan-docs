---
sidebar_position: 4.2
title: "HTML Interfaces: Editing Data"
sidebar_label: Editing Data in HTML Interfaces
---

# Editing Data in HTML Interfaces

The standard table of [HTML interfaces](./html-interfaces.md) becomes an editable grid over a **form** node: users type into it as they would in a spreadsheet, and the changes stay pending until they confirm them. It is how an HTML interface collects data — a purchase request, a sales forecast, adjustments over a plan.

## What the user can do

Typing works as in Excel:

- Typing over a cell replaces its value; **F2**, **Enter** or a double click edit it. **Enter** and **Tab** move to the next cell, **Esc** gives the cell back, and **Delete** empties the editable cells of a range. **Space** ticks a checkbox.
- **Paste** a block copied from Excel: it goes in as one change, continuing past the page when it is longer. A value that lands on a cell that can't be edited is skipped, and you are told how many were. Pasting one value over a range fills it.
- Type **`+10%`** or **`-5%`** in a number cell to change its value by that share (not in a cell shown as a percentage, where it is read as a percentage).
- **Ctrl/⌘ + Z** undoes the last change, one at a time, until you confirm or cancel.
- Selectors show a dropdown with their options; options that depend on the row (a product's presentation, for example) follow the row's values. A multiselect cell takes several values at once.

While you work, the table shows:

- editable cells tinted, and changed cells with a dotted underline;
- refused values outlined, with the reason, keeping the previous value;
- new rows in italics;
- the number of pending changes, with **Confirm** and **Cancel**, beside the table's title.

**Confirm** stores every pending change at once; **Cancel** discards them, after asking. Depending on how the table was built, you may also:

- **add and delete rows** from the right-click menu or the add button;
- be asked to **confirm a large change**, seeing the value before and the one typed, and to give a **reason** for it;
- see **View change history** on the right-click menu, with the changes of the picked cells by day and by person, when the form keeps its history;
- find the indicators computed from the form dimmed while you type, and an **Update indicators** button that computes them from the pending values without saving.

### Editing in Excel

With permission to export components, the Excel button beside the table's title offers **Download to edit in Excel**: a workbook with the editable cells highlighted. After editing it, **Bring back the edited Excel…** loads the sheet's changes as pending changes, checked like the ones typed on the page, and tells you about any cell it skipped. The table can also be opened with the Pyplan Excel add-in, which sends its changes back to the table.

Checkbox, date, selector and multiselect columns can be edited in Excel too:

- **Checkboxes** take `TRUE`/`FALSE` (or 1 and 0).
- **Dates** are typed as dates; a plain number isn't taken as one.
- **Selectors** take one of their options, whatever their capitalization.
- **Multiselect** cells hold their options separated by `;`.

A value the column can't take is refused, keeping the previous one.

## Building an editable table

An editable table is a regular `HtmlTable` whose data is the form node, with an `edit` argument:

```python
from pyplan_core.html_interface import HTMLInterfaceBase, HtmlTable, HtmlEdit, EditField, callback


class HTMLInterface(HTMLInterfaceBase):

    # The widgets computed from the form, named after their nodes,
    # reload after every change.
    WIDGET_NODES = ['purchase_requests', 'requests_total']

    @callback
    def get_requests(self, request: dict = None, filters: dict = None) -> dict:
        return HtmlTable(
            purchase_requests,
            rows=['sku'],
            filters=filters,
            total_row=True,
            edit=HtmlEdit(
                fields={
                    'quantity': EditField(check=lambda v: v > 0, message='Must be positive'),
                },
                add_rows=True,
                delete_rows=True,
            ),
        ).respond(request)
```

```html
<div class="card pp-table-card">
  <h3 data-pyplan-nodes="purchase_requests">Purchase requests</h3>
  <div id="requests" data-pyplan-widget="purchase_requests" data-pyplan-skeleton="table"></div>
</div>

<script>
  pyplan.ui.table('#requests', { callback: 'get_requests' });
  pyplan.loadAll();
</script>
```

Without `edit`, the same table is a read-only listing of the form. With `edit=HtmlEdit()` and no `fields`, every column the form lets users edit becomes editable, each with the editor its type needs.

`HtmlEdit` decides what can be written:

| Argument | Meaning |
|---|---|
| `fields` | `{field: EditField(...)}`: only these fields are editable, with these rules. |
| `add_rows`, `delete_rows` | Let the user add and delete rows, as far as the form allows. |
| `check`, `message` | A rule over the whole row (a date after another, an amount within a budget). |
| `require_reason` | Ask for a reason on Confirm when the changes call for one. |
| `on_change`, `on_confirm` | Methods run after each change, and after a successful Confirm. |
| `read_only` | Shows the grid as closed: nothing can be typed. |
| `history`, `history_button` | The **View change history** menu entry (on by default, for a form that keeps its history), and a button for the form's whole data history. |
| `recalculate`, `update_button` | `'confirm'` holds the recalculation of what depends on the form until Confirm, for slow indicators; `update_button` adds **Update indicators**. |

`EditField` sets the rules of one field: `when` (which rows can be edited: a boolean column of the form or a function over the rows), `check` and `message` (a condition on the new values), `options` and `depends_on` (the values a cell can take, and the columns they depend on), `confirm` and `reason` (when a change counts as large, and where its reason is stored), and `decimals`.

### Adjustments over a plan

The table's data can also be a DataFrame — a forecast, a budget — whose editable fields are stored in a form by keys: `EditField(to=adjustments_form, keys=[...], column='adjustment')`. Typing into a total spreads the change over the rows it adds up (`spread`), and `stale`, `live` or `preview` decide what the table shows of the measures the model derives from the pending values before Confirm.

### The right-click menu

`HtmlTable(..., menu=[...])` sets the right-click menu: built-in entries, `'-'` for a separator, and your own actions with `MenuItem(label, action=...)`, whose method receives the picked rows and cells. `menu=False` turns the menu off. The built-in entries are:

| Group | Entries |
|---|---|
| Copy | `'copy'`, `'copy_with_headers'`, `'copy_as_shown'`, `'copy_as_shown_with_headers'`, `'copy_table'`, `'copy_table_as_shown'` |
| Select | `'select_cell'`, `'select_row'`, `'select_column'`, `'select_table'` |
| Rows | `'insert_above'`, `'insert_below'`, `'add_row'`, `'delete_rows'` |
| Other | `'clear_cells'`, `'export'`, `'history'` |

## Good to know

- **Pending changes live in the form node, in memory**, not in the database, until the user confirms. They survive paging, sorting, filtering and leaving the interface and coming back.
- **Everything is checked on the server**, whatever the page sent: that the cell can be edited, its type, the field's `check`, a selector's options, the form column's own validation and the row rule. Confirm also runs the form's confirm validation; if it refuses, nothing is stored and the changes stay pending.
- When the form keeps its history, confirmed changes are recorded in its [data history](./data-history.md), with the HTML interface (or the Excel add-in) as their source.
- **Name each widget after the node it shows**: after every change, the table reloads the widgets computed from the form by that name.
- The user confirms: an interface never confirms a form from code, and a grid users type into is built with `HtmlTable` and `HtmlEdit`, not with `set_form_values`.
