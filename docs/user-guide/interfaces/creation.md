---
sidebar_position: 3
title: Creating an Interface
---

# Creating an Interface

Transform your data into actionable insights using user-friendly interfaces. Begin by clicking, and effortlessly tailor the experience to your needs. Easily visualize and comprehend your data without any complexity.

![Interface Example](../img/interfaces/interface_example.png)

:::tip
This page describes **component interfaces**, built by assembling components on a grid. If you need a fully custom layout or tool, you can also build an [HTML interface](./html-interfaces.md) with Pyplan's AI agent.
:::

## Create an Interface

Begin by clicking on the **Create** button to initiate the process.

![New Interface](../img/interfaces/new_interface.png)

Next, personalize your interface by assigning a name and selecting an icon that best represents it. This step adds a touch of uniqueness to your analytics experience.

Dive into the design phase effortlessly. Click on the edit icon to start shaping your interface according to your preferences. This is where you get to tailor the visualization of your data exactly the way you want it.

## Components to Include in an Interface

Adding components to your interface opens up a world of possibilities for customization and functionality. Explore the diverse range of components available to tailor your interface to your specific needs.

![Components](../img/interfaces/components.png)

## Custom Views of an Interface

Each user can save their own custom views of an interface. A custom view may include different components from the original interface, pre-applied filters, and its own arrangement of components within the interface grid. A user can keep several custom views of the same interface and switch between them.

Custom views are only visible to the user who created them. No write permissions on the application are required to create them.

:::info HTML interfaces
[HTML interfaces](./html-interfaces.md) have custom views too, from the same menu. There, a view saves the page's filters and the setup of its tables, and it is only updated when we choose **Save changes to "…"**. See [Custom views of an HTML interface](./html-interfaces.md#custom-views).
:::

### The custom views menu

Click the bookmark button on the interface toolbar to open the custom views menu. Its tooltip shows the view you are looking at, and the icon turns solid while a custom view is shown.

![Custom views menu](../img/interfaces/custom_views_menu.png)

The menu lists the **Original view** (the interface as its author defined it) and each of your custom views. The view being shown is highlighted. Click a view to switch to it.

### Create a Custom View

Select **Save as new view…**, give the view a name and, if you want it to open whenever you open the application, check **Open this view by default**. The new view saves the interface as it is on screen and becomes the view shown.

![New custom view](../img/interfaces/custom_views_new.png)

While a custom view is shown, the changes you make to the interface grid — for example, changing a component from a chart to a table, switching a filter format to a selector, selecting specific values or moving components around — are saved into that view, never into the original interface:

![Custom Views 3](../img/interfaces/custom_views_3.png)

### Choose the view that opens by default

The check on the right of each row marks the view that opens when you open the application. Click the check of another view to make it the default one, or the check of **Original view** to open the interface as defined. Only one view can be the default.

### Rename or delete a Custom View

Use the pencil icon of a view to rename it or change whether it opens by default, and the trash icon to delete it. Deleting the view being shown takes you back to the original view.


### When the original interface changes

When the author of the interface adds components to the original interface or removes components from it, and saves the application, our custom views of that interface no longer match the original. The next time we open one of those views, Pyplan **resets** it: the view is replaced by the updated original interface, and it keeps its name and whether it opens by default. A message tells us that our custom view was reset because the original interface was updated.

Other changes to the original interface — its filters, the order of tables or the arrangement of its components — do not reset our custom views. Components that we add to or remove from our own custom view do not reset it either.

Each version of the application is checked on its own: switching to another version does not reset a view by itself. When a version is created by copying another one, Pyplan compares it with the version it was copied from, so components added in the new version also reset the views opened there.

Our custom views are shared by all the versions of the application. If a view was last changed in another version, where the original interface had different components than in the version we have open, Pyplan does not change it by itself: the custom views icon shows a message with the option to **Reset** the view.

![Custom view differs from the original interface](../img/interfaces/custom_views_differs_callout.png)

While the view does not match, the custom views menu also offers **Reset to the original interface**, even after we close the message.

![Reset to the original interface](../img/interfaces/custom_views_reset_menu.png)

Resetting replaces the view with the original interface of the open version and keeps its name and whether it opens by default. Saving the view in the open version also makes the message go away.

:::info Custom views saved earlier
A custom view saved before this behavior was available is compared with its own components the first time we open it. If we had added components to that view or removed them, it is reset once to the original interface.
:::
