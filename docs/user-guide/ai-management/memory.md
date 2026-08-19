---
sidebar_position: 6
title: Memory
---

# Memory

The **Memory** of an application is what its AI agents have **learned about how to work in it**: conventions to respect, sequences that must be followed, and mistakes already made there. Unlike [Skills](./skills.md), which we write ourselves as policy, memories are **accumulated** — the agent picks them up while we work with it, and from then on it takes them into account without us repeating ourselves.

Memory answers a very specific question: *"how do we do things in this application?"*. It never stores the application's data, results, or figures.

To review and manage it, we open **Skills and memory** and select the **Memory** tab.

## 1. What a memory is

A memory is a **single sentence of guidance**, at most 300 characters, that belongs to one agent of one application. For example:

> When creating a Form from a DataFrame, always disallow adding new columns.

Each memory has three properties:

- **Category** — what kind of lesson it is:
  - **Workflow**: a sequence or a location that must be respected (*"after changing an assumption, invalidate the projection before previewing it"*).
  - **Style**: a convention of the application — naming, formatting, which component or library to use (*"charts are built with HTML + Plotly, not the chart component"*).
  - **Pitfall**: a mistake already made here, or a limitation of the environment (*"this application cannot install openpyxl"*).
- **Agent** — the agent that owns it. Memories are kept **per agent**: only that agent reads its own. What the Pyplan Agent learns about writing node code is noise for a custom sales assistant defined in the same application.
- **Applies to** — where the lesson is useful: **Everywhere**, **Diagram and code**, or **Interfaces**. A memory is only carried into the conversation while we are working in that section, so a rule about building dashboards does not take up space while we write node code.

Memories live **inside the application** and are shared by all of its versions, so creating or switching versions does not change them.

:::info
Memories are always stored in English, whatever language the conversation was held in. They are instructions for a model, not text for us to read in the chat, and keeping them in a single language makes them consistent across teams that do not share one.
:::

## 2. How memories are created

There are three ways for a memory to reach the application, and all of them require **edit access** to it.

### Automatically, when we teach the agent something

At the end of a conversation turn, Pyplan checks whether anything durable was learned. This happens **rarely and only when there is real evidence** for it:

- We state a rule that goes beyond the current request (*"always…", "never…", "from now on…"*).
- We correct how the agent works (*"there's no need to declare the data type"*).
- The agent has to go back over something it had just built, because the result was not what we expected.
- The agent fails the same kind of operation more than once in the same turn.

Even then, most turns store nothing: the default answer is "nothing worth remembering". A single conversation can add at most **three** memories.

### With the `/remember` command

When we want to be explicit, we type `/remember` in the chat followed by what should be kept:

```
/remember charts in this app are built with Plotly
```

The text is stored immediately, without going through the agent, and Pyplan confirms it in the chat.

### By hand, from the Memory tab

We can also write a memory ourselves. This is the way to seed an application with the conventions we already know, instead of waiting for the agent to discover them.

:::tip
Whenever Pyplan stores a memory, a note appears under the agent's answer — **Noted in this app's memory:** followed by the text, and a **Manage** link that takes us to this page. The agent itself never claims to have remembered anything: that note is the only confirmation that something was actually stored.
:::

## 3. What is never stored

Memory is about **how to work**, never about what the data says. Pyplan explicitly keeps out:

- Data, figures, results, or the current value of anything.
- Node, module or interface identifiers used as a record of what exists — the agent can look those up. An identifier is only kept when it is part of a real convention (*"assumptions always live in the `supuestos` module"*).
- What was done in one particular conversation, or the state of the task at hand.
- Anything personal about us or about anyone else.
- One-off requests (*"this time make it red"*).

## 4. Managing memories

The **Memory** tab lists what the application has learned, with the memory text, its **Category**, the **Agent** that owns it and the date it was last **Updated**.

- The **Agent** selector filters the list, and **All** shows every agent's memories together.
- The search box in the header looks through the text, the category and the agent.
- The counter next to the selector shows how full the application is. Because the limit is per agent, it reads *"3 of 100 memories of Pyplan Agent"* when an agent is selected, and the overall total when we are looking at all of them.

### Creating or editing a memory

1. We click **New memory**.
2. We select the **Agent** that will own it. The agent cannot be changed later — moving a memory means deleting it and writing it again.
3. We choose the **Category** and where it **Applies to**.
4. We write the **Memory** itself: one single idea, in the imperative, within the character counter shown below the field.
5. We click **Save**.

To edit one, we select it in the table and click **Edit memory**. To remove it, we use the delete action in the **Actions** column.

When a memory was learned by the agent rather than typed by us, the dialog also shows where it came from — *"Learned from a correction, in conversation…"* — so we can always trace a rule back to the conversation that produced it.

### Limits and review

Each agent can hold up to **100 memories** in an application, of at most **300 characters** each. Nothing is ever deleted automatically: once an agent reaches the limit, a new memory can only be added by replacing or deleting an existing one.

A memory that has gone untouched for a long time is highlighted in the **Updated** column, with a reminder to check whether it still holds. This is only a hint — the memory keeps working until we decide otherwise.

:::warning
Memories become part of the agent's instructions for **everyone who uses that application**. Before writing one by hand, it is worth checking that it is a rule of the application and not a preference of a single user.
:::

## 5. Availability and permissions

- **Reading** the memory of an application requires read access to it; **writing** requires edit access — exactly the same rule that governs app-level [Skills](./skills.md), and for the same reason: a memory becomes guidance for every user of that agent.
- Memory works only while an application is open. With no application open, the tab reminds us to open one.
- The whole feature can be switched **off per company**. When it is off, agents neither read nor write memories, but everything already stored is kept and comes back into use if it is switched on again.
- Only conversational agents keep a memory: the **Pyplan Agent** and the **Custom Agents** defined inside the application. The inline code assistants and the documentation agents do not.

## 6. Use cases

- **A convention discovered while working.** We tell the agent *"forms in this app never allow adding columns"*. It applies it right away, and from the next conversation onwards it already knows.
- **A limitation of the environment.** After the agent tries twice to install a library that is not available, the lesson is kept as a **Pitfall** so it does not try a third time next week.
- **Seeding a new application.** Before handing a model over to a team, we write a handful of memories by hand with the naming conventions and the calculation patterns the model must respect.
- **A rule that only applies to dashboards.** We store a style rule with **Applies to** set to **Interfaces**, so it guides the agent while it builds dashboards and stays out of the way while it writes code.

## Summary

With **Memory**, Pyplan's AI keeps what it learns about working in each application:

- Memories are one-sentence lessons, classified as **Workflow**, **Style** or **Pitfall**, and scoped to one agent and one section of the product.
- They are written automatically when a conversation actually teaches something, with the `/remember` command, or by hand from the **Memory** tab.
- They never contain the application's data — only how to work in it.
- Each agent holds up to 100 memories per application, and we can review, edit or delete any of them at any time.
