# Install and use

## Install the Skill

Clone or download this repository. Copy `skills/game-system-research` into your agent's skills directory, keeping the folder name intact. For Codex, use the user-level `~/.agents/skills/` directory, or a project's `.agents/skills/` directory.

On Windows, from this repository:

```powershell
$destination = Join-Path $env:USERPROFILE '.agents/skills/game-system-research'
if (Test-Path -LiteralPath $destination) { throw 'An installation already exists; review it before replacing it.' }
New-Item -ItemType Directory -Path (Split-Path $destination) -Force | Out-Null
Copy-Item -LiteralPath 'skills/game-system-research' -Destination $destination -Recurse
```

Open a new local Codex session in a separate research workspace and invoke `$game-system-research`. The Skill and project documentation are maintained in English. Other Agent Skills-compatible hosts may require different installation paths and have not been tested here.

If the Skill does not appear, restart the host or explicitly ask it to read the installed `SKILL.md`. Explicit file loading does not test automatic discovery. [Codex skill documentation](https://learn.chatgpt.com/docs/build-skills)

## Ask a focused question

```text
$game-system-research
Game folder: <absolute path to your installed game>
Research how enemies choose between continuing an attack, staggering and fleeing after being hit.
Explain the rules and important exceptions in English.
Keep the installation read-only; write all analysis in the current workspace.
```

The agent chooses an approach from the files it finds. It should produce `report.md` for the system explanation and `evidence.md` for the supporting research. Starting the game may write configuration or saves, so runtime work needs an appropriate isolated setup.

## Optional native-code helper

The Skill itself has no fixed engine or mandatory reverse-engineering tool. The bundled helper requires Node.js and an existing Cutter-style Rizin distribution with rz-ghidra and compiled Sleigh data. No third-party Node packages are needed.

```text
node skills/game-system-research/scripts/rizin-export.cjs --help
node skills/game-system-research/scripts/rizin-export.cjs --check <tool-root>
node skills/game-system-research/scripts/rizin-export.cjs <tool-root> <binary-copy> <new-output-dir> <verified-0xVA>
```

The helper exports only the function entries you supply. It does not discover them, install tools, execute the game or prove that generated pseudocode is correct. It preserves diagnostics and input hashes, and rejects an output directory containing files. See the [native-analysis reference](../skills/game-system-research/references/native-analysis.md) for supported layout and limitations.

## Check this repository

```text
node scripts/check-package.cjs
node --check skills/game-system-research/scripts/rizin-export.cjs
```

The package check validates required files, local Markdown references, Skill identity and publication hygiene. It is not a gameplay test or a decompiler test.
