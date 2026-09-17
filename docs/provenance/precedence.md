# Provenance — `skills/humanizer-pro/references/precedence.md`

Pinned upstream commits:

| Repo | Path under `_sources/` | Commit SHA |
|---|---|---|
| blader/humanizer | `_sources/blader` | `9862685f575c65a8247f90369951df1b3416e3d6` |
| conorbronsdon/avoid-ai-writing | `_sources/avoid-ai-writing` | `7a2c7d11d4a74d90c6be41fbed8402d972543798` |
| OthmanAdi/humanizer-semitic | `_sources/semitic` | `2c9d4fbe3e0086d373b59bfebc9556082275cf62` |

Line numbers below are as of these commits.

## Sections and rules

| Section / rule in precedence.md | Upstream source | Rationale if origin |
|---|---|---|
| Six-level order (the numbering itself) | `origin: humanizer-pro` | No upstream states a precedence order. The levels are derived from the owner-approved order in the build brief and from the two upstream architectures that imply a partial order (avoid-ai-writing's protected-content-over-voice rule, blader's sample-over-patterns rule). |
| Level 1 — protected content list (quotes, code, tables, URLs, paths, identifiers, frontmatter) | `avoid-ai-writing/SKILL.md:69-71` | — |
| Level 1 — "report the finding inside a protected region rather than fixing it" | `avoid-ai-writing/SKILL.md:69-71`, `avoid-ai-writing/SKILL.md:236` | — |
| Level 1 — structurally list-like content (steps, parameters, feature comparisons, spec tables) treated as protected | `avoid-ai-writing/references/patterns.md:13` | `origin: humanizer-pro` for the *placement at level 1*. Upstream states the carve-out but assigns it no precedence. Placing it at level 1 is required for the carve-out to survive against the MSA list rule, which sits at level 5 (see C-08 deviation note). |
| Level 1 — SEO-protected spans | `origin: humanizer-pro` | No upstream mentions SEO. Named in the owner-approved resolution list. |
| Level 2 — explicit instruction may re-scope protected content but a general style request may not | `avoid-ai-writing/SKILL.md:87-89`, `avoid-ai-writing/SKILL.md:276` | — |
| Level 3 — read the sample first; match sentence length, word choice, punctuation, openings, transitions | `blader/SKILL.md:42` | — |
| Level 3 — dash usage follows the sample's rate | `blader/SKILL.md:42`, `blader/SKILL.md:161` | — |
| Level 3 — do not upgrade the writer's vocabulary; match the sample instead of a named profile | `avoid-ai-writing/references/patterns.md:708` | — |
| Level 3 — sample authority capped at style rules (levels 4–6) | `avoid-ai-writing/SKILL.md:87-89` | `origin: humanizer-pro` for the cap. blader's text is unqualified ("overrides the patterns below"); the narrowing to the stylistic subset is our decision, matching avoid-ai-writing's architecture. Resolves C-13. |
| Level 3 — note that blader's inline `§6` is a stale cross-reference | `blader/SKILL.md:42` vs `blader/SKILL.md:159` | `origin: humanizer-pro` observation, already recorded in `docs/DISCREPANCIES.md` (b)(2). Flagged inline so we do not silently propagate an upstream defect. |
| Level 4 — the five profiles casual / professional / technical / warm / blunt | `avoid-ai-writing/references/patterns.md:690-706` | — |
| Level 4 — voice is optional; infer register, do not impose a persona | `avoid-ai-writing/references/patterns.md:692` | — |
| Level 4 — a profile brings out what the source has, never manufactures it | `avoid-ai-writing/references/patterns.md:694` | — |
| Level 5 — rhetorical questions are a native Arabic device, not a tell | `semitic/skills/humanizer-ar-msa/SKILL.md:354-358`, `semitic/skills/humanizer-ar-egt/SKILL.md:491-509`, `semitic/skills/humanizer-ar-shami/SKILL.md:574-602` | — |
| Level 5 — English rhetorical-question rule | `avoid-ai-writing/references/patterns.md:448` | — |
| Level 5 — MSA-leakage rules run only in dialect modes | `semitic/skills/humanizer-ar-egt/SKILL.md:162`, `:124`, `:110`; `semitic/skills/humanizer-ar-shami/SKILL.md:201-215` | `origin: humanizer-pro` for the scoping statement. Each upstream skill is internally scoped but none says the rules must not cross varieties. Resolves C-04, C-05, C-06, C-10. |
| Level 5 — Arabic native typography (، ؛ ؟ « »); no Latin-punctuation or quote-straightening of Arabic | `origin: humanizer-pro` | Confirmed gap: no rule exists in any of the three upstreams (`docs/CONFLICTS.md` C-03 and its verification grep). Minimal rule adopted so the English curly-quote/dash logic has something to defer to instead of misfiring on Arabic. |
| Level 5 — Arabic-Indic vs Western digits never converted | `origin: humanizer-pro`, resting on `avoid-ai-writing/SKILL.md:69-71` | Digits are numbers, and numbers are already level-1 protected content. Stated explicitly because no upstream addresses digit form. |
| Level 6 — shared core catalogue and the no-sample em-dash default | `avoid-ai-writing/references/patterns.md:10`, `blader/SKILL.md:161-162` | — |
| Level 6 — em-dash list-item carve-out (`- **Term** — description`) | `avoid-ai-writing/references/patterns.md:10` | — |
| Level 6 — dashes inside code, inline code, commands, paths, URLs left alone | `blader/SKILL.md:161` | — |
| "How to apply" steps 1–3 (highest level that speaks; then the more specific rule) | `origin: humanizer-pro` | No upstream has a conflict-resolution algorithm. |
| "How to apply" steps 4–5 (less invasive edit, report the tie; never invent a third option) | `origin: humanizer-pro`, consistent with `avoid-ai-writing/SKILL.md:117` (minimal targeted edits) and `avoid-ai-writing/SKILL.md:311` (subtract and sharpen without inventing) | — |
| C-01 row | `blader/SKILL.md:161-162`; `avoid-ai-writing/references/patterns.md:10`; em dash scored style-only per `avoid-ai-writing/SKILL.md:182` | Owner-approved resolution; matches the CONFLICTS.md proposal. |
| C-02 row | as Level 5 sources above | Matches CONFLICTS.md proposal. |
| C-03 row | `origin: humanizer-pro` | CONFLICTS.md called this a build gap; the adopted rule is written here rather than deferred. |
| C-04 / C-05 / C-06 / C-10 / C-11 rows | `semitic/skills/humanizer-ar-egt/SKILL.md:110,124,162,282-290`; `semitic/skills/humanizer-ar-shami/SKILL.md:201-215,220-255,486-515`; `semitic/skills/humanizer-ar-msa/SKILL.md:46,390` | Matches CONFLICTS.md proposals. |
| C-07 row | `semitic/skills/humanizer-ar-msa/SKILL.md:116,489-492`; `blader/SKILL.md:188`; `avoid-ai-writing/references/patterns.md:291-294` | Matches CONFLICTS.md, restated in P0/P1/P2 vocabulary. |
| C-08 row | `avoid-ai-writing/references/patterns.md:13`; `semitic/skills/humanizer-ar-msa/SKILL.md:257,264-272` | **Deviates from CONFLICTS.md**, which assigned level 6. Level 6 would lose to the MSA rule at level 5 and the carve-out would never apply. Carve-out content is placed at level 1 instead; the MSA thresholds keep level 5 for the residue. |
| C-09 / C-14 rows and the Severity mapping section | `blader/SKILL.md:29,162,171,180,188,306,319`; `avoid-ai-writing/references/patterns.md` P0/P1/P2 tags; `semitic/skills/humanizer-ar-msa/SKILL.md:485,489-492` | **Deviates from CONFLICTS.md**, which proposed keeping a fourth "judgment-only" bucket and mapping semitic minor→judgment-only and significant→P1/P2. The owner-approved scheme is three tiers only. Untagged avoid-ai-writing patterns default to P2; blader's "weak alone" survives as a corroboration note inside P2; blader §1–§5 ("justify an edit on one sighting", `:29`) and §22 chatbot residue (`:319`) map to P0, other unmarked blader patterns to P1. The 50-point rubric is dropped per the owner. |
| C-12 row | `semitic/skills/humanizer-ar-msa/SKILL.md:226`; `semitic/skills/humanizer-ar-egt/SKILL.md:262`; `semitic/skills/humanizer-ar-shami/SKILL.md:907-909`; `avoid-ai-writing/references/patterns.md:235` | Matches CONFLICTS.md, including the requirement to label the bands as uncited heuristics. |
| C-13 row | `blader/SKILL.md:42`; `avoid-ai-writing/SKILL.md:87-89` | Matches CONFLICTS.md proposal. |
| Worked example EN-1 | `blader/SKILL.md:42,161`; example text `origin: humanizer-pro` | Short English sentence written for this file; no upstream sentence needed. |
| Worked example EN-2 | quoted sentence adapted from `blader/SKILL.md:164` | The dash sentence is upstream's; placing it inside an attribution is our construction. |
| Worked example EN-3 | question text from `avoid-ai-writing/references/patterns.md:448` | — |
| Worked example AR-1 | `semitic/skills/humanizer-ar-msa/SKILL.md:361-362` (verbatim Arabic) | Flagged `NATIVE-REVIEW: msa`. |
| Worked example AR-2 | `semitic/skills/humanizer-ar-msa/SKILL.md:123-124` (verbatim Arabic) | Not flagged — verbatim pair, used for the purpose upstream uses it for. |
| Worked example AR-3 | `semitic/skills/humanizer-ar-egt/SKILL.md:136-137` (verbatim Arabic) | Flagged `NATIVE-REVIEW: egt`. |
| Worked example AR-4 | described only; opener phrase from `semitic/skills/humanizer-ar-egt/SKILL.md:287` | Flagged `NATIVE-REVIEW: egt`. Deliberately not written out, to avoid inventing Egyptian prose. |
| Worked example AR-5 | `semitic/skills/humanizer-ar-shami/SKILL.md:601` (verbatim, truncated) | Flagged `NATIVE-REVIEW: shami`, unconditionally per the build rule. |
| Statement that the detector score and HUMAN/MIXED/AI label are a reporting layer only | `avoid-ai-writing/detector/patterns.js` (trinary classifier, per `docs/inventory/avoid-ai-writing.md` §8) | `origin: humanizer-pro` for the decision to keep them out of the tier scale (C-14). |
