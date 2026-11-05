# Game System Research

[MIT](LICENSE) · v0.1.8

**Understand how an existing game system works—from evidence, not guesswork.**

Give the agent a game and a question. It researches the system and writes a clear explanation for developers who have never played the game: what players do, and how key rules combine to create choices, constraints and changes in play. Technical evidence stays separate.

## Install

Copy `skills/game-system-research` into your agent's skills directory (for Codex: `~/.agents/skills/game-system-research`).

On Windows, from the repository:

```powershell
$destination = Join-Path $env:USERPROFILE '.agents/skills/game-system-research'
if (Test-Path -LiteralPath $destination) { throw 'Review the existing installation before replacing it.' }
New-Item -ItemType Directory -Path (Split-Path $destination) -Force | Out-Null
Copy-Item -LiteralPath 'skills/game-system-research' -Destination $destination -Recurse
```

Updating the repository does not update a copied installation.

## Use

Open a new session in a separate research workspace:

```text
$game-system-research
Game: <title or installation folder>
Question: How does this system work?
```

Outputs are `report.md` and `evidence.md`, with unresolved questions stated explicitly. The game directory stays read-only by default. If the Skill isn't discovered, restart the agent or ask it to read the installed `SKILL.md`.

The optional native-code helper needs Node.js and Rizin/rz-ghidra; see [native analysis](skills/game-system-research/references/native-analysis.md).

[Skill instructions](skills/game-system-research/SKILL.md)
