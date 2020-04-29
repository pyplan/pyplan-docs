
# User Interface Designer
Pyplan has a specific layer for **app creation** .

This layer can be accessed by clicking on the icon `Interfaces` located on the left side of the screen. 



![enter image description here](https://raw.githubusercontent.com/pyplan/pyplan-docs/master/img/UI_interfaces.png)
## Layout
Interfaces manager shows those I/O Interfaces created by the user and those that were shared by someone else.
Shared interfaces can be used but not modified unless they are copied to user own workspace.

For doing this **Right click** on the interface and select the option **Copy to My Interfaces**.

Once it has been copied user has total control over that interface.
 


![enter image description here](https://raw.githubusercontent.com/pyplan/pyplan-docs/master/img/Ui_layout_new1.png)

**Favs app** for quick access can also be set once the user owns the interface.

## Creating an Interface

If you want to create an interface from scratch click on `New` and select `interface`.

Define a name for it and double click on your new interface
![enter image description here](https://raw.githubusercontent.com/pyplan/pyplan-docs/master/img/Ui_new_interface.png)

A white interface will open with a widget selector inside.

The interface layout is created by adding and resizing new widgets. 
Widgets can be added by pressing `+` or by dividing existing widgets block space clicking on the arrows (Right or Down) found at the top left corner of every widget block.
![enter image description here](https://raw.githubusercontent.com/pyplan/pyplan-docs/master/img/Ui_blanck_interface.png)

Each widget can be used for displaying information from the influence diagram choosing among the different visualization alternatives described on section `Node Visualization`.

There are **two ways of selecting objects from diagram to represent them in an interface**.

1- Click on the visualization icon you want to include and then search and select the node you want (searching by node Title or ID).
![enter image description here](https://raw.githubusercontent.com/pyplan/pyplan-docs/master/img/UI_sele_obje_op1.png)

2- Or use one widget to show the influence diagram, then by pressing <kbd>Shift + click</kbd> on a node in the diagram, drag and drop it into the widget block you want to include it.
![enter image description here](https://raw.githubusercontent.com/pyplan/pyplan-docs/master/img/UI_sele_obje_op2.png)
## Inputs on interfaces

Interfaces can have inputs as well as outputs widgets. 

In case of inputs widgets, depending on the type of input you need to make you can chosse among using **Pivot grids**, **indexes** or **selectors**

### Pivot grids

This object can be used when you need to modify information of an array directly on your model.

For instance, in this example `market growth` information can be modified to simulate different scenarios, you may want to do this on your interface that is why it is presented as a pivot grid:
![enter image description here](https://raw.githubusercontent.com/pyplan/pyplan-docs/master/img/UI_pivot_input.png)

By dragging dimension in the correct order and pressing <kbd>ok</kbd> you build your input interface.

### Indexes as inputs

There are other interesting input objects:`indexes` (dimensions) and `selector`.

Indexes can be explicitly exposed on interfaces so that filtering  along dimensions is easier.

If you need to set an **index widget** just drag it from de diagram or search for it using wizard object.
**Indexes widget has their specific options menu.**
![enter image description here](https://raw.githubusercontent.com/pyplan/pyplan-docs/master/img/UI_indexes.png)

### Selector input

**Selector object** can also being dragged and dropped from diagram to create an input widget.

![enter image description here](https://raw.githubusercontent.com/pyplan/pyplan-docs/master/img/UI_choices.png)
## Synchronization
Once an interface has been created dimensions shared by objects in that interface are automatically synchronized.

That means that **any selection in any part of the interface will apply to every presented object** unless explicitly defined the opposite.

Let’s suppose you have created an interface like the following where `region`, `item type` and `time`are explicitly exposed.
 
If you select a **single region, a couple of items and a range of time** these selections will apply to all interface.

![enter image description here](https://raw.githubusercontent.com/pyplan/pyplan-docs/master/img/UI_synchro_new.jpg)
**Remember you can always choose to des-synchronized indexes as explained in `Node visualization` section.

## App Sharing
Once you have created various interfaces you may need to generate an application for sharing it with other users.

**Creating an application**

Creating an application is as simple as selecting `Application` from menu and defining a name for it.

![enter image description here](https://raw.githubusercontent.com/pyplan/pyplan-docs/master/img/UI_create_app.png)

By **dragging and dropping** previously created interfaces in the application deployment is done.
![enter image description here](https://raw.githubusercontent.com/pyplan/pyplan-docs/master/img/UI_drag_dro_inter.png)

**Sharing an application**

Select the application and press right bottom to access the following menu:

<img alt="Image" title="Share 1" src="https://raw.githubusercontent.com/pyplan/pyplan-docs/master/img/UI_share_1.jpg" width="50%"/>

<img alt="Image" title="Share 1" src="https://raw.githubusercontent.com/pyplan/pyplan-docs/master/img/UI_share_2.jpg" width="70%"/>


**Share the application externally and make it accessible for every person with the link.**

Congratulations your [python](https://www.python.org/) coded application has been deployed.


<!--stackedit_data:
eyJoaXN0b3J5IjpbNjE1MTAyMzgzLDkxOTIyNjc3OCw3MzUyNz
Q3MTEsNDQ0OTEyMDE0LDE1Mjg1MjA3MjksMTI4MTcyNzc4Nywt
MzI0MDA1Mjg1LC03OTg1OTE4NDMsMTYwNTI1OTM5MywtODExMz
E0MDY0LDE2ODI3OTM4MywtMTMwNjg4ODc5Nyw5MjIwNjA1NDYs
LTEzODI5NjU0ODQsLTU0OTUyNjEyNCwtMjc3NjM2OTU4LC0xOT
cyODY5MDYwLC0xNTc3MTc2Njc5LC0xOTMyMDU2MTgyLDE1Mjg1
MTMwOThdfQ==
-->