---
sidebar_position: 11
title: Filter Component
---

# Filter Component

The Filter component groups all indices and selectors present in the interface into a single component. We add it during the editing phase, just like any other component.

:::note
Only one Filter component is allowed per interface. When added, it automatically positions itself at the top with a fixed width and height, and it cannot be moved.
:::

![Filter Component](../../img/interfaces/filter_1.png)

## Adding Filters

To add filters to the component, click on the button that appears on the left, which will open a modal where the desired filters can be added.

![Filter Modal](../../img/interfaces/filter_2.png)

To add new filters, press the icon labeled **Add new filter**, which will display a node diagram with available indices and selectors.

![Filter Node Diagram](../../img/interfaces/filter_3.png)

Once the desired indices or selectors are chosen, the nodes are added to the component.

![Filter Added](../../img/interfaces/filter_4.png)

## Managing Filters

When indices or selectors are selected, they are added to a list of filters where the following operations can be performed for each filter:

**1. Select values to filter**

![Filter Select Values](../../img/interfaces/filter_5.png)

**2. Reorder the list by dragging the filter to the desired position**

![Filter Reorder](../../img/interfaces/filter_6.png)

**3. Edit or remove the filter**

![Filter Edit Remove](../../img/interfaces/filter_7.png)

When editing, a new view opens allowing you to modify the format, mode, and other filter properties.

![Filter Edit View](../../img/interfaces/filter_8.png)

## Controlling Filter Visibility

The Filter component can use a **visibility controller** to decide which filters are shown in the interface. We configure this controller with a node that returns the ids of the indices and selectors that must remain visible inside the component.

### Configuring the Visibility Controller

1. Open the interface in edit mode.
2. Select the **Filter** component.
3. In the component toolbar, click **Select visibility controller**.
4. Choose the node that will control which filters remain visible.
5. Save the component configuration.

![Visibility Controller in Toolbar](../../img/interfaces/filter_visibility_controller_toolbar.png)

### How Visibility Works

Once the controller is configured, the Filter component only displays the filters whose ids are returned by that node.

1. In the **Filter component** interface, the Filter component initially shows all configured filters: **year**, **tournament_continent**, **surface**, **selector_2**, and **selector_3**.

![Visible Filters Controlled by Node Output](../../img/interfaces/filter_visibility_controller_result_1.png)

2. In the **filter controllers** interface, a selector node defines which filter ids must remain visible in the Filter component. In this example, we remove **tournament_continent** from that list, as indicated by the red arrow.

![Visible Filters Controlled by Node Output](../../img/interfaces/filter_visibility_controller_result_2.png)

3. When we return to the **Filter component** interface, the Filter component updates its visible filters and **tournament_continent** is no longer displayed.

![Visible Filters Controlled by Node Output](../../img/interfaces/filter_visibility_controller_result_3.png)


:::info
The visibility controller only affects how filters are displayed in the interface. It does not remove filters from the component and it does not clear the values already selected in hidden filters.
:::

:::tip
If no visibility controller is configured, the Filter component continues to display all filters normally.
:::

In edit mode, we can still open the Filter configuration and manage the complete list of filters, including the ones that are currently hidden in the interface.

## Applying Filters

Once the desired filters are added, they can be applied to the corresponding components by clicking **Apply filters**. This will close the modal and show only the filters with one or more selected values in the filter list. Filters with either all elements selected or none selected will not appear in the list.

![Filter Apply 1](../../img/interfaces/filter_9.png)

![Filter Apply 2](../../img/interfaces/filter_10.png)

In the interface list, filters that allow all their values to be deselected will display a delete symbol. Clicking the delete symbol will deselect all the values.

![Filter Delete Symbol](../../img/interfaces/filter_11.png)
