# Scope and checks

## Limits

Access to evidence and tool compatibility vary by game, build and environment. Complete recovery of every system is not guaranteed. Local analysis does not mean the agent's model runs offline.

The helper's tested environment and limitations are in [native analysis](../skills/game-system-research/references/native-analysis.md).

The v0.1.6 revision used fresh-context report-writing trials from supplied Big Walk and Disco Elysium evidence. These checked organization, readability and unnecessary detail; they did not revalidate the game evidence or measure human reader comprehension. A fresh end-to-end research run remains outstanding.

## Check changes

```text
node scripts/check-package.cjs
node --check skills/game-system-research/scripts/rizin-export.cjs
```

These check packaging and syntax, not research correctness. Review whether the report lets a reader explain the relationships, follow a typical situation and predict relevant changes without assembling a rule catalogue. Check that the prose is concise, essential conditions remain, and any loop or diagram is useful and supported. These are review questions, not required report headings. A plausible explanation is not proof; successful tool execution is not a gameplay test.
