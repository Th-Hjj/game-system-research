# Scope and checks

## Limits

Access to evidence and tool compatibility vary by game, build and environment. Complete recovery of every system is not guaranteed. Local analysis does not mean the agent's model runs offline.

The published [Portal case](../examples/portal-traversal/report.md) uses static analysis, not gameplay measurements; its fresh-context trial was partial. The v0.1.5 reporting revision still needs a fresh research run. The helper's tested environment and limitations are in [native analysis](../skills/game-system-research/references/native-analysis.md).

## Check changes

```text
node scripts/check-package.cjs
node --check skills/game-system-research/scripts/rizin-export.cjs
```

These check packaging and syntax, not research correctness. Review reports separately: the opening should explain the system as a whole, and details should clarify its rules without losing important conditions or uncertainty. A plausible explanation is not proof; successful tool execution is not a gameplay test.
