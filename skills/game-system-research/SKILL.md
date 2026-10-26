---
name: game-system-research
description: Investigate a game system from a game directory and research question, then explain its evidence-backed rules, conditions and important exceptions in a concise, readable report. Use for gameplay, AI, movement, interaction or physics research; keep the game directory read-only by default.
metadata:
  version: "0.1.5"
---

# Game System Research

The input is **a game directory and a research question**. The sole core deliverable is a concise, fluent system research report that explains what the system is, how it works, and its rules, conditions and important exceptions without requiring technical knowledge. The user need not supply an engine, function names or a tool plan.

Code analysis, decompilation, data extraction, public references and runtime experiments are evidence channels. Stay focused on the target system; do not default to implementation tutorials, design lessons, migration or parameter-tuning advice, or speculation about the original developers' intentions.

## Start from the question and choose a route from evidence

Clarify the behaviors and situations the user wants to understand, then identify the architecture from local files. Installation manifests may help locate the game; ask only for information you cannot determine independently. Reuse existing research and preserve the build, sample identity and key locations to avoid repeating work.

Keep the game directory read-only by default. Put sample copies, tools, logs and reports in a separate workspace. Launching a game may write configuration or saves, so runtime experiments must fit existing authorization and isolation arrangements. Do not expand a focused question into reverse engineering the entire game.

Choose the shortest useful route for the files and question: confirm where scripts or configuration are actually used; check runtime data sources for managed code; inspect resource indexes before extracting selected items; narrow native modules through logs, types or attributed signatures before examining local implementation. Read the [native-analysis reference](references/native-analysis.md) when that route is useful, without making its tools mandatory for every game.

Prefer existing tools. When one is missing, verify its official source and dependencies, then check that it can parse a relevant sample. If a tool or candidate entry fails, change course based on the failure. When a key behavior depends on runtime state, design a small experiment that distinguishes competing explanations.

## Turn technical findings into supported rules

Ask what rule a finding reveals, when it applies and how it changes the outcome. Names, strings, similarly named functions and isolated constants are leads. Trace key conclusions to their triggers, state sources and the point where their effects take hold.

Check object differences, conditions, values, probabilities, ordering and exceptions that could change the answer. Distinguish intermediate calculations from final results and local limits from global rules; inspect later processing when it may alter the result. Decompilers can misidentify types, parameters and boundaries, so cross-check important details against instructions, call sites, data or runtime records.

Evidence materials should distinguish local static support, runtime observations, public references and unconfirmed explanations. An SDK, another version or a series-wide explanation cannot replace evidence from the current game. Offline calculations are not gameplay measurements.

Move to the report once the evidence supports both the system's overall operation and its important rules. If you can list checks and values but cannot explain how they connect, first review the evidence for the missing relationship. Pursue additional investigation only for gaps that affect this understanding, staying within the research question. When repeated attempts yield no new evidence, record the obstacle and missing answer rather than filling the gap with a conventional implementation or a guess.

## Explain the system

Start with **what the system is and how its main parts work together**, not a list of rules or a summary of internal checks. For a reader unfamiliar with it, describe the relevant situation, what the player or other entities do, what happens as a result, and how the main parts connect. Explain only the relationships needed for the question, using connected prose or a representative situation. Ground this overview in evidence too; do not fill gaps with assumed purposes or an unsupported story.

Develop **important rules → open questions and blockers** from that overview. Explain how each group of rules qualifies or changes the behavior already introduced, rather than leaving the reader to assemble the system from isolated conditions and tables. Define unfamiliar concepts before using their parameters. Adapt headings, length and emphasis to the subject; do not require fixed sections or pad a narrow answer with a generic introduction.

Give the reader a concrete understanding: state a rule, explain an outcome or clarify where it applies. Do not substitute phrases such as “additional handling” or “the situation differs” for an explanation. Judge concision by readability; retain meaningful conditions, values and exceptions, using examples or small tables when helpful.

Describe the system directly rather than following the investigation or function-call order. Keep technical details separately, with only necessary lightweight references in the report. Briefly qualify important uncertainty in a rule itself; avoid interrupting the prose with repeated research-method or verification-status statements. Put important unanswered questions at the end instead of presenting a vague assertion as a settled conclusion.

Save the report as `report.md` in the case directory by default. Use `evidence.md` and any necessary notes for file identities, locations, derivations, tools and commands, validation status and gaps. Keep raw samples and tool caches in the research workspace, outside the distributed Skill.

## Decide whether the work is complete

Judge completion by supported rules, navigable structure, concise and fluent language, and whether readers can accurately understand the target system without reading code. As an editorial check, read only the opening: could a reader unfamiliar with the system explain its basic operation and how its main parts relate? Then check whether the detailed rules refine that understanding. A catalogue of correct facts alone is not sufficient. Typical situations or user feedback can expose explanatory gaps. Do not measure delivery by functions located, algorithms recovered or whether readers could design their own system.

Record format checks, tool execution, research conclusions and actual reader understanding separately; none substitutes for another. Present the report or briefly describe changes as requested, retaining detailed validation records in the supporting materials.
