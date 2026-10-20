---
sidebar_position: 13
title: Upload Manager
---

# Upload Manager

The Upload Manager component centralizes file upload and download actions, avoiding the need to navigate to the file manager or implement a custom component for basic file handling functions.

It is added to the interface during the editing phase by dragging the icon and creating a new component that initially appears as an empty table.

![Upload Manager](../../img/interfaces/uploadmanager_1.png)

Once the component is created, each new item must be configured using the **Add** button in the component header.

![Upload Manager Add](../../img/interfaces/uploadmanager_2.png)

## Upload Item Configuration

Clicking **Add** opens a dialog with the basic configuration options for each item in the component. Each item corresponds to a file that will be uploaded or downloaded. The configuration options include:

- **Item name**: A descriptive name that represents what the file is or its purpose.
- **Path selection mode**: Specifies how the file path will be selected. It can be a fixed path defined as "Custom," a path relative to the application, or a path relative to the application version.
- **File path**: Specifies the file's location in the system. A checkbox above this field allows you to choose whether to preserve or modify the file name when uploading a new file (default: preserve the file name).
- **Base file path**: Defines a base file that can serve as a reference or template. When uploading a new file, this reference can be used to perform field or structure validations.

:::note
The file path fields must refer to a file that already exists in the system and has been previously uploaded via the file manager.
:::

Below the file path configuration, there is an optional section to define nodes that perform actions when a new file is uploaded or a file is restored from history:

- **Validation node**: Runs custom validations when a new file is being uploaded. It should be a function-type node that receives a file path as a parameter and returns a boolean indicating validation success.
- **Callback node**: Executed once the file has been successfully uploaded or restored from history. It allows for additional actions such as notifying the user or updating other components. It is a function-type node that receives no parameters and returns no value.
- **Invalidation node**: Also executed after a successful upload or restore, but used to invalidate a selected node for a specific purpose. No specific structure is required.
- **History count**: A numeric field to define how many historical versions of the uploaded files the item will keep.
- **Run callback and invalidate nodes when restoring a file from history**: Enabled by default. When checked, restoring a file from history runs the invalidation node and the callback node, just like a new upload. Uncheck it if these nodes should only run on new uploads, for example when the callback has side effects that shouldn't be repeated. The option is available only when a callback or invalidation node is set, and it's hidden in folder mode, which has no history.

:::note
The invalidation node and the callback node run after the file is saved. If one of them fails, the file stays uploaded (or restored) and the table shows it, but an error message indicates which node failed. If the invalidation node fails, the callback node doesn't run.
:::

**File mode options:**
- **Select file mode** (default): A checkbox lets you choose to preserve the current file name or replace it with the uploaded file's name. In this mode, the current file path input must be a file — folders are not allowed.
- **Select folder mode**: Only a directory can be chosen. Files uploaded to this directory will not overwrite each other, unlike in file mode where each new upload replaces the previous one.

![Upload Manager Config](../../img/interfaces/uploadmanager_config_1.png)

### Advanced Options

Click **Advanced Options** to access additional settings:

![Upload Manager Advanced](../../img/interfaces/uploadmanager_4.png)

- **History path**: Defines a path where historical versions of uploaded files will be stored. If not specified, the system uses the same directory as the current file.
- **Select an interface to navigate to**: Lets you navigate to a specific interface to validate special behavior when uploading a new file.
- **Additional information of file**: Allows adding extra information about an item, displayed in the table as a tooltip.
- **Automatic validations based on base file**: Three checkbox options that activate automatic validations:
  1. Spreadsheet validation: Checks if the spreadsheet complies with a specific format.
  2. Column name validation: Ensures column names match the expected names.
  3. Data type validation: Verifies that data types match the expected types.

![Upload Manager Config 2](../../img/interfaces/uploadmanager_config_2.png)

At the bottom, you can choose to show or hide action icons for each item:
1. Show base file download button
2. Show uploaded file download button
3. Show upload new file button
4. Show upload history button

#### Access

The **Access** section defines which users can see the item and upload files to it:

- **Everyone** (default): The item is available to every user who can open the interface.
- **By departments**: Only users who belong to at least one of the selected departments can see the item.
- **By users**: Only the selected users can see the item.

When a restriction is chosen, at least one department or user must be selected.

![Upload Manager Access](../../img/interfaces/uploadmanager_access_1.png)

Users without access don't see the item in the table, and cannot upload files to it or view, restore or delete its history.

Users who can edit interfaces see every item while the interface is in edit mode, so they can configure them. Outside edit mode they follow the same rules as any other user. In edit mode, restricted items show a lock icon next to their name; hovering over it lists the allowed departments or users.

## Table with New Configured Item

Once configured, items are displayed in the component's table with: item name, base file name, current file, date and time of last modification, the user who modified it, and available actions.

Each row represents an uploaded or downloadable file, and allows actions such as downloading the base file, downloading the uploaded file, viewing the upload history, uploading a new file, or navigating to an interface.

In component editing mode, each item can be modified or deleted.

![Upload Manager Table](../../img/interfaces/uploadmanager_config_3.png)

## Actions on Items

### Uploading a File

Click the upload button to open a dialog where you can select the file to upload.

![Upload Manager Upload 1](../../img/interfaces/uploadmanager_7.png)

![Upload Manager Upload 2](../../img/interfaces/uploadmanager_8.png)

Once selected, automatic validations are performed and the file is uploaded into the system. If the item has an invalidation node or a callback node, they run after the file is saved.

![Upload Manager Upload 3](../../img/interfaces/uploadmanager_9.png)

![Upload Manager Upload 4](../../img/interfaces/uploadmanager_10.png)

After a successful upload, the component's table is updated to reflect the new file, showing the user who performed the upload and the upload date, as well as the size of the newly uploaded file.

![Upload Manager Updated](../../img/interfaces/uploadmanager_16.png)

### Viewing Upload History

Click the history button to open a dialog listing the previous versions of the file. Each entry is a version that was replaced by an upload or a restore, and shows the date it was replaced, the user who replaced it, and its size. From this dialog, you can download a previous version, restore it, or delete it from the history.

![Upload Manager History 1](../../img/interfaces/uploadmanager_12.png)

![Upload Manager History 2](../../img/interfaces/uploadmanager_config_4.png)

#### Restoring a File

Restoring a version replaces the current file with the selected one, after a confirmation. The replaced file is added to the history as a new entry, so you can go back to it by restoring it. If **Preserve existing filename** is checked, the restored file keeps the current file name; otherwise, it gets back the name it had when it was uploaded.

If **Run callback and invalidate nodes when restoring a file from history** is checked (the default), the invalidation node and the callback node run after the file is restored, as they do after a new upload. If one of them fails, the file is still restored, and a warning notification shows which node failed and why.

### Folder Mode

If the **Select folder mode** option is selected, the uploaded files within the folder can be accessed for download or deletion. The table item will display a folder icon and will not have a history, since files are uploaded without being overwritten.

![Upload Manager Folder 1](../../img/interfaces/uploadmanager_17.png)

![Upload Manager Folder 2](../../img/interfaces/uploadmanager_config_5.png)

### Customizing Columns

In component editing mode, you can choose which columns to display in the component's table item list.

![Upload Manager Columns](../../img/interfaces/uploadmanager_14.png)

### Reordering Items

Reorder items in the table by dragging them to the desired position using the icon on the left side of each item.

![Upload Manager Reorder](../../img/interfaces/uploadmanager_15.png)
