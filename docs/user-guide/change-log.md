---
id: change-log
title: Change Log
sidebar_label: Change Log
sidebar_position: 99
---

# Change log
All notable changes to Pyplan will be documented in this page:

## Version 3.17
### Version 3.17.20 - 2026-03-25
- Updates
  - Allow Developer agent to modify the identifier of a node.
  - Enable autocompletion of a node's ID in the chat text field when Alt + click is performed on a node.
  - Allow Developer agent to list all application modules.
  - Set the suggested filename to the node's ID when exporting a node.
- Fixed Issues
  - Opening an app with large archived versions takes a long time and consumes a significant amount of RAM.
  - The default option "Show component settings icon" is incorrectly applied to the diagram.
  - Modifications to a heavy DynamicHtml component may not be saved if changes are confirmed in quick succession due to a race condition.
  - Changes made to a selected node via the Developer agent are not reflected in the code or result widgets until the node is deselected and reselected.
  - If a node returns a dictionary containing an "error" key, the component fails to render.
  - When creating new users, the available departments from the wrong company are sometimes displayed.
  - Minor fixes
### Version 3.17.19 - 2026-03-20
- Updates
  - Improvements to AI traces
- Fixed Issues
  - Fixed an issue where adding a new action in the DynamicHtml component could inadvertently modify multiple rows simultaneously.
  - Minor fixes
### Version 3.17.18 - 2026-03-19
- Updates
  - Implement a native trace view to decompose and follow the execution of AI agents
  - Add an option in the chat dropdown menu to navigate to the trace view in a new tab.
- Fixed Issues
  - Fixed an error that occurred when attaching a file in the agent chat window.
  - Minor fixes
### Version 3.17.17 - 2026-03-18
- Updates
  - New Solution Architect agent capable of designing solutions by utilizing the Developer and Visualizer agents
  - Enhance the Visualizer agent.
  - Provide feedback in the agent chat while executing context nodes to inform the user that processing is ongoing.
  - Improve agents chat UI
  - Automatically add quarterly and semester hierarchies in addition to existing date hierarchies when a date field is detected.
  - Add a version search selector in the Applications manager to differentiate between searching for 'Applications' or 'Versions'.
  - Do not raise an exception if the endpoints logging the progress of scheduled tasks fail.
  - Set the isolate_styles property to True when creating an HTML component.
  - Export conversations with an agent in markdown format.
  - Add an option in default styles to show/hide the component configuration icon.
- Fixed Issues
  - Filtering a multiselect column in forms is incorrectly applied, resulting in an empty table.
  - When editing a filter component, attempting to add another one results in a blank state.
  - Minor fixes
### Version 3.17.16 - 2026-03-10
- Updates
  - Allow Developer agent to navigate an application.
  - Revert the isolate_styles property of the HTML component to False by default.
- Fixed Issues
  - Minor fixes.
### Version 3.17.15 - 2026-03-09
- Updates
  - Allow sorting by multiple dimensions in tables and charts.
  - Add new numeric format presets: “Accounting” and “Finance”.
  - Add an in-line agent to assist with development in HTML and Dynamic HTML components.
- Fixed Issues
  - Fix issues with selectors in forms.
  - Minor fixes.
### Version 3.17.14 - 2026-03-07
- Updates
  - Add information about the current reasoning state in agents.
  - Add new default application styles.
  - Improve table export functionality.
  - Improve the component used to document nodes, interfaces, and apps.
  - Add a new parameter to the pp.run_scheduled_task function to send emails when execution finishes.
  - Allow sorting by date in the File Manager.
  - Improve the format of exported chat files in agents.
  - Context/tool improvements in the developer agent.
  - The developer agent now supports uploading Excel files.
- Fixed Issues
  - Fix an error when reading Excel files from the data reader node.
  - Filter component is missing the confirm button when editing.
  - Fix an issue where the generated ZIP file is sometimes corrupted when archiving versions.
  - Fix an error in the Analyst agent when passing a node containing a table.
  - Fix license expiration warning emails not being sent correctly.
  - Minor fixes.
### Version 3.17.13 - 2026-02-27
- Updates
  - Fix an issue where archiving a version grants edit permissions in the app.
  - Set the isolate_styles property of the HTML component to True by default.
- Fixed Issues
  - Fix an issue when using the Analyst agent if the interface has no documentation.
  - Fix an issue when using agents through the pp.agent_chat function.
  - Minor fixes.
### Version 3.17.12 - 2026-02-26
- Updates
  - Improve scenarios.
  - Improve AI agents.
  - Allow canceling the application loading process.
  - Improve file move and copy operations in the File Manager.
  - Allow sorting the historical files table in the Upload component.
  - Display company license information in Pyplan.
  - Update Polars to version 1.38.1 in the Python 3.12 image to resolve a Rust-related bug in Polars.
- Fixed Issues
  - Fix an issue where a scheduled task instance keeps running if the target node does not exist.
  - Fix an issue when configuring a scheduled task to run monthly on the 30th or 31st.
  - Fix the “Go to definition” option not working when the first line of a node definition is empty.
  - Minor fixes.
### Version 3.17.11 - 2026-02-20
- Updates
  - Adjust agent context handling.
- Fixed Issues
  - Fix a visual issue where a dialog in the File Manager shifts downward the first time it is opened.
  - Minor fixes.
### Version 3.17.10 - 2026-02-19
- Fixed Issues
  - Minor fixes.
### Version 3.17.9 - 2026-02-19
- Updates
  - Add new options to application default styles settings.
  - Allow ordering tasks by last execution status in Task manager.
- Fixed Issues
  - Minor fixes.
### Version 3.17.8 - 2026-02-13
- Updates
  - Improvements to the Automation tests manager.
  - Improvements to multiselect Form columns.
  - Display the scheduled task name in the Instance manager for scheduled task instances.
- Fixed Issues
  - Fix an issue where installing libraries is not allowed in the environment when opening an app using an app pool instance.
  - Minor fixes.
### Version 3.17.7 - 2026-02-12
- Updates
  - Add the ability to set a default column width for all columns in a table.
  - Implement node search from the diagram in Forms and Selector wizards.
  - Add additional validation controls when assigning a user to a company.
- Fixed Issues
  - Fix an issue in non-pivot tables where the filter icon does not appear in the first column when the index column is hidden and column filtering is enabled.
  - Fix an issue where the interface fails to render if a component references a non-existent node.
  - Fix an issue where pressing the Delete key while editing a folder name triggers the delete folder dialog.
  - Fix the MFA enable/disable parameter not working in bulk user creation.
  - Minor fixes.
### Version 3.17.6 - 2026-02-05
- Updates
  - Allow setting a task due days in days using a calendar.
  - Add the ability to configure the company logo for Workflow email templates.
  - Allow the Process agent to access information about process descriptions and tasks from Workflow.
  - Add an “Edit node documentation” button to interface components.
- Fixed Issues
  - Fix an issue where, when a form is at the end of the interface, a dropdown with many options in the last row cannot be fully viewed or scrolled.
  - Minor fixes.
### Version 3.17.5 - 2026-02-04
- Updates
  - Allow selecting multiple responsibles for a task in Workflow.
  - Send task descriptions in Workflow emails.
  - Improve the speech-to-text functionality for agents.
  - Add translations to part of engine messages.
- Fixed Issues
  - Scheduled task ID copy button is not working.
  - Fix an issue where copying a large version in the File Manager sometimes does not complete correctly.
  - Minor fixes.
### Version 3.17.4 - 2026-01-29
- Updates
  - Allow setting default styles for the entire app.
  - Implement speech-to-text in the Agent chat window.
  - Improve table visualization in the Agent chat window.
  - Add an HTML editor to workflow process and task descriptions.
  - Add an option to send live notifications to users who are active in the app.
  - Allow numeric values to be provided as strings in input nodes when they are preceded by the '`' character.
  - Add support for bulk user creation.
  - In Home, automatically select the Public Applications tab when the selected tab has no applications.
  - Display processing time in minutes when it exceeds 60 seconds.
  - Add a progress bar when downloading files in the File Manager.
- Fixed Issues
  - Fix an issue where a process task marked as expired cannot have its status changed.
  - Fix an issue where the UserInstance is not removed when a scheduled task fails because the app does not exist.
  - Fix an issue where outputs are not refreshed after modifying forms and input cubes with agents.
  - Fix an issue where the InputValue component breaks when entering pseudo-numeric values containing hyphens.
  - Minor fixes.
### Version 3.17.3 - 2026-01-19
- Updates
  - Display text across multiple lines in Boxes-type menus.
  - Allow changing the default value of a preference.
  - Allow customization of validation messages in Input Scalars.
- Fixed Issues
  - Fixed sorting by different columns in the User Manager.
  - Fixed an error when exporting Polars tables with columns sharing the same name.
  - Minor fixes.
### Version 3.17.2 - 2026-01-14
- Updates
  - New application testing functionality.
  - Allow the Analyst agent to use specialized tools from the Visualizer agent.
  - Improved the API CPU and RAM usage charts.
  - Add logging for engine resource usage.
  - Enable editing company preferences through a JSON editor.
- Fixed Issues
  - Fixed an issue where the first instance could become unresponsive when opening another version in a new instance.
  - Minor fixes.
### Version 3.17.1 - 2026-01-12
- Updates
  - Add support for models such as Gemini and Claude in agents.
  - New InputCube Completer assistant.
  - Add functionality to define a role per company.
  - Add more filter and sort options in the User Manager.
  - UI improvements in Workflow.
- Fixed Issues
  - Fixed an issue when logging in via SAML if the email contained uppercase characters.
  - Numeric values in input-type nodes have no styles applied.
  - Minor fixes.
### Version 3.17.0 - 2026-01-02
- Updates
  - Improvements to the implementation of scheduled tasks execution.
  - Enhancements to the encryption of users’ personal data.
  - Improvements to custom agents and the Form Completer.
  - Other improvements.
- Fixed Issues
  - Resolved an issue when consolidating an app that includes appDocumentation.
  - Addressed a conflict when two users created a version with the same name.
  - Minor fixes.
## Version 3.16
### Version 3.16.9 - 2025-12-22
- Updates
  - In application consolidation, allow comparing files outside the versions folder.
- Fixed Issues
  - When selecting a filtered value in a selector, a wrong value is selected.
  - Tables throw an error when they have two or more dimensions in rows and columns and one column dimension has a custom sort.
  - When re-enabling a scheduled task, it runs immediately.
  - Minor fixes.
### Version 3.16.8 - 2025-12-12
- Updates
  - Add an option to sort values when filtering dimensions.
  - Add a company filter in the Users manager.
  - Add the ability to move actions between different items of a menu.
  - Add a new parameter to scalar input to allow hiding input characters.
- Fixed Issues
  - Process tasks sometimes display an incorrect completion date.
  - In process tasks, the “delayed” status does not update correctly when the date is changed.
  - Double-clicking a node adds it twice to the interface.
  - Error when trying to load an image in an HTML component from the Media folder.
  - When opening an interface with the Analyst agent, components are added as context.
  - Visualizer agent does not work with alias-type nodes.
  - Minor fixes.
### Version 3.16.7 - 2025-12-04
- Updates
  - Allow filtering NaN/null values in interfaces.
  - Allow creating a new version in the "Open application in new instance" dialog when the app is configured to show the version list by default on open.
- Fixed Issues
  - Operations on forms using the FormCompleter agent bypass the component’s custom code.
  - Minor fixes.
### Version 3.16.6 - 2025-12-03
- Updates
  - Add functionality for agents to create and modify form-type nodes.
  - Allow adding more than one node at a time in interfaces.
  - Add an option to automatically mark tasks as overdue when the deadline is reached.
  - Add the ability to copy and paste the general configuration options of a component.
  - Add an option to hide the settings icon in interface components.
- Fixed Issues
  - Error in Analyst agent with numeric index-type nodes.
  - Issue when trying to resize components in an interface.
  - Improve user experience when creating a data-reading node.
  - When creating new scenarios (from the scenarios button), it does not execute the nodes that should run beforehand as defined in the template.
  - Disable dataframe wizards when the node is a Polars dataframe.
  - Pressing Enter in the "open app / create new version" dialog closes the dialog unexpectedly.
  - In Process Manager, do not list deactivated users.
  - Minor fixes.
### Version 3.16.5 - 2025-11-25
- Updates
  - Add MFA OTP code expiration time as a company preference.
- Fixed Issues
  - API endpoints are not working.
  - The function pp.pandas_from_dataarray changed its behavior in the Python 3.12 version used.
  - When editing a workflow task, it appears duplicated in the “block by” list of other tasks.
  - When changing the ID of a node used as a mapping for index hierarchies, the index is not updated with the new ID.
  - Error in uploadManager when restoring a file.
  - Minor fixes.
### Version 3.16.4 - 2025-11-19
- Updates
  - Adjustments to the Analyst agent functionality.
  - Improved column filtering with nested headers in forms.
  - Allow ordering dimension elements by providing an index.
  - Add filters to the consolidation tool to show only definition changes and filter by node type.
- Fixed Issues
  - Improve the user experience when performing drilldowns.
  - Minor fixes.
### Version 3.16.3 - 2025-11-14
- Updates
  - Improvements in AI Agents.
  - Allow exporting multiple interfaces and interface folders.
  - Allow importing ZIP files containing interface folders.
  - Modify the function pp.get_user_list() so it returns only the departments of the current company.
- Fixed Issues
  - Minor fixes.
### Version 3.16.2 - 2025-11-13
- Fixed Issues
  - Minor fixes.
### Version 3.16.1 - 2025-11-12
- Fixed Issues
  - Issue when adding a component while the interface has vertical scrolling.
  - When applying drilldowns on a table with more than one measure, the calculation is incorrect.
  - User profile page does not scale correctly when zooming.
  - When a selector in range format has a first value of zero, selecting the 0 value does not work correctly.
  - Minor fixes.
### Version 3.16.0 - 2025-11-11
- Updates
  - Implement AI agents.
  - Add company preference to send emails in different languages.
  - Preserve table configuration when enabling/disabling scenario comparison.
  - Add an option to hide legends in combined charts for series with no data.
  - Add an option to select the “stacked columns” subtype in combined charts.
  - Highlight the selected row/column in a table.
  - New option to run a scheduled task when completing a task in a process.
  - New pp.agent_chat function for interacting with an agent (https://docs.pyplan.com/en/user-guide/code/pyplan-functions#agent_chat).
  - New pp.send_email function to simplify sending emails from an application (https://docs.pyplan.com/en/user-guide/code/pyplan-functions#send_email).
- Fixed Issues
  - Scroll bar is not visible in component configuration when editing a component in the diagram.
  - Error when creating app pools with more than one instance if the app needs to evaluate nodes that take minutes to execute.
  - When a table has a “calculated item B” that depends on another “calculated item A”, filtering to show only “item B” does not calculate it correctly.
  - When filtering a table to show only a calculated item (and none of the regular items), filtering another dimension does not display the list of available values.
  - Minor fixes.
## Version 3.15
### Version 3.15.11 - 2025-10-28
- Updates
  - When saving scenarios from an interface, exclude components that cannot be saved by scenarios from the list.
- Fixed Issues
  - Disable the import button while importing a module.
  - Issue with calculated measures and column order when calculated items are present.
  - Minor fixes.
### Version 3.15.10 - 2025-10-22
- Updates
  - Allow specifying who can view a scenario.
  - Allow using a multi-select selector as a related column in Forms.
  - Add an icon in interface components to go directly to a component's configuration without entering interface edit mode.
  - In the "Open application" dialog with version selection, add an icon to create a new version from the selected one.
  - Allow inserting line breaks when editing an InputScalar component.
  - Add "Last modified" date to the versions listing.
  - Add an option to send scheduled-task emails only when the task fails.
  - Do not restrict component configuration when the component contains custom code.
- Fixed Issues
  - Opening a version in a new instance allows multiple instances of the same app and version with write permissions.
  - WebSocket connection is sometimes lost when opening a version in a new instance.
  - Tables do not update correctly when scenario comparison is enabled.
  - If a user has two departments and both are assigned to the same team, Kubernetes fails when creating the pod.
  - Synchronization error of hierarchical indices when switching from table to chart.
  - Deleting all documentation causes an error.
  - Adding a calculated measure to a flat Polars table causes an error.
  - When creating a conditional style of type "expression", the component's custom code is incorrectly generated.
  - Minor fixes.
### Version 3.15.9 - 2025-10-06
- Updates
  - Add close icon to some notifications.
- Fixed Issues
  - Fix node/module documentation.
  - Minor fixes.
### Version 3.15.8 - 2025-10-05
- Fixed Issues
  - Qfix for a Kubernetes property.
### Version 3.15.7 - 2025-10-03
- Updates
  - Allow the user to sort elements of a dimension in an interface.
  - Highlight InputNode components in interfaces.
  - Improvements to upload management. 
  - Improvements in node documentation editing.
  - Group consolidated files into subfolders.
  - Limit log viewing to users from the same company.
  - Add the ability to create a file.
- Fixed Issues
  - Pasting many values into a form causes the UI to freeze.
  - Error when saving application documentation.
  - Error when applying styles to a table if the column dimension is of the Date type.
  - Bug fixes in dynamic HTML.
  - Error when creating a process with blocked tasks in Process Manager.
  - Avoid confusion when the component is empty.
  - Error in component code when adding a conditional style with icon.
  - App Manager, disable delete option if multiple apps are selected.
  - Minor fixes.
### Version 3.15.6 - 2025-09-16
- Updates
  - Send a message to alert the user that its instance will expire before closing it.
  - Display the app name and version clearly in the topbar.
  - Show an info icon if a node has documentation.
  - Force code autocompletion via keyboard shortcut.
  - Add "Labels" and "Source version" columns to the versions table.
  - Hide the option to save an app version into another app if the user doesn’t have permission to view the file manager.
- Fixed Issues
  - When editing code with the code assistant, redo is triggered instead of undo.
  - Code differences are not shown when running the assistant.
  - Changing the ID of an index inside a Filter component breaks the component.
  - When duplicating an app, the new app is created outside the current folder.
  - Error in input nodes when using numeric format "ES".
  - The user selector in the Log manager is not working.
  - Minor fixes.
### Version 3.15.5 - 2025-09-05
- Updates
  - Add new option to clear all filters applied to a component.
### Version 3.15.4 - 2025-09-04
- Updates
  - Allow setting resources and timeout for instances per application.
  - Add options to show/hide row and column totals in table component settings.
- Fixed Issues
  - When updating the application documentation, an error sometimes occurs.
  - Minor fixes.
### Version 3.15.3 - 2025-09-03
- Updates
  - Request code assistant to autocomplete comments when pressing CTRL + ALT + Enter.
  - Add option in Application Manager to copy an app while keeping the same ID.
- Fixed Issues
  - When executing scheduled tasks, the configured Python version for opening the application is not respected.
  - When uploading files, in some cases the upload percentage stays at 0%.
  - When editing the configuration of a form with a selector whose values come from a node, upon confirming it replaces the node ID with the list of values.
  - In some cases, when enabling the “show title” option, the button text disappears.
  - When selecting a value in a selector while editing the component code, an error occurs and prevents re-entering code edit mode.
  - When saving an application in a private workspace, hide archived versions.
  - Missing translations for field labels in quick pivot.
  - Minor fixes.
### Version 3.15.2 - 2025-08-28
- Updates
  - Improvements in Upload Manager component.
  - Auto-select assistants depending on location within the application.
  - Add functionality so messages received with pp.send_message can redirect to an interface or section of Pyplan when clicked.
  - Implement option to hide index in flat tables.
  - Add functionality to restart a process.
  - Improvements in Permissions by role view.
  - Prevent Google Translate option from appearing in the browser.
- Fixed Issues
  - Form values disappear when making a change if the option "Update calculated columns on change" is disabled.
  - Analyst assistant bot should not execute buttons in interfaces.
  - Do not group a dimension in rows if it is not the last dimension shown in rows when drilldown is active.
  - When applying styles to a dimension in rows and selecting "Apply to: All", it does not apply to the row labels.
  - When changing a property and then trying to open properties with right-click on the same node, the dialog does not open.
  - When trying to select values from an Index with "Options list" format that are of type datetime, they are not selected.
  - When changing the default interface of a department, the save button does not appear.
  - Issue when compressing a file from File Manager.
  - Prevent deletion of the "Current" scenario.
  - If a node returns a very large dictionary, the browser may hang.
  - Node search should not return alias-type nodes.
  - When moving nodes in the diagram with arrow keys repeatedly, the final position is not respected.
  - In processes, when editing a task from the manager, dependent tasks are not unlocked.
  - In my-account view, when applying zoom greater than 150%, the view is distorted.
  - Minor fixes.
### Version 3.15.1 - 2025-08-19
- Fixed Issues
  - If a Table component has scenarios enabled and the Current scenario is not selected, it is not possible to go to the next page.
  - When opening an app from an HTML link, the app name does not appear in the topbar.
  - Minor fixes.
### Version 3.15.0 - 2025-08-15
- Updates
  - New "Analyst" assistant.
  - Allow setting minimum and maximum limits on charts.
- Fixed Issues
  - Fixed execution failures in some cases when using "self.model.getNode".
  - In combined charts, when choosing two column-type charts, they should not overlap.
  - Fixed errors in interface components when viewing dataframe columns with timezone-aware datetime values.
  - Minor fixes.
## Version 3.14
### Version 3.14.11 - 2025-08-14
- Updates
  - Allow selectors to persist selected values to disk and in-memory (see new params in https://docs.pyplan.com/en/user-guide/code/pyplan-functions#selector).
  - Allow Form columns of type Selector or RelatedSelector to support multiple value selection.
  - Make interface error messages more user-friendly.
  - Show information about which user has a version open with edit permissions.
  - Move theme selector to the sidebar.
  - Add extra details in the Inputs and Outputs tabs in node properties.
  - Add shortcut Ctrl + Shift + D to jump from any Pyplan section to the diagram section.
- Fixed Issues
  - In the performance tool, execution time is inaccurate when there are Report or Form nodes.
  - Opening an app in a new instance doesn't work when triggered from an HTML link inside a node.
  - In "Copy app in my team" from Application Manager, Teams appear duplicated.
  - In Translations Manager, auto-complete translations apply the same language as the app instead of translating.
  - Application consolidation manager does not detect when an interface has been deleted.
  - Minor fixes.
### Version 3.14.10 - 2025-08-07
- Fixed Issues
  - Minor fixes.
### Version 3.14.9 - 2025-08-05
- Updates
  - In Log Manager, display the date column in the client browser's local time.
  - In the Instance Logs section, always show the date column in UTC+0 format.
  - In the component configuration toolbar, hide the Scenarios tab if the component has no loaded scenarios.
- Fixed Issues
  - Prevent deletion of versions in a path where the user shouldn't have access.
  - When adding selectors/indices to a Filter component, the outputs of those nodes don't list the interface as a consumer.
  - When saving an application to the workspace without including the default version, it's possible to create a version from the default, which then causes an error.
  - Duplicate nodes appear in the application properties panel.
  - Display issue in the diagram: node options for selector-type nodes are covered by the node ID.
  - When changing the theme in the profile and pressing F5, the previously selected theme is lost.
  - Minor fixes.
### Version 3.14.8 - 2025-07-30
- Updates
  - Create functionality to apply conditional formatting where the comparison value comes from another column.
  - Allow setting the application version that a scheduled task should execute.
  - Allow saving Report-type nodes in scenarios.
  - Create new permission "Can update application properties".
- Fixed Issues
  - Cannot use CTRL + C to copy selected code in the Code Assistant.
  - Minor fixes.
### Version 3.14.7 - 2025-07-28
- Updates
  - In the top bar, if the user cannot perform any scenario selection/saving actions, the icon should not be displayed.
  - Improve InputNode confirm and cancel action buttons.
- Fixed Issues
  - Selecting "Save as version" in a team where you don't have write permissions still allows saving the new version.
  - In the left sidebar, items such as Scenarios, Application Management, Tools, etc., are shown even if they have no subitems.
  - In Application Manager, the app path in the tooltip cannot be copied.
  - When saving as a new version, the name existence check should depend on whether it is being saved in the same app or in a different one.
  - Minor fixes.
### Version 3.14.6 - 2025-07-24
- Updates
  - Allow saving the current working version into a different application.
  - Make it easier to search for nodes in the Report-type component.
  - Move language, theme, and numeric format selectors to the profile editing section.
  - Speed up application loading on the home screen.
  - Allow selecting and copying the text of items shown in the "Differences" step during app consolidation.
  - Add a component property to show/hide the icon that toggles between chart and table views.
- Fixed Issues
  - In some cases, the Filter component displays node IDs in view mode.
  - Indexes with hidden format remain linked across different interfaces.
  - When an interface component has an error, the full traceback is shown in production.
  - In File Manager search results, navigating to a folder does not work.
  - Error when trying to delete a usercompany if the user had created an external interface link.
  - Minor fixes.
### Version 3.14.5 - 2025-07-21
- Fixed Issues
  - Minor fixes.
### Version 3.14.4 - 2025-07-18
- Updates
  - New interface component: Upload Manager (https://docs.pyplan.com/user-guide/interfaces/interface-components/upload-manager).
  - Allow adding new rows in the Pyplan Excel Add-in.
  - Allow the use of pyodbc.
  - Add new system node: current_user_workspace_path.
- Fixed Issues
  - When performing drilldowns with calculated measures, applying multiple drilldowns does not correctly compute intermediate level totals.
  - Improvements in Application Manager.
  - When opening a node from the chat using the Planner, navigating to the diagram breaks the widgets.
  - Minor fixes.
### Version 3.14.3 - 2025-07-16
- Updates
  - Add node documentation to the Planner assistant.
  - Hide or restrict certain options in the contextual menu of the App Manager and sidebar.
  - Add "Options list" format to the Index component.
  - Allow undo/redo in interface components when applying new configurations.
- Fixed Issues
  - The bold style is not applied in full container format for Button components.
  - Fix column naming issue: "values" appears incorrectly when displaying more than one measure in a table.
  - When applying a filter from a component in edit mode, a different component gets selected afterward.
  - Using the row filter wizard on a DataFrame with the conditions "is" or "is not" throws an error when typing a value.
  - Minor fixes.
### Version 3.14.2 - 2025-07-07
- Updates
  - Implement in-memory persistence for input values.
  - Add "Creation date" and "Last login" columns to the user table in User Manager.
- Fixed Issues
  - When creating a node from a wizard and an error occurs, the node does not appear in the diagram.
  - Minor fixes.
### Version 3.14.1 - 2025-07-03
- Updates
  - Allow opening a specific interface when using pp.open_app.
- Fixed Issues
  - When saving an application to a team, the team selector displays duplicate entries.
  - Pressing CTRL+C while renaming a file in the File Manager closes the file name edit mode.
  - Minor fixes.
### Version 3.14.0 - 2025-07-02
- Updates
  - Add "Visualizer" assistant (see https://docs.pyplan.com/user-guide/app-management/assistant-bots#visualizer).
  - Add version description to the version table.
  - Add information in the version table indicating if a version is currently being used by another user with write permissions.
  - Add new permission for loading scenarios.
  - Add option to "Save application in my team".
- Fixed Issues
  - If a scheduled task does not run because another instance is executing, the last reported status is incorrect and no notification is shown.
  - When a wizard is launched from an alias, the new node is created next to the original node instead of next to the alias.
  - Error when navigating between nodes with the chat window open.
  - Creating a new version deletes the Planner assistant’s documentation.
  - Error when trying to create a new version of an application in Pyplan from the initial versions list.
  - Minor fixes.
## Version 3.13
### Version 3.13.26 - 2025-06-25
- Fixed Issues
  - Error in enabling the Planner assistant selector.
  - Bug fixes in Application Manager.
  - Error when trying to sort columns in non-pivot tables.
  - Minor fixes.
### Version 3.13.25 - 2025-06-24
- Updates
  - Enable folder management in the Application Manager.
- Fixed Issues
  - Sorting a dimension in tables does not work when the dimension is set in columns.
  - Opening an app from a button using pp.open_app throws an "Interface not found" error, although the app works.
  - Visualization issue when selecting values in a range-type index.
  - Minor fixes.
### Version 3.13.24 - 2025-06-23
- Fixed Issues
  - Edit permission issue for multiple users in apps with spaces in the app or version name.
### Version 3.13.22 - 2025-06-19
- Updates
  - Add instance logs viewer.
  - Add option to disable the automatic execution of a scheduled task.
- Fixed Issues
  - When attaching the bot to the left and then detaching it, it disappears.
  - Improve instance purge logic.
  - Minor fixes.
### Version 3.13.21 - 2025-06-10
- Updates
  - Chat popup is now dockable.
  - All AI assistants were unified in the chat popup.
  - New section to fill documentation of an application.
  - New planner assistant.
  - Improved button appearance.
- Fixed Issues
  - Fix selectors in diagrams.
  - Dataframe columns non-string types are supported.
  - Performance analysis misreports time if table mode is active while processing a node.
  - Checkbox and selectable chip selectors do not update correctly if the list of options changes
  - Drilldown does not calculate totals
  - Minor fixes.
### Version 3.13.20 - 2025-05-26
- Fixed Issues
  - Parquet log files for the day are recording fewer entries than actually occurred.
### Version 3.13.19 - 2025-05-25
- Updates
  - Add suggestion option in the AI code helper.
  - Extend the logic for invalid characters in application, version, and scenario names.
### Version 3.13.18 - 2025-05-23
- Updates
  - New connections manager for applications.
  - Updated purge instances logic.
  - Show feedback indicating that a node is being evaluated when opening an application.
- Fixed Issues
  - Error when trying to navigate to a folder that has a trailing space in its name.
  - Selected items in selectors with "options_list" format are not displayed correctly.
  - Adjust keyboard shortcuts on Mac.
  - Minor fixes.
### Version 3.13.17 - 2025-05-15
- Updates
  - Change the app opening loader.
- Fixed Issues
  - Some scheduled tasks with Crontab do not execute on the scheduled date, and the next execution date displayed in the table is incorrect.
  - Apply selector renaming migration to selectors inside the Filter component.
### Version 3.13.16 - 2025-05-14
- Updates
  - Save custom widget heights modified by the user to preserve them when returning to the view.
  - Sort Teams alphabetically when listing workspaces on the home screen.
- Fixed Issues
  - Hide "Evaluate on start" and "Release memory" properties in nodes of type module or text. 
  - Minor fixes.
### Version 3.13.15 - 2025-05-12
- Updates
  - Display node/interface documentation using more screen height.
- Fixed Issues
  - When executing a node from the Preview widget, recent changes in the definition are not taken into account and definition errors (if any) are not shown.
  - If you try to save the app with nodes that have pending changes, the modal message incorrectly says "Open app" instead of "Save app".
### Version 3.13.14 - 2025-05-09
- Updates
  - Add "Discard changes and continue action" option when trying to open another app or close the current app with unsaved changes.
- Fixed Issues
  - If a form has been evaluated and the app is saved as a new version, the form still points to the previous version's path.
  - Opening the column filter in a table in the Result view throws an error.
  - In the Result view, the documentation widget takes up too much space, hiding the result widget.
  - When hiding the component settings panel in an interface in edit mode, the components disappear.
  - Minor fixes.
### Version 3.13.12 - 2025-05-06
- Updates
  - Add "Select version and open app" option to the context menu when right-clicking on an app card.
  - Add "Next execution" calculation for all task types.
- Fixed Issues
  - When enlarging the AI Assistant widget and clicking on another node, the widget shrinks.
  - When dragging a new component into an interface, it is not selected after rendering finishes.
  - In some cases, Range type indexes are not displayed correctly.
### Version 3.13.11 - 2025-05-05
- Updates
  - Show tooltip with applied filters on the icon in the Item Header of components.
  - Include client databases in Pyplan's daily backup.
### Version 3.13.10 - 2025-04-28
- Updates
  - Pre-classify Pyplan functions (pp.) for the code assistants.
  - Add a marker to instances indicating whether the user has the browser open.
### Version 3.13.9 - 2025-04-25
- Updates
  - Add numeric format section to conditional formatting in tables and indicators.
  - Show "read-only mode" message only if the user has write permissions for the application path.
  - Adjustments to formatting and naming of Selector and Index components.
  - Update validation for file, folder, version, and scenario names: only restrict disallowed characters.
  - Add "Next step" option to node quick actions.
  - Improvements in the Scheduled Tasks manager.
  - Show node ID in filters only in edit mode.
  - Add information about nodes executed on app start in the App Properties modal.
- Fixed Issues
  - Engine's language server crashes when there are too many requests in a definition with many characters.
  - Error when consolidating files using the app consolidation tool.
  - In forms, closing quick pivoting opens advanced pivoting.
  - Fix display issue in tables with numbers close to zero.
  - Minor fixes.
### Version 3.13.8 - 2025-04-21
- Updates
  - Add information about Pyplan functions (pp.) in the code assistant.
- Fixed Issues
  - Sometimes, when creating a new component, a node appears pre-selected.
  - The form's change validation function sends the modified row's position instead of the modified row's ID.
### Version 3.13.7 - 2025-04-17
- Fixed Issues
  - When displaying a dataframe with a single string cell as an Indicator, it displays "0".
### Version 3.13.6 - 2025-04-16
- Updates
  - Add undo/redo functionality to the code widget.
  - Allow decimal values in the Y-axis range of charts and allow editing axis titles directly in the Styles section of the component.
- Fixed Issues
  - Some nodes display repeated inputs and/or outputs. Additionally, some nodes list outputs that are not actually outputs of that node.
  - Interface screenshot does not capture the full interface.
  - Incorrect message shown when saving an app with nodes that have unconfirmed changes.
  - Minor fixes.
### Version 3.13.5 - 2025-04-11
- Updates
  - Improvements in table pivoting: highlight dimensions used in advanced pivoting and close advanced pivoting when closing quick pivoting.
  - Display version and scenario dates in local time and show the source version from which a version was created.
  - Allow more valid characters for version, scenario, and file names.
- Fixed Issues
  - Button titles are not displayed when the application has no default language set.
  - If the code assistant fails, the error message is not shown in the chat window.
  - Minor fixes.
### Version 3.13.4 - 2025-04-08
- Updates
  - Improvements to the Code Helper assistant.
  - Add ability to navigate to a specific folder in File Manager from DynamicHtml and from pp.navigate_to_pyplan_section function.
  - Add File Manager tree to DynamicHtml when choosing the action to navigate to File Manager.
  - Improvements in Workflow: new "Collaborators" field (same functionality as Responsible), allow deleting task groups, and show users from the same company only in the task responsible selector.
  - In the App Consolidation section, when selecting the App path, also show hidden folders.
- Fixed Issues
  - When taking a screenshot of an interface, the entire interface is not captured.
  - When opening a Dash app in a node, resource usage is sent via websockets every 2 seconds multiple times.
  - When an app opens from a scheduled task, the "pyplan_user" node is not loaded.
  - Filter update issue when using "hidden" format.
  - When modifying the identifier of a pinned node, the reference to the pinned node is lost.
  - Minor fixes.
### Version 3.13.3 - 2025-04-01
- Updates
  - Improvements in the Application Analysis tool.
  - Do not exclude guest users when exporting the user list in User Manager.
- Fixed Issues
  - Assistant bots using the OpenAI framework repeat responses multiple times.
  - When capturing a screenshot in interfaces, DynamicHtml components are not captured correctly.
  - When editing an interface, discarding changes, and then closing the app, the engine throws an error.
  - Values in the Performance table are not sorted correctly.
  - Minor fixes.
### Version 3.13.2 - 2025-03-21
- Updates
  - Add a new property to the Button component to indicate if the button must be disabled.
- Fixed Issues
  - The pp.assistant_chat function is not working.
  - If a pinned node is an alias, copying the ID takes the alias ID instead of the original node ID.
  - When trying to show hidden files in the File Manager, all files disappear from the view.
  - Using the "Auto-complete translations" option results in an error, and translations are not completed.
  - Minor fixes.
### Version 3.13.1 - 2025-03-20
- Updates
  - Add a pending changes modal when opening an app with pp.open_app if there are unsaved changes.
  - Make non-clickable chips in the Select with Selected Chips component visually distinguishable as non-clickable.
- Fixed Issues
  - When trying to expand the Result widget in the Code + Result widget, the height resets.
  - Minor fixes.
### Version 3.13.0 - 2025-03-19
- Updates
  - Add AI chat to code views.
  - Move the default version to the top of the list when displaying app versions upon opening.
- Fixed Issues
  - When saving a new version, sometimes the version paths remain linked to the old version.
  - When opening an app, the loader displays the wrong app name.
## Version 3.12
### Version 3.12.7 - 2025-03-14
- Updates
  - Move Quick pivot toolbar to the top of the component.
  - Allow creating app pools for specific departments.
- Fixed Issues
  - If the app name contains accented characters, the "Scheduled Tasks" component in interfaces does not display tasks correctly.
  - Applying a heatmap by rows or columns causes an error if the table has pagination.
### Version 3.12.6 - 2025-03-12
- Updates
  - Add a new Pyplan function to open a Pyplan application (https://docs.pyplan.com/en/user-guide/code/pyplan-functions#open_app).
  - Update texts in the app loading progress bar.
  - Add 'allowed_items' in the department editing settings.
- Fixed Issues
  - Dragging a new component to the end of an interface is difficult.
  - When editing certain options in the dynamic HTML component, the selected values are not displayed correctly.
### Version 3.12.5 - 2025-03-10
- Updates
  - Allow adding icons to buttons.
  - New button display format.
  - Add a new Pyplan function to navigate to different sections of Pyplan (see https://docs.pyplan.com/en/user-guide/code/pyplan-functions#navigate_to_pyplan_section).
- Fixed Issues
  - If a scheduled task takes more than two minutes to execute, the pod running it shuts down unexpectedly.
  - Minor fixes.
### Version 3.12.4 - 2025-03-06
- Fixed Issues
  - When trying to open an existing x86 app on an ARM CPU architecture, the virtual environment is not created.
  - Minor fixes.
### Version 3.12.3 - 2025-02-27
- Fixed Issues
  - If a date-type column in a form has a default value as datetime, the cell is displayed as datetime.
  - In the diagram, if you save a table default view with the pivot area open, reopening the node does not display it.
### Version 3.12.2 - 2025-02-26
- Fixed Issues
  - Viewing the result of a node that outputs a Plotly chart causes a UI error.
  - When using the Code helper assistant bot with CTRL + M, the diagram creates an alias-type node, but the result value is not being saved in the node.
  - Deleting a component from an interface sometimes triggers an error, causing the interface to disappear from the Interface Manager.
### Version 3.12.1 - 2025-02-25
- Fixed Issues
  - Code helper assistant bots are taking too long to respond.
### Version 3.12.0 - 2025-02-24
- Updates
  - Allow opening apps with different Python versions (3.9 and 3.12 - see https://docs.pyplan.com/user-guide/app-management/app-properties#app-configuration) and CPU architectures (x86 and arm).
  - Implement quick pivoting and filtering.
  - Implement an automatic translation tool (https://docs.pyplan.com/user-guide/app-management/translations-manager#using-the-translations-manager).
  - Implement input validation in forms (https://docs.pyplan.com/en/user-guide/code/pyplan-functions#form).
  - Add new column data type "Datetime" in forms and input cubes.
  - Add a UI parameter to fix columns in tables.
  - Allow selecting which set of resources to use (CPU and RAM) when opening an application.
  - Allow selecting which aggregation method to apply when switching hierarchies.
  - Allow exporting the current view of components with multi-index columns.
  - Make selected items in selectors more noticeable throughout Pyplan.
  - Allow assigning multiple departments and a primary department to users created via SAML.
  - Allow maximizing a component while editing an interface.
  - Improve the Kubernetes error message when resources are insufficient to create a new pod.  
  - Add invalid character validation when creating or renaming versions and scenarios.
  - Allow sorting selected columns of a form in the transfer list dialog.
  - Add the node ID to the tooltip of component titles in interfaces, with an option to copy the node ID.
  - When using a code generation wizard, display changes in a modal comparing the before and after of the definition.
  - Add "Go to node" option to filters inside the Filters component.
  - Add an exception message indicating that the user is disabled from accessing Pyplan via SAML when the Pyplan user is deactivated.
  - Retain the modification date when copying an app using the "Save as" option.
  - Automatically terminate instances after a certain time when these instances are not executing a process and the user has closed the browser.
- Fixed Issues
  - Issues when searching for nodes in the interface node selector.
  - If a department opens an app with a login action, refreshing the page reloads the app.
  - The title is not displayed in table row dimensions if more than one measure is selected.
  - When using the Pyplan Add-in with a department that opens an app on startup, the app opens over the node selection window.
  - Preserve the order of selected columns in forms.
  - Navigating to a pinned node that no longer exists throws an error.
  - When editing a form with the wizard, CTRL + C, CTRL + V, and CTRL + Z commands do not work.
  - After creating an Index-type node and confirming its creation, selecting other nodes in the diagram is not possible.
  - Applying row-based styles to non-pivot tables does not work when condition values come from a node.
  - Pressing the DELETE key with an open wizard triggers the shortcut to delete a node.
  - When a cell is invalid in a form, it is not highlighted in red as expected.
  - When deleting an interface, the nodes that were its inputs are not unlinked from it.
  - Improvements to mobile interface navigation.
  - Menu navigation is not being saved when interacting with items.
  - Minor fixes.
## Version 3.11
### Version 3.11.8 - 2025-01-28
- Updates
  - New Quick menu functionality (see "Quick menu" option in https://docs.pyplan.com/en/user-guide/app-management/app-properties#app-configuration).
  - Allow applying heatmaps to specific styles in tables.
  - Add support for multi-line node titles.
- Fixed Issues
  - If an app contains an incompatible thumbnail.png file, Pyplan home fails to load.
  - Minor fixes.
### Version 3.11.7 - 2025-01-22
- Updates
  - Add a Translations manager (https://docs.pyplan.com/en/user-guide/app-management/translations-manager).
  - Add functionality to capture a screenshot of the entire visible interface.
  - Allow selecting the aggregation method for calculating row and column totals in tables.
  - Enable creating a node within a text-type node.
- Fixed Issues
  - Error when creating a version from another version while the app is closed, if the same app is open in another instance.
  - Table totals do not take into account the formula of calculated measures and items.
  - When updating a Haystack assistant, if both indexing and temporary file deletion fail, only the deletion error is displayed.
  - Fix issues when opening interface links in app sections other than interfaces.
  - Selecting table cells, including a grouped header, causes a UI error.
  - In some browsers, the password reset link is not constructed correctly.
  - Minor fixes.
### Version 3.11.6 - 2025-01-14
- Updates
  - Add support for application internationalization (add translations to nodes and interfaces).
  - Add new Pyplan function to update a process's properties (https://docs.pyplan.com/en/user-guide/code/pyplan-functions#update_process).
  - Display a more user-friendly message when a form's database write operation returns "Database is locked".
  - Add functionality to select all visible files in the File Manager.
  - Create user's workspace when allocating a user to a company.
- Fixed Issues
  - When opening an app version in a new instance, the virtual environment and the initial interface don't load.
  - InputCube with two dimensions in columns does not fails to apply new changes to its values.
  - Add support for column totals in forms for numeric columns originating from a dataframe.
  - The column selection filter in forms does not consider searches when moving all items from one side to another.
  - Sorting table columns allows multiple dimensions for ordering, causing confusion.
  - Issues when repositioning actions in a menu.
  - Pinned nodes appear that do not belong to the same app.
  - Issues with diagram vertices.
  - Improvements to the auto-hiding top bar.
  - Minor fixes.
### Version 3.11.5 - 2024-12-16
- Updates
  - Create the Viewer with Public access default role.
- Fixed Issues
  - Opening/closing menu items does not work when the menu is accessed from another interface.
### Version 3.11.4 - 2024-12-05
- Fixed Issues
  - Forms with row totals lose numeric formatting in all cells.
  - Error when applying hierarchies to Pandas dataframe nodes using the Polars engine.
  - When selecting a node, navigating to another section and returning to the code section, the node remains selected but does not display its definition or result.
  - Minor fixes.
### Version 3.11.3 - 2024-12-03
- Fixed Issues
  - Minor fixes.
### Version 3.11.2 - 2024-12-02
- Updates
  - Allow selecting which resources to use when executing external interface links and API endpoints.
- Fixed Issues
  - Recent applications on the home screen do not filter out applications that do not exist or that the user does not have permissions to view.
  - Large tables with date-type columns take too long to render.
  - Minor fixes.
### Version 3.11.1 - 2024-11-28
- Updates
  - Add output information of interface-type nodes.
  - Format sum and average statistics of selected cells in tables.
  - Add an icon to symbolize the position (0, 0) in the influence diagram.
- Fixed Issues
  - Do not use the Polars interface engine if Polars version is lower than 1.0.0.
  - Minor fixes.
### Version 3.11.0 - 2024-11-27
- Updates
  - New application analysis tool (https://docs.pyplan.com/en/user-guide/app-management/application-analysis).
  - Apply filter and pivot operations for Polars-type objects in interfaces.
  - Implement re-run functionality for a node.
  - Processes with the "Stopped" status are changed to "In Progress" status.
  - Add tooltip to pinned nodes.
  - Automatically close the notification for an app opened in read-only mode.
  - Add a button to copy the entire scenarios and versions table from their respective managers.
  - Add a creation date column to scenario and version tables in their respectivemanagers.
- Fixed Issues
  - Improvements to text-type nodes.
  - Processes with the "Stopped" status are changed to "In Progress" status.
  - Fix issues when copying and pasting numeric values in form, inputxarray, and inputcube.
  - Missing "HideEmptyData" option by column.
  - Minor fixes.
## Version 3.10
### Version 3.10.17 - 2024-11-15
- Updates
  - The CTRL+C shortcut does not work in the code editor when a table is rendered.
  - It is not possible to filter date-type dimensions in forms.
### Version 3.10.16 - 2024-11-14
- Updates
  - Add hotkey text shortcut in code wizards.
- Fixed Issues
  - When copying values from a table with decimal/thousand separators in "es" format, it always pastes them in "en" format.
  - Error when copying values from an integer selector column in a form.
  - Adding a new node in the Pyplan Add-in does not work.
  - Removing denied departments in a module sometimes throws an error when confirming the change.
  - Renew authentication token for the database in connections with Azure Managed Identity.
  - Minor fixes.
### Version 3.10.15 - 2024-11-11
- Fixed Issues
  - When attempting to remove a user's assignment to a company in User Manager, if the user has a language preference saved for that company, it throws an error.
  - Ensure the unread notification count updates correctly when a general notification is read.
  - Minor fixes.
### Version 3.10.14 - 2024-11-08
- Updates
  - Allow displaying custom results when navigating to an API endpoint URL in a browser.
- Fixed Issues
  - Fix the permission error when trying to use the bot assistant component for non-Administrator or non-App Administrator roles.
  - Fix styles for slider-type indexes.
  - Minor fixes.
### Version 3.10.12 - 2024-11-07
- Updates
  - Visual improvements for range-type Selectors and Indexes.
  - Add permissions for editing the influence diagram.
- Fixed Issues
  - Minor fixes.
### Version 3.10.11 - 2024-11-06
- Updates
  - Allow the interface components configuration side panel to be detached.
  - Improve site accessibility when zoomed in.
- Fixed Issues
  - File Manager reports incorrect file size and modification dates.
  - TransferList component displays poorly with very long items.
  - HTML component links sometimes fail to redirect properly to other interfaces.
  - Remove flickering in the Slider component when selecting values.
  - Minor fixes.
### Version 3.10.10 - 2024-10-29
- Updates
  - Enable a Filter component’s header to be non-sticky.
  - Allow users to change regional settings for thousand and decimal separators.
  - If a company has no active license or is disabled, scheduled tasks and workflow-related tasks should not run.
  - Notify users about license expiration.
  - Create a scheduled task executor user in each company.
  - Allow totals in a table to be displayed in the first row/column instead of at the end.
  - Improve file search in the File Manager.
  - Add default styles for total columns/rows in tables.
- Fixed Issues
  - Resizing a column in a Table/Form is lost after leaving and returning to the tab.
  - Flicker when editing a scalar node displays the previous value.
  - When filtering a column in a table, it only considers values from the current page.
  - Exporting a module from an application exports as a string instead of JSON.
  - Minor fixes.
### Version 3.10.8 - 2024-10-10
- Updates
  - New interface component "Filter". Allows to group filter of indexes and selectors of an interface.
  - Allow users to define the resources (CPU and RAM) on which a scheduled task must run.
  - Log the resources with which a task was executed.
  - Allow to hide table footer.
  - Search nodes by text in your definition.
  - Visual improvements in the sidebar.
  - Visual improvements in the transfer list.
  - Improved behavior of Home and interfaces when using a large zoom in the browser.
  - In permissions by role allow to select options and then save.
  - In node consolidation, allow the detection of nodes with differences only by changes in their definition.
  - Force release resources when switching to another application version.
- Fixed Issues
  - Fixing problems in indexes and selectors with more than 500 elements.
  - Items are not correctly hidden in menu type interfaces.
  - Problems with the button to filter columns in a table.
  - Node of type alias of an input scalar does not show its value in the diagram.
  - Minor fixes.
### Version 3.10.7 - 2024-09-19
- Updates
  - When in step 2 of application consolidation, keep the instance alive while remaining on that view.
- Fixed Issues
  - Multiselect selector that saves labels doesn't work properly in Range format.
  - Links to interfaces don't work from a node's documentation.
  - Minor fixes.
### Version 3.10.6 - 2024-09-17
- Updates
  - Allow users to create their own custom views of an interface (https://docs.pyplan.com/user-guide/interfaces/creation#saving-a-custom-view-of-an-interface).
- Fixed Issues
  - Minor fixes.
### Version 3.10.5 - 2024-09-13
- Updates
  - Add the ability to "grant access to" departments in permission assignment dialogs (https://docs.pyplan.com/en/user-guide/security-options#grantdeny-access-to-information).
  - Add new permissions for application options: Manage libraries, Show console, and Take screenshot.
  - Add property to hide the "Edit in Excel" button in Forms.
- Fixed Issues
  - When adding departments to a Team, it's possible to add the same department twice.
  - When editing the size of components in an interface, changes are sometimes not saved.
  - Data submission fails if the form has hidden columns in the Pyplan Addin.
  - Error with folder names when creating an app with a space at the end of the name.
  - Viewing the result of an evaluated node marks the app as having pending changes.
  - Minor fixes.
### Version 3.10.4 - 2024-09-06
- Fixed Issues
  - Minor fixes.
### Version 3.10.3 - 2024-09-05
- Updates
  - Optimize form data submission in Office Addin.
  - Allow changes in forms to be applied without recalculating other cells and preventing the table from re-rendering.
- Fixed Issues
  - Fix occasional error when opening the Data Handling option of components.
  - Performance improvements for tables with custom style icons.
  - Minor fixes.
### Version 3.10.2 - 2024-09-04
- Updates
  - When creating a form with the wizard and using SQLite3, set the database name to the table name.
- Fixed Issues
  - Changing interface tabs does not retain the choice to show/hide the Data Handling option of components.
  - If you have two instances open in two tabs and one expires, clicking the prompt to close the instance logs you out of both.
  - When drilling down on a string measure, the rest of the measures are converted to string.
  - Performance improvements for interfaces.
  - Evaluating a pandas Index containing null values causes Pyplan to throw an arbitrary error.
  - Minor fixes.
### Version 3.10.1 - 2024-08-29
- Fixed Issues
  - The column filtering icon does not change color when filters are applied to the column of a Table component.
  - Instances that expired due to timeout are not being purged.
  - Minor fixes.
### Version 3.10.0 - 2024-08-28
- Updates
  - Add a "Delete Form/Cube data" option when right-clicking on nodes of type Form or Input Cube.
  - Display RAM and CPU usage information (numbers) visibly in the top bar.
- Fixed Issues
  - Performance improvements when rendering interfaces.
  - If you have two instances open in two tabs and one expires, clicking the prompt to close the instance logs you out of both.
## Version 3.9
### Version 3.9.22 - 2024-08-28
- Updates
  - Remove Websockets connection loss and reconnection messages from UI.
- Fixed Issues
  - When editing an interface for the first time, the grid width is reduced by half.
  - Minor fixes.
### Version 3.9.21 - 2024-08-24
- Updates
  - Add an option for users to reset their own QR code for the authenticator.
- Fixed Issues
  - In forms, values disappear when selecting or copy-pasting values randomly.
  - Prevent users from having to clear the browser's cache when a new version of Pyplan is released.
  - Minor fixes.
### Version 3.9.20 - 2024-08-21
- Fixed Issues
  - Selectors with Radio or Clickable Chips format do not refresh their options when the component is re-rendered.
  - Improvements in general notifications.
  - Minor fixes.
### Version 3.9.19 - 2024-08-17
- Updates
  - Add an option to mark all application notifications as read.
  - Do not allow users created via SAML to change their password.
  - Create scheduled tasks to delete active instances after prolonged periods of time.
- Fixed Issues
  - Autocomplete selector breaks when scrolling to the next page.
  - If the creation of an instance fails when opening an app, attempting to open another app also fails.
  - Opening a new tab and logging into Pyplan logs you out in the previous tab.
  - When one measure is of type string in a Table component, it converts the rest of the measures to string.
  - Minor fixes.
### Version 3.9.18 - 2024-08-13
- Updates
  - Add metadata property to nodes.
  - Add "From dynamic" column to the performance profiler table for nodes.  
- Fixed Issues
  - If an element in a form selector ends with a trailing space, it cannot be selected.
  - Deleting text in the autocomplete of selectors reverts to the previous value.
### Version 3.9.17 - 2024-08-12
- Fixed Issues
  - Fix issues when uploading files with pp.upload function.
### Version 3.9.15 - 2024-08-09
- Updates
  - Allow applying styles by row in tables.
  - Increase the maximum width of the listbox for selectors in forms.
- Fixed Issues
  - When creating a virtual environment in a private space from the Libraries Manager, the Python path is linked to the Public environment.
  - Selectors in the diagram do not allow selecting paginated options.
### Version 3.9.14 - 2024-08-07
- Fixed Issues
  - Applying conditional formatting to non-numeric cells breaks the table if the values are numeric.
  - Ascending/descending arrow is not visible in table headers when sorting was applied.
  - When invalidating outputs of forms, if there is an output that does not exist, the form gives an error.
  - Minor fixes.
### Version 3.9.13 - 2024-08-06
- Fixed Issues
  - Drilldown doesn't work correctly when the table is sorted by one column.
  - Format error with numbers in string format in a table.
  - When creating aliases or duplicating more than one node at a time, select the new nodes once they are created.
  - Error in custom component code when using Progressbar.
  - Cannot change the background color of editable form cells due to the default color of table cells.
### Version 3.9.12 - 2024-08-04
- Fixed Issues
  - When opening an app in a new instance, if the app and version match an already open instance, it recovers the previous one.
  - Ensure the context menu of a node does not change the position of the options.
  - When pasting an incorrect value into a form selector, the erroneous value remains visible.
  - Pasting formatted numbers from Excel sometimes causes an error.
### Version 3.9.11 - 2024-07-29
- Fixed Issues
  - Improvements capturing UI errors at a general level to avoid white screens.
### Version 3.9.10 - 2024-07-26
- Updates
  - Allow applying row totals to forms.
- Fixed Issues
  - When editing the code definition of a node and confirming changes, sometimes the last character is not saved.
  - Multiple values are not pasted correctly in forms.
### Version 3.9.9 - 2024-07-25
- Updates
  - Allow associating forms with an encrypted SQLite database.
  - Allow associating secrets as passwords for databases with passwords in forms.
  - Allow uploading multiple files at once with the pp.upload function.
  - When listing companies in Company Manager, add a column indicating if the company has SAML configured.
- Fixed Issues
  - Modals do not work in some selector formats when navigating the influence diagram.
  - Tooltip of selectors activates when options are expanded and covers the first options of the selector.
  - Option to unsync indices does not work if the selector has the same title as the column in a form, table or chart.
  - Selecting values in a Hidden selector doesn't work if save_selected_values param is True.
  - Minor fixes.
### Version 3.9.7 - 2024-07-24
- Fixed Issues
  - Slider type Selector and Index flicker with each change in chosen values.
  - Unnecessary delay when opening Handling data wizard if the node takes a long time and is already calculated.
  - Remove TypeScript error handling screen.
  - Minor fixes.
### Version 3.9.6 - 2024-07-17
- Updates
  - Add input validation in selector-type columns of forms.  
- Fixed Issues
  - Fix error in Handling Data wizard if it is in preview view (not result view) and the wizard is attempted to be opened.
  - Adjust code generation in Handling Data wizard.
  - In Pyplan Add-in, forms do not show columns that come from a dataframe.
  - Capture UI errors at a general level to avoid the white screen.
  - Minor fixes.
### Version 3.9.5 - 2024-07-15
- Updates
  - Allow easily selecting which columns to view in the Form component.
- Fixed Issues
  - Selecting values in the Choice component breaks the UI.
  - If you open an app in read-only mode, close the tab, and then recover that instance, it indicates you can save the app even though you do not have permissions to do it.
  - Minor fixes.
### Version 3.9.4 - 2024-07-11
- Updates
  - New Secrets manager (https://docs.pyplan.com/user-guide/tools/secrets_manager).
  - Allow downloading files from an assistant bot.
  - Add predefined color palettes to charts.
- Fixed Issues
  - When copying a version, do not copy the backup within the version.
  - Minor fixes.
### Version 3.9.3 - 2024-07-10
- Updates
  - Allow deleting scenarios from the select scenarios dialog.
  - When saving a scenario, provide an option to save the nodes currently being viewed in the open interface.
  - Do not show version in scenario names if all scenarios are from the current version.
- Fixed Issues
  - Updating assistants using the OpenAI framework fail when uploading files.
  - None value in an Index breaks the result view.
  - Components with the option to hide the header do not occupy 100% of the component when applying background color.
  - Minor fixes.
### Version 3.9.2 - 2024-07-05
- Updates
  - Allow applying totals to forms.
  - Add shortcut for running code completion with assistant bots.
  - Save inputs and outputs of nodes when saving app to speed up app opening.
- Fixed Issues
  - When changing the assistant chosen for testing in the Assistant bots manager, it continues using the previous assistant.
  - Link to an assistant does not work correctly when used from DynamicHTML.
  - Reset view option is not working correctly.
  - Do not show menu icon when the component is not the native Pyplan menu.
  - Minor fixes.
### Version 3.9.1 - 2024-07-03
- Updates
  - Add shortcuts for SAML login on the login screen.
- Fixed Issues
  - Include modules and exclude aliases in nodes with documentation for indexing assistant bots.
  - When exporting a table as Current, sort rows according to the options chosen for that component.
  - Minor fixes.
### Version 3.9.0 - 2024-07-01
- Updates
  - New AI assistant bots functionalities (https://docs.pyplan.com/user-guide/app-management/assistant-bots).
  - Give more space to action titles in Menu component (up to two lines).
  - When selecting a module type node, always show documentation widget only.	
- Fixed Issues
  - Horizontal scrolling in tables and forms with fixed columns causes records to disappear from view.
  - Fixed code editor bug when deleting characters.
  - If a department has a default app set and you open another version in another instance, it opens the default version.
  - Scrollbar appears in Indicator component.
  - Sometimes the handling data wizard does not display the table correctly.
  - Node preview shows nodes as dictionaries that are not dictionaries.
  - Minor fixes.
## Version 3.8
### Version 3.8.20 - 2024-06-19
- Fixed Issues
  - DataFrame Filter wizard does not retrieve values when the column has more than 500 elements.
  - Minor fixes.
### Version 3.8.19 - 2024-06-19
- Fixed Issues
  - Problems uploading files with a Button component in interfaces.
  - Actions in menu disappear randomly.
### Version 3.8.18 - 2024-06-18
- Updates
  - Increase MFA authentication expiration time to 7 days.
  - Disable form confirm button if the user does not have write permissions.
- Fixed Issues
  - Node preview takes a long time when the object is complex.
  - If you there are two or more instances open in separate tabs and one times out, do not force logout.
  - Switching app versions triggers multiple trigger and layout calls in the main interface.
  - Improve app thumbnail image quality.
  - Minor fixes.
### Version 3.8.16 - 2024-06-11
- Updates
  - Add dimension option to include a subtotal.
  - Change the display of the "% of time" column in the Performance tab.
  - Adjustments on Pyplan Home.
- Fixed Issues
  - Bug fixes in Data manipulation wizard.
  - Slider type Index component breaks if the index has no values.
  - Minor fixes.
### Version 3.8.15 - 2024-06-06
- Fixed Issues
  - When trying to delete a cell in a form, it also attempts to delete the node.
  - When copying a table from the Performance tab, the Order column is not copied correctly.
  - Minor fixes.
### Version 3.8.14 - 2024-06-05
- Fixed Issues
  - If no values are chosen for a single select type selector, the engine breaks.
  - Confirm button in forms always remains enabled when editing it in the diagram.
  - If a scheduled task is run from the engine where the executor is another user, it gives a permission error.
  - Confirming a form executes twice when the component has custom code.
### Version 3.8.13 - 2024-06-04
- Updates
  - New wizard for modifying and analyzing dataframes.
- Fixed Issues
  - Sometimes, the application stops receiving Websocket messages and interface components hang.
  - Sum/count/average of table cells does not work when the selection is of non-adjacent cells.
  - Pasting values into a form with a different regional configuration breaks the UI.
  - Minor fixes.
### Version 3.8.12 - 2024-05-30
- Updates
  - Make the width of the option list in a form selector occupy the maximum width of its options.
  - Move Data Type property to a column in form creation wizard.
  - Allow saving forms in an encrypted manner.
  - When selecting values from a selector with Slider format, trigger only when the mouse is released after dragging the selection.
  - When opening an application in a workspace other than Public, if the virtual environment used is from Public, do not automatically install libraries upon opening.
  - Allow viewing a form as a chart.
  - Adjustments on Pyplan Home.
  - Add option for calculated columns in a form to recalculate upon confirmation.
- Fixed Issues
  - Copying table to an Excel spreadsheet does not paste column titles.
  - Ascending or descending order icon does not appear in table columns.
  - Pressing CTRL + Enter in the code widget after typing code quickly does not save changes.
  - Pressing CTRL + Z without modifying a node erases the definition.
  - Selected Chips type selector does not correctly mark when all options are selected.
  - Input cube with date index does not reflect changes.
  - When filtering indices of type "time", validate that the "from" date is less than or equal to the "to" date.
  - In the HTML component, if you insert a download link for a Media file from Pyplan, it does not work.
  - When adding an Index component to an existing interface, it disappears.
  - When making a change in a form and switching interface tabs without confirming, returning does not mark changes to confirm.
  - When drilling down, the values of the dimension used for drilldown are sorted alphabetically.
  - Passing a dataframe with text and number columns from Table to Indicator breaks the visualization.
  - Nodes without differences appear when consolidating two versions.
  - Navigating to an incorrect interface link leaves tabs with loaders.
  - Improve marking of an application as read-only.
  - Minor fixes.
### Version 3.8.11 - 2024-05-10
- Fixed Issues
  - When trying to import multiple interfaces, only one is imported.
  - Add property indicating it has outputs outside the module to missing node classes.
  - When opening an app, if there is an archived version and an error occurs while opening the zip file, the app does not open.
### Version 3.8.10 - 2024-05-09
- Fixed Issues
  - When drilling down in a scrollable table, it always scrolls you to the top of the table.
  - Some users cannot change their password in their profile editing.
  - Error link in calculated field does not navigate properly if the error occurs in a node.
### Version 3.8.9 - 2024-05-07
- Fixed Issues
  - Sometimes, the application stops receiving Websocket messages and interface components hang.
### Version 3.8.8 - 2024-05-06
- Updates
  - Improve "Network Error" message.
- Fixed Issues
  - Fix portuguese translations.
### Version 3.8.7 - 2024-05-03
- Fixed Issues
  - Rows per page selector in managers does not work correctly..
  - Confirming a large number of changes in forms takes a long time.
### Version 3.8.6 - 2024-05-03
- Updates
  - Allow drilldown with more than one dimension in rows of Table component.
  - Pyplan Office Addin - Support data input with selectors.
- Fixed Issues
  - Disallow creating folders with the same name in Interface manager.
  - Column filtering icon does not work in tables.
### Version 3.8.5 - 2024-04-26
- Updates
  - Add an icon to nodes indicating that the node is used in another module.
  - Allow exporting Form, InputCube and InputDataArray components to Excel/CSV.
  - Improvements in libraries installation logs.
- Fixed Issues
  - Alt + click on node does not add code edit confirmation buttons.
### Version 3.8.4 - 2024-04-24
- Updates
  - Add more filter options to dimension filters.
  - Add option on how to filter when clicking on legend item in charts.
  - Allow sorting dimensions in charts.
  - Add "Hidden" format option to selectors.
  - Allow adding arbitrary values to form selectors.
  - Allow choosing target version when duplicating scenario template.
  - Improvements in Report node.
  - Improvements in Performance tab.
- Fixed Issues
  - Interface editing is very slow.
  - Code editing is very slow.
  - Sometimes, the application stops receiving Websocket responses and interface components hang.
  - When drilling down in a table, if its "Hide empty data" option is set to "Both" or "Column" it throws an error.
  - If the definition of a selector includes a list and a node id, the selector breaks when choosing a new value.
  - Column labels in forms are truncated.
  - Component Index selections are not saved when maximizing another component and then minimizing it.
  - Table statistics do not show sum or average when they are negative.
  - When refreshing default interface, components that call API make double call to the API.
  - Disable drilldown in tables if it has more than one dimension in rows.
  - If you open an app and its default version has an error in metadata.json, it throws an error.
  - When opening an app with another open app that has pending changes, the option to discard changes and open saves the app anyway.
  - Transferlist does not allow selecting falsy values like 0.
  - When changing Rows per page option in scheduled tasks manager, it does not save the selection.
  - If a user can edit users in User manager, they should also be able to change their own password without knowing it.
  - Interface tab stays with loader in certain occasions.
  - Minor fixes.
### Version 3.8.3 - 2024-04-08
- Updates
  - Add "Equal to node values" and "Regular expression" filter types to style conditions in interface tables.
  - Allow editing application ID from App properties dialog.
- Fixed Issues
  - When selecting cells in forms, values disappear randomly from the table.
  - Index in Hidden format in Single select mode allows choosing multiple values.
### Version 3.8.2 - 2024-04-03
- Updates
  - When selecting cells in a table, calculate sum, count, and average.
  - New PyplanFunction (pp) functions that allow running a scheduled task (pp.run_scheduled_task) and obtaining task logs (pp.get_scheduled_task_logs).
  - When an API call returns a 5xx code with "friendly" error message, do not send a notification but print to console and add error to Pyplan error console.
- Fixed Issues
  - When pasting values into related form selectors, the cells remain marked as incorrect.
  - Issues when pasting and undoing changes in forms.
  - Components do not refresh when inputs change from a Dash component.
  - Horizontal resize cannot be done on certain components.
  - If you delete a user who is a subscriber to a workflow task, it does not allow you to remove them from the subscriber selector. It also throws an error when duplicating the process.
  - Some applications have a list of unnecessary backups.
  - Minor fixes.
### Version 3.8.1 - 2024-03-18
- Updates
  - New general notifications manager.
  - Add auto-hide duration time as a parameter to pp.send_message.
  - Re-build login page code to make it responsive.
- Fixed Issues
  - In forms from large dataframes, confirming changes takes too long.
  - The menu is not visible from the quick access menu when it is of type Boxes.
  - Attempting to close an interface tab from another tab does not close it.
  - When confirming DynamicHTML component editing, it deletes the properties you saved for the component.
  - In DynamicHtml component, if an element opens an interface in the same tab and is triggered from the default interface, it replaces it.
  - App thumbnail are displayed in low resolution.
  - Arrows appear out of place when editing interface components.
  - Minor fixes.
### Version 3.8.0 - 2024-03-07
- Updates
  - Retain properties of components in interfaces whose tabs remain open but are not active.
  - New Pyplan home design.
  - New wizard for creating reports (https://docs.pyplan.com/user-guide/code/coding-window#report).
  - New Input Cube node that replaces former Input Cube and saves results in a database (https://docs.pyplan.com/user-guide/code/coding-window#cube).  
  - Add validations for InputValue type components (https://docs.pyplan.com/user-guide/interfaces/creation#scalar).
  - Allow hiding dimension titles in charts from chart options.
  - If a user does not have the "Can update an interface" permission, disable the interface edit button.
  - When creating a user via SAML, automatically assign role and department from Active Directory.
  - Autocomplete scenario name when starting from a scenario template.
  - Add red-green-alt and green-red-alt heatmaps.
  - When selecting vertical/horizontal alignment, it should not adhere to snap to grid.
  - Update pandas version to latest 1.x.x version (1.5.3).
- Fixed Issues
  - Component menu items are hidden despite not supposed to be.
  - Selector breaks when changing a value if one of its options contains "[" or "]" characters.
  - If an InputScalar component has the is_editable property set to False, it can still be edited.
  - Password change at login does not support the same special characters as changing the password from the user profile.
  - Open app dialog when there are unsaved changes is incorrect.
  - If a node has an error and is then deleted, the error remains in the error tab.
  - When creating an Input type node and canceling the subtype selection, it throws an error.
  - Attempting to filter by a Categorical type index results in an error when listing values.
  - Minor fixes.
## Version 3.7
### Version 3.7.8 - 2024-02-07
- Updates
  - In the diagram view, always display the maximize buttons in the widgets.
  - Add company name to department options when choosing departments assignable to a team.
- Fixed Issues
  - When drilling down in a scrollable table, it always scrolls to the top of the table.
  - Notifications in the top bar do not update correctly.
  - Node search with "&" breaks URL query params.
  - When deleting a new field in the Form wizard, it deletes all new created fields.
  - The "Delete and recreate table" parameter in the Form wizard should only execute if the table already exists.
  - Instances raised as scheduled task app pools cannot be killed.
### Version 3.7.7 - 2024-02-06
- Updates
  - Hide menu item if all actions within that item are blocked/disabled.
  - Add options to delete or mark as read/unread a notification.
  - Allow changing text, background, and hover colors for menu component items.
  - Add an option to create a new version when consolidating applications.
  - Change the application loading modal on mobile.
  - In the visualization of Range-type indices and selectors, add the ability to filter with "From" and "To".
  - Change the classification criteria for output nodes: a node is of type output if it has outputs, and NONE of its outputs is in the same module as that node.
  - Enable the creation of calculated fields and items only if the interface is in edit mode.
  - Add new node result icons.
  - Add a shortcut for capturing thumbnails.
  - When creating a user, the option for the user to change the password should always be enabled.
- Fixed Issues
  - When creating a scheduled task with Scheduler type "Custom" the task executes when you save it.
  - Scenario Templates do not display correctly at some resolutions.
  - In some occasions, an interface remains disabled even though the user has access to it.
  - Error with resize arrows in interface components.
  - Issues creating and deleting teams in Teams manager.
  - If the user presses the "save" button and there is an interface in edit mode, ask for confirmation before saving the application.
  - If a a calculated field or item returns an error, it does not display the table/chart.
  - When having a hierarchical index and filtering by one of the hierarchies, if you filter a value and then switch to another hierarchy, it remains filtered by the first value.
  - Allow hierarchies to work when some items are not mapped.
  - When opening or creating an app, if the current application has pending changes, it should ask if you want to save the changes.
  - The DynamicHTML component does not refresh upon a change in an input node.
  - HTML component with a link to the default interface does not display the interface when clicked if target='_self'.
  - When creating a component from a node alias, it does not refresh with interface events.
  - Interface events are not triggered when interacting with a Dash component.
  - Error when adding a link in an HTML component.
  - Allow navigating to a node in the code via URL.
  - Difference fields in scenarios are not displayed if the dataframe has more than one measure.
  - Minor fixes.
### Version 3.7.6 - 2024-01-09
- Updates
  - Rename "External link" to "API endpoint."
- Fixed Issues
  - Browser back button does not work on external interfaces.
  - Adjustments in margins of Index-type components.
### Version 3.7.5 - 2024-01-08
- Updates
  - New Dynamic HTML interface component allowing on-the-fly addition of properties to HTML.
  - Functionality to set permissions by interface folder.
  - Main department selector in company-department-user assignment determining resource configuration source if user has multiple assigned departments in a company.
  - Functionality to add thumbnail view to applications.
- Fixed Issues
  - Incorrect formatting of Input Scalar in interfaces.
  - If an interface has an Assistant component, opening it scrolls down.
  - Version status and options icons are misaligned in the top bar app title using Windows.
  - Minor fixes.
### Version 3.7.4 - 2023-12-26
- Fixed Issues
  - Navigating diagram throws an error if there is an alias node whose original node does not exist.
### Version 3.7.3 - 2023-12-23
- Updates
  - Improve support for datetime dimensions in tables and charts. Automatic hierarchy added when detecting this type of Index.
  - Do not allow pasting folders or files into the root of the Teams folder.
  - Update HTML editor.
  - Add tooltip to all nodes with title and identifier.
  - Add node option to copy values for nodes with DataFrame or Series result type.
  - Add data type icon to nodes of variable, output, report, and datareading types.
  - Add left side border to nodes of inputselector, inputchoice, and form types.
- Fixed Issues
  - Nested column labels do not adjust well when the form comes from a DataFrame.
  - Multiple calls to endpoints from default interface.
  - Column name tags appear truncated when multiline.
  - Error in Excel export of table with many rows.
  - Filtering by node type does not work correctly with alias nodes.
  - Logic to exclude NaNs in heatmap is reversed. Do not color cells with NaN.
  - Minor fixes.
### Version 3.7.2 - 2023-12-12
- Fixed Issues
  - Minor fixes.
### Version 3.7.1 - 2023-12-11
- New Features
  - When opening an interface, display resources every two seconds.
- Fixed Issues
  - Error when saving an application with a selector that has non-serializable parameters.
### Version 3.7.0 - 2023-12-07
- New Features
  - New add-in for Microsoft Excel by Pyplan.
  - New notification system for an application.
  - New options to customize output invalidation or form confirmation changes.
  - Add options to copy the application to Public and to a Team from the Application Manager.
  - New display format for Selector component to appear as clickable eligible chips.
  - New display format for Index component to appear as a selector.
  - New parameter in scheduled tasks to select users who will receive an email when the task is completed.
  - Allow applying actions such as delete or archive to multiple versions at the same time.
  - Allow applying actions such as delete to multiple scenarios at the same time.
  - Added user role in the account information view.
  - Auto-check "Delete/recreate table" checkbox in forms for structural changes when editing.
  - Allow pinning module-type nodes for quick navigation.
  - In scenarios, save selectors and input scalars that are inputs of the nodes to be saved.
  - In HTML component, if a link to an interface has target='_self', clicking it opens the interface and closes the current tab.
- Fixed Issues
  - Unable to create a new version in a Team if the user does not have permissions to view all company folders.
  - When desynchronizing indices of a component, applying filters to that same component does not work.
  - If the definition with dynamic has the "\" character, dynamic does not work.
  - When searching in form selector, results are arbitrarily reordered.
  - Add loader to Index-type component when values are being loaded.
  - When reloading the application with unsaved pending changes, it does not clear the state of unsaved pending changes.
  - In the diagram, when drawing a selector, the data should arrive with the last saved value to avoid executing its result.
  - If a task in a process changes from "Completed" to "Not started", clear the completion date.
  - When creating an alias, select the new alias node.
  - Input Scalar with non-serializable value breaks UI.
  - In some resolutions, the login window does not display correctly.
  - When adding a hierarchy map to a node in the diagram, it does not show the hierarchy icon in the node until the diagram is refreshed.
  - If you delete a component from an interface with only one component, it does not allow you to delete it.
  - When logging out in a tab, redirect other open tabs to the login screen.
  - Minor fixes.
## Version 3.6
### Version 3.6.16 - 2023-11-09
- New Features
  - Add the possibility to save pending application changes in a new version.
  - Add loader when navigating the File Manager.
- Fixed Issues
  - Duplicating processes throws an error on some occasions.
  - Exporting a component with multiple dimensions in columns throws an error.
  - Minor fixes.
### Version 3.6.15 - 2023-11-05
- New Features
  - When changing hierarchy from Index component, automatically update the rest of components where that index is to the chosen hierarchy.
  - When creating a version, if the user does not have write permissions in the directory, save the application and the new version in their private space.
  - Add loader when changing companies.
  - Change aggregation measure text "Mean" to "Average".
- Fixed Issues
  - When consolidating a module that does not exist in the target application, it always adds it to the root of the diagram.
  - When consolidating an application, interfaces show results prior to consolidation.
  - When renaming a version that is the default version of the application, it does not rename it in the app.ppl file.
  - The Excel reading dialog is not fully visible in low resolutions.
  - In certain instances, the application or version is not updated correctly in the top bar.
  - When closing one of several open instances in the Pyplan Home, it always closes the last one.
  - Open instances remain when they are not avail…
