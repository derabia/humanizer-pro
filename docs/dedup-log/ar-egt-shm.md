# Dedup log — `ar-egyptian.md` / `ar-levantine.md`

Every `SM-EGT-001…025` and `SM-SHM-001…025` id from `docs/inventory/semitic.md` §3.2/§3.3
appears in exactly one row of the two mapping tables below (never in the dropped-statistics
table — those are referenced by `file:line` only, never by SM id, so that id-counting
scripts don't double-count them).

## Egyptian: SM-EGT-001…025 → destination

| SM id | destination |
|---|---|
| SM-EGT-001 | AR-EGT-001 |
| SM-EGT-002 | AR-EGT-002 |
| SM-EGT-003 | AR-EGT-003 |
| SM-EGT-004 | AR-EGT-004 |
| SM-EGT-005 | AR-EGT-005 |
| SM-EGT-006 | AR-EGT-006 |
| SM-EGT-007 | AR-EGT-007 |
| SM-EGT-008 | AR-EGT-008 |
| SM-EGT-009 | AR-EGT-009 |
| SM-EGT-010 | deferred to ar-shared: uniform sentence rhythm (kept as AR-EGT-010 short entry with Egyptian-specific fix/example) |
| SM-EGT-011 | deferred to ar-shared: formulaic transitions (kept as AR-EGT-011 short entry with Egyptian-specific fix set) |
| SM-EGT-012 | deferred to ar-shared: formulaic transitions (kept as AR-EGT-012 short entry with Egyptian-specific fix set) |
| SM-EGT-013 | AR-EGT-013 |
| SM-EGT-014 | AR-EGT-014 |
| SM-EGT-015 | AR-EGT-015 |
| SM-EGT-016 | AR-EGT-016 |
| SM-EGT-017 | AR-EGT-017 |
| SM-EGT-018 | AR-EGT-018 |
| SM-EGT-019 | AR-EGT-019 |
| SM-EGT-020 | AR-EGT-020 |
| SM-EGT-021 | AR-EGT-021 |
| SM-EGT-022 | AR-EGT-022 |
| SM-EGT-023 | AR-EGT-023 |
| SM-EGT-024 | AR-EGT-024 |
| SM-EGT-025 | AR-EGT-025 |

Note: AR-EGT-026 (MSA-leakage summary checklist) is `origin: humanizer-pro` and does not
have its own SM id — it aggregates/cross-references SM-EGT-001/002/003/004/005/006/007/
013/014, each of which is already mapped exactly once above. See
`docs/provenance/ar-egt-shm.md` for the rationale.

## Levantine: SM-SHM-001…025 → destination

| SM id | destination |
|---|---|
| SM-SHM-001 | AR-SHM-001 (also serves as the dedicated MSA-leakage umbrella section) |
| SM-SHM-002 | AR-SHM-002 |
| SM-SHM-003 | AR-SHM-003 |
| SM-SHM-004 | AR-SHM-004 |
| SM-SHM-005 | AR-SHM-005 |
| SM-SHM-006 | AR-SHM-006 |
| SM-SHM-007 | AR-SHM-007 |
| SM-SHM-008 | AR-SHM-008 |
| SM-SHM-009 | AR-SHM-009 |
| SM-SHM-010 | AR-SHM-010 |
| SM-SHM-011 | AR-SHM-011 |
| SM-SHM-012 | deferred to ar-shared: formulaic transitions (kept as AR-SHM-012 short entry with regional table retained) |
| SM-SHM-013 | AR-SHM-013 |
| SM-SHM-014 | AR-SHM-014 |
| SM-SHM-015 | AR-SHM-015 |
| SM-SHM-016 | AR-SHM-016 |
| SM-SHM-017 | AR-SHM-017 |
| SM-SHM-018 | AR-SHM-018 |
| SM-SHM-019 | AR-SHM-019 |
| SM-SHM-020 | AR-SHM-020 |
| SM-SHM-021 | AR-SHM-021 |
| SM-SHM-022 | AR-SHM-022 |
| SM-SHM-023 | AR-SHM-023 |
| SM-SHM-024 | deferred to ar-shared: uniform sentence rhythm (kept as AR-SHM-024 short entry with paratactic-chain nuance retained) |
| SM-SHM-025 | AR-SHM-025 |

## Dropped statistics / unsourced claims

Referenced by `file:line` and quote only (per `docs/inventory/semitic.md` §8 and the
statistic-drop rule) — none reproduced as fact in the reference files.

### Egyptian (`egt:`)

- egt:16: "over 400 million Arabic speakers" (22-Arab-countries/400M demographic claim,
  presented without citation) — dropped; context sentence kept in narrative only where
  needed, figure not reused.
- egt:42: "a 400-million-person audience" — same claim repeated, dropped.
- egt:244: "used 10x more than any MSA equivalent" (يعني frequency multiplier) — dropped,
  noted in AR-EGT-009 as an unsourced stylometric claim.
- egt:262: "12-20 words" as the AI sentence-length band — dropped in AR-EGT-010 (deferred
  to ar-shared, which owns the general numeric-threshold decision).
- egt:187 / egt:670 (Pattern 6 detection and Stage-3 checklist): "sentences over 25 words" /
  "longer than 25-30 words" threshold — kept as a prescriptive editing threshold (not a
  claim about AI/human behavior), not dropped; distinguished from the AI-band statistics
  above.
- egt:574: "AI language models favor high-frequency words because they dominate training
  data" framed as a stylometric "finding" with no corpus/method named — kept as a
  qualitative claim in AR-EGT-025 (no numeric figure to drop), flagged in-file as such.

### Levantine (`shm:`)

- shm:24–27: "1.3 BLEU... 23 BLEU... 17x performance differential" (MSA-to-Levantine
  translation benchmark claim) — dropped entirely; not reproduced anywhere in
  `ar-levantine.md`.
- shm:30: "30+ million people in Syria, Lebanon, and Palestine" — dropped (demographic
  claim, no citation).
- shm:45: "3,000+ Turkish borrowings in Syrian Arabic alone" — dropped; AR-SHM-023 keeps
  the qualitative "Turkish loans are the everyday default" claim and the loan-word table
  without the count.
- shm:129–130: "Stylometric classifiers trained on Arabic text use MSA grammatical markers
  as their primary AI detection feature" — dropped as an uncited claim; AR-SHM-001 keeps
  only the "thee/thou" analogy and the non-regional scoping.
- shm:471–472: "Stylometric research on Arabic text shows that discourse particle
  frequency and distribution is one of the strongest human/AI discriminators" — dropped;
  AR-SHM-011 keeps the "particle desert" qualitative description and the "every 2-3
  clauses" prescriptive fix.
- shm:509–510: "more than two formal transitions per 100 words" — kept as a prescriptive
  editing threshold in AR-SHM-012 (not a claim about AI/human behavior at large), not
  dropped.
- shm:528–529: "Stylometric research on human Arabic text confirms that 'formal tone
  consistency'... is a primary AI authorship marker" — dropped; AR-SHM-013 keeps the
  qualitative register-variation description only.
- shm:597: "2-3 per 200 words is natural" (reader-directed questions) — kept as a
  prescriptive editing target in AR-SHM-015, not dropped (no claim about AI/human
  statistics, just an authoring guideline).
- shm:637–638: "3-5 French insertions per 100 words minimum... heavy speakers 10-15 per
  100 words" — dropped from AR-SHM-016; qualitative "integrate naturally" instruction kept.
- shm:703–706: "Studies on Arabic authorship attribution show that the presence of
  tashkeel... is one of the strongest single-feature predictors of AI authorship" —
  dropped; AR-SHM-018 keeps the mechanical strip-all-except-shadda instruction only.
- shm:908 / shm:924: "15-25 words" AI band and "one of the most robust machine-learning
  features for AI text detection in Arabic" — dropped from AR-SHM-024 (deferred to
  ar-shared, which owns the general numeric-threshold decision); the paratactic-chain
  nuance and word-count ranges by fragment type (shm:916–921) are kept as prescriptive
  authoring ranges, not AI-detection statistics.
- shm:996: "more than 5 Category 1 failures per 100 words → the text is deeply MSA" —
  this is a Stage-1 diagnostic threshold in the source's own workflow section, not part
  of any of the 25 numbered patterns; not carried into any AR-SHM entry (out of scope
  for the pattern-by-pattern reference), noted here for completeness only.

## Not carried forward (out of scope, not "dropped statistics")

- The 50-point / 5-dimension quality rubrics from both source files (egt:730–815,
  shm:1105–1220) are workflow/scoring scaffolding, not AI-tell patterns — not ported into
  either reference file. No SM id is attached to them in the inventory, so nothing to
  reconcile here.
- The Processing Workflow / Voice Calibration sections (egt:584–726, shm:980–1101) are
  likewise workflow scaffolding, not individual patterns — not ported.
