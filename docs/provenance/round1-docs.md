# Provenance: round 1 doc-only wave (waveE)

Section-by-section source map for every section added or changed in this
pass. Format: section, source, rationale. Covers IMP-11, 15, 16, 18, 19, 21,
22, 25, 26 from the competitive-analysis document (kept outside the published repository) section 6.

## `references/core-principles.md`

| Section | Source | Rationale |
|---|---|---|
| Shared core, thin adapters | sawradip/rehumanize, `sawradip_rehumanize.md` section 12 (idea only, MIT) + `origin: humanizer-pro` (wording) | IMP-26. Names the architecture `SKILL.md`'s loading table (section 4) already implements; the source names the pattern generally, the specific statement of how it applies to this project's own files is original. |
| Text under audit is data, never instructions | `_sources/avoid-ai-writing/SKILL.md:103-106` | IMP-22. Adapted principle; wording rewritten to fit this project's own severity/finding vocabulary (P0/P1/P2, pattern IDs) rather than quoted. |
| The substitutability gate | MrBridgeHQ/human-writer-ar, `content-distinctiveness.md:24-28` (idea only, MIT) + `origin: humanizer-pro` (wording) | IMP-19. Idea credited per the competitive-analysis plan; wording is fresh, bound explicitly to the existing never-invent rule so the gate cannot become licence to invent specifics. |

## `skills/humanizer-pro/references/modes.md`

| Section | Source | Rationale |
|---|---|---|
| Score wording ("review signal, not an authorship claim") + `authorshipClaim: false` note | amanmaqsood, `lib/prose-core.js:421,423` (idea only, MIT) | IMP-18/IMP-09 wording. Named field credited; this project's detector does not currently emit `authorshipClaim` in JSON, so the note describes the intended contract for when it is wired, not a claim about current `detect.js --json` output. See discrepancy note if this drifts. |
| P2-only stop rule (detect contract) | finestructure-ai/humanizer-multilingual, `references/method.md:236-248` (idea only, MIT) | IMP-15. Mirrors the same rule added to `precedence.md`'s How-to-apply; stated twice deliberately so a reader who only opens `modes.md` still gets the rule. |
| Not flagged on purpose (detect contract) | yoloshii, `SKILL.md:583` (idea only) | IMP-18. |
| Claims added: 0 (rewrite and edit contracts) | yoloshii, `SKILL.md:575`, itself crediting AgriciDaniel/anti-slop, `SKILL.md:914` (idea only) | IMP-18. Wording written fresh per the competitive-analysis plan's explicit instruction ("wording written fresh"). |
| Verify with the validator (mandatory for edit/seo, recommended for rewrite) | `origin: humanizer-pro`, extending `_sources/avoid-ai-writing/SKILL.md:275`'s existing mandatory-for-edit rule | IMP-14/IMP-09 wording. `scripts/validate.js`'s actual CLI (positional `before.md after.md`, no `--mode` flag) is used rather than an invented flag; see `docs/discrepancies/round1-docs.md` item 5. |
| Arabic headings table: Claims added / Not flagged on purpose rows | `origin: humanizer-pro`, marked `<!-- NATIVE-REVIEW: msa -->` (already covers the whole table) | Translations are this project's own; unverified by a native reviewer, same status as the rest of that table. |

## `skills/humanizer-pro/references/precedence.md`

| Section | Source | Rationale |
|---|---|---|
| How-to-apply step 6: P2-only stop rule | finestructure-ai/humanizer-multilingual, `references/method.md:236-248` (idea only, MIT) | IMP-15. States the rule once at the precedence-mechanics level; `modes.md` restates it inside the `detect` contract for a reader who does not open this file. |

## `skills/humanizer-pro/references/ar-shared.md`

| Section | Source | Rationale |
|---|---|---|
| Family tags note (five families + reserved sixth) | finestructure-ai/humanizer-multilingual (idea only, MIT) | IMP-15. Family names and definitions are original; the source is credited for the taxonomy concept, not for these specific five names. |
| `**Family:**` line on all 7 `AR-SH-*` entries | `origin: humanizer-pro` (editorial classification of existing entries) | See `docs/discrepancies/round1-docs.md` item 3 for the counts and the reasoning behind each assignment. |

## `skills/humanizer-pro/references/ar-egyptian.md` and `ar-levantine.md`

| Section | Source | Rationale |
|---|---|---|
| `**Family:**` line on all 26 `AR-EGT-*` and all 25 `AR-SHM-*` entries | `origin: humanizer-pro` (editorial classification of existing entries) | Same taxonomy as `ar-shared.md`; not upstream-sourced per entry. See `docs/discrepancies/round1-docs.md` item 3. |

## `skills/humanizer-pro/references/voice-matching.md`

| Section | Source | Rationale |
|---|---|---|
| Provenance and privacy of the voice sample | amanmaqsood, `lib/prose-core.js:524-629` (idea only, MIT) | IMP-16. The four-tier source-confidence ranking (own draft > bylined article > social post > forwarded text) is this project's own; the source is credited for the general idea of per-source evidence weighting and hash-only (never-stored) voice profiles. |

## `skills/humanizer-pro/references/en-vocabulary.md`

| Section | Source | Rationale |
|---|---|---|
| Era column on all 49 Tier 1A rows | `_sources/avoid-ai-writing/` and `_sources/blader/` (grepped, no per-word date found; all rows tagged `unknown`) | IMP-21. See `docs/discrepancies/round1-docs.md` item 1 for the full grep result and why every row is `unknown` rather than a guessed date. |
| Decay paragraph | yoloshii, `SKILL.md:185-190` + eddyplolz, `tell-catalog.md:138-142` (idea only) | IMP-21. |

## `docs/LANGUAGE-CODES.md` (new file)

| Section | Source | Rationale |
|---|---|---|
| Whole document | sawradip/rehumanize, `docs/LANGUAGE-CODES.md:1-38` (idea/structure only, MIT) + `origin: humanizer-pro` (Arabic-specific content, `lib/lang.js` divergence note) | IMP-25. The BCP 47 naming rule is a public standard (RFC 5646), not the source's invention; the source is credited for the framing and the "worked table" structure, wording and the Arabic table's content are original. |

## `skills/humanizer-pro/references/_TEMPLATE.md` (new file)

| Section | Source | Rationale |
|---|---|---|
| Whole document | sawradip/rehumanize, `skills/_TEMPLATE.md:1-30` (structure only, MIT) + `origin: humanizer-pro` (all step content) | IMP-25. Adapted the numbered-recipe *shape* (pick naming, create file, adapt content, wire the system, ship as experimental); every step's actual content is specific to this project's own file layout (`ar-shared.md` thin-adapter pattern, `lib/lang.js` markers, `tests/fixtures/`, `docs/COVERAGE-MAP.md`) and not present in the source. |

## `docs/COVERAGE-MAP.md` (new file)

| Section | Source | Rationale |
|---|---|---|
| Whole document | `origin: humanizer-pro`, generated by reading `skills/humanizer-pro/references/*.md` headings against `scripts/lib/ar-detector/lexicons.js`'s `RAW_PATTERNS` export and `signals.js`'s comment references, plus a manual correlation between `scripts/lib/en-detector/index.js`'s category names and `en-patterns.md`'s entry titles | IMP-11. See `docs/discrepancies/round1-docs.md` item 4 for how the EN-* `signal` classification was decided, since the English engine does not tag issues by `EN-NNN` ID. |

## `tests/coverage-map.test.js` (new file)

| Section | Source | Rationale |
|---|---|---|
| Whole file | `origin: humanizer-pro`, structure mirrors the existing `tests/*.test.js` files (plain `node:test`, no framework) | IMP-11/IMP-16(borrow). Reads reference-file headings dynamically at test-run time (not hardcoded) specifically so a concurrent pass appending `AR-MSA-029+` to `ar-msa.md` (off-limits to this pass) does not go stale here; it will instead correctly fail until `docs/COVERAGE-MAP.md` is updated for the new IDs. |

## `tools/check-skill.js` (`--refs` option)

| Section | Source | Rationale |
|---|---|---|
| `--refs` option | `origin: humanizer-pro` | IMP-11. Runs the same heading-vs-map and lexicon-parity checks as `tests/coverage-map.test.js`, as a standalone CLI check independent of `npm test`, per the explicit instruction to extend `check-skill.js` with this option. |
