# Discrepancies — EN catalog build

Places where the upstream source text (`_sources/blader/SKILL.md`,
`_sources/avoid-ai-writing/references/patterns.md`) differed from
`docs/inventory/blader.md`, `docs/inventory/avoid-ai-writing.md`, or
`docs/DEDUP-MAP.draft.md`, discovered while building
`skills/humanizer-pro/references/en-patterns.md` and `en-vocabulary.md`.

## 1. DEDUP-MAP.draft.md missed a real merge: BL-025 ↔ AW-077

`docs/DEDUP-MAP.draft.md`'s merge table lists BL-025 ("Writing about the
previous version") as having "no AW equivalent found," and its "Unique to
avoid-ai-writing" list separately lists AW-077 ("Diff-anchored writing")
as having "no BL merge partner found."

Reading both source texts directly:

- `blader/SKILL.md:352-359` (BL-025): "Documentation and comments describe
  what the text replaced instead of the current behavior... **Before:**
  'This function was added to replace the previous approach of iterating
  through all items, which caused O(n²) performance.' **After:** 'This
  function uses a hash map for O(1) lookups, avoiding the O(n²) cost of
  naive iteration.'"
- `avoid-ai-writing/references/patterns.md:524-527` (AW-077):
  "Documentation or comments narrating a change instead of describing the
  thing as it is: 'This function was added to replace the previous
  approach of iterating through all items.' ... Fix: describe current
  behavior using implementation and rationale already present in the
  source... Carve-out: documents that are inherently version-scoped —
  changelogs, release notes, migration guides, decision records — narrate
  change correctly and stay unflagged."

These are the same pattern with the same before-example almost verbatim
("This function was added to replace the previous approach of iterating
through all items") and the same fix and the same carve-out class
(changelogs/migration docs exempt). AW-077's own text even says "Adapted
from `blader/humanizer` P30" (`patterns.md:527`) — AW's own catalog
already documents the lineage that the draft map's research missed.

**Resolution:** merged as EN-012 in `en-patterns.md`; see
`docs/dedup-log/en.md` for the merge-decision entry. This file records the
draft map's miss so a future pass doesn't re-introduce two separate
entries for the same tell.

## 2. AW-042 ("Formulaic challenges") shares a detector `type` with AW-018, not a distinct trigger family

`docs/inventory/avoid-ai-writing.md`'s catalog table lists AW-042 with
detector `type` `formulaic-opener` — the same `type` as AW-018 ("Formulaic
openings"). Reading `avoid-ai-writing/references/patterns.md:342-343`,
AW-042's actual text ("'Despite challenges, [subject] continues to
thrive'... This is a non-statement") is not really a staged-opener pattern
at all — it is a content-inflation pattern (a non-statement propping up a
subject) that happens to share the engine's `formulaic-opener` `type`
label for implementation reasons, not because the two are the same
editorial rule. `docs/DEDUP-MAP.draft.md` folds AW-042 into the BL-004
staged-openers row anyway (alongside AW-018/037), following the shared
detector type rather than the prose meaning.

**Resolution:** kept AW-042 under EN-004 (staged run-up, per the draft
map) rather than moving it to EN-006 (inflated significance, where its
prose content would arguably fit better), because "Despite challenges…
continues to thrive" is also explicitly listed as a BL-013/EN-006 trigger
phrase already (`blader/SKILL.md:209`, "Despite these challenges...
continues to thrive"). Rather than duplicate the phrase across two
entries, left AW-042 where the draft map put it and cross-referenced the
overlap in EN-006's trigger list implicitly via the shared example. No
file was changed to "fix" this — noted here so the shared-detector-type
artifact doesn't get mistaken for an editorial judgment in a later phase.

## 3. BL-012's "key" (adjective) contradicts AW's own fix vocabulary

Not a discrepancy between the inventories and the source text, but a
cross-source contradiction discovered while placing BL-012's vocabulary
words: blader flags "key (adjective)" as a tell to replace
(`blader/SKILL.md:200`), while avoid-ai-writing's own tier table
*recommends* "key" as the replacement word for other flagged terms — e.g.
`crucial | important, key, necessary` (`avoid-ai-writing/references/
patterns.md:142`) and `pivotal | important, key, critical`
(`patterns.md:63`). Applying BL's rule and AW's fix suggestions
mechanically in sequence would flag AW's own recommended replacement.

**Resolution:** placed BL-012's "key" at Tier 3 (density-flagged only,
~3%+ of words) rather than Tier 1A/2 (flag per-instance or per-cluster),
so a single use of "key" as a fix for "crucial" is never itself flagged —
only saturation-level overuse of "key" is. See `docs/dedup-log/
en.md#vocabulary-placements`.

## 4. Severity mismatch between blader's implicit tier and AW's explicit P-tags (general, not a single instance)

`docs/CONFLICTS.md` C-09 already documents that blader's *(weak alone)*
label and AW's P0-P2 scale don't map 1:1. Building the catalog surfaced no
new instances beyond what C-09/C-14 already describe — every severity
assignment in `en-patterns.md` follows the C-09 resolution (AW's P0-P2 as
the base scale, blader's *weak alone* as an orthogonal modifier) and is
logged per-entry in `docs/dedup-log/en.md` where the assignment required
a judgment call (e.g. EN-005, EN-041). No further discrepancy to report
beyond confirming the conflict as already scoped.

## None found beyond the above

No other cases were found where the upstream source text contradicted the
inventory documents' descriptions, line-range citations, or quoted
examples. Spot-checked all merge rows involving a "yes" same-tell judgment
in `docs/DEDUP-MAP.draft.md` against the live source text during catalog
construction; all matched the map's characterization except item 1 above.
