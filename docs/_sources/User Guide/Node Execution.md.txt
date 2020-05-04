
## Executing Nodes
### Console Output
You can run any node after editing its code by pressing <kbd>CTRL + Enter</kbd>.
At the right side of the Code window, the console output resulting from running the node will appear.
![enter image description here](https://raw.githubusercontent.com/pyplan/pyplan-docs/master/img/Node-execution-code-tab.png)
Any `Print()` statement written between code lines will display it result here.
Its purpose is to make a quick evaluation of the node, to check if it is properly defined.

### Result Explorer
Another way to run a node is by pressing <kbd>CTRL + E</kbd>.
In this way, more complete information about the node properties and its result is displayed.

![](https://raw.githubusercontent.com/pyplan/pyplan-docs/master/img/Node-execution-profile.png)
One of the most interesting features accesible through this means of evaluation is the "Show Profile" feature, which displays the calculation path, the calculation time, and the memory usage by step (nodes.)
![enter image description here](https://raw.githubusercontent.com/pyplan/pyplan-docs/master/img/Node-execution-console+.png)

### Evaluating a Node
Press <kbd>CTRL + R</kbd> to get its result.

You can evaluate a node by double clicking on it or pressing <kbd>CTRL + R</kbd> after selecting it.
Unlike the previous running alternatives, the node is run and its result displayed in a new tab, called the "Title" of the node, which has a default table format.

![enter image description here](https://raw.githubusercontent.com/pyplan/pyplan-docs/master/img/Node-execution-default.png)

Pyplan natively interprets Numpy matrix, Pandas dataframe indexes, and Xarray dimensions, which will be automatically displayed at the bottom of the table for pivoting and filtering.
Default views can be changed using the Edit interface menu that can be launched by clicking on the icon shown in the image below.

![enter image description here](https://raw.githubusercontent.com/pyplan/pyplan-docs/master/img/Node-execution-edit-interface.png)

When you click on the Edit interface icon, the configuration menu is launched. Here, you can decide how the node will be rendered. After defining the node visualization configuration, you must accept the changes in order to save them.
![enter image description here](https://raw.githubusercontent.com/pyplan/pyplan-docs/master/img/Node-execution-edit-inter3.png)

### Embedded Tools
There are some embedded tools that appear when evaluating a node according to the type of result.
For example, any node evaluates as a pandas dataframe object will display the following tools:
![enter image description here](https://raw.githubusercontent.com/pyplan/pyplan-docs/master/img/node-exec-pandas-tools.png)
These tools make it easy for non-programmers to start manipulating the basic Python objects without coding.
As you will realize, when operating with these tools, the subjacent Python code is automatically generated, hence inducing analysts to learn how to use Python. This is like saving a macro in Excel.
<!--stackedit_data:
eyJoaXN0b3J5IjpbMTU4NTQ0MzM0LC0xMDU3NTA0OTUsMTgzMT
ExMjc5NSw0NzUzOTAyMzQsLTExNDQwMjEwMzMsLTEzODU1MDc5
OTgsMjA1NzI5MzcyMSwyODU5NDYwNTAsLTQwNzE1NTY0NywtMT
Q4NjIzOTc4OCw0NzczNTY4NTIsMTI2OTExNTg2OCwtNDcyMjE4
MjUwLC0zNzk5MTYwODAsLTE4NTUzMjk5NzksMTQzNTUyNzI4MC
wxMDgxMDc5NzQ1LDUwNTk1MjI0MSw5NjAxMDg2LDExOTAzMjIx
MDRdfQ==
-->