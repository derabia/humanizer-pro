# scripts/

`origin: humanizer-pro` unless noted. Node >= 18, CommonJS, zero npm
dependencies.

## detect.js

`node detect.js <file|-> [--lang en|ar] [--variety msa|egt|shami] [--register default|formal] [--json] [--markdown]`

Scores one document for AI-writing tells and prints a report. It routes to
one of two engines and never edits anything.

- `<file>` — path to a UTF-8 text or Markdown file. `-` reads the document
  from stdin.
- `--lang en|ar` — force the engine instead of auto-detecting it.
- `--variety msa|egt|shami` — force the Arabic variety. Implies `--lang ar`.
- `--register default|formal` — threshold profile for the Arabic engine
  (IMP-13). `formal` relaxes the sentence-rhythm gate and nothing else; see
  "Register profiles" below. Accepted but inert for the English engine, and
  always echoed as `stats.register`. Bad values exit `2`.
- `--json` — print the raw analysis object with a `lang` field in front of
  it, instead of the human-readable report.
- `--markdown` — analyse as *rendered* Markdown
  (`sourceMode: 'rendered-markdown'`) on either engine.

### Routing

`lib/lang.js`'s `identify()` decides. `ar` and `mixed` both go to the Arabic
engine: a mixed document is Arabic prose with English terms in it, and
code-switching into English is a documented dialect feature
(`AR-EGT-016`, `AR-SHM-017`), not a tell. Latin-script terms are left alone
by the Arabic engine. `en` and `unknown` go to `lib/en-detector`.

### Dialect-evidence guard (IMP-27)

Two filters stand between a marker hit and a dialect verdict. Both were added
after the 300-document human corpus measurement in `corpus/RESULTS.md`, which
found that **four of its five false positives were plain MSA Wikipedia
articles being measured against the Egyptian lexicon**.

**1. Ambiguous markers are not dialect evidence.** Nine of `lib/lang.js`'s
markers fired on ordinary pre-2022 human Arabic prose, because each is also an
ordinary MSA word or a fragment of a transliterated foreign name. Measured
firings (`docs/evidence/round1-wave2F-marker-homographs.txt`):

| marker | docs / hits | what it actually was |
|---|---|---|
| دي | 18 / 29 | the Latin particle "de" and the letter D in names (بيريس دي ترافا، بي اس دي) |
| يعني | 21 / 22 | plain MSA "means / that is" |
| دول | 15 / 18 | plain MSA plural of دولة, "states/countries" |
| ايه | 3 / 17 | the letter A in transliterated acronyms (سي آي إيه = CIA، انتونوف ايه ان) |
| بقى | 7 / 8 | MSA بقي "remained" (normalization collapses ى and ي) |
| والله | 3 / 3 | the MSA oath, in quoted classical text |
| طب | 2 / 3 | MSA "medicine" (طب الأسنان) |
| روح | 1 / 1 | MSA "spirit/soul" |
| هاي | 1 / 1 | a syllable of a transliterated name |

**Zero true dialect hits appeared in 300 documents.** These markers are now
reported as `dialectEvidence[variety].ambiguousDistinct` /
`ambiguousHits` and never as `distinct` / `hits`. They still appear in
`evidence[]`, so nothing is hidden. Because `distinct` is what the register-mix
gate below reads, an MSA article whose only "dialect" words are name
transliterations no longer has standing to be promoted to a dialect verdict.

*Stated trade-off:* genuine Egyptian or Levantine text whose **only** dialect
markers are on that list now routes to `msa`. No fixture regresses (every
Arabic dialect fixture carries at least two strong markers), but it is a real
narrowing and is queued for native review.

**2. MSA-dominance guard.** A dialect verdict additionally requires that
marker evidence not be swamped by MSA-only function-word evidence:

```
strongHits * 3 >= msaHits       OR       strongHits per 100 words >= 3
```

`msaHits` counts `MSA_ANCHOR_WORDS`, relatives الذي/التي/الذين، negation
لم/لن/ليس، the future particle سوف، and كذلك/حيث/إذ, taken from the MSA ->
Egyptian leakage checklist in `references/ar-egyptian.md` (`AR-EGT-026`) and
its Levantine twin (`AR-SHM-001`). That list is deliberately **narrower** than
`lexicons.js`'s `MSA_FUNCTION_WORDS`, which is built for the leakage *scoring*
signal and includes items (جدا، فقط، كيف، أيضا) that appear freely in written
dialect. The escape hatch exists because dialect writing does reach for الذي
and لم on occasion, and dense marker evidence should not be overridden by it.

`dialectEvidence` exposes `msaHits`, `msaHitsPer100` and a per-variety
`guardPassed`, so a caller can see exactly which filter a verdict turned on.
The guard governs `identify()`'s own verdict; `detect.js`'s register-mix gate
reads `distinct`/`hits` and could consume `guardPassed` as well.

### Register-mix detection (auto-routing only)

`identify()` picks a single `variety` for the whole document from dialect
marker density. That is the right call most of the time, but it misses a
specific, common AI failure: **register collapse** (`references/ar-egyptian.md`
Category 1, "Register Collapse — AI Defaults to MSA") — an AI asked to write
Egyptian or Levantine Arabic instead writes something that reads, lexically,
as close to 100% MSA. There are no dialect function words to count, so
`identify()` correctly (given what it can see) reports `variety: 'msa'` with
little or no dialect evidence, even though the text is a textbook AI
dialect-tell.

To catch this, `analyze()` runs a **register-mix check**
(`registerMixCheck()` in `detect.js`) whenever ALL of the following hold:

- no `--lang`/`--variety` was passed (auto-routing only — an explicit
  override always wins outright, no second-guessing);
- `identify()` resolved to `variety: 'msa'`;
- and either `identify()` found at least one dialect marker
  (`dialectEvidence.{egt,shami}.distinct >= 1`) OR the `msa`-variety analysis
  itself already found a `P0`/`P1` issue (register-collapsed AI text still
  trips the generic AR-MSA-\* tells — hedging, transitions, uniform rhythm —
  even with zero dialect vocabulary).

When it runs, it scores the document under the strongest dialect candidate
(the dialect(s) with lexical evidence, when there is any; both `egt` and
`shami` as a guess when there is none — pure-MSA text with a P0/P1 `msa`
issue but no dialect vocabulary at all scores similarly under either, so
there's no principled way to prefer one from content alone) and compares
against the `msa` score. **Promotion is gated in two layers**, and failing
either leaves the result exactly as the `msa` engine scored it:

1. **Lexical dialect intent (gate 1).** The winning variety must itself show
   real lexical evidence: `dialectEvidence[variety].distinct >= 2`, OR
   `distinct >= 1 AND hits >= 3`. This is the gate that matters most: msa's
   own P0/P1 issues (hedges, transitions, passive constructions) say nothing
   about *which* dialect, if any, the text was meant to be — only lexical
   markers do. A document with a single hedge phrase and zero dialect words
   fails this gate outright and is never promoted, no matter how high the
   dialect engine happens to score it (see the regression below).
2. **Score floors, leakage excluded (gate 2).** Even past gate 1, the
   dialect analysis's full score must outscore `msa` and clear
   `THRESHOLDS.AI`, AND its score *with `msa-leakage` issues excluded*
   (`stats.scoreWithoutLeakage`, computed by `ar-detector` with the same
   weighting/repeat-discount pass minus any `AR-EGT-026`/`AR-SHM-001` hits)
   must independently clear `THRESHOLDS.MIXED`. Rationale: the `msaLeakage`
   signal fires almost identically against near-pure-MSA text regardless of
   which dialect lexicon is forced on it, so leakage alone is not evidence
   the document was *meant* as that dialect — only that it isn't cleanly
   that dialect. A dialect verdict has to be backed by real non-leakage
   signal, not leakage by itself.

**Documented regression this gate fixes:** inserting a single hedge phrase
(`من المهم الإشارة إلى أن `) at the start of a clean human MSA fixture used
to get promoted to `egt` at score 59 (`msaScore` 6, `dialectScore` 59) —
carried almost entirely by `msaLeakage`, with zero lexical dialect evidence
in the text. Under the two-gate check this never promotes: gate 1 fails
(`dialectEvidence.egt.distinct` is 0), so the result stays `msa`/`HUMAN`.
Covered by `tests/detect-autoroute.test.js`'s hedge-injection test across
all five `tests/fixtures/ar-msa/human-*.md` fixtures, plus a companion test
that appends a single stray dialect word (`وكان الجو كده.`) to the same
fixtures and asserts the verdict still stays `HUMAN` (one incidental word
gives `distinct: 1, hits: 1`, which also fails gate 1's `hits >= 3`
fallback).

`stats.registerMix = { msaScore, dialectScore, scoreWithoutLeakage, variety,
promoted, note, noteEn }` is attached whenever the check runs, whether or
not it ends up promoting — `promoted` records the outcome explicitly, `note`
is the Arabic summary line, `noteEn` its English equivalent. See
`docs/evidence/phase6b-fixture-scores.txt` for the auto-routed score table
this produces across every fixture, and `tests/detect-autoroute.test.js` for
the tests. Note that the `ar-egt/ai-*.md` and `ar-shami/ai-*.md` fixtures
themselves now carry 2-4 genuine dialect markers each (realistic
register-collapsed AI text still drops *some* dialect vocabulary even while
defaulting to MSA grammar) — dense enough that `identify()` routes most of
them to the dialect engine directly, so the register-mix comparison line is
mostly absent from their rows in that table; it still fires for weaker
cases such as `tests/fixtures/false-positives/ar-technical-en-terms.md`.

### Quoted-speech masking (routing only)

A narrator writing in one register — typically MSA — who quotes a speaker
verbatim in another (a dialect) is not "mixing" registers at the document
level; only the quoted speaker is. Before counting dialect markers,
`identify()` masks quoted spans (Arabic guillemets `«...»`, straight `"..."`
and curly `"..."` double quotes) so a quoted speaker's dialect words never
route the whole document to that dialect's engine. Without this, a
faithfully human-quoted interview gets routed to the quoted speaker's
dialect engine, and the narrator's own (genuinely correct) MSA prose is then
flagged as `msa-leakage` against a register it was never written in — see
`tests/fixtures/false-positives/ar-quoted-speech.md`, which is built for
exactly this case. Bare colon-led dialogue with no quote marks is
deliberately *not* masked: colons also introduce lists and definitions in
plain MSA prose, and masking on the colon alone would blind the detector to
real narration.

This masking affects marker-counting inside `identify()` only. It does not
touch the Arabic engine's own lexicon matching, which still sees the full
text once a variety (forced or auto-picked) is chosen for `analyzeText()`.

### Exit codes

- `0` — always, including for an `AI` verdict. A detection result is not an
  error.
- `2` — input error only: missing/unreadable file, unreadable stdin, unknown
  flag, bad `--lang`/`--variety` value, no input argument.

### Output

The report prints the language/variety and language-ID confidence, the score
and label, the review-signal note, a calibration line, a stats line, a
coverage line, and the issues grouped `P0` / `P1` / `P2` with `line:col`,
pattern id, type, excerpt and suggestion. The note is printed verbatim on
every run, for every engine:

```
note:       score is a review signal, not an authorship claim
calibration: uncalibrated-review-signal  engine-version 7f3a91c  authorship-claim false
stats:      words 146, sentences 10, paragraphs 1, sourceMode rendered-markdown, register default
coverage:   16 group(s), 27.4% of scored text affected (scored-chars-excluding-masked)
```
 When the register-mix
check (above) ran, the stats line also prints a `register-mix:` line with
the `msa` vs. dialect scores and the Arabic summary note. Arabic is written
to stdout as UTF-8 by `process.stdout.write` — no console codepage handling
is needed on Windows.

`--json` prints `{ lang, variety, confidence, engine, arabicRatio, score,
label, issues, stats, groups, authorshipClaim, calibration, engineVersion }`. The two engines' `issues` and `stats` differ in
shape (the English engine reports `{type, text, index, severity:
'critical'|'high'|…}`; the Arabic engine reports `{type, patternId, start,
end, excerpt, severity: 'P0'|'P1'|'P2', suggestion}`); `lang`, `score`,
`label`, `issues` and `stats` are common to both.

### Uncalibrated-signal labelling (IMP-14)

Three fields are present on **every** `detect.js --json` result and on every
`analyze()` return, for both engines. They were **added**; nothing was renamed
or removed, so pre-IMP-14 callers keep working.

| field | value | meaning |
|---|---|---|
| `authorshipClaim` | always `false` | this tool never claims to know who or what wrote a document. The score is evidence for a human reviewer, not a verdict on authorship. |
| `calibration` | `"uncalibrated-review-signal"` | the Arabic engine's weights are reasoned from the reference documents, not fitted to a labelled corpus, so no false-positive/false-negative rate is claimed. The English engine is asked for its own calibration note first (`enDetector.CALIBRATION`); it publishes none today — its `class_probabilities` are, by its own source comment, "not calibrated against a labeled corpus" — so it receives the same label. If it ever publishes one, that string is used verbatim. |
| `engineVersion` | e.g. `"7f3a91c"` (a git short SHA) or `"v0.1.0"` | `git rev-parse --short HEAD`, read once per process with this file's directory as cwd and with git's stderr discarded. When git is unavailable (no binary, not a repository, an installed skill, an exported zip) the `package.json` version is used, prefixed `v` so the two shapes can never be confused. A git answer is only trusted when `git rev-parse --show-toplevel` names a humanizer-pro checkout — an installed skill can live inside an unrelated repository (a dotfiles repo under `~/.some-other-tool`, say), and a SHA from that repo would be actively misleading rather than merely absent. `tools/build-zip.js` archives only `skills/humanizer-pro/`, so the exported zip carries no `package.json`: a skill installed from that zip, outside a humanizer-pro checkout, reports `"unknown"`. The field is always present and always a string. |

The readable report carries the same commitment as one line:

```
note: score is a review signal, not an authorship claim
```

### Issue grouping and affected coverage (IMP-10)

Engine-agnostic **post-processing** in `detect.js`, applied to whichever engine
ran. Additive: `issues` is untouched and keeps its order.

`groups` is a new top-level array:

```json
"groups": [
  { "start": 147, "end": 234, "issueIds": [0, 1, 2], "topSeverity": "P0" },
  { "start": 235, "end": 239, "issueIds": [3],       "topSeverity": "P1" }
]
```

- Spans that **overlap** *or merely **touch*** (`previous.end === next.start`)
  are merged into one group. Merging is a single left-to-right pass over the
  spans sorted by `start`.
- `issueIds` are zero-based indices into `result.issues`, ascending. Indices,
  not `patternId`s: a pattern that fires twice produces two findings with the
  same `patternId`, so `patternId` is not an identifier.
- `topSeverity` is the worst severity in the group (`P0 > P1 > P2 > P3`),
  normalized across engines — the English engine's `critical`/`high`/… labels
  are mapped through `enDetector.SEVERITY_LABELS` first.
- Spans come from `issue.start`/`issue.end` (Arabic engine) or
  `issue.index` + `issue.text.length` (English engine). A finding with no
  usable offset (the English engine emits document-level findings with a null
  index) cannot be placed: it is left out of `groups` and out of coverage, and
  counted in `stats.ungroupedIssueCount` (the key is absent when zero).

Three new `stats` fields:

| field | meaning |
|---|---|
| `stats.groupCount` | `groups.length`. Two overlapping hits count as **one** group. |
| `stats.affectedCharCount` | sum of the **merged** span lengths. Because the spans are merged first, an overlap contributes its union exactly once and can never be double-counted. |
| `stats.affectedCoveragePercent` | `affectedCharCount / denominator × 100`, rounded to one decimal and clamped to `100`. |
| `stats.coverageBasis` | which denominator was used: `scored-chars-excluding-masked` or `total-chars`. |

**Coverage denominator.** The Arabic engine publishes `stats.maskedCharCount`
and `stats.scoredCharCount` (total length minus masked URLs, inline code,
fenced blocks and initial frontmatter), and that scored count is used — a URL
or a code fence is not scored text, so it must not sit in the denominator. The
English engine does not publish masked-region **lengths** (only booleans/counts
of masked *items*), so for `engine: 'en'` the denominator is the full text
length and `coverageBasis` says `total-chars`. `affectedCoveragePercent` is
therefore comparable across documents on the same engine, and comparable across
engines only up to that difference in basis.

### Ignore regions

Engine-agnostic **pre-processing** in `detect.js`'s `analyze()`, applied
*before* either engine runs. Text between a marker pair is replaced with
spaces of identical length (UTF-16 code units) prior to routing, scoring, or
`sourceMode` masking, so:

- no issue can ever start inside the region (there is nothing left in it but
  spaces to match), and
- every issue **outside** a region keeps its exact original offset — for any
  issue, `text.slice(issue.start, issue.end)` (Arabic engine) or
  `text.slice(issue.index, issue.index + issue.text.length)` (English engine)
  against the **original, unmasked** text is byte-for-byte what it would have
  been had the markers never been there.

Two marker families are accepted, matched independently — a
`<!-- /humanizer:ignore -->` closer only closes a `<!-- humanizer:ignore -->`
opener, never a `-start`/`-end` one, and vice versa:

```
<!-- humanizer:ignore -->
This paragraph is never scored, no matter what it says.
<!-- /humanizer:ignore -->

<!-- humanizer-ignore-start -->
Same effect, alternate spelling.
<!-- humanizer-ignore-end -->
```

An opener with no matching closer masks from the opener to the **end of the
text** — better to under-report than let an unmatched marker leak an
AI-sounding excerpt through — and is recorded rather than silently dropped.

Two new `stats` fields, always present:

| field | meaning |
|---|---|
| `stats.ignoredRegions` | number of ignore regions masked (0 when none). |
| `stats.ignoredCharCount` | total code units masked across all regions, markers included. |

A top-level `warnings` array is added only when something needs flagging:
an unclosed opener adds `'unclosed ignore region'`. `warnings` is absent
(not an empty array) when there is nothing to warn about.

**Why this exists.** Doctrine files (`references/*.md`) deliberately quote
bad, AI-sounding text as worked "here is what NOT to write" examples. Without
a way to mark that quoted text as exempt, any detector run over our own docs
is noise: the "bad" example is correctly flagged as AI-sounding, but it was
never meant to pass as our own prose. `tools/self-scan.js` (IMP-20) wraps
every such quoted example in `<!-- humanizer:ignore -->` markers before
scoring our own `references/*.md`, `SKILL.md`, and top-level `docs/*.md`
files, and tracks the resulting **adjusted** score against a per-file budget
in `tools/self-scan-budgets.json` so a regression in our *own* prose (not in
the deliberately-bad quoted examples) is caught. Run it with:

```
npm run self-scan            # table, exits 1 if any file is over budget
node tools/self-scan.js --json
node tools/self-scan.js --update-budgets   # rewrite the budgets file
```

### Programmatic use

    const { analyze } = require('./detect.js');
    const result = analyze(text, { lang: 'ar', variety: 'egt', markdown: true });

Same routing and same return shape as `--json`. `validate.js` uses the
underlying engines directly.

---

## The Arabic engine (`lib/ar-detector/`)

`analyzeText(text, { variety, sourceMode, register }) -> { score, label, issues, stats }`,
plus `PATTERNS`, `WEIGHTS`, `THRESHOLDS`, `REGISTER_PROFILES` and `GATES` for
tests and docs.
Split across three files: `lexicons.js` (phrase lists per pattern id, per
variety), `signals.js` (masking, segmentation, stylometry) and `index.js`
(orchestration and scoring).

Every phrase list in `lexicons.js` cites the reference pattern id it
implements — `AR-SH-*` from `references/ar-shared.md`, `AR-MSA-*` from
`references/ar-msa.md`, `AR-EGT-*` from `references/ar-egyptian.md`,
`AR-SHM-*` from `references/ar-levantine.md`.

### Labels and thresholds

The English engine does not expose a `HUMAN`/`MIXED`/`AI` label: its `label`
is a descriptive band (`Clean`, `Minimal AI signals`, …) and its trinary
field is `document_classification` with `HUMAN_ONLY`/`MIXED`/`AI_ONLY`. The
Arabic engine therefore defines its own three-way label:

| score | label | maps to the English engine's trinary as |
|---|---|---|
| `0 – 24` | `HUMAN` | `HUMAN_ONLY` |
| `25 – 54` | `MIXED` | `MIXED` |
| `55 – 100` | `AI` | `AI_ONLY` |

Exported as `THRESHOLDS = { MIXED: 25, AI: 55, TOO_SHORT_WORDS: 20, TOO_SHORT_CAP: 24 }`.

### Weights

| tier | weight | meaning |
|---|---|---|
| `P0` | 14 | critical — must always be fixed |
| `P1` | 6 | significant — fix unless there's a stated reason not to |
| `P2` | 2 | minor — fix opportunistically |

Repeated hits of the **same** pattern id get diminishing returns: 1.0 for the
first, 0.5 for the second, 0.25 for every later one. `score = min(100,
round(sum of weighted hits))`. There is no length normalization: the repeat
discount already bounds what one phrase can contribute, and a length divisor
would make short dialect samples unscoreable.

### Conservative by default

The weights are chosen so that **no single signal can reach the AI
threshold**, and so that a typical human paragraph containing one hedge
scores `HUMAN`:

- one `P2` signal → 2 → `HUMAN`
- one `P1` hit → 6 → `HUMAN`
- one `P0` hit → 14 → `HUMAN` (not even `MIXED`)
- reaching `AI` needs roughly four independent `P0`-class signals, or a
  realistic accumulation such as two `P0` + three `P1` + two `P2`

Signals that are really *absences* — no discourse particles, no rhetorical
questions, no metaphor, no code-switching, no letter lengthening — are
deliberately **not scored**, because an absence fires on every short or
technical text. And per `ar-shared.md`, "Rhetorical devices that are NOT
tells in Arabic", rhetorical and reader-directed questions are never a
signal in Arabic; the English-language rule is explicitly inverted here.

### Register profiles (IMP-13)

`opts.register` selects a threshold profile. **Exactly two profiles exist and
no third is planned** — the cap is the mitigation for threshold sprawl recorded
against IMP-13. Both numbers are stated here and asserted in
`tests/register-profile.test.js`.

| gate | `default` | `formal` | change |
|---|---|---|---|
| burstiness CV lower bound (`AR-SH-004`, `P0`) | `0.35` | `0.22` | relaxed by `0.13` absolute, i.e. the bound is **37% lower** |
| max-sentence-length / run-on trigger | `null` | `null` | **no such trigger exists in this engine**, so there is nothing to relax |
| everything else (lexicon phrases, severities, `P0/P1/P2` weights, `minCount`s, paragraph CV `0.22`, trigram ratio, transition density, MSA leakage, punctuation, diacritics) | unchanged | unchanged | — |

Why: formal MSA — legal, academic, contractual — is written in long clauses of
deliberately similar weight. A sentence-length coefficient of variation in the
`0.22`–`0.35` band is normal in that register and is **not** evidence of
generation, so the default profile over-fires a `P0` on it. Below `0.22` the
sentences are close to mechanically identical and `AR-SH-004` still fires under
`formal` too. A register profile can only ever make the engine *quieter*: it
cannot add a finding and cannot make any AI tell cheaper.

The `maxSentenceWordsThreshold: null` key is carried in both profiles
deliberately, so the absence of a run-on trigger is documented in the profile
table rather than left for a reader to grep for. If one is ever added, `formal`
is where it gets its relaxed bound.

Measured on `tests/fixtures/register/formal-human-msa.md`, a human-authored
administrative-law passage in MSA (`<!-- NATIVE-REVIEW: msa -->`, line 2),
sentence-length CV **0.244**:

| profile | score | label | `AR-SH-004` |
|---|---|---|---|
| `default` | **31** | `MIXED` | fires (over-fire) |
| `formal` | **17** | `HUMAN` | does not fire |

The difference is exactly `WEIGHTS.P0` (14) — the one rhythm finding — and no
other finding is added or removed. The over-fire was reproducible: the fixture
scores above the `MIXED` threshold under `default` purely because of rhythm,
with the remaining 17 points coming from three `AR-SH-007` passive-voice hits
(`6 + 3 + 1.5`, diminishing returns), two `AR-SH-002-B` `P2` transitions
(`2 + 1`) and two `AR-SH-TYPO` `P2` typography observations (`2 + 1`, a Latin
comma and mixed digit systems) — all of which are ordinary in a legal text.

Regression guard, also asserted: `tests/fixtures/ar-msa/ai-01.md` still scores
**100** / `AI` under `formal`, well above the `AI` threshold of 55. Relaxing the
rhythm gate does not let a generated document through.

`stats.register` echoes the active profile, `stats.registerGates` echoes its
numbers, and an unrecognized value falls back to `default` with
`stats.registerFallback` recording what was asked for.

### Signals

| # | signal | pattern id(s) | tier | gate |
|---|---|---|---|---|
| a | phrase-lexicon hits, matched on the normalized string and mapped back to original offsets | `AR-SH-001/002/003/006/007`, `AR-MSA-002/006/007/008/012/031/032`, `AR-EGT-001/003/005/007/013/014/024`, `AR-SHM-001/004/005/006/007/022` | per pattern | some patterns carry a `minCount` (passive voice 2, تم/يتم 2, MSA-vocabulary runs 2, syntactic template 3, light-verb calques `AR-MSA-031` 2), below it they report nothing |
| b | weighted tiers `P0 > P1 > P2` with per-pattern diminishing returns **and a per-pattern contribution cap of 24** | n/a | n/a | no single `patternId` can contribute more than 24 points in total, so none can reach `MIXED` alone (see "Per-pattern contribution cap" below) |
| c | sentence-length burstiness (coefficient of variation; split on `.` `؟` `!` `؛` and newlines) | `AR-SH-004` | `P0` | ≥ 5 sentences; fires below CV 0.35 (`register: 'formal'` → 0.22 — the only register-conditional gate) |
| d | paragraph-length uniformity | `AR-MSA-014` | `P2` | ≥ 4 paragraphs; fires below CV 0.22 |
| e | word-trigram repetition | `AR-MSA-028` | `P2` | ≥ 40 words; fires above a 0.04 repeat ratio |
| f | transition-phrase density per 100 words | `AR-SH-002` | `P1` | ≥ 60 words; fires above 2 per 100 words (`ar-levantine.md` `AR-SHM-012`, shm:509-510 — kept because that reference explicitly retains it as an editing rule, not as a claim about AI behaviour) |
| g | MSA-leakage ratio — **dialect varieties only** | `AR-EGT-026` / `AR-SHM-001` | `P0` at ratio ≥ 0.75, `P1` at ≥ 0.5 | ≥ 4 total function-word hits |
| h | punctuation profile: Latin `,` `;` `?` used directly after an Arabic letter, and Arabic-Indic/Western digits mixed in one document | `AR-SH-TYPO` (`ar-shared.md`, "Typography and numbers") | `P2` only, never weighted heavily | — |
| i | vocabulary concentration: top-word share among content tokens, and type-token ratio over the first 200 content tokens | `AR-SH-008` | `P2`, **graded 1..2** | ≥ 80 content tokens for the share; ≥ 200 for the TTR. Fires above a top-word share of `0.0629` or below a TTR of `0.6455` (see "Vocabulary concentration" below) |
| — | tanwin present in Egyptian-target text (measured before normalization) | `AR-EGT-002` | `P1` | variety `egt` |
| — | tashkeel other than shadda in Levantine-target text (measured before normalization) | `AR-SHM-018` | `P0` | variety `shami` |

**MSA-leakage ratio** = `msaHits / (msaHits + dialectHits)`, over the MSA
function-word inventory from the two leakage checklists (negators لم/لن/ليس,
future سـ/سوف, demonstratives هذا/هذه/هؤلاء/ذلك/تلك, relatives
الذي/التي/الذين, interrogatives, core lexicon) against that variety's dialect
equivalents (مش، مفيش، ده/دي/دول، اللي، هاد/هاي/هدول، رح، بدّي …). Bare ما is
deliberately **not** counted on the dialect side — it is also an ordinary MSA
particle, and bare لا is excluded from the MSA side for the same reason (it
is retained for prohibition in every dialect). `stats.msaLeakage` is
**absent** (not `null`) for `variety: 'msa'`: MSA text leaking MSA is not a
concept.

### Per-pattern contribution cap

The summed, repeat-discounted contribution of any one `patternId` is capped at
`THRESHOLDS.PATTERN_CONTRIBUTION_CAP` = **24**, one point below the `MIXED`
threshold of 25. **No single pattern can reach `MIXED` on its own, however
often it fires.**

Why, measured rather than argued: the repeat discount (`1.0`, `0.5`, then
`0.25` for every later hit) slows a repeated pattern down but never stops it,
because the `0.25` tail is linear. A `P0` pattern firing fifteen times still
reaches `14 + 7 + 13 x 3.5 = 66.5` -> `AI` with no other signal present, and
`corpus/RESULTS.md` measured exactly that document: score **67**, one issue id,
`AR-MSA-006` (the تم/يتم periphrastic passive) fifteen times and nothing else.
Across the same 300-document human corpus `AR-MSA-006` fired in 45 of the 49
documents that reached `MIXED`, with 210 hits, far ahead of the next id. The
periphrastic passive is simply how Arabic encyclopedic prose reports agentless
events (تم بناؤه عام كذا), so its density is a feature of the register, not
evidence of generation.

The cap applies to **every** tier, `P0` included. That is a deliberate
deviation from the improvement brief, which exempted `P0`: `AR-MSA-006` is
itself `P0`, so a `P0` exemption would have left the one measured
single-pattern false positive untouched. What a `P0` keeps is its *weight*:
one `P0` hit is still 14 points against a `P1`'s 6 and a `P2`'s 2, so a `P0`
pattern reaches the cap in three hits where a `P1` needs six and a `P2`
seventeen. Corroboration between **different** patterns is untouched: two
capped patterns still sum to 48, and every `ai-NN.md` AI fixture stacks four or
more distinct patterns.

Measured effect on a synthetic MSA text of 20 تم/يتم passives in
varied-length sentences, so `AR-MSA-006` is the only id that fires:

| | uncapped | capped |
|---|---|---|
| `AR-MSA-006` contribution | `84` | `24` |
| score / label | `84` / `AI` | **`24` / `HUMAN`** |

`stats.patternContributionCap` echoes the cap and `stats.cappedPatterns` lists
every `patternId` whose uncapped subtotal exceeded it, with both values.

### Vocabulary concentration (`AR-SH-008`, IMP-23)

The engine's only **graded** signal. `signals.vocabularyConcentration(tokens)`
computes two length-robust lexical-variety statistics over *content* tokens,
tokens left after an Arabic function-word stoplist is applied, on the
**normalized** forms, so alef-form and tashkeel variation never splits a type
in two:

- **top-word share**: the share of the single most frequent content token.
  Applicable from **80** content tokens: it is a ratio, not a window-bound
  count.
- **type-token ratio (TTR)**: distinct types over tokens across the **first
  200** content tokens. TTR falls monotonically as a text grows, so it is only
  comparable inside a fixed window; `stats.vocabularyConcentration.ttr` is
  `null` below 200 content tokens rather than reported over a shorter one.

The weight is the number of gates tripped, **1** for either, **2** for both,
carried on `issue.weight`, which the scoring pass prefers over the tier weight.
`severity` stays `P2`, and a graded weight may never exceed its tier weight, so
the invariant that no signal costs more than its severity says still holds.

**Both gates are corpus-derived, not chosen.** Measured over the 300-document
pre-2022 human control corpus (full distribution in
`docs/evidence/round1-wave2F-vocab-distribution.txt`):

| gate | value | percentile | corpus distribution |
|---|---|---|---|
| `VOCAB_TOP_SHARE_GATE` | `0.0629` | p97.5 of top-word share (n=300) | median `0.0331`, p95 `0.0560`, max `0.0829` |
| `VOCAB_TTR_GATE` | `0.6455` | p2.5 of TTR (n=243 long enough for the window) | median `0.8000`, p5 `0.6955`, min `0.5200` |

The brief asked for p95 and p5. Measured, that pair puts **9.33%** of human
documents in contention rather than 5%, because the two tails are disjoint:
15 documents trip the share gate, 13 trip the TTR gate, and **no document
trips both**. The binding requirement is that at most 5% of human documents
receive *any* contribution, so the gates sit at the tightest measured
percentile pair that satisfies it: p97.5/p2.5 gives a union of exactly **15 of
300 = 5.00%**. Both per-axis percentiles are recorded so the deviation is
auditable.

The stoplist covers prepositions, conjunctions, pronouns, demonstratives,
relatives, interrogatives, negators and the كان/ليس copula families, plus two
groups the corpus forced in:

- **name-chain connectors and bare numerals** (بن، ابن، آل، ألف، مليون …). بن
  was the most frequent "content" token in six of the twelve
  highest-concentration human documents, at up to 55 occurrences. Left in, the
  signal would have been a detector of Arabic biographies.
- **dialect function words** (اللي، عم، مش، مو، رح، انو، شو، وين، ده/دي، عشان …).
  Left out, the signal would have been a detector of Egyptian and Levantine
  *grammar*: عم, the Levantine progressive particle, was the top "content"
  token in `tests/fixtures/ar-shami/human-02.md` at 7 occurrences.

تم/يتم is deliberately **left in** the content set: it is `AR-MSA-006`'s
business, and stoplisting it here would hide a real concentration.

### Offsets

Lexicon matching runs on the normalized string produced by
`lib/arabic-normalize.js` (`taMarbuta: false`, matching `lib/lang.js`), and
every span is mapped back through `toOriginalRange`. `issue.start` and
`issue.end` always index the **original** text, and
`text.slice(start, end) === issue.excerpt` holds — including on
tashkeel- and tatweel-heavy input, which is covered by a test.

Word boundaries are Arabic-aware: JavaScript's `\b` is ASCII-only and would
match لا inside لازم. Each phrase is wrapped in Arabic-letter lookaround with
an optional single-letter proclitic (و ف ب ل ك) allowed in front but excluded
from the reported span, so وعلاوة على ذلك hits and the excerpt is still
علاوة على ذلك.

Overlapping hits from different patterns (the same hedge is listed under
`AR-SH-001`, `AR-SH-006` and `AR-EGT-011`) are collapsed to one issue,
keeping the higher severity and then the longer span.

### What `rendered-markdown` excludes

`sourceMode: 'rendered-markdown'` masks — replaces with spaces, preserving
string length and every newline, exactly as `lib/en-detector` does, so
offsets never shift:

- an initial YAML frontmatter block (a `---` fence with a closing `---` and a
  first substantive line that parses as a YAML mapping key);
- HTML comments;
- fenced code blocks (backtick or tilde fences), fences included.

Masked in **both** modes, because the engine must never flag inside them:

- URLs (`http://…`, `https://…`, `www.…`);
- inline code spans.

### Edge cases

- Empty or whitespace-only input → `score 0`, `HUMAN`, no issues,
  `stats.empty` and `stats.tooShort` true.
- Text with no Arabic letters → `score 0`, `HUMAN`, `stats.noArabic` true.
- Fewer than 20 words → score capped at 24 (so never `AI`, never even
  `MIXED`) and `stats.tooShort` true. Issues are still reported; only the
  score is capped.
- An invalid `variety` or `sourceMode` falls back to `msa` / `plain` and the
  requested value is recorded in `stats.varietyFallback` /
  `stats.sourceModeFallback`.

### Known limitations

- **Short texts.** Under 20 words the score is capped and the stylometric
  signals (c-f) are all gated off; the engine can only report phrase hits.
  Between 20 and about 60 words, burstiness is the only stylometric signal
  that can fire. Treat anything shorter than a paragraph as unscoreable.
- **Dialect ID on short texts.** Routing depends on `lib/lang.js`, which
  needs at least two distinct **strong** dialect markers at a density of one
  per 100 Arabic words, plus the MSA-dominance guard (see "Dialect-evidence
  guard" above), before it leaves the `msa` default. A short Egyptian or
  Levantine snippet will usually be analysed as MSA, which suppresses the
  MSA-leakage signal entirely. `detect.js`'s `analyze()` (not
  `ar-detector.analyzeText()` called directly) mitigates the common case of
  this — register-collapsed AI text — with the register-mix check described
  above, but it is a `detect.js`-level compensation, not a fix to
  `lib/lang.js`'s underlying routing threshold. Pass `--variety` when you
  know the target and want to bypass auto-routing entirely.
- **Levantine is experimental.** `references/ar-levantine.md` is marked
  "experimental — pending native Levantine review", and the regional split
  (Syrian / Lebanese / Palestinian) is not modelled here: the engine treats
  Levantine as one variety. Region-scoped rules — the ما…ش circumfix
  (Palestinian only), French code-switching (Lebanese only), Turkish
  loanwords (Syrian only) — are **not** implemented, because applying them
  across the whole variety would produce false positives in the other two.
- **Single-pattern shortcuts are not honoured.** `ar-shared.md` `AR-SH-002`
  says three instances of علاوة على ذلك alone is enough to suspect AI
  authorship. Under diminishing returns three hits of that one `P0` pattern
  score 24.5 → `HUMAN`, and under the per-pattern contribution cap any
  number of hits of one pattern scores at most 24 → `HUMAN`. This is
  deliberate: the engine requires corroboration from an independent signal
  rather than trusting any single phrase. Every hit is still reported as a
  `P0` issue even when the score stays low.
- **Wrong-dialect text is not detected.** The engine checks a document
  against the variety it was *told* to use; it does not verify that the
  document is in that variety. Egyptian prose analysed as `shami` (or the
  reverse) scores `HUMAN`, because the two dialects share most of the
  leakage-side vocabulary (`مش`, `اللي`, `يعني`, `كمان`, `بس`). Use
  `lib/lang.js` to pick the variety, or pass `--variety` deliberately.
- **Synthetic-human fixtures.** Every Arabic human-style fixture under
  `tests/fixtures/ar-*/human-*.md` was written by this project, not sampled
  from native writing. They are marked `synthetic-human` and listed for
  review in `docs/native-review/fixtures.md`.
- **Partial corpus calibration.** The tier weights (`P0`/`P1`/`P2`), the
  label thresholds and the stylometric gates (c-h) were tuned against this
  repository's 30 Arabic fixtures and 5 Arabic false-positive fixtures, not
  against a measured corpus, and none of the upstream numeric thresholds
  (which the references dropped as uncited) were reintroduced. Three numbers
  **are** corpus-derived: the two `AR-SH-008` gates (p97.5 / p2.5 of the
  300-document human corpus) and the ambiguous-marker list. Everything else
  in the table above remains uncalibrated, and `stats.calibration` continues
  to report `uncalibrated-review-signal` for the document as a whole.
- **Tanwin in sourced Egyptian text.** `AR-EGT-002` fires once on
  `tests/fixtures/human-sourced/egt-01.md`, a sourced Egyptian Wikipedia
  article, on وأخيراً and مثلاً. This was investigated and **left as is**: the
  two words carry genuine tanwin fatha in the source revision, they are not
  inside a quoted MSA span, and `AR-EGT-002`'s premise (Egyptian colloquial
  has no case system) holds. The detector is reporting real MSA orthography
  in Egyptian-target prose, which is the pattern's job. Score impact is one
  `P1` hit; the fixture scores **8** / `HUMAN`.

---

## validate.js

`node validate.js before.md after.md [--seo keywords.txt] [--json] [--lang en|ar] [--variety msa|egt|shami] [--strict-digits]`

Compares an original document against a rewrite and fails when the rewrite
touched something it had no business touching, or when the rewrite's
AI-detector score got worse. Built on two layers:

- `lib/en-validate.js` — adapted verbatim from avoid-ai-writing's
  `detector/validate.js` (MIT). Not edited by this script; wrapped as-is.
  Covers: fenced code blocks, inline code, YAML frontmatter, blockquotes,
  Markdown tables, URLs (AI-tracking query parameters stripped from both
  sides before comparison), file paths, and heading count/nesting.
- `lib/validate-extra.js` — humanizer-pro original. Adds the SEO-mode
  protected spans from `references/seo-mode.md` that the upstream
  validator has no concept of, plus an Arabic-aware replacement for the
  heading-wording and number comparisons.

### Usage

```
node validate.js before.md after.md
node validate.js before.md after.md --seo keywords.txt
node validate.js before.md after.md --json
node validate.js before.md after.md --lang ar --variety egt
node validate.js before.md after.md --strict-digits
node validate.js before.md after.md --strict-fidelity
node validate.js before.md after.md --mode rewrite
```

- `before.md` / `after.md` — required positional arguments, in that order.
- `--seo keywords.txt` — one target/secondary keyword per line, first line
  is the primary keyword. Enables the `seo-*` checks below. Blank lines
  and lines starting with `#` are ignored.
- `--json` — machine-readable output: `{ ok, checks: [{name, status,
  details}], scores: {before, after}, lang, variety }`.
- `--lang en|ar` — force the language instead of auto-detecting it (via
  `lib/lang.js`, run against the `before` text) for the detector-score
  comparison and the Arabic-aware checks.
- `--variety msa|egt|shami` — force the Arabic dialect passed to the
  Arabic detector engine when `--lang ar` is in effect (or was
  auto-detected). Ignored for English.
- `--strict-digits` — a rewrite that changes a number's digit system
  (Western `0-9` ↔ Arabic-Indic `٠-٩` / Extended Arabic-Indic `۰-۹`)
  without changing its value fails instead of warning. See "Arabic digit
  handling" below.
- `--strict-fidelity` — promotes the `names-dates-citations` check (IMP-09)
  from its default `WARN` tier to `FAIL`. Off by default because proper-name
  extraction is heuristic; see "Names, dates and citations" below.
- `--mode rewrite|edit|seo` — records which humanizer mode produced the
  rewrite. When omitted it is **inferred**: `seo` if `--seo` was given,
  `edit` in every other case. `rewrite` is the only value that changes the
  output: the summary line gains `[mode rewrite — recommended for every
  rewrite]`, and `--json` gains `"note": "recommended for every rewrite"`.
  A bad value exits `2`.

`--json` gains `mode` and `strictFidelity` alongside the existing fields.

### Exit codes

- `0` — every check passed (warnings may still be present).
- `1` — at least one check FAILED.
- `2` — usage or input error (wrong argument count, unreadable file, bad
  flag value, empty `--seo` keyword file).

### Checks

Each check appears in the report/`--json` output as one of
`PASS` / `FAIL` / `WARN`. `FAIL` on any check makes the run exit `1`;
`WARN` never affects the exit code.

| check | status meaning | source |
|---|---|---|
| `code-blocks` | fenced code block(s) added, removed, or edited | en-validate.js |
| `frontmatter` | YAML frontmatter block changed at all | en-validate.js |
| `blockquotes` | blockquote content changed or removed | en-validate.js |
| `table-cells` | Markdown table content changed or removed | en-validate.js |
| `inline-code` | inline `` `code` `` span removed | en-validate.js |
| `urls` | a URL was removed or altered (AI-tool tracking parameters excluded from comparison) | en-validate.js |
| `file-paths` | a file path was removed or altered | en-validate.js |
| `json-ld` | a `<script type="application/ld+json">…</script>` block changed | validate-extra.js |
| `shortcodes` | a `[shortcode …]` token changed (Markdown links `[text](url)` are not shortcodes and are excluded) | validate-extra.js |
| `wp-comments` | a `<!-- wp:… -->` / `<!-- /wp:… -->` block comment changed | validate-extra.js |
| `html-attributes` | an HTML tag's attributes changed on a kept tag | validate-extra.js |
| `image-alt-captions` | a Markdown image's alt text, title/caption, or file name changed | validate-extra.js |
| `link-anchor-internal` | an internal link was deleted, or any link's anchor text changed | validate-extra.js |
| `frontmatter-meta` | frontmatter `title`/`description`/`meta_title`/`meta_description` changed | validate-extra.js |
| `heading-structure` | heading count/nesting changed (FAIL); wording changed after Arabic-normalization comparison (WARN) | validate-extra.js (Arabic-aware; supersedes en-validate.js's heading check) |
| `numbers` | a number's value changed or was removed (FAIL); digit system changed with the same value (WARN, or FAIL under `--strict-digits`) | validate-extra.js (Arabic-aware) |
| `seo-keyword-presence` | (only with `--seo`) a keyword present in the original is entirely absent from the rewrite | validate-extra.js |
| `seo-keyword-placement` | (only with `--seo`) the primary keyword dropped out of the title/H1, the first 100 words, or every H2 where it used to appear | validate-extra.js |
| `seo-stuffing` | (only with `--seo`) a keyword's occurrence count more than doubled | validate-extra.js |
| `seo-thin-sections` | (only with `--seo`) a heading's section shrank below 40 words — always WARN, never FAIL | validate-extra.js |
| `names-dates-citations` | a date, proper-name candidate or citation marker present in the original is absent from the rewrite — `WARN` by default, `FAIL` under `--strict-fidelity` | validate-extra.js (Arabic-aware) |
| `detector-score` | the rewrite's AI-detector score is higher (more AI-like) than the original's | validate.js, via `lib/en-detector` or `lib/ar-detector` |

### Names, dates and citations (IMP-09)

One check, `names-dates-citations`, covering three families. It runs on every
invocation, not only with `--seo`.

**(a) Dates.** ISO `2023-05-12`; `dd/mm/yyyy` and its `-` / `.` separators with
a 2- or 4-digit year; `12 May 2023`, `May 12, 2023` and the bare `May 2023`,
over the full English month-name set plus common abbreviations; `12 مايو 2023`
over the Egyptian/Gulf Gregorian names, the Syriac-origin Levantine set
(`كانون الثاني`, `شباط`, `آذار`, …) and the twelve Hijri month names; and Hijri
years carrying the `هـ` / `هجري` / `هجرية` marker.

**(b) Proper names — conservative heuristics, deliberately so.**

- English: a run of **two or more** capitalized words, optionally joined by
  `of`/`the`/`and`/`de`/`van`/`bin`/`ibn`/`von`. A candidate whose *first*
  token is a common sentence- or heading-initial word (`The`, `This`, `In`,
  `However`, `Table`, `Section`, `Usage`, …) is dropped.
- Arabic: the next one or two tokens after an honorific or title —
  `الدكتور`, `الأستاذ`, `السيد`, `الشيخ`, `المهندس` and their bare and
  feminine forms — or after a place/organization context: `في مدينة`,
  `في جامعة`, `جامعة`, `شركة`, `مدينة`. There is no morphological analyzer
  here, so nothing else is treated as a name.

**(c) Citation markers.** `[1]`, `[12]`, `[1,2]`, `[1-3]`;
`(Smith, 2020)`, `(Smith & Jones, 2020)`, `(Smith et al., 2020)`; a bare
`et al.`; `المصدر:` and `المراجع:`; DOIs (`10.1016/j.example.2019.04.002`);
and ISBN-10/13.

**Comparison.** All three extractors run over a canonicalized copy of both
texts: fenced and inline code stripped, Arabic-Indic (`٠-٩`) and extended
Arabic-Indic (`۰-۹`) digits folded to western, and Arabic letter forms folded
by `lib/arabic-normalize.js`. Punctuation is *not* normalized, so the comma in
`(Smith, 2020)` survives. Consequence: **a date rewritten across digit systems
does not warn here** — `١٢ مايو ٢٠٢٣` and `12 مايو 2023` produce the same key.
The digit-system change itself is already reported by the `numbers` check, and
reporting it twice would be noise. Dates, names and citations are each compared
as a **set**, not a multiset, because the patterns nest (`12 May 2023` also
matches `May 2023`) and a nested duplicate must not become a phantom missing
item.

**Tiering.** A missing item is `WARN` by default and `FAIL` under
`--strict-fidelity`. This is the "ship it as a warning tier first" mitigation
recorded against IMP-09: proper-name extraction without a morphological
analyzer over-fires in Arabic and, in English, on title-case headings, so the
blocking tier is opt-in. The check reports what it scanned (`N date(s), N name
candidate(s), N citation marker(s)`) so an over-firing count is visible rather
than hidden.

### SEO keyword semantics (`--seo keywords.txt`)

Keywords are read one per line; the first non-blank, non-`#` line is the
**primary** keyword, the rest are secondary. Per `references/seo-mode.md`:

- **Presence.** Every keyword present in the original body must still
  appear somewhere in the rewritten body. Missing entirely → `seo-keyword-presence` FAIL.
- **Placement.** The primary keyword is checked in three checkpoints:
  the title (frontmatter `title` + H1 text combined), the first 100 words
  of the body, and the text of every H2. A checkpoint only has to be kept
  if the keyword was present there in the original — e.g. if the primary
  keyword was never in an H2 to begin with, losing it from H2 text is not
  a failure. Any checkpoint that regresses → `seo-keyword-placement` FAIL.
- **Stuffing.** For each keyword, if it occurred at least once in the
  original, its occurrence count in the rewrite must not exceed 2× the
  original count. Exceeding that → `seo-stuffing` FAIL. A keyword absent
  from the original is not checked for stuffing.
- **Thin sections.** Any heading's body section under 40 words is
  reported — never a failure, always `seo-thin-sections` WARN, so a
  legitimately short section is visible but never blocks a rewrite from
  passing.

Body text for all of the above excludes YAML frontmatter and fenced/inline
code, matching the "structured block, not prose" principle the base
validator already applies to code fences and frontmatter.

### Arabic digit handling

Numbers are extracted with a digit class covering ASCII `0-9`,
Arabic-Indic `٠-٩` (U+0660–U+0669), and Extended Arabic-Indic `۰-۹`
(U+06F0–U+06F9), along with their thousands/decimal/percent separators
(`,` `٬` `٫` `%` `٪`). Comparison happens on the value after mapping every
digit to its Western form:

- A number whose **value** is missing or changed in the rewrite → `numbers` FAIL, regardless of digit script.
- A number whose value is unchanged but whose **digit script** changed
  (e.g. `220` → `٢٢٠`) → `numbers` WARN by default. This reflects that
  a script change alone is often an intentional localization choice, not
  a content error.
- Pass `--strict-digits` to make a pure digit-script change fail instead
  of warn.

### Heading comparison (Arabic-aware)

Heading **count** and **nesting level** changing between the two
documents is always a FAIL — restructuring is out of scope for a
validated rewrite. Heading **text** changing is only a WARN, and the
comparison runs both sides through `lib/arabic-normalize.js` first (strip
tashkeel/tatweel, unify alef forms, unify alef maqsura) so a heading whose
Arabic diacritics or alef-form spelling shifted, but whose wording did
not, is not reported as reworded. This normalization is a no-op on
non-Arabic text.

### Detector score comparison ("score comparison skipped" behaviour)

`validate.js` routes to the matching AI-detection engine to compare
`before` and `after`:

- `--lang en` (or auto-detected `en`/no strong Arabic signal) uses
  `lib/en-detector/index.js`.
- `--lang ar` (or auto-detected `ar`/`mixed`) uses
  `lib/ar-detector/index.js` with the resolved `--variety` (defaulting to
  the language-ID's detected variety, or `msa`).
- Language auto-detection runs `lib/lang.js`'s `identify()` against the
  `before` text once and applies the same engine to both files.

If the required engine module cannot be `require()`'d (for example,
`lib/ar-detector/` not yet present in a partial build) or the engine
throws while analyzing either text, the `detector-score` check reports
**PASS** with details `"Score comparison skipped: … (not computed)"` and
`scores: {before: null, after: null}` in `--json` output — a missing
engine is never treated as a validation failure. When the engine is
available, the check FAILs if the rewrite's score is higher (more
AI-like) than the original's by any amount, and PASSes otherwise
(equal or improved).
