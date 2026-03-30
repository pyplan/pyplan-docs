---
sidebar_position: 5
title: Dynamic HTML Component
---

# Dynamic HTML Component

The HTML Dynamic component lets you embed custom HTML into a Pyplan interface and connect HTML elements to application actions without writing glue code. You can paste or write HTML (including CSS styles and basic behavior) and then, through a configuration panel, link specific HTML elements to actions such as opening interfaces, navigating, or running nodes.

Using this component, you can build highly customized panels (cards, buttons, notifications, banners, etc.) while still keeping all logic connected to the Pyplan model.

![Dynamic HTML Component](../../img/interfaces/html_dynamic.png)

## Layout and Main Areas

When you add an HTML Dynamic component to an interface and open its configuration, you see three main areas:

**Code**
- Large text area where you write or paste the HTML markup.
- Here you can include HTML elements, CSS inline styles, and IDs/classes you will later reference in actions.

**HTML preview**
- Live preview of how the HTML will be rendered in the interface.
- Updates when you run or confirm changes, allowing you to validate the layout and styling.

**Actions**
- A table at the bottom where you define dynamic behaviors for specific HTML elements.
- Each row links an HTML attribute (for example, `id="execute-app"`) with an action type and a corresponding value (such as a node ID or interface name).

## Defining Actions on HTML Elements

Each row in the Actions table describes how a particular HTML element should behave. For each row you configure:

| Field | Description |
|---|---|
| **Attribute** | The HTML attribute used to identify the element. Example: `id`. |
| **Attribute value** | The value of that attribute in the HTML. Example: `execute-app`. |
| **Action type** | The behavior triggered when the element is interacted with (typically on click). |

### Available Action Types

**Open interface**
Opens a specific Pyplan interface. Enter the identifier or name of the target interface in the *Type action value* field.

**Navigate**
Navigates to a specific section of the application, such as Code, Interfaces, Scheduled tasks, or other high-level areas. Enter the navigation target in *Type action value*.

**Run app node**
Executes an application node. Specify the node ID in *Type action value*.
Example: button with `id="execute-app"` and action type *Run app node* with value `fin_run_node`.

**Attributes from node**
Sets one or more HTML attributes based on the result of a node. A typical use case is to dynamically apply styles or classes.
Example:
- Attribute: `id`
- Attribute value: `notification-block`
- Action type: *Attributes from node*
- Type action value: ID of a node that returns a string such as `"background-color: blue; color: white"`, which is then assigned to the `style` attribute of the matching element.

**Children from node**
Replaces the inner content (children) of an HTML element with the result of a node.
Example:
- Attribute: `id`
- Attribute value: `tasks-counter`
- Action type: *Children from node*
- Type action value: ID of a node that returns the string `"You have 2 pending tasks"`.

**Open assistant** *(if available in your installation)*
Opens a contextual assistant or help panel linked to the HTML element.

You can add as many rows as needed using the "+" button in the Actions section. Each row can have its own Attribute, Attribute value, and Action type, allowing multiple interactive elements within the same HTML block.
