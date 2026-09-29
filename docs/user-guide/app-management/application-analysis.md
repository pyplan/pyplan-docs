---
sidebar_position: 7
title: Application Analysis
---

# Application Analysis

The Application Analysis feature helps you review an application to detect potential inefficiencies, outdated components, and unused elements. It provides a set of focused checks that support performance tuning, better organization, and alignment with current modeling standards.

## Analysis Options

![App Analysis](../img/app-management/app_analysis.png)

You can run one or several analyses at the same time by selecting from the following options:

| Analysis | Description |
|---|---|
| **Detect nodes with large definitions** | Scans for nodes whose Definition code is very long (e.g., more than 50 lines) and may be hard to maintain. Reports each node with its line count and module. |
| **Detect nodes with deprecated types** | Identifies nodes that use deprecated or unsupported node types. Reports the node title, type, and module. |
| **Detect unused nodes** | Finds nodes that are not used by any other node and are not referenced by interfaces. These can often be removed to reduce clutter. |
| **Detect empty modules** | Highlights modules that contain no nodes. These can be safely deleted to simplify the application structure. |
| **Detect nodes with large evaluation time** | Identifies nodes that take a long time to evaluate. Results are grouped into: **Medium** (5–10 seconds) and **High** (more than 10 seconds). |
| **Detect large interfaces** | Analyzes interfaces with many components: **Medium** (10–15 components) and **High** (more than 15 components). |
| **Detect multidimensional DataArrays** | Locates nodes whose result is a multidimensional `DataArray`, especially those exceeding a specified dimension threshold. |
| **Detect large application size** | Flags the application when its total size on disk is greater than 1 GB. |
| **Detect large app versions** | Highlights specific application versions that occupy a lot of disk space (more than 200 MB). Reports each version with its path and size. |
| **Detect possible bad practices in node definitions** | Reviews the Definition code of every node looking for patterns that bypass the dependency graph or the calculation flow: use of `self.model` and manual invalidations. Reports each node with the practice found, the lines where it appears, and its module. See [Bad practices in node definitions](#bad-practices-in-node-definitions). |

:::tip
Before running the analysis, make sure that the main nodes have been executed. Some checks, such as Detect nodes with large evaluation time, rely on execution data to produce accurate results.
:::

## Bad practices in node definitions

The **Detect possible bad practices in node definitions** option flags these patterns:

| Practice | What is detected | Why to review it |
|---|---|---|
| **Use of self.model** | Direct access to `self.model` (or `self._model`) from a node definition. | It bypasses dependency tracking, so the diagram does not know which nodes the result depends on, and it couples the node to the engine internals. Prefer the `pp.*` functions. |
| **Manual invalidation** | Calls to `invalidate()`, `silentInvalidate()`, `invalidateOutputs()` or `invalidate_nodes(...)` inside a definition. | Evaluating the node has side effects: it triggers cascading recalculations, and results may depend on the order in which nodes are evaluated. |

```python
# Flagged: reads another node through the model internals
sales = self.model.getNode('sales').result
result = sales * 1.21

# Recommended: reference the node directly, so the dependency is tracked
result = sales * 1.21
```

Only code is analyzed: mentions of these patterns inside comments or strings are not reported. Definitions that cannot be parsed are skipped.

:::caution
Results are **warnings to review**, not errors to fix. Some uses are legitimate, for example button nodes or data load flows that need to invalidate other nodes after running. Check each flagged node and keep the practice when it is intended.
:::

Each row includes a **Go to node** action that opens the node in the diagram. These results are also included when you export the analysis to CSV or Excel.

## Detailed Reporting

Each selected analysis produces a detailed report listing the relevant nodes, modules, or interfaces, helping you quickly locate issues and providing concrete, actionable information.

![Analysis Result 1](../img/app-management/analysis_result_1.png)

The results are organized as follows:

- A summary area shows all the reports generated for the selected options, grouped by analysis type.
- Each section can be expanded to see the detailed list of items flagged by that analysis.

![Analysis Result 2](../img/app-management/analysis_result_2.png)

:::info
Reports are stored locally in the browser. You can keep up to five reports in total. Each report is associated with an application ID and version, so results remain relevant to the exact version analyzed. For a given application version, only the most recent report is kept — but you can store reports for different applications or for different versions of the same application simultaneously.
:::
