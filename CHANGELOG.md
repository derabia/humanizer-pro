# Changelog

All notable changes to `humanizer-pro` are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project uses [Semantic Versioning](https://semver.org/) with
pre-release suffixes (`-build`, `-rc.N`) for interim states that have not
been tagged as a stable release.

## [Unreleased]

Round 1 closed everything in `docs/COMPETITIVE-ANALYSIS.md` section 6 except
the items below. Each one is blocked on an action outside a code change.

- IMP-08 execution: the Egyptian ballot (18 items) and the Levantine ballot
  (35 items) exist under `docs/native-review/`, and no reviewer has filled
  either one in. `references/ar-levantine.md` keeps `status: experimental`.
- IMP-24 (Gulf variety): deferred. Its stated precondition is IMP-08.
- CI push: `.github/workflows/ci.yml` is written and has never run, because
  nothing has been pushed to a remote. Weak spot 3.9 stays open.
- npm publish: `npm pack --dry-run` passes and the package is not published.
- A sourced Levantine false-positive fixture: searched for, not found
  (`tests/fixtures/human-sourced/_provenance.md`, "Levantine: searched for,
  not found").

## [0.2.0-build] - 2026-09-17

Improvement round 1, on branch `improve/round-1`, eight commits from
`548dc3b` to `9de5d8f`. Not a tagged or published release. Test count went
from 114 to 226, all passing.

### Added

- IMP-01 Arabic false-positive corpus and measurement tool: 300 Wikimedia
  documents (230 encyclopedic, 70 news), every revision dated before
  2022-11-30, plus `tools/fp-measure.js`, `corpus/manifest.json` and
  `corpus/RESULTS.md`. `0e63a64`; `docs/evidence/round1-fp-measure.txt`.
- IMP-02 sourced human fixtures for MSA and Egyptian under
  `tests/fixtures/human-sourced/`, with licence and cleanup steps per file.
  Levantine has no fixture: none was findable. `0e63a64`;
  `docs/evidence/round1-waveB-tests.txt`.
- IMP-03 CI workflow for Node 18, 20 and 22 plus a Windows smoke job, in
  `.github/workflows/ci.yml`. Never executed. `4589438`;
  `docs/evidence/round1-check-node18.txt`.
- IMP-04 deterministic benchmark: `evals/benchmark.json` and
  `evals/run-benchmark.js` with `required`, `forbidden`, `protected`,
  `minEditRatio` and `forbidUnexpectedNumbers` per case; 16 of 16 cases pass.
  `7821f63`; `docs/evidence/round1-benchmark.txt`.
- IMP-05 packaging: npm `bin` entries, `.claude-plugin/plugin.json`,
  `.codex-plugin/plugin.json` and `agents/openai.yaml`. Not published, and no
  manifest has been loaded by a host. `4589438`;
  `docs/evidence/round1-npm-pack.txt`.
- IMP-06 release discipline: this file plus `tools/check-version.js`.
  `4589438`; `docs/evidence/round1-waveA-checks.txt`.
- IMP-07 blinded pairwise kit: `tools/prepare-pairwise.js`,
  `evals/human/pairs.json`, and a seeded dry run over 12 pairs that
  reproduces byte-identical output from seed 42. `7821f63`;
  `docs/evidence/round1-pairwise.txt`.
- IMP-08 native-review ballots: `docs/native-review/ballot-egyptian.md` (18
  items) and `ballot-levantine.md` (35 items). `7821f63`. The two ballots are
  the artifact; no reviewer has filled either one in, so there is no run to
  point at.
- IMP-09 fidelity check for names, dates and citations, reported on every
  validator run, with `--mode` and `--strict-fidelity`. `3388a16`, documented
  in `ccf1441`; `docs/evidence/round1-waveD-tests.txt`.
- IMP-11 `docs/COVERAGE-MAP.md`, `tools/check-skill.js --refs` and
  `tests/coverage-map.test.js`. `5532f4f`;
  `docs/evidence/round1-waveE-checks.txt`.
- IMP-12 classical rhetoric layer for MSA: `AR-MSA-029` through `AR-MSA-033`,
  each with a provenance row. `0e63a64`;
  `docs/evidence/round1-fp-measure-imp12.txt`.
- IMP-20 ignore regions in both detectors
  (`<!-- humanizer:ignore -->` and `<!-- humanizer-ignore-start -->`) plus
  `tools/self-scan.js` and `tools/self-scan-budgets.json` over 30 project
  files. `949da07`; `docs/evidence/round1-wave2G-self-scan.txt`.
- IMP-21 Era column on all 49 Tier 1A vocabulary entries, every one tagged
  `unknown` because no upstream source dates an individual word. `5532f4f`;
  `docs/discrepancies/round1-docs.md` section 1.
- IMP-23 `AR-SH-008` vocabulary concentration: a graded P2 signal over
  top-word share and type-token ratio, gated at the corpus p97.5 and p2.5.
  `9de5d8f`; `docs/evidence/round1-wave2F-vocab-distribution.txt`.
- IMP-25 `docs/LANGUAGE-CODES.md` and `references/_TEMPLATE.md`. `5532f4f`;
  `docs/evidence/round1-waveE-checks.txt`.
- IMP-27 ambiguous-marker routing guard in `lib/lang.js`: nine MSA homographs
  (eleven spellings) are reported as `ambiguousDistinct` and never as dialect
  evidence, plus an MSA-dominance guard. Added mid-round from corpus finding
  1. `9de5d8f`; `docs/evidence/round1-wave2F-marker-homographs.txt`.

### Changed

- IMP-10 overlapping findings are grouped and `detect.js --json` reports
  `affectedCoveragePercent`. Fields were added, none renamed. `3388a16`;
  `docs/evidence/round1-waveD-tests.txt`.
- IMP-13 a `formal` register profile relaxes the `AR-SH-004` burstiness bound
  from CV 0.35 to 0.22. It is the only register-conditional gate, and two
  profiles is the documented ceiling. `3388a16`;
  `docs/evidence/round1-waveD-tests.txt`.
- IMP-14 every `--json` report carries `authorshipClaim: false` and a
  `calibration` label, `uncalibrated-review-signal` for the Arabic engine.
  `3388a16`; `docs/evidence/round1-waveD-tests.txt`.
- IMP-15 every Arabic pattern entry carries a `**Family:**` tag, and `detect`
  reports a P2-only text as clean. Family assignment is this project's
  editorial reading, not an upstream mapping. `5532f4f`;
  `docs/discrepancies/round1-docs.md` section 3.
- IMP-16 `references/voice-matching.md` states per-source-type confidence
  weighting and that raw sample prose is never stored or echoed. `5532f4f`;
  `docs/evidence/round1-waveE-checks.txt`.
- IMP-17 two `AR-SH-001` entries match as stems, so the ال-prefixed forms hit.
  `0e63a64`; `docs/evidence/round1-fp-measure.txt`.
- IMP-18, IMP-19, IMP-22 and IMP-26: claims-added line, not-flagged list,
  substitutability gate, prompt-injection principle, and the
  shared-core/thin-adapter paragraph, all in `references/core-principles.md`
  and `references/modes.md`. `5532f4f`;
  `docs/evidence/round1-waveE-checks.txt`.
- IMP-27 wave, corpus finding 2, per-pattern contribution cap: the summed,
  repeat-discounted contribution of any one `patternId` is capped at 24, one
  point below `MIXED`. The cap applies
  to P0 as well, against the wave brief, because `AR-MSA-006` is P0 and is the
  one measured single-pattern false positive. `9de5d8f`;
  `docs/evidence/round1-wave2F-fp-run4-cap.txt`.

### Measured

- Arabic false-positive rate over the 300-document corpus: 1.67% (5 of 300,
  Wilson 95% 0.71% to 3.84%) at the start of round 1, and 0.00% (0 of 300,
  Wilson 95% upper bound 1.26%) at `9de5d8f`. Documents scoring at or above 25
  fell from 49 to 31. `corpus/RESULTS.md`;
  `docs/evidence/round1-wave2F-fp-run0-baseline.txt` and
  `docs/evidence/round1-wave2F-fp-run5-imp23.txt`.
- The zero is not the number to quote. 300 documents cannot separate a true
  rate of 0% from one of 1%, the corpus is Wikimedia text in two registers,
  and there is no dialect corpus and no true-positive corpus.
- IMP-20 moved nothing on this corpus: run 2b at `949da07` matches run 0 at
  `0e63a64` in every column, so the whole 1.67% to 0.00% delta belongs to the
  routing guard and the cap. `docs/evidence/round1-wave2F-fp-run2b-head-baseline.txt`.
- `npm test`: 226 tests, 226 pass. `docs/evidence/round1-final-checks.txt`.
- `node evals/run-benchmark.js`: 16 of 16 cases pass.
  `docs/evidence/round1-benchmark.txt`.
- `npm run self-scan`: 30 files, every one inside its budget.
  `docs/evidence/round1-wave2G-self-scan.txt`.
- `node tools/check-node18.js`: no post-Node-18 API usage in 28 files. This is
  a static grep, not a Node 18 run. `docs/evidence/round1-check-node18.txt`.

### Not closed in round 1

See the `Unreleased` section above: IMP-08 execution, IMP-24, the CI run, npm
publish, and a sourced Levantine fixture.

## [0.1.0-build] - 2026-09-17

Initial build handoff. Not a tagged or published release; this is the state
reviewed and evidenced at the end of phase 11.

### Added

- `humanizer-pro` skill: `detect`, `rewrite`, and `edit` modes for English and
  Arabic (فصحى/MSA, مصري/Egyptian, شامي/Levantine, the latter marked
  experimental pending native review), plus an `seo` modifier.
- `scripts/detect.js` and `scripts/validate.js` CLIs.
- Reference rule catalog under `skills/humanizer-pro/references/`.
- Test suite (`tools/run-tests.js`) and eval harness under `evals/`.
- Maintenance tooling: `tools/check-skill.js`, `tools/check-upstream.js`,
  `tools/check-evals.js`, `tools/merge-docs.js`, `tools/build-zip.js`.

### Evidence

- `docs/REVIEW-HANDOFF.md` — review handoff notes and open weak spots.
- `docs/evidence/phase11-acceptance.txt` — acceptance evidence.
- `docs/evidence/phase11-final-npm-test.txt` — final test run before the zip
  rebuild.
- `docs/COMPETITIVE-ANALYSIS.md` — competitive review and the round-1
  improvement plan (IMP-01 through IMP-26) that follows this build.

[Unreleased]: https://example.invalid/humanizer-pro/compare/v0.2.0-build...HEAD
[0.2.0-build]: https://example.invalid/humanizer-pro/releases/tag/v0.2.0-build
[0.1.0-build]: https://example.invalid/humanizer-pro/releases/tag/v0.1.0-build
