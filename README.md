# Game System Research

[MIT](LICENSE) · v0.1.9

有些大模型天天就知道偷懒，问他一个问题，他连游戏代码都不看就开始瞎编。这个skill能确保当你提出需要研究游戏内机制/系统相关的问题时，agent会认真的去研究游戏代码。
注：也可以用于“当你已经完全看不懂ai写了什么代码”的情况

**Understand how an existing game system works—from evidence, not guesswork.**

Ask about an existing game or the project already open in your workspace, including unfamiliar or AI-written game code. The agent checks the relevant implementation and data before explaining what the system actually does.

Focused questions get a direct answer with important conditions and source locations. Broader research develops a connected explanation for developers unfamiliar with the game: what players do, and how key rules combine to create choices, constraints and changes in play. Detailed technical evidence stays separate.

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

Ask naturally in your current project; implementation-specific questions do not need to name the Skill:

```text
Why does the player keep firing after I release the attack button?
How do enemy spawning and wave completion work together in this project?
```

For an explicit research request, provide the game or project and a question:

```text
$game-system-research
Game: <title, installation folder or source project>
Question: How does this system work?
```

Focused questions are answered in the conversation. Saved research deliverables use `report.md` and `evidence.md` by default, with unresolved questions stated explicitly. Research stays read-only by default; keep extracted samples and tool output in a separate workspace. If the Skill isn't discovered, ask the agent to read the installed `SKILL.md`.

The optional native-code helper needs Node.js and Rizin/rz-ghidra; see [native analysis](skills/game-system-research/references/native-analysis.md).

[Skill instructions](skills/game-system-research/SKILL.md)
