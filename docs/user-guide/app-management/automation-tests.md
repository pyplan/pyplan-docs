---
sidebar_position: 9
title: Automation Tests
---

# Automation Tests

This section in Pyplan lets you automatically validate that your applications, interfaces, and nodes behave as expected.

## Automation Test Manager

The Automation Test Manager is the main screen where all automation tests defined in a Pyplan application are listed and controlled.

From this view you can:

- Create, edit, and duplicate tests.
- See key information: Name, Creator, Last execution date, Last execution status, Test types, Labels, and whether the test is Enabled.
- Use **Actions** on each row: view preconditions (read-only) or open execution logs.

When you select a test, the toolbar actions at the top become active: **Delete** and **Run**.

## Create a Test

On the Automation Tests page, click **Create** to open the Create Automation Test form.

### Parameters

| Parameter | Description |
|---|---|
| **Name** | The display name of the automation test. |
| **Labels** | Optional tags to group and search automation tests. |
| **Enabled** | A checkbox that controls whether the test is active. |
| **Departments** | Dropdown list to associate the test with one or more departments. |
| **Description** | A free-text field to describe what the test does and what success means. |
| **Notification mode** | Defines if and when notifications are sent: **Always send emails**, **Send emails only on failure**, or **No notification**. |
| **Users to notify** | Select the email recipients for test notifications. |
| **Interfaces** | When checked, links the test to one or more specific interfaces. |
| **Main Menu Interfaces** | Targets high-level interfaces that appear in the main menu. |
| **Nodes** | When checked, associates the test with specific model nodes. |

#### Configuring Nodes

Click **Configure nodes** to open a dialog. Click **+** next to the Nodes title to open the **Add node** window.

In the Add node window:
- Navigate the influence diagram to locate the node to validate.
- Click once on the node to select it.
- The node identifier appears at the bottom as **Selected node id**.
- Click **Confirm**.

Available check types for each node:

| Check type | Description |
|---|---|
| **No evaluation error** | Verify that the node evaluates without errors. |
| **Equal to** | Verify that the node's result equals a specific expected value. |
| **Between** | Verify that the node's result stays within a defined numeric range. |

After finishing node configuration, click **Confirm** in the Nodes dialog.

#### Preconditions

Define the conditions that must be met before the test runs. They typically use selector nodes from the application.

To add a precondition:
1. Open the **Search** dropdown.
2. Select the selector node to constrain.
3. In **Selector values**, specify the required value or list of values.

Use **Add precondition** only when you want to create a separate precondition (a new selector node with its own values).

After configuring all desired options, click **Create** to save the automation test.

## Edit a Test

The Edit test screen lets you modify an existing automation test using the same fields as the Create screen. Click **Update** to save the new configuration, or **Cancel** to discard changes.

## Duplicate a Test

In the Automation Test Manager, select a test and click **Duplicate**. In the dialog, enter a new name for the duplicated test and click **Confirm**.

## Delete a Test

Select one or more tests, click **Delete**, and confirm in the dialog. Selected tests are permanently removed.

## Run a Test

Select one or more tests, click **Run**, and confirm in the dialog. Selected tests are added to the application's execution queue. Once executed, results can be reviewed in the Logs view.

:::note
Tests are not executed immediately when you click Run — they are added to the execution queue.
:::

## Test Execution Logs

The Test execution logs view lets you inspect what happened during the last run of an automation test.

Access the logs from the Automation Test Manager by clicking the logs icon in the Actions column.

**Execution Logs Page overview:**

- The header shows the test name and icons to edit or re-run the test.
- Below, one card per department shows: the department name, last status, last execution time, and a summary of results (passed and failed).
- Toggle **View details / Hide details** to show or collapse the full log table.
- Logs auto-refresh every 10 seconds until the test finishes.

**Log Table columns:**

| Column | Description |
|---|---|
| **Step** | Describes what is being checked. |
| **Status** | The outcome of the step. |
| **Details** | Additional information. For failures, shows the error message or explanation. |

Use the filter icon in the Status column header to show only steps with a specific status (e.g., only failed steps). Use **Remove filters** to return to the full list.

## pp.execute_tests Function

The `pp.execute_tests` function lets you programmatically run one or more automation tests directly from a Pyplan node.

```python
pp.execute_tests(test_ids=None, detached_run=False)
```

**Parameters:**

| Parameter | Description |
|---|---|
| `test_ids` | List of test IDs to execute. If not provided, all tests are executed. |
| `detached_run` | If `True`, tests are executed in detached mode (useful for periodic tasks). Otherwise, tests run using the current instance. |

**Returns:** A dictionary with test IDs as keys and their execution results as values.

**Example:**

```python
pp.execute_tests(test_ids=['test1', 'test2', 'test3'])
```
