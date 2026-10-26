#!/usr/bin/env node
'use strict';
// Selected-function export only. The input is opened read-only by Rizin; it is never executed.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');

const usage = `Usage:
  node rizin-export.cjs --help
  node rizin-export.cjs --check <tool-root>
  node rizin-export.cjs <tool-root> <binary-copy> <empty-output-dir> <0xVA> [0xVA ...]

Requires Node.js and an existing Cutter-style Rizin + rz-ghidra distribution.
--check reports dependency presence and Rizin version; it does not analyze a binary.
Addresses are explicit virtual addresses, not file offsets. Use a research copy.
Existing output files are never overwritten. Every child process has a 60 s timeout.
Exit 0 means requested exports passed structural checks, not that the decompilation is correct.
Exit 1 means dependency, input, analysis, or output failure; exit 2 means invalid arguments.
No installation, debugger, input execution, or write mode is used.`;

const cli = process.argv.slice(2);
if (cli.length === 1 && ['--help', '-h'].includes(cli[0])) { console.log(usage); process.exit(0); }
const checkOnly = cli[0] === '--check';
if ((checkOnly && cli.length !== 2) || (!checkOnly && (cli.length < 4 || cli[0]?.startsWith('--')))) {
  console.error(usage); process.exit(2);
}
const addressArgs = checkOnly ? [] : cli.slice(3);
if (addressArgs.some(a => !/^0x[0-9a-f]+$/i.test(a) || BigInt(a) > BigInt(Number.MAX_SAFE_INTEGER))) {
  console.error('ERROR: addresses must be hexadecimal VAs within JavaScript exact-integer range.'); process.exit(2);
}
const addresses = [...new Set(addressArgs.map(a => '0x' + BigInt(a).toString(16)))];
const toolRoot = path.resolve(checkOnly ? cli[1] : cli[0]);
const exe = path.join(toolRoot, process.platform === 'win32' ? 'rizin.exe' : 'rizin');
const sleighRelative = 'lib/rizin/plugins/rz_ghidra_sleigh';
const common = ['-N', '-q', '-e', 'scr.color=0', '-e', 'analysis.depth=1'];
const timeoutMs = 60000;
const manifest = { tool: exe, cwd: toolRoot, timeoutMs, shell: false, nodeVersion: process.version,
  inputMode: 'read-only; no -w or debugger; only explicitly requested entries',
  warning: 'Function boundaries, calling conventions, generated types, and inferred names require manual assembly checks.',
  processes: [], functions: [], success: false };
let out, binary, inputHash;
const hashFile = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const save = (name, data) => fs.writeFileSync(path.join(out, name), data, { flag: 'wx' });
const saveJson = (name, data) => save(name, JSON.stringify(data, null, 2) + '\n');
function requireFile(file) {
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) throw new Error('Missing required file: ' + file);
}
function run(label, args) {
  const result = spawnSync(exe, args, { cwd: toolRoot, encoding: 'utf8', shell: false,
    timeout: timeoutMs, maxBuffer: 32 * 1024 * 1024, windowsHide: true });
  const stdout = result.stdout || '', stderr = result.stderr || '';
  const record = { label, args, status: result.status, signal: result.signal,
    error: result.error ? { code: result.error.code, message: result.error.message } : null };
  const id = String(manifest.processes.length + 1).padStart(3, '0') + '-' + label;
  if (out) {
    record.stdoutFile = id + '.stdout.txt'; record.stderrFile = id + '.stderr.txt';
    save(record.stdoutFile, stdout); save(record.stderrFile, stderr);
  } else if (stderr) process.stderr.write(stderr);
  manifest.processes.push(record);
  if (result.error || result.status !== 0 || /^ERROR:/m.test(stderr)) {
    throw new Error(`${label}: ${result.error?.message || 'Rizin failed (exit ' + result.status + ')'}; stderr retained${out ? ' in ' + record.stderrFile : ' on stderr'}.`);
  }
  return stdout;
}
function dependencies() {
  requireFile(exe);
  const pluginDir = path.join(toolRoot, 'lib', 'rizin', 'plugins');
  if (!fs.existsSync(pluginDir)) throw new Error('Missing bundled plugin directory: ' + pluginDir);
  const plugin = fs.readdirSync(pluginDir).find(n => /^(?:lib)?core_ghidra\.(dll|so|dylib)$/.test(n));
  if (!plugin) throw new Error('Missing rz-ghidra core plugin in ' + pluginDir);
  requireFile(path.join(pluginDir, plugin));
  const sleigh = path.join(toolRoot, sleighRelative);
  if (!fs.existsSync(sleigh) || !fs.statSync(sleigh).isDirectory() || !fs.readdirSync(sleigh).some(n => n.endsWith('.sla'))) {
    throw new Error('Missing compiled Sleigh specifications in ' + sleigh);
  }
  const version = run('version', ['-v']).trim();
  if (!/^rizin\s+\S+/i.test(version)) throw new Error('Unexpected Rizin version output.');
  return { version, corePlugin: path.join(pluginDir, plugin), sleighDirectory: sleigh,
    pluginSha256: hashFile(path.join(pluginDir, plugin)), executableSha256: hashFile(exe),
    pluginLoadTest: 'Only the real export verifies plugin loading and architecture support.' };
}
function jsonLines(text, expected, label) {
  const lines = text.replace(/^\uFEFF/, '').trim().split(/\r?\n/).filter(s => s.trim());
  let values;
  try { values = lines.map(s => JSON.parse(s)); } catch { throw new Error(label + ': malformed JSON; raw stdout/stderr retained.'); }
  if (values.length !== expected) throw new Error(label + ': expected ' + expected + ' JSON results, received ' + values.length + '.');
  return values;
}
function inCode(address, sections, bytes = 1) {
  return sections.find(s => typeof s.perm === 'string' && s.perm.includes('x') &&
    Number.isSafeInteger(s.vaddr) && Number.isSafeInteger(s.size) && Number.isSafeInteger(s.vsize) &&
    address >= s.vaddr && address + bytes <= s.vaddr + Math.min(s.size, s.vsize));
}

try {
  if (checkOnly) {
    console.log(JSON.stringify({ nodeVersion: process.version, toolRoot, ...dependencies() }, null, 2));
    process.exit(0);
  }
  binary = path.resolve(cli[1]);
  const requestedOut = path.resolve(cli[2]);
  requireFile(binary);
  if (fs.existsSync(requestedOut)) {
    if (fs.lstatSync(requestedOut).isSymbolicLink() || !fs.statSync(requestedOut).isDirectory() || fs.readdirSync(requestedOut).length) {
      throw new Error('Output must be a new or empty regular directory; refusing existing contents.');
    }
  } else fs.mkdirSync(requestedOut, { recursive: true });
  out = requestedOut;
  // Exclusive claim also prevents two exports from sharing the same empty directory.
  try { save('export-claim.txt', 'Exclusive output directory for this export.\n'); }
  catch (error) { out = undefined; throw error; }
  inputHash = hashFile(binary);
  manifest.binary = binary; manifest.sha256Before = inputHash;
  manifest.dependencies = dependencies();
  let target = path.relative(toolRoot, binary).replaceAll('\\', '/');
  if (!path.isAbsolute(target) && !target.startsWith('.')) target = './' + target;
  const analyze = (label, commands) => run(label, [...common, '-c', commands, target]);
  const [info, sections] = jsonLines(analyze('metadata', 'iIj;iSj'), 2, 'metadata');
  if (!info || typeof info.arch !== 'string' || !info.arch || !info.bintype ||
      ![16, 32, 64].includes(info.bits) || info.va !== true || !Array.isArray(sections) ||
      !sections.some(s => typeof s.perm === 'string' && s.perm.includes('x'))) {
    throw new Error('Input is not a recognized native image with executable virtual-address sections.');
  }
  saveJson('binary-info.json', info); saveJson('sections.json', sections);
  manifest.architecture = { arch: info.arch, bits: info.bits, format: info.bintype, imageBase: info.baddr };
  for (const address of addresses) {
    const record = { address, accepted: false };
    manifest.functions.push(record);
    try {
      const numeric = Number(BigInt(address)), section = inCode(numeric, sections);
      if (!section) throw new Error('VA is outside file-backed executable sections.');
      record.section = section.name;
      const setup = `e ghidra.sleighhome=${sleighRelative};af @ ${address};`;
      const values = jsonLines(analyze(address + '-inspect', setup + `afij @ ${address};pdfj @ ${address};pdgj @ ${address}`), 3, address);
      const [functions, assembly, decompilation] = values;
      const fn = Array.isArray(functions) && functions.find(f => f.offset === numeric);
      if (!fn || !(fn.size > 0) || !(fn.nbbs > 0) || assembly?.addr !== numeric || !Array.isArray(assembly.ops) ||
          !assembly.ops.some(op => op.offset === numeric)) throw new Error('No nonempty function/assembly at the exact requested VA.');
      if (assembly.ops.some(op => !Number.isSafeInteger(op.offset) || !(op.size > 0) ||
          !inCode(op.offset, sections, op.size) || op.type === 'ill' || /^invalid\b/i.test(op.opcode || ''))) {
        throw new Error('Analysis contains invalid instructions or instructions outside executable file-backed sections.');
      }
      if (!decompilation || (decompilation.errors && decompilation.errors.length) ||
          typeof decompilation.code !== 'string' || !decompilation.code.trim()) {
        throw new Error('Decompiler produced no usable code: ' + JSON.stringify(decompilation?.errors || []));
      }
      saveJson(address + '.analysis.json', { function: fn, assembly, decompilation });
      const text = analyze(address + '-export', setup + `pdf @ ${address};pdgo @ ${address}`);
      if (!text.trim() || /Ghidra Decompiler Error|No function at this offset/.test(text)) throw new Error('Text export failed after structural validation.');
      save(address + '.txt', text);
      record.accepted = true; record.instructionCount = assembly.ops.length; record.functionSize = fn.size;
      console.log(address + ': exported (' + assembly.ops.length + ' instructions; review warnings in stderr).');
    } catch (error) {
      record.error = error.message;
      console.error(address + ': FAILED: ' + error.message);
    }
  }
  manifest.success = manifest.functions.length > 0 && manifest.functions.every(f => f.accepted);
} catch (error) {
  manifest.error = error.message;
  console.error('ERROR: ' + error.message);
} finally {
  if (out) {
    try {
      if (inputHash) {
        manifest.sha256After = hashFile(binary);
        manifest.inputUnchanged = manifest.sha256After === inputHash;
        if (!manifest.inputUnchanged) { manifest.success = false; manifest.error = 'Input hash changed during the export.'; }
      }
      saveJson('reproduction.json', manifest);
      if (!manifest.success) save('failure.txt', [manifest.error, ...manifest.functions.filter(f => !f.accepted).map(f => f.address + ': ' + f.error)].filter(Boolean).join('\n') + '\n');
    } catch (error) { manifest.success = false; console.error('ERROR saving run record: ' + error.message); }
  }
}
process.exitCode = manifest.success ? 0 : 1;
