# Native binary analysis

Use this route when file headers, module structure and runtime dependencies indicate native machine code, and scripts or managed assemblies cannot answer the question. Narrow the search to a few addresses through strings, data tables, exports, RTTI or known callers. Finding a class name does not establish behavior. Record the module hash, architecture and image base, and distinguish file offsets, RVAs, VAs and runtime addresses affected by ASLR.

Start by checking a relevant function with a suitable existing tool. Compare instructions, call paths, parameter sources and actual conditions. Verify function boundaries, calling conventions, virtual-table slots and decompiler-inferred names and types. Similar SDK classes or algorithms are references, not evidence for the analyzed build. Merged jumps, invalid instructions or implausible function ranges should reduce confidence rather than invite a plausible story.

## Selected-function export helper

`scripts/rizin-export.cjs` works with an existing **Cutter-style directory layout** containing Rizin and rz-ghidra. It requires Node.js and no third-party Node packages. It does not locate functions, install tools or scan every native platform.

```text
node scripts/rizin-export.cjs --help
node scripts/rizin-export.cjs --check <tool-root>
node scripts/rizin-export.cjs <tool-root> <binary-copy> <empty-output-dir> <0xVA> [0xVA ...]
```

`--check` checks for the executable, core_ghidra plugin and Sleigh files, and prints the Rizin version. Loading the plugin and identifying a target architecture still require a sample test. Copy the input into the research workspace first. The output directory must be new or empty; existing content causes failure rather than being overwritten. Use a new directory for retries and retain failure logs.

The helper uses `shell:false`, a 60-second timeout per child process, and `-N` to skip user initialization. It does not use write mode or debugger arguments. It checks metadata parsing, whether addresses fall in file-backed executable regions, function and instruction results at the exact requested addresses, and decompiler JSON, recording whether each function passes. The output includes stdout, stderr, tool versions and hashes, input hashes before and after analysis, and commands. Missing dependencies, unparseable samples, invalid addresses, timeouts and export failures return nonzero. Exit 0 establishes structural checks only: an address inside an instruction may still decode and be mistaken for a function entry, so the researcher must verify it.

## Validated environment and path behavior

The helper has run against a real PE32 x86 game-module copy on Windows x64 with Node.js 24 and Rizin 0.9.1 / rz-ghidra bundled in Cutter 2.5.0. Other operating systems, architectures, binary formats and tool layouts have not been validated for this Skill. Successful installation does not establish compatibility.

In the recorded Windows environment, passing absolute input or Sleigh paths containing non-ASCII characters directly to the tools caused parsing failures. The verified workaround is to use the tool root as the working directory and relative input and Sleigh paths; the helper already does this. If the copy's path still contains unsupported characters, create another research copy with a simpler name rather than renaming or modifying installed game files. Paths across drives may remain absolute and still need a sample check.

Consult official releases and matching dependencies as needed: [Cutter releases](https://github.com/rizinorg/cutter/releases), [Rizin](https://github.com/rizinorg/rizin), and [rz-ghidra](https://github.com/rizinorg/rz-ghidra). The helper distributes none of these tools or game files and does not install or upgrade dependencies. If the layout is incompatible, use another suitable decompiler while preserving equivalent evidence detail.
