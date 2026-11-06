# Managed code, archives and scripted engines

Use this route when the game ships managed assemblies, engine archives, data tables or scripts that can answer the question before any native code is examined. Identify the engine and build from file layout and headers, then extract only what the question needs. Written on 2026-11-06. Tool names are starting points, not endorsements: confirm the official source, a release that supports the game's engine version, and that it parses a relevant sample before relying on it.

## Routing

| Layout | Evidence entry | Candidate tools | What can mislead |
| --- | --- | --- | --- |
| Unity, Mono | `<Game>_Data/Managed/Assembly-CSharp.dll` and other game assemblies | ILSpy, dnSpyEx | Field initializers are defaults. Values serialized in scenes, prefabs and ScriptableObjects override them; find the binding the active scene actually uses. |
| Unity, IL2CPP | `GameAssembly.dll` or `libil2cpp.so` plus `<Game>_Data/il2cpp_data/Metadata/global-metadata.dat` | Il2CppDumper, Cpp2IL | These recover types, signatures and method addresses. Method bodies are native code: continue with the [native-analysis reference](native-analysis.md). Protected or altered metadata may not parse; report that as a gap. |
| Unity assets | `*.assets`, `sharedassets*.assets`, AssetBundles | AssetRipper, UnityPy | MonoBehaviour fields decode correctly only with type trees or the matching assemblies. |
| Unreal | `Content/Paks/*.pak`, IoStore `*.utoc` / `*.ucas` | FModel or other CUE4Parse-based tools, set to the game's engine version | DataTables and CurveTables are readable data. Blueprint logic is bytecode and only partly readable; C++ logic is in the native executable. Encrypted archives need a key the user has; without one, the content stays unverified. |
| Godot | `.pck`, or a pack embedded in the executable | GDRE Tools (gdsdecomp) | Compiled GDScript is tied to the engine version; confirm the version before trusting decompiled output. |
| GameMaker | `data.win` | UndertaleModTool | YYC builds compile GML to native code, so no GML bytecode is present. |
| RPG Maker MV/MZ | `www/data/*.json`, `js/plugins/*.js`, `js/plugins.js` | Text tools | Plugin order in `plugins.js` decides which plugin overrides which; a function defined in a core script may be replaced later. |
| Ren'Py | `.rpy`, `.rpyc`, `.rpa` | unrpa, unrpyc | Prefer shipped `.rpy` sources when present; later files and `init` priorities can redefine earlier ones. |
| Proprietary archives (for example CRI CPK) | The archive's index or table of contents | Format-specific extractors and decoders | Read the index first and extract selected entries. Script and message formats usually need their own decoder; check a sample decodes completely. |
| Larian `.pak` (LSPK) | `Data/*.pak`; stats files and story data inside | LSLib | Stats inherit through `using` entries; resolve the final values rather than reading one entry in isolation. |

## What each route can establish

Data and scripts show the rules that content declares. They do not show engine-side calculations, AI decisions or anything computed in native code unless the data drives it directly. When a question depends on those, state which part the extracted data supports and which part needs native analysis, public references or a runtime observation.

## Routes used in earlier research

- **Persona 5 Royal** (Steam build 15515071). The main executable is native x64, so this was a resource and script route, not managed decompilation. The CPK index was read first; tutorial and help entries were extracted, scripts decoded and PAK messages read. All 41 tutorials decoded. The evidence supported the conventional rules the tutorials describe; exact damage formulas, AI behavior and boss immunities needed other evidence.
- **Baldur's Gate 3** (Steam build 25605617). Local PAK, stats and story data explained how obscurement, observer abilities and post-attack searching relate. Roll details taken from public sources were labeled as such. The game was not launched, so frame-by-frame detection order and encounter-specific surprise triggers remained gaps.
