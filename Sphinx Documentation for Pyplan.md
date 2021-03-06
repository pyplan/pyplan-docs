# Guide to generate the Pyplan's Documentation site.

## Specs

The Documentation site is in: 

> /pyplan-docs/docs

The source files for the documentation are in: 

> /pyplan-docs/source

All the files for the documentation must be in Pyplan's GitHub /source folder
The reccommended tool for markdown writing and editing is Stackedit [https://stackedit.io/](https://stackedit.io/)

## Tools needed:
Sphinx for python:

    pip install sphinx
Read The Docs theme

    pip install sphinx_rtd_theme

Recommonmark parser to parse markdown files

    pip install recommonmark

Sphinx Markdown Tables to correctly render markdown tables

```
pip install sphinx-markdown-tables
```
## Process

 - All the configuration needed for sphinx are in the config.py file
 - The table of contents is in the index.rst file
 - A new installation of Sphinx will overwrite both files so make sure of replace them with the files in the Pyplan's repository.


### Step One:
Pull the files form the repository so yo have the latest versions of the markdown files in /source

### Step Two:
If needed, add the new markdown files to the index.rst toctree

### Step Three
In the command line, go to the repository folder, and execute Sphinx

    sphinx-build -b html source build

The new site will be generated in the /buid folder

### Step Four
Replace the files in the /docs folder with the new files in the /buid folder
Commit the changes and push to GitHub

The new Documentation site will be automatically updated

 





> Written with [StackEdit](https://stackedit.io/).
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQwNjg2MTY5MF19
-->