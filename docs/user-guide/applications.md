---
sidebar_position: 2
title: Applications
---

# Pyplan Application

A Pyplan application is built to solve a specific business problem by combining different capabilities of the platform. Using Pyplan, we can design applications for, among others:

- Demand planning
- Sales & Operations Planning
- Financial planning
- Pricing
- Budgeting and planning
- Forecasting

Each application brings together data, logic, and user interfaces to support a particular decision-making process.

## Application Elements

A Pyplan application usually includes several core elements:

- **External data sources:** Components that let us import data from different systems or files.
- **Data input forms:** Interfaces where users can enter or adjust input data.
- **Calculation and processing modules:** Logic that performs computations, transformations, and other data processing tasks.
- **Visualization interfaces:** Dashboards, charts, and tables that present results and insights in a clear, visual way.

> All these elements are organized and executed within a workspace.

## Workspaces

Users with permission to create applications have access to different types of workspaces:

- **Public workspace:** A shared area where applications are visible and accessible to all users.
- **My workspace:** A personal, private area where we can create, modify, and test our own applications.

> We can also access team workspaces, called **Teams**, to share applications and information with a restricted group of users.

## Teams

Teams are configured by system administrators. Access to each Team is defined by the **Department** (or departments) associated with each user.

A user can belong to multiple Departments, and therefore have access to multiple Teams and their corresponding applications.

## Application Manager

The **Application Manager** is the main interface for navigating, organizing, and managing the applications we can access. It provides tools not only to open applications and folders, but also to create, import, organize, and perform actions according to our permissions.

In the Application Manager we work on a mosaic of application cards and folders. From here we can:

- Create new applications or folders
- Import applications
- Show hidden folders (when we have permission)
- Manage our own applications and folders
- Manage Teams applications and folders
- Manage Public applications and folders
- Browse and search through all accessible applications

![Application Manager](./img/applicationmanager_1.png)

We can create both **applications** and **application folders** directly from the Application Manager.

To create a new application or folder, we click the **Create** button and choose:

- **Create App** – creates a new, empty application that we can later configure and edit.
- **New Folder** – creates a folder that can contain multiple applications and/or subfolders.

![Create options](./img/applicationmanager_2.png)

If we select **New Folder**, a dialog opens where we enter the folder name. The location of the new folder is determined by:

- The current tab selected (for example, _My apps_ or _Public apps_), and
- The current path, if we are already inside another folder.

![New Folder](./img/applicationmanager_3.png)

The same logic is used when we create new applications.

![New Application](./img/applicationmanager_4.png)

### Actions on folders

For folders, we can perform the following actions:

- **Rename**
- **Copy**
- **Cut**
- **Download**
- **Delete**

![Folder actions](./img/applicationmanager_5.png)

### Actions on applications

For applications, we can perform the following actions:

- **Open as read-only:** open the application in [read-only mode](#read-only-and-write-mode), so changes cannot be saved.
- **Open in write mode:** shown instead of *Open as read-only* when the application is configured to [open as read-only by default](#opening-an-application-read-only-by-default). It opens the application in write mode.
- **Open application in new instance:** open the application in a separate instance, useful for working in parallel on different apps or versions.
- **Select version and open app:** choose a specific version of the application and open it, for example to review or reuse an earlier version.
- **Select resources and open app:** open the application with a specific set of resources, different from those assigned by our Department.
- **Direct access link:** generate a direct link to open the application, optionally selecting a version and enabling read-only access.
- **Rename**
- **Copy**
- **Cut**
- **Other copy options:** copy the application to another location, copy it to a Team or to Public, or create a new app from the existing one.
- **Set thumbnail:** assign a custom thumbnail image to the application.
- **Remove thumbnail:** remove the custom thumbnail and return to the default image.
- **Download**
- **Delete**

![Application actions](./img/app_manager.png)

### Direct access link

We can generate a **direct access link** from the application contextual menu to open a specific application directly. This option is useful when we need to share quick access to an app and, if necessary, point to a specific version.

To generate a direct access link, we follow these steps:

1. In the **Application Manager**, we open the contextual menu of the application.
2. We select the **Direct access link** option.
3. In the dialog, we choose whether we want to use the default version or a specific version.
4. If needed, we enable **Open as read-only** so the application opens without allowing changes. If the application is configured to [open as read-only by default](#opening-an-application-read-only-by-default), the link always opens it in read-only mode, even with this option disabled.
5. We click **Generate link**.
6. We copy the generated URL and share it with the corresponding users.

![Direct access link option in the application menu](./img/app-management/application-menu-direct-access-link.png)

![Direct access link dialog](./img/app-management/direct-access-link-dialog.png)

:::info
The generated link includes the selected application and can also include a specific version and the read-only mode configuration.
:::

## Read-only and write mode

Only one session at a time can save changes to a given version of an application. The first user who opens that version, and has permission to edit it, gets **write mode**. Anyone who opens the same version afterwards gets **read-only mode**, and Pyplan shows a notification with the name of the user who is working on it.

An application also opens in read-only mode when:

- We choose **Open as read-only** in the application menu.
- We do not have permission to edit the application.
- The status of the version is not *Active*.
- The application belongs to a Team where our Department only has read-only access.

In read-only mode we can still navigate the application, run nodes and modify it within our session, but the **Save** button is disabled. Hovering over it shows why the application is read-only.

### Opening an application read-only by default

When an application is used by people who only occasionally need to save, simply opening it would leave them in write mode and block other users, such as the developers maintaining the app, until they close it. For these applications we can enable **Open as read-only by default** in [App properties > App configuration](./app-management/app-properties.md#app-configuration).

With this option enabled:

- Opening the application by clicking its card opens it in read-only mode. The same applies when it opens on login, in a new instance, or after selecting a version.
- The application menu shows **Open in write mode** instead of **Open as read-only**. It is only shown to users who can edit the application.
- In **Select resources and open app**, the **Open as read-only** option starts enabled. Disabling it opens the application in write mode.
- [Direct access links](#direct-access-link) and the [`pp.open_app`](./code/pyplan-functions.md#open_app) function always open it in read-only mode.
- Reloading the application keeps the mode it was opened in.

![Open in write mode option in the application menu](./img/app-management/application-menu-open-in-write-mode.png)

:::tip
Write mode still follows the rule of one session per version: if another user is already working on the version in write mode, choosing **Open in write mode** opens it in read-only mode and shows who is using it.
:::

### Claiming write mode while the application is open

If we opened an application in read-only mode and then need to save our changes, we do not have to close it and open it again. From the top bar we click **Save as** and choose **Claim write mode**. The option is shown while the application is read-only and we have permission to edit it.

![Claim write mode option in the Save as menu](./img/app-management/save-as-menu-claim-write-mode.png)

If the claim succeeds, Pyplan shows *You can now save your changes*, the **Save** button is enabled, and every change we made in the session is kept.

Pyplan refuses the claim, and the application stays in read-only mode, when:

- **Another user is working on the version in write mode.** The message shows who is using it. We can claim write mode again once that user closes the application.
- **Someone saved the version after we opened it.** Saving our session would overwrite their work, so the message shows who saved it.
- **We do not have permission to edit the application, or the version is not active.**

:::warning
When someone saved the version after we opened it, our session no longer matches the saved application. To keep our changes, we use another **Save as** option, such as *Save as new version*. To work on the latest saved version, we reopen the application.
:::

### Move folder app example

We can move applications and folders to any path where we have access.
For example, we can take an application located inside a personal folder in **My apps** and move it to an **IT** Team workspace, so that members of that Team can see and use it.

![Move step 1](./img/applicationmanager_7.png)

![Move step 2](./img/applicationmanager_8.png)

![Move step 3](./img/applicationmanager_9.png)
