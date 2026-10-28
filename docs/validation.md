# Scope and checks

## Limits

Access to evidence and tool compatibility vary by game, build and environment. Complete recovery of every system is not guaranteed. Local analysis does not mean the agent's model runs offline.

The helper's tested environment and limitations are in [native analysis](../skills/game-system-research/references/native-analysis.md).

The v0.1.6 editorial trials used supplied Big Walk and Disco Elysium evidence. The v0.1.7 revision used fresh-context drafts from supplied Portal evidence and a hypothetical technique-discovery system, with report-only reading reviews. The trials exposed assumed basic knowledge and peripheral qualifications, informing further selection guidance. These are formative editorial checks, not proof of reliable report quality; they did not revalidate game evidence or measure human reader comprehension. A fresh end-to-end research run remains outstanding.

## Check changes

```text
node scripts/check-package.cjs
node --check skills/game-system-research/scripts/rizin-export.cjs
```

These check packaging and syntax, not research correctness. Read the report without the evidence as a developer unfamiliar with the game: can the reader picture an ordinary interaction, explain the relationships and predict relevant changes without supplying missing basic knowledge? Check that the prose is concise, essential conditions remain, and any loop or diagram is useful and supported. These are review questions, not required report headings. A plausible explanation is not proof; successful tool execution is not a gameplay test.
