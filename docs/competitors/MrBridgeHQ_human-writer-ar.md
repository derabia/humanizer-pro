# MrBridgeHQ / human-writer-ar — competitor review

Repo root reviewed: `_sources/competitors/MrBridgeHQ_human-writer-ar/` (30 files, all read).

## 1. Identity

- URL: not stated in-repo (no `.git/config` remote inspected here; folder name implies `github.com/MrBridgeHQ/human-writer-ar`).
- HEAD SHA: `ca6607d4b76164ce30e1dc6983d7561742274975` (`git log -1`: "Sync with upstream: content-distinctiveness layer + plain-sentence default", Tue Jul 28 2026).
- License: MIT, `LICENSE:3` — "Copyright (c) 2026 Mr Bridge".
- Last commit date: 2026-07-28 (from `git log -1 --format=%ad`).
- File count: 30 (`README.md`, `LICENSE`, and 28 files under `skills/human-writer-ar/`).
- Claim (quote, `README.md:3`): "Make Arabic AI text read as human-authored, and audit any Arabic draft with a **deterministic 0-100 AI-detection score** before you publish. A Claude Code Agent Skill."

## 2. Form factor

Agent Skill (`skills/human-writer-ar/SKILL.md:1-4`, YAML frontmatter with `name`/`description`), plus an `INSTALL.md` that targets Claude Code specifically at user level (`~/.claude/skills/`, `INSTALL.md:3`). Ships a Python analyzer (`scripts/analyze.py`) invoked by the agent via shell, not a standalone app. Host: explicitly "Claude Code Agent Skill" (`README.md:3`); the skill is one satellite of a stated multi-host-agnostic family — `README.md:5`: "The Arabic member of the `human-writer` per-language family (English, French, Spanish, Portuguese, German, Arabic, Hindi)." Agent-agnostic in principle (Markdown + a CLI script anyone can shell out to) but install docs and workflow language ("Claude Code session", `skills/human-writer-ar/README.md:17`) are Claude Code-specific.

## 3. Languages & varieties

Arabic only, and only one variety: Modern Standard Arabic (MSA). `SKILL.md:3`: "Covers ar only… Adds Arabic-specific doctrine." No Egyptian/Levantine/Gulf/Maghrebi coverage; no other spoken languages in this satellite (English/French live in a separate "master" skill referenced but not present in this clone, `SKILL.md:22-24`).

## 4. Pattern catalog

- Suspect vocabulary: 174 YAML list entries counted directly in `scripts/rules.yaml` (`grep -c '^\s*- "'` → 174; file comment at `rules.yaml:8` self-describes as "~150 entries, Tier 1 + Tier 2").
- AI-construction regex bank: tiered by severity (high/medium/low), e.g. `rules.yaml:15-52` — "في عالم اليوم" (high), "سواء كنت .{0,30}? أو" (medium), "في الختام" (low).
- Examples quality: extensive before/after pairs with natural-reading Arabic, e.g. `references/humanization-techniques.md:44-60` (rhythm/stdev worked example) and a full deliberately-bad fixture `tests/fixtures/ai_samples/ar_baseline_clean_input_001.md` paired with a genuinely natural human fixture sourced from Arabic Wikipedia (`tests/fixtures/human_samples/ar_human_real_wikipedia-wine.md`).
- IDs/provenance: no per-pattern IDs (unlike humanizer-pro's `AR-*` IDs), but every rule ties to a regex/vocab entry in `rules.yaml` traceable by string match; `PROJECT_HISTORY.md` documents a TDD provenance trail per detector.
- False-positive carve-outs: yes — `scripts/analyze.py:48-82` `strip_non_prose()` excludes fenced code, HTML comments, markdown tables, and an opt-in `<!-- human-writer:ignore-start -->…<!-- ignore-end -->` region so doctrine files can quote bad examples without self-flagging (used throughout `humanization-techniques.md` and `checklists.md`).

## 5. Detection

Deterministic Python detector/script, not prompt-only: `scripts/analyze.py` (857 lines) computes 8 signals (em-dash density, sentence-length stdev, lexical diversity/TTR, clitic-aware suspect vocabulary, AI-construction regex matches, Arabic tricolon detector, bullet parallelism, header-pyramid) into a weighted 0-100 score (`compute_score`, `analyze.py:288-339`) with 4-band verdicts (`rules.yaml:310-314`: LOW/MEDIUM/HIGH/CRITICAL). Content-type weighting is per-type (`rules.yaml:304-308`: marketing/short-comms/technical/editorial-seo each weight statistical/stylistic/structural differently). Offsets: match `positions` (character offsets) are returned for vocabulary and construction hits (`analyze.py:427`, `461`). Optional live external-detector integration (Copyleaks, GPTZero, Originality.ai) via `--external`, lazily imported `httpx` so it stays offline by default (`analyze.py:507-670`).

## 6. Modes & output contract

Three modes: WRITE / CLEAN / AUDIT (`SKILL.md:34-38`, routing table). Four content-types: marketing long-form, short-comms, technical, editorial-SEO, each with a dedicated adapter file. Master checklist forces re-scoring after any rewrite (`SKILL.md:60-70`): score ≤24 ship, 25-49 apply top-3 recs and re-score, ≥50 restart (WRITE) or apply a stronger rewrite strategy (CLEAN) — effectively a mandatory second pass gated by the score, not merely advisory. Structured JSON or human-readable CLI output (`analyze.py:833-852`, `--format json|human`).

## 7. Voice matching / profiles

Narrow but present: `references/content-distinctiveness.md:30-32` "Voice context: precision beats volume — load 3 to 5 of their BEST on-voice samples, never the full archive… a full brand book pasted into context produces averaged output." No named voice-profile taxonomy (casual/professional/technical/etc.) like humanizer-pro's `voice-matching.md`; this is one paragraph of doctrine, not a dedicated engine.

## 8. Preservation & SEO safety

No SEO mode, no keyword/link/heading protection engine, and no automated preservation validator comparable to humanizer-pro's `validate.js`. The closest analogue is content-level, not mechanical: `content-distinctiveness.md` Gate 2 ("no invented facts… launch dates, prices, numbers, proof points… Use a `[PLACEHOLDER: ...]` or an ASSUMED entry instead", lines 20-22) and Gate 3 the "substitutability test" (swap brand name for a competitor's, line 24). `strip_non_prose()` (`analyze.py:68-82`) protects code fences and tables from being scored, which is a detector-safety carve-out, not an SEO-preservation guarantee for a rewrite.

## 9. Tests/evals/evidence

Real pytest suite: `scripts/test_analyze.py`, 634 lines, "54 pytest tests calibrated to Arabic" (`README.md:56`, confirmed by `PROJECT_HISTORY.md`: "`pytest scripts/test_analyze.py` → 54 passed"). Fixtures: one deliberate-AI sample (326 words), 3 synthetic human samples plus one **real** sourced sample (`ar_human_real_wikipedia-wine.md`, ~650/678 words, CC BY-SA 4.0 excerpt from Arabic Wikipedia's "نبيذ" article, with documented cleanup in `_provenance.md:9-28`), and one borderline fixture. Calibration numbers are sourced and reproducible in `PROJECT_HISTORY.md`: AI fixture scores 60/100 HIGH_RISK; human editorial/marketing fixtures score 13/100 LOW_RISK; the real Wikipedia sample scores 23/100 LOW_RISK with 0 em-dash and 0 Latin-punctuation hits. No external human-eval or third-party benchmark; self-reported only, but the pytest suite and a real (non-synthetic) FP-calibration anchor is stronger evidence than any of the other three competitors provide.

## 10. Native-speaker quality signals

The MSA prose throughout the reference docs (worked examples, fixture text) reads as fluent, idiomatic MSA to a non-native reviewer — correct clitic attachment, natural connector usage, register-appropriate vocabulary. The authors explicitly flag their own synthetic samples as the weak link: `_provenance.md:20-22`: "the synthetic Arabic samples were the weakest in the family (Claude-authored MSA can carry an over-even register a native ear would catch)" — and deliberately added a real Wikipedia excerpt as the "primary FP-calibration anchor" to compensate. This is an unusually self-aware, evidence-seeking response to exactly the risk humanizer-pro's own §3.1/3.6 flag for itself.

## 11. Ethics

Targets better writing plus detector survival simultaneously, explicitly aimed at passing Copyleaks/GPTZero/Originality.ai (`README.md:3,17`: "targeting sub-25 percent AI-probability on Copyleaks and GPTZero"). Not framed around academic dishonesty (no essay/homework framing anywhere), but the marketing/SEO framing ("mr-bridge.com ships localized marketing and editorial copy", `skills/human-writer-ar/README.md:11`) is commercial content production, not deception of an academic integrity system. Strong content-invention guardrail: `content-distinctiveness.md:20-22` — "Never invent factual claims to fill an intent gap… Realistic-sounding invented specifics are worse than generic prose, because they ship as published falsehoods under the user's name." This is an explicit, hard anti-fabrication rule, similar in spirit to humanizer-pro's never-invent principle.

## 12. Notable ideas worth borrowing

- **Clitic-aware vocabulary matching** (`analyze.py:440-463`): a bare stem like "كلمة" is matched even when Arabic attaches و/ف/ب/ك/ل clitics or the ال article with no space, via a boundary-aware regex prefix/suffix. This directly solves a precision problem any Arabic lexical-hit detector has; worth checking whether humanizer-pro's Arabic detector already does this (its own weak-spot list doesn't mention it, which is itself worth confirming).
- **Arabic-specific typography tell**: `detect_latin_punct_in_arabic` (`analyze.py:379-404`) flags Latin `, ; ?` used adjacent to Arabic letters where the native ، ؛ ؟ belong, calibrated to zero-fire on clean native prose (confirmed by fixture testing). This is a cheap, high-precision, genuinely Arabic-only signal.
- **The "content-distinctiveness" layer / substitutability test** (`content-distinctiveness.md`): a manual gate applied *before* drafting (4-question intent brief) and *after* (swap the brand name for a competitor's — if the piece still reads fine, it's average content regardless of detector score). This targets a category of problem (bland-but-undetectable AI content) that a lexical/statistical detector structurally cannot catch, and is a genuinely distinct axis from tell-removal.
- **Ignore-region contract for doctrine files** (`analyze.py:48-53`, `<!-- human-writer:ignore-start -->`): lets reference docs quote deliberately bad AI examples without those examples corrupting the doctrine file's own score if it were ever self-scanned, and is reused consistently across `checklists.md` and `humanization-techniques.md`.
- **Figure-of-speech budget as an explicit, quantified rule** (`humanization-techniques.md:19-29`, section 0): "Never two figures of speech in the same sentence… Marketing and short-comms: at most 1 figure per ~100 words… Technical: at most 1 figure per ~200 words and plain-SVC share above ~85%." Turns a vague "don't overwrite" instinct into a checkable budget per content-type.
- **Content-type-weighted scoring** (`rules.yaml:304-308`): the same 8 raw signals are reweighted per content-type (e.g. short-comms downweights statistical stdev 0.6x but upweights stylistic 1.2x) rather than a single fixed formula across all text types.
- **Real (non-synthetic) FP-calibration fixture** sourced via Firecrawl from Arabic Wikipedia with documented cleanup steps (`_provenance.md`) — a concrete, reproducible way to partially answer humanizer-pro's own §3.1 "all fixtures are self-written" risk.

## 13. Weaknesses

- Single variety (MSA only) — no dialect coverage at all, a hard limit humanizer-pro exceeds (MSA + Egyptian + experimental Levantine).
- No SEO-preservation mode or mechanical validator — nothing analogous to humanizer-pro's `validate.js` keyword/heading/link checks.
- Vocabulary/construction lists are still lexical pattern-matching at heart; despite clitic-awareness, this shares the same class of risk as any keyword list (semantic drift, false negatives from paraphrase).
- Tatweel-overuse and burstiness/comma-density thresholds are documented but explicitly "UNREAD by analyze.py" / vestigial (`rules.yaml:20-26`) — doctrine promises more than the code checks.
- No structured JSON schema versioning or offset-to-original-text mapping guarantees documented (unlike humanizer-pro's stated offset mapping for Arabic).
- Self-graded evidence only; PROJECT_HISTORY.md is the builder's own TDD journal, not an independent review.
- Installation and workflow language is Claude-Code-specific despite claiming a general "Agent Skills" standard.

## 14. Verdict vs humanizer-pro

| Dimension | MrBridgeHQ/human-writer-ar | humanizer-pro | Verdict |
|---|---|---|---|
| 1. Identity/maturity | MIT, single dated commit, small polished satellite of a claimed 7-language family (others not in this clone) | MIT, "v0.1.0-build... not independently reviewed" (`README.md:21-28`) | tie — both are early-stage, self-described as unverified |
| 2. Form factor | Claude-Code-specific Agent Skill + Python CLI | Explicitly multi-host (Codex, Claude Code, Cursor, Claude apps) install instructions | we lead |
| 3. Languages/varieties | MSA only | MSA + Egyptian + experimental Levantine, plus English | we lead |
| 4. Pattern catalog | 174 vocab entries + tiered regex bank, clitic-aware, with IDs implicit via string match | Tiered (1A/1B/2/3) vocabulary + pattern IDs (`AR-*`), per REVIEW-HANDOFF | tie — both substantial; theirs has clitic-awareness we should verify we have |
| 5. Detection | Deterministic Python scorer, 8 signals, weighted by content-type, offsets returned, optional live external-detector calls | Deterministic JS scorer (`detect.js`), weighted phrase/signal model, own fixtures only (REVIEW-HANDOFF §3.5) | tie — both deterministic; theirs adds live external-detector integration and content-type reweighting we lack |
| 6. Modes & output contract | WRITE/CLEAN/AUDIT, score-gated re-write loop, 4 content-types | detect/rewrite/edit + seo modifier, mandatory second-pass audit | tie |
| 7. Voice matching | One paragraph of doctrine (3-5 best samples) | Dedicated `voice-matching.md` with 5 named profiles | we lead |
| 8. Preservation & SEO safety | None (no SEO mode, no validator) | Dedicated `seo-mode.md` + `validate.js` mechanical preservation checks | we lead |
| 9. Tests/evals/evidence | 54 pytest tests, real Wikipedia FP-anchor with documented cleanup, self-reported scores | node --test suite, evals runs, but §3.1/3.5/3.6/3.11 self-flag calibration and grading as weak | they lead — the real-sourced fixture is evidence we don't have |
| 10. Native-quality signals | Fluent-reading MSA doctrine/examples to a non-native reviewer; authors self-flag synthetic-sample weakness and mitigate with a real source | Explicitly "not independently reviewed... Levantine Arabic experimental pending native review" (README:21-28), same self-flagged risk | tie |
| 11. Ethics | Explicit anti-fabrication rule; targets detector-survival for commercial content, not academic dishonesty | Explicit anti-fabrication + explicit refusal of detector-evasion/academic-integrity requests | we lead — humanizer-pro has an explicit refusal policy for detector-evasion requests that this repo does not state |
| 12. Borrowable ideas | Clitic-aware matcher, Latin-punct-in-Arabic tell, substitutability test, figure-of-speech budget, content-type reweighting | — | they lead (this section is about what to borrow FROM them) |
| 13. Weaknesses | Single variety, no SEO mode, self-graded only | Self-flagged extensively in REVIEW-HANDOFF §3 (11 items) | tie — both are candid about limits, humanizer-pro documents them more exhaustively |
