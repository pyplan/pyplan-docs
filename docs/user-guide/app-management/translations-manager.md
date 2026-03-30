---
sidebar_position: 8
title: Translations Manager
---

# Translations Manager

The Translations Manager in Pyplan allows you to efficiently manage translations within the platform, ensuring that nodes, interface elements, and components are accessible in multiple languages.

## Configuring Translations

Before adding translations to an application, you must first set a default language in the application properties:

![Set App Language](../img/app-management/translations_set_language.png)

This enables translations for the following elements:

- Nodes
- Interfaces
- Interface components
- Menu components

### Nodes

To translate the node title, go to the node properties and navigate to the **Translations** tab. There, you can specify the corresponding translations for the node title:

![Node Title Translations](../img/app-management/translations_node_title.png)

To translate the node documentation, access it the same way as the regular node documentation. The documentation editor will have three tabs, each corresponding to a different language.

![Node Documentation Dialog](../img/app-management/translations_node_doc.png)

### Interfaces

To translate the interface name, access the Interface Manager and open the interface editor. Navigate to the **Translations** tab to enter translations.

![Interface Name Translations](../img/app-management/translations_interface_name.png)

For interface documentation translation, the process is the same as for nodes.

### Interface Components

Custom titles for components are modified from the interface component editing section, within the general settings.

![Component Title Translation](../img/app-management/translations_component_title.png)

### Menu Components

**Item text and item subtitles:**

![Menu Item](../img/app-management/translations_menu_item.png)

**Action text and action subtitles:**

![Menu Action](../img/app-management/translations_menu_action.png)

## Using the Translations Manager

To unify translation management, the Translations Manager was created. This tool lists all translatable items within the application.

To access the Translations Manager, go to **App Management → Translations Manager**:

![Sidebar Menu to Manager](../img/app-management/translations_sidebar_menu.png)

Items are categorized into Nodes, Interfaces, Components, Menu Item Text, Menu Item Subtitles, Menu Action Text, and Menu Action Subtitles.

![Type Items](../img/app-management/translations_type_items.png)

Each row contains a default language column (disabled) and additional columns for other translatable languages. The default language column is automatically populated with values from the respective field.

![Disabled Default](../img/app-management/translations_disabled_default.png)

## Manually Editing Translations

Type translations in the available fields. When you finish editing a field and click outside of it, the value is automatically saved in application memory. These values are not permanently saved until you click the **Save App** button.

![Translate Manually](../img/app-management/translations_manually.png)

## Automatically Translating Items

Click the translation icon in the **Actions** column to automatically translate only the selected item.

![Automatic Translate Item](../img/app-management/translations_auto_item.png)

## Filtering and Searching Items

The **Type** column allows you to filter items by category (Nodes, Interfaces, Components, etc.).

![Filter Options](../img/app-management/translations_filter.png)

You can also search by initial text or parent text to find specific items more easily.

![Search](../img/app-management/translations_search.png)

## Automatically Translating Multiple Items

To automatically translate all filtered items, click the **Automatically complete translations** button.

![Translation Button](../img/app-management/translations_button.png)

A dialog will appear showing the number of elements of each type that will be translated.

![Confirm Dialog](../img/app-management/translations_confirm.png)

Once confirmed, automatic translations will be generated. These translations will not be permanently saved until you click the **Save App** button.

## Editing Documentation Translations

The Translations Manager also allows you to edit and add translations for interface and node documentation. This feature is only available for items that already contain existing documentation.

Items with documentation will display an additional icon in the Actions column to open the Documentation Editor.

![Documentation Icon](../img/app-management/translations_doc_icon.png)

## Viewing Translated Items

To view the translated items, set the desired user interface language from the main menu.

![Select UI Language](../img/app-management/select_ui.png)

All items now display their titles in the selected language.

![Translated Nodes](../img/app-management/translations_result.png)
