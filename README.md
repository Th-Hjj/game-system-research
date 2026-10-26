# Game System Research

[MIT](LICENSE) · v0.1.6

**Understand how an existing game system works—from evidence, not guesswork.**

Give the agent a game and a question. It investigates relevant evidence and explains how the system's parts work together in play, including relevant player choices and consequences. Key rules support that explanation; further details and exceptions follow where useful. Technical evidence stays separate from the readable report.

## Use

[Install the Skill](docs/usage.md), then start a new session:

```text
$game-system-research
Game: <title or installation folder>
Question: How does this system work?
```

The agent chooses tools as needed and keeps the game directory read-only by default. Outputs are `report.md` and `evidence.md`, with unresolved questions stated explicitly. This is system research, not an implementation tutorial or advice for designing your own game.

[Portal example](examples/portal-traversal/report.md) · [Skill instructions](skills/game-system-research/SKILL.md) · [Method](docs/method.md) · [Scope and checks](docs/validation.md) · [Contributing](CONTRIBUTING.md)
