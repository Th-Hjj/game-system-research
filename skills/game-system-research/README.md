# game-system-research v0.1.5

An Agent Skill that turns a game directory and a focused question into a readable, evidence-backed system report.

Copy this folder to your host's skills directory. For Codex, the user-level location is `~/.agents/skills/game-system-research`. In a new research workspace, invoke:

```text
$game-system-research
Game folder: <path to your installed game>
Question: <the system or behavior you want to understand>
Keep the installation read-only and write the report in this workspace.
```

The Skill instructions and project documentation are maintained in English. The agent chooses a research route from the files it finds. Reports first explain what happens and how the system's main parts connect, then develop its important rules and significant open questions. A list of conditions or an internal-check summary is not a substitute for that overview.

`SKILL.md` contains the methodology. `references/native-analysis.md` is read only when native-code analysis is useful. `scripts/rizin-export.cjs` is an optional selected-function export helper requiring Node.js and a compatible Rizin/rz-ghidra installation; it does not find functions or install tools.

The main deliverable is the system report. Detailed evidence and validation status are saved separately. Scope, rules, conditions and exceptions matter more than recovering a large amount of code.

Project, installation details and case study: [Th-Hjj/game-system-research](https://github.com/Th-Hjj/game-system-research).

Original project materials are distributed under the repository's MIT license. Game files and third-party tools are not included.
