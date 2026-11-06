#!/usr/bin/env node
'use strict';
// Regression test for scripts/rizin-export.cjs without a real Rizin install.
// A stub `rizin` reproduces the recorded failure: absolute or non-ASCII input
// and Sleigh paths make parsing fail. The helper must pass relative paths from
// the tool root. Linux and macOS only (the stub is a shebang script).
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');

if (process.platform === 'win32') { console.log('SKIP: the stub needs a POSIX shebang executable.'); process.exit(0); }

const helper = path.resolve(__dirname, '../skills/game-system-research/scripts/rizin-export.cjs');
const base = fs.mkdtempSync(path.join(os.tmpdir(), 'gsr-rizin-'));
const parent = path.join(base, '研究副本');            // non-ASCII directory shared by tool root and input
const toolRoot = path.join(parent, 'cutter');
const pluginDir = path.join(toolRoot, 'lib', 'rizin', 'plugins');
const sleighDir = path.join(pluginDir, 'rz_ghidra_sleigh');
fs.mkdirSync(sleighDir, { recursive: true });
fs.writeFileSync(path.join(pluginDir, 'libcore_ghidra.so'), 'stub plugin');
fs.writeFileSync(path.join(sleighDir, 'x86.sla'), 'stub sleigh');
const binary = path.join(parent, 'samples', 'game.dll');
fs.mkdirSync(path.dirname(binary), { recursive: true });
fs.writeFileSync(binary, Buffer.from('MZ stub binary for export test'));
const log = path.join(base, 'calls.jsonl');

const stub = `#!${process.execPath}
'use strict';
const fs = require('node:fs');
const args = process.argv.slice(2);
fs.appendFileSync(${JSON.stringify(log)}, JSON.stringify({ cwd: process.cwd(), args }) + '\\n');
if (args[0] === '-v') { console.log('rizin 0.9.1 @ linux-x86-64 (stub)'); process.exit(0); }
const target = args[args.length - 1];
const commands = args[args.indexOf('-c') + 1] || '';
const bad = s => s.startsWith('/') || /[^\\x00-\\x7f]/.test(s);
const sleigh = (commands.match(/ghidra\\.sleighhome=([^;]+)/) || [])[1];
if (bad(target) || (sleigh && bad(sleigh))) { console.error('ERROR: Cannot open file (stub: absolute or non-ASCII path)'); process.exit(1); }
const va = 0x401000;
if (commands === 'iIj;iSj') {
  console.log(JSON.stringify({ arch: 'x86', bits: 32, bintype: 'pe', va: true, baddr: 0x400000 }));
  console.log(JSON.stringify([{ name: '.text', perm: '-r-x', vaddr: va, size: 0x1000, vsize: 0x1000 }]));
} else if (commands.includes('afij')) {
  console.log(JSON.stringify([{ offset: va, size: 2, nbbs: 1 }]));
  console.log(JSON.stringify({ addr: va, ops: [{ offset: va, size: 1, type: 'push', opcode: 'push ebp' }, { offset: va + 1, size: 1, type: 'ret', opcode: 'ret' }] }));
  console.log(JSON.stringify({ code: 'void fcn_00401000(void) { return; }', errors: [] }));
} else if (commands.includes('pdgo')) {
  console.log('0x00401000 push ebp\\n0x00401001 ret\\nvoid fcn_00401000(void) { return; }');
} else { console.error('ERROR: unexpected stub command'); process.exit(1); }
`;
fs.writeFileSync(path.join(toolRoot, 'rizin'), stub, { mode: 0o755 });

let failures = 0;
function check(name, condition, detail) {
  console.log((condition ? 'ok   ' : 'FAIL ') + name + (condition || !detail ? '' : ' :: ' + detail));
  if (!condition) failures++;
}
const run = args => spawnSync(process.execPath, [helper, ...args], { encoding: 'utf8' });
const calls = () => fs.readFileSync(log, 'utf8').trim().split('\n').map(l => JSON.parse(l));

// 1. Successful export through a non-ASCII parent directory.
const out = path.join(base, 'out-1');
const hashBefore = fs.readFileSync(binary).toString('hex');
let r = run([toolRoot, binary, out, '0x401000']);
check('export exits 0', r.status === 0, r.stderr);
const analysisCalls = calls().filter(c => c.args[0] !== '-v');
check('every analysis call runs from the tool root', analysisCalls.length > 0 && analysisCalls.every(c => fs.realpathSync(c.cwd) === fs.realpathSync(toolRoot)));
check('input path is passed relative and ASCII-only', analysisCalls.every(c => !c.args[c.args.length - 1].startsWith('/') && !/[^\x00-\x7f]/.test(c.args[c.args.length - 1])));
check('no write or debugger flags', analysisCalls.every(c => !c.args.includes('-w') && !c.args.includes('-d')));
check('function export written', fs.existsSync(path.join(out, '0x401000.txt')) && fs.existsSync(path.join(out, '0x401000.analysis.json')));
const manifest = fs.existsSync(path.join(out, 'reproduction.json')) ? JSON.parse(fs.readFileSync(path.join(out, 'reproduction.json'), 'utf8')) : {};
check('manifest records success and unchanged input', manifest.success === true && manifest.inputUnchanged === true);
check('input bytes unchanged', fs.readFileSync(binary).toString('hex') === hashBefore);

// 2. A non-empty output directory is refused, not overwritten.
r = run([toolRoot, binary, out, '0x401000']);
check('non-empty output directory refused with exit 1', r.status === 1, r.stdout + r.stderr);

// 3. Address outside executable sections fails that function.
const out3 = path.join(base, 'out-3');
r = run([toolRoot, binary, out3, '0x10']);
check('address outside executable sections exits 1', r.status === 1 && /outside file-backed executable sections/.test(r.stderr), r.stderr);

// 4. Malformed address is an argument error.
r = run([toolRoot, binary, path.join(base, 'out-4'), '401000']);
check('non-hex address exits 2', r.status === 2, r.stderr);

// 5. --check reports the stubbed dependencies.
r = run(['--check', toolRoot]);
check('--check exits 0 and reports version', r.status === 0 && /rizin 0\.9\.1/.test(r.stdout), r.stderr);

fs.rmSync(base, { recursive: true, force: true });
console.log(failures ? `\n${failures} check(s) failed` : '\nall checks passed');
process.exit(failures ? 1 : 0);
