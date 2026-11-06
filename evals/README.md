# Regression cases

Maintainer material, outside the installed Skill. These cases guard against the return of failures seen in real research. They are not a coverage suite or a benchmark; add a case only when a real failure is fixed.

## Provenance

| Case | Real failure | Source |
| --- | --- | --- |
| portal-speed-conditions | A report listed speed limits found in the code without saying which traversal triggers them or whether they apply to the player or to other objects, which turned a local branch into an apparent global rule. A later version was useful but leaned toward implementation and reverse-engineering detail. The user asked for the trigger conditions and for less code-centric output. This case covers both full-system explanation and completion checking. | Portal Codex session and project notes listed in [cases.json](cases.json). The session is private; the prompt reuses the user's words and the fixture restates facts that were statically verified there. |
| rizin-export path test | On Windows, passing absolute input or Sleigh paths containing non-ASCII characters to Rizin made parsing fail. The helper fixes this by running from the tool root with relative paths. | Recorded in [native-analysis.md](../skills/game-system-research/references/native-analysis.md). |

The v0.1.8 diagnosis that Baldur's Gate 3 and Persona 5 Royal reports read as an overview followed by compressed mechanism entries comes from commit f7810d2, not from a recorded user quote. The Portal case exercises the same requirement.

## Run the script test

```text
node evals/rizin-export.test.cjs
```

It needs only Node.js and runs on Linux and macOS. A stub stands in for Rizin and fails, as the real tool did, when given an absolute or non-ASCII path. It checks structural behavior of the helper, not decompiler correctness.

## Run the Portal case

1. In a fresh agent thread, give the installed Skill, the case's `prompt` and `context`, and an isolated copy of `fixtures/portal-speed`. Do not provide this file, expected outcomes or previous attempts, and do not say it is a test.
2. Give only the resulting `report.md` to a second fresh agent. Ask it to answer the reader questions below from the report alone, quoting the passages it relied on, and to say where the report did not let it answer.
3. Compare the answers with the key, then check the report and `evidence.md` against the fixture.

**Reader questions**

1. A player goes through a portal whose exit faces upward, with 100 upward speed and no horizontal speed after the direction change. What upward speed do they leave with?
2. A non-player object that qualifies for teleporting goes through the same exit with the entry portal also facing upward. What happens?
3. The same object goes through with the entry portal horizontal. What happens, and why?
4. What changes if the exit portal is on a wall?
5. Can someone leave an upward-facing exit with less than 300 upward speed? When, and why?

**Key.** 1: 300. 2: 225. 3: stays at 100, because that branch's floor is 50 and 100 is already above it. 4: the upward top-up does not apply. 5: yes, for example with large horizontal speed, because the 1000 total-speed cap is applied after the upward component is topped up.

| Pass | Fail |
| --- | --- |
| The reader answers all five from the report. The main body explains what happens to the player or object after traversal before technical detail; evidence and derivations sit in `evidence.md`. Findings are described as static, with no runtime measurement claimed. | 300 presented as a global floor; 50 treated as an addend; static findings presented as measured; values listed for the reader to assemble into rules; the main body organized around code or reverse-engineering steps. |

Grade each run as **pass**, **partial** or **fail**, citing the report passages. Record the Skill revision (SHA-256 of `SKILL.md`), the environment and what actually ran in [results.md](results.md). A few runs do not establish a reliability rate.
