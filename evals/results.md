# Regression record

## 2026-11-06 baseline (v0.2.0)

SKILL.md SHA-256 `98b83e7b9aa64ae484dceb97dbe5f8b1cd5c86461cb7e39399e85490882778d4`. Single runs; they set a baseline and do not establish a reliability rate.

| Case | What actually happened | Assessment |
| --- | --- | --- |
| rizin-export path test | `node evals/rizin-export.test.cjs` on Linux with Node.js 22: 11 of 11 checks passed. A mutation that passed the absolute input path to the stub made 5 checks fail, so the test detects a return of the recorded failure. | Pass. Structural behavior only; no real Rizin or Windows run. |
| portal-speed-conditions | A fresh agent with the installed Skill wrote report.md and evidence.md from the fixture. The agent's file write was refused by its harness, so it returned both texts in its reply and the maintainer saved report.md unchanged. A second fresh agent read only report.md and answered: 300 for the player; 225 for an object with an upward entry; 100 unchanged for an object with a horizontal entry, because that branch's floor is 50 and floors only raise speed; no top-up for a wall exit; and a possible result below 300 for a player with large horizontal speed, because the 1000 cap comes after the top-up, which the report marked as depending on an unrecorded cap method. The reader judged the main body an explanation organized by situation, with no code identifiers. The report described all findings as static and kept derivations, gaps and validation status in evidence.md. | Pass. Reader question 5 originally said "someone" and was sharpened to "a player" after this run. |
