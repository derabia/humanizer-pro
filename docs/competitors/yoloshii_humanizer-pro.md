# Competitor review: yoloshii/humanizer-pro

Local clone: `_sources/competitors/yoloshii_humanizer-pro`. Reviewed by reading
all five tracked files in full (`README.md`, `SKILL.md`, `AGENTS.md`,
`CLAUDE.md`, `LICENSE`) plus git metadata. This is a different project from
our own `humanizer-pro`; the two happen to share a name. See section 1 and
section 14 for the explicit distinction.

## 1. Identity

- **URL:** `https://github.com/yoloshii/humanizer-pro` (from `git remote -v`,
  origin fetch/push).
- **HEAD SHA:** `4259690cfbe1619792c2852ce2a2cf1027948235`.
- **License:** MIT (`LICENSE:1-26`).
- **Last commit date:** 2026-07-29T16:13:26+08:00 (`git log -1
  --format=%cI`).
- **File count:** 5 tracked files, no subdirectories: `AGENTS.md`,
  `CLAUDE.md`, `LICENSE`, `README.md`, `SKILL.md` (`git log --oneline` shows a
  single commit; `find . -type f -not -path "./.git/*"`).
- **What it claims to be:** "Agent skill. 44 constraints for writing text
  that doesn't read like AI output." (`README.md:3`). The `SKILL.md`
  frontmatter description opens: "Generates human-sounding text from scratch
  using 44 anti-AI-pattern constraints applied during composition, and edits
  existing drafts without flattening the author's voice." (`SKILL.md:7`).
- **Fork/derivative of what:** Explicitly a derivative of `blader/humanizer`,
  not a git fork. `LICENSE:6-8` states: "This skill is a derivative work of
  blader/humanizer (MIT, 2025), extending the original 29-pattern catalog to
  39 composition constraints with academic citations, constraint priority
  tiers, and three-pass automated verification." (Note: that LICENSE line
  says "39"; the shipped `SKILL.md` and `README.md` both say 44 — the LICENSE
  header text is stale relative to the v2.3.0/v2.4.0 changelog entries that
  added C40-C44, see section 13.) `README.md:85-95` has a full "How it
  differs from blader/humanizer" section naming it as a derivative that
  ports specific constraints (C36-C39) directly from upstream and augments
  others, and `README.md:100-117` ("Sources") names three additional
  non-fork prior-art repos it draws from: `petergyang/no-ai-slop`,
  `AgriciDaniel/anti-slop`, plus a Wikipedia style guide and eight academic
  papers. `git log --oneline` shows only one commit, so there is no commit
  history establishing a `git fork` relationship, and the single commit's
  message ("v2.4.0: quoted-text guard, substance spot-checks, claims audit,
  ELL bar") is consistent with a squashed/synthetic history rather than an
  imported fork lineage — this could not be determined either way from the
  local clone alone.

## 2. Form factor

Pure `SKILL.md`-format agent skill (frontmatter + Markdown instructions,
`SKILL.md:1-15`), plus two agent-configuration files (`AGENTS.md` and
`CLAUDE.md`, byte-identical per `diff` — 0 lines of difference) that hold
"proactive activation" instructions for an agent's own system-prompt
integration. It is explicitly host-agnostic: `README.md:5` says "Works with
any agentic framework that supports SKILL.md," `SKILL.md:5` frontmatter
declares `compatibility: claude-code opencode`, and `README.md:63-65`
describes a "Direct prompt injection" fallback for frameworks without
SKILL.md support ("paste the file contents into your system prompt"). There
is no application, server, or library — no code at all, only Markdown
(confirmed: `find . -iname "*.js" -o -iname "package.json"` returns nothing).
The only host-specific carve-out is Claude Code / Claude apps install
instructions (`README.md:55-65`).

## 3. Languages & varieties

English only. No Arabic (or any other non-English language) content anywhere
in the repo — confirmed by `grep -il "arabic|عربي|shami|egyptian|msa"
*.md` returning zero matches. No variety/dialect handling of any kind exists.

## 4. Pattern catalog

**44 constraints, self-verified by count.** `grep -c "^#### C" SKILL.md`
returns exactly 44, matching the claimed number in `README.md:3` and the
"Quick reference: the 44 constraints" table (`SKILL.md:844-889`, 44 data
rows, C1-C44). Organized into 8 categories: Content (C1-C8), Language
(C9-C14), Style (C15-C20), Communication (C21-C25), Filler/Hedging (C26-C28),
Epistemic/Structural (C29-C35), Voice/Form (C36-C39, ported from upstream
blader/humanizer 2.5.1), Rhetorical staging and register (C40-C44, derived
from `petergyang/no-ai-slop`) (`SKILL.md:58-66`).

- **Before/after examples:** Yes, for the more subtle constraints — C4
  (`SKILL.md:141-145`), C11 tailing negation (`SKILL.md:212-216`), C36
  (`SKILL.md:417-421`), C37 (`SKILL.md:431-435`), C38 (`SKILL.md:445-449`),
  C39 (`SKILL.md:459-469`), C40 (`SKILL.md:483-487`), C41 (`SKILL.md:497-501`),
  C42 (`SKILL.md:511-515`), C43 (`SKILL.md:527-531`). Not every constraint
  gets one (e.g. C1-C3, C5-C10 are kill-list + instruction only).
- **IDs/provenance:** Every constraint has a stable C-number, and the
  "Reference" section (`SKILL.md:909-926`) attributes each cluster of
  constraints to a named source: Wikipedia:Signs of AI writing (April 2026
  revision), Kobak et al. 2024 (excess word frequency), Reinhart PNAS 2025
  (noun-verb ratio, basis for C32), Tripto et al. EMNLP 2025 (basis for C29,
  C35), DivEye 2025 (basis for C31), Yakura et al. 2024, lmmx AI Tells
  Rubric (basis for C30, C33, C34), Dentella & Wang EMNLP 2025, plus the
  three prior-art repos. This is unusually well-cited for a prompt-only
  skill.
- **False-positive carve-outs:** Yes, a dedicated section, "Ineffective
  indicators (do not flag these)" (`SKILL.md:893-905`): perfect grammar,
  mixed register, "bland" prose, unusual vocabulary, epistolary structure,
  isolated conjunction use, and secondhand/quoted text. There is also a
  repo-wide "standing rule" that quoted, mentioned, or discussed text is
  never a hit (`SKILL.md:109-111`), and an ELL (English-language-learner)
  bar that requires 3+ independent signals before flagging non-native
  writing in detect-only mode (`SKILL.md:584`, `AGENTS.md:17`).

## 5. Detection

**Prompt-only, not a deterministic detector.** There is no executable code
anywhere in the repo (confirmed above). "Pass 1: Pattern scan (automated)"
(`SKILL.md:638-724`) presents itself as "Run these grep patterns against the
draft," and gives ~25 actual regex snippets (e.g. `SKILL.md:644-719`), but
these are instructions for the LLM to apply conceptually (or, at best, for a
human to run externally with `grep`) — there is no `detect.js`, no scoring
script, and no packaged tool. `README.md:65` confirms this design choice:
"The skill is self-contained and only requires text search (grep or
equivalent) for the Pass 1 pattern scan. File read/write is optional."
- **Score output:** Explicitly and repeatedly refused. `SKILL.md:586`: "Do
  **not** score it, rate it, or give a percentage." `SKILL.md:587`: "Do
  **not** estimate whether a model wrote it." This is a deliberate design
  stance, not an omission (see section 11).
- **Offsets:** None. Findings are reported by quoting the matched line
  (`SKILL.md:580`: "Quote the line it fired on"), not by character/line
  offset.
- **Density grading:** Pass 1 hits are graded HIGH/MED/LOW by frequency-per-
  1000-words and position rather than treated as flat hits
  (`SKILL.md:754-763`), which is a real methodological idea even without
  executable code — see section 12.

## 6. Modes & output contract

Three functional modes, though not named as cleanly as a CLI would name them:
- **Compose/rewrite** (the default path): Phases 1 (calibration) → 2
  (composition) → 3 (voice injection) → 4 (four-pass verification) → 5
  (final output) (`SKILL.md:19-26`).
- **Preservation/edit mode** ("Phase 2.5", `SKILL.md:552-590`): triggered
  when the user hands over an existing draft instead of asking for new text.
  Explicitly replaces phases 1-3; constraints still apply but "the author's
  voice outranks them" (`SKILL.md:554`).
- **Detect-only / review mode**: a sub-branch of Phase 2.5 for "does this
  sound AI" requests with no rewrite (`SKILL.md:577-589`).

**Second pass:** Yes. Phase 4 is a four-pass verification stage run after
every composition draft: Pass 1 pattern scan, Pass 2 structural audit
(`SKILL.md:765-794`, including a "substance spot-check" of deletion/inversion
micro-tests), Pass 3 introspective self-audit ("What makes the below so
obviously AI generated?", `SKILL.md:796-808`), Pass 4 read-aloud test
(`SKILL.md:810-817`).

**Structured output contract:**
- Compose mode: "Do not mention that you used this skill... Output the text
  as if a human wrote it" — no meta-commentary (`SKILL.md:827-838`).
- Edit mode: edited text plus a short "What changed" list, ending in a
  mandatory claims audit line "Claims added: 0" (`SKILL.md:573-575`).
- Detect-only mode: a structured report of C-numbered findings with quoted
  line and fix, substance-test findings, and a closing "Not flagged" list
  naming deliberately-unreported patterns and why (`SKILL.md:577-589`).

## 7. Voice matching / profiles

Yes — "Phase 1A.5: Voice calibration from a writing sample (optional)"
(`SKILL.md:77-98`). It reads a supplied writing sample and extracts sentence-
length patterns, word-choice level, paragraph openings, punctuation habits,
recurring phrases/tics, and transition style, explicitly warning against
"upgrading" casual vocabulary ("Don't promote 'stuff' and 'things' to
'elements' and 'components'," `SKILL.md:90`). No named preset "voice
profiles" (casual/professional/technical/etc.) exist — voice comes only from
Phase 1A's four-question table (register/perspective/stance/audience,
`SKILL.md:45-52`) or from a supplied sample. No file-based profile library.

## 8. Preservation & SEO safety

**Preservation:** Strong, but narrower in scope than a full fact/link/code
protection system. The standing rule protects quoted/mentioned text in every
phase (`SKILL.md:109-111`). Phase 2.5 has an explicit protect-list table
(hedges, profanity, digressions, fragments, repeated vocabulary, uneven
polish, quoted material — `SKILL.md:558-569`), a "restore specifics before
sanding surface" ordering rule (`SKILL.md:571`), and a mandatory claims audit
("Claims added: 0") that treats any new fact/name/number/date as an invented
addition to be removed (`SKILL.md:575`).

**SEO:** No dedicated SEO mode, no keyword/link/heading/schema protection
mechanism, and no validator of any kind. The word "SEO" does not appear
anywhere in the repo (confirmed by reading all files in full — no SEO
section exists in `SKILL.md`, `README.md`, `AGENTS.md`, or `CLAUDE.md`).

## 9. Tests/evals/evidence

None. No `tests/` directory, no fixtures, no eval runs, no benchmark numbers
of any kind. The only quasi-empirical claims are citations to third-party
academic papers describing properties of LLM output in general (Kobak et al.,
Reinhart, Tripto et al., DivEye, Stowe et al. — `SKILL.md:909-926`), not
benchmarks of this skill's own output quality. There is no self-reported
accuracy, precision/recall, or before/after scoring on a corpus.

## 10. Native-speaker quality signals for Arabic

Not applicable — no Arabic content present anywhere in the repo.

## 11. Ethics

Firmly on "better writing," not detector evasion, and unusually explicit
about it for a competitor in this space. Multiple hard rules:
- Never invent citations, DOIs, ISBNs, URLs (C8, `SKILL.md:167-174`).
- Never hallucinate facts in edit mode — the "Claims added: 0" audit
  (`SKILL.md:575`) makes this a checked deliverable, not just a principle.
- Detect-only mode explicitly refuses to claim authorship-detection
  authority: "Do not estimate whether a model wrote it. Detectors guess; a
  named pattern is evidence the user can check themselves." (`SKILL.md:587`).
- No academic-dishonesty framing anywhere — the skill's stated purpose is
  writing quality and reader trust ("a reader might suspect AI wrote it,"
  `README.md:79`), not passing a specific detector or evading plagiarism
  checks. There is no explicit refusal clause comparable to our own
  `core-principles.md`'s stop-and-say-so rule for academic-integrity evasion
  requests, but the design (no score, no authorship claim, claims audit)
  functionally discourages that use case without stating it as a named
  policy.

## 12. Notable ideas worth borrowing

This is the most important section, and despite the repo's small size (5
files, no code) there is real, specific craft worth taking:

1. **Density-graded pattern scoring instead of flat hit/no-hit
   (`SKILL.md:754-763`).** HIGH/MED/LOW grading by frequency-per-1000-words
   *and* position (openings/closings weighted hardest), rewritten worst-
   first. Our own detector (`skills/humanizer-pro/scripts/lib/`) is
   signal-weighted but this repo's explicit "co-occurrence is the signal,
   not any single word" framing (`SKILL.md:183`, citing Kobak et al.) and
   its position-weighting of openings/closings is a concrete refinement
   worth checking our own weighting against.
2. **"Thin, don't shave" over-correction guard (`SKILL.md:763`,
   `README.md:20`).** An explicit named failure mode: stripping every tell
   collapses prose into "a flat, equally-detectable 'mean.'" This is a
   sharp articulation of a real risk in any rewrite pipeline and is worth
   adding as an explicit named principle in our own `modes.md` / `precedence.md`
   if it isn't already covered as clearly.
3. **The claims audit as a hard output-contract line
   (`SKILL.md:575`): "Claims added: 0."** A single checkable line that
   forces the model to self-report zero-invention, ending every edit-mode
   response. This is simple, cheap, and directly enforces the never-invent
   principle we already hold as a value (`README.md:13-17` in our own repo)
   but currently don't surface as a required, quotable line in the output
   contract. Worth adding to our `modes.md` edit-mode contract as a literal
   required line.
4. **The "Not flagged" list in detect-only mode (`SKILL.md:583`).** Makes
   restraint visible and auditable: instead of just not mentioning a
   near-miss pattern, the report explicitly names what was seen and
   deliberately not flagged, with the reason. This is a good transparency
   pattern for our own `detect` mode's output contract.
5. **Substance spot-check: deletion and inversion micro-tests
   (`SKILL.md:789-794`).** Runs two cheap tests on the weakest paragraphs: (a)
   delete the most abstract sentence and name what was actually lost; (b)
   negate every significance claim and ask if anyone would assert the
   negation — a real logical test for vacuous "plays a crucial role"
   language. This targets a different failure mode than pattern-matching
   (fluent emptiness that passes every style check), which our stylistic
   pattern catalogs likely don't test for at all. Strong candidate for
   addition to our `modes.md` detect/rewrite verification steps.
6. **Explicit era-tagging of AI vocabulary by model generation
   (`SKILL.md:185-190`).** Splits the vocabulary kill-list into GPT-4 era,
   GPT-4o era, GPT-5 era buckets and states explicitly that lexical
   watch-lists decay and need periodic re-baselining, while structural
   constraints are stable. This is a good discipline to apply to our own
   `en-vocabulary.md` tiers, which (per our `REVIEW-HANDOFF.md` §3.8)
   inherit upstream's vocabulary unchanged and don't carry this kind of
   self-aware decay warning.
7. **ELL (English-language-learner) fairness bar with academic citation
   (`SKILL.md:584`, citing Stowe et al., ACL 2026).** Requires 3+
   independent-*kind* signals (not 3 instances of one construction) before
   flagging style issues in non-native writing, and names the specific
   finding it is based on (detectors over-flag ELL writers; human raters on
   the same essays showed no bias). Our own Arabic-focused project has an
   analogous fairness concern for dialect writers; this citation and the
   "independence" counting rule (distinct kinds of signal, not repeated
   manifestations of one) is a precise mechanism worth checking against our
   own P0/P1 gating logic.
8. **"Handling — delete, do not improve" for kickers (`SKILL.md:525`).** A
   specific, testable repair rule for the fake-profound-ending pattern:
   never rewrite the kicker into a "better" version of itself; delete it and
   end on the clearest concrete sentence that already exists. Small but
   concrete guidance that avoids a common rewrite failure mode (polishing a
   bad pattern instead of removing it).
9. **The corrected-claim discipline example (v2.4.0 changelog,
   `README.md:129`, `SKILL.md:244`).** They caught and fixed their own
   overclaim (an unsourced "3-10x" em-dash multiplier) by citing the one
   actual pre-registered measurement they could find (Czuma 2026) and
   explicitly noting its limits ("a population-level indicator, not a
   per-document detector"). This is a good template for auditing our own
   catalog's numeric claims (see our own §3.8 concern about an "unverified
   5-20x" premise) — worth a self-audit pass using the same method.

## 13. Weaknesses

- **No executable code at all.** Every "automated" claim (Pass 1 "grep
  patterns," the `README.md:3` framing as something you "run") is aspirational
  — there is no script to actually run. `SKILL.md:638` says "Run these grep
  patterns against the draft," but nothing in the repo runs them; the LLM
  must simulate grep by reading. This makes "detection" entirely
  model-dependent and non-reproducible between runs or models.
- **Stale/contradictory pattern count in LICENSE.** `LICENSE:7` says "39
  composition constraints," while `README.md:3`, `SKILL.md:7`, and the
  quick-reference table all say 44. The LICENSE header was evidently not
  updated after the v2.3.0 changelog added C40-C44 (`README.md:133-141`).
- **No tests, fixtures, or evals of any kind.** Zero empirical validation
  that the constraints actually work as claimed on real text (section 9).
  Compare to our own `tests/` + `evals/runs/` directories, which at least
  attempt fixture-based and eval-based validation (with self-acknowledged
  limits, per our `REVIEW-HANDOFF.md` §3).
- **No offsets, no score, no machine-checkable output at all.** While the
  no-score stance is a deliberate ethical choice (section 11, arguably a
  strength), it also means there is no way to programmatically verify
  whether the skill's own claims (e.g. "em-dash count must not exceed
  word_count/500," `SKILL.md:248`) were actually honored in a given run —
  everything depends on the LLM self-reporting correctly, with no
  external check.
- **Single-commit git history.** `git log --oneline` shows exactly one
  commit (`4259690`). There is no visible development history, so claims
  about "v2.2.0 → v2.3.0 → v2.4.0" evolution (documented in the
  `README.md:118-147` changelog) cannot be independently verified against
  commit-level provenance the way our own project's `docs/PROVENANCE.md`
  and pinned upstream SHAs allow.
- **English-only, single-audience.** No internationalization of any kind,
  which is a legitimate scope choice but a real capability gap next to a
  bilingual (English/Arabic, 3-variety) tool.
- **No SEO/CMS/structured-content protection.** Preservation mode protects
  voice and facts but has no concept of protecting keywords, headings,
  links, schema markup, or other structured spans — a rewrite of a
  published blog post using this skill could freely restructure headings
  and links.
- **No file-type guardrails.** Nothing in the repo refuses to run on code,
  config, or data files the way our own `edit` mode explicitly does
  (`SKILL.md:43-45` in our own project); this repo's `README.md:81-83` only
  states "what it's not for" as a documentation note ("Terminal responses,
  code, config files, commit messages, internal notes"), with no mechanism
  enforcing it.

## 14. Verdict vs humanizer-pro

This repo is **not our project**. It shares only the name "humanizer-pro"
with the project at `D:\Dev\htdocs\humanizer-pro`; it is an independently
authored, English-only, prompt-only agent skill by a different author
(`yoloshii`, GitHub), built on a different upstream lineage description (a
direct textual/conceptual derivative of `blader/humanizer`, per its own
LICENSE and README, not a git fork of it), with no code, no Arabic support,
and no test suite.

| # | Dimension | This repo | humanizer-pro (ours) | Lead |
|---|---|---|---|---|
| 1 | Identity | MIT, single-commit clone, explicit derivative-of-blader/humanizer claim in LICENSE, 5 files | MIT, active multi-file build with pinned upstream SHAs (3 upstreams), extensive `docs/` provenance trail | We lead (traceability) |
| 2 | Form factor | Pure `SKILL.md` + config files, zero code, explicitly host-agnostic including raw prompt-injection fallback | `SKILL.md` router + Node scripts (`detect.js`, `validate.js`) + reference files, targets Claude Code/Codex/Cursor/Claude apps | Tie (they lead on pure-portability; we lead on executable tooling) |
| 3 | Languages & varieties | English only | English + Arabic (MSA, Egyptian, Levantine with variety detection) | We lead |
| 4 | Pattern catalog | 44 self-verified constraints, well-cited (Wikipedia + 8 academic papers + 3 prior-art repos), before/after examples on ~10 | 141 patterns across EN/AR-SH/AR-MSA/AR-EGT/AR-SHM per our own provenance count (`REVIEW-HANDOFF.md` §4) | We lead on volume; they lead on per-pattern citation density |
| 5 | Detection | Prompt-only "grep patterns," no executable, explicitly no score/offsets | Actual deterministic `detect.js`/`lib/` engines with JSON output, though heuristic and fixture-tuned (`REVIEW-HANDOFF.md` §3.5) | We lead |
| 6 | Modes & output contract | compose / preservation-edit / detect-only, four-pass verification, claims-audit line, "Not flagged" list | detect / rewrite / edit / seo modifier, mandatory second-pass audit, four-item report contract | Tie — both have real structured contracts, different strengths |
| 7 | Voice matching / profiles | Sample-based calibration only, no named profile library | Sample-based (`voice-matching.md`) plus 5 named profiles (casual/professional/technical/warm/blunt) | We lead |
| 8 | Preservation & SEO safety | Strong preservation (protect-list, claims audit, quoted-text guard); no SEO/CMS protection at all | Preservation plus a dedicated `seo` modifier protecting keywords/headings/links/schema, with a validator | We lead |
| 9 | Tests/evals/evidence | None | `tests/` fixture suite + `evals/runs/` with self-graded iterations (acknowledged as builder-graded, not independent) | We lead |
| 10 | Native-speaker Arabic signals | N/A (no Arabic) | Explicitly flagged as unreviewed/experimental for Levantine, self-written fixtures for all varieties (`REVIEW-HANDOFF.md` §3.1-3.2) | We lead by having the capability, but both are unverified by native speakers |
| 11 | Ethics | Strong: no score, no authorship claims, claims-added audit, no detector-evasion framing | Strong: explicit refusal clause for academic-integrity evasion requests, never-invent principle, protected-content precedence level | Tie |
| 12 | Notable ideas to borrow | Several concrete, well-reasoned mechanisms (density grading, thin-don't-shave, claims audit, Not-flagged list, substance spot-check, ELL bar, era-tagged vocabulary) — see §12 | N/A (this is the borrowing side of the comparison) | They lead (as a source of ideas) |
| 13 | Weaknesses | No code, no tests, stale LICENSE count, single-commit history, no SEO/file-type guardrails | Self-acknowledged: unreviewed Arabic (esp. Levantine), self-written fixtures, untuned corpus calibration, Node 18 never actually run, inherited upstream English-detector issues (`REVIEW-HANDOFF.md` §3) | Tie — both projects are candid about real gaps |
