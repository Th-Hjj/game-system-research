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
  version: "0.1.9"
---

# Game System Research

Start from **a question about a specific game or project**. Identify the target from the current workspace, supplied files and conversation; the user need not provide a directory, engine, function names or a tool plan when the relevant context is already available. Match the response to the question, from a direct mechanism answer to a full system explanation, using the same evidence standard for both.

Before making implementation-specific claims, inspect the relevant current implementation and data, or reuse verified evidence that still applies to the current state. Treat familiar game conventions, documentation, comments and earlier assistant explanations as leads, not proof of current behavior. If implementation evidence is unavailable, state what supports the answer and what remains unverified.

Code analysis, decompilation, data extraction, public references and runtime experiments are evidence channels. Stay focused on the target system; do not default to implementation tutorials, design lessons, migration or parameter-tuning advice, or speculation about the original developers' intentions.

## Start from the question and choose a route from evidence

Identify the behaviors and situations the user wants to understand and the architecture of the relevant files. Installation manifests may help locate a game; ask only for information you cannot determine independently. Preserve the build, sample or project-state identity and key locations so evidence can be checked and reused. Account for relevant local changes before treating a repository revision or earlier research as current.

Keep investigation read-only by default; implementation changes follow the user's task. Put extracted samples, tools and logs outside the game files, and use the task's workspace for any requested reports. Launching a game may write configuration or saves, so runtime experiments must fit existing authorization and isolation arrangements. Do not expand a focused question into reverse engineering the entire game.

Choose the shortest useful route for the files and question. When readable source is available, start there: follow the relevant active entry through the code and data actually used to the behavior being explained. Check scene or prefab bindings and configuration overrides where they could change the answer; finding an unused implementation or a default value is not enough.

For other game files, confirm where scripts or configuration are actually used; check runtime data sources for managed code; inspect resource indexes before extracting selected items; narrow native modules through logs, types or attributed signatures before examining local implementation. Read the [native-analysis reference](references/native-analysis.md) when that route is useful, without making its tools mandatory for every game.

Prefer existing tools. When one is missing, verify its official source and dependencies, then check that it can parse a relevant sample. If a tool or candidate entry fails, change course based on the failure. When a key behavior depends on runtime state, design a small experiment that distinguishes competing explanations.

## Build an explanation from evidence

Early in the investigation, sketch a provisional account at the requested scope: what starts the behavior, which actions and state matter, and what changes afterward. For broader systems, develop the player's goal, available actions and how results affect later play. Identify actions, objects or state changes this account assumes without explaining, and use those gaps to choose the next evidence before pursuing finer details. Names, strings and isolated constants are leads, not explanations.

Check object differences, conditions, values, probabilities, ordering and exceptions that could change the answer. Distinguish intermediate calculations from final results and local limits from global rules; inspect later processing when it may alter the result. Decompilers can misidentify types, parameters and boundaries, so cross-check important details against instructions, call sites, data or runtime records.

Distinguish local static support, runtime observations, public references and unconfirmed explanations. An SDK, another version or a series-wide explanation cannot replace current-game evidence. Static inspection is not a runtime test, and offline calculations are not gameplay measurements. Supported relationships do not by themselves establish player experience or developer intent. In generated or evolving projects, explain the current supported behavior; identify a discrepancy with intended behavior only when that intent is also established.

Move to the response once the evidence supports a connected explanation at the requested scope: investigate missing causal links before peripheral details. Stop when the question and conditions that could materially change its answer are covered. When repeated attempts yield no new evidence, state the missing answer rather than filling it with a conventional implementation or a guess.

## Explain the system

For a focused question, answer directly with the supported behavior, its cause, decisive conditions and any uncertainty that limits the answer. Include enough context to make the explanation understandable. When explaining unfamiliar project code, use a few relevant file or function locations to connect behavior to implementation; do not substitute a class inventory or line-by-line walkthrough for explaining how it works.

### Full system explanations

For broad system questions or requested reports, write for developers unfamiliar with the game and apply the following guidance.

**Make a fully developed explanation of the system the main body, not a brief overview followed by a mechanism catalogue.** Establish what the player is trying to do and how ordinary play works, then progressively explain how the main parts operate together. Introduce unfamiliar objects and key rules within this account. Let the reader's emerging questions determine what comes next, rather than following evidence headings or giving every finding its own section.

Develop important relationships rather than merely naming them: explain why a player might choose one action over another, how interacting rules produce the result, and how that result changes subsequent decisions. Follow concrete situations far enough to make these connections understandable. Where central to the question, explain how play continues when an opportunity fails or conditions change, and how preparation, resources or progression reshape later interactions. These are ways to deepen the account, not mandatory categories. One successful sequence or a sentence of "gameplay significance" after each mechanism does not explain the whole system.

Give the central explanation the space warranted by the question's breadth and complexity. **Concise means free of repetition and irrelevant digressions, not as short as possible.** Develop necessary reasoning before trimming; do not compress it into a synopsis to preserve room for peripheral rules. More words alone do not add depth. Use headings and examples to sustain a flowing article in everyday game language, without a fixed template, length quota or required overview section.

Use systems thinking as a reasoning aid, not required report terminology. Where a meaningful game loop exists, explain what carries into the next interaction; describe feedback only when a result affects an earlier condition. A small system diagram or compact table can clarify supported relationships, but cannot replace their explanation. Neither loops nor diagrams are required.

Check the connected draft against the evidence, preserving rules, values and exceptions whose omission would materially misrepresent it. Keep other findings in the evidence; a player-visible effect alone does not earn a paragraph. Establish typical behavior before necessary qualifications. Remove repetition, incidental corrections and research commentary, not the reasoning that connects the parts. Read the [writing excerpt](references/writing-example.md) for an illustration of developing a relationship, not a target report length or a complete report template.

### Sources and deliverables

Use unobtrusive citations and include source locations needed to check a claim or navigate unfamiliar code. Keep other implementation identifiers, extracted-data inventories and detailed verification records in supporting material when needed. State uncertainty when it limits the explanation. Never invent missing relationships to make the account flow.

Answer focused questions in the conversation by default. When the task calls for a saved research deliverable, save `report.md` in the case directory and use `evidence.md` for file identities, locations, derivations, tools and commands, validation status and gaps. Follow an existing requested format or destination. Keep raw samples and tool caches in the research workspace, outside the distributed Skill.

## Decide whether the work is complete

Check that the actual question is answered, the decisive conditions and causal links are supported, and any important limits are clear. A focused answer is complete when the reader can understand the asked-about behavior without guessing a missing step; it does not require an explanation of the whole game.

For a full system explanation, review the whole article as a developer unfamiliar with the game and without consulting the evidence. Does sustained system explanation carry the main body, or does it give way to compressed mechanism entries after the introduction? Check that the relationships central to the requested scope receive enough development to understand, not just a mention. A longer opening, mechanism coverage, a diagram or one ideal sequence cannot substitute for this.

For that review, use only what the explanation actually says to reconstruct how ordinary play unfolds, why a meaningful alternative would change it, and what consequences carry forward where relevant. Identify the passages that support this account; do not supply missing links from prior game knowledge. If the reader must assemble isolated rules or guess how a key transition works, expand and connect the explanation before cutting length. Then check evidence, necessary conditions, clarity and repetition. Adding unsupported interpretation or padding is not a repair.

Keep these checks internal, not as answer headings or a checklist. Do not measure success by word count, number of mechanisms covered or whether readers could design their own system. Distinguish format checks, tool execution, research conclusions and actual reader understanding; internal review is not a reader test. Present the answer or report as requested, retaining detailed validation records with supporting materials when used.
