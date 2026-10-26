# How Portal traversal works

A pair of portals connects two separated places into a passage. Walk into one and your body continues out of the other; eligible objects can travel through in a similar way. Because the two portals may face different directions, crossing changes both where you are and the directions you face and move.

For example, falling into a portal on the floor and leaving through one on a wall turns downward motion into motion away from the wall. Upward-facing exits can also raise insufficient upward speed, and traversal has a total-speed limit.

Crossing includes the period when a body or object spans the passage: deciding when it has crossed, finding the corresponding exit position and maintaining continuity between the two sides.

## When a crossing happens

The entrance must be active and have a valid paired exit. For the player, the positional conditions require the **body center to pass behind the entrance plane** while the body still overlaps the portal opening. A center exactly on the plane is not enough, and moving the view through does not replace crossing with the body center. Standing and crouching use different center heights.

Passing beside the opening therefore does not qualify merely because the body reaches the back side of the portal plane.

Objects must also be eligible. Certain scene entities, including doors and track trains, are excluded; objects assigned as their children can inherit that exclusion. Not every visible object is transferable. [Evidence](evidence.md#r01)

## Where you emerge and face

Your exit position depends on your position relative to the entrance; crossing does not always snap you to the exit center. The orientation of both portals determines the new facing direction. Moving inward through the entrance becomes movement outward through the exit. An oblique direction or sideways look is transformed too, rather than being replaced with a straight-ahead direction.

The player's position is based on the body center: its corresponding exit-side location is found, then the vertical offset between that center and the player's foot position is retained. That offset does not rotate sideways with the portal, so the feet are not transformed like an arbitrary point on an ordinary object. [Evidence](evidence.md#r02)

## Speed changes happen in order

The initial direction change does not itself change speed. Two adjustments follow.

**The first applies only to a sufficiently upward-facing exit.** Its outward direction must be within roughly 45 degrees of vertical upward. An upward floor exit qualifies; a horizontal wall exit or downward ceiling exit does not. [Evidence](evidence.md#r03)

| Object and entrance orientation | Minimum upward speed used at this step |
|---|---:|
| Player; any entrance orientation | 300 |
| Eligible non-player object; entrance also sufficiently upward-facing | 225 |
| Eligible non-player object; entrance does not meet that condition | 50 |

These values are game distance units per second and concern **vertical upward speed**, not total speed or speed along an inclined portal's outward direction. After the direction change, a player's upward speed of 100 is raised to 300; 400 is left unchanged by this adjustment. The non-player values are also minimums, not amounts added on every crossing.

**After that adjustment, total traversal speed above 1000 is reduced to 1000 while preserving its direction at that point.** This does not require an upward exit. All components shrink together, so sufficiently large sideways speed can bring the upward component below the minimum just applied. Those minimums are not final guarantees. [Evidence](evidence.md#r03)

## Spanning both sides

An object can have one part still on the entrance side while another is displayed on the exit side. The two portions represent one object crossing the passage.

Collision around a spanning object accounts for the environments near both portals; nearby walls and obstacles still matter. [Evidence](evidence.md#r04)

## Important boundaries and open questions

- The speed adjustments and the 1000 limit belong to traversal. Collisions after leaving the exit can continue to change speed.
- The exact behavior when an object is wedged in an opening or the exit is obstructed remains unresolved in this case.
