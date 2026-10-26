---
name: game-system-research
description: Investigate an existing game system from a game directory and research question, then explain how its parts work together in play through a concise, evidence-backed report. Use for gameplay, AI, movement, interaction or physics research; keep the game directory read-only by default.
metadata:
  version: "0.1.6"
---

# Game System Research

The input is **a game directory and a research question**. The core deliverable is a short, readable explanation of the target system as a whole: how its parts interact and what this changes in play. Make it useful to game designers without requiring technical knowledge. The user need not supply an engine, function names or a tool plan.

Code analysis, decompilation, data extraction, public references and runtime experiments are evidence channels. Stay focused on the target system; do not default to implementation tutorials, design lessons, migration or parameter-tuning advice, or speculation about the original developers' intentions.

## Start from the question and choose a route from evidence

Clarify the behaviors and situations the user wants to understand, then identify the architecture from local files. Installation manifests may help locate the game; ask only for information you cannot determine independently. Reuse existing research and preserve the build, sample identity and key locations to avoid repeating work.

Keep the game directory read-only by default. Put sample copies, tools, logs and reports in a separate workspace. Launching a game may write configuration or saves, so runtime experiments must fit existing authorization and isolation arrangements. Do not expand a focused question into reverse engineering the entire game.

Choose the shortest useful route for the files and question: confirm where scripts or configuration are actually used; check runtime data sources for managed code; inspect resource indexes before extracting selected items; narrow native modules through logs, types or attributed signatures before examining local implementation. Read the [native-analysis reference](references/native-analysis.md) when that route is useful, without making its tools mandatory for every game.

Prefer existing tools. When one is missing, verify its official source and dependencies, then check that it can parse a relevant sample. If a tool or candidate entry fails, change course based on the failure. When a key behavior depends on runtime state, design a small experiment that distinguishes competing explanations.

## Build an explanation from evidence

Trace findings from triggers and state through their effects in play. Ask how important rules connect: what information, resources or opportunities change, and how that affects what can happen next. Follow a representative situation when it helps connect the parts. Names, strings and isolated constants are leads, not explanations.

Check object differences, conditions, values, probabilities, ordering and exceptions that could change the answer. Distinguish intermediate calculations from final results and local limits from global rules; inspect later processing when it may alter the result. Decompilers can misidentify types, parameters and boundaries, so cross-check important details against instructions, call sites, data or runtime records.

In supporting materials, distinguish local static support, runtime observations, public references and unconfirmed explanations. An SDK, another version or a series-wide explanation cannot replace current-game evidence. Offline calculations are not gameplay measurements; supported relationships do not by themselves establish player experience or developer intent.

Move to the report once the evidence supports a connected explanation and its important rules. Investigate gaps that affect that understanding before collecting peripheral details. When repeated attempts yield no new evidence, record the missing answer rather than filling it with a conventional implementation or a guess.

## Explain the system

Organize **the main explanation around how the system shapes play**: connect what players encounter, know and can do to how the parts interact and change subsequent possibilities. Use a representative situation to carry this explanation when helpful. Introduce parts and rules where they explain these connections, rather than giving each feature its own inventory after a short overview.

Use systems thinking as a reasoning aid, not required report terminology. Where a meaningful game loop exists, explain what carries into the next interaction; describe feedback only when a result affects an earlier condition. Add a small system diagram only when it makes relationships easier to understand. Neither loops nor diagrams are required.

Keep the rules, values and exceptions that change the reader's understanding of what can happen. Develop the central explanation before adding useful reference detail; do not try to cover every evidence item. A brief example or compact table may resolve a detail without interrupting the account.

Write a short, flowing article in everyday game language. Explain unfamiliar concepts in context and state concrete consequences. Use headings where they help reading, without a fixed template or length quota. Remove repeated explanations, peripheral cases and closing recaps; preserve the reasoning needed to understand the system.

Translate technical findings into what happens in play. Keep implementation identifiers, extracted-data inventories, evidence classifications and verification records in the evidence. Use unobtrusive citations and express consequential uncertainty briefly as what remains unknown about play; collect only material open questions at the end.

Save the report as `report.md` in the case directory by default. Use `evidence.md` and any necessary notes for file identities, locations, derivations, tools and commands, validation status and gaps. Keep raw samples and tool caches in the research workspace, outside the distributed Skill.

## Decide whether the work is complete

Check whether a reader can explain how the parts work together, follow a typical situation from action to consequence, and predict what a relevant change would affect, within the evidence's limits. The main explanation should stand on its own before supplementary details. Revise gaps and unnecessary length; neither a rule count nor an added overview demonstrates understanding. Keep this check internal, not as a report checklist. Do not measure success by whether readers could design their own system.

Record format checks, tool execution, research conclusions and actual reader understanding separately; none substitutes for another. Present the report or briefly describe changes as requested, retaining detailed validation records in the supporting materials.
