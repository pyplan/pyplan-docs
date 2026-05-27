---
sidebar_position: 2
title: Versions
---

# Versions

When we create an application, Pyplan automatically creates a default version. Every time we open the application, we are always working in one specific version, which is shown in the top bar next to the app name.

An application can contain multiple versions. Each version is a complete snapshot of the app that includes:

- Calculation logic (nodes and influence diagrams)
- Interfaces
- Scenarios
- Data and form definitions
- Other input elements and configuration

The structure of an application is as follows:

![App Version Structure](../img/app-management/app_new_structure.png)

Versioning can be used in different ways, for example as part of a development cycle (dev / test / prod), or to manage planning cycles (one version per period, scenario, or plan).

:::info Concurrent use
Two users can work (and save changes) at the same time on different versions of the same application, without interfering with each other.
:::

## Version Manager

To open the Version Manager, go to the main menu and click **Versions**.

![Version Manager](../img/app-management/version_manager.png)

From the Version Manager you can:

- Create new versions.
- Edit version properties (name, tags, status).
- Organize versions into groups using a logical path structure.
- Export and import versions.
- Change the status of a version (Active, Closed, Archived).

## Version Groups

Pyplan allows us to organize versions using a **Version group** field. This field behaves like a logical path and uses the `/` character as a separator, which lets us represent a directory-like structure inside the Version Manager.

For example, we can define values such as:

- `Planning`
- `Planning/2026`
- `Planning/2026/Q1`
- `Planning/2026/Q2`

When at least one non-archived version has a value in **Version group**, the Version Manager automatically switches to a grouped view. In this view, versions are displayed in a tree structure that follows the path defined in the field.

This behavior helps us keep long version lists organized without requiring any additional configuration when opening the manager.

![Grouped Version Manager](../img/app-management/version-manager-grouped-versions.png)

:::tip
We can use **Version group** to represent environments, planning cycles, business areas, or any hierarchy that helps us organize versions consistently.
:::

### Creating a New Version

To create a new version, click **Create version** in the Version Manager.

A dialog opens where you configure:

- **Base version**: every new version is created from an existing one, so all content of the selected base version is copied to the new version.
- **Name**: the name of the new version.
- **Tags**: optional labels to help search and organize versions (type a tag and press Enter to add it).
- **Version group**: an optional logical path used to organize versions in the grouped view. We can write a single level such as `Planning`, or a multi-level path such as `Planning/2026/Q1`.
- **Set as default version**: if enabled, this new version becomes the default version that opens when the application is launched.
- **Open after creating**: if enabled, the new version is opened immediately after creation.

Click **Confirm** to create the version.

![Create Version](../img/app-management/create_version.png)

![Create Version with Version Group](../img/app-management/create-version-group.png)

### Grouped Navigation in the Version Manager

When versions are organized with **Version group**, we can expand and collapse the groups directly in the Version Manager. Each path segment becomes a grouping level, and versions are shown at the corresponding leaf level.

For example, if we define these groups:

- `Planning/2026/Q1`
- `Planning/2026/Q2`
- `Operations/Weekly`

Pyplan renders them as nested groups, making it easier to browse related versions and identify the context of each one.

Versions without a group are displayed in a separate uncategorized section within the grouped view.

## Version Status

Each version can have one of the following statuses:

| Status | Description |
|---|---|
| **Active** | The version is in use and can be modified. Typically used for ongoing development or planning cycles. |
| **Closed** | The version is locked. It remains visible in the lists, but no further changes can be made. Useful for freezing a version at the end of a cycle while still allowing users to open and review it. |
| **Archived** | The version is closed and archived. It cannot be modified and is hidden from the main listings, helping keep the Version Manager clean while still preserving historical versions for audit or reference. |

By combining versions and statuses, you can manage the full lifecycle of an application — from development and testing to locked and archived snapshots — while allowing multiple users to work safely in parallel on different versions.
