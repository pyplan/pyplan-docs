# Migrating from Cubeplan
Even though the way of creating and sharing apps is the same, Cubeplan models can not be run on Pyplan. Neither dashboards generated with Cubeplan can be exported and used in Pyplan. The origin of that lack of compatibility is that they run different languages underneath to calculate computations.
It is an excellent exercise for learning Pyplan translating an old Cubeplan model.
## Similarities
Pyplan organizes Python code through influence diagrams the same as Cubeplan, but in this case, nodes could contain different type of objects (i.e. Pandas, Numpy, Xarray) so that the programmer needs to be aware of that when creating calculations.
Nodes have a Title and an Identifier

## Differences
## Functions equivalence list
Check examples available in  **Pyplan Library** folder to see how things  you did in Cubeplan are now done using **Pyplan** .

![enter image description here](http://img.pyplan.org/Int_pplexamples_new.png)

The following table contains **Cubeplan basic function** list and its **correlation in Pyplan**.

|Model| Title in Cubeplan|Pyplan Library|Node with example|PPL,XA or Pandas|
|-----|-----|-----|-----|-----|
|Selecting Data from Array|change index|change_index|change_index_ex  /change_index_by_pos_ex|PPL|
|Selecting Data from Array|subscript|subscript|subscript_ex|PPL|
|Selecting Data from Array|subscript looking up|lookup|lookup_ex|PPL|
|Selecting Data from Array|subset|subset|subset_ex|PPL|
|Selecting Data from Array|slice|slice_dataarray|slice_dataarray_ex|PPL|
|Basic Math and Missing Values|size|len()|len_size_ex|XA|
|Basic Math and Missing Values|size|dataarray.size|len_size_ex|XA|
|Basic Math and Missing Values|undef_filter|fill_all|fillall_ex|PPL|
|Basic Math and Missing Values|nvx_is_null/nvx_is_nan|dataarray.fillna()|missing_values_methodsfillna|XA|
|Basic Math and Missing Values|undef_filter|fill_inf|fillinf_ex|PPL|
|Basic Math and Missing Values|min|dataarray.min(teams.name)|min_along_indexes|XA|
|Basic Math and Missing Values|max|dataarray.max(teams.name)|max_along_indexes|XA|
|Basic Math and Missing Values|if then else|xr.where|xr_where_exa|XA|
|Basic Math and Missing Values|min_|xr.ufuncs.minimum|mini_maxi_among_2_dataarrays|XA|
|Basic Math and Missing Values|max_|xr.ufuncs.maximum|pp_maximum|XA|
|Aggregation and Rolling window operations|sum|dataarray.sum(teams.name)|sum_ex|XA|
|Aggregation and Rolling window operations|cumulate|dataarray.cumsum(teams.name)|cumsum_ex|XA|
|Aggregation and Rolling window operations|cumproduct|dataarray.cumprod(teams.name)|cumprod_ex|XA|
|Aggregation and Rolling window operations|backward looking sum|dataarray.rolling|back_look_sum_example|XA|
|Aggregation and Rolling window operations|filtered aggregate|aggregate|aggregate_ex|PPL|
|Working with Indexes|concat|concat_index|concatindex_ex|PPL|
|Working with Indexes|new|add_periods_ex|add_periods_ex|PPL|
|Working with Indexes|new|apply_fn|apply_fn_ex|PPL|
|Working with Indexes|find in text|find|find_ex|PPL|
|Working with Indexes|splittext|split_text|splittext_ex|PPL|
|Dynamic NPV IRR  and Linear Depreciation|npv|npv|npv_ex|PPL|
|Dynamic NPV IRR  and Linear Depreciation|irr|irr|irr_ex|PPL|
|Dynamic NPV IRR  and Linear Depreciation|dynamic|dynamic|dynamic_ex|PPL|
|Dynamic NPV IRR  and Linear Depreciation|new|create_time|time|PPL|
|Dynamic NPV IRR  and Linear Depreciation|linear depreciation|linear_depreciation|linear_depreciation_ex|PPL|
|Dynamic NPV IRR  and Linear Depreciation|or|¦|NA|XA|
|Reading Data from Excel|nvx_da_source_cone|excel_connection|excel_connection_ex|PPL|
|Reading Data from Excel|nvx_read_index|index_from_excel|reading_example_index|PPL|
|Reading Data from Excel|nvx_read_table|dataarray_from_excel|dataarray_from_excel_ex|PPL|
|Reading Data from Excel|nvx_read_table|pandas_from_excel|pandas_from_excel_ex|PPL|
|Interacting with Pandas|new| pd.read_csv|pd_read_csv|Pandas|
|Interacting with Pandas|new|index_from_pandas|orders_date|PPL|
|Interacting with Pandas|new|reading from pandas see example|sales_data_by_orders_date|XA|| 


### **Financial Planning Library for Cubeplan users**
If you are used to create **financial planning models in Cubeplan** then these other functions will be useful for you.

**Contact your former Cubeplan distributor** to ask for the module with these specific functions.

|Module| Title in Cubeplan|Pyplan Library|
|-----|-----|-----|
|Financial Planning|sea_to_time|sea_to_time|
|Financial Planning|annualise|annualise|
|Financial Planning|month|month|
|Financial Planning|evatime|evatime|
|Financial Planning|new|days_to_time|
|Financial Planning|new|time_to_days|
|Financial Planning|evayears|evayears|
|Financial Planning|years to time|years_to_time|
|Financial Planning|cascade_volume|cascade_volume|
|Financial Planning|band_allocation|band_allocation|
|Financial Planning|new|dispatch|
|Financial Planning|new|nvx_read_multi_sheets|
|Financial Planning|new|nvx_smart_pandas|
|Financial Planning|new|nvx_round|
|Financial Planning|new|nvx_safe_int_div|

Use these functions as you used them in Cubeplan.

## How to do in Pylan



<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQwOTA5NjQwMywtMTc4NjkyNjgxNl19
-->