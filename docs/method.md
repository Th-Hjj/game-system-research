# Research method and development process

## The problem

A mechanic's visible behavior rarely reveals all of its conditions. A plausible explanation may miss an object-type branch, confuse an intermediate value with a final result, or borrow an algorithm from another engine version.

This project connects implementation evidence to a readable account of the system. Its input stays simple: a game directory and a question. The agent chooses tools from the actual files rather than assuming an engine or a fixed decompiler workflow.

## The method

1. **Scope the behavior.** Identify the decisions or outcomes the reader wants to understand. Keep the installation read-only and work on necessary copies.
2. **Find relevant evidence.** Inspect architecture and file formats, then use scripts, configuration, resources, managed code, native analysis or isolated observations as appropriate.
3. **Turn findings into rules.** Trace a candidate to its trigger, data source and effect. Check conditions, object types, order and subsequent changes before generalizing.
4. **Explain the system.** Establish the overall behavior, explain the important rules, and finish with significant open questions. Keep technical evidence in a separate document.

These are guiding principles, not a mandatory tool sequence or a sentence-by-sentence rubric.

## What the Portal case changed

The local installation pointed to native x86 modules. Strings, type information and a public signature narrowed the search; targeted disassembly and decompilation then supported the relevant rules. Public Source SDK interfaces helped interpretation but were not treated as Portal's source code.

The speed investigation illustrates why conditions matter. The rotation of velocity is followed by an upward-exit adjustment, then a total-speed cap. The adjustment differs between players and other eligible objects, and the cap can reduce the vertical component again. A single phrase such as “momentum is preserved” would lose these rules.

An early report emphasized implementation details. Reader feedback shifted the core deliverable toward system understanding: retain meaningful conditions and exceptions, move technical evidence out, keep the opening readable, and avoid vague phrases such as “additional handling.” This feedback also reduced the Skill to a concise methodology instead of a rigid checklist.

## What is reusable

- Architecture-driven tool selection and bounded investigation.
- A distinction between local implementation, observation, public reference and inference.
- Checking where a value comes from and whether later processing changes it.
- Separate system explanations and evidence indexes.
- An optional selected-function export helper with diagnostics and input-integrity checks.

## Development and attribution

This project was developed iteratively with Codex. Human direction defined the research question, read-only boundary, report audience and quality goals, and drove repeated revisions of the explanation. Codex performed tool-assisted investigation, implementation and checks. The repository presents that collaborative process; it does not claim unaided manual reverse engineering or gameplay experiments that were not performed.

The current scope is one local game case and a bounded fresh-context trial. Broader portability and independent end-to-end evaluation remain future work. See [validation](validation.md).
