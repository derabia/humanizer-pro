# PROGRESS (single source of truth)

Read `docs/BUILD-PROMPT.md` first, then this file. Resume from **Next step**.

## Current phase
Published at https://github.com/derabia/humanizer-pro (public, main, v0.2.0-build)

## Completed steps
| Step | Commit |
|---|---|
| Phase 1: pin upstream sources, licenses (prior attempt, re-verified) | 8521bf8 |
| Phase 0 bootstrap: BUILD-PROMPT.md, PRIOR-ATTEMPT.md, PROGRESS.md, STATE.md, UPSTREAM.md env | 073e321 |
| Phase 2a: docs/inventory/{blader,avoid-ai-writing,semitic}.md + upstream test evidence | afb31b9 |
| Phase 2b: docs/CONFLICTS.md (14), docs/DEDUP-MAP.draft.md, docs/DISCREPANCIES.md | 98fd493 |
| Phase 3: references/precedence.md; Phase 4/5: core-principles, modes, voice-matching, seo-mode | 626d4b7 |
| Phase 6a: en-detector (verbatim + header), en-validate, arabic-normalize, lang.js, 30 tests, package.json, tools/run-tests.js | e845dc4, 0cc89d1 |
| Phase 4: en-patterns.md (55 entries), en-vocabulary.md — verified id coverage. NOTE: these plus the ar-*.md drafts were swept into 0cc89d1 by a broad `git add -A`; ar-*.md verification recorded below when done | 0cc89d1 |
| Phase 4: Arabic references (ar-shared, ar-msa, ar-egyptian, ar-levantine) verified; provenance, dedup, native-review, discrepancy fragments merged | f7086e1 |
| Phase 10a: LICENSE, CREDITS.md, tools/check-upstream.js, docs/ARCHITECTURE.md | 88e5dd4 |
| Phase 7: SKILL.md router (265 lines, 973-char description), tools/check-skill.js | 56615dd |
| Phase 6b: validate.js preservation validator with SEO checks, EN and SEO fixtures, tests | 74253a7 |
| Phase 6b: Arabic detector engine, detect.js CLI, Arabic fixtures and tests (104 tests) | e90dc73 |
| Progress snapshot after phase 6b/7/10a | 5848c3b |
| Phase 10: README with Arabic quick-start, tools/build-zip.js, dist/humanizer-pro.zip | 30d03d7 |
| Phase 9: 16 evals authored with inputs, keywords, voice samples; tools/check-evals.js | 8e9eace |
| Phase 6b: register-mix promotion gated on lexical dialect evidence and non-leakage score; quoted-speech masking in lang ID; realistic dialect AI fixtures (114 tests) | 9b56566 |
| Phase 10: rebuild dist zip after detector fix | f1cf8b8 |
| Phase 9: iteration-1 eval runs (en, msa); add missing hedge variants found by msa-edit-01 | da36da5 |
| Phase 9: iteration-1 eval runs (egt, shami) | 1f025cd |
| Phase 11: docs/REVIEW-HANDOFF.md (600 lines, 141-row provenance index) + docs/evidence/phase11-acceptance.txt | uncommitted |

## Round 1
Improvement plan from `docs/COMPETITIVE-ANALYSIS.md` section 6. Branch `improve/round-1`, branched from `566f563`.

| Step | Commit |
|---|---|
| state: start improvement round 1 | 548dc3b |
| IMP-03 CI workflow, IMP-05 packaging and host manifests, IMP-06 changelog and version check | 4589438 |
| IMP-04 deterministic benchmark, IMP-07 blinded pairwise kit, IMP-08 native-review ballots | 7821f63 |
| IMP-11 coverage map + parity test, IMP-15 family tags + P2-only rule, IMP-16 voice privacy, IMP-18/19/22/26 principles and contract lines, IMP-21 era tags, IMP-25 language codes + template | 5532f4f |
| IMP-09 fidelity check and --mode, IMP-10 overlap grouping and coverage, IMP-13 formal register profile, IMP-14 authorship/calibration labelling | 3388a16 |
| document --mode rewrite and --strict-fidelity in modes.md and SKILL.md | ccf1441 |
| IMP-01 Arabic FP corpus (300 docs, Wilson CI) and fp-measure tool, IMP-02 sourced human fixtures (MSA, Egyptian), IMP-12 classical rhetoric layer AR-MSA-029..033, IMP-17 stem matching | 0e63a64 |
| IMP-20 ignore regions in detect.js and self-scan tool with regression budgets | 949da07 |
| IMP-27 ambiguous-marker routing guard, per-pattern contribution cap (24), IMP-23 AR-SH-008 vocabulary concentration; FP rate 0/300 (Wilson upper 1.26%) | 9de5d8f |
| Round-1 documentation: version 0.2.0, CHANGELOG [0.2.0-build], REVIEW-HANDOFF sections 1/2/3/6/7, COMPETITIVE-ANALYSIS section 7, README, this file | uncommitted |

Measured: tests 114 to 226, all passing. Arabic false-positive rate 1.67% (5/300, Wilson 0.71% to 3.84%) to 0.00% (0/300, Wilson upper 1.26%); documents scoring at or above 25, 49 to 31. Benchmark 16/16. Self-scan 30 files, all inside budget. Raw output for the closing checks: `docs/evidence/round1-final-checks.txt`.

Not closed: IMP-08 execution (ballots unfilled), IMP-24 (deferred behind IMP-08), CI never run (nothing pushed), npm never published, no sourced Levantine fixture (searched for, not found). Full table in `docs/REVIEW-HANDOFF.md` section 7, "Round-1 acceptance".

## Next step
Owner: run docs/native-review/ballot-egyptian.md; recruit a Levantine reviewer; decide npm publish; then IMP-24 (Gulf).

## Open questions
- None.

## Blockers
- None.
