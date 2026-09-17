# PROGRESS (single source of truth)

Read `docs/BUILD-PROMPT.md` first, then this file. Resume from **Next step**.

## Current phase
Phase 6b fix (auto-routing register-mix) + Phase 10 README in progress; then Phase 9 evals, Phase 11 handoff

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

## Next step
Verify auto-routing fix (agent running), commit. Verify README/zip (agent running), commit. Then Phase 9 evals (evals.json ≥16, iteration-1 runs, SELF-ASSESSMENT.md), Phase 11 REVIEW-HANDOFF.md, tag v0.1.0-build.

Commits so far: 626d4b7 (phase 3/4/5 refs), e845dc4+0cc89d1 (6a), f7086e1 (Arabic refs + merged docs), 88e5dd4 (10a), 56615dd (7), 74253a7 (validate.js), e90dc73 (ar-detector).

## Open questions
- None.

## Blockers
- None.
