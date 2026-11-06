---
name: game-system-research
description: >-
  Investigate how an existing game or current game project actually works.
  Use for questions about gameplay rules, AI, movement, interaction or physics;
  verifying claimed or unexpected behavior; and understanding unfamiliar or
  AI-written game code, even when the user does not explicitly ask for research.
  Ground answers in available implementation evidence and explain at the requested
  scope. Not for pure ideation or general programming questions.
metadata:
  version: "0.2.0"
---

# Game System Research

Start from **a question about a specific game or project**. Identify the target from the current workspace, supplied files and conversation; the user need not provide a directory, engine, function names or a tool plan when the relevant context is already available. Match the response to the question, from a direct mechanism answer to a full system explanation, using the same evidence standard for both.

Before making implementation-specific claims, inspect the relevant current implementation and data, or reuse verified evidence that still applies to the current state. Treat familiar game conventions, documentation, comments and earlier assistant explanations as leads, not proof of current behavior. If implementation evidence is unavailable, state what supports the answer and what remains unverified.

Code analysis, decompilation, data extraction, public references and runtime experiments are evidence channels. Stay focused on the target system; do not default to implementation tutorials, design lessons, migration or parameter-tuning advice, or speculation about the original developers' intentions.

## Start from the question and choose a route from evidence

Identify the behaviors and situations the user wants to understand and the architecture of the relevant files. Installation manifests may help locate a game; ask only for information you cannot determine independently. Preserve the build, sample or project-state identity and key locations so evidence can be checked and reused. Account for relevant local changes before treating a repository revision or earlier research as current.

Keep investigation read-only by default; implementation changes follow the user's task. Put extracted samples, tools and logs outside the game files, and use the task's workspace for any requested reports. Launching a game may write configuration or saves, so runtime experiments must fit existing authorization and isolation arrangements. Do not expand a focused question into reverse engineering the entire game.

Work from local files. Do not connect to online services, bypass anti-cheat, DRM or encryption you were not given access to, or attach to a running online client. Quote only the code and data needed as evidence. When an answer depends on server-side logic or content you cannot access this way, state that part as unverified.

Choose the shortest useful route for the files and question. When readable source is available, start there: follow the relevant active entry through the code and data actually used to the behavior being explained. Check scene or prefab bindings and configuration overrides where they could change the answer; finding an unused implementation or a default value is not enough.

For other game files, confirm where scripts or configuration are actually used; check runtime data sources for managed code; inspect resource indexes before extracting selected items; narrow native modules through logs, types or attributed signatures before examining local implementation. Read the [managed-and-asset reference](references/managed-and-asset-analysis.md) for managed assemblies, engine archives and scripted engines, and the [native-analysis reference](references/native-analysis.md) when native code must be examined, without making their tools mandatory for every game.

Prefer existing tools. When one is missing, verify its official source and dependencies, then check that it can parse a relevant sample. If a tool or candidate entry fails, change course based on the failure. When a key behavior depends on runtime state, design a small experiment that distinguishes competing explanations.

## Build an explanation from evidence

Early in the investigation, sketch a provisional account at the requested scope: what starts the behavior, which actions and state matter, and what changes afterward. For broader systems, develop the player's goal, available actions and how results affect later play. Identify actions, objects or state changes this account assumes without explaining, and use those gaps to choose the next evidence before pursuing finer details. Names, strings and isolated constants are leads, not explanations.

Check object differences, conditions, values, probabilities, ordering and exceptions that could change the answer. Distinguish intermediate calculations from final results and local limits from global rules; inspect later processing when it may alter the result. Decompilers can misidentify types, parameters and boundaries, so cross-check important details against instructions, call sites, data or runtime records.

Distinguish local static support, runtime observations, public references and unconfirmed explanations. An SDK, another version or a series-wide explanation cannot replace current-game evidence. Static inspection is not a runtime test, and offline calculations are not gameplay measurements. Supported relationships do not by themselves establish player experience or developer intent. In generated or evolving projects, explain the current supported behavior; identify a discrepancy with intended behavior only when that intent is also established.

Move to the response once the evidence supports a connected explanation at the requested scope: investigate missing causal links before peripheral details. Stop when the question and conditions that could materially change its answer are covered. When repeated attempts yield no new evidence, state the missing answer rather than filling it with a conventional implementation or a guess.

## Explain the system

For a focused question, answer directly with the supported behavior, its cause, decisive conditions and any uncertainty that limits the answer. Include enough context to make the explanation understandable. When explaining unfamiliar project code, use a few relevant file or function locations to connect behavior to implementation; do not substitute a class inventory or line-by-line walkthrough for explaining how it works.

### Full system explanations

For broad system questions or requested reports, write for developers unfamiliar with the game.

**Make a fully developed explanation of the system the main body, not a brief overview followed by a mechanism catalogue.** Start with what the player is trying to do and how ordinary play works, then explain how the main parts operate together, introducing unfamiliar objects and key rules where the reader needs them. Let the reader's emerging questions, not evidence headings, decide the order.

Develop relationships rather than naming them: why a player would choose one action over another, how interacting rules produce the result, and how that result changes later decisions. Follow concrete situations far enough to show this. Where central to the question, cover what happens when an opportunity fails or conditions change, and what carries into later play. One successful sequence, or a sentence of "gameplay significance" after each mechanism, does not explain a system. A diagram, table or loop can support the explanation but cannot replace it, and none is required.

**Concise means free of repetition and irrelevant digressions, not as short as possible.** Give the central explanation the space the question needs; move peripheral findings to the evidence instead of compressing the reasoning that connects the parts. Preserve rules, values and exceptions whose omission would misrepresent the system, and establish typical behavior before qualifications. Use everyday game language without a fixed template. The [writing excerpt](references/writing-example.md) illustrates developing one relationship; it is not a length target or a template.

### Sources and deliverables

Use unobtrusive citations and include source locations needed to check a claim or navigate unfamiliar code. Keep other implementation identifiers, extracted-data inventories and detailed verification records in supporting material when needed. State uncertainty when it limits the explanation. Never invent missing relationships to make the account flow.

Answer focused questions in the conversation by default. When the task calls for a saved research deliverable, save `report.md` in the case directory and use `evidence.md` for file identities, locations, derivations, tools and commands, validation status and gaps. Follow an existing requested format or destination. Keep raw samples and tool caches in the research workspace, outside the distributed Skill.

## Decide whether the work is complete

Check that the actual question is answered, its decisive conditions and causal links are supported, and important limits are clear. A focused answer is complete when the reader can follow the asked-about behavior without guessing a step; it need not explain the whole game.

For a full system explanation, reread the report as a developer unfamiliar with the game, without consulting the evidence. Using only what it says, reconstruct how ordinary play unfolds, why a meaningful alternative changes it, and what carries forward. If the reader must assemble isolated rules or guess a key transition, expand and connect the explanation before cutting length; padding or unsupported interpretation is not a repair. Then check evidence, conditions, clarity and repetition.

Keep these checks internal, not as headings or a checklist. Success is reader understanding, not word count or the number of mechanisms covered; an internal review is not a reader test.
