## Pyplan Functions

### pp.pandas_from_excel

    **pp.pandas_from_excel**(*excel, sheetName=None, namedRange=None, cellRange=None, indexes=None,
    driver="Driver={Microsoft Excel Driver (*.xls, *.xlsx, *.xlsm, *.xlsb)}; DBQ=%s; READONLY=TRUE"*)

Creates a Pandas Dataframe from an Excel spreadsheet.
#### Parameters

 - **excel** (str) - Path to Excel spreadsheet.
 - **sheetName** (str) - Sheet name to be read.
 - **namedRange** (str) - Range name to be read. Only applies if sheetName is None.
 - **cellRange** (str) - Range of cells to be read. Must be used with sheetName. e.g. 'A1:H10'.
 - **indexes** (list) - List of columns to set index.
 - **driver** (str) - Driver to be used to interact with Excel spreadsheet. Only applies to Windows PCs.

#### Returns
Pandas DataFrame

----------

### pp.index_from_excel
    **pp.index_from_excel**(*excel, sheetName=None, namedRange=None, cellRange=None,
    columnName=None, removeEmpty=True*)

Creates a Pandas Index from an Excel spreadsheet.
#### Parameters

 - **excel** (str) - Path to Excel spreadsheet.
 - **sheetName** (str) - Sheet name to be read.
 - **namedRange** (str) - Range name to be read. Only applies if sheetName is None.
 - **cellRange** (str) - Range of cells to be read. Must be used with sheetName. e.g. 'A1:H10'.
 - **columnName** (str) - Name of column to be read.
 - **removeEmpty** (bool) - Removes empty rows if set to True.

#### Returns
Pandas Index

----------

### pp.index_from_pandas
    **pp.index_from_pandas**(*dataframe, columnName=None, removeEmpty=True*)

Creates a Pandas Index from a Pandas DataFrame.
#### Parameters

 - **dataframe** (Pandas DataFrame)
 - **columnName** (str) - Name of column to be read.
 - **removeEmpty** (bool) - Removes empty rows if set to True.

#### Returns
Pandas Index

----------

### pp.dataarray_from_pandas
    **pp.dataarray_from_pandas**(*dataframe, domainDic, valueColumns, defaultValue=None,
    valueColumnsAsDim=True, sumDuplicateRecords=True*)

Applies the pp.set_domain function to a Pandas DataFrame and returns:
Xarray DataArray, if (valueColumns is a string) or (valueColumns is a Pandas Index and valueColumnsAsDim is True), or
Xarray Dataset, if (valueColumns is a list) or (valueColumns is a Pandas Index and valueColumnsAsDim is False)
#### Parameters

 - **dataframe** (Pandas DataFrame) - Pandas DataFrame without MultiIndex.
 - **domainDic** (dict) - Dictionary of column names (keys) and Pandas Index objects (values). e.g. {'Column Name': index_a}.
 - **valueColumns** (str, list or Pandas Index) - Dataframe's value columns.
 - **defaultValue** (str, float or int) - Value used to fill empty combinations of DataArray.
 - **valueColumnsAsDim** (bool) - If True, valueColumns becomes a dimension of the resulting Xarray DataArray. If False, each value column becomes a variable of the resulting Xarray Dataset.
 - **sumDuplicateRecords** (bool) - If True, sums identical rows. If False, keeps the first one.

#### Returns
Xarray DataArray, if (valueColumns is a string) or (valueColumns is a Pandas Index and valueColumnsAsDim is True),
or
Xarray Dataset, if (valueColumns is a list) or (valueColumns is a Pandas Index and valueColumnsAsDim is False)

----------

### pp.dataarray_from_excel
    **pp.dataarray_from_excel**(*excel, sheetName=None, namedRange=None, cellRange=None,
    indexes=None, valueColumns=None, indexColumnHeaders=None, replaceByIndex=None,
    defaultValue=0*)

Creates an Xarray DataArray from an Excel spreadsheet.
#### Parameters

 - **excel** (str) - Path to Excel spreadsheet.
 - **sheetName** (str) - Sheet name to be read.
 - **namedRange** (str) - Range name to be read. Only applies if sheetName is None.
 - **cellRange** (str) - Range of cells to be read. Must be used with sheetName. e.g. 'A1:H10'.
 - **indexes** (list) - List of Pandas Indexes that match index columns' values.
 - **valueColumns** (str or Pandas Index) - str if there is only one value column; Pandas Index with column's names if there are two or more value columns.
 - **indexColumnHeaders** (list) - List of strings with columns' names matching indexes.
 - **replaceByIndex** (bool) - Replaces Pandas Index used in valueColumns with another Pandas Index applying the pp.change_index function.
 - **defaultValue** (str, float or int) - Value used to fill empty combinations of DataArray.

#### Returns
Xarray DataArray

----------
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTkxMjYyNTIzNCw3MDA2NTM2OTgsLTEwMz
cwMTM1ODksLTE1MDMwNDI5MDMsMTMyNjMxOTY1NSwtMjAzNTk0
MTY0OCwtODQ3NzAwNDYyXX0=
-->