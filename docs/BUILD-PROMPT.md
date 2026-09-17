# Build Prompt: `humanizer-pro` — A Unified, Multilingual AI-Writing Humanizer Skill

> **Builder:** Claude Opus 5 in Claude Code, with filesystem, shell, git, and Node access, opened in `D:\Dev\htdocs\humanizer-pro`.
> **Reviewer (later, separate session):** Claude Fable, which will audit the result independently against this same document and the upstream sources.
>
> Paste everything below this line into the builder session. If the session ends before the work is finished, start a new session in the same folder and send: `Read docs/PROGRESS.md and continue from the next step.`

---

## 0. Role and mission

You are a senior engineer and technical editor building a production-grade Agent Skill named **`humanizer-pro`** inside the project root `D:\Dev\htdocs\humanizer-pro` (Windows).

**Your work will be audited by a different AI model that did not see your session.** It will re-read the upstream sources itself, re-run every test and eval, and spot-check provenance at random. Build for verifiability: every claim you make must be reproducible from files and commands in the repository, not from your session memory.

The skill must be **agent-agnostic**: it must load and work in Codex, Claude Code, Cursor, and Claude apps (as an uploaded skill), and it must not depend on any feature unique to one vendor.

### 0.1 Session limits and resumability (read first)

This job is larger than one session. A previous attempt by another model stopped on usage limits with little usable output. Design your work so that any session can end at any moment without losing progress:
**`docs/PROGRESS.md` is the single source of truth for state.** Create it before anything else. It holds: current phase, completed steps (with commit SHAs), the exact next step, open questions, and blockers. Update it **after every completed step**, not only at phase end, and commit it together with that step's work.
**On every session start**, before doing anything else: read this prompt file if present at `docs/BUILD-PROMPT.md`, read `docs/PROGRESS.md`, run `git status` and `git log --oneline -20`, and resume from the recorded next step. Never restart completed phases.
**Save this prompt** verbatim to `docs/BUILD-PROMPT.md` in your first step, so future sessions can re-read it without the user pasting it again.
**Small, frequent commits.** Uncommitted work is lost work. Commit at least after every file or logical unit in long phases (Phases 4, 6, 8).
**Protect your context window.** Do not load whole upstream repositories into the main conversation. Use subagents for heavy reading (one subagent per upstream repo in Phase 2) and have them write results to files; the main session reads only the resulting summaries. Read large reference files by section, not whole.
**If you sense you are close to a limit**, stop starting new work: finish or revert the current step, update `docs/PROGRESS.md`, commit, and tell the user to resume.
### 0.2 Existing partial work

`D:\Dev\htdocs\humanizer-pro` may already contain files from the earlier attempt. Before Phase 1:
List everything present (including hidden files and any `.git` history).
Write `docs/PRIOR-ATTEMPT.md`: what exists, what is usable, what conflicts with this plan.
**Do not trust any prior content by default.** Keep an item only if it matches this plan and you have verified it against the upstream sources; otherwise move it to `_archive\prior-attempt\` (gitignored), never delete silently.
Do not reuse prior pins, inventories, or provenance claims without re-verifying them.
The skill merges the best capabilities of three open-source (MIT) projects into one coherent, non-redundant, well-tested skill:

| Upstream | URL | What we take |
|---|---|---|
| blader/humanizer | https://github.com/blader/humanizer | Voice matching from a user writing sample, core pattern philosophy, pattern catalog |
| conorbronsdon/avoid-ai-writing | https://github.com/conorbronsdon/avoid-ai-writing | Three modes (detect / rewrite / edit), two-pass audit, tiered vocabulary table, voice profiles, deterministic JS detector (0–100 score), preservation validator, structured output format |
| OthmanAdi/humanizer-semitic | https://github.com/OthmanAdi/humanizer-semitic | Arabic patterns: Modern Standard Arabic (`humanizer-ar-msa`), Egyptian (`humanizer-ar-egt`), Levantine (`humanizer-ar-shami`). Hebrew is **out of scope** |

And it adds three things none of them have:
A deterministic **Arabic detector** (0–100 score) covering MSA, Egyptian, and Levantine.
An **SEO-safe mode** that protects keywords, headings, links, anchors, schema, and CMS markup from being altered.
An explicit **rule-precedence system** that resolves conflicts between upstream rules and between languages.
Work autonomously, accurately, and verifiably. Never fabricate patterns, statistics, research citations, or upstream behavior. When the upstream source files contradict anything written in this prompt (for example pattern counts or file names), **the source files win**; record the discrepancy in `docs/DISCREPANCIES.md`.

---

## 1. Non-negotiable principles
**Source-grounded.** Every pattern in the final skill must trace to an upstream file (recorded in `docs/PROVENANCE.md`) or be explicitly labeled `origin: humanizer-pro` with a one-line rationale and at least one before/after example.
**Meaning preservation over detector evasion.** The goal is better, more human writing. The skill must never invent facts, quotes, statistics, sources, personal experiences, or credentials to make text "sound human." If a draft lacks substance, the skill says so instead of padding it.
**Progressive disclosure.** `SKILL.md` is a lean router (target under 350 lines, hard cap 500). Language- and mode-specific detail lives in `references/` and is loaded only when needed. Never inline all catalogs into `SKILL.md`.
**Zero runtime dependencies** for scripts. Node.js `>=18`, CommonJS or ESM (pick one and be consistent), no npm packages at runtime. Dev-only tooling is allowed only if truly necessary; prefer none.
**Windows-first compatibility.** Use Node scripts, not bash, for anything a user runs. Use `path` for all paths. Files are UTF-8 **without BOM**, LF line endings, enforced via `.gitattributes`. All Arabic text must round-trip without mojibake.
**License compliance.** Keep every upstream MIT notice. Adapted code files keep their original copyright header plus a `Modified by humanizer-pro` note.
**No silent decisions.** Every merge conflict, dropped pattern, and deduplication is logged.
**Reviewable provenance.** Every provenance entry records upstream repo, file path, heading or line range, and commit SHA precisely enough that a reviewer can open the exact spot in `_sources\` in under a minute.
**Evidence, not assertions.** Never write "tests pass" or "verified" without the command and its raw output saved under `docs/evidence/` (e.g. `docs/evidence/phase8-npm-test.txt`).
**One commit per phase** (at minimum), with a clear message (`phase-4: merge English catalog`). Do not squash. The reviewer will read the history as a diff trail.
**No self-certification.** Your own eval grading is a *builder self-assessment*. Do not describe the skill as reviewed, validated, or production-ready; that is the reviewer's and the owner's call.
---

## 2. Target repository layout
D:\Dev\htdocs\humanizer-pro\
├── skills\
│   └── humanizer-pro\                 ← the installable, self-contained skill
│       ├── SKILL.md                   ← router + workflow + modes + precedence
│       ├── references\
│       │   ├── core-principles.md     ← shared philosophy (why AI text reads as AI)
│       │   ├── precedence.md          ← conflict-resolution rules, with examples
│       │   ├── modes.md               ← detect / rewrite / edit / seo: exact output contracts
│       │   ├── voice-matching.md      ← sample-based voice calibration + 5 voice profiles
│       │   ├── seo-mode.md            ← protected spans and SEO guardrails
│       │   ├── en-patterns.md         ← merged, deduplicated English catalog (with TOC)
│       │   ├── en-vocabulary.md       ← tiered word/phrase table (1A, 1B, 2, 3)
│       │   ├── ar-shared.md           ← rules common to all Arabic varieties
│       │   ├── ar-msa.md              ← Modern Standard Arabic (الفصحى)
│       │   ├── ar-egyptian.md         ← Egyptian Arabic (عامية مصرية)
│       │   └── ar-levantine.md        ← Levantine Arabic (شامي)
│       ├── scripts\
│       │   ├── detect.js              ← CLI entry: auto language detection → correct engine
│       │   ├── validate.js            ← preservation validator (language-agnostic + Arabic-aware)
│       │   ├── lib\
│       │   │   ├── lang.js            ← language + dialect identification
│       │   │   ├── arabic-normalize.js← normalization with offset mapping
│       │   │   ├── en-detector\       ← adapted from avoid-ai-writing
│       │   │   └── ar-detector\       ← new Arabic engine
│       │   └── README.md
│       └── LICENSES\
│           ├── blader-humanizer.MIT.txt
│           ├── avoid-ai-writing.MIT.txt
│           └── humanizer-semitic.MIT.txt
├── tests\
│   ├── fixtures\{en,ar-msa,ar-egt,ar-shami,seo,false-positives}\
│   └── *.test.js                      ← run with `node --test`
├── evals\
│   ├── evals.json
│   └── runs\                          ← iteration outputs (gitignored except summaries)
├── docs\
│   ├── PROVENANCE.md                  ← pattern → upstream file/line/commit mapping
│   ├── CONFLICTS.md                   ← every conflict and how it was resolved
│   ├── DEDUP-LOG.md                   ← merged/dropped patterns with reasons
│   ├── DISCREPANCIES.md               ← where reality differed from this prompt
│   ├── NATIVE-REVIEW.md               ← Arabic items awaiting a native speaker, by variety
│   ├── REVIEW-HANDOFF.md              ← what the independent reviewer needs (Phase 11)
│   ├── evidence\                      ← raw command outputs backing every claim
│   └── ARCHITECTURE.md
├── tools\
│   └── check-upstream.js              ← compares recorded SHAs to remote HEADs
├── _sources\                          ← upstream clones (gitignored)
├── UPSTREAM.md                        ← repo, commit SHA, version, date, what was taken
├── CREDITS.md
├── LICENSE                            ← MIT for humanizer-pro itself
├── README.md                          ← English, with an Arabic quick-start section
├── package.json                       ← scripts only: test, detect, validate, check-upstream
├── .gitattributes
└── .gitignore
If the upstream structure makes a small deviation clearly better, deviate and document why in `docs/ARCHITECTURE.md`.

---

## 3. Phased execution plan

Create a todo list covering every phase before starting. Mark items complete as you go.

### Phase 1 — Acquire and pin sources
`git init` the project if not already a repo.
Shallow-clone the three upstreams into `_sources\` (`git clone --depth 1`).
Record for each: URL, `git rev-parse HEAD`, version from frontmatter/CHANGELOG/package.json, clone date, license file path → write `UPSTREAM.md`.
Add a **Build environment** section to `UPSTREAM.md`: builder model name and snapshot/version as reported by your environment, reasoning effort if known, OS, Node version (`node --version`), git version, build start date.
Copy each LICENSE verbatim into `skills\humanizer-pro\LICENSES\`.
Add only `_sources/` to `.gitignore`. Eval outputs stay committed so the reviewer can compare them with its own re-runs.
Commit: `phase-1: pin upstream sources`.
### Phase 2 — Deep inventory (read everything; skim nothing)

Read **every** `SKILL.md`, reference file, README, CHANGELOG, detector source, validator source, and test fixture in all three repos. Then produce:
`docs/inventory/blader.md`, `docs/inventory/avoid-ai-writing.md`, `docs/inventory/semitic.md` — for each: every pattern (id, name, trigger/detection rule, fix, examples, carve-outs/false-positive notes), every mode, every workflow step, every output format, every script and its API.
`docs/CONFLICTS.md` — a table of rule conflicts. Known candidates to verify (do not assume they exist as described):
   - Em dashes: removed by default in avoid-ai-writing vs. retained by blader when the user's own sample uses them vs. Arabic typographic norms.
   - Curly quotes / en dashes vs. native Arabic punctuation (`،` `؛` `؟` and « » usage).
   - Pattern overlap where the same tell has different names, thresholds, or fixes.
   - Rhetorical devices: AI-tell in English (rhetorical question openers) vs. a legitimate native device in Arabic rhetoric (بلاغة, rhetorical questions, controlled سجع).
   - Formatting rules (bullets, bold, headings) that break legitimate SEO/article structure.
A draft deduplication map: which English patterns from blader and avoid-ai-writing are the same tell.
Commit: `phase-2: inventory and conflict map`.

**CHECKPOINT A — stop here.** Present a concise summary to the user: counts per source, top conflicts with proposed resolutions, dedup approach, and any surprises. Wait for approval before Phase 3.

### Phase 3 — Precedence system (`references/precedence.md`)

Define and illustrate this order (highest first). Adjust only with a documented reason:
**Protected content** — facts, numbers, names, quotes, citations, URLs, code, SEO-protected spans. Never changed in meaning.
**Explicit user instruction in the current request.**
**User voice sample** (if provided) — its rhythm, punctuation habits, vocabulary, and deliberate quirks override generic style rules, including dash usage.
**Selected voice profile** (casual / professional / technical / warm / blunt).
**Language/dialect reference** (`ar-*.md` or `en-*.md`), including native typography.
**Shared core patterns.**
Include at least 6 worked conflict examples (English and Arabic) showing the rule applied.

### Phase 4 — Build the reference files

**English (`en-patterns.md`, `en-vocabulary.md`):**
- Merge blader + avoid-ai-writing into a single deduplicated catalog grouped by category (content, language, structure, communication, meta, structural detection, tool fingerprints, conversational register). Stable IDs `EN-001…`.
- Each entry: ID, name, what it looks like, why it reads as AI, fix, before/after, false-positive carve-outs, severity (P0/P1/P2), provenance tag.
- Keep avoid-ai-writing's tier semantics exactly (1A frequency markers weighted higher than 1B clarity edits; Tier 2 flags on clustering; Tier 3 on density/repetition).
- Table of contents at top; file will be long.

**Arabic:**
- `ar-shared.md`: patterns true for all varieties (hedging overload, formulaic transitions, significance inflation, uniform sentence rhythm, list-instead-of-argument, translated-from-English structures), plus Arabic typography and number conventions (Arabic-Indic vs Western digits: preserve the source document's convention).
- `ar-msa.md`, `ar-egyptian.md`, `ar-levantine.md`: variety-specific patterns ported from humanizer-semitic with IDs `AR-MSA-…`, `AR-EGT-…`, `AR-SHM-…`.
- For dialect files, include **MSA leakage** detection (MSA function words and constructions inside dialect text) and the fix toward authentic dialect.
- Do **not** copy unverifiable statistics or benchmark claims from upstream prose into the skill. Keep the patterns; drop the marketing numbers.
- Every Arabic example must be natural to a native speaker. You are not one, and neither is the reviewer model, so native judgment is handled by humans:
  - **MSA and Egyptian:** the project owner is a native Egyptian Arabic speaker and will review these. Mark every example you are not fully confident in with `<!-- NATIVE-REVIEW: egt -->` or `<!-- NATIVE-REVIEW: msa -->`.
  - **Levantine:** no native reviewer is available yet. Add `status: experimental — pending native Levantine review` at the top of `ar-levantine.md`, keep examples close to upstream, and have `SKILL.md` tell the user that Levantine output is experimental.
  - List every flagged item (file, line, excerpt, what you are unsure about) in `docs/NATIVE-REVIEW.md`, grouped by variety.

**Modes (`modes.md`):** exact output contracts:
- **detect** — Issues found (grouped P0/P1/P2, each with quoted text and pattern ID) → Assessment (real problems vs. possibly intentional) → Score (from script, if runnable).
- **rewrite** (default) — Issues found → Rewritten version → What changed → Second-pass audit.
- **edit** — minimal in-place edits to a prose file; refuse code/config/data files; return edits-made list + verification result from `validate.js`.
- **seo** — a modifier combinable with any mode (see Phase 5).
- Report headings follow the language of the user's request; the rewritten text stays in the language/variety of the input.

**Voice (`voice-matching.md`):** blader's sample-based calibration procedure (analyze rhythm, sentence length spread, punctuation, lexicon, quirks → apply) plus the five profiles. Works for Arabic samples too (e.g., a user's Egyptian writing sample).

### Phase 5 — SEO mode (`seo-mode.md` + validator support)

Protected spans, never altered unless the user explicitly allows:
- Target keyword and secondary keywords (user-supplied list, or detected from title/H1/meta if the user confirms).
- Heading hierarchy and heading text (H1–H6 / Markdown `#`).
- Internal and external links, anchor text, URLs, UTM-free link targets.
- Image alt text, captions, file names.
- JSON-LD / schema blocks, FAQ blocks, tables, shortcodes (`[shortcode]`), WordPress block comments (`<!-- wp:... -->`), HTML attributes.
- Meta title/description if present in frontmatter.

Rules: preserve keyword presence and approximate placement (title, first 100 words, at least one H2) and do not stuff; never delete an internal link; flag (don't remove) thin sections instead of padding them.

### Phase 6 — Scripts

**`lib/lang.js`:** Arabic-script ratio for language ID; English vs Arabic vs mixed (Arabic article with English terms → Arabic engine, English terms preserved). Dialect scoring using marker lexicons derived from the semitic references (e.g., Egyptian markers like مش، ده، دي، إزاي، عشان، بتاع; Levantine markers like شو، هيك، هلق، منيح، بدّي), defaulting to MSA when evidence is weak. Return `{lang, variety, confidence, evidence[]}`. Allow an explicit override flag.

**`lib/arabic-normalize.js`:** normalize for matching only — strip tashkeel and tatweel, unify أ/إ/آ→ا, ى→ي, optional ة→ه — while maintaining an **offset map back to the original string** so reported issue positions are exact.

**`lib/en-detector/`:** adapt avoid-ai-writing's engine with minimal changes; keep its tests passing.

**`lib/ar-detector/`:** new engine mirroring the English engine's API:
- `analyzeText(text, {variety, sourceMode}) → {score, label, issues[{type, patternId, start, end, excerpt, severity, suggestion}], stats}`.
- Signals: phrase lexicons per pattern (from references), weighted tiers, sentence-length burstiness, paragraph-length uniformity, trigram repetition, transition density per 100 words, MSA leakage ratio (dialect modes), punctuation profile.
- `sourceMode: "rendered-markdown"` excludes YAML frontmatter and HTML comments from scoring while keeping offsets aligned (same behavior as the English engine).
- Conservative by default: a single weak signal must never push a human text above the "likely AI" threshold. Document weights and thresholds in `scripts/README.md`.

**`detect.js` (CLI):** `node detect.js <file|-> [--lang en|ar] [--variety msa|egt|shami] [--json] [--markdown]` — auto-routes to the right engine, prints a readable report or JSON.

**`validate.js` (CLI):** `node validate.js before.md after.md [--seo keywords.txt]` — exit 1 if the rewrite altered: code blocks, inline code, frontmatter, blockquotes, table cells, URLs, file paths, heading structure, numbers/dates, protected SEO spans, schema blocks, shortcodes, WP block comments; or if the rewrite's detector score is worse than the original. Arabic-aware: compare numbers across digit systems; compare headings after normalization.

### Phase 7 — `SKILL.md` (write last, after references exist)

Frontmatter:
- `name: humanizer-pro`
- `description:` **≤ 1024 characters**, assertive so it triggers reliably. Cover: humanize / de-AI / remove AI-isms / make it sound human / audit for AI tells / match my voice; English and Arabic (فصحى، مصري، شامي); detect, rewrite, edit, SEO-safe rewriting of articles and blog posts. Include a few Arabic trigger phrases (e.g., "خلي الكلام طبيعي", "شيل أسلوب الذكاء الاصطناعي", "أنسنة النص").

Body (router):
1. When to use / when not to (not for code, legal text requiring exact wording, or evading academic-integrity rules).
2. Step 1: determine mode (detect/rewrite/edit, +seo) from the request; default rewrite.
3. Step 2: identify language/variety (run `scripts/detect.js` when a shell is available; otherwise follow the heuristics summarized inline).
4. Step 3: load exactly the needed references (map table: situation → files).
5. Step 4: apply precedence (`references/precedence.md`).
6. Step 5: execute the mode's workflow, including the mandatory second pass.
7. Step 6: verify — run `validate.js` for edit mode and SEO mode when a shell is available; otherwise run the manual checklist.
8. Output contract pointer (`references/modes.md`).
9. Degradation rules when scripts cannot run (e.g., Claude.ai uploads): the skill must still work from Markdown alone.

### Phase 8 — Tests

- `node --test` must pass with zero dependencies.
- Fixtures per language/variety: at least 5 AI-style samples and 5 genuinely human-style samples each (write human-style samples yourself carefully; mark them `synthetic-human` and prefer upstream human fixtures where license permits).
- False-positive suite: legitimate rhetorical questions in Arabic, real-time/feature-gating technical terms, disclosure statements, changelog bullet lists, quoted speech.
- Normalizer offset tests with tashkeel/tatweel-heavy strings.
- Validator tests for every protected element listed in Phase 5/6.
- Language-ID tests including mixed Arabic/English and short texts.
- Keep all adapted upstream tests passing.

### Phase 9 — Evals (qualitative)

Create `evals/evals.json` with at least 16 realistic prompts: 4 English, 4 MSA, 4 Egyptian, 4 Levantine, spread across detect / rewrite / edit / seo, including one voice-sample prompt per language family and one "thin content" prompt where the correct behavior is to flag missing substance rather than pad.

For each eval: run the skill as a user would, save the exact input, the full output, and any script outputs to `evals/runs/iteration-1/<eval-id>/`, then grade against this checklist and write `evals/runs/iteration-1/SELF-ASSESSMENT.md` (title it as a builder self-assessment, not a review):
- Meaning and facts preserved (no invented facts/quotes/numbers).
- Correct language/variety retained; no MSA leakage in dialect output.
- Output contract followed exactly.
- Protected spans untouched (SEO/edit).
- Second pass present and useful.
- Detector score improved or explanation given.
- Reads naturally to a native reader (flag uncertain Arabic for human review).

Fix failures in the skill, re-run as `iteration-2`. Stop when all evals pass or remaining issues require a native-speaker decision.

### Phase 10 — Docs, packaging, maintenance
`README.md`: what it is; install for each agent — Codex (`.agents\skills\humanizer-pro\` in a project, or `%USERPROFILE%\.agents\skills\humanizer-pro\` globally), Claude Code (`.claude\skills\` or `%USERPROFILE%\.claude\skills\`), Cursor, Claude apps (upload the zip), and `npx skills add` once published; usage examples in English and Arabic; CLI usage; SEO mode; limitations (including experimental Levantine); credits.
`CREDITS.md` naming all three upstream authors and repos.
`tools/check-upstream.js`: uses `git ls-remote` to compare recorded SHAs with remote HEADs and prints which upstream changed and which files in `docs/PROVENANCE.md` depend on it.
Optional (only after everything passes): `.claude-plugin/plugin.json` + marketplace manifest pointing to `skills/humanizer-pro/SKILL.md` so it loads in Claude Code, Cowork, and Claude Desktop.
Create a zip of `skills\humanizer-pro\` as `dist\humanizer-pro.zip` for upload to Claude apps.
Commit: `phase-10: docs and packaging`.
### Phase 11 — Handoff for independent review

Write `docs/REVIEW-HANDOFF.md` for a reviewer that has never seen your session. It must contain:
**Reproduce from scratch:** exact commands, in order, to re-clone sources at the pinned SHAs, install nothing, run tests, run the detector on fixtures, run the validator, and re-run every eval.
**Decision register:** every non-obvious decision (merges, drops, thresholds, weights, deviations from this prompt) with a pointer to where it is justified.
**Known weak spots:** where you are least confident — detector thresholds, dialect identification on short texts, specific conflict resolutions, Arabic examples — ranked by risk.
**Provenance sampling index:** a flat table of every pattern ID → upstream file + location + SHA, so the reviewer can pick random rows and verify them.
**Upstream vs. prompt discrepancies:** a pointer to `docs/DISCREPANCIES.md` with a one-line summary of each.
**What was not done** and why.
Then tag the final commit `v0.1.0-build`. Do not tag or describe anything as reviewed or released.

---

## 4. Acceptance criteria (all must be true)

- [ ] `UPSTREAM.md` lists all three repos with exact commit SHAs.
- [ ] `SKILL.md` ≤ 500 lines; description ≤ 1024 chars; valid YAML frontmatter.
- [ ] Every pattern has an ID and a provenance entry; no orphan or duplicate patterns.
- [ ] `docs/CONFLICTS.md` resolves every identified conflict with a cited precedence rule.
- [ ] English detector scores match avoid-ai-writing's original engine on its own fixtures (or differences are documented and justified).
- [ ] Arabic detector returns exact original-string offsets; human-style fixtures score below the "likely AI" threshold; AI-style fixtures score above it.
- [ ] `validate.js` catches every protected element type in tests.
- [ ] `npm test` passes on Windows with Node 18+ and zero runtime dependencies.
- [ ] All evals pass or are listed as needing native-speaker review.
- [ ] All licenses and credits present; adapted files carry original headers.
- [ ] Skill still functions as Markdown-only when scripts cannot execute.
- [ ] Skill loads from both `.agents\skills\` (Codex) and `.claude\skills\` (Claude Code) without modification.
- [ ] Every "passes/verified" claim has a matching raw output file in `docs/evidence/`.
- [ ] Git history has at least one commit per phase; final commit tagged `v0.1.0-build`.
- [ ] `docs/NATIVE-REVIEW.md` lists all uncertain Arabic items; `ar-levantine.md` is marked experimental.
- [ ] `docs/REVIEW-HANDOFF.md` is complete enough to reproduce everything without this session.

---

## 5. Final report to the user

When done, reply with:
1. What was built (tree summary) and upstream SHAs used.
2. Pattern counts: English, Arabic shared, MSA, Egyptian, Levantine, and new `humanizer-pro` originals.
3. Key conflict resolutions (top 5).
4. Test results and eval summary table.
5. Items needing native-speaker review, by variety (point to `docs/NATIVE-REVIEW.md`).
6. Known limitations and the top weak spots from `docs/REVIEW-HANDOFF.md`.
7. Exact commands to install and try it in Codex and in Claude Code.
8. Build environment (model, Node, OS) and the final commit SHA / tag.

Be precise and brief in the report. Do not claim anything you did not verify, and do not call the skill reviewed or production-ready.
