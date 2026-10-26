# Game System Research

[MIT](LICENSE) · v0.1.4

**Turn a game folder and a research question into an evidence-backed explanation of how a game system works.**

An Agent Skill for investigating mechanics through local files, targeted reverse engineering and, when appropriate, experiments. The result is a readable report about rules, conditions and exceptions, with technical evidence kept separately.

**[Read the Portal case](examples/portal-traversal/report.md)** · **[Install and use](docs/usage.md)**

## Input → output

```text
$game-system-research
Game folder: <path to your installed game>
Question: How do enemies decide whether to keep attacking, stagger or flee after being hit?
Keep the game folder read-only. Save the research in this workspace.
```

You get a system report, a traceable evidence index and clearly identified open questions. No engine name, function address or tool choice is required up front.

## Built around a real investigation

The first case examines **Portal**: crossing detection, position and orientation, velocity, and objects spanning both sides. One finding: an upward exit can impose a vertical-speed minimum, but a later total-speed cap can reduce that component again.

The case informed a reusable research method and a small, optional Rizin export helper. The research was static; gameplay experiments and broader game coverage remain open. [Evidence](examples/portal-traversal/evidence.md) · [Validation](docs/validation.md)

## Explore

- [Method and development process](docs/method.md)
- [Skill instructions](skills/game-system-research/SKILL.md)
- [Contribute a case or improvement](CONTRIBUTING.md)

Developed iteratively with Codex. Original project materials are MIT-licensed; game files, raw decompiler output and third-party tool binaries are not included.
