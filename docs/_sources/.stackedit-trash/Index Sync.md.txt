## Indexes synchronization

To synchronize indexes you must first have a  [filter-type block](http://www.cubeplat.com:8081/wiki/en/knowledge-base/filter-type-block/)  containing indexes. Then, you must have a node among the variables containing the indexes.  
[![sinc1](http://www.cubeplat.com:8081/wiki/wp-content/uploads/2016/04/sinc1.png)](http://www.cubeplat.com:8081/wiki/wp-content/uploads/2016/04/sinc1.png)

The example in the picture shows a dashboard that includes the Time index in one block and two graph-type blocks containing the same node. It is not necessary that the node be the same, but the Time index must be one of its variables.

To filter the graphs, in this example, it is necessary only to select the months from any of the graphs or from the index. The following picture shows the view:  
[![sinc2](http://www.cubeplat.com:8081/wiki/wp-content/uploads/2016/04/sinc2.png)](http://www.cubeplat.com:8081/wiki/wp-content/uploads/2016/04/sinc2.png)

Notice that the Pivot Grid and the graph are synchronized with the Time index.

If one of the graphs does not need to be synchronized with the others, you must disable the synchronization for said graph. You can do so from the graphs property window, in the Index sync tab. It looks like this:  
[![](http://www.cubeplat.com:8081/wiki/wp-content/uploads/2016/12/sinc4.png)](http://www.cubeplat.com:8081/wiki/wp-content/uploads/2016/12/sinc4.png)

In the example shown in the picture, the graph will not be synchronized by the Time index, but by Productos y Empresas.  
Thus, this block is excluded from synchronization by Time. The dashboard view is now the following:

[![sinc5](http://www.cubeplat.com:8081/wiki/wp-content/uploads/2016/04/sinc5.png)](http://www.cubeplat.com:8081/wiki/wp-content/uploads/2016/04/sinc5.png)

Notice that where the index details are specified, Time is null. [![sinc7](http://www.cubeplat.com:8081/wiki/wp-content/uploads/2016/04/sinc7.png)](http://www.cubeplat.com:8081/wiki/wp-content/uploads/2016/04/sinc7.png)

## Drilldown-dillup synchronization

It can be donde between two graph-type blocks. The must have at least one index in common to do the drilldown-drillup.  
[![sinc8](http://www.cubeplat.com:8081/wiki/wp-content/uploads/2016/04/sinc8.png)](http://www.cubeplat.com:8081/wiki/wp-content/uploads/2016/04/sinc8.png)

You click any segment of the graph. In this example, the drilldown is done by the index Productos from Empresa 1.  
[![sinc6](http://www.cubeplat.com:8081/wiki/wp-content/uploads/2016/04/sinc6.png)](http://www.cubeplat.com:8081/wiki/wp-content/uploads/2016/04/sinc6.png)

To exclude a block from the synchronization you must disable this option the same way explained above for the Time index.
<!--stackedit_data:
eyJoaXN0b3J5IjpbNzQ3NDIxNzUzXX0=
-->