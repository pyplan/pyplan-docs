# Pyplan Functions
This page provides detailed technical information about the functions available in the Pyplan API. Each function is crafted to perform specific operations essential for managing and interacting with Pyplan services.

To access and utilize these functions, prefix them with pp. in your code. For example, to initiate a file upload, use pp.upload().

The documentation below outlines the purpose of each function, describes the parameters and return types, and provides usage examples. This will help you integrate and leverage Pyplan functionalities efficiently in your workflows.

# Pyplan node types

This section outlines the functions related to different node types in Pyplan. These functions help in creating and configuring various types of nodes, such as selectors, forms, and input cubes.

## selector

selector(options, selected, multiselect = False, save_selected_labels = False, node_identifier = None)

Creates a UI Pyplan selector for decision nodes.

### Parameters

- **options** (`Union[List[Any], pd.Index]`): List or pandas Index with values that can be selected.
- **selected** (`Union[int, List[int], List[Union[str, int, float]]]`): Current selected value or values.
- **multiselect** (`bool`, optional): Whether to allow multiple selection. Defaults to `False`.
- **save_selected_labels** (`bool`, optional): If `False` (default), saves selected indexes in `selected` parameter. Otherwise, saves the actual selected value (string, integer, float).
- **node_identifier** (`str`, optional): ID of node that holds the definition for the selector. Mandatory if `save_selected_labels` is `True`. Best option is adding `self.identifier` for this param (without quotes).
- **persistence_type** (`PersistenceType`, optional): One of the following options: 'in_definition', 'in_memory' or 'on_disk'. Defaults to `in_definition`.
- **persistence_params** (`Dict[str, Any]`, optional): Additional params for the different persistence_type values. If `persistence_type` is `on_disk`, the `path` (str) param must be supplied.

### Returns

- **Selector**: Pyplan Selector object.

### Examples

```python
>>> options = ["option1", "option2", "option3"]
>>> selected = 1
>>> selector = pp.selector(options, selected)

>>> options = ["option1", "option2", "option3"]
>>> selected = ["option2", "option3"]
>>> selector = pp.selector(
  options,
  selected,
  multiselect=True,
  save_selected_labels=True,
  node_identifier=self.identifier
)

>>> selector = pp.selector(
  ["Brand A", "Brand B"],
  [],
  multiselect=True,
  persistence_type="on_disk",
  persistence_params={"path": "selectors_data/brands.json"}
)
```

## form

form(table_name, columns, settings)

Creates a UI Pyplan form with the given table name, columns, and settings.

### Args

- **table_name (str)**: The name of the table to be displayed in the form.
- **columns (List[FormColumn])**: A list of FormColumn objects that define the columns to be displayed in the form.
- **settings (FormSettings, optional)**: An object containing settings for the form, such as default values and validation rules. Defaults to None.

### Returns

- **Form**: An instance of the Form class.

### Example

```python
>>> pp.form(
        table_name='node1',
        columns=[
            FormColumn(field='column1', title='column1', column_type=ColumnType.input, data_type=DataType.string, nested_headers=['header1', 'header2']),
            FormColumn(field='column2', title='column2', column_type=ColumnType.input, data_type=DataType.string),
            FormColumn(field='column3', title='column3', column_type=ColumnType.input, data_type=DataType.string)
        ],
        settings=FormSettings(database_engine=DatabaseConnectionString.sqlite, database_connection=SQLiteConnection(database_path='forms_data/forms.db'))
    )
```

### **FormColumn**:
Dataclass with all accepted parameters for a form column.
  - **field (str)**: name of the field in the database table.
  - **title (str)**: label that will be displayed in the form.
  - **data_type (DataType)**: data type of the column in the database table.
  - **column_type (ColumnType)**: column variant for the form.
  - **default_value (Any)**: value to insert when adding new rows.
  - **hidden (bool)**: hides the column when editing the form.
  - **read_only (bool)**: prevents editing the column in the form.
  - **change_validation_function (Callable[[Any, str, Union[int, str], pd.DataFrame], tuple[bool, str]])**: Optional validation function that runs upon applying a change to a cell in the column. It receives a 'value', 'column_name', 'row_id' and a pandas DataFrame ('df') as parameters and must return a tuple (bool, str), where the boolean indicates whether the validation was successful (True) or failed (False), and the string contains a message to display after applying the change.
  Example:
  ```python
>>> from typing import Any, Union

QUANTITIES_THRESHOLD = 300

def _quantities_change_validation_fn(
    value: Any, column_name: str, row_id: Union[int, str], df: pd.DataFrame
) -> tuple[bool, str]:
    """Validates the given value against a predefined maximum threshold.

    Args:
        value (Any): The value to be validated.
        column_name (str): The name of the column where the value is located.
        row_id (Union[int, str]): The identifier of the row containing the value.
        df (pd.DataFrame): The DataFrame with the current state of the form.

    Returns:
        tuple[bool, str]: A tuple where the first element is a boolean indicating
        whether the value is valid, and the second element is a message to display after the validation.
    """
    if value > QUANTITIES_THRESHOLD:
        return (
            False,
            f'Invalid value {value}. The maximum value is {QUANTITIES_THRESHOLD}',
        )

    return True, ''
```
  - **formula (str or function)**: for `ColumnType.calc` only.
    - When `formula` is a string, it evaluates a string describing operations on form columns. See: [pandas.DataFrame.eval](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.eval.html).
    - When `formula` is a function, it passes the form DataFrame to the function as an argument.
  - **values (List)**: for `ColumnType.selector` only. List of values to display in the selector for the entire column.
  - **filter_rows_by_domain (bool)**: for `ColumnType.selector` only. When `True`, displayed rows of the form will be filtered by the available elements in the `values` list parameter.
  - **related_map (pd.DataFrame or pp.Form)**: for `ColumnType.related_selector` only. DataFrame with related columns allocation.
  - **related_map_column_values (str)**: for `ColumnType.related_selector` only. Name of the column in `related_map` that has the values to be displayed in the selector.
  - **related_columns (str or List[str])**: Name or list of names of columns in `related_map` that will filter the results of the `related_map_column_values` column. These columns should be present in the form as field names and in `related_map` as columns.
  - **nested_headers (List[str])**: List of headers to display in nested columns. For example, `['header1', 'header2']` will display a column with `header1` as a child and `header2` as a parent. It's important to note that this is a nested structure, so children cannot be wider than parents. If so, headers and `nested_headers` will not be rendered.
  - **strict (bool)**: for `ColumnType.selector` and `ColumnType.related_selector` only. When `True`, it only allows values that are defined as options in the selector.
  - **multiselect (bool)**: for `ColumnType.selector` and `ColumnType.related_selector` only. When `True`, it allows selecting multiple values in the selector.
  - **count_values_to_render (int)**: for `ColumnType.selector` and `ColumnType.related_selector` only. When `multiselect` is `True`, this integer will be used to limit the number of values rendered in the selector. Defaults to `1`.

### FormSettings
Dataclass with all accepted parameters for form settings.

- **database_engine (DatabaseConnectionString)**: one of `'sqlite'`, `'postgresql'`, or `'custom'`.
- **database_connection (Union[SQLiteConnection, EncryptedSQLiteConnection, PostgreSQLConnection])**: connection parameters for the given database engine.
- **confirm_validation_function (Callable[[pd.DataFrame], tuple[bool, str]])**: Optional validation function that runs upon confirmation. It receives a pandas DataFrame ('df') as a parameter and must return a tuple (bool, str), where the boolean indicates whether the validation was successful (True) or failed (False), and the string contains a message to display after confirmation. Example:
```python
>>> QUANTITY_TOTAL_SUM_THRESHOLD = 1200
PRICE_MEAN_THRESHOLD = 15.0

def _confirm_validation_fn(df: pd.DataFrame) -> tuple[bool, str]:
    """Validates whether the total sum of the 'quantity' column and the average of
    the 'price' column meet the defined constraints.

    Args:
        df (pd.DataFrame): The DataFrame with the current state of the form.

    Returns:
        tuple[bool, str]: A tuple where the first element is a boolean indicating
        whether the DataFrame meets the validation criteria, and the second element
        is an error message if the validation fails.
    """
    quantity_total_sum = df['quantity'].sum().item(0)
    if not quantity_total_sum <= QUANTITY_TOTAL_SUM_THRESHOLD:
        return (
            False,
            f'The total sum of Quantity must be {QUANTITY_TOTAL_SUM_THRESHOLD} or less. Current total: {quantity_total_sum}',
        )

    price_mean = df['price'].mean().item(0)
    if not price_mean <= PRICE_MEAN_THRESHOLD:
        return (
            False,
            f'The average Price must be {PRICE_MEAN_THRESHOLD} or less. Current average: {price_mean}',
        )

    return True, ''
```
- **database_custom_url (str)**: database connection URL for a custom database engine.
- **initial_empty_rows (int)**: number of rows to display when the form is created.
- **allow_add_rows (bool)**: allows inserting new rows.
- **allow_remove_rows (bool)**: allows removing existing rows.
- **allow_add_new_columns (bool)**: if set to `True`, creates new columns in the table if a new column is found after the form was created. Otherwise, raises a `ValueError`.
- **fixed_columns (int)**: number of columns to fix when scrolling the form horizontally.
- **from_dataframe (bool)**: if set to `True`, every row in the form is originated in a given pandas DataFrame object.
- **source_dataframe_node (pd.DataFrame)**: used when `from_dataframe` is `True` only. Pandas DataFrame object that will be the source of every row in the form.
- **source_dataframe_id_column (str)**: used when `from_dataframe` is `True` only. Column name in `source_dataframe_node` DataFrame that will be used to uniquely identify rows in the form.
- **remove_old_rows (str)**: used when `from_dataframe` is `True` only. When set to `True`, it deletes rows where its ID column value was previously stored in the database but is not currently present in the source pandas DataFrame.

## input_cube

input_cube(table_name, dimensions, settings)

Creates a UI Pyplan InputCube with the given table name, dimensions, and settings.

### Args

- **table_name (str)**: The name of the table to be displayed in the InputCube.
- **dimensions (List[InputCubeDimension])**: A list of InputCubeDimension objects defining the dimensions to be displayed in the InputCube.
- **settings (InputCubeSettings, optional)**: An object containing settings for the InputCube, such as default values and validation rules. Defaults to None.

### Returns

- **InputCube**: An instance of the InputCube class.

### Example

```python
>>> pp.input_cube(
        table_name='sales',
        dimensions=[
            InputCubeDimension(field='regions', name=regions.node.identifier),
            InputCubeDimension(field='item_types', name=item_types.node.identifier)
        ],
        settings=InputCubeSettings(
            data_type=DataType.float,
            default_value_type=DefaultValueType.scalar,
            default_value=0.0,
            database_engine=DatabaseConnectionString.sqlite,
            database_connection=SQLiteConnection(database_path='inputs_data/input_cubes.db')
        )
    )
```
### InputCubeDimension
Dataclass with all accepted parameters for an InputCube dimension.

- **field (str)**: name of the field that will be saved in the database.
- **name (str)**: name of the dimension. Must be a node identifier corresponding to a pandas Index.

### InputCubeSettings
Dataclass with all accepted parameters for InputCube settings.

- **database_engine (DatabaseConnectionString)**: one of `'sqlite'`, `'postgresql'`, or `'custom'`.
- **database_connection (Union[SQLiteConnection, EncryptedSQLiteConnection, PostgreSQLConnection])**: connection parameters for the given database engine.
- **database_custom_url (str)**: database connection URL for a custom database engine.
- **confirm_validation_function (Callable[[pd.DataFrame], tuple[bool, str]])**: Optional validation function that runs upon confirmation. It receives a pandas DataFrame ('df') as a parameter and must return a tuple (bool, str), where the boolean indicates whether the validation was successful (True) or failed (False), and the string contains a message to display after confirmation.
- **data_type (DataType)**: data type of every value in the table.
- **default_value_type (DefaultValueType)**: one of `'scalar'`, `'app_node'`.
- **default_value (Union[float, int, str])**: value to be set by default. If `default_value_type` is `'scalar'`, it can be `float`, `int`, or `str`. If it is `'app_node'`, it must be a `str` with the node identifier from which its result will be taken as a default value.
- **remove_non_existing_combinations (bool)**: if `True`, removes any combination of dimensions that is not present in the actual set of combinations from given dimensions.
- **allow_dimension_changes (bool)**: if `False`, raises an error when a new dimension is added or removed.

# Process
Functions related to process management within Pyplan allow you to retrieve and manage processes, including their statuses and updates.

## get_all_processes

get_all_processes(in_progress_only = True)

Returns a list of all processes available in the current application.

### Parameters

- **in_progress_only** (`bool`, optional): Whether to include In progress processes only (`True`) or all process statuses (`Stopped`, `In Progress`, and `Completed`). Defaults to `True`.

### Returns

- **List[Dict]**: A list of dictionaries with the following structure:
    ```python
    [
        {
            "id": 1,
            "name": "Process A",
            "description": "",
            "status": {
                "id": 2,
                "name": "In progress",
                "color": "#ff7f0e",
                "status_type": "in_progress"
            },
            "start_date": "2023-08-01T14:10:50+0000",
            "end_date": None,
            "subscribers": [
                {
                    "id": "1b23133b-a005-4a28-9768-7eb3a0ec2555",
                    "username": "app_administrator",
                    "first_name": "App",
                    "last_name": "Administrator"
                }
            ],
            "groups": [
                {
                    "id": 2,
                    "name": "Demand Planning",
                    "position": 1,
                    "tasks": [
                        {
                            "id": 2,
                            "name": "Historical Analysis",
                            "description": "",
                            "action_type": "open_interface",
                            "action_data": "d64d9487-83bb-46ce-9dfb-d7e48144fb07",
                            "responsible": {
                                "id": "dbc28680-0a42-4aeb-a2cc-ddf5829f3b2c",
                                "username": "viewer_user",
                                "first_name": "Viewer",
                                "last_name": "User"
                            },
                            "status": {
                                "id": 2,
                                "name": "In progress",
                                "color": "#ff7f0e",
                                "status_type": "in_progress"
                            },
                            "due_days": 2,
                            "due_hours": 0,
                            "due_minutes": 0,
                            "due_type": {
                                "id": "2",
                                "name": "since_blocking_task_completed"
                            },
                            "is_delayed": False,
                            "subscribers": [],
                            "is_blocked_by": [1],
                            "reviewers": [
                                {
                                    "id": "1b23133b-a005-4a28-9768-7eb3a0ec2555",
                                    "username": "app_administrator",
                                    "first_name": "App",
                                    "last_name": "Administrator"
                                }
                            ],
                            "comments": [],
                            "finished": None,
                            "reviewer_interface": "d64d9487-83bb-46ce-9dfb-d7e48144fb07"
                        },
                        {
                            "id": 4,
                            "name": "Baseline Forecast",
                            "description": "",
                            "action_type": "open_interface",
                            "action_data": "99721db0-b967-4f99-a39c-40a78e3ed19a",
                            "responsible": {
                                "id": "dbc28680-0a42-4aeb-a2cc-ddf5829f3b2c",
                                "username": "viewer_user",
                                "first_name": "Viewer",
                                "last_name": "User"
                            },
                            "status": {
                                "id": 5,
                                "name": "Not ready to start",
                                "color": "#e6e6fa",
                                "status_type": "not_ready_to_start"
                            },
                            "due_days": 2,
                            "due_hours": 0,
                            "due_minutes": 0,
                            "due_type": {
                                "id": "2",
                                "name": "since_blocking_task_completed"
                            },
                            "is_delayed": False,
                            "subscribers": [],
                            "is_blocked_by": [2],
                            "reviewers": [
                                {
                                    "id": "1b23133b-a005-4a28-9768-7eb3a0ec2555",
                                    "username": "app_administrator",
                                    "first_name": "App",
                                    "last_name": "Administrator"
                                }
                            ],
                            "comments": [],
                            "finished": None,
                            "reviewer_interface": "5a61034d-98f2-4716-84cb-1ce6eb110982"
                        },
                    ]
                }
            ],
            "is_delayed": False
        },
        {
            "id": 2,
            "name": "Process B",
            "description": "",
            "status": {
                "id": 2,
                "name": "In progress",
                "color": "#ff7f0e",
                "status_type": "in_progress"
            },
            "start_date": "2023-08-16T14:53:07+0000",
            "end_date": None,
            "subscribers": [
                {
                    "id": "4107a468-ba9a-4843-b3bb-1961ce665313",
                    "username": "app_administrator2",
                    "first_name": "App",
                    "last_name": "Administrator 2"
                }
            ],
            "groups": [
                {
                    "id": 3,
                    "name": "Supply Planning",
                    "position": 0,
                    "tasks": [
                        {
                            "id": 7,
                            "name": "Production Plan",
                            "description": "",
                            "action_type": "open_interface",
                            "action_data": "3abf4d4a-ab24-4b29-8e92-2add9bdef422",
                            "responsible": {
                                "id": "dbc28680-0a42-4aeb-a2cc-ddf5829f3b2c",
                                "username": "viewer_user",
                                "first_name": "Viewer",
                                "last_name": "User"
                            },
                            "status": {
                                "id": 4,
                                "name": "Completed",
                                "color": "#127517",
                                "status_type": "completed"
                            },
                            "due_days": 2,
                            "due_hours": 0,
                            "due_minutes": 0,
                            "due_type": {
                                "id": "1",
                                "name": "since_process_starts"
                            },
                            "is_delayed": False,
                            "subscribers": [],
                            "is_blocked_by": [],
                            "reviewers": [],
                            "comments": [],
                            "finished": "2023-08-23T15:10:50+0000",
                            "reviewer_interface": ""
                        },
                    ],
                }
            ],
            "is_delayed": False
        }
    ]
    ```

### Example

```python
result = pp.get_all_processes()
```

## get_my_processes

get_my_processes(in_progress_only = True)

Returns a list of all processes in which the current user is involved. A user is considered involved in a
process if any of the following conditions are met:
  a) The user is a subscriber to the process.
  b) The user is responsible for a task within the process.
  c) The user is a subscriber or reviewer for a task within the process.

If condition a) is met, the function will return all tasks associated with the process. If either condition b) or c) is met, the function will only return tasks for which the user is responsible, a subscriber, or a reviewer.

### Parameters

- **in_progress_only** (`bool`, optional): Whether to include In progress processes only (`True`) or all process statuses (`Stopped`, `In Progress`, and `Completed`). Defaults to `True`.

### Returns

- **List[Dict]**: A list of dictionaries with the following structure:
    ```python
    [
        {
            "id": 1,
            "name": "Process A",
            "description": "",
            "status": {
                "id": 2,
                "name": "In progress",
                "color": "#ff7f0e",
                "status_type": "in_progress"
            },
            "start_date": "2023-08-01T14:10:50+0000",
            "end_date": None,
            "subscribers": [
                {
                    "id": "1b23133b-a005-4a28-9768-7eb3a0ec2555",
                    "username": "app_administrator",
                    "first_name": "App",
                    "last_name": "Administrator"
                }
            ],
            "groups": [
                {
                    "id": 2,
                    "name": "Demand Planning",
                    "position": 1,
                    "tasks": [
                        {
                            "id": 2,
                            "name": "Historical Analysis",
                            "description": "",
                            "action_type": "open_interface",
                            "action_data": "d64d9487-83bb-46ce-9dfb-d7e48144fb07",
                            "responsible": {
                                "id": "dbc28680-0a42-4aeb-a2cc-ddf5829f3b2c",
                                "username": "viewer_user",
                                "first_name": "Viewer",
                                "last_name": "User"
                            },
                            "status": {
                                "id": 2,
                                "name": "In progress",
                                "color": "#ff7f0e",
                                "status_type": "in_progress"
                            },
                            "due_days": 2,
                            "due_hours": 0,
                            "due_minutes": 0,
                            "due_type": {
                                "id": "2",
                                "name": "since_blocking_task_completed"
                            },
                            "is_delayed": False,
                            "subscribers": [],
                            "is_blocked_by": [1],
                            "reviewers": [
                                {
                                    "id": "1b23133b-a005-4a28-9768-7eb3a0ec2555",
                                    "username": "app_administrator",
                                    "first_name": "App",
                                    "last_name": "Administrator"
                                }
                            ],
                            "comments": [],
                            "finished": None,
                            "reviewer_interface": "d64d9487-83bb-46ce-9dfb-d7e48144fb07"
                        },
                        {
                            "id": 4,
                            "name": "Baseline Forecast",
                            "description": "",
                            "action_type": "open_interface",
                            "action_data": "99721db0-b967-4f99-a39c-40a78e3ed19a",
                            "responsible": {
                                "id": "dbc28680-0a42-4aeb-a2cc-ddf5829f3b2c",
                                "username": "viewer_user",
                                "first_name": "Viewer",
                                "last_name": "User"
                            },
                            "status": {
                                "id": 5,
                                "name": "Not ready to start",
                                "color": "#e6e6fa",
                                "status_type": "not_ready_to_start"
                            },
                            "due_days": 2,
                            "due_hours": 0,
                            "due_minutes": 0,
                            "due_type": {
                                "id": "2",
                                "name": "since_blocking_task_completed"
                            },
                            "is_delayed": False,
                            "subscribers": [],
                            "is_blocked_by": [2],
                            "reviewers": [
                                {
                                    "id": "1b23133b-a005-4a28-9768-7eb3a0ec2555",
                                    "username": "app_administrator",
                                    "first_name": "App",
                                    "last_name": "Administrator"
                                }
                            ],
                            "comments": [],
                            "finished": None,
                            "reviewer_interface": "5a61034d-98f2-4716-84cb-1ce6eb110982"
                        },
                    ]
                }
            ],
            "is_delayed": False
        },
        {
            "id": 2,
            "name": "Process B",
            "description": "",
            "status": {
                "id": 2,
                "name": "In progress",
                "color": "#ff7f0e",
                "status_type": "in_progress"
            },
            "start_date": "2023-08-16T14:53:07+0000",
            "end_date": None,
            "subscribers": [
                {
                    "id": "4107a468-ba9a-4843-b3bb-1961ce665313",
                    "username": "app_administrator2",
                    "first_name": "App",
                    "last_name": "Administrator 2"
                }
            ],
            "groups": [
                {
                    "id": 3,
                    "name": "Supply Planning",
                    "position": 0,
                    "tasks": [
                        {
                            "id": 7,
                            "name": "Production Plan",
                            "description": "",
                            "action_type": "open_interface",
                            "action_data": "3abf4d4a-ab24-4b29-8e92-2add9bdef422",
                            "responsible": {
                                "id": "dbc28680-0a42-4aeb-a2cc-ddf5829f3b2c",
                                "username": "viewer_user",
                                "first_name": "Viewer",
                                "last_name": "User"
                            },
                            "status": {
                                "id": 4,
                                "name": "Completed",
                                "color": "#127517",
                                "status_type": "completed"
                            },
                            "due_days": 2,
                            "due_hours": 0,
                            "due_minutes": 0,
                            "due_type": {
                                "id": "1",
                                "name": "since_process_starts"
                            },
                            "is_delayed": False,
                            "subscribers": [],
                            "is_blocked_by": [],
                            "reviewers": [],
                            "comments": [],
                            "finished": "2023-08-23T15:10:50+0000",
                            "reviewer_interface": ""
                        },
                    ],
                }
            ],
            "is_delayed": False
        }
    ]
    ```

### Example

```python
result = pp.get_my_processes()
```

## get_task_statuses

get_task_statuses()

### Summary
Returns a list of dictionaries containing all available statuses.

### Returns
- **list of dicts**: Returns a list of dictionaries with the following structure:
```python
  [
      {'id': 1, 'name': 'Not started', 'color': '#a7a7a7', 'status_type': 'not_started'},
      {'id': 2, 'name': 'In progress', 'color': '#ff7f0e', 'status_type': 'in_progress'},
      {'id': 3, 'name': 'Pending review', 'color': '#FFC400', 'status_type': 'pending_review'},
      {'id': 4, 'name': 'Completed', 'color': '#127517', 'status_type': 'completed'},
      {'id': 5, 'name': 'Not ready to start', 'color': '#e6e6fa', 'status_type': 'not_ready_to_start'},
  ]
```

### Example

```python
Copy code
result = pp.get_task_statuses()
```

## change_task_status

change_task_status(task_id, new_task_status_id)

### Summary
Updates the status of a given task.

### Args
- **task_id**: (int) ID of the task to update.
- **new_task_status_id**: (int) ID of the desired status type to set. Reference values (use `pp.get_task_statuses()` for more statuses):
  - 1: Not started
  - 2: In progress
  - 3: Pending review
  - 4: Completed
  - 5: Not ready to start

### Returns
- **bool**

### Example
```python
result = pp.change_task_status(task_id=3, new_task_status_id=2)
```

## update_process

update_process(process_id, data)

### Summary
Updates the properties of a given process.

### Args
- **process_id**: (int) ID of the process to update.
- **data**: (dict) Dictionary with the properties to update as keys and the new values as values. Available properties:
  - name (str): name of the process.
  - description (str): Description of the process.
  - start_date (date): Start date of the process.
  - end_date (date): End date of the process.
  - status (dict): Status of the process. Get a list of the available statuses with 'pp.get_process_statuses()'.
  - groups (list[dict]): List of groups to update or create, where each group can include:
  	- id (int, optional): ID of the group to update.
  	- name (str): Name of the group.
  	- position (int, optional): Position of the group (for new groups).
  	- tasks (list[dict]): List of tasks within the group, where each task can include:
      - id (int, optional): ID of the task to update.
      - name (str): Name of the task.
      - description (str): Description of the task.
      - action_type (str): Type of action associated with the task.
      - action_data (str): Data related to the action.
      - responsible (int): ID of the user responsible for the task.
      - due_days (int): Number of due days for the task.
      - due_type (str): Type of due date.
      - status (dict): Status of the task. Requires a key 'id' with the status ID.
      - reviewer_interface (str): Reviewer interface configuration.
      - is_blocked_by (list[int]): List of task IDs that block this task.
      - reviewers (list[int]): List of user IDs as reviewers for the task.
      - subscribers (list[int]): List of user IDs subscribed to the task.
    - tasks_to_delete (list[int]): List of task IDs to delete.
    - subscribers (list[int]): List of user IDs subscribed to the process.

### Returns
- **bool**

### Example
```python
import datetime

new_data = {
  'end_date': datetime.datetime.now(),
  'status': {
  'id': 3,
  'name': 'Completed',
  'color': '#127517',
  'status_type': 'completed'
  }
}

result = pp.update_process(process_id=2, data=new_data)
```

# Scheduled tasks
This subsection contains functions related to the management and monitoring of scheduled tasks within Pyplan. These functions allow you to log task activity, initiate the execution of scheduled tasks, and retrieve logs to monitor task progress and outcomes.

## log_task

log_task(task_state, task_description, task_activity, task_info)

Generates a log entry. Used for scheduled tasks.

### Parameters

- **task_state** (`str`): State of the task. It can be one of the following: 'PROGRESS', 'INFO', 'WARNING', 'FAILURE',
  'RETRY', 'SUCCESS', 'REVOKED', 'STARTED', 'PENDING', 'RECEIVED'.
- **task_description** (`str`): Short description of the task. Example: 'start process'.
- **task_activity** (`str`): Additional short description.
- **task_info** (`dict`): JSON containing more information about the task. Keys should be strings and values
  can be strings or integers.

### Returns

- **requests.Response**: The response of the API call.

### Example

```python
>>> import requests
>>> pp.log_task(task_state='SUCCESS', task_description='Process finished', task_activity='Data import',
                task_info={'imported_rows': 100})
```

## run_scheduled_task

run_scheduled_task(task_id, version, notification_emails=None)

### Summary
Initiates the execution of a scheduled task.

### Args
- **task_id**: (int) ID of the task to initiate.
- **version**: (str) Version of the application to run. If not provided, it will run the version that was set for the task.
- **notification_emails**: (List[str]): Optional list of recipient emails. If None or an empty list, task default notification users will be used.

### Returns
- **str**: "OK" if the task started executing successfully.

### Raises
- **ValueError**: If `task_id` is not a positive integer.
- **Exception**: If there's an issue initiating the task execution.

### Examples
```python
>>> result = pp.run_scheduled_task(task_id=3)
>>> result = pp.run_scheduled_task(task_id=2, version='7+5')
>>> result = pp.run_scheduled_task(task_id=2, notification_emails=['user@company.com'])
```

## get_scheduled_task_logs

get_scheduled_task_logs(task_id, result_size=50, task_details=True)

### Summary
Retrieves the logs/messages of a scheduled task.

### Args
- **task_id**: (int) ID of the task to retrieve logs for.
- **result_size**: (int) Number of log messages to retrieve (default is 50).
- **task_details**: (bool) Whether to include detailed information about the task (default is True).

### Returns
- **List[dict]**: List of dictionaries containing the latest 'result_size' log messages.

**Structure with `task_details=True`**:
```python
            [
                {
                    "id": "32ed40e6-d98b-43f7-a192-581107892f3b",
                    "state": "INFO",
                    "params": null,
                    "task_logs": [
                    {
                        "id": "b704722b-77d8-4bf6-8687-46074a201225",
                        "state": "RECEIVED",
                        "is_running": false,
                        "description": "Start Job",
                        "activity": null,
                        "created_at": "2024-03-26T17:41:45+0000",
                        "updated_at": "2024-03-26T17:41:45+0000",
                        "info": {
                        "params": {
                            "param1": "0"
                        },
                        "node_id": "a1millonfilas",
                        "version": null,
                        "app_path": "pyplan/admin/Analisis de datos 1"
                        },
                        "periodic_task_log": "c3d70913-d6a9-4d12-9327-a8a0e2c191cd"
                    },
                    {
                        "id": "06c27e3c-a850-4954-bf88-e6fe26a2eeae",
                        "state": "PROGRESS",
                        "is_running": false,
                        "description": "Application successfully opened",
                        "activity": null,
                        "created_at": "2024-03-26T17:41:47+0000",
                        "updated_at": "2024-03-26T17:41:47+0000",
                        "info": {},
                        "periodic_task_log": "c3d70913-d6a9-4d12-9327-a8a0e2c191cd"
                    },
                    {
                        "id": "021d79b5-fb69-43b5-bee7-3b1f56a52caf",
                        "state": "INFO",
                        "is_running": false,
                        "description": "Checking Existence",
                        "activity": null,
                        "created_at": "2024-03-26T17:41:47+0000",
                        "updated_at": "2024-03-26T17:41:47+0000",
                        "info": {
                        "Existence": "Node a1millonfilas does exists"
                        },
                        "periodic_task_log": "c3d70913-d6a9-4d12-9327-a8a0e2c191cd"
                    },
                    {
                        "id": "060fc7e7-d90b-48aa-af5a-3b9c710e945b",
                        "state": "INFO",
                        "is_running": false,
                        "description": "Node run started",
                        "activity": null,
                        "created_at": "2024-03-26T17:41:47+0000",
                        "updated_at": "2024-03-26T17:41:47+0000",
                        "info": {},
                        "periodic_task_log": "c3d70913-d6a9-4d12-9327-a8a0e2c191cd"
                    }
                    ],
                    "created_at": "2024-03-26T12:58:42+0000",
                    "task_id": "0ecea047-bc4b-4129-adf7-802091b5a969",
                    "periodic_task": 11
                },
                {
                    "id": "8e8b5287-057b-4041-a8fe-4ba6a69bfcf0",
                    "state": "INFO",
                    "params": {
                                "param1": "12"
                            },
                    "created_at": "2024-03-26T13:06:16+0000",
                    "task_id": "b8274630-f4fd-41bb-b59e-2c75e579dc8a",
                    "periodic_task": 11
                },
            ]

```
Structure with task_details=False:

```python

            [
                {
                    "id": "8e8b5287-057b-4041-a8fe-4ba6a69bfcf0",
                    "state": "INFO",
                    "params": {
                                "param1": "12"
                            },
                    "created_at": "2024-03-26T13:06:16+0000",
                    "task_id": "b8274630-f4fd-41bb-b59e-2c75e579dc8a",
                    "periodic_task": 11
                },
            ]

```
### Raises
- **ValueError**: If task_id is not a positive integer.
- **Exception**: If there's an issue retrieving the task logs.
### Example
```python

logs = pp.get_scheduled_task_logs(task_id=3, result_size=20, task_details=True)
```

# Agents
The Agents functions allow you to interact with and configure an AI agent within your application.

## agent_chat

agent_chat(agent_code, chat_message, chat_session_id, metadata=None, context=None)

### Summary
Chat with an AI agent.

### Args
- **agent_code**: (str) Agent code.
- **chat_message**: (str) Message to be sent to the agent.
- **chat_session_id**: (str) ID of the chat session.
- **metadata**: (Optional[Dict]) Metadata to be used by the agent.
- **context**: (Optional[Dict]) Context to be used by the agent.

### Returns
- **Any**: What the agent is configured to reply.

### Example
```python
result = pp.agent_chat(
    agent_code=agent_node.code,
    chat_message='Hello',
    chat_session_id='ab12345'
)
```

# Assistant bots
The Assistant Bot functions allow you to interact with and configure a virtual assistant within your application. You can update the assistant's parameters, such as its name, description, and behavior, or initiate conversations by sending messages to it. This functionality is designed to enhance the user experience by providing customizable AI-driven assistance within your applications.

## update_application_assistant

update_application_assistant(assistant_id, engine_type, name=None, description=None, instructions=None, model=None, advanced_settings=None, reindex_documents=True, add_nodes_info_file=True, add_interfaces_info_file=True, active=None)

### Summary
Updates the parameters of the currently selected assistant bot for the application.

### Args
- **assistant_id**: (str) ID of the assistant to update.
- **engine_type**: (str) One of the following options: 'openai_assistant' or 'haystack'.
- **name**: (str) Name of the assistant.
- **description**: (str) Description of the assistant.
- **instructions**: (str) The system instructions that the assistant uses.
- **model**: (str) ID of the model to use.
- **advanced_settings**: (Dict) Dictionary with additional parameters (not mentioned before) to be used when updating the assistant.
- **reindex_documents**: (bool) If True, it updates the indexed information about the uploaded documents.
- **add_nodes_info_file**: (bool) If true, it updates the information about nodes of the current application.
- **add_interfaces_info_file**: (bool) If true, it updates the information about interfaces of the current application.
- **active**: (bool) If true, this assistant is displayed as an option when launching the Assistant bot widget in Pyplan.

### Returns
- **Union[str, None]**: ID of the updated assistant bot.

### Example
```python
result = pp.update_application_assistant(
    assistant_id='asst_i4....',
    engine_type='openai_assistant',
    reindex_documents=True
)
```

## assistant_chat

assistant_chat(assistant_id, engine_type, chat_message, chat_history=None)

### Summary
Chat with an assistant.

### Args
- **assistant_id**: (str) ID of the assistant to update.
- **engine_type**: (str) One of the following options: 'openai_assistant' or 'haystack'.
- **chat_message**: Union[dict, str] Message to be sent to the assistant.
- **chat_history**: [List[dict]] Chat message history.
  - **Example**:
    ```python
    [
        {'role': 'user', 'content': 'Hello'},
        {'role': 'assistant', 'content': 'Hello, how can I help you?'},
        {'role': 'user', 'content': 'I need help with...'}
    ]
    ```

### Returns
- **Union[str, None]**: Message returned by the assistant.

### Example
```python
result = pp.assistant_chat(
    assistant_id='asst_i4...',
    engine_type='openai_assistant',
    message='Analyze the following data and...'
)
```

# Automated tests
Functions related to application tests created in the Automation tests section.

## execute_tests

execute_tests(test_ids=None, detached_run=False)

Executes tests by their IDs.

### Parameters

- **test_ids** (`List[str]`, optional): List of test IDs to execute. If not provided, all tests are executed.
- **detached_run** (`bool`, optional): If True, the tests are executed in detached mode. This can be useful for a periodic task that runs tests. Otherwise, tests are run using the current instance. Defaults to False.

### Returns

- **Dict[str, Any]**: A dictionary with test IDs as keys and their execution results as values.

### Example

```python
result = pp.execute_tests(test_ids=['test1', 'test2', 'test3'])
```

# Encription
The Encryption functions provide secure methods for managing sensitive data within your application. These functions enable you to retrieve encrypted secrets, manage your secret keys, and decrypt encrypted SQLite databases. This ensures that your data remains protected while allowing you to access and manage it as needed.

## get_secret

get_secret(secret_key, department_code=None)

### Summary
Returns the value of a secret key.

### Args
- **secret_key**: (str) The key of the secret to get.
- **department_code**: (str, optional) The code of the department to which the secret belongs.

### Returns
- **Union[str, None]**: Returns the value of the secret key if it exists, otherwise `None`.

### Example
```python
result = pp.get_secret(secret_key='my_secret_key', department_code='my_department_code')
```

## get_my_secret_keys

get_my_secret_keys()

### Summary
Returns a list of all the secret keys the user has access to.

### Returns
- **List[str]**: List of secret keys.

### Example
```python
result = pp.get_my_secret_keys()
```

## decrypt_sqlite_database

decrypt_sqlite_database(encrypted_db_path, decrypted_db_path, password, remove_encrypted_db_when_done=False, sqlite_cipher_mode=ENCRYPTED_SQLITE_CIPHER_MODE, sqlite_kdf_iter=ENCRYPTED_SQLITE_KDF_ITER)

### Summary
Decrypts an existing cyphered SQLite database and creates a new SQLite database without encryption with its original data.

### Args
- **encrypted_db_path**: (str) Path to the encrypted SQLite database.
- **decrypted_db_path**: (str) Path to the new decrypted SQLite database.
- **password**: (str) Password used to encrypt the original SQLite database.
- **remove_encrypted_db_when_done**: (bool) If true, if the process finishes successfully, deletes the original encrypted SQLite database file.
- **sqlite_cipher_mode**: (Union[str, None]) If provided, it is used to unlock the encrypted SQLite database. Pass None to bypass it.
- **sqlite_kdf_iter**: (Union[str, None]) If provided, it is used to unlock the encrypted SQLite database. Pass None to bypass it.

### Returns
- **None**

### Example
```python
import os

result = pp.decrypt_sqlite_database(
    encrypted_db_path=os.path.join(current_forms_data_path, 'encrypted_forms.db'),
    decrypted_db_path=os.path.join(current_forms_data_path, 'decrypted_forms.db'),
    password=pp.get_secret('MY_FORMS_DB_PASSWORD'),
    remove_encrypted_db_when_done=True
)
```

#  File Operations and Messaging
This section covers functions related to handling files and managing messages within the Pyplan environment.

## download

download(file_path)

Download file from Pyplan UI.

### Parameters

- **file_path** (`str`): The path of the file to download. It can be absolute, relative, or from temp.

### Example

```python
# absolute
pp.download('/company/Public/data/sample.csv')

# relative to current application
pp.download('output.csv')

# from temp directory
pp.download('/temp/uuid.csv')

# download folder as .zip file
pp.download('folder1')
```

## upload

upload(target_path, target_filename=None, allowed_extensions=None, validation_node_id=None, callback_node_id=None, list_of_node_ids_to_invalidate=None, upload_text=None, multiple=False)

Display upload wizard in Pyplan UI.

### Parameters

- **target_path** (`str`): Upload target folder.
- **target_filename** (`Union[str, None]`, optional): Always assign this name to the uploaded file. Generate a copy if the file already exists.
- **allowed_extensions** (`List[str]`, optional): File extensions allowed for upload.
- **validation_node_id** (`str`, optional): Identifier of the node that will execute the validation. The node must return a function (see in the examples).
- **callback_node_id** (`str`, optional): Identifier of the node to invoke once the file has been uploaded. The node must return a function (see in the examples).
- **list_of_node_ids_to_invalidate** (`List[str]`, optional): List of node identifiers to be invalidated after file uploading.
- **upload_text** (`str`, optional): Text to be displayed in the upload dialog box.
- **multiple** (`bool`, optional): If true, allows uploading more than one file at a single time. 'target_filename' parameter is not used when multiple is True.

### Example

```python
# absolute
pp.upload(target_path='/company/Public/data')

# relative to current application
pp.upload(target_path='data')

# fixed file name
pp.upload(target_path='data', target_filename='input_template.xlsx')

# filter file extensions
pp.upload(target_path='data', allowed_extensions=['.xls','.xlsx','.xlsm'])

# with validation node
pp.upload(target_path='data', validation_node_id='validation_upload')
# example definition of validation_upload node:
def _fn(filename: str) -> bool:
    # your validation code here
    ...
    pp.send_message('your message here')
    return True

result = _fn

# using callback
pp.upload(target_path='data', callback_node_id='upload_callback')
# example definition of upload_callback node:
def _fn(filename: str):
    # your code here
    result = _fn

# using invalidate nodes:
pp.upload(target_path='data', list_of_node_ids_to_invalidate=['connection_node_1', 'connection_node_2'])

# upload multiple files
pp.upload(target_path='/company/Public/data', allowed_extensions=['.xls','.xlsx','.xlsm'], multiple=True)
```

## send_message

send_message(message_text, message_title = None, not_level_reverse = "info", auto_hide_duration = None, extra_params = None)

Sends a message to the UI. Only used with Pyplan UI.

### Parameters

- **message_text** (`str`): The message text to be displayed.
- **message_title** (`Optional[str]`, optional): The message title to be displayed. Defaults to `None`.
- **not_level_reverse** (`str`, optional): The level of the message. Can be "info", "success", "warning", or "error". Defaults to "info".
- **auto_hide_duration** (`int`, optional): The time in milliseconds to automatically hide the message.
- **extra_params** (`dict`, optional): Dictionary with additional parameters to be supplied:
  - When providing an "interface_id", the notification will redirect the user to the specified interface.
  - When providing a "section", the notification will navigate the user to the given section.

### Returns

- **None**

### Examples

```python
>>> pp.send_message("The process has been completed", "Process complete!", "success", 3000)
>>> pp.send_message("The process has been completed", "Process complete!", "success", 3000, extra_params={'interface_id': '444ef11c-fec3-4ec8-9297-2a7034ec48b2'})
>>> pp.send_message("The process has been completed", "Files updated!", "info", 2000, extra_params={'section': 'files'})
```

## send_notification

send_notification(target_usernames, message, notification_type='general', application_id=None, extra_params=None, notify_live_users=False)

### Summary
Creates a new app notification for a given user.

### Args
- **target_usernames**: (Union[str, List[str]]) Usernames that will receive the notification. It can be a string (single user) or a list of strings.
- **message**: (str) String with the desired message. It can contain HTML tags for custom formatting.
- **notification_type**: (Optional[str]) Application section to which the link will redirect the user. Must be one of the following types:
  - 'workflow'
  - 'scheduler'
  - 'interface'
  - 'code'
  - 'file_manager'
  - 'version_manager'
  - 'scenario_manager'
  - 'app_consolidation'
  - 'interface_links'
  - 'external_link_endpoints'
  - 'general' (default): in this case, the notification will not redirect anywhere.
- **application_id**: (Optional[str]) ID of the application. It will use the current application ID if it is not supplied.
- **extra_params**: (Optional[dict]) Dictionary with additional parameters to be supplied:
  - When **notification_type** is 'scheduler', you may provide a 'task_id' parameter if you want the link to redirect the user to the given task logs.
  - When **notification_type** is 'interface', you must provide an 'interface_id' parameter.
- **notify_live_users**: (Optional[bool]) If True, users that have the application open will be notified immediately. Default is False.

### Returns
- **bool**

### Example
```python
message = 'The process ended <span style="color: green">SUCCESSFULLY</span>. Click to see the results...'

pp.send_notification(
    target_usernames=['analyst_user_1', 'analyst_user_2'],
    message=message,
    notification_type='interface',
    extra_params={'interface_id': '444ef11c-fec3-4ec8-9297-2a7034ec48b2'},
    notify_live_users=True
)
```

## progressbar

progressbar(progress, message_text = "", not_level_reverse = "info", close_when_finished = False)

Creates and updates a progress bar. Only used with Pyplan UI.

### Parameters

- **progress** (`int`): A value between 0 and 100 representing the current progress of the task.
- **message_text** (`str`, optional): A message to display along with the progress bar. Defaults to an empty string.
- **not_level_reverse** (`str`, optional): The level of the notification. Can be one of "info", "success", "warning", or "error". Defaults to "info".
- **close_when_finished** (`bool`, optional): Whether to close the progress bar when the task is finished. Defaults to `False`.

### Returns

- **None**

### Example

```python
>>> pp.progressbar(20, "Step 1", "info")
>>> pp.progressbar(100, "Complete!", "success")
```

# DataArray and Dataframe Functions
This collection of functions provides tools for manipulating and managing DataArray and DataFrame objects. They include methods for setting domains, creating new arrays, subscript and index management, data slicing, and filling missing values. Additionally, functions for concatenating rows and converting between various data formats and structures are included. These utilities facilitate effective data handling and transformation within Pyplan.

## set_domain

set_domain(**dataArray**, **domainDic**, **defaultValue**=None)

Reindexes the `dataArray` by applying the indices of the `domainDic` parameter. This function takes an xarray `DataArray` and a dictionary as inputs. The dictionary should have keys as the dimension names and values as indices from Pandas. The function then reindexes the `dataArray` along the dimensions specified in the dictionary using the values provided in the dictionary. The reindexed `dataArray` is then renamed to the names provided in the dictionary. If a `defaultValue` is provided, the function will fill any missing values in the reindexed `DataArray` with the provided value. The function then returns the reindexed and renamed `DataArray` with the new domain set.

### Parameters

- **dataArray** (`xr.DataArray`): The `DataArray` for which the domain is to be set.
- **domainDic** (`Dict[str, pd.Index]`): A dictionary with keys as the dimensions of the `DataArray` and values as Pandas indexes representing the new domain. The Pandas indexes must have a name.
- **defaultValue** (`Optional[Union[float, int]]`, optional): A default value to fill in any missing values in the `DataArray` after reindexing. If not provided, missing values will not be filled.

### Returns

- **xr.DataArray**: The `DataArray` with the new domain set.

### Example

```python
pp.set_domain(da, {"time": time_index, "products": product_index})
```

## create_dataarray

create_dataarray(value, coords, dtype=None)

Creates a `DataArray` using an atomic value distributed along all dimensions.

### Parameters

- **value** (`Union[float, int]`): The value to fill the `DataArray` with.
- **coords** (`List[List[Any]]`): A list of lists representing the coordinates of the `DataArray`. Each list within the outer list should contain the values for a single dimension.
- **dtype** (`Optional[np.dtype]`, optional): The data type of the `DataArray`. If not provided, the data type will be inferred from the value. Default is `None`.

### Returns

- **xr.DataArray**: The created `DataArray`.

### Example

```python
>>> data_array = create_dataarray(5, [[1, 2, 3], [4, 5, 6]], np.int64)
>>> print(data_array)
 <xarray.DataArray (dim_0: 3, dim_1: 3)>
array([[5, 5, 5],
       [5, 5, 5],
       [5, 5, 5]], dtype=int64)
Coordinates:
* dim_0    (dim_0) int64 1 2 3
* dim_1    (dim_1) int64 4 5 6
```

## subscript

subscript(dataArray, indexes, values)

Filters a DataArray using the specified indexes and values.

### Parameters

- **dataArray** (`xr.DataArray`): The DataArray to be filtered.
- **indexes** (`Union[Index, List[Index]]`): The index or list of indexes to filter by. The indexes must be an index node or have a name.
- **values** (`Union[List[str], str]`): The value or list of values to filter by.

### Returns

- **xr.DataArray**: The filtered DataArray.

### Example

```python
>>> data = xr.DataArray(np.random.rand(3,3), coords=[("x",[1,2,3]),("y",[4,5,6])])
>>> data
<xarray.DataArray (x: 3, y: 3)>
array([[0.90468629, 0.83137329, 0.16108201],
    [0.41570222, 0.52236005, 0.83363554],
    [0.70427948, 0.49809961, 0.06619599]])
Coordinates:
* x        (x) int64 1 2 3
* y        (y) int64 4 5 6
>>> indexes = pd.Index(["x"],name='x')
>>> values = [2]
>>> pp.subscript(data, indexes, values)
<xarray.DataArray (y: 3)>
array([0.41570222, 0.52236005, 0.83363554])
Coordinates:
* y        (y) int64 4 5 6
```

## subset

subset(cube)

Returns a Pandas index with the elements of the index for which the condition `cube` is true. The function is used to create a new index that is a subset of an existing index.

### Parameters

- **cube** (`xr.DataArray`): The data array which is used as a condition to select elements of the index. The condition should be in the form of a boolean `DataArray`.

### Returns

- **pd.Index**: The resulting index that is a subset of the existing index based on the given condition.

### Example

```python
>>> cube = xr.DataArray([1, 2, 3, 4, 5]) > 2
>>> pp.subset(cube)
Int64Index([2, 3, 4], dtype='int64')
```

## change_index

change_index(dataArray, oldIndex, newIndex, compareMode=1, defaultValue=None)

Changes the index of a DataArray object.

### Parameters

- **dataArray** (`xr.DataArray`): The DataArray to change the index of.
- **oldIndex** (`pd.Index`): The old index to be replaced.
- **newIndex** (`pd.Index`): The new index to replace the old one.
- **compareMode** (`int`, optional): 1: by Value (default), 2: by pos.
- **defaultValue** (`float`, optional): The default value to fill NaN values with. Defaults to `None`.

### Returns

- **xr.DataArray**: The DataArray with the new index.

### Example

```python
>>> pp.change_index(dataArray, oldIndex, newIndex)
```

## slice_dataarray

slice_dataarray(dataArray, index, position)

Filters a DataArray by integer position along the specified index.

### Parameters

- **dataArray** (`xr.DataArray`): The DataArray to be filtered.
- **index** (`pd.Index`): The index used to filter the DataArray. Must have a name.
- **position** (`int`): Integer position along the specified index.

### Returns

- **xr.DataArray**: The filtered DataArray.

## fill_inf

fill_inf(dataArray, value=0)

### Summary
Fills `np.inf` values in an `xarray.DataArray` with a specified value.

### Args
- **dataArray**: (xr.DataArray) The array which needs to be processed.
- **value**: (Union[int, float], optional) The value which will be used to replace `np.inf`. Defaults to 0.

### Returns
- **xr.DataArray**: The processed array with replaced `inf` values.

### Example
```python
>>> pp.fill_inf(dataArray, 0)
```

## fill_all

fill_all(dataArray, value = 0)

Fills `np.inf` and `np.nan` values in a DataArray with the specified value.

### Parameters

- **dataArray** (`xr.DataArray`): The DataArray to fill.
- **value** (`Union[float, int]`): Value to replace `np.inf` and `np.nan` with. Default is `0`.

### Returns

- **xr.DataArray**: DataArray with `np.inf` and `np.nan` replaced by the specified value.

## concat_rows

concat_rows(array_param, index_param)

Flattens `array_param` by creating a new index that includes all combinations of values from
`index_param`. The new index will have the same name as the original index.

### Parameters

- **array_param** (`xr.DataArray`): The data array to flatten.
- **index_param** (`str`): The name of the index dimension of `array_param` to use to create the new index.

### Returns

- **pd.Index**: The new flattened index.

### Example

```python
>>> import xarray as xr
>>> dataArray = xr.DataArray([[1, 2], [3, 4]], coords=[('x', ['A', 'B']), ('y', [1, 2])])
>>> new_index = pp.concat_rows(dataArray, 'x')
>>> new_index
Index(['A', 'B'], dtype='object')
```

## pandas_from_excel

pandas_from_excel(excel, sheetName=None, namedRange=None, cellRange=None, indexes=None, driver="")

Returns a pandas DataFrame from an Excel spreadsheet (.xlsx).

This function automatically generates pickles from every named range in the Excel file
when the `excel` parameter is a string.

If `excel` is a string, the function tries to read from automatically generated pickles for each named range if they are newer than the Excel file (based on modification date).
If the pickles do not exist or are outdated, the function attempts to generate one pickle for every named range.

**Requirements** (for pickle generation):
- The file must have writing permissions.
- The file must contain named ranges.

If the above conditions are not met, the function loads the spreadsheet using the `openpyxl` library and reads from the specified sheet, named range, or cell range.

### Parameters

- **excel** (`Union[str, Workbook]`): Path to the Excel file or an `openpyxl.Workbook` object.
- **sheetName** (`Optional[str]`, default: `None`): Name of the sheet to read from.
- **namedRange** (`Optional[str]`, default: `None`): Named range to read from the Excel file.
- **cellRange** (`Optional[str]`, default: `None`): Specific cell range (e.g., `"A1:D10"`) to read within the sheet.
- **indexes** (`Optional[List[str]]`, default: `None`): List of column names to set as index in the resulting DataFrame.
- **driver** (`str`, default: `""`): Reserved for future use. Not currently used.

### Returns

- **pd.DataFrame**: A pandas DataFrame containing the requested data from the Excel spreadsheet.

### Example

```python
>>> df = pp.pandas_from_excel("report.xlsx", sheetName="Sheet1")
>>> df = pp.pandas_from_excel("report.xlsx", namedRange="SummaryData")
>>> df = pp.pandas_from_excel("report.xlsx", sheetName="Sheet1", cellRange="B2:F20")
```

## pandas_from_xlsb_file

pandas_from_xlsb_file(filepath)

Returns a pandas DataFrame from an xlsb file.

### Parameters

- **filepath** (`str`): The path of the xlsb file to be opened.

### Returns

- **Optional[pd.DataFrame]**: A pandas DataFrame containing the contents of the xlsb file. Returns `None` if the file cannot be read.

### Example

```python
>>> _df = pp.pandas_from_xlsb_file('path/to/xlsb/file')
```

## pandas_from_dataarray

pandas_from_dataarray(dataarray)

Create a pandas DataFrame from an xarray DataArray with n dimensions.

### Parameters

- **dataarray** (`xr.DataArray`): The DataArray to convert to a DataFrame.

### Returns

- **pd.DataFrame**: The resulting DataFrame.

### Example

```python
>>> import xarray as xr
>>> data = xr.DataArray([1, 2, 3], dims=["x"], coords={"x": [1, 2, 3]})
>>> pp.pandas_from_dataarray(data)
   x  value
0  1      1
1  2      2
2  3      3
```

## pandas_from_access

pandas_from_access()

Class to manage access databases.

## index_from_pandas

index_from_pandas(dataframe, columnName, removeEmpty)

Returns a Pandas Index from a column of a Pandas DataFrame.

### Parameters

- **dataframe** (`pd.DataFrame`): Pandas DataFrame.
- **columnName** (`Optional[str]`, optional): DataFrame column name used to create the `pd.Index`. By default, it is created using the first column.
- **removeEmpty** (`bool`, optional): True to remove empty rows.

### Returns

- **pd.Index**: A pandas index created from the DataFrame.

### Example

```python
>>> import pandas as pd
>>> df = pd.DataFrame({'A':[1,2,3], 'B':[4,5,6]})
>>> pp.index_from_pandas(df)
Int64Index([1, 2, 3], dtype='int64')
>>> pp.index_from_pandas(df, "B")
Int64Index([4, 5, 6], dtype='int64')
```

## index_from_excel

index_from_excel(excel, sheetName, namedRange, cellRange, columnName, removeEmpty)

Returns a `pandas.Index` from an Excel file.

### Parameters

- **excel** (`Union[str, Workbook]`): Excel object.
- **sheetName** (`Optional[str]`, optional): Sheet name to be read.
- **namedRange** (`Optional[str]`, optional): Name of the range to be read.
- **cellRange** (`Optional[str]`, optional): Used with `sheetName`, for reading from a simple range.
- **columnName** (`Optional[str]`, optional): DataFrame column name used to create the index. By default, it is created using the first column.
- **removeEmpty** (`bool`, optional): True to remove empty rows.

### Returns

- **pandas.Index**: The index created from the Excel file.

### Example

```python
>>> pp.index_from_excel(excelNode, "Sheet 1")
>>> pp.index_from_excel(excelNode, namedRange="name_range")
>>> pp.index_from_excel(excelNode, "Sheet 1", cellRange="A1:H10", columnName="column10")
```

## dataarray_from_pandas

dataarray_from_pandas(dataframe, domainDic, valueColumns, defaultValue, valueColumnsAsDim, sumDuplicateRecords)

Converts a Pandas DataFrame into an `xr.DataArray` or `xr.Dataset` by applying the `set_domain` function.

### Parameters

- **dataframe** (`pd.DataFrame`): Pandas DataFrame with no index columns.
- **domainDic** (`Dict[str, pd.Index]`): A dictionary where keys are the dimensions of the resulting DataArray and values are Pandas indices representing the new domain. Example: `{'Column Name': index_name}`.
- **valueColumns** (`Union[str, List[str], pd.Index]`): DataFrame's value columns.
- **defaultValue** (`Optional[Any]`): Default value when applying the `set_domain` function.
- **valueColumnsAsDim** (`bool`): If True, `valueColumns` becomes a dimension of the resulting DataArray. If False, each value column becomes a variable of the resulting Dataset.
- **sumDuplicateRecords** (`bool`): If True, sums identical rows. Otherwise, removes duplicates (except the first one).

### Returns

- **Union[xr.DataArray, xr.Dataset]**: A DataArray or Dataset depending on the input of `valueColumns` and `valueColumnsAsDim`.

### Example

```python
>>> pp.dataarray_from_pandas(sales_dataframe, {'Sales Channel': sales_channels, 'Month': time}, 'Sales', 0.0)
```

## dataarray_from_excel

dataarray_from_excel(excel, sheetName, namedRange, cellRange, indexes, valueColumns, indexColumnHeaders, replaceByIndex, defaultValue)

Creates an `xr.DataArray` from an Excel file by reading the specified sheet, named range, or cell range.

### Parameters

- **excel** (`Union[str, Workbook]`): `excel_connection` object.
- **sheetName** (`Optional[str]`, optional): Sheet name to be read.
- **namedRange** (`Optional[str]`, optional): Name of the range to be read.
- **cellRange** (`Optional[str]`, optional): Used with `sheetName` to read from a simple range.
- **indexes** (`Optional[List[pd.Index]]`, optional): List of `pd.Index` objects to perform a `change_index` operation.
- **valueColumns** (`Optional[Union[str, pd.Index]]`, optional): String with the column name of the DataFrame that contains the values. `pd.Index` with column names to convert columns to an index.
- **indexColumnHeaders** (`Optional[List[str]]`, optional): Column names in Pandas to parse with indexes. Used if the header on the DataFrame is not equal to index identifiers.
- **replaceByIndex** (`Optional[pd.Index]`, optional): Replace the index used in `valueColumns` with this index (using `change_index`).
- **defaultValue** (`float`, optional): Default value for the created DataArray. Defaults to 0.

### Returns

- **xr.DataArray**: DataArray created from the Excel file.

### Examples

```python
>>> pp.dataarray_from_excel(excelNode, "Sheet 1", indexes=[indicadores], valueColumns="descuentos")
>>> pp.dataarray_from_excel(excelNode, namedRange="nombre_rango", indexes=[indicadores], valueColumns=time)
```

## to_dataarray

to_dataarray(index)

Converts an index into a DataArray indexed by the input index and with its values.

### Parameters

- **index** (`pd.Index`): Index to be used as the DataArray's index.

### Returns

- **xr.DataArray**: DataArray indexed by the input index with its values.

### Example

```python
>>> pp.to_dataarray(time_index)
```

## aggregate

aggregate(dataArray, mapInfo, sourceIndex, targetIndex, aggregationFunction='sum', numericOnly=None)

Converts `dataArray`, originally indexed by `sourceIndex`, to a `dataArray` indexed by `targetIndex`, aggregating according to the `mapInfo`'s allocation of `targetIndex: sourceIndex`.

### Parameters

- **dataArray** (`xr.DataArray`): The DataArray to be aggregated.
- **mapInfo** (`Union[xr.DataArray, List[xr.DataArray]]`): DataArray or list of DataArrays that gives the value of `targetIndex` for each element of `sourceIndex`. If the map does not match, then the element will not be set into the target index, and information will be lost.
- **sourceIndex** (`pd.Index`): The original index of `dataArray`.
- **targetIndex** (`Union[pd.Index, List[pd.Index]]`): Index or list of pd.Index objects that will be used as the new index of `dataArray`.
- **aggregationFunction** (`str`, optional): Specifies the function to be used when grouping data (`sum`, `mean`, `min`, `max`, `median`). Default is `'sum'`.
- **numericOnly** (`Optional[bool]`, optional): `numeric_only` parameter for the aggregation function.

### Returns

- **xr.DataArray**: A new DataArray indexed by `targetIndex`, aggregated according to the `mapInfo`.

### Example

```python
# Example: Aggregating time information into an annual index
pp.aggregate(dataArray, timeToYearsMap, time, years)
```

## dynamic

dynamic(dataArray, index, shift, initialValues=None, sliceInputs=True)

Performs cyclic calculations between nodes.

### Parameters

- **dataArray** (`xr.DataArray`): The DataArray to perform the cyclic dependency calculation on.
- **index** (`pd.Index`): Index from `dataArray` to shift. Must have a name.
- **shift** (`int`): Number of elements to shift. Can be positive or negative.
- **initialValues** (`Union[xr.DataArray, float, int]`, optional): Initial values to apply to the first "shift" elements. Defaults to `None`.
- **sliceInputs** (`bool`, optional): Boolean to apply subscript to every input in the dynamic loop. If one of the nodes in the dynamic loop is set to `True`, it applies it to every other node in the loop. Defaults to `True`.

### Returns

- **xr.DataArray**: DataArray shifted by the specified amount.

## lookup

lookup(dataArray, dataMap, sharedIndex, defaultValue=0)

Returns the value of `dataArray` indexed by the index of `dataMap`.

### Parameters

- **dataArray** (`xr.DataArray`): DataArray indexed by `sharedIndex` whose values correspond to elements of `sharedIndex`.
- **dataMap** (`xr.DataArray`): DataArray containing the index to lookup in `dataArray`.
- **sharedIndex** (`pd.Index`): The shared index between `dataArray` and `dataMap`.
- **defaultValue** (`Union[int, float]`, optional): The value to fill when the index lookup fails. Defaults to `0`.

### Returns

- **xr.DataArray**: DataArray with the values of `dataArray` indexed by `dataMap`.

### Example

```python
# Example: Let's say you have a dataArray with an estimated inflation rate by Country ("inflation_rate"
# is the name of the dataArray; "country" is the name of the index) and you want to assign it to the
# corresponding Company depending on its location. On the other hand, there's a many-to-one map where
# each Company is allocated to a single Country ("country_to_company_allocation"). The sharedIndex,
# in this case, is Country ("country").

pp.lookup(inflation_rate, country_to_company_allocation, country)
# This will return the estimated inflation rate by Company.
```

## where

where(obj, condition, condition_values, x, y, **kwargs)

### Summary
Returns elements chosen from `x` or `y` depending on the condition. This function is a wrapper for xarray's `where` function that provides extended condition options and passes additional positional and keyword arguments.

### Args
- **obj**: (Union[xr.DataArray, pd.Index]) The input object, which can be either a Pandas Index or an xarray DataArray.
- **condition**: (str) The condition to apply, e.g., `=`, `!=`, `>`, `>=`, `<`, `<=`.
- **condition_values**: (Union[str, List[str]]) The values to compare with the object based on the condition. Can be a single string or a list of strings for conditions like '!='.
- **x**: (Union[xr.DataArray, int, float]) The values to use where the condition is True.
- **y**: (Union[xr.DataArray, int, float]) The values to use where the condition is False.
- **kwargs**: Additional keyword arguments to pass to xarray's `where` function.

### Returns
- **xr.DataArray**: A new DataArray with values selected based on the condition and additional options.

### Examples
```python
# Example with Pandas Index
countries = pd.Index(["Latvia", "Argentina", "Chile"])
result1 = pp.where(countries, '!=', ['Latvia', 'Argentina'], 1, 0, some_arg)
result2 = pp.where(countries, '!=', 'Latvia', 1, 0, another_arg, yet_another_arg)

# Example with xarray DataArray
time = xr.DataArray(['2023', '2024', '2025'])
result3 = pp.where(time, '>', '2024', '2023', '2022', some_kwarg=some_value)
result4 = pp.where(time, '=', '2024', '2023', '2022')
```

## maximum

maximum(x, y, **kwargs)

### Summary
Calculates the maximum between two xarray DataArrays, pandas DataFrames, or pandas Index objects.

### Args
- **x**: (Union[xr.DataArray, pd.DataFrame, pd.Index]) The first input data structure.
- **y**: (Union[xr.DataArray, pd.DataFrame, pd.Index]) The second input data structure.
- **kwargs**: Additional keyword arguments to pass to `np.maximum`.

### Returns
- **Union[xr.DataArray, pd.DataFrame, pd.Index]**: A data structure of the same type as `x` and `y` containing the maximum values.

### Example
```python
data_array_1 = xr.DataArray([1, 2, 3, 4], dims=['x'])
data_array_2 = xr.DataArray([3, 4, 2, 5], dims=['x'])
max_value = pp.maximum(data_array_1, data_array_2)
print(max_value)
# Output: [3 4 3 5]
```

## minimum

minimum(x, y, **kwargs)

### Summary
Calculates the minimum between two xarray DataArrays, pandas DataFrames, or pandas Index objects.

### Args
- **x**: (Union[xr.DataArray, pd.DataFrame, pd.Index]) The first input data structure.
- **y**: (Union[xr.DataArray, pd.DataFrame, pd.Index]) The second input data structure.
- **kwargs**: Additional keyword arguments to pass to `np.minimum`.

### Returns
- **Union[xr.DataArray, pd.DataFrame, pd.Index]**: A data structure of the same type as `x` and `y` containing the minimum values.

### Example
```python
data_array_1 = xr.DataArray([1, 2, 3, 4], dims=['x'])
data_array_2 = xr.DataArray([3, 4, 2, 5], dims=['x'])
min_value = pp.minimum(data_array_1, data_array_2)
print(min_value)
# Output: [1 2 2 4]
```

## copy_index

copy_index(dataArray, sortValues = True)

Generates a `pd.Index` with the unique values of the `dataArray`.

### Parameters

- **dataArray** (`xr.DataArray`): The DataArray from which the index will be copied.
- **sortValues** (`bool`, optional): Whether to sort the unique values in ascending order. Defaults to `True`.

### Returns

- **pd.Index**: The unique values of the `dataArray`.

### Example

```python
>>> data_array = xr.DataArray([1, 2, 2, 3, 4], dims=['x'])
>>> pp.copy_index(data_array, sortValues=True)
Index([1, 2, 3, 4], dtype='int64')
```

## sequence_index

sequence_index(_start, _end, _step = 1)

Returns a `pd.Index` with the sequence between `_start` and `_end` parameters. Both limits are inclusive. Values are
converted to string.

### Parameters

- **_start** (`int`): The start of the sequence.
- **_end** (`int`): The end of the sequence.
- **_step** (`int`, optional): The step between each element of the sequence. Defaults to `1`.

### Returns

- **pd.Index**: A pandas index with the sequence of numbers between `_start` and `_end`.

### Raises
- **ValueError**: Only numbers are allowed as _start, _end, and _step parameters.

### Examples

```python
>>> pp.sequence_index(0, 10)
Index(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], dtype='object')
```

## subindex

subindex(dataArray, targetValue, targetIndex, method = 'Last')

Returns a `dataArray` containing the value of `targetIndex` for which `dataArray` (indexed by `targetIndex`) is equal
to `targetValue`.

### Parameters

- **dataArray** (`xr.DataArray`): Xarray `DataArray`.
- **targetValue** (`Union[int, float, str]`): Target value to search in `dataArray`.
- **targetIndex** (`pd.Index`): Pandas `Index`.
- **method** (`str`, optional): Method to select the index. `"Last"` returns the last occurrence of `targetIndex` for
  which `dataArray` is equal to `targetValue`. `"First"` returns the first occurrence. Defaults to `"Last"`.

### Returns

- **xr.DataArray**: `DataArray` containing the value of `targetIndex` for which `dataArray` is equal to `targetValue`.

### Example

```python
>>> import xarray as xr
>>> import pandas as pd
>>> dataArray = xr.DataArray([[1, 2, 3], [4, 5, 6], [7, 8, 9]], coords=[['A', 'B', 'C'], [1, 2, 3]], dims=['x', 'y'])
>>> targetIndex = pd.Index([1, 2, 3])
>>> pp.subindex(dataArray, 8, targetIndex)
<DataArray (y: 1)>
array([2])
Coordinates:
  * y        (y) int64 2
```

## create_report

create_report(reportItems, reportIndexName = "Report index", reportIndex = None)

Concatenates the `reportItems` data arrays along the `reportIndex` dimension.

### Parameters

- **reportItems** (`Union[Dict[str, xr.DataArray], List[xr.DataArray]]`): A dictionary or list of data arrays to concatenate. All data arrays must have the same structure.
- **reportIndexName** (`Optional[str]`): The name of the new `ReportIndex` dimension that will be created. Defaults to "Report index".
- **reportIndex** (`Optional[pd.Index]`): The index to overwrite the `reportIndex` dimension. Defaults to `None`.

### Returns

- **xr.DataArray**: The concatenated data array with the new `reportIndex` dimension.

### Example

```python
>>> reportItems = {"Demand": demand, "Product Stock": stock}
>>> pp.create_report(reportItems, reportIndexName="New Report")
```

## concat_dataarrays

concat_dataarrays(valuesList, dim)

Concatenates Xarray DataArrays along one or two new dimensions, broadcasting by all possible dimensions.

### Args

- **valuesList (Union[List[Union[xr.DataArray, int, str, float]], List[List[Union[xr.DataArray, int, str, float]]]])**: List or list of lists of DataArrays, integers, strings, or floats. At least one element must be a DataArray object.
- **dim (Union[pd.Index, List[pd.Index]])**: Pandas Index or list of Pandas Indexes with the same shape as `valuesList`.

### Returns

- **xr.DataArray**: A concatenated DataArray.

### Example

```python
>>> pp.concat_dataarrays(valuesList=[node1, node2, node3], dim=three_items_index)
<xarray.DataArray (dim: 3, ...)>
array([...])
Coordinates:
  * dim      (dim) object ...

>>> pp.concat_dataarrays(valuesList=['String Example', node2, 0], dim=three_items_index)
<xarray.DataArray (dim: 3, ...)>
array([...])
Coordinates:
  * dim      (dim) object ...

>>> pp.concat_dataarrays(valuesList=[[node1, node2, node3], [node4, node5, node6]], dim=[two_items_index, three_items_index])
<xarray.DataArray (dim1: 2, dim2: 3, ...)>
array([...])
Coordinates:
  * dim1     (dim1) object ...
  * dim2     (dim2) object ...
```

# Data Manipulation Functions
This section includes specialized functions designed for operations on DataFrames, DataArrays, and indexes, along with a selection of mathematical operations. These functions are optimized for handling and manipulating data structures efficiently, providing essential tools for data analysis and transformation.

## find

find(param1, param2, compareType=1, caseSensitive=True)

Finds the occurrences of `param1` in `param2` using the specified comparison type.

### Parameters

- **param1** (`Union[str, int, pd.Index]`): The value or index to compare.
- **param2** (`Union[str, int, pd.Index]`): The value or index to compare against.
- **compareType** (`int`, optional): The type of comparison to use. The options are:
  - 1: Exact match (default)
  - 2: Starts with
  - 3: Ends with
  - 4: Contains
- **caseSensitive** (`bool`, optional): Whether the comparison should be case-sensitive. Default is `True`.

### Returns

- **xr.DataArray**: The resulting `DataArray` with the comparison results.

### Example

```python
# If param1 is a scalar (numeric or str) and param2 is an index:
# return a DataArray indexed by param2 with True on occurrences of param2.
>>> pp.find("te", region, cp.end_with)

# If param1 is an index and param2 is an index too:
# return a DataArray indexed by param1 and param2 with True on occurrences of param1 on param2.
>>> pp.find(subregion, region, cp.contain)
```

## apply_fn

apply_fn(obj, applyFn, *args)

Applies a function to a `DataArray` or `Index`.

### Parameters

- **obj** (`Union[xr.DataArray, pd.Index]`): The `DataArray` or `Index` to which the function should be applied.
- **applyFn** (`Callable`): The function to be applied.
- **args**: Additional arguments to be passed to the function.

### Returns

- **xr.DataArray** or **pd.Index**: The resulting `DataArray` or `Index` after the function has been applied.
- **None**: If the `obj` is not of type `xr.DataArray` or `pd.Index`.

### Example

```python
>>> data_array = xr.DataArray(np.random.rand(3, 3), dims=('x', 'y'))
>>> new_array = apply_fn(data_array, np.square)
>>> print(new_array)
<xarray.DataArray (x: 3, y: 3)>
array([[0.19290767, 0.10126844, 0.09544723],
       [0.17547571, 0.01341797, 0.1707827 ],
       [0.15894374, 0.07128388, 0.16331167]])
Coordinates:
  * x        (x) int64 0 1 2
  * y        (y) int64 0 1 2
```

## split_text

split_text(param1, separator, part=None)

Returns a `DataArray` object with text values formed by splitting the elements of `param1` text values at each occurrence of the separator `separator`. The `DataArray` will have the original dimension plus a new dimension 'Parts' of length (number of separators + 1). All text values must have the same number of separators `separator`.

### Parameters

- **param1** (`xr.DataArray`): The `DataArray` containing the text values to be split.
- **separator** (`str`): The separator used to split the text values.
- **part** (`int`, optional): The part of the split text to return. If not provided, all parts will be returned.

### Returns

- **xr.DataArray**: The resulting `DataArray` with the split text values, with a new dimension 'Parts' of length (number of separators + 1).

### Example

```python
>>> data_array = xr.DataArray(["hello,world", "hi,world", "hey,world"], dims=('x'))
>>> new_array = split_text(data_array, ",")
>>> print(new_array)
<xarray.DataArray (x: 3, Parts: 2)>
array([['hello', 'world'],
       ['hi', 'world'],
       ['hey', 'world']], dtype=object)
Coordinates:
  * x        (x) int64 0 1 2
  * Parts    (Parts) object 'Part 1' 'Part 2'
```

## get_pos

get_pos(index)

Returns a `DataArray` with the positions of an index as values and indexed by the given index.

### Parameters

- **index** (`pd.Index`): The index for which the positions are to be returned.

### Returns

- **xr.DataArray**: The resulting `DataArray` with the positions of the index as values and indexed by the given index.

### Example

```python
>>> index = pd.Index(['a', 'b', 'c'])
>>> pos_array = get_pos(index)
>>> print(pos_array)
<xarray.DataArray (index: 3)>
array([0, 1, 2])
Coordinates:
  * index    (index) object 'a' 'b' 'c'
```

## concat_index

concat_index(*args)

Concatenates two or more indexes and/or atomic values and returns a single new index.

### Parameters

- **\*args** (`pd.Index` or atomic value): Two or more indexes and/or atomic values to be concatenated.

### Returns

- **pd.Index**: The resulting index that is a concatenation of the given indexes and/or atomic values.

### Example

```python
>>> index1 = pd.Index(['a', 'b', 'c'])
>>> index2 = pd.Index(['d', 'e', 'f'])
>>> pp.concat_index(index1, index2, 'g', 'h')
Index(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'], dtype='object')
```

## linear_depreciation

linear_depreciation(investments, usefulLife, timeIndex, includeInCurrentMonth=False, timeIndexFormat='%Y.%m')

Returns the straight-line depreciation of the given investments `DataArray` over its useful life.

### Parameters

- **investments** (`xr.DataArray`): A `DataArray` containing the investments.
- **usefulLife** (`xr.DataArray` or `int`): A `DataArray` or integer with the number of years of life expectancy.
- **timeIndex** (`pd.Index`): The time dimension of the `DataArray`. Must be a Pandas `Index` from an Index node.
- **includeInCurrentMonth** (`bool`, optional): Whether to start depreciating in the current month (`t`) or the next month (`t+1`). Default is `False`.
- **timeIndexFormat** (`str`, optional): Format of the time index. e.g., for '2016.01' use '%Y.%m'. Default is `'%Y.%m'`.

### Returns

- **xr.DataArray**: The resulting `DataArray` with the straight-line depreciation of the investments over its useful life.

### Example

```python
  >>> product = pd.Index(['prod1','prod2'])
>>> time_list = pp.Index(pp.create_time('2021.01', '2021.06', freq='M', format='%Y.%m').values)
>>> data = xr.DataArray(np.random.rand(2, 2, len(time_list)),
       dims=('fabrica', 'product', 'time_list'),
       coords={'fabrica': ['fab1', 'fab2'], 'product': ['prod1', 'prod2'], 'time_list': time_list})
>>> vida_util = xr.DataArray([4, 10],
       dims=('product'),
       coords={'product': product})
>>> pp.linear_depreciation(investments=data, usefulLife=vida_util, timeIndex=time_list, includeInCurrentMonth=False)
<xarray.DataArray (fabrica: 2, product: 2, time_list: 6)>
array([[[0.        , 0.00729475, 0.00947053, 0.01165097, 0.03016374,
        0.0456418 ],
        [0.        , 0.00751886, 0.01090068, 0.01772   , 0.01858931,
        0.01974675]],

    [[0.        , 0.01736181, 0.02019148, 0.02518252, 0.0285973 ,
        0.04491098],
        [0.        , 0.00784025, 0.01253238, 0.02069702, 0.02174192,
        0.02660816]]])
Coordinates:
* fabrica    (fabrica) <U4 'fab1' 'fab2'
* product    (product) <U5 'prod1' 'prod2'
* time_list  (time_list) object '2021.01' '2021.02' ... '2021.05' '2021.06'
```

## irr

irr(flow, time_index)

Returns the Internal Rate of Return (IRR) of a series of periodic payments (negative values) and inflows (positive values). The IRR is the discount rate at which the Net Present Value (NPV) of the flows equals zero. The variable `flow` must be indexed by `time_index`.

If the cash flow never changes sign, `pp.irr()` has no solution and returns `NAN` (Not A Number).

### Parameters

- **flow** (`xr.DataArray`): A `DataArray` containing the cash flows.
- **time_index** (`pd.Index`): The index that corresponds to the time dimension of the cash flows. The `time_index` must be defined in another node.

### Returns

- **Union[float, xr.DataArray]**: A `DataArray` with the IRR value.

### Example

```python
>>> # The Index time must be defined in another node.
>>> time = pd.date_range(start='1/1/2020', end='12/31/2020', freq='M')
>>> flow = xr.DataArray([-1000, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200], [('time', time)])
>>> pp.irr(flow, time)
0.4089653663721178
```

## copy_as_values

copy_as_values(source, targetId)

Copy values of an object `source` into a new object with id `targetId`. This function alters the definition of the object with the `targetId` identifier.

### Parameters

- **source** (`xr.DataArray`, `pd.DataFrame`, `pd.Series`, `pd.Index`, `float`, `int`, `str`): DataArray/DataFrame/Index to copy values from. Can also be a string with the id of a node.
- **targetId** (`str`): Identifier of the target node.

### Returns

- **bool**: `True` if successful.

### Example

```python
>>> source = xr.DataArray([1, 2, 3], dims=['x'])
>>> targetId = 'node1'
>>> pp.copy_as_values(source, targetId)
True
```

## excel_connection

excel_connection(filepath, useOpenpyxl=False, dataOnly=True, readOnly=True)

Creates an Excel object from the given `filepath`.

### Parameters

- **filepath** (`str`): Path to the Excel file.
- **useOpenpyxl** (`bool`, optional): Whether to use openpyxl to open the file. Defaults to `False`.
- **dataOnly** (`bool`, optional): Whether to only get values, not the formulas. Defaults to `True`.
- **readOnly** (`bool`, optional): Whether to open the Excel file in read-only mode. Defaults to `True`.

### Returns

- **Union[Workbook, str]**: The resulting Excel object.

### Example

```python
>>> excel_obj = pp.excel_connection("/path/to/the/excelfile.xlsx")
```

## kind_to_string

kind_to_string(kind)

Convert a Numpy dtype "kind" to a human-readable string representation.

### Parameters

- **kind** (`str`): A single character code indicating the general kind of data.

### Returns

- **str**: The data type in human-readable string format.

### Example

```python
>>> pp.kind_to_string('U')
'string'
```

## goal_seek

goal_seek(nodeIdX, nodeIdObjective, goal=0, startValue=1, matrixIndex=None, maxIter=50, tol=1.48e-08, fullOutput=False)

Finds the value of `nodeIdX` that makes `nodeIdObjective` equal to `goal`. This function implements `scipy.optimize.newton` function. Returns a dictionary if `matrixIndex` is not `None`; otherwise, returns the root of the problem.

### Parameters

- **nodeIdX** (`str`): Identifier of node X.
- **nodeIdObjective** (`str`): Identifier of node Objective.
- **goal** (`Union[int, float]`): Goal value to be reached. Defaults to 0.
- **startValue** (`Union[int, float]`): An initial estimate of the zero that should be somewhere near the actual zero. Defaults to 1.
- **matrixIndex** (`Union[pd.Index, List[pd.Index]]`, optional): For multidimensional goal seek. Defaults to `None`.
- **maxIter** (`int`): Maximum number of iterations. Defaults to 50.
- **tol** (`float`): The allowable error of the zero value. Defaults to `1.48e-08`.
- **fullOutput** (`bool`): If `False` (default), the root is returned. If `True` and `startValue` is scalar, the return value is `(x, r)`, where `x` is the root and `r` is a `RootResults` object. If `True` and `startValue` is non-scalar, the return value is `(x, converged, zero_der)`. Defaults to `False`.

### Returns

- **res** (`Union[float, dict]`): If `matrixIndex` is `None`, returns the root of the problem. Otherwise, returns a dictionary containing the results of each combination of `matrixIndex` values.

### Example

```python
# To find the value of node1 that makes node2 equal to 2, we can use the goal_seek function as follows:
>>> node1 = 0
>>> node2 = node1 ** 2
>>> goal = 2
>>> pp.goal_seek('node18', 'node21', goal)
1.414213562373095
```

## create_time

create_time(date_start, date_end, freq='M', format='%Y.%m')

Creates a time index using start and end dates and a specified frequency. The resulting index is formatted with the provided format.

### Parameters

- **date_start** (`str`): The starting date of the index.
- **date_end** (`str`): The end date of the index.
- **freq** (`str`, optional): The frequency of the index. Defaults to 'M' (monthly).
- **format** (`str`, optional): The format to use for the resulting index. Defaults to '%Y.%m'.

### Returns

- **pd.Index**: The time index.

### Example

```python
pp.create_time('2021.01', '2021.06')
# Output: Index(['2021.01', '2021.02', '2021.03', '2021.04', '2021.05', '2021.06'], dtype='object')

pp.create_time('2021.01.01', '2021.01.10', freq='D', format='%d/%m/%Y')
# Output: Index(['01/01/2021', '02/01/2021', '03/01/2021', '04/01/2021', '05/01/2021',
#                 '06/01/2021', '07/01/2021', '08/01/2021', '09/01/2021', '10/01/2021'], dtype='object')
```

## add_periods

add_periods(start, periods, freq = 'M', format = '%Y.%m')

Add a given number of periods to a starting date. Allows setting the frequency and output format of the resulting date.

### Parameters

- **start** (`str`): Starting date in the format of 'yyyy.mm' or 'yyyy-mm'.
- **periods** (`int`): Number of periods to add. Can be positive or negative.
- **freq** (`str`, optional): Frequency of the periods. Defaults to 'M' for months.
- **format** (`str`, optional): Output format for the resulting date. Defaults to '%Y.%m'.

### Returns

- **str**: The resulting date in the specified format.

### Examples

```python
>>> pp.add_periods('2016.01', 6)
'2016.07'

>>> pp.add_periods('2016.01', -6)
'2015.07'

>>> pp.add_periods('2016.01', 6, freq='D', format='%d/%m/%Y')
'07/01/2016'
```

## npv

npv(rate, flow, time_index, offset = 1)

Returns the Net Present Value (NPV) of a cash flow with equally spaced periods. The `flow` parameter must contain a series of periodic payments (negative values) and inflows (positive values), indexed by `time_index`. The optional `offset` parameter specifies the offset of the first value relative to the current time period. By default, `offset` is set to 1, indicating that the first value is discounted as if it is one step in the future.

### Parameters

- **rate** (`float`): The rate used to discount the cash flows.
- **flow** (`xr.DataArray`): The cash flows.
- **time_index** (`pd.Index`): The time index used to calculate the NPV. Must have a name.
- **offset** (`int`, optional): The offset of the first value relative to the current time period. Defaults to 1.

### Returns

- **xr.DataArray**: The calculated NPV.

### Example

```python
>>> rate = 0.03
>>> cash_flows = xr.DataArray([-1000, 200, 300, 400], coords=[('time', ['2020','2021','2022','2023'])], dims=['time'])
>>> time_index = pd.Index(['2020', '2021', '2022', '2023'], name='time')  # Example time index
>>> pp.npv(rate, cash_flows, time_index)
<xarray.DataArray ()>
array(-156.98980623705643)
```

## xnpv

xnpv(rate, flow, time_index, initial_dates, calendar)

Compute the net present value (NPV) of a non-periodic cash flow with a constant discount rate.

### Parameters

- **rate** (`Union[float, int, xr.DataArray]`): The annual discount rate for a 365-day year.
- **flow** (`xr.DataArray`): Cash flow with `time_index` as the dimension.
- **time_index** (`pd.Index`): The time index of the cash flow.
- **initial_dates** (`Union[str, xr.DataArray]`): The initial date of the cash flow.
- **calendar** (`xr.DataArray`): Number of days for each period of `time_index`.

### Returns

- **Union[float, int]**: The net present value of the cash flow.

### Example

```python
>>> rate = 0.05
>>> cash_flows = xr.DataArray([-1000, 200, 300, 400], coords=[('time', ['2020-01-01', '2020-06-01', '2021-01-01', '2021-06-01'])], dims=['time'])
>>> time_index = pd.Index(['2020-01-01', '2020-06-01', '2021-01-01', '2021-06-01'], name='time')
>>> initial_dates = '2020-01-01'
>>> calendar = xr.DataArray([182, 183, 182, 182], coords=[('time', time_index)], dims=['time'])
>>> pp.xnpv(rate, cash_flows, time_index, initial_dates, calendar)
-132.99
```

## get_nested_lists_shape

get_nested_lists_shape(lst, shape=())

Returns a tuple with the shape of nested lists similarly to numpy's shape.

### Args

- **lst (list)**: The nested list.
- **shape (tuple, optional)**: The shape up to the current recursion depth. Defaults to an empty tuple.

### Returns

- **tuple**: The shape of the nested list.

### Example

```python
>>> nested_list = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
>>> pp.get_nested_lists_shape(nested_list)
(3, 3)
```

## report

report(items_allocation, settings)

Creates a UI Pyplan Report with the given parameters.

### Args

- **items_allocation (List[ReportItem])**: A list of ReportItem objects where each item assigns a node result or scalar to a given concept. The list should contain concepts as keys and ReportItem as values.
- **settings (ReportSettings)**: An instance of the ReportSettings class that defines various settings for the report.

### Returns

- **Report**: An instance of the Report class.

### Example

```python
>>> pp.report(
        items_allocation=[
            ReportItem(name='Sales', item_source=ReportItemSource.app_node_id, value=fin_sales.node.identifier),
            ReportItem(name='Gross Margin', item_source=ReportItemSource.app_node_id, value=fin_gross_margin.node.identifier),
            ReportItem(name='Depreciation', item_source=ReportItemSource.input, value=-100.)
        ],
        settings=ReportSettings(
            output_type=ReportOutputType.dataarray,
            items_node_id=report_concepts.node.identifier,
            default_value=0
        )
    )
>>> pp.report(
        items_allocation=[
            ReportItem(name='Sales', item_source=ReportItemSource.app_node_id, value=fin_sales.node.identifier),
            ReportItem(name='Costs', item_source=ReportItemSource.app_node_id, value=fin_costs.node.identifier, as_negative=True),
            ReportItem(name='Gross Margin', item_source=ReportItemSource.app_node_id, value=fin_gross_margin.node.identifier),
            ReportItem(name='Depreciation', item_source=ReportItemSource.input, value=-100.)
        ],
        settings=ReportSettings(
            output_type=ReportOutputType.dataframe,
            dimension_name='report_concepts',
            default_value=0
        )
    )
```

## get_specific_range

get_specific_range(specific_range, file_path)

Get the specific range from an Excel file with defined name ranges.

### Args

- **specific_range (str)**: The name of the range to get.
- **file_path (str)**: The path of the Excel file.

### Returns

- **Dict**: Dictionary with `usecols`, `skiprows`, and `nrows` keys.
  - `usecols` is a string with the range of columns to use.
  - `skiprows` is an int with the number of rows to skip before reading.
  - `nrows` is an int with the number of rows to read.

### Example

```python
>>> pp.get_specific_range(specific_range='MyRange', file_path='my_file.xlsx')
{'usecols': 'A:C', 'skiprows': 1, 'nrows': 10}
```

## get_new_range

get_new_range(range_value)

Set `range_to_read_excel` with `range_value` given.

### Parameters

- **range_value** (`str`): The range value of the cells to be read.

### Returns

- **dict**: A dictionary with the keys `usecols`, `skiprows`, and `nrows` containing the information for the range of cells to be read.

### Example

```python
>>> range_value = 'A2:C11'
>>> pp.get_new_range(range_value)
{'usecols': 'A:C', 'skiprows': 1, 'nrows': 10}
```

## remove_duplicates_words

remove_duplicates_words(text_to_clean)

### Summary
Removes duplicate words from a string.

### Args
- **text_to_clean**: (str) The string to process.

### Returns
- **str**: The string with duplicate words removed.

### Example
```python
result = pp.remove_duplicates_words("hello hello world world")
print(result)
# "hello world"
```

# General Functions
This section includes general-purpose functions that support various operations within the application. These functions provide useful information about Pyplan users, help navigate different sections of the interface, and handle system dependencies, providing essential utilities for seamless interaction with the platform.

## get_user_list

get_user_list()

Gets the list of all users in the company.

### Returns

- **List[Dict]**: A list of dictionaries, each containing user details with the following structure:
    ```python
    [
        {
            'id': 'abc',
            'username': 'user_name',
            'first_name': 'User',
            'last_name': 'Lastname',
            'email': 'user@company.com',
            'departments': [
                {
                    'id': 1,
                    'code': 'pyplan-default',
                    'name': 'Default'
                }
            ],
            'is_active': True,
            'last_login': '2023-07-11T21:27:52+0000'
        },
        {
            'id': 'xyz',
            'username': 'user_name',
            'first_name': 'User firstname',
            'last_name': 'User lastname',
            'email': 'user@company.com',
            'departments': [
                {
                    'id': 1,
                    'code': 'pyplan-default',
                    'name': 'Default'
                }
            ],
            'is_active': True,
            'last_login': '2023-07-10T20:12:31+0000'
        }
    ]
    ```

### Example

```python
result = pp.get_user_list()
```

## open_app

open_app(folder, version, read_only, resources, open_on_new_instance, show_versions_on_open,interface_id_to_open_on_start)

### Summary
Sends message to command UI to open an application.

### Args
- **folder**: (str) Path to the folder containing the application.
- **version**: (Optional[str]) Name of the version to open.
- **read_only**: (Optional[bool]) If True, the application will be opened in read-only mode.
- **resources**: (Optional[Dict]) Dictionary with the desired resources to be used when opening the application.
- **open_on_new_instance**: (Optional[bool]) If True, the application will be opened in a new instance.
- **show_versions_on_open**: (Optional[bool]) If True, the application will show the list of available versions on open.
- **interface_id_to_open_on_start**: (Optional[str]) ID of the interface to open when the application is launched. If not provided, the default interface for that version will be opened.

### Returns
- **None**

### Examples
```python
pp.open_app(
  folder='my_company/Public/Demand Forecast',
  version='v2.3',
)
```
```python
pp.open_app(
  folder='my_company/Public/Demand Forecast',
  read_only=True,
  show_versions_on_open=True
)
```
```python
pp.open_app(
  folder='my_company/Public/Demand Forecast',
  open_on_new_instance=True,
  resources={
  	'metadata': {'cpu_architecture': 'x86'},
  	'pod_definition': {'spec': {'nodeSelector': {'env': 'PyplanEngines'}}},
  	'container_params': {'resources': {'limits': {'cpu': '0.95', 'memory': '7.4Gi'}, 'requests': {'cpu': '0.95', 'memory': '7.4Gi'}}}
  }
)
```
```python
pp.open_app(
  folder='my_company/Public/Demand Forecast',
  version='v2.3',
  interface_id_to_open_on_start='u026f30b-b167-4da4-b19c-48b0ba9a37fa'
)

```

## navigate_to_pyplan_section

navigate_to_pyplan_section(section, params)

### Summary
Sends message to command UI to go to the selected section.

### Args
- **section**: (NavigationSection) The section of the app to navigate to. Available options:
  - 'home'
  - 'code'
  - 'interfaces'
  - 'files'
  - 'apps'
  - 'scenarios/scenario-manager'
  - 'scenarios/scenario-template'
  - 'process'
  - 'versions'
  - 'app-consolidation'
  - 'interface-links'
  - 'api-endpoints'
  - 'instances'
  - 'logs'
  - 'general-settings'
  - 'users'
  - 'teams'
  - 'departments'
  - 'roles'
  - 'permissions-by-role'
  - 'companies'
  - 'assistant-bots'
- **params**: (Optional[dict]) Dictionary with additional parameters for the following sections:
  - If section is 'code':
    - 'node_id': (str) ID of the node to navigate to.
    - 'code_layout_id' (Optional[int]) One of the following layout codes:
      - 1: Result
      - 2: Result+Code
    - 'run_node': (Optional[bool]) Boolean to indicate if the node must be run when selected.
  - If section is 'interface':
    - 'interface_id': (Optional[str]) ID of the interface to navigate to.
  - If section is 'files':
  	- 'folder_path': (Optional[str]) Folder path to navigate to.

### Returns
- **None**

### Examples
```python
pp.navigate_to_pyplan_section(
  section='code',
  params={
    'node_id': 'cdm_demand',
    'code_layout_id': 1,
    'run_node': True
  }
)
```
```python
pp.navigate_to_pyplan_section(
  section='interfaces',
  params={
  	'interface_id': '0026f30b-b167-4da4-b19c-48b0ba9a37ff'
  }
)
```
```python
pp.navigate_to_pyplan_section(
  section='files',
  params={
  	'folder_path': 'pyplan/Public/My app/data'
  }
)
```
```python
pp.navigate_to_pyplan_section(
  section='versions'
)
```

## send_email

send_email(html_content, emails_to, names_to, subject, cc, bcc, reply_to, name_from, attachment_paths, email_from, email_type, context)

### Summary
Sends an email with the given parameters.

### Args
- **html_content**: (str) HTML content of the email body.
- **emails_to**: (List[str]) List of recipient email addresses.
- **names_to**: (Optional[List[str]]) List of recipient names corresponding to `emails_to`.
- **subject**: (Optional[str]) Email subject.
- **cc**: (Optional[List[str]]) List of CC recipient email addresses.
- **bcc**: (Optional[List[str]]) List of BCC recipient email addresses.
- **reply_to**: (Optional[List[str]]) List of Reply-To email addresses.
- **attachment_paths**: (Optional[List[str]]) List of absolute file paths for attachments.
- **name_from**: (Optional[str]) Display name of the sender.
- **email_from**: (Optional[str]) Sender email address.
- **email_type**: (Optional[int]) Email type identifier (mapped to the `EmailType` enum).
- **context**: (Optional[Dict]) Dictionary containing additional template context for the email.

### Returns
- **None**

### Examples
```python
pp.send_email(
  html_content='<p>Forecast report is ready.</p>',
  emails_to=['jdoe@example.com', 'jbloggs@example.com'],
  subject='Sales Forecast Summary',
)
```
```python
pp.send_email(
  html_content='<p>Dear team, please check the attached sales forecast report.</p>',
  emails_to=['jdoe@example.com'],
  names_to=['John Doe'],
  subject='Sales Forecast Summary',
  cc=['jbloggs@example.com'],
  reply_to=['michael.smith@my-company.com'],
  name_from='Sales Team',
  attachment_paths=['/data/models/my_company/Public/My app/outputs/report.pdf'],
)
```

## install_library

install_library(pypi_name, import_name=None)

**DEPRECATED.** Use the Lib manager instead.

### Parameters

- **pypi_name** (`str`): The name of the package to be installed from PyPI.
- **import_name** (`Optional[str]`): The name used to import the package. Defaults to `pypi_name`.

### Returns

- **bool**: `True` if the installation is successful.

### Example

```python
# Example usage is not recommended as this function is deprecated.
```

## _exists_module

_exists_module(import_name)

Checks if a module is installed.

### Parameters

- **import_name** (`str`): The name of the module to check for.

### Returns

- **bool**: `True` if the module is installed, `False` otherwise.

### Example

```python
>>> pp._exists_module('scipy')
True
```
