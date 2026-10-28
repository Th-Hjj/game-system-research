# Game System Research

[MIT](LICENSE) · v0.1.8

**Understand how an existing game system works—from evidence, not guesswork.**

Give the agent a game and a question. It researches the system and writes a clear, engaging explanation for developers who have never played the game: what players do, and how key rules combine to create choices, constraints and changes in play. This explanation is the report's main body, developed at the depth the question needs—not an overview followed by a mechanism catalogue. Concision removes repetition and digressions, not necessary explanation. Technical evidence and further detail stay separate.

## Use

[Install the Skill](docs/usage.md), then start a new session:

```text
$game-system-research
Game: <title or installation folder>
Question: How does this system work?
```

The agent chooses tools as needed and keeps the game directory read-only by default. Outputs are `report.md` and `evidence.md`, with unresolved questions stated explicitly. This is system research, not an implementation tutorial or advice for designing your own game.

[Skill instructions](skills/game-system-research/SKILL.md) · [Method](docs/method.md) · [Scope and checks](docs/validation.md) · [Contributing](CONTRIBUTING.md)
