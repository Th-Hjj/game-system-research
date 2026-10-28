# Scope and checks

## Limits

Access to evidence and tool compatibility vary by game, build and environment. Complete recovery of every system is not guaranteed. Local analysis does not mean the agent's model runs offline.

The helper's tested environment and limitations are in [native analysis](../skills/game-system-research/references/native-analysis.md).

The v0.1.6 editorial trials used supplied Big Walk and Disco Elysium evidence. The v0.1.7 revision used fresh-context drafts from supplied Portal evidence and a hypothetical technique-discovery system, with report-only reading reviews. These were formative editorial checks, not independent validation of game evidence or measurements of human comprehension.

Feedback on user-supplied Baldur's Gate 3 stealth and Persona 5 Royal combat reports motivated v0.1.8: sustained explanation across the article was more useful than an overview followed by compressed mechanism descriptions. Games, question breadth and models differed, so this is editorial feedback, not a controlled model comparison. No new end-to-end game investigation or independent fresh-context report trial was performed for v0.1.8; the effect of this revision on new reports remains to be tested.

## Review report quality

First read only the report, as a developer unfamiliar with the game. Assess the main body as a whole: does it develop how the system works, or merely introduce its parts and append their individual significance? Relationships central to the question need enough explanation to follow, not just coverage. A narrow subsystem and a broad combat system need not fit the same space.

Reconstruct ordinary play and a meaningful alternative using passages in the report: what the player can do, how the main rules interact, and how consequences change what happens next. Do not complete the account with prior game knowledge. An unexplained transition is a reason to expand or reconnect the body, not merely add another overview sentence. A single successful example or a diagram does not demonstrate system-wide understanding.

Then audit the explanation against its evidence, retaining necessary conditions and uncertainties. Trim repetition and peripheral detail without removing the reasoning that made the system understandable. Review questions stay internal; do not turn them into required report headings, word-count targets, percentages or mechanism checklists.

For subsequent writing comparisons, reuse the same question and evidence across writers, and assess the reports without exposing that evidence to the reader. Compare explanatory completeness and depth before brevity; check factual support separately. Revisit both a focused subsystem and a broader system to avoid overfitting the Skill to one example. Internal author review or an agent reading trial is not a human comprehension measurement.

## Check the package

```text
node scripts/check-package.cjs
node --check skills/game-system-research/scripts/rizin-export.cjs
```

These check packaging and syntax, not research correctness or report quality. Keep package checks, research validation and reader feedback distinct. A plausible explanation is not proof; successful tool execution is not a gameplay test.
