#!/usr/bin/env node
'use strict';
// Publication/package checks only. This does not test game rules or decompilation.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const walk = dir => fs.readdirSync(dir, {withFileTypes: true}).flatMap(entry => {
  if (entry.name === '.git') return [];
  const full = path.join(dir, entry.name);
  assert(!entry.isSymbolicLink(), 'Review symlink before publishing: ' + full);
  return entry.isDirectory() ? walk(full) : [full];
});
const required = ['README.md', 'LICENSE', 'docs/usage.md',
  'docs/validation.md', 'skills/game-system-research/SKILL.md',
  'skills/game-system-research/scripts/rizin-export.cjs',
  'examples/portal-traversal/report.md',
  'examples/portal-traversal/evidence.md'];
for (const file of required) assert(fs.existsSync(path.join(root, file)), 'Missing ' + file);
let links = 0;
const files = walk(root);
for (const file of files) {
  const relative = path.relative(root, file).replaceAll('\\', '/');
  assert(!/(?:^|\/)(?:input|artifacts|databases|cache|tools|node_modules)(?:\/|$)/i.test(relative), 'Local-only directory: ' + relative);
  assert(!/\.(?:dll|exe|so|dylib|vpk|pdb|zip|7z|bin|whl)$/i.test(relative), 'Binary or archive: ' + relative);
  assert(!/(?:^|\/)\.env(?:\.|$)/.test(relative), 'Environment file: ' + relative);
  const bytes = fs.readFileSync(file);
  assert(!bytes.includes(0), 'Non-text file needs explicit publication review: ' + relative);
  const text = bytes.toString('utf8');
  assert(!/[a-z]:[\\/]Users[\\/][^\s<>"']+/i.test(text), 'Personal Windows home path: ' + relative);
  assert(!/\/(?:Users|home)\/[a-z0-9_.-]+\//i.test(text), 'Personal Unix home path: ' + relative);
  assert(!/\b(?:gh[pousr]_[a-z0-9]{20,}|github_pat_[a-z0-9_]{20,})\b/i.test(text), 'Possible credential: ' + relative);
  if (!file.endsWith('.md')) continue;
  for (const match of text.matchAll(/\]\(([^)]+)\)/g)) {
    const ref = match[1];
    if (/^[a-z][a-z0-9+.-]*:/i.test(ref)) continue;
    const [target, fragment] = ref.split('#');
    const resolved = target ? path.resolve(path.dirname(file), decodeURIComponent(target)) : file;
    assert(!path.relative(root, resolved).startsWith('..'), 'Link leaves package: ' + relative);
    assert(fs.existsSync(resolved), 'Broken local link: ' + relative + ' -> ' + ref);
    if (fragment) {
      const destination = fs.readFileSync(resolved, 'utf8');
      const headingIds = [...destination.matchAll(/^#{1,6}\s+(.+)$/gm)].map(m => m[1].toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s/g, '-'));
      assert(destination.includes('id="' + fragment + '"') || headingIds.includes(fragment), 'Missing fragment: ' + ref);
    }
    links++;
  }
}
const skill = fs.readFileSync(path.join(root, 'skills/game-system-research/SKILL.md'), 'utf8').replace(/^\uFEFF/, '');
assert(skill.startsWith('---\n') || skill.startsWith('---\r\n'), 'Missing Skill frontmatter');
assert(/^name:\s*game-system-research\s*$/m.test(skill), 'Unexpected Skill name');
assert(/^description:\s*\S.+$/m.test(skill), 'Missing description');
assert(!/Portal|prop_portal|0x10455|D:\\SteamLibrary/i.test(skill), 'Case-specific details in core methodology');
assert(fs.readFileSync(path.join(root, 'LICENSE'), 'utf8').startsWith('MIT License'), 'Missing MIT license');
console.log(JSON.stringify({passed:true, files:files.length, localLinksChecked:links,
  scope:'package structure and publication hygiene; not full YAML, research or gameplay validation'}, null, 2));
