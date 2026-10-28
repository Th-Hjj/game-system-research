---
name: game-system-research
description: Research an existing game system from a game directory and question, then write a concise, evidence-backed explanation for developers unfamiliar with the game. Use for gameplay, AI, movement, interaction or physics research; keep the game directory read-only by default.
metadata:
  version: "0.1.7"
---

# Game System Research

The input is **a game directory and a research question**. Write a clear, engaging system explanation for game developers who have never played the game. Help them picture what players do and understand how key rules work together to create choices, constraints and changes in play. Keep it concise and readable without technical knowledge. The user need not supply an engine, function names or a tool plan.

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

Move to the report once the evidence supports this basic account and its important rules. When repeated attempts yield no new evidence, record the missing answer rather than filling it with a conventional implementation or a guess.

## Explain the system

Before drafting, choose the central explanation a newcomer needs to understand this system. Build the article around it, giving enough context to picture the player's goal, available actions and their consequences. Introduce unfamiliar objects and rules as they develop **how the system works in play**. Let the reader's emerging questions determine what comes next; do not use evidence headings or individual findings as the outline.

Use systems thinking as a reasoning aid, not required report terminology. Where a meaningful game loop exists, explain what carries into the next interaction; describe feedback only when a result affects an earlier condition. Add a small system diagram only when it makes relationships easier to understand. Neither loops nor diagrams are required.

Draft the connected account from supported facts needed to explain ordinary play and answer the question. Then check that draft against the evidence, adding conditions, values or exceptions whose omission would materially misrepresent it. Include a finding only when it develops this explanation; having a player-visible effect alone does not earn it a paragraph. Keep other findings in the evidence. A brief example or compact table may clarify a relationship.

Write a short, flowing article in everyday game language. Let each paragraph advance understanding through concrete actions and consequences. Establish typical behavior before necessary qualifications; avoid interrupting it with incidental corrections or research commentary. Use headings where helpful, without a fixed template or length quota. Remove repetition and closing recaps. Read the [short writing example](references/writing-example.md) for an illustration of selecting and connecting facts; choose the structure for the target system.

Use technical evidence to check the article's claims about play. Keep implementation identifiers, extracted-data inventories, evidence classifications and verification records in the evidence. Use unobtrusive citations. Briefly state uncertainty when it limits the main explanation; keep research-status commentary and peripheral unknowns with the evidence.

Save the report as `report.md` in the case directory by default. Use `evidence.md` and any necessary notes for file identities, locations, derivations, tools and commands, validation status and gaps. Keep raw samples and tool caches in the research workspace, outside the distributed Skill.

## Decide whether the work is complete

Read the report as a developer unfamiliar with the game, without consulting the evidence. Can this reader picture an ordinary interaction, explain how the parts work together and predict what a relevant change would affect? Repair assumed knowledge and missing basic rules within the evidence's limits. For each paragraph, check what it adds to the central explanation; remove passages that merely translate a finding or qualify an unrelated edge case. Neither a rule count nor an added overview demonstrates understanding. Keep this check internal, not as report headings or a checklist. Do not measure success by whether readers could design their own system.

Record format checks, tool execution, research conclusions and actual reader understanding separately; none substitutes for another. Present the report or briefly describe changes as requested, retaining detailed validation records in the supporting materials.
