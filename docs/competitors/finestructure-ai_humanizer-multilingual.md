# Competitor review: finestructure-ai/humanizer-multilingual

Local clone reviewed: `_sources/competitors/finestructure-ai_humanizer-multilingual`.
All file:line references below are relative to that clone's root unless stated
otherwise. Every prose and code file in the tree (48 files under git, excluding
`.git/`) was read in full for this review.

## 1. Identity

- **URL:** `https://github.com/finestructure-ai/humanizer-multilingual` (from
  `git remote -v`, and confirmed by `.claude-plugin/marketplace.json:10-11` /
  `plugins/humanizer-multilingual/.claude-plugin/plugin.json:10-11`, both of
  which list the same URL as `homepage`/`repository`).
- **HEAD SHA:** `f6a3d7e4a3a0fe8a404954dcc03fff8ed77bc9f9` (`git rev-parse HEAD`).
  The repository has exactly one commit (`git log --oneline` prints a single
  line, `f6a3d7e docs: Chinese README, and defer to op7418 for Chinese text`) —
  it was published as a single squashed snapshot, not with real history.
- **License:** MIT (`LICENSE:1-21`), copyright "Fine Structure" 2026
  (`LICENSE:3`).
- **Last commit date:** 2026-08-05T17:39:10+03:00 (`git log -1 --format=%cI`).
- **File count:** 27 tracked files (`git ls-files | wc -l` via the earlier
  `find` listing), organized as one marketplace plus 7 plugins.
- **What it claims to be:** "Remove the signs of AI-generated writing from
  text in 10 languages other than English. The English humanizer's patterns
  do not transfer. These do." (`.claude-plugin/marketplace.json:11`). The
  README opens with: "AI does not write bad Spanish. It writes English
  wearing Spanish." (`README.md:5`).
- **Fork/derivative of what:** Not a git fork (single commit, own remote,
  no upstream remote configured — `git remote -v` shows only `origin` pointing
  at itself). It is an explicit, credited *content* derivative/extension of
  **blader/humanizer**, not a code fork of it: "The idea and the English
  pattern set are Siqi Chen's ([blader/humanizer])... This is an independent
  extension to other languages. It does not modify or replace the English
  patterns" (`README.md:100-107`, mirrored in
  `plugins/humanizer-multilingual/skills/humanize/SKILL.md:99-104`). It
  explicitly is **not** based on `avoid-ai-writing`/`jurigis/avoid-ai-writing-multilingual`
  — it distinguishes itself from that lineage: "[jurigis/avoid-ai-writing-multilingual]
  ... descends from Conor Bronsdon's avoid-ai-writing rather than from blader's
  humanizer. Where we differ..." (`README.md:120-128`). It also disclaims being
  a German or Chinese specialist tool, deferring to `marmbiz/humanizer-de` and
  `op7418/Humanizer-zh`/`kevintsai1202/Humanizer-zh-TW` for those languages
  (`README.md:114-119`). No evidence found of any other undisclosed fork
  relationship (no `.git` remnants of a different origin, no CONTRIBUTING file,
  no upstream-tracking file analogous to humanizer-pro's own `UPSTREAM.md`).

## 2. Form factor

It is a **Claude Code plugin marketplace** containing seven independent
**agent skills** (Claude Code `SKILL.md` format), not a standalone app or
library. `.claude-plugin/marketplace.json:1-132` defines the marketplace
("finestructure") and lists all seven plugins with `source`, `category`,
`keywords`; install instructions are Claude-Code-specific: `/plugin marketplace
add finestructure-ai/humanizer-multilingual` then `/plugin install
humanizer-multilingual@finestructure` then `/reload-plugins` (`README.md:82-90`).
Each plugin is `plugins/<name>/.claude-plugin/plugin.json` +
`plugins/<name>/skills/<skill>/SKILL.md` + `references/*.md` (+ optional
`scripts/*.mjs`), which is the same shape humanizer-pro uses
(`skills/humanizer-pro/SKILL.md` + `references/` + `scripts/`), so the two
projects target the same host convention.

It is **host-specific to Claude Code's plugin/skill mechanism**, not agent-
agnostic in its installation story (the only documented install path is the
`/plugin` slash-command flow). However, the README states the entire payload
is plain Markdown with no hidden instructions ("every file is plain Markdown
in this repository, and reading
`plugins/humanizer-multilingual/skills/humanize/SKILL.md` means you have read
the entire thing" — `README.md:156-159`), so a human or another tool could
manually copy the skill folder into any `SKILL.md`-reading host, the same way
humanizer-pro documents copying into `.claude/skills/`, `.agents/skills/`, or
a Claude-apps zip (`README.md:38-90` in our repo). The competitor repo itself
never documents that portability, only the Claude Code plugin flow.

## 3. Languages & varieties

Ten languages, stated identically in the README and the SKILL.md: **Spanish,
Portuguese, French, German, Italian, Hebrew, Arabic, Russian, Japanese,
Chinese** (`README.md:59-60`, `plugins/humanizer-multilingual/skills/humanize/SKILL.md:52-53`).
Each has its own `references/<language>.md` file (10 files, all present and
read for this review).

Variety handling per language:
- **Spanish:** Latin American (by country) vs. Peninsular
  (`spanish.md:3-4`, `spanish.md:71-76`).
- **Portuguese:** Brazilian vs. European, including gerund and clitic-placement
  differences (`portuguese.md:3-4`, `portuguese.md:57-61`, `portuguese.md:72-75`).
- **Chinese:** Simplified (Mainland), Traditional (Taiwan), Traditional (Hong
  Kong), down to vocabulary-level differences like 软件/軟體/軟件
  (`chinese.md:3-5`, `chinese.md:86-87`).
- **Arabic (the language directly relevant to humanizer-pro):** the file tells
  the reader to "decide the register first: Modern Standard Arabic, or a
  dialect (Egyptian, Levantine, Gulf, Maghrebi)" (`arabic.md:3-5`). It does
  **not** give per-dialect calque/vocabulary tables the way humanizer-pro's
  `ar-egyptian.md`/`ar-levantine.md` do; `arabic.md` is a single ~107-line
  file covering MSA-vs-dialect *register* mismatch as one Family-3 finding
  ("MSA where dialect belongs... Consumer marketing in Egypt or the Gulf is
  often written close to spoken Arabic" — `arabic.md:85-87`), not four
  distinct dialect grammars. There is no automatic dialect router or code —
  it is instruction only, and the dialects named (Egyptian, Levantine, Gulf,
  Maghrebi) never get their own tables, calques, or examples anywhere in the
  file.
- **Hebrew, French, German, Italian, Russian, Japanese:** single-variety
  treatment (no regional split called out), each with its own file.
- Languages not covered fall back to a general 5-family method rather than a
  fabricated per-language list: "For languages not yet covered, the skill
  applies the general method and says so" (`README.md:77-78`, restated at
  `plugins/humanizer-multilingual/skills/humanize/SKILL.md:58-61`).

## 4. Pattern catalog

There is no single global pattern count or pattern-ID scheme; patterns are
organized by **family** (5 families + a 1b sub-family), not by numbered ID
like humanizer-pro's `EN-xxx`/`AR-MSA-xxx` IDs. Counting the actual tables
read in each language file (calque tables in Family 1, stock-phrase tables in
Family 1b — these are the two tables that repeat across every language file):

| Language | Family-1 calque rows | Family-1b stock rows |
|---|---|---|
| Spanish (`spanish.md:11-22`, `36-47`) | 10 | 9 |
| Portuguese (`portuguese.md:9-19`, `29-40`) | 10 | 10 |
| French (`french.md:24-35`, `50-61`) | 10 | 10 |
| German (`german.md:25-36`, `48-59`) | 10 | 10 |
| Italian (`italian.md:5-16`, `26-37`) | 10 | 10 |
| Hebrew (`hebrew.md:11-17`, `65-74`, `31-42`) | 8 | 10 |
| Arabic (`arabic.md:45-54`, `63-74`) | 8 | 10 |
| Russian (`russian.md:25-35`, `49-60`) | 9 | 10 |
| Japanese (`japanese.md:55-64`, `71-82`) | 8 | 10 |
| Chinese (`chinese.md:44-53`, `64-75`) | 8 | 10 |

That is roughly **91 calque rows + 99 stock-phrase rows ≈ 190 language-specific
table entries**, plus the 5 universal families and their sub-bullets described
narratively in `method.md` (typography, register, syntax, scaffolding — each
with several named sub-patterns rather than numbered items, e.g. `method.md:97-181`).
The repo never states a headline pattern count itself (no "N patterns" claim
to verify against), unlike `README.md:7-8`'s own citation of blader/humanizer's
"33 patterns." So there is no self-reported number to catch as wrong; the
actual count (~190 table rows + ~30-40 narrative sub-patterns across 5
families) is larger than 33 only because it is multiplied across 10 languages
and adds typography/register axes blader's English list does not need.

- **Before/after examples:** yes, every language file ends with a "Before and
  after" section giving one full machine sentence and one native rewrite
  (e.g. `arabic.md:98-106`, `hebrew.md:102-110`, `chinese.md:98-106`).
- **IDs/provenance:** no pattern IDs at all (no `AR-01`, no `EN-14` equivalent).
  No per-pattern sourcing/citation either — patterns are asserted from the
  author's own claimed expertise ("We work on multilingual text and right to
  left layout every day" — `README.md:150-151`), not linked to a corpus or
  external study. This is a real difference from humanizer-pro, which ties
  every pattern to a `docs/PROVENANCE.md` entry and an upstream repo/commit
  (humanizer-pro `README.md:283-296`).
- **False-positive carve-outs:** yes, explicit and language-specific, e.g.
  "Do not flag: `تقنية متطورة` is native and is the correct fix for
  'cutting-edge technology'" (`arabic.md:80-82`); "Accepted, do not flag:
  `בסופו של יום` entered spoken Hebrew long ago" (`hebrew.md:76-78`); a
  dedicated global carve-out list in `method.md:185-200` ("Formal or academic
  register", "Correct grammar and spelling", "Long sentences", "Repetition for
  rhetoric", "Quoted material", "Technical terminology", "Translated text that
  was translated on purpose", "A single tell in isolation"). Russian gets an
  entire opening section devoted to one false-positive guard: "the dash is NOT
  a tell in Russian" (`russian.md:1-11`).

## 5. Detection

**Prompt-only, no deterministic scoring code.** There is no detector script
anywhere in `plugins/humanizer-multilingual/`. The workflow is entirely
instructions for the LLM to follow: "Mark every suspected tell, and name its
family and severity (P0, P1, P2)" (`plugins/humanizer-multilingual/skills/humanize/SKILL.md:67-68`).
Severity is a three-tier qualitative scale (P0 conclusive / P1 strong in
cluster / P2 weak alone), not a numeric score
(`method.md:202-234`). No character or token offsets are produced or
mentioned anywhere in the skill — output is prose audit text with quoted
phrases, not span coordinates. There is no `--json` output, no machine-
readable report format, and no CI gate tied to it (contrast the `a11y-audit`
and `i18n-ready` plugins in the *same repo*, which do ship real zero-dependency
Node scanners — `plugins/a11y-audit/skills/a11y-audit/scripts/a11y.mjs` and
`plugins/i18n-ready/skills/i18n-ready/scripts/i18n-scan.mjs` — proving the
authors know how to write a deterministic scanner but chose not to for the
humanizer skill itself, presumably because "shape of English showing through"
in Spanish/Arabic/Chinese syntax is not something a regex can reliably catch
the way missing `alt` attributes are).

## 6. Modes & output contract

Modes are **audit** and **rewrite** (roughly), governed by user phrasing, not
named CLI flags:
- Default output: "the rewritten text, then a short list of what changed by
  family" (`plugins/humanizer-multilingual/skills/humanize/SKILL.md:89`).
- Audit-only: "If the user asks only for an audit, list the tells with line
  references and do not rewrite" (`SKILL.md:91-92`).
- Clean-paste mode: "If the user is pasting text into something else and
  wants clean output, give the rewritten text alone with no commentary"
  (`SKILL.md:94-95`).

There is no separate "edit a file in place" mode and no SEO-preservation
modifier — humanizer-pro has both (`edit` mode and `seo` modifier,
`skills/humanizer-pro/SKILL.md:170-172,189-208` in our repo) and this
competitor has neither.

**Second pass / self-review:** yes, but as a fixed 5-step audit workflow
rather than a distinct "editing pass count" contract: Mark → Discard false
positives → Weigh (clustering rule) → Rewrite only what was marked → Report
(`SKILL.md:63-79`). It is one linear pass with a weighing gate before
rewriting, not humanizer-pro's mandatory two-pass compare-against-source
re-scan (`skills/humanizer-pro/SKILL.md:174-183` in our repo, "The second pass
is mandatory and is not optional polish").

**Output structure:** free text/Markdown throughout. No JSON schema, no
structured report object anywhere in the skill.

## 7. Voice matching / profiles

None. There is no voice-sample calibration, no persona/voice-profile system,
and no mention of "voice" beyond "Preserve meaning, facts, names, numbers, and
the author's voice" as a one-line constraint during rewriting
(`SKILL.md:75-76`). No file, table, or workflow step resembling
humanizer-pro's `voice-matching.md` exists in this repo.

## 8. Preservation & SEO safety

Partial, and narrower than humanizer-pro's. Step 5 of the workflow is titled
"Never change the facts": "Do not invent numbers, quotes, company names,
dates, or claims. Do not soften a factual statement into a vague one..."
(`SKILL.md:81-85`). The false-positive guard list also protects "Quoted
material. Never edit inside a quotation, a citation, or a legal clause"
(`method.md:195-196`). But there is:
- **No SEO mode.** No keyword protection, no heading/link/anchor-text
  preservation rules, no schema/JSON-LD/CMS-markup awareness anywhere in the
  repo.
- **No validator/diff-check step.** There is no script or instruction that
  compares before/after text and fails on an unauthorized change. The
  "preserve" instruction is asserted in prose with nothing that verifies it
  was honored — contrast humanizer-pro's `validate.js`, which mechanically
  diffs before/after and exits non-zero on a protected-content violation
  (`README.md:165-187` in our repo).

## 9. Tests/evals/evidence

`tests/corpus.md` (153 lines) is the only test artifact, and it is a
**fixture file for a human or an LLM to manually check against, not an
executable test suite.** It contains one machine-written sample per language
with its expected tell list, plus four counter-samples that "must NOT be
flagged" (`tests/corpus.md:124-153`). Usage is explicitly manual: "Install the
skill, paste a sample, and check the audit against the expected list below.
If it misses one, that is a bug worth an issue" (`tests/corpus.md:6-8`). There
is no runner script, no pass/fail automation, and no benchmark numbers
anywhere (no accuracy %, no precision/recall, no claimed score against any
detector). `ci/validate.yml` and `scripts/validate.mjs` (read in full) only
validate repo *structure* — marketplace/plugin manifest shape, `SKILL.md`
frontmatter, that referenced files exist, that bundled `.mjs` scripts parse,
and a house style rule banning em/en dashes in published prose
(`scripts/validate.mjs:153-176`). None of that touches humanizer quality or
accuracy. So: zero reproducible quality numbers exist for this project, versus
humanizer-pro's 114-test `node --test` suite with parity tests against
upstream and recorded evidence files (`docs/REVIEW-HANDOFF.md:585-590` in our
repo) — though note humanizer-pro's own handoff is explicit that its Arabic
fixtures are self-written and its eval grading is a builder self-assessment,
not independent (`docs/REVIEW-HANDOFF.md:233-238,307-311`), so the honest
comparison is "we have a bigger, automated but still self-graded test
apparatus" vs. "they have a small, manual-only, ungraded fixture list."

## 10. Native-speaker quality signals (Arabic)

The Arabic content in this repo is `references/arabic.md` (107 lines) plus the
Arabic block in `tests/corpus.md:84-92`. Signals that suggest real craftsmanship
rather than generic/translated material:
- Specific, idiomatically-justified corrections rather than literal glosses,
  e.g. `في نهاية اليوم` → `في نهاية المطاف، في المحصلة` for "at the end of the
  day," with an explicit native-vs-machine gloss table (`arabic.md:45-54`).
- A linguistically real observation about Arabic word order: "Arabic uses
  verb-initial sentences (VSO) widely... A page where no sentence begins with
  its verb is machine Arabic" (`arabic.md:28-30`) — this is a defensible,
  non-generic claim about Arabic syntax, not something a machine-translation
  pipeline would produce unprompted.
- Correct typographic detail: Arabic comma `،`, semicolon `؛`, question mark
  `؟` vs. Latin `,` `;` `?`, and a note that these are unreliable-because-
  automatic on a native keyboard (`arabic.md:9-24`).
- A caveat about `من خلال` and `يعتبر` overuse as calque/hedge markers
  (`arabic.md:31-34`) — specific vocabulary-level Arabic stylistic critique,
  not boilerplate.
- No factual or grammatical errors were found in the Arabic sample text
  itself (`tests/corpus.md:86-88`) during this review, though this reviewer is
  not a native-Arabic-speaker verification and that limitation should be
  stated plainly, same as humanizer-pro's own repo does for its Arabic
  content.

Against this, the weaknesses (see §13) are real: only MSA gets a rule table;
Egyptian/Levantine/Gulf/Maghrebi are named but never given their own
vocabulary, and the register-mismatch treatment is one paragraph
(`arabic.md:85-87`), versus humanizer-pro's three separate ~sizeable Arabic
reference files (`ar-msa.md`, `ar-egyptian.md`, `ar-levantine.md`) plus a
shared file and an automatic dialect router in code
(`skills/humanizer-pro/SKILL.md:79-109` in our repo).

## 11. Ethics

The framing is unambiguously "better/more natural writing," not detector
evasion. The README opens by contrasting AI writing that "still reads as
obviously machine written to anyone who speaks the language" with wanting text
that reads native (`README.md:12-16`), and the workflow instructs the model to
never invent facts and to say when a draft's stiffness reflects an empty claim
rather than dressing it up (`SKILL.md:81-86`). There is no mention anywhere in
the repo of AI-detector scores, GPTZero/Turnitin/Originality.ai, academic
integrity, or "passing" any checker — the word "detect" in the marketplace
description ("ai-detection" keyword, `.claude-plugin/marketplace.json:19`) is
a category tag for discoverability, not a claim about evading detectors. This
matches humanizer-pro's own explicit refusal stance on detector-evasion
requests (`skills/humanizer-pro/SKILL.md:48-50` in our repo), though
humanizer-pro states the refusal rule explicitly and prominently while this
competitor simply never raises detector-evasion as a topic at all (silence
rather than an explicit guardrail).

## 12. Notable ideas worth borrowing

1. **The "English wearing [language]" framing, and the 5-families-of-tells
   taxonomy, generalize cleanly and would strengthen an Arabic-specific
   detector.** `method.md:1-13` names Family 1 (calque), 1b (stock marketing
   units), 2 (typography), 3 (register flattening), 4 (English syntax showing
   through), 5 (empty scaffolding) as universal, language-agnostic categories,
   then lets each language file fill in the concrete surface forms. This is a
   cleaner top-level ontology than a single flat pattern list; humanizer-pro's
   Arabic files (`ar-shared.md`, `ar-msa.md`, `ar-egyptian.md`,
   `ar-levantine.md`) could be re-indexed under this same 5-family scheme to
   make cross-dialect pattern reuse and gap-finding easier (e.g., "does
   Levantine have a Family-2 typography section yet?").
2. **Family 1b, the "stock marketing units are English-sourced, not
   per-language" insight, is a genuinely useful shortcut.** `method.md:46-94`
   argues that unlike calques (Family 1, which needs a hand-built table per
   language), stock marketing phrases ("Discover...", "a comprehensive
   solution", "tailored to your needs") always trace back to the same fixed
   English inventory, so one English table plus "find the literal rendering
   in your target language" replaces ten separate per-language tables. This
   could shrink humanizer-pro's future non-English/non-Arabic expansion work
   by reusing one English stock-phrase table across every new language instead
   of re-deriving it each time.
3. **The clustering/severity rule (P0/P1/P2) with an explicit "do not
   manufacture a verdict" stop condition is a strong anti-false-positive
   design.** `method.md:202-248`: one P0 or three P1s from *different
   families* is a verdict; a text with only P2 findings must be reported as
   clean, not rewritten. This directly targets the failure mode
   humanizer-pro's own review flagged as unresolved risk 3.5/3.6 (Arabic
   detector calibration not grounded in a measured corpus,
   `docs/REVIEW-HANDOFF.md:267-278` in our repo) — porting an explicit,
   human-auditable clustering rule (rather than only numeric weights) into
   `ar-*.md`'s prose guidance, alongside the numeric detector, would give a
   second, more explainable check.
4. **Per-language "do not flag this, it is the correct native fix" call-outs
   prevent a specific false-positive class: rewriting away the actual correct
   answer.** E.g. `arabic.md:80-82` ("`تقنية متطورة` is native and is the
   correct fix for 'cutting-edge technology'"), `hebrew.md:76-78`, and nearly
   every language file repeats this pattern. This is a narrower, more
   surgical guard than a blanket false-positive list and is worth adding
   explicitly next to humanizer-pro's Arabic calque tables, since a rewrite
   engine that "fixes" a calque into another disguised calque is a subtle bug
   class neither repo's current detector code obviously catches.
5. **Register-mismatch-as-signal (MSA where dialect belongs) is treated as a
   first-class Family-3 finding, not merely a routing decision.**
   `arabic.md:85-87` frames "Formal MSA in [consumer/Egypt/Gulf] context reads
   as a press release, which is exactly what machine output produces by
   default" as evidence of machine authorship itself, not just as a dialect-
   detection input. humanizer-pro's own detector currently uses MSA-vs-dialect
   mixing mainly for dialect routing and a P0/P1 leakage gate
   (`docs/REVIEW-HANDOFF.md:280-285` in our repo); explicitly scoring
   "MSA-in-a-dialect-context" as its own signal (not just leakage-within-a-
   dialect) could tighten short-text false negatives noted as weak spot 3.3.
6. **A public, versioned counter-sample corpus that a reviewer can eyeball
   without running any code.** `tests/corpus.md` requires nothing but reading;
   a non-technical native-speaker reviewer can judge the claim directly. This
   is lower-effort to maintain and easier for outside reviewers to use than
   humanizer-pro's `tests/fixtures/*.md` + `node --test` combination, and
   could be added as a companion "read-only corpus" doc alongside the existing
   automated fixtures, specifically to enable the kind of native-speaker
   review that `docs/REVIEW-HANDOFF.md` weak spots 3.1/3.2/3.11 (in our repo)
   say has never happened for Arabic.
7. **Explicit "who else covers this better than we do" competitive honesty**
   (`README.md:109-131`) is a trust-building move worth adopting in
   humanizer-pro's own README: naming `marmbiz/humanizer-de` as deeper on
   German and steering German-only users there, rather than overstating
   coverage.
8. **The repo's own CI validator enforces a house style rule banning em/en
   dashes in its own published prose** (`scripts/validate.mjs:153-176`), which
   is a nice bit of eating-your-own-dog-food: the tool that flags em dashes as
   an AI tell also lints its own Markdown for the same tell in CI.

### Per-language file structure and request routing (multilingual mechanism)

**Directory layout and naming convention.** All ten language files live flat
in one directory: `plugins/humanizer-multilingual/skills/humanize/references/`,
named by full English language name in lowercase —
`spanish.md`, `portuguese.md`, `french.md`, `german.md`, `italian.md`,
`hebrew.md`, `arabic.md`, `russian.md`, `japanese.md`, `chinese.md` — plus one
non-language file, `method.md`, holding the shared 5-family taxonomy that every
language file assumes has already been read
(`plugins/humanizer-multilingual/skills/humanize/SKILL.md:50-53`). There is no
per-variety file split (no `arabic-egyptian.md`); variety is handled *inside*
`arabic.md`, `chinese.md`, `portuguese.md`, and `spanish.md` as an instruction
to "decide the variety first," not as a separate file. This is the single
biggest structural difference from humanizer-pro's Arabic layout, which does
split by variety into `ar-shared.md` + `ar-msa.md` + `ar-egyptian.md` +
`ar-levantine.md` (`skills/humanizer-pro/SKILL.md:233-244` in our repo).

**Routing mechanism.** There is **no code-based router at all** — no
`lang.js`-equivalent script exists anywhere in this repo (confirmed: no
`scripts/` directory exists under `plugins/humanizer-multilingual/skills/humanize/`
at all, only `references/`). Routing is done entirely by **LLM instruction**
in `SKILL.md`, step 1 through step 3:
- Step 1, "Identify the language and the variety"
  (`plugins/humanizer-multilingual/skills/humanize/SKILL.md:33-41`): "If the
  user has not said, infer it from the text and state your assumption in one
  line. If the text is inconsistent... that is itself a finding."
- Step 3, "Read the language file"
  (`SKILL.md:48-56`): lists the ten exact filenames as a literal enumeration
  in the prose ("Read the matching file in `references/`: `spanish.md`,
  `portuguese.md`, ..."), i.e. the "routing table" is a hardcoded list of
  filenames the model matches against its own language identification, not a
  lookup structure, config file, or detection function.
- Step 3 also defines the fallback path explicitly: "If the language is not
  covered, still apply `references/method.md`... Say plainly that you are
  working from the general method and not a researched pattern list"
  (`SKILL.md:58-61`).

So the entire multilingual "routing" mechanism is: the model reads the user's
text, decides the language (and, only for Spanish/Portuguese/Chinese/Arabic,
the variety) in its own reasoning, and then reads the one reference file whose
filename matches that language from a fixed prose-enumerated list — there is
no programmatic dispatcher, no config-driven mapping, and no per-variety file
resolution at all. Compare humanizer-pro's own routing, which is likewise
instruction-driven (no dispatcher script either) but goes one level deeper by
giving inline fallback heuristics for when no shell is available (Arabic-
script-ratio thresholds, specific dialect marker word lists with a 2-marker/
100-word threshold) rather than relying purely on the model's own judgment
(`skills/humanizer-pro/SKILL.md:90-109` in our repo) — a difference worth
noting both ways: humanizer-pro's routing is more mechanically specified for
Arabic dialect, while this competitor's routing is simpler but covers 4x more
languages with zero dialect-router code investment.

## 13. Weaknesses

- **No deterministic detector or score at all.** Everything in §5 is prompt-
  only; there is no way to get a reproducible number out of this skill, unlike
  the sibling `a11y-audit` and `i18n-ready` plugins in the same repo which do
  ship real scanners (`plugins/a11y-audit/skills/a11y-audit/scripts/a11y.mjs`,
  `plugins/i18n-ready/skills/i18n-ready/scripts/i18n-scan.mjs`). The humanizer
  skill itself has zero lines of executable detection code.
- **No preservation validator.** The "never change the facts" rule
  (`SKILL.md:81-86`) is asserted, not checked. Nothing diffs before/after text
  or fails a build when a protected span (a number, a name, a link) is altered.
- **Arabic dialect coverage is a single paragraph, not real per-dialect
  content.** `arabic.md:85-87` names Egyptian, Levantine, Gulf, and Maghrebi
  as dialects to "decide" between, but gives zero dialect-specific vocabulary,
  calques, or examples for any of the four — everything else in the file is
  MSA-level or register-agnostic. A user asking to humanize Gulf Arabic gets
  no more specific guidance than "this might read as press-release-formal."
- **No test automation, no benchmark numbers, no accuracy claim of any kind.**
  `tests/corpus.md` is read-only fixture prose; there is no script that runs
  the skill against it and reports pass/fail (§9). This makes any claim about
  the skill's actual real-world accuracy unverifiable from the repo alone.
- **Single-commit repository with no development history.** `git log` shows
  exactly one commit (`f6a3d7e`). There is no way to see how the pattern
  tables were derived, revised, or tested over time — the entire provenance
  trail a reviewer might want (what changed between drafts, what was cut) is
  absent. This contrasts with humanizer-pro's own repo, which documents 21+
  phase-labelled commits (`docs/REVIEW-HANDOFF.md:594` in our repo).
- **No pattern IDs or citation trail.** Patterns are asserted from claimed
  domain expertise (`README.md:150-151`) with no linked source, corpus, or
  external study for any individual pattern, unlike humanizer-pro's
  `docs/PROVENANCE.md` mapping every pattern ID to an upstream file/line.
- **"Fastest checks" and "strongest tell" claims throughout the language
  files are unverified assertions, not measured claims.** E.g. "This single
  check finds more than all the vocabulary lists combined"
  (`hebrew.md:19-20`) and "This is the single strongest tell in every language
  studied here" (`method.md:21-22`) — strong, specific, falsifiable-sounding
  claims with no supporting data, methodology, or sample size given anywhere
  in the repo.
- **No CI enforcement of the humanizer skill's own quality**, only of repo
  *structure* (`ci/validate.yml`, `scripts/validate.mjs` check manifest shape
  and dash style, not humanization correctness).
- **Install path is Claude-Code-specific**, with no documented alternative
  install flow for other agent hosts (unlike humanizer-pro's multi-host
  install section, `README.md:38-90` in our repo), despite the content being
  plain enough Markdown to be host-agnostic in principle.

## 14. Verdict vs humanizer-pro

| # | Dimension | This repo | humanizer-pro | Lead |
|---|---|---|---|---|
| 1 | Identity | MIT, single squashed commit (2026-08-05), explicit non-fork content extension of blader/humanizer, credited, discoverable GitHub URL | MIT, 21+ phase-labelled commits, explicit merge of 3 named upstream MIT repos with pinned SHAs in `UPSTREAM.md`, not yet published/discoverable (no public URL yet) | tie (theirs: cleaner public presence; ours: deeper provenance trail) |
| 2 | Form factor | Claude Code plugin marketplace (7 skills), install is `/plugin` command only | Single portable skill folder, documented for Claude Code, Codex, Cursor, and Claude-apps zip upload | we lead |
| 3 | Languages & varieties | 10 languages (ES/PT/FR/DE/IT/HE/AR/RU/JA/ZH), Arabic = one file, dialects named but not built out | 2 languages (EN, AR), but AR split into 3 fully-built dialect files (MSA/Egyptian/Levantine) plus a shared file and a code-based dialect router | they lead on breadth, we lead on Arabic depth — tie overall |
| 4 | Pattern catalog | ~190 table rows across 10 languages + 5 universal families, no IDs, no provenance, explicit false-positive carve-outs per language | Fewer languages but every pattern has an ID (141 total: 55 EN + 7 AR-shared + 28 AR-MSA + 26 AR-EGT + 25 AR-SHM) tied to a provenance entry | we lead on rigor/traceability, they lead on raw coverage |
| 5 | Detection | Prompt-only; no script, no score, no offsets | Deterministic `detect.js` engine, numeric 0-100 score, exact original-string offsets, JSON output | we lead |
| 6 | Modes & output contract | Audit / rewrite / clean-paste, single-pass workflow with a clustering gate before rewriting, free text only | detect / rewrite / edit / seo-modifier, mandatory two-pass audit with a documented editing-pass ceiling, structured report headings | we lead |
| 7 | Voice matching / profiles | None | Dedicated `voice-matching.md`: sample calibration + 5 named voice profiles | we lead |
| 8 | Preservation & SEO safety | Prose-only "never change the facts" rule, no SEO mode, no validator | Dedicated `seo-mode.md` (keywords, headings, links, schema, CMS markup) plus a mechanical `validate.js` diff-checker | we lead |
| 9 | Tests/evals/evidence | One manual, ungraded fixture doc (`tests/corpus.md`), no runner, no benchmark numbers | 114-test automated `node --test` suite with upstream parity tests, though Arabic fixtures are self-written and evals are builder-self-graded (documented as such) | we lead, with an honest caveat on our own side too |
| 10 | Native-speaker quality (Arabic) | One MSA-focused file with linguistically specific, plausible content (verb-initial word order, idafa, typography); no native review claimed or evidenced | Three dialect-specific files with much deeper Egyptian/Levantine coverage, but explicitly documented as **not** native-reviewed (Levantine "entirely unreviewed," all 30 fixtures self-written) | tie — neither has verified native review; theirs is narrower but nothing contradicts its accuracy, ours is deeper but self-flags the same gap |
| 11 | Ethics | Implicit "better writing" framing; detector evasion never mentioned, "never invent facts" rule stated | Explicit, prominent refusal of detector-evasion requests; explicit "never invents facts" rule | tie (both good; ours is more explicit) |
| 12 | Notable ideas worth borrowing | 5-family taxonomy, Family-1b English-sourced-phrase shortcut, P0/P1/P2 clustering rule, per-pattern "do not flag, this is the correct fix" guards, manual read-only counter-sample corpus | (n/a — this row assesses what we can take from them) | they lead (this is literally their contribution to us) |
| 13 | Weaknesses | No detector, no validator, thin Arabic dialect content, no test automation, single-commit history, unverified "strongest tell" claims | Self-documented in `docs/REVIEW-HANDOFF.md` §3: self-written Arabic fixtures, unreviewed Levantine, unreliable short-text dialect ID, uncalibrated weights, Node 18 never actually run | tie — both have real, candidly documented weaknesses; ours are more thoroughly self-audited |
