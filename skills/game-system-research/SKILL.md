---
name: game-system-research
description: Research an existing game system from a game directory and question, then write a clear, evidence-backed explanation that develops how the system works as a whole for developers unfamiliar with the game. Use for gameplay, AI, movement, interaction or physics research; keep the game directory read-only by default.
metadata:
  version: "0.1.8"
---

# Game System Research

The input is **a game directory and a research question**. Write a clear, engaging system explanation for game developers who have never played the game. Help them picture what players do and understand how key rules work together to create choices, constraints and changes in play. Develop that understanding throughout the article, in readable language without requiring technical knowledge. The user need not supply an engine, function names or a tool plan.

Code analysis, decompilation, data extraction, public references and runtime experiments are evidence channels. Stay focused on the target system; do not default to implementation tutorials, design lessons, migration or parameter-tuning advice, or speculation about the original developers' intentions.

## Start from the question and choose a route from evidence

Clarify the behaviors and situations the user wants to understand, then identify the architecture from local files. Installation manifests may help locate the game; ask only for information you cannot determine independently. Reuse existing research and preserve the build, sample identity and key locations to avoid repeating work.

Keep the game directory read-only by default. Put sample copies, tools, logs and reports in a separate workspace. Launching a game may write configuration or saves, so runtime experiments must fit existing authorization and isolation arrangements. Do not expand a focused question into reverse engineering the entire game.

Choose the shortest useful route for the files and question: confirm where scripts or configuration are actually used; check runtime data sources for managed code; inspect resource indexes before extracting selected items; narrow native modules through logs, types or attributed signatures before examining local implementation. Read the [native-analysis reference](references/native-analysis.md) when that route is useful, without making its tools mandatory for every game.

Prefer existing tools. When one is missing, verify its official source and dependencies, then check that it can parse a relevant sample. If a tool or candidate entry fails, change course based on the failure. When a key behavior depends on runtime state, design a small experiment that distinguishes competing explanations.

## Build an explanation from evidence

Early in the investigation, sketch a provisional account of an ordinary interaction: the player's goal, available actions and what changes afterward. Identify actions, objects or state changes this account assumes without explaining, and use those gaps to choose the next evidence to seek before pursuing finer details. Trace important rules through their effects on information, resources or opportunities and what can happen next. Names, strings and isolated constants are leads, not explanations.

Check object differences, conditions, values, probabilities, ordering and exceptions that could change the answer. Distinguish intermediate calculations from final results and local limits from global rules; inspect later processing when it may alter the result. Decompilers can misidentify types, parameters and boundaries, so cross-check important details against instructions, call sites, data or runtime records.

In supporting materials, distinguish local static support, runtime observations, public references and unconfirmed explanations. An SDK, another version or a series-wide explanation cannot replace current-game evidence. Offline calculations are not gameplay measurements; supported relationships do not by themselves establish player experience or developer intent.

Move to the report once the evidence supports a connected explanation at the requested scope, not just the opening sketch: investigate missing relationships between the main parts before peripheral details. When repeated attempts yield no new evidence, record the missing answer rather than filling it with a conventional implementation or a guess.

## Explain the system

**Make a fully developed explanation of the system the main body, not a brief overview followed by a mechanism catalogue.** Establish what the player is trying to do and how ordinary play works, then progressively explain how the main parts operate together. Introduce unfamiliar objects and key rules within this account. Let the reader's emerging questions determine what comes next, rather than following evidence headings or giving every finding its own section.

Develop important relationships rather than merely naming them: explain why a player might choose one action over another, how interacting rules produce the result, and how that result changes subsequent decisions. Follow concrete situations far enough to make these connections understandable. Where central to the question, explain how play continues when an opportunity fails or conditions change, and how preparation, resources or progression reshape later interactions. These are ways to deepen the account, not mandatory categories. One successful sequence or a sentence of "gameplay significance" after each mechanism does not explain the whole system.

Give the central explanation the space warranted by the question's breadth and complexity. **Concise means free of repetition and irrelevant digressions, not as short as possible.** Develop necessary reasoning before trimming; do not compress it into a synopsis to preserve room for peripheral rules. More words alone do not add depth. Use headings and examples to sustain a flowing article in everyday game language, without a fixed template, length quota or required overview section.

Use systems thinking as a reasoning aid, not required report terminology. Where a meaningful game loop exists, explain what carries into the next interaction; describe feedback only when a result affects an earlier condition. A small system diagram or compact table can clarify supported relationships, but cannot replace their explanation. Neither loops nor diagrams are required.

Check the connected draft against the evidence, preserving rules, values and exceptions whose omission would materially misrepresent it. Keep other findings in the evidence; a player-visible effect alone does not earn a paragraph. Establish typical behavior before necessary qualifications. Remove repetition, incidental corrections and research commentary, not the reasoning that connects the parts. Read the [writing excerpt](references/writing-example.md) for an illustration of developing a relationship, not a target report length or a complete report template.

Use unobtrusive citations. Keep implementation identifiers, extracted-data inventories, evidence classifications and verification records in the evidence. Briefly state uncertainty when it limits the main explanation; keep peripheral unknowns with the evidence. Never invent missing relationships to make the account flow.

Save the report as `report.md` in the case directory by default. Use `evidence.md` and any necessary notes for file identities, locations, derivations, tools and commands, validation status and gaps. Keep raw samples and tool caches in the research workspace, outside the distributed Skill.

## Decide whether the work is complete

Review the whole article first, as a developer unfamiliar with the game and without consulting the evidence. Does sustained system explanation carry the main body, or does it give way to compressed mechanism entries after the introduction? Check that the relationships central to the requested scope receive enough development to understand, not just a mention. A longer opening, mechanism coverage, a diagram or one ideal sequence cannot substitute for this.

Using only what the report actually explains, reconstruct how ordinary play unfolds, why a meaningful alternative would change it, and what consequences carry forward where relevant. Identify the passages that support this account; do not supply missing links from prior game knowledge. If the reader must assemble isolated rules or guess how a key transition works, expand and connect the explanation before cutting length. Then check evidence, necessary conditions, clarity and repetition. Adding unsupported interpretation or padding is not a repair.

Keep these checks internal, not as report headings or a checklist. Do not measure success by word count, number of mechanisms covered or whether readers could design their own system. Record format checks, tool execution, research conclusions and actual reader understanding separately; internal review is not a reader test. Present the report or briefly describe changes as requested, retaining detailed validation records in the supporting materials.
