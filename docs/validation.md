# Validation and coverage

Different checks establish different things. This page summarizes completed local work without redistributing private analysis logs or game disassembly.

| Layer | Result | What it establishes |
|---|---|---|
| Skill format and package references | Passed locally for v0.1.4 | Valid Skill metadata and resolvable local references |
| Node helper syntax and help | Passed | The script parses and exposes its CLI |
| Dependency probe | Passed on the recorded Windows setup | Rizin, rz-ghidra and Sleigh resources were found |
| Real selected-function export | Passed; 212 instructions for one verified entry | Metadata, assembly and decompiler output were produced; sample hash unchanged |
| Failure behavior | Invalid VA, missing tool, non-native input and existing-output cases rejected | Necessary errors are surfaced and existing output is preserved |
| Fresh-context research trial | Partial; six functions exported | Independent relocation and some local velocity rules reproduced; not full coverage |
| Report comprehension precheck | An isolated agent answered seven scenario questions | Helped identify wording problems; not a human usability study |
| Human report feedback | Used across multiple revisions | Improved scope, readability and specificity; not a quantified evaluation |
| In-game experiments | Not performed | No claim of measured gameplay behavior |
| New user session, complete end-to-end investigation | Not established | Format and helper success are not substitutes for this test |

## Recorded native environment

- Windows x64; Node.js 24.17.0.
- Cutter 2.5.0 bundle: Rizin 0.9.1 with rz-ghidra.
- GNU objdump 2.45 for cross-checks.
- Portal Steam App 400, build 19017868; PE32 x86 samples identified in the [case evidence](../examples/portal-traversal/evidence.md).

The helper retains calling-convention and variable-recovery warnings. A successful export is a structural result, not proof of a correct function boundary or decompiled type. Linux/macOS, other binary architectures and arbitrary tool versions have not been validated. The configured timeout was not tested with a deliberate long-running process.

## Report evaluation

The report should make the system understandable without reading code: rules need evidence, headings should be easy to navigate, and conditions and exceptions must survive simplification. For example, a reader should distinguish an upward exit from a wall exit and understand why a later total-speed cap can undo part of a vertical-speed minimum.

The goal is accurate understanding of the studied system, not whether the reader can build their own implementation. The package checker can catch packaging mistakes; it cannot judge research correctness or reader understanding.
