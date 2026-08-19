---
sidebar_position: 5
title: Skills
---

# Skills

The **Skills** page lets us define reusable **guidance and policies** that Pyplan's AI follows when it works on our applications. A skill is a short document — for example *"how our interfaces should look"* or *"the rules for building a P&L"* — that both the built-in **AI agents** and the **MCP integration** read before creating or modifying anything.

Skills turn one-off instructions ("make the P&L without decimals and highlight negatives in red") into **persistent policy**: once written, every future request respects them without us repeating ourselves.

To access this page, we open **AI Management** and select **Skills and memory**, then the **Skills** tab.

:::info
The same page has a second tab, **Memory**, with the lessons the agents pick up on their own while working in an application. Skills are the policy we write; memories are what the AI learns. See [Memory](./memory.md).
:::

## 1. What a skill is

Each skill is a Markdown document in the **SKILL.md** format: a small metadata header (front matter) followed by the guidance itself.

```markdown
---
name: build-interfaces
description: Guidelines for building interfaces
category: interfaces
---

# build-interfaces

Always add a red line of 25px height and full width at the top of interfaces.
Use the company color palette and keep the KPI row at the top.
```

- **name** — the skill identifier.
- **description** — a one-line summary. The AI reads the description first to decide whether the skill is relevant to the current task, and only then loads the full content.
- **category** — an optional label to group related skills (for example `interfaces`, `logic`, `documentation`).

The body (everything after the header) is the actual guidance the AI must follow.

## 2. The two levels of skills

Skills exist at two levels, shown in the **Level** column of the list:

- **Company** — apply to **every application** in the company. We use them for cross-app standards, such as a corporate design guideline or a documentation format that all apps should share.
- **App** — apply only to the **currently open application** (and its version). We use them for rules that are specific to one model, such as how a particular app builds its indicators.

When a company-level and an app-level skill share the same name, the **app-level skill takes precedence**. This lets an application override a company default when it needs to.

Company skills are always visible in the manager. App skills are only shown when an application is open — if no app is open, the page displays a note reminding us to open one.

## 3. How skills are used

Skills work by **progressive disclosure**, which keeps the AI efficient:

1. When the AI starts working on an application, it receives the **index** of available skills — just their names, levels and descriptions.
2. Before building or changing something (an interface, node logic, a form, etc.), it reviews that index and loads the **full content** of every skill relevant to the task.
3. It then follows the loaded guidance as binding policy, over its own defaults.

The same skills are consumed by:

- The **AI agents** inside Pyplan (for example the developer and interface agents).
- External tools connected through the **MCP integration**, which can list the available skills and load the ones they need.

Because both share the same store, we maintain the guidance in a single place and it applies everywhere.

## 4. Managing skills

The main table lists the available skills with their **Name**, **Level**, **Description** and **Category**. From the toolbar we can create, edit, import, export or delete skills.

### Creating or editing a skill

To create a skill:

1. We click **New skill**.
2. We enter the **Name**.
3. We select the **Level** (Company or App). The App level is available only when an application is open.
4. We complete the **SKILL.md content** in the editor. A starter template with the `name`, `description` and `category` header is provided — we fill in the description and write the guidance in the body.
5. We click **Create**.

To edit a skill, we select a row and click **Edit skill**, then adjust the content and click **Update**.

The **description** and **category** shown in the list are read from the front matter of the SKILL.md, so we edit them directly in the content.

### Permissions

What we can manage depends on our permissions: company-level skills require permission to write in the company's public workspace, and app-level skills require edit access to the open application. Skills we are not allowed to change are shown in read-only mode.

## 5. Importing and exporting skills

Skills are portable, which makes them easy to reuse and share.

- **Import** — we click **Import** and select a skill file. Pyplan accepts the Claude Agent Skill format (`.skill`), a `.zip` package containing a `SKILL.md`, or a plain `.md` file. The parsed content pre-fills the create form so we can review it, choose a level and confirm.
- **Export** — we select a skill and click **Export** to download it as a `.zip` package, ready to import into another company or application.

## 6. Use cases

Some typical ways to use skills:

- **Interface design standard (Company).** A skill named `build-interfaces` describes the house style — header bar, color palette, KPI layout — so every dashboard the AI builds across all apps looks consistent.
- **Indicator policy (App).** In a financial planning app, a `pnl-creator` skill states that any P&L must be a table with no decimals, negative numbers in red, and a summary row at the bottom. Whenever we ask the AI to build a P&L in that app, it applies these rules automatically.
- **Documentation format (Company).** A `html-docs` skill defines the exact layout and tone for documentation the AI produces, so all generated docs match the company's format.
- **Modeling conventions (App).** A skill can encode naming conventions, calculation patterns or data sources that a specific model must respect when the AI edits its logic.

## Summary

With **Skills**, we give Pyplan's AI persistent, reusable guidance:

- We define skills as SKILL.md documents with a name, description and category.
- We work at two levels — **Company** (all apps) and **App** (the open application) — with app skills overriding company skills of the same name.
- The AI loads the relevant skills before acting, and both the internal agents and the MCP integration follow them.
- We create and edit skills in the built-in editor, and import or export them as `.skill` / `.zip` packages.
