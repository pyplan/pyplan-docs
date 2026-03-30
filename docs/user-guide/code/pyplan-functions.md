---
sidebar_position: 7
title: Pyplan Functions
---

# Pyplan Functions

This page provides technical reference for the functions available in the Pyplan API. Each function is crafted to perform specific operations essential for managing and interacting with Pyplan services.

To access and utilize these functions, prefix them with `pp.` in your code. For example, to initiate a file upload, use `pp.upload()`.

---

## Pyplan Node Types

Functions for creating and configuring various types of nodes.

### `selector`

```python
pp.selector(options, selected, multiselect=False, save_selected_labels=False, node_identifier=None)
```

### `form`

```python
pp.form(table_name, columns, settings)
```

### `input_cube`

```python
pp.input_cube(table_name, dimensions, settings)
```

---

## Process

Functions for retrieving and managing processes, including their statuses and updates.

### `get_all_processes`

```python
pp.get_all_processes(in_progress_only=True)
```

### `get_my_processes`

```python
pp.get_my_processes(in_progress_only=True)
```

### `get_task_statuses`

```python
pp.get_task_statuses()
```

### `change_task_status`

```python
pp.change_task_status(task_id, new_task_status_id)
```

### `update_process`

```python
pp.update_process(process_id, data)
```

---

## Scheduled Tasks

Functions for managing and monitoring scheduled tasks.

### `log_task`

```python
pp.log_task(task_state, task_description, task_activity, task_info)
```

### `run_scheduled_task`

```python
pp.run_scheduled_task(task_id, version, notification_emails=None)
```

### `get_scheduled_task_logs`

```python
pp.get_scheduled_task_logs(task_id, result_size=50, task_details=True)
```

---

## Agents

### `agent_chat`

```python
pp.agent_chat(agent_code, chat_message, chat_session_id, metadata=None, context=None)
```

---

## Assistant Bots

### `update_application_assistant`

```python
pp.update_application_assistant(
    assistant_id, engine_type, name=None, description=None,
    instructions=None, model=None, advanced_settings=None,
    reindex_documents=True, add_nodes_info_file=True,
    add_interfaces_info_file=True, active=None
)
```

### `assistant_chat`

```python
pp.assistant_chat(assistant_id, engine_type, chat_message, chat_history=None)
```

---

## Automated Tests

### `execute_tests`

```python
pp.execute_tests(test_ids=None, detached_run=False)
```

---

## Encryption

### `get_secret`

```python
pp.get_secret(secret_key, department_code=None)
```

### `get_my_secret_keys`

```python
pp.get_my_secret_keys()
```

### `decrypt_sqlite_database`

```python
pp.decrypt_sqlite_database(
    encrypted_db_path, decrypted_db_path, password,
    remove_encrypted_db_when_done=False,
    sqlite_cipher_mode=ENCRYPTED_SQLITE_CIPHER_MODE,
    sqlite_kdf_iter=ENCRYPTED_SQLITE_KDF_ITER
)
```

---

## File Operations and Messaging

### `download`

```python
pp.download(file_path)
```

### `upload`

```python
pp.upload(
    target_path, target_filename=None, allowed_extensions=None,
    validation_node_id=None, callback_node_id=None,
    list_of_node_ids_to_invalidate=None, upload_text=None, multiple=False
)
```

### `send_message`

```python
pp.send_message(
    message_text, message_title=None, not_level_reverse="info",
    auto_hide_duration=None, extra_params=None
)
```

### `send_notification`

```python
pp.send_notification(
    target_usernames, message, notification_type='general',
    application_id=None, extra_params=None, notify_live_users=False
)
```

### `progressbar`

```python
pp.progressbar(progress, message_text="", not_level_reverse="info", close_when_finished=False)
```

---

## DataArray and DataFrame Functions

Tools for manipulating and managing DataArray and DataFrame objects.

### `set_domain`

```python
pp.set_domain(dataArray, domainDic, defaultValue=None)
```

### `create_dataarray`

```python
pp.create_dataarray(value, coords, dtype=None)
```

### `subscript`

```python
pp.subscript(dataArray, indexes, values)
```

### `subset`

```python
pp.subset(cube)
```

### `change_index`

```python
pp.change_index(dataArray, oldIndex, newIndex, compareMode=1, defaultValue=None)
```

### `slice_dataarray`

```python
pp.slice_dataarray(dataArray, index, position)
```

### `fill_inf`

```python
pp.fill_inf(dataArray, value=0)
```

### `fill_all`

```python
pp.fill_all(dataArray, value=0)
```

### `concat_rows`

```python
pp.concat_rows(array_param, index_param)
```

### `pandas_from_excel`

```python
pp.pandas_from_excel(excel, sheetName=None, namedRange=None, cellRange=None, indexes=None, driver="")
```

### `pandas_from_xlsb_file`

```python
pp.pandas_from_xlsb_file(filepath)
```

### `pandas_from_dataarray`

```python
pp.pandas_from_dataarray(dataarray)
```

### `pandas_from_access`

```python
pp.pandas_from_access()
```

### `index_from_pandas`

```python
pp.index_from_pandas(dataframe, columnName, removeEmpty)
```

### `index_from_excel`

```python
pp.index_from_excel(excel, sheetName, namedRange, cellRange, columnName, removeEmpty)
```

### `dataarray_from_pandas`

```python
pp.dataarray_from_pandas(dataframe, domainDic, valueColumns, defaultValue, valueColumnsAsDim, sumDuplicateRecords)
```

### `dataarray_from_excel`

```python
pp.dataarray_from_excel(excel, sheetName, namedRange, cellRange, indexes, valueColumns, indexColumnHeaders, replaceByIndex, defaultValue)
```

### `to_dataarray`

```python
pp.to_dataarray(index)
```

### `aggregate`

```python
pp.aggregate(dataArray, mapInfo, sourceIndex, targetIndex, aggregationFunction='sum', numericOnly=None)
```

### `dynamic`

```python
pp.dynamic(dataArray, index, shift, initialValues=None, sliceInputs=True)
```

### `lookup`

```python
pp.lookup(dataArray, dataMap, sharedIndex, defaultValue=0)
```

### `where`

```python
pp.where(obj, condition, condition_values, x, y, **kwargs)
```

### `maximum`

```python
pp.maximum(x, y, **kwargs)
```

### `minimum`

```python
pp.minimum(x, y, **kwargs)
```

### `copy_index`

```python
pp.copy_index(dataArray, sortValues=True)
```

### `sequence_index`

```python
pp.sequence_index(_start, _end, _step=1)
```

### `subindex`

```python
pp.subindex(dataArray, targetValue, targetIndex, method='Last')
```

### `create_report`

```python
pp.create_report(reportItems, reportIndexName="Report index", reportIndex=None)
```

### `concat_dataarrays`

```python
pp.concat_dataarrays(valuesList, dim)
```

---

## Data Manipulation Functions

Specialized functions for operations on DataFrames, DataArrays, and indexes, along with mathematical operations.

### `find`

```python
pp.find(param1, param2, compareType=1, caseSensitive=True)
```

### `apply_fn`

```python
pp.apply_fn(obj, applyFn, *args)
```

### `split_text`

```python
pp.split_text(param1, separator, part=None)
```

### `get_pos`

```python
pp.get_pos(index)
```

### `concat_index`

```python
pp.concat_index(*args)
```

### `linear_depreciation`

```python
pp.linear_depreciation(investments, usefulLife, timeIndex, includeInCurrentMonth=False, timeIndexFormat='%Y.%m')
```

### `irr`

```python
pp.irr(flow, time_index)
```

### `copy_as_values`

```python
pp.copy_as_values(source, targetId)
```

### `excel_connection`

```python
pp.excel_connection(filepath, useOpenpyxl=False, dataOnly=True, readOnly=True)
```

### `kind_to_string`

```python
pp.kind_to_string(kind)
```

### `goal_seek`

```python
pp.goal_seek(nodeIdX, nodeIdObjective, goal=0, startValue=1, matrixIndex=None, maxIter=50, tol=1.48e-08, fullOutput=False)
```

### `create_time`

```python
pp.create_time(date_start, date_end, freq='M', format='%Y.%m')
```

### `add_periods`

```python
pp.add_periods(start, periods, freq='M', format='%Y.%m')
```

### `npv`

```python
pp.npv(rate, flow, time_index, offset=1)
```

### `xnpv`

```python
pp.xnpv(rate, flow, time_index, initial_dates, calendar)
```

### `get_nested_lists_shape`

```python
pp.get_nested_lists_shape(lst, shape=())
```

### `report`

```python
pp.report(items_allocation, settings)
```

### `get_specific_range`

```python
pp.get_specific_range(specific_range, file_path)
```

### `get_new_range`

```python
pp.get_new_range(range_value)
```

### `remove_duplicates_words`

```python
pp.remove_duplicates_words(text_to_clean)
```

---

## General Functions

General-purpose functions that support various operations within the application.

### `get_user_list`

```python
pp.get_user_list()
```

### `open_app`

```python
pp.open_app(folder, version, read_only, resources, open_on_new_instance, show_versions_on_open, interface_id_to_open_on_start)
```

### `navigate_to_pyplan_section`

```python
pp.navigate_to_pyplan_section(section, params)
```

### `send_email`

```python
pp.send_email(
    html_content, emails_to, names_to, subject, cc, bcc,
    reply_to, name_from, attachment_paths, email_from, email_type, context
)
```

### `install_library`

```python
pp.install_library(pypi_name, import_name=None)
```

### `_exists_module`

```python
pp._exists_module(import_name)
```
