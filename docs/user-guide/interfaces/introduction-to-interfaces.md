---
sidebar_position: 1
title: Introduction to Interfaces
---

# Introduction to Interfaces

Manage input and output data seamlessly in Pyplan through intuitive interfaces. These interfaces are comprised of draggable components (widgets) available in a toolbox, facilitating easy customization on the interface screen. The components establish ongoing communication with calculation rules, fostering real-time interaction between users and applications. Instant computation of any modification to an input parameter ensures prompt presentation of the output result to the user.

To access the interfaces module, navigate to the **Interfaces** section in the main menu.

![Open Interface Manager](../img/interfaces/open_interface_manager.png)

## Types of interfaces

Pyplan offers two ways to build an interface:

- **Component interfaces** — the classic approach, where you assemble a screen from draggable components (tables, charts, selectors, indicators, buttons…) on a grid. This is the focus of the pages that follow.
- **[HTML interfaces](./html-interfaces.md)** — an interface whose entire screen is a custom web page connected to your model through Python code. Created by Pyplan's AI agents (or via [MCP](../mcp/overview.md) tools) — and the **default** type when you ask an agent to build an interface — they are ideal for bespoke dashboards and tools whose layout goes beyond the standard components.

Both types live side by side in the Interface Manager and can link to each other.

## Example: Data Planning - Planning App

When opening the Interfaces section, you will find options related to the example in development, such as creating interfaces for Planning App.

![Select Interface](../img/interfaces/select_interface.png)

Clicking on "Planning interface" displays the interface with various input components and output graphics, demonstrating real-time interaction. Here you can see in a first line different input components to select a type of Products or Regions. Interacting with these components you can see the impact on the output graphics below.

![Planning Interface](../img/interfaces/planning_interface.png)

## Editing Mode

By clicking the edit icon in the upper right corner, you access a comprehensive editing mode.

![Enter Edit Mode](../img/interfaces/enter_edit_mode.png)

This mode enables efficient management of existing components and creation of new ones, offering tools for easy adjustments and improvements to your interface design. You can rearrange components, add new filters, or modify existing ones, providing a flexible and personalized planning experience.

![Edit Mode](../img/interfaces/edit_mode.png)
