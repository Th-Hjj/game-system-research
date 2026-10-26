# Install and use

## Install

Clone or download the repository. Copy `skills/game-system-research` into your agent's skills directory. For Codex, use `~/.agents/skills/game-system-research`.

On Windows, run from the repository:

```powershell
$destination = Join-Path $env:USERPROFILE '.agents/skills/game-system-research'
if (Test-Path -LiteralPath $destination) { throw 'Review the existing installation before replacing it.' }
New-Item -ItemType Directory -Path (Split-Path $destination) -Force | Out-Null
Copy-Item -LiteralPath 'skills/game-system-research' -Destination $destination -Recurse
```

To update, review local changes before replacing the installed copy. Updating the repository alone does not update a separately copied installation.

## Use

Open a new session in a separate research workspace:

```text
$game-system-research
Game: <title or installation folder>
Question: <the system you want to understand>
```

The agent can locate the game from installation manifests; provide its path if needed. No engine name or tool plan is required.

Results are saved as `report.md` and `evidence.md`. The game directory stays read-only by default; runtime experiments need suitable authorization and isolation because launching the game can write saves or configuration.

If the Skill is not discovered, restart the agent or ask it to read the installed `SKILL.md`. Explicit loading is a fallback, not proof of automatic discovery. Other compatible agents may use different installation paths.

## Optional native-code helper

The bundled helper needs Node.js and a compatible Rizin/rz-ghidra setup. It exports selected functions; it does not locate them or install tools. See [native analysis](../skills/game-system-research/references/native-analysis.md) for usage and dependencies.
