# Competitive analysis

Decision document. Inputs: the twelve reviews in `docs/competitors/*.md` (each read
in full, each ending in a 13-dimension verdict table against humanizer-pro), our own
weak-spot list in `docs/REVIEW-HANDOFF.md` section 3, and spot verification against
the pinned clones under `_sources/competitors/`.

Every competitor claim below cites either the review file or a source file and line.
Where verification contradicted a review, that is stated inline and the claim is
downgraded or dropped. Ideas are borrowed as ideas; text is copied from nothing.

Naming hazard for a decision-maker: two of the eleven repos are also called
`humanizer-pro` (`eddyplolz_humanizer-pro.md:13`, `yoloshii_humanizer-pro.md:11`).
Neither is related to this project. A public release under this name collides with
both.

## 1. Landscape

Pattern counts are as counted in each review, not as self-claimed. "Tests" counts
executable test functions, not assertions.

| Repo | Form factor | Languages / varieties | Patterns | Deterministic detector | Validator | Tests | Agent-agnostic | Ethics stance | Licence |
|---|---|---|---|---|---|---|---|---|---|
| MrBridgeHQ/human-writer-ar | Skill + Python CLI | Arabic, MSA only | 174 vocab entries plus tiered regex bank | yes, Python | no | 54 | partly, Claude Code install only | better writing, but explicitly targets sub-25 percent on Copyleaks and GPTZero | MIT |
| POlLLOGAMER/Humanizer-Prompt-Advanced | Prompt README, 2 files | English plus a Spanish round-trip trick | about 6 unstructured techniques | no | no | 0 | yes, by omission | detector evasion, instructs fabricating personal experience | none |
| Pythonation/AI-Text-Humanizer-Protocol | Prompt README, 2 files | English patterns, Arabic wrapper prose only | 29 ID-labelled rules | no | no | 0 | yes | better writing framing, but fabrication-encouraging default voice | MIT (README badge contradicts it) |
| almuthanawork/arabic-translator | Skill, Markdown only | Arabic to English translation, register claims unverified | about 25, all English | no | no | 0 | mostly | literary fidelity, no evasion framing | none |
| amanmaqsood/prose-humanizer | Skill + npm CLI + 4 host manifests | English only, one Spanish fixture | 22 machine rules plus 8 safe fixes | yes, Node | yes, benchmark invariants | 45 | yes | better writing, `authorshipClaim: false` in every report | MIT |
| amirsaadzayed-rgb/arabic-ai-humanizer | Hosted FastAPI web app | Arabic, no variety handling | 0 | fabricated, hash of the input | no | 0 | no | deceptive: a fake score sold in a paid product | none |
| eddyplolz/humanizer-pro | Skill + Python CLI | English only | 79 sub-tells plus 11 artifact patterns | yes, Python | yes, `--compare` | 46 | yes | strongest anti-evasion stance in the set | MIT |
| finestructure-ai/humanizer-multilingual | Claude Code plugin marketplace, 7 skills | 10 languages, Arabic in one file, dialects named only | about 190 table rows across 5 families | no | no | 0 automated, 1 manual corpus doc | no, `/plugin` install only | better writing, evasion never raised | MIT |
| hazemshan1-rgb/humanizer-ar | Skill + Python scanner | Arabic, MSA only | 27 | yes, Python, count not score | no | 1 suite over 3 fixtures | no, Claude Code only | epistemic humility, no refusal clause | MIT |
| yoloshii/humanizer-pro | Skill, Markdown only | English only | 44 constraints | no | no | 0 | yes, paste-anywhere fallback | better writing, refuses to emit a score at all | MIT |
| ziadfaisalaljdy-beep/arabic-humanizer | Skill, Markdown only | Arabic, MSA implicit, dialects on roadmap | 15 | no | no | 0 | yes, paste-anywhere documented | better writing, narrow but real never-invent rule | MIT |
| sawradip/rehumanize | Claude Code plugin marketplace, 100 skills, plus AGENTS.md | 100 languages (BCP 47), one register each, Arabic MSA only | ~10 tells per language, no IDs, no provenance | no | no | 0 | yes, dedicated AGENTS.md | no fabrication rule only, evasion never raised | MIT |
| **humanizer-pro (ours)** | Skill + Node CLI, multi-host install docs | English plus Arabic فصحى, مصري, شامي (experimental) | 141 ID-tracked, provenance-mapped | yes, Node, both languages | yes, `validate.js` | 114 | yes | explicit refusal of detector evasion, explicit never-invent | MIT |

## 2. Where humanizer-pro leads

Each row names the repos that lack the capability, so the claim is checkable.

- **Only bilingual detector with dialect routing.** Nine of eleven ship no Arabic
  detection logic at all; the two Arabic detectors that exist are MSA-only
  (`MrBridgeHQ_human-writer-ar.md:20`, `hazemshan1-rgb_humanizer-ar.md:43-45`).
  finestructure covers 10 languages but Arabic dialects are named once and never
  built out (`finestructure-ai_humanizer-multilingual.md:89-100`).
- **SEO mode.** No competitor has one. Confirmed absent in all eleven reviews, most
  explicitly in `amanmaqsood_prose-humanizer.md:62` and
  `eddyplolz_humanizer-pro.md:169-174`.
- **Named voice profiles plus sample calibration.** eddyplolz has none
  (`:151-157`), finestructure none (`:210-215`), hazemshan1 none (`:155-160`),
  ziad none. amanmaqsood and yoloshii do sample calibration but ship no preset
  profiles (`amanmaqsood_prose-humanizer.md:116`, `yoloshii_humanizer-pro.md:161-164`).
- **Explicit refusal clause for detector evasion and academic-integrity misuse**
  (`skills/humanizer-pro/SKILL.md:48-50`). hazemshan1 has no refusal clause
  (`:218-220`), finestructure is silent rather than explicit (`:293-309`), yoloshii
  discourages without stating a policy (`:206-212`), MrBridgeHQ points the other way
  and names Copyleaks and GPTZero as targets (`:56`).
- **Provenance per pattern.** 141 IDs mapped to upstream file and line with pinned
  SHAs (`docs/REVIEW-HANDOFF.md:318-344`). finestructure has no IDs and no citations
  (`:143-149`); amanmaqsood has project-level acknowledgments only (`:32`);
  MrBridgeHQ has no IDs (`:27`).
- **Mode separation with a mandatory second pass and a single final rewrite.**
  Pythonation mandates showing both the draft and the final version to the user
  (`Pythonation_AI-Text-Humanizer-Protocol.md:60-62`), which our contract forbids
  (`SKILL.md:166-167`). hazemshan1 has no detect-only mode at all (`:301-303`).
- **Host portability with real scripts.** finestructure documents only the Claude
  Code plugin flow (`:476-479`); hazemshan1 depends on the Claude-Code-specific
  `AskUserQuestion` tool (`:36-39`).

## 3. Where a competitor leads or ties us

Ranked by importance. The section 12 row of every review says "they lead" by
construction (it is the borrow-from-them row) and is excluded from the count.
Across the twelve verdict tables there are **8 substantive "they lead" rows**, listed
first, then the split or tied rows.

### They lead (8 rows)

**A1. Measured false-positive rate on a real human corpus (eddyplolz, row 5).**
`eddyplolz_humanizer-pro.md:194-202`: `corpus/manifest.json` is a hash-only manifest
over about 1,900 pre-2022 human documents, `scripts/fp_measure.py:50` computes Wilson
95 percent intervals, and `corpus/RESULTS.md` reports per-register FPR (chat 0.0,
essay 0.0, news 0.0, wiki 1.5 percent). Why it matters: our Arabic thresholds were
tuned on 35 self-written fixtures and every human fixture scores exactly 0
(REVIEW-HANDOFF 3.1, 3.5, 3.6), so we cannot answer "how often does this flag real
Arabic writing". To match: a Node equivalent (`tools/fp-measure.js`), a hash-only
manifest, and a sourced Arabic human corpus. Size L. Licence: MIT, and the design is
reimplemented in Node rather than ported, since Python is out of scope here.

**A2. Real, non-synthetic false-positive anchor fixture (MrBridgeHQ, row 9).**
`MrBridgeHQ_human-writer-ar.md:48`: one Arabic Wikipedia excerpt (CC BY-SA 4.0) with
documented cleanup in `_provenance.md`, used as the primary FP anchor and scoring
23/100. Why it matters: it is the cheapest partial answer to REVIEW-HANDOFF 3.1.
To match: add sourced fixtures under `tests/fixtures/` with a provenance file. Size
S to M. Licence: MIT repo, but the fixture text itself is CC BY-SA from Wikipedia,
so we source our own excerpt and attribute it rather than copying theirs.

**A3. Test breadth and a real CI matrix (amanmaqsood row 9, eddyplolz row 9).**
`amanmaqsood_prose-humanizer.md:78`: CI runs Node 18, 20 and 22 on Ubuntu plus a
Windows installer smoke test. We claim `engines.node: ">=18"` and have never executed
Node 18 (REVIEW-HANDOFF 3.9). Our 114 tests exceed their 45 and eddyplolz's 46 in
count, so the gap is the execution matrix and the deterministic benchmark invariants
(`required`, `forbidden`, `protected`, `maxEditRatio`, `forbidUnexpectedNumbers`,
`forbidFirstPerson`, `amanmaqsood_prose-humanizer.md:66`), not raw test count.
Files: `.github/workflows/`, `evals/`, `tools/run-tests.js`. Size M. Licence MIT.

**A4. Packaged, multi-host distribution surface (amanmaqsood, row 2).**
`amanmaqsood_prose-humanizer.md:14-16`: an npm package with two `bin` entries plus
`.claude-plugin/`, `.codex-plugin/`, `agents/openai.yaml` and a Gemini CLI command
file. We ship install instructions but no manifests and no package. Why it matters:
installation friction is the main adoption barrier for a skill. Files:
`package.json`, new manifest files, `dist/`. Size M. Licence MIT.

**A5. Release maturity and versioning discipline (eddyplolz, row 1).**
`eddyplolz_humanizer-pro.md:354`: actively versioned to v4.12.0 with a CHANGELOG.
We are at `v0.1.0-build`, self-assessed, unreleased. This closes by cutting a
release, not by writing code. Size S.

**A6. Apparent native Arabic prose quality (ziadfaisalaljdy, row 10).**
`ziadfaisalaljdy-beep_arabic-humanizer.md:55`: the strongest "feels human" Arabic of
the set, though unevidenced. Ours is deeper but unreviewed by any native speaker,
and Levantine is entirely unreviewed (REVIEW-HANDOFF 3.2). This closes by running
the native review, not by shipping code. Size M, and it is gated on finding a
reviewer.

**A7. Blinded human-evaluation mechanism (amanmaqsood, part of row 9).**
`amanmaqsood_prose-humanizer.md:101`: `scripts/prepare_pairwise.js` emits a
`ballot.json` with candidate identity hidden and left/right randomized from a seeded
PRNG, plus a separate `key.json` withheld from raters (verified at
`_sources/competitors/amanmaqsood_prose-humanizer/scripts/prepare_pairwise.js:35-67`).
They have never run it. We have the same weak spot (REVIEW-HANDOFF 3.11, evals
graded by the builder's own agents) and no mechanism at all. Size M. Licence MIT.

**A8. Language breadth at scale, with a clean shared-core/thin-adapter architecture
(sawradip/rehumanize, row 1).** `docs/competitors/sawradip_rehumanize.md` section 3:
100 languages named by BCP 47, each a single-register skill file, against our 2
(English, Arabic). This supersedes B7 (finestructure's 10 languages) as the real
scale comparison. Why it matters: language breadth is a visible, easy-to-market
capability gap, and their `shared/core-patterns.md` plus thin per-language
`SKILL.md` adapter split (`sawradip_rehumanize.md` section 12) is a cleaner
worked example of the separation our own `references/` loading table already
approximates. What they do not have closes the gap in our favour elsewhere: no
IDs, no provenance, no detector, no tests, no dialect support even for Arabic
(`sawradip_rehumanize.md` section 13), so this is breadth only, not depth. To
match at depth-preserving quality: do not copy their un-cited, ungrounded
per-language tells; if language breadth is pursued, require the same
IDs/provenance/testing bar already held for English and Arabic. Size XL if
pursued seriously (grounded content per language is the actual cost, not the
file scaffolding). Licence MIT, ideas only, no text reused (verified no shared
wording against `_sources/blader` or `_sources/competitors/sawradip_rehumanize`
content).

### Split rows and ties worth closing

**B1. Generalized fidelity checking outside SEO mode (eddyplolz, row 8, split).**
Their `--compare` extracts numbers, dates, names, URLs, citation markers, quotes and
fenced code and does sentence-level evidence-marker matching
(`eddyplolz_humanizer-pro.md:119-122`). **The review's framing is wrong on our side**:
it claims our protected-span logic is "SEO-mode-gated". Verified false. `validate.js`
calls `checkExtra(before, after, { seoKeywords, ... })` at line 227 with
`seoKeywords` possibly null, and `lib/validate-extra.js` runs numbers, links and
anchors, headings, frontmatter meta, JSON-LD, shortcodes and image checks regardless;
`lib/en-validate.js` runs fenced code, blockquote, inline code and URL checks
regardless. Only the four `seo-*` checks are gated. The real gaps are narrower: we
have no name, date or citation-marker drift check, and `SKILL.md:187` requires the
validator only for `edit` and `seo` runs, never for `rewrite`.

**B2. Overlap grouping and affected-coverage percentage (amanmaqsood, row 5, split).**
`amanmaqsood_prose-humanizer.md:96`: overlapping findings merge into groups with a
max-weight rollup and the report carries `affectedCoveragePercent`. We report counts
and a score with no "how much of the prose is actually flagged" number. Size M.

**B3. Catalog-to-documentation parity enforced in CI (amanmaqsood row 4, eddyplolz
item 3).** `scripts/validate_skill.py:92-107` fails the build when a rule ID is
undocumented or a regex does not compile; eddyplolz's `coverage-map.md` plus
`test_every_cli_rule_id_is_in_the_coverage_map` does the same across prose and code
(`eddyplolz_humanizer-pro.md:78-82`). Our `tools/check-skill.js` checks frontmatter
and cross-links only. Size S. Licence MIT both.

**B4. Classical Arabic rhetoric as a diagnostic layer (hazemshan1, row 4, tie).**
`hazemshan1-rgb_humanizer-ar.md:239-248`, patterns 21 to 27, grounded in al-Jurjani's
نظرية النظم (verified at `_sources/.../references/patterns.md:233`), covering
خبر/إنشاء variety, التفات (`patterns.md:261-265`), إيجاز against إطناب, عيوب الفصاحة
as a negative category, and light-verb calques (`patterns.md:283`). We have no
equivalent structural layer in `ar-msa.md`. Size M. Licence MIT.

**B5. Register-strictness matrix and register-conditional thresholds (eddyplolz item
5, hazemshan1 item 4).** eddyplolz crosses 6 registers against 15 rule areas
(`eddyplolz_humanizer-pro.md:281-285`); hazemshan1 ships a `--formal` mode discovered
by measuring a 35-word median sentence in a real formal Arabic sample
(`hazemshan1-rgb_humanizer-ar.md:265-272`). This is the same class as our weak spot
3.4 (leakage-gate threshold instability). Size M.

**B6. Voice-profile privacy and provenance weighting (amanmaqsood, row 7, split).**
`amanmaqsood_prose-humanizer.md:103`: hash-only profiles, `rawProseStored: const false`
in the schema, and a per-source-type evidence-weight table. Our voice matching has no
storage or provenance model. Size M.

**B7. Breadth of languages (finestructure, row 3, split; superseded at scale by
sawradip/rehumanize, see A8).** Ten languages against our two from finestructure;
100 against our two from sawradip/rehumanize. finestructure's Family 1b insight
(stock marketing phrases trace to one English inventory, so one table serves
every language, `finestructure-ai_humanizer-multilingual.md:324-333`) and
sawradip's BCP 47 naming standard plus shared-core/thin-adapter split
(`docs/LANGUAGE-CODES.md`, `sawradip_rehumanize.md` section 12) both make future
expansion cheap to scaffold. Not a gap to close now, since sawradip's breadth is
unverified and ungrounded (`sawradip_rehumanize.md` sections 4, 13), but between
the two it sets both the naming convention and the architecture cost of any
future language.

### Verified as not a gap

- **Latin punctuation inside Arabic.** The MrBridgeHQ review flags this as a borrow
  (`:61`). We already ship it: `AR-SH-TYPO punctuation-mixing` and `digit-mixing`,
  `skills/humanizer-pro/scripts/lib/ar-detector/index.js:439-440`. Tie.
- **Gulf and Maghrebi varieties.** Nobody ships any. finestructure names them once
  (`arabic.md:4`), almuthanawork claims register coverage in `README.md:15` with no
  dialect tables anywhere, ziad lists Gulf under a v1.1 roadmap. No competitor leads
  here; it is an open frontier (see section 6, IMP-19).
- **Clitic-aware Arabic vocabulary matching.** Partially a gap, see IMP-13.

## 4. Ideas worth borrowing

Consolidated from every review's section 12, deduplicated, each verified in the
source and mapped to a concrete change here. Licence note: MIT repos may lend
structure as well as ideas; repos with no licence lend ideas only, never text.

| # | Idea and source | Change here | Weak spot closed |
|---|---|---|---|
| 1 | Hash-only human control corpus with Wilson-CI FP measurement (eddyplolz, `fp_measure.py:50`, `corpus/manifest.json`) | New `tools/fp-measure.js` plus `corpus/manifest.json` and `corpus/RESULTS.md`, Node only | 3.1, 3.5, 3.6 |
| 2 | Real sourced FP anchor fixture with documented cleanup (MrBridgeHQ, `_provenance.md:9-28`) | New `tests/fixtures/human-sourced/` plus a provenance file, our own CC BY-SA excerpt | 3.1 |
| 3 | Blinded seeded pairwise ballot with a withheld key (amanmaqsood, `scripts/prepare_pairwise.js:35-67`) | New `tools/prepare-pairwise.js`, ballot and key under `evals/human/` | 3.11, 3.2 |
| 4 | Generalized fidelity compare: names, dates, citation markers (eddyplolz, `humanizer_audit.py:833-953`, `:1196-1254`) | Extend `lib/validate-extra.js`; require the validator in `rewrite` too (`SKILL.md:187`) | none directly, hardens never-invent |
| 5 | Uncalibrated-signal labelling and `authorshipClaim: false` in JSON (amanmaqsood, `lib/prose-core.js:421,423`) | Add both fields to `detect.js --json` output and document in `scripts/README.md` | 3.5 |
| 6 | Five-family universal taxonomy with a "no verdict on P2-only" stop rule (finestructure, `references/method.md:236-248`) | Cross-index `ar-*.md` under the five families; add the stop rule to the `detect` contract in `modes.md:17-44` | 3.6, 3.7 |
| 7 | Classical rhetoric layer: نظرية النظم, التفات, light-verb calques قام بإجراء (hazemshan1, `patterns.md:233,261-265,283`) | New section in `ar-msa.md` with new AR-MSA pattern IDs and provenance rows | none directly, deepens Arabic |
| 8 | Clitic-aware vocabulary regex including the definite article (MrBridgeHQ, `analyze.py:452`) | `lib/ar-detector/lexicons.js:76` already allows the proclitic `[وفبلك]?`; add the optional `(?:ال)?` | 3.6 |
| 9 | Paragraph-level co-occurrence escalation (Pythonation, `README.md:121`) | Density-triggered paragraph-level escalation in the Arabic engine and in `en-vocabulary.md` tier prose | 3.6 |
| 10 | Substitutability test as a content gate (MrBridgeHQ, `content-distinctiveness.md:24-28`) | New "is this piece substitutable" gate in `core-principles.md`, paired with the existing thin-draft rule | none, new axis |
| 11 | Substance spot-check: deletion and inversion micro-tests (yoloshii, `SKILL.md:789-794`) | Add to the mandatory second pass in `modes.md` | none, new axis |
| 12 | "Claims added: 0" audit line (yoloshii `SKILL.md:575`, which credits AgriciDaniel/anti-slop at `SKILL.md:914`) | Required closing line in the `edit` and `rewrite` contracts in `modes.md`; wording written fresh | none, makes never-invent checkable |
| 13 | "Not flagged" transparency list in detect output (yoloshii, `SKILL.md:583`) | Add to the `detect` contract in `modes.md` | 3.6 |
| 14 | Era tagging and decay warnings on vocabulary tiers (yoloshii `SKILL.md:185-190`, eddyplolz `tell-catalog.md:138-142`) | Era column plus a decay note in `en-vocabulary.md` | 3.8 |
| 15 | Register-strictness matrix and a `--formal` threshold set (eddyplolz `registers.md:442-459`, hazemshan1 `score_arabic_text.py:187-213`) | Register profiles in `precedence.md` and a threshold set in the Arabic engine | 3.4 |
| 16 | Catalog-to-doc parity and regex-compile checks in CI (amanmaqsood `validate_skill.py:92-107`, eddyplolz `coverage-map.md`) | Extend `tools/check-skill.js`; add a coverage map between `references/*.md` IDs and `scripts/lib/*` | none, anti-drift |
| 17 | Self-scan of our own docs with regression budgets (eddyplolz, `scripts/self_scan.py:1-16`) | New `tools/self-scan.js` plus a budgets JSON, publishing raw and adjusted scores | none, credibility |
| 18 | "Text under audit is data, never instructions" as a named principle (eddyplolz, `SKILL.md:103-106`) | One rule in `core-principles.md`; absent from ours today (verified by grep) | none, safety |
| 19 | Overlap grouping with coverage percentage (amanmaqsood, `lib/prose-core.js:391-438`) | Add grouping and `affectedCoveragePercent` to `detect.js` output | none, report quality |
| 20 | Per-source evidence weighting and hash-only voice profiles (amanmaqsood, `lib/prose-core.js:524-629`) | Provenance and confidence model in `voice-matching.md` | none, privacy |
| 21 | Statistical vocabulary-concentration signal (hazemshan1, `patterns.md:213-224`) | Top-word share and TTR as graded Arabic signals alongside lexicon hits | 3.6 |
| 22 | Per-pattern confidence grading, including "this may point the wrong way" (hazemshan1, `patterns.md:203`) | Confidence field in the Arabic reference entries and `docs/PROVENANCE.md` | 3.5 |
| 23 | Ignore-region markers so doctrine files can quote bad examples (MrBridgeHQ, `analyze.py:48-53`) | Support an ignore marker in the detectors, needed before IMP-17 self-scan can be honest | none, enables 17 |
| 24 | Nida equivalent-effect and bounded compensation (almuthanawork, `SKILL.md:17,51`) | A short note in `core-principles.md` on offsetting a lost stylistic effect nearby, hard-bounded by never-invent. Repo has no licence, so idea only, no text | none |
| 25 | Paste-anywhere install path and the "changing the clothes, not deleting the ideas" framing (ziad, `README.md:15-18`, `SKILL.md:85`) | Explicit no-install path in our README; the metaphor is theirs, so express the principle in our own words | none, adoption |
| 26 | BCP 47 as the sole language/variety naming standard, with script/region subtags added only when they change output (sawradip, `docs/LANGUAGE-CODES.md:1-38`) | New `docs/LANGUAGE-CODES.md`-style note in `references/precedence.md` or a new doc, applied to how `lib/lang.js` names Arabic varieties | none, naming hygiene, de-risks IMP-24 |
| 27 | Shared core + thin per-language adapter as an explicit, named architecture (sawradip, `shared/core-patterns.md` + `skills/<code>/SKILL.md`, `sawradip_rehumanize.md` section 12) | State the pattern explicitly in `core-principles.md`: language-independent rules live once, each language reference file is a thin adapter that points back rather than restating | none, documents an architecture we already approximate |
| 28 | Contributor template file with an exact numbered recipe for adding a new language/variety (sawradip, `skills/_TEMPLATE.md:1-30`) | New `references/_TEMPLATE.md` (or `docs/ADD-A-VARIETY.md`) for adding an Arabic variety, referencing BCP 47-style naming from idea 26 | none, lowers the bar for IMP-24 |

Dropped after verification: Latin-punctuation-in-Arabic (already shipped, section 3),
Gulf and Maghrebi coverage (no competitor holds it, so nothing to borrow).

## 5. Do not copy

| Repo and evidence | What to refuse | Why |
|---|---|---|
| POlLLOGAMER `README.md:2,5` | Detector-evasion framing as the value proposition | Directly contradicts `SKILL.md:48-50` |
| POlLLOGAMER `README.md:8` | "Tell personal experiences even if you don't have them" | Fabrication instruction, contradicts never-invent |
| POlLLOGAMER `README.md:8` | Round-trip translation as a stylistic scrambler | Regenerates meaning, cannot be reconciled with preservation |
| POlLLOGAMER `README.md:8,11` | Deliberate typos, dropped capitals, incoherence | Damages the text to fool a classifier |
| amirsaadzayed `main.py:20-27` | Hash-derived "AI vs Human" score | Fabricated measurement sold as real; the worst finding in the set |
| Pythonation `README.md:80-85` | Soul injection: invented first-person reactions and sensory detail | Fabrication presented as voice |
| Pythonation `README.md:172-173` | D.2, deleting honest hedges about incomplete information | Converts genuine uncertainty into false confidence |
| Pythonation `README.md:149-161` | Blanket stripping of bold, lists, title case, emoji with no carve-outs | Destroys structure our SEO mode exists to protect |
| MrBridgeHQ `README.md:3,17` | Score-gated rewrite loops aimed at a named commercial detector | Optimizing against a detector, not for the reader |
| MrBridgeHQ `analyze.py:507-670` | `--external` live calls to Copyleaks, GPTZero, Originality.ai | Makes the tool a detector-evasion instrument and breaks offline determinism |
| hazemshan1 `SKILL.md:118-134` | The worked example that adds invented numbers as a rewrite technique | Demonstrates fabrication without flagging the boundary |
| almuthanawork `SKILL.md:51,161` | Unbounded "compensation is mandatory" | Legitimate in translation, an invitation to add content in a rewrite |
| eddyplolz, general | Unicode homoglyph and zero-width handling framed as bypass tooling | Borrow the preserve-list test design only, never the bypass framing |

## 6. Improvement plan

Principles held throughout: zero runtime dependencies, no new npm packages,
agent-agnostic, source-grounded, Node only (no Python anywhere in this plan).

Tier A closes a "they lead" row. Tier B closes a tie or split row. Tier C is
valuable but optional.

### Tier A

| ID | Title | Files | Size | Closes | Acceptance criterion | Risk |
|---|---|---|---|---|---|---|
| IMP-01 | Arabic human control corpus with Wilson-CI false-positive measurement | `tools/fp-measure.js`, `corpus/manifest.json`, `corpus/RESULTS.md`, `docs/evidence/` | L | A1 (eddyplolz row 5) | `node tools/fp-measure.js` prints per-register flagged counts, n, and Wilson 95 percent bounds over at least 200 pre-cutoff Arabic documents; `RESULTS.md` records them with the cutoff date | Acquiring real Arabic human text we may cache is the blocker, not the maths. Start with Arabic Wikipedia CC BY-SA with documented cleanup. A small or skewed corpus gives a confident-looking but meaningless interval |
| IMP-02 | Sourced, non-synthetic Arabic FP anchor fixtures | `tests/fixtures/human-sourced/*.md`, `_provenance.md`, `tests/ar-detector.test.js` | M | A2 (MrBridgeHQ row 9) | At least 3 sourced fixtures (one per variety where available) score below 25, with licence and cleanup steps recorded per file | Licence hygiene: attribute CC BY-SA correctly. Dialect sources are harder to find than MSA |
| IMP-03 | CI matrix on Node 18, 20, 22 plus a Windows smoke run | `.github/workflows/ci.yml`, `tools/run-tests.js` | M | A3 (amanmaqsood row 9, eddyplolz row 9) | CI is green on all three Node versions; the Node 18 run is linked from `REVIEW-HANDOFF` 3.9 and that weak spot is retired | Node 18 may surface real incompatibilities in `lib/`; budget fix time |
| IMP-04 | Deterministic eval invariants in the benchmark harness | `evals/benchmark.json`, `evals/run-benchmark.js` | M | A3 | Each case carries `required`, `forbidden`, `protected`, `maxEditRatio`, `forbidUnexpectedNumbers`; an injected invented number fails the suite | Their own weakness is reference outputs that echo the source and pass trivially. Assert a non-zero edit distance where an edit is expected |
| IMP-05 | Packaged distribution: npm bin plus host manifests | `package.json`, `.claude-plugin/plugin.json`, `.codex-plugin/plugin.json`, `agents/openai.yaml` | M | A4 (amanmaqsood row 2) | `npm pack` produces a tarball whose CLI runs `detect.js` and `validate.js`; each manifest loads in its host and the paths resolve | Manifest shapes are host-specific and drift; keep them minimal. Do not add dependencies |
| IMP-06 | Release discipline: version, CHANGELOG, tagged release | `CHANGELOG.md`, `package.json`, `SKILL.md` metadata | S | A5 (eddyplolz row 1) | A tagged release exists whose version matches `SKILL.md` metadata and `package.json`, with a CHANGELOG entry citing the acceptance evidence | Releasing an unreviewed Arabic surface. Keep the experimental label on Levantine |
| IMP-07 | Blinded pairwise evaluation kit | `tools/prepare-pairwise.js`, `evals/human/ballot.json`, `evals/human/key.json`, `evals/README.md` | M | A7 (amanmaqsood row 9) | The tool emits a ballot with candidate identity hidden and sides randomized from a stated seed, plus a separate key; a dry run over 8 pairs reproduces from the seed | Building the kit and never running it is exactly their failure. Pair with IMP-08 |
| IMP-08 | Native-speaker review ballot for Egyptian and Levantine | `docs/NATIVE-REVIEW.md`, `evals/human/`, `references/ar-levantine.md` | M | A6 (ziad row 10), REVIEW-HANDOFF 3.2 | A named reviewer completes the 25 Levantine items; `ar-levantine.md` either drops `status: experimental` or records what stays unresolved | Gated on recruiting a reviewer. Schedule it, do not assume it |

### Tier B

| ID | Title | Files | Size | Closes | Acceptance criterion | Risk |
|---|---|---|---|---|---|---|
| IMP-09 | Fidelity validation on every rewrite, plus name, date and citation drift | `lib/validate-extra.js`, `scripts/validate.js`, `SKILL.md:187`, `references/modes.md` | M | B1 (eddyplolz row 8) | `validate.js` reports a `names-dates-citations` check that fails on a silently altered name or date; `rewrite` mode requires the validator when a shell exists | Name extraction without a morphological analyzer over-fires in Arabic. Ship it as a warning tier first |
| IMP-10 | Overlap grouping and affected-coverage percentage | `lib/ar-detector/index.js`, `lib/en-detector` wrapper, `scripts/detect.js` | M | B2 (amanmaqsood row 5) | `detect.js --json` emits grouped findings and `affectedCoveragePercent`; a doubled overlapping hit does not double the count | Changing the JSON shape breaks callers. Add fields, do not rename |
| IMP-11 | Coverage map plus catalog-to-code parity test | `docs/COVERAGE-MAP.md`, `tools/check-skill.js`, `tests/coverage-map.test.js` | S | B3 | A test fails when any engine pattern ID is missing from the map or from `references/`, and when any regex fails to compile | Keeping the map current is ongoing work; the test is what forces it |
| IMP-12 | Classical rhetoric layer for MSA | `references/ar-msa.md`, `docs/PROVENANCE.md`, `lib/ar-detector/lexicons.js` | M | B4 (hazemshan1 row 4) | New AR-MSA entries for خبر/إنشاء rigidity, missing التفات, and light-verb calques, each with a provenance row; the light-verb regex does not fire on قام بسرعة | Their own note: a naive قام + ب regex false-fires. Use a curated list and a regression test |
| IMP-13 | Register-conditional thresholds | `lib/ar-detector/index.js`, `references/precedence.md`, `scripts/README.md` | M | B5 | A formal-register profile suppresses the run-on and rhythm over-fire on a long-sentence formal fixture while the default profile still fires | Threshold sprawl. Cap it at two or three profiles and document each number |
| IMP-14 | Uncalibrated-signal labelling in the JSON contract | `scripts/detect.js`, `scripts/README.md`, `references/modes.md` | S | Borrow 5 | Every `--json` report carries `authorshipClaim: false` and a calibration label; `modes.md` requires the score to be reported as a review signal | None material |
| IMP-15 | Five-family cross-index and the P2-only stop rule | `references/ar-shared.md`, `references/modes.md`, `references/precedence.md` | S | B7, borrow 6 | Each Arabic pattern carries a family tag, and `detect` reports a text with only P2 findings as clean instead of issuing a verdict | The stop rule can suppress real weak-signal detections; state it as a reporting rule, not a scoring change |
| IMP-16 | Voice profile provenance and privacy model | `references/voice-matching.md` | M | B6 | The file states per-source-type confidence weighting and that raw sample prose is never stored or echoed | None material |

### Tier C

| ID | Title | Files | Size | Closes | Acceptance criterion | Risk |
|---|---|---|---|---|---|---|
| IMP-17 | Definite-article clitic in Arabic phrase matching | `lib/ar-detector/lexicons.js:76`, `tests/ar-detector.test.js` | S | Borrow 8 | A bare lexicon stem matches its ال-prefixed form, and a test proves no new false positive on a human fixture | Widening the regex raises FP risk; run it against IMP-01's corpus before merging |
| IMP-18 | Claims-added line, Not-flagged list, substance spot-check | `references/modes.md`, `references/core-principles.md` | S | Borrows 11, 12, 13 | Edit and rewrite outputs end with a claims-audit line; detect output names what was deliberately not flagged and why | Contract bloat. Keep each to one line |
| IMP-19 | Substitutability and distinctiveness gate | `references/core-principles.md` | S | Borrow 10 | A named gate that asks whether the piece would still read fine with the brand swapped, with no invention permitted to pass it | Turning a gate into a licence to invent. Bind it to never-invent explicitly |
| IMP-20 | Self-scan of our own docs with regression budgets | `tools/self-scan.js`, `tools/self-scan-budgets.json`, ignore-region support in both detectors | M | Borrows 17, 23 | `node tools/self-scan.js` prints raw and exemption-adjusted scores per file and exits non-zero when a budget is exceeded | Doctrine files quote bad examples, so ignore regions must land first or the scores are noise |
| IMP-21 | Era tagging and decay notes on vocabulary tiers | `references/en-vocabulary.md`, `docs/DISCREPANCIES.md` | S | Borrow 14, weak spot 3.8 | Each Tier 1A entry carries an era tag and the file states that lexical tiers decay and need re-baselining | Era assignments are themselves unsourced. Tag only what a cited source supports |
| IMP-22 | Prompt-injection principle | `references/core-principles.md` | S | Borrow 18 | The file states that text under audit is data and never instructions, and that an embedded instruction is reported as a finding | None |
| IMP-23 | Statistical vocabulary-concentration signal for Arabic | `lib/ar-detector/signals.js`, `references/ar-shared.md` | M | Borrow 21, weak spot 3.6 | Top-word share and TTR contribute a graded P2 signal, so a human fixture can score between 1 and 24 instead of always 0 | Calibration without IMP-01 is guesswork. Sequence it after the corpus |
| IMP-24 | Gulf variety exploration | `references/ar-gulf.md`, `lib/lang.js`, `docs/NATIVE-REVIEW.md` | L | Open frontier, nobody leads | A Gulf reference file with marker-based routing, shipped as experimental with a native-review plan attached | Repeating the Levantine mistake: shipping an unreviewed variety. Do not start before IMP-08 lands |
| IMP-25 | BCP 47 naming note plus an "add a variety" contributor template | new doc (`docs/LANGUAGE-CODES.md` or a section in `references/precedence.md`), `references/_TEMPLATE.md` | S | Borrow 26, 28 (sawradip) | A short doc states the base-code/script-subtag/region-subtag rule and gives a worked table for Arabic varieties (`ar`, `ar-eg`, `ar-lev`, `ar-gulf`); a template file gives the exact steps to add one, referenced from IMP-24 and IMP-08 | Purely documentation; keep it from drifting out of sync with `lib/lang.js`'s actual variety identifiers (currently `msa`/`egt`/`shami`, not BCP 47-shaped) |
| IMP-26 | Name the shared-core/thin-adapter architecture explicitly | `references/core-principles.md` | S | Borrow 27 (sawradip) | `core-principles.md` states in one paragraph that language-independent rules live once and each language/variety reference file is a thin adapter that points back to it rather than restating it, matching what the `references/` loading table in `SKILL.md:111-128` already does in practice | None material; documentation only |

Sequencing: IMP-01 gates IMP-23 and de-risks IMP-17. IMP-20 needs ignore regions.
IMP-08 gates IMP-24. IMP-25 should land before or alongside IMP-24, since it sets
the naming convention IMP-24 would otherwise invent ad hoc. IMP-03 and IMP-06 are
independent and can land first.

## 7. Honest verdict

The third column was written before round 1 as a prediction. It has been
replaced with what round 1 actually produced, at `9de5d8f` on branch
`improve/round-1`. Where the prediction did not come true, the cell says so.

| Dimension | Best today | After round 1 (actual) |
|---|---|---|
| Arabic depth (varieties, dialect routing) | us | us. IMP-12 landed (`AR-MSA-029` to `AR-MSA-033`); IMP-24 (Gulf) is deferred behind IMP-08. Dialect routing is narrower than before, not wider: IMP-27 demoted nine markers to ambiguous |
| Language breadth | sawradip/rehumanize (100 languages, BCP 47, unverified, un-cited) | still sawradip/rehumanize. We did not take the Family-1b shortcut and added no language. IMP-25 wrote the BCP 47 note and the contributor template, which is a naming convention, not breadth. Depth (IDs, provenance, testing) is still ours |
| Pattern catalog rigour and provenance | us (141 IDs, pinned SHAs) | us, hardened as predicted. IMP-11 added `docs/COVERAGE-MAP.md`, `check-skill.js --refs` and a parity test; the `EN-*` half of the map is a correlation against detector category names, not an ID lookup, and the map says so |
| Deterministic detection | tie: us, eddyplolz, amanmaqsood | us. IMP-10 groups overlapping findings and reports `affectedCoveragePercent`; IMP-14 puts `authorshipClaim: false` and a calibration label on every `--json` report |
| Detector calibration evidence | eddyplolz (measured FPR with Wilson CIs) | us, with the caveats attached. 0 of 300 pre-2022-11-30 documents flagged, Wilson 95% upper bound 1.26%, down from 5 of 300. Two registers, Wikimedia text only, no dialect corpus, no true-positive corpus, and the weights and thresholds themselves are still reasoned rather than fitted (`stats.calibration` reports `uncalibrated-review-signal`) |
| Preservation validation | tie: us on SEO, eddyplolz on general fidelity | us. IMP-09 added a names/dates/citations check on every validator run, WARN by default and FAIL under `--strict-fidelity` |
| SEO safety | us (nobody else has it) | us. Unchanged in round 1 |
| Voice matching | us on presets, amanmaqsood on rigour | us on documented policy. IMP-16 states per-source-type confidence weighting and that raw sample prose is never stored or echoed. No voice-matching code changed, so "rigour" here means a written model, not a measured one |
| Modes and output contract | tie: us, eddyplolz, yoloshii | us. IMP-15 (family tags, P2-only stop rule) and IMP-18 (claims-added line, not-flagged list) both landed, plus `--mode` and `--strict-fidelity` on the validator |
| Tests and CI | amanmaqsood (Node 18/20/22 matrix) | still amanmaqsood. Tests went 114 to 226 and IMP-04's benchmark passes 16/16, and **our CI has never run**: `.github/workflows/ci.yml` exists and nothing has been pushed to a remote. A static Node 18 API grep is not a Node 18 run |
| Independent evaluation | nobody (all self-graded or model-graded) | still nobody. IMP-07's blinded kit reproduces from seed 42 over 12 pairs and no ballot has been filled in. This is the exact failure IMP-07's risk column named |
| Native Arabic verification | nobody verified; ziad reads best | still nobody. Two ballots exist, 18 Egyptian items and 35 Levantine items, and no reviewer has run either. `docs/REVIEW-HANDOFF.md` 3.2 stands unchanged |
| Distribution and packaging | amanmaqsood (npm plus 4 manifests) | still amanmaqsood. We have three manifests and npm `bin` entries, `npm pack --dry-run` passes and the tarball CLIs run, and nothing is published and no manifest has been loaded by a host |
| Release maturity | eddyplolz (v4.12.0) | still eddyplolz. Version 0.2.0 across four files, a `[0.2.0-build]` CHANGELOG section and a passing `check-version.js`, and the tag is prepared, not created. An untagged build is not a release |
| Ethics and refusal policy | us | us. IMP-19 added the substitutability gate bound to never-invent, IMP-22 the prompt-injection principle |

The two rows called out as uncloseable by code are still open, and two more
joined them. Release maturity needs a tag and a publish. Native Arabic
verification needs a native speaker. Independent evaluation needs a person to
fill in a ballot. Tests and CI needs a push to a remote. All four are waiting on
an action rather than on work, which makes them easy to describe and easy to
leave undone. Until IMP-08 completes, any claim about our Arabic output quality
stays exactly as honest as `docs/REVIEW-HANDOFF.md` section 3.2 already states
it. The one row that genuinely moved on measured evidence is detector
calibration, and the number to quote there is the 1.26% upper bound, not the
zero.
