# Portal traversal: public evidence index

This is a curated index of the original local investigation. It preserves sample identity, relevant locations, findings and source boundaries. It does not contain game binaries, extracted assets or raw disassembly/decompiler dumps. Rechecking an address requires your own matching installation or research copy.

**Evidence level:** static analysis of the local build, cross-checks of its data and instructions, and shipped developer commentary. No in-game experiments were performed. Hypothetical scenarios and offline calculations are not observations of gameplay.

## Sample identity

Steam App **400**, build **19017868**. `steam.inf` recorded PatchVersion/ClientVersion 1745010 and ServerVersion 9862575. Both modules are PE32 x86.

| Relative installation path | Bytes | SHA-256 |
|---|---:|---|
| `portal/bin/server.dll` | 7959552 | `6e0df352d464b1446ba32418578267ec623a6df2d326cf3265e2500f6f3a6162` |
| `portal/bin/client.dll` | 5500416 | `59abd9eea5c6a6a5a48bd5be3903b66bc97e7d2e1c893ac521d055fcea2da3d5` |

All addresses below are **static preferred VAs**, with image base `0x10000000`, not live ASLR addresses. Subtract the image base for an RVA; use the matching PE section to map an RVA to a file offset. For example, server VA `0x10455ed0` maps to RVA `0x455ed0`, file offset `0x4552d0`. Names describing functions are analytical labels unless explicitly identified otherwise.

<a id="r01"></a>

## R01 — Crossing conditions

- Server gate: `0x10455940`; plane comparison: `0x10455b25–0x10455b5a`.
- Player center calculation: `0x10443e10`; uses standing/crouching collision height and model scale, not the eyes or foot origin.
- Calls from Touch at `0x104575f1/0x104575fd` and EndTouch at `0x1045438b/0x10454397` lead from the gate to the traversal routine. The callers check activation.
- Hole overlap: `0x1044db40`; zero-length volume queries for bounding-box and physics-collision shapes test initial overlap with the portal hole.

The traced path requires simulator ownership, eligibility, a valid linked portal, a center strictly behind the entrance plane and overlap with the opening. The center-and-overlap rule alone is not the entire eligibility test. This path is not established by merely finding an entity named portal.

The eligibility helper at `0x10458bb0` checks the entity and its parent chain against `func_door`, `func_door_rotating`, `prop_door_rotating`, `func_tracktrain` and `physicsshadowclone`. Parenting here does not mean every physical contact, held object or constraint.

<a id="r02"></a>

## R02 — Position, orientation and direction

Server call sites at `0x104584de–0x104584f3` supply entrance and exit transforms to `0x10458c20`. Matrix multiplication and rigid-inverse helpers were checked locally, supporting:

```text
T = exit * diag(-1, -1, 1, 1) * inverseRigid(entrance)
```

The middle transform is a half-turn about the portal's local Z axis, not necessarily world vertical. Ordinary position calculation appears at `0x1045639a–0x10456431`; orientation conversion at `0x10493690` composes the orientation with the portal transform.

Player position at `0x1045627e–0x10456337` uses `T(c*) + (p - c*)`: the portal transform acts on the center used for placement while the center-to-origin offset is retained without rotation. Some stance branches modify that center. This supports the report's distinction from rotating an ordinary object; it does not establish every crouch/slanted-portal combination or camera-righting timing.

<a id="r03"></a>

## R03 — Velocity and adjustment order

Traversal routine: server `0x10455ed0`. Velocity rotation at `0x10456485–0x10456511` has no positional translation. Inputs can come from different player/physics paths; they are not universally one field.

The local sequence at `0x10456697–0x104567c3` was checked against instructions and constant bytes:

1. If the exit outward direction's world-Z component is strictly greater than float32 `0.7071`, raise world vertical velocity to at least 300 for players. For eligible non-players use 225 if the entrance meets the same direction test, otherwise 50.
2. If the resulting squared total speed exceeds 1,000,000, scale the vector to length 1000.

The stored threshold is `0.707099974155426`, so “roughly 45 degrees” in the report is an approximation; the threshold itself is excluded. The upward adjustment operates on world vertical velocity, not the exit-normal component.

Player classification was checked through the actual player/non-player virtual-method targets, rather than guessed from a physics flag. The portal direction field was traced back to the orientation update and its plane-normal use.

| Constant | Preferred VA in server |
|---|---|
| Direction threshold | `0x105e9d84` |
| 300 / 225 / 50 | `0x104e56e4` / `0x104e6840` / `0x104e57f8` |
| 1,000,000 / 1000 | `0x10504d58` / `0x104fb828` |

For example, an intermediate velocity of `(2000, 0, 300)` becomes approximately `(988.94, 0, 148.34)` after the length cap. This is an offline calculation illustrating order, not a measured crossing. These are values computed for the traced traversal path, not a universal engine-speed limit or proof of every special object's later measured velocity.

<a id="r04"></a>

## R04 — Boundary continuity

The server transfers simulator ownership through calls at `0x104567cc` and `0x10456817`. Client `C_PortalGhostRenderable` was identified through type information and its vtable at `0x103f9b1c`; position, orientation and bone transforms, plus a clipping-plane pointer, support the other-side display described in the report. The client also handles `EntityPortalled` at `0x1022e390` and transforms historical state.

The shipped `portal/resource/closecaption_english.txt` commentary token `prtl-Comment035.wav`, attributed to David Kircher, describes temporary hybrid physics environments around portals. Its matching packed commentary node is `maps/testchmb_a_02_commentary.txt`, “Cutting up the World.” This is an author explanation supplied with the game, not an independent runtime collision test.

Full render lifetime, all collision-solver behavior, blocked exits and wedged objects were not reconstructed or tested in-game.

## Public references and their limits

- [Valve Source SDK 2013, pinned singleplayer revision](https://github.com/ValveSoftware/source-sdk-2013/tree/77567eb4bce8d7b6b7f73e929fcde3a331c0216e): interface and math reference. The inspected tree did not contain the Portal-specific traversal implementation; `trigger_portal` is not the local `CProp_Portal` path.
- [SourcePauseTool's portalled_pause.cpp, pinned revision](https://github.com/OutOfBoundsOffice/SourcePauseTool/blob/d25c0edede1ad8db938874877180282350c169bc/spt/features/portalled_pause.cpp): a signature helped locate a candidate. Its unique local match was followed by call-site and instruction checks; no SPT plugin was installed.
- [Valve developers' Portal Problems lecture](https://cs50.harvard.edu/games/2018/weeks/11/): useful background covering both Portal games. Its line-crossing explanation was not substituted for the local overlap-and-center test.

No leaked or unverified game-source repository was used as implementation evidence.

## Rechecking the case

Verify the module hashes first. If they differ, relocate the implementation instead of applying these addresses blindly. With a matching copied module and a compatible Rizin bundle, from this repository:

```text
node skills/game-system-research/scripts/rizin-export.cjs <tool-root> <server-copy> <new-output-dir> 0x10455940 0x10455ed0
```

Review the exported instructions, pseudocode and warnings together, then follow the relevant callers and data. The helper does not establish function identity on its own. The original environment and bounded tests are summarized in [validation](../../docs/validation.md).
