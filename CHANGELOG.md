# Changelog

All notable changes to `humanizer-pro` are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project uses [Semantic Versioning](https://semver.org/) with
pre-release suffixes (`-build`, `-rc.N`) for interim states that have not
been tagged as a stable release.

## [Unreleased]

Round 1 improvement items tracked in `docs/COMPETITIVE-ANALYSIS.md` section 6.
Planned, not all started; this list will be finalized (and reclassified into
Added / Changed / Fixed) once round 1 closes.

- IMP-01: Arabic human control corpus with Wilson-CI false-positive measurement
- IMP-02: Sourced, non-synthetic Arabic FP anchor fixtures
- IMP-03: CI matrix on Node 18, 20, 22 plus a Windows smoke run
- IMP-04: Deterministic eval invariants in the benchmark harness
- IMP-05: Packaged distribution: npm bin plus host manifests
- IMP-06: Release discipline: version, CHANGELOG, tagged release
- IMP-07: Blinded pairwise evaluation kit
- IMP-08: Native-speaker review ballot for Egyptian and Levantine
- IMP-09: Fidelity validation on every rewrite, plus name, date and citation drift
- IMP-10: Overlap grouping and affected-coverage percentage
- IMP-11: Coverage map plus catalog-to-code parity test
- IMP-12: Classical rhetoric layer for MSA
- IMP-13: Register-conditional thresholds
- IMP-14: Uncalibrated-signal labelling in the JSON contract
- IMP-15: Five-family cross-index and the P2-only stop rule
- IMP-16: Voice profile provenance and privacy model
- IMP-17: Definite-article clitic in Arabic phrase matching
- IMP-18: Claims-added line, Not-flagged list, substance spot-check
- IMP-19: Substitutability and distinctiveness gate
- IMP-20: Self-scan of our own docs with regression budgets
- IMP-21: Era tagging and decay notes on vocabulary tiers
- IMP-22: Prompt-injection principle
- IMP-23: Statistical vocabulary-concentration signal for Arabic
- IMP-24: Gulf variety exploration
- IMP-25: BCP 47 naming note plus an "add a variety" contributor template
- IMP-26: Name the shared-core/thin-adapter architecture explicitly

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

[Unreleased]: https://example.invalid/humanizer-pro/compare/v0.1.0-build...HEAD
[0.1.0-build]: https://example.invalid/humanizer-pro/releases/tag/v0.1.0-build
