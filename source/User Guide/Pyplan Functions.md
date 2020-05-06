## Pyplan Functions

### dataarray_from_pandas()
Returns a DataArray (valueColumns is string or (valueColumns is pd.Index and valueColumnsAsDim is True)) or Dataset (valueColumns is a list or (valueColumns is a pd.Index and valueColumnsAsDim is False)) from a Pandas dataframe applying the set_domain function.
    dataframe: Pandas dataframe with no index columns.
    domainDic: Dictionary of column names and index names. Ex. {'Column Name': index_name}.
    valueColumns: String, list or pd.Index. Dataframe's value columns.
    defaultValue: Default value when applying set_domain function.
    valueColumnsAsDim: If True, valueColumns becomes a dimension of resulting DataArray. If False, each value column becomes a variable of the resulting Dataset.
    sumDuplicateRecords: If True, sums identical rows. Otherwise, removes duplicates (except the first one). 
pandas_to_dataarray(sales_dataframe, {'Sales Channel': sales_channels, 'Market Segment': market_segments, 'Month': time}, 'Sales', 0.)

    epandas_to_dataarray(sales_dataframe, {'Sales Channel': sales_channels, 'Market Segment': market_segments, 'Month': time}, 'Sales', 0.)nter code here

> Written with [StackEdit](https://stackedit.io/).
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTg0NzcwMDQ2Ml19
-->