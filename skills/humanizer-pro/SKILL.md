---
name: humanizer-pro
description: >-
  Humanize AI-generated writing and strip AI-isms, in English and Arabic. Use
  this skill whenever someone asks to humanize a text, de-AI it, make it sound
  human, remove the AI tone or AI tells, check whether a draft reads as AI,
  audit writing for AI patterns, match their own voice from a writing sample,
  or rewrite an article or blog post without damaging its SEO. Three modes:
  detect (audit plus 0-100 score), rewrite (default), edit (in-place edits to a
  prose file), plus an seo modifier that protects keywords, headings, links,
  anchor text, schema and CMS markup. Arabic covers فصحى (MSA), مصري (Egyptian)
  and شامي (Levantine) with automatic variety detection and no MSA leakage into
  dialect output. Also triggers on "make this sound human", "does this sound
  AI?", "match my voice", "SEO-safe rewrite", "أنسنة النص", "خلي الكلام طبيعي",
  "شيل أسلوب الذكاء الاصطناعي", "اكتبه بأسلوب بشري", "النص ده شكله AI". Never
  invents facts, quotes, statistics, sources or experiences.
license: MIT
metadata:
  version: "0.1.0"
  upstream: "blader/humanizer, conorbronsdon/avoid-ai-writing, OthmanAdi/humanizer-semitic"
---

# humanizer-pro

A router. It picks a mode, identifies the language and variety, loads only the
reference files that situation needs, and runs that mode's workflow. The rules
themselves live in `references/`; nothing is duplicated here.

All paths in this file are relative to this skill's own folder (the directory
containing `SKILL.md`). The installed location differs per host, and the
running shell's working directory is usually the project root, not this folder.

## 1. When to use this skill

Use it when a user wants prose to read as human writing rather than machine
writing: humanizing a draft, auditing text for AI tells, editing a Markdown
file in place, matching a supplied writing sample, or rewriting a published
article while keeping its SEO structure intact. English and Arabic (MSA,
Egyptian, Levantine).

Do not use it for:

- **Source code, configuration, or generated data.** A prose rewrite corrupts
  structured content. `edit` mode refuses these file types outright; see
  `references/modes.md`.
- **Legal, contractual, regulatory, or liturgical text** where the exact
  wording is the point.
- **Evading academic-integrity rules, plagiarism checks, or AI-detection
  policies.** The goal is better writing, not a lower detector score. Say so
  and stop.

Two limits hold in every mode. The skill **never invents** facts, numbers,
dates, names, quotes, citations, sources, personal experience, or credentials
to make a text feel human (`references/core-principles.md`). And when a draft
has no real substance to preserve, the skill **says the draft is thin** and
names what is missing, instead of padding it with confident filler.

## 2. Step 1: determine the mode

Read the request and pick one mode. `seo` is a modifier that combines with any
of them. Default to `rewrite` when the request is just "fix this" or a pasted
block of text with no instruction.

| Request phrase | Mode |
|---|---|
| "is this AI?", "audit this", "check for AI tells", "score it" | `detect` |
| "هل ده كلام ذكاء اصطناعي؟"، "افحص النص"، "قيّم النص" | `detect` |
| "humanize this", "make it sound human", "remove the AI tone", "rewrite it" | `rewrite` |
| "أنسنة النص"، "خلي الكلام طبيعي"، "شيل أسلوب الذكاء الاصطناعي" | `rewrite` |
| "fix the file", "clean up README.md", "edit it in place" | `edit` |
| "عدّل الملف نفسه"، "ظبط الملف ده" | `edit` |
| "without hurting SEO", "keep the keywords", "blog post for ranking" | add `seo` |
| "من غير ما تأثر على السيو"، "حافظ على الكلمات المفتاحية" | add `seo` |

A request with no verb at all defaults to `rewrite`. A request that asks only
for an opinion ("does this read like AI?") is `detect`, and detection alone
never authorizes rewriting.

## 3. Step 2: identify language and variety

When a shell is available, run the detector, which does this identification
and the scoring in one call:

```
node scripts/detect.js <file|-> [--lang en|ar] [--variety msa|egt|shami] [--json] [--markdown]
```

`-` reads the text from stdin. `--lang` and `--variety` override the automatic
identification when the user has stated what they want.

When no shell is available, apply the same heuristics by reading (they mirror
`scripts/lib/lang.js`):

1. **Arabic-script ratio**, counted over letters only. Digits, punctuation and
   whitespace count for neither side. Ratio at or above 0.6 means Arabic;
   0.15 or below means English; anything in between is mixed. Under 3 letters
   in total, the text is too short to call.
2. **Mixed Arabic and English goes to the Arabic engine**, and English terms,
   product names, and code identifiers inside it are preserved as written.
3. **Egyptian markers:** مش، ده، دي، إزاي، عشان، بتاع، كده.
4. **Levantine markers:** شو، هيك، هلق، منيح، بدّي، كتير.
5. **Call a dialect only on real evidence:** at least 2 distinct markers and at
   least 1 marker hit per 100 Arabic words. Weaker evidence than that means
   **MSA**, which is the default for Arabic.

Levantine output is **experimental**: `references/ar-levantine.md` has not had
a native Levantine review yet, and its three regional sub-variants (Syrian,
Lebanese, Palestinian) differ enough to matter. Say so when you deliver
Levantine text, and flag anything you are unsure of.

## 4. Step 3: load exactly the references you need

Read only the files listed on the matching row. Do not preload the catalogs;
they are large, and loading an unused one wastes the context the rewrite needs.

| Situation | Files to read |
|---|---|
| Any run (always) | `references/core-principles.md`, `references/precedence.md`, `references/modes.md` |
| English detect / rewrite / edit | the above + `references/en-patterns.md`, `references/en-vocabulary.md` |
| Arabic, MSA | the above + `references/ar-shared.md`, `references/ar-msa.md` |
| Arabic, Egyptian | the above + `references/ar-shared.md`, `references/ar-egyptian.md` |
| Arabic, Levantine (experimental) | the above + `references/ar-shared.md`, `references/ar-levantine.md` |
| Mixed Arabic and English | the Arabic rows for the detected variety; English terms stay as they are |
| A writing sample or a named voice profile was given | add `references/voice-matching.md` |
| `seo` modifier | add `references/seo-mode.md` |

`en-patterns.md` has a table of contents: find the relevant pattern IDs there
and read those entries rather than the whole file. The Arabic variety files
each assume `ar-shared.md` has been read first.

## 5. Step 4: apply precedence

Six levels, highest first. Full statements, exceptions, and worked examples
are in `references/precedence.md`.

1. **Protected content.** Facts, numbers, dates, names, quotations, citations,
   URLs, paths, identifiers, frontmatter, code, tables, genuinely list-shaped
   content, and user-marked SEO spans. Their meaning never changes.
2. **Explicit user instruction in this request.** Scope, exceptions,
   corrections, permission to restructure. It beats levels 3 to 6 outright and
   can re-scope level 1 only for a span the user names.
3. **User voice sample.** Match its rhythm, lexicon, punctuation (dashes
   included), openings and quirks. It overrides style rules only.
4. **Selected voice profile.** One of casual, professional, technical, warm,
   blunt. Optional; with none named, infer register and impose nothing.
5. **Language or dialect reference.** The active `en-*.md` or `ar-*.md` file
   owns everything language-specific, including Arabic typography and the fact
   that rhetorical questions are an English tell but a native Arabic device.
6. **Shared core patterns.** The language-neutral catalog and its defaults.
   Lowest level; anything explicit above it wins.

Find every rule that speaks to the span, take the highest level that speaks,
stop. Same level, prefer the more specific rule.

## 6. Step 5: run the mode workflow

`references/modes.md` holds the exact output contract for each mode. The
summary below is for orientation only; follow the file.

- **`detect`:** Issues found (grouped P0 / P1 / P2, each quoting the text and
  citing a pattern ID, with Tier-1A authorship markers kept visually separate
  from Tier-1B clarity edits), then Assessment (which flags are real problems
  and which are defensible in context), then Score (stated as a review
  signal, not an authorship claim; `authorshipClaim: false` in `--json`
  output), then Not flagged on purpose. If every finding is P2, close with
  "no verdict; weak signals only" instead of a label. Zero editing passes; no
  rewriting, no marks normalization.
- **`rewrite` (default):** Issues found, then the Rewritten version exactly
  once (never a draft superseded by a second full version), then What changed,
  then the **mandatory second-pass audit**, then the closing line
  `Claims added: 0` (or a list of user-supplied additions only).
- **`edit`:** confirm the file is prose and refuse code, config, and data
  files; apply minimal targeted edits to authorized spans only; report Edits
  made as before and after per location; then Verification; then the closing
  line `Claims added: 0` (or a list of user-supplied additions only).
- **`seo` modifier:** append Protected spans and SEO check to whichever mode
  ran, per `references/seo-mode.md`.

**The second pass is mandatory and is not optional polish.** Before delivery,
compare the final text against the source and account for every changed span:
each one must address a justified finding or an explicitly requested
transformation. Report four items: **Editing passes** used and the limit
(default ceiling two, the initial pass plus one corrective pass), **Checks**
(executed, model-only, or unavailable), **Residuals** (findings left and why,
or none), and **Stop reason** (a pass count alone is not a stop reason). In
the same pass, re-scan for the five tells that most often survive a rewrite: a
not-X-but-Y contrast, a one-line closer, a bare dash, a forced triad, a bold
label.

## 7. Step 6: verify

For `edit` and for any `seo` run, verification with the validator is
**mandatory** when a shell is available. For a plain `rewrite` with no `seo`
modifier, running the same validator on the source and the delivered
rewrite is **recommended** whenever a shell exists, not mandatory; it
catches the same preservation regressions `edit` gets for free:

```
node scripts/validate.js before.md after.md [--seo keywords.txt] [--mode rewrite|edit|seo] [--strict-fidelity] [--json]
```

Exit codes: `0` no violation, `1` at least one violation, `2` usage error.
Report the exit code and every violation it lists. See `references/modes.md`
"Verify with the validator" for the full statement of when this is required
versus recommended.

When no shell is available, work through the manual fallback checklist in
`references/modes.md` instead, and state plainly that the check was
model-only. Never call a file verified when the check did not run.

## 8. Output contract

`references/modes.md` is the contract. Two rules apply to every mode:

- **Report headings follow the language of the request.** An Arabic request
  gets Arabic headings; `modes.md` carries the exact heading table, including
  `Claims added` and `Not flagged on purpose`. Dialect requests still use the
  MSA heading forms, since headings are scaffolding and not the humanized
  prose.
- **The rewritten text stays in the language and variety of the input.** That
  is a separate choice from the report language. Egyptian input comes back
  Egyptian, MSA input comes back MSA, and mixed input keeps its English terms.

Two more rules apply to every `rewrite` and `edit` response specifically:
the response closes with `Claims added: 0` (or a list, user-supplied content
only), and a `detect` response closes with `Not flagged on purpose`, stating
what was deliberately left alone and why. Full statements in
`references/modes.md`.

## 9. When the scripts cannot run

The skill is fully usable as Markdown alone. Claude apps zip uploads, hosts
without Node, and sandboxes without shell access all land here, and so does a
script that errors out. In that case:

- Do the audit and the rewrite from the references. Every rule in this skill
  is stated in Markdown; the scripts only automate scoring and checking.
- In `detect` mode, write exactly: `Score: not computed: scripts unavailable`,
  and say the audit was model-only.
- In `edit` and `seo` runs, use the manual fallback checklist from
  `references/modes.md` and say it was model-only.
- Identify language and variety with the inline heuristics in section 3.
- Never report a score, an exit code, or a verification result you did not
  actually obtain.

## 10. Files in this skill

```
SKILL.md                      this router
references/
  core-principles.md          why AI text reads as AI; never-invent rules
  precedence.md               the six levels, with worked examples
  modes.md                    output contracts for detect / rewrite / edit / seo
  voice-matching.md           sample calibration plus five voice profiles
  seo-mode.md                 protected spans and SEO guardrails
  en-patterns.md              merged English catalog (has a table of contents)
  en-vocabulary.md            tiered vocabulary (1A, 1B, 2, 3)
  ar-shared.md                rules common to all Arabic varieties
  ar-msa.md                   Modern Standard Arabic
  ar-egyptian.md              Egyptian Arabic
  ar-levantine.md             Levantine Arabic (experimental)
scripts/
  detect.js                   CLI: language and variety identification, score
  validate.js                 CLI: preservation validator
  lib/                        lang.js, arabic-normalize.js, detector engines
LICENSES/                     upstream MIT notices
```

## Credits

humanizer-pro merges three MIT-licensed projects, whose licence texts are kept
verbatim in `LICENSES/`:

- **blader/humanizer** (`LICENSES/blader-humanizer.MIT.txt`): voice matching
  from a writing sample, core pattern philosophy, pattern catalog.
- **conorbronsdon/avoid-ai-writing** (`LICENSES/avoid-ai-writing.MIT.txt`):
  the three modes, the two-pass audit, tiered vocabulary, voice profiles, the
  deterministic detector and the preservation validator.
- **OthmanAdi/humanizer-semitic** (`LICENSES/humanizer-semitic.MIT.txt`):
  Arabic patterns for MSA, Egyptian and Levantine.

humanizer-pro itself is MIT licensed.
