# Competitive review: sawradip/rehumanize

Source: `_sources/competitors/sawradip_rehumanize/`, pinned at HEAD SHA
`35a7ae9e54ec384c475c7b151fe6974b2486f654` (single commit, dated 2026-08-14
11:26:41 +0600, `.git/logs/HEAD`). 109 tracked files (`find . -type f | grep -v
.git | wc -l`, verified). Every citation below is `file:line` against that
clone.

## 1. Identity

- URL: `https://github.com/sawradip/rehumanize` (`.git/config:url`, verified
  by `git remote -v`). Note the naming mismatch: the git remote is
  `sawradip/rehumanize`, but every authored artifact (`LICENSE:3`, `git log -1
  --format=%an`, `README.md:308`) names the author "Rifat Jahan Azad", and the
  commit is co-authored by "Claude Opus 4.8" (`git log -1`, full message).
  This reads as a fork or re-host under the `sawradip` account rather than
  Rifat Jahan Azad's origin; the review treats the content as authored by
  Rifat Jahan Azad per the repo's own files.
- HEAD SHA: `35a7ae9e54ec384c475c7b151fe6974b2486f654`, one commit only
  (`.git/logs/HEAD`), so "last commit date" and "creation date" are the same:
  2026-08-14.
- License: MIT (`LICENSE:1,3`: "MIT License", "Copyright (c) 2026 Rifat Jahan
  Azad").
- File count: 109 tracked files outside `.git/` (101 `SKILL.md` files under
  `skills/` including `_TEMPLATE.md`, plus `README.md`, `AGENTS.md`,
  `LICENSE`, `.gitignore`, `.claude-plugin/plugin.json`,
  `.claude-plugin/marketplace.json`, `docs/LANGUAGE-CODES.md`,
  `shared/core-patterns.md`).
- What it claims to be: "**Remove the machine from the writing.** A
  collection of 100 per-language AI-skill files that rewrite
  machine-translated or AI-generated text so it reads as naturally written by
  an educated native speaker — in clean, standard register prose."
  (`README.md:3`).
- Derivative of what: explicitly and only conceptually derivative of
  blader/humanizer, credited in the Acknowledgements section: "Inspired by
  [blader/humanizer](https://github.com/blader/humanizer), which introduced
  the skill-file pattern for English de-AI-ification. This project
  generalizes that pattern to 100 languages, with a shared core and
  language-specific adapters." (`README.md:297-299`). Verified against
  `_sources/blader/SKILL.md` and `_sources/blader/AGENTS.md`: no shared
  prose, no copied pattern text, no copied section numbering. blader is one
  283-line English-only `SKILL.md` built around 5 lettered sections (§A-§E)
  of numbered "AI writing" patterns with before/after examples
  (`_sources/blader/SKILL.md:1-100`); rehumanize is 100 thin per-language
  files with a shared 5-step process in `shared/core-patterns.md`. Same
  lineage, no copied wording, different architecture.

## 2. Form factor; hosts targeted; agent-agnostic?

Form factor: a Claude Code plugin/marketplace (`.claude-plugin/plugin.json`,
`.claude-plugin/marketplace.json`) wrapping 100 independent Markdown skill
files, one per BCP 47 language code, each invoked as `/rehumanize:<code>`
(`.claude-plugin/plugin.json:4`, `README.md:143-165`). No code, no scripts, no
CLI anywhere in the repo (`find . -name "*.py" -o -name "*.js" -o -name
"*.sh"` returns nothing outside `.git/`).

Hosts targeted: Claude Code natively via the plugin manifest; any other agent
that reads `AGENTS.md` (Codex, Cursor, Copilot, Aider, etc.) via a documented
"point the agent at `skills/<code>/SKILL.md`" flow (`README.md:167-175`,
`AGENTS.md:1-27`); and a documented "manual / any harness" path that says to
copy the folder and keep the relative `../../shared/core-patterns.md`
reference intact (`README.md:177-181`).

Agent-agnostic: yes, explicitly and by design. `AGENTS.md` is a dedicated
cross-agent entry point separate from the Claude-specific plugin manifest
(`AGENTS.md:1-4,25-27`), and the design notes state "Harness adapters
(`AGENTS.md`, `.claude-plugin/`) are wrappers — swappable without touching the
content." (`README.md:293-294`).

## 3. Languages & varieties

100 languages (`README.md:5`, `skills/` directory has 100 language folders
plus `_TEMPLATE.md`, verified by `ls skills | wc -l` = 101 minus the
template). Named by BCP 47 tag per `docs/LANGUAGE-CODES.md:1-9`, with script
subtags only where a language uses more than one script (`zh-Hans`/`zh-Hant`,
`sr-Cyrl`, `pa-Guru`, `az-Latn`) and no region subtags shipped at all despite
the design notes describing `pt-BR`/`pt-PT` as the intended pattern
(`docs/LANGUAGE-CODES.md:31-38`, `README.md:280-282`) — that is aspirational
documentation, not a shipped capability; only one Portuguese file exists
(`skills/pt/SKILL.md`), one Spanish, one Arabic.

Arabic varieties: **one file, MSA only.** `skills/ar/SKILL.md:19` states the
target register is "Modern Standard Arabic (الفصحى المعاصرة / العربية
الفصحى) ... Not a specific dialect; regional dialect forms must be removed
from formal text." Dialect forms (Egyptian عايز, Levantine شو, Gulf زين)
appear only as named tells to *remove* from output (`skills/ar/SKILL.md:29`),
never as a target register of their own. There is no `skills/ar-eg/`,
`ar-levant/`, or `ar-gulf/` folder, and no roadmap note proposing one. Persian
(`fa`), Urdu (`ur`), Pashto (`ps`), Sindhi (`sd`), and Uyghur (`ug`) are
separate single-file, single-register languages in the same Arabic-script
family, each MSA/standard-register only with no dialect variants.

## 4. Pattern catalog

`shared/core-patterns.md` holds no numbered pattern catalog; it is prose
principles only — two modes, five hard rules, a five-step process
(`shared/core-patterns.md:1-51`). There is no shared cross-language tell
catalog with IDs, unlike humanizer-pro's 141 ID-tracked patterns.

Per-language: **exactly 10 numbered tells** in 97 of 100 files, each following
an identical template (frontmatter → "Target register" → "N AI / translation
tells to remove" → "Process" → closing line), confirmed by
`grep -c '^[0-9]\+\.' skills/ar/SKILL.md` = 10 and spot-checked on
`skills/fa/SKILL.md`, `skills/he/SKILL.md`, `skills/ur/SKILL.md`,
`skills/de/SKILL.md`, `skills/es/SKILL.md`, `skills/eu/SKILL.md`,
`skills/my/SKILL.md`, `skills/su/SKILL.md`, `skills/id/SKILL.md`,
`skills/cy/SKILL.md`, `skills/yo/SKILL.md`, `skills/zu/SKILL.md` — all 10.
Three exceptions: `skills/en/SKILL.md` (28 lines, no tells list at all; it
instead points to "the 33 patterns from Wikipedia's 'Signs of AI writing'"
without reproducing them, `skills/en/SKILL.md:14-20`); `skills/bn/SKILL.md`
(81 lines, 11 tells, marked in `README.md:238` as the "original reference"
written before the other 99 were generated, with different prose formatting —
indented continuation lines that no other file uses); and the six
Romance/Iberian outliers `es` (95 lines), `pt` (99), `fr` (102), `ca` (104),
`it` (104), `gl` (105), which keep the same 10-tell, 4-section structure but
write substantially longer prose per tell (`skills/es/SKILL.md` averages
~5-6 lines per tell against ~2-3 for `ar`/`de`/`he`).

`ar/SKILL.md` pattern count: 10 tells (`skills/ar/SKILL.md:19-39`), each
100% Arabic-specific (word order/VSO, إعراب case vowels, جمع التكسير broken
plurals, gender agreement, dialect intrusion, hamza orthography, dual/plural
agreement, idiom calque, verb conjugation, English loanwords). None of the 10
is a translated copy of the shared core file; the core file supplies only
process framing ("Follow the shared 5-step process") that `ar/SKILL.md:47-51`
references but does not restate. So the file is effectively 100% Arabic
knowledge content plus a two-sentence pointer to the shared process — there is
no boilerplate padding of generic advice inside the Arabic tells themselves.

Before/after examples: yes, inline within several tells (e.g.
`skills/ar/SKILL.md:23`: "كُتُب not كتابون, أقلام not قلَمات";
`skills/ar/SKILL.md:31`: "مسؤلية instead of مسؤولية"), but not as a separate
worked full-paragraph example anywhere in the Arabic file or the template.

IDs/provenance: **none.** No pattern IDs, no source citations, no line-number
or corpus grounding for any of the 1,000-ish tells across the 100 files (10
tells × ~100 files). Every tell is asserted prose with no evidence trail —
contrast humanizer-pro's 141 IDs pinned to upstream file/line
(`docs/REVIEW-HANDOFF.md:318-344` per COMPETITIVE-ANALYSIS.md).

Carve-outs: yes, the shared core states "Keep it de-regionalized toward the
standard written form unless the author clearly wants a regional variety...
handled by a region-specific skill... not by mixing" (`shared/core-patterns.md:34-36`),
which is a carve-out for future regional variants, unused for Arabic today.

## 5. Detection

None. No deterministic detector, no script, no scoring, no offsets anywhere
in the repository (`find . -name "*.py" -o -name "*.js" -o -name "*.sh"`
returns nothing; `grep -ril "score\|detector\|validator"` over the
non-`skills/` Markdown returns only `README.md`'s prose use of the word
"score" as a verb, not a feature). This is a pure rewrite-only tool: no audit
mode, no numeric score, no P0/P1/P2 severity tiers, no JSON output contract.

## 6. Modes & output contract

Two modes, auto-detected from the input rather than user-selected
(`shared/core-patterns.md:11-19`): "humanize in place" when the input is
already target-language text that reads unnaturally, or "translate then
humanize" when the input is in another language. There is no explicit
"detect/audit only" mode and no "edit a file in place" mode — the skill only
ever returns rewritten prose.

Second pass: yes, a single mandatory second look built into the shared
process step 4 — "Do a final read as if you were a native editor: does any
sentence still feel translated or generated? Rewrite those."
(`shared/core-patterns.md:47-49`) — plus, for English specifically, "Apply a
final 'obviously AI generated' audit pass and a second rewrite to catch
anything the first pass missed." (`skills/en/SKILL.md:22-24`). This is one
shared second-pass step, not a distinct mode.

Output contract: minimal and uniform — "Return only the rewritten text unless
the user asked for explanation" (`shared/core-patterns.md:51`, repeated
verbatim per-language, e.g. `skills/ar/SKILL.md:50`). No structured report,
no findings list, no protected-span accounting, no JSON option.

## 7. Voice matching / profiles

None. No mention of voice sample calibration, named voice profiles, or
sample-matching logic anywhere in `shared/core-patterns.md`, `AGENTS.md`, or
any `SKILL.md` reviewed. The only "register" concept is the single fixed
target register defined per language (news/official written standard); there
is no user-supplied-sample mode and no casual/professional/technical/warm
profile selection.

## 8. Preservation & SEO safety

Preservation: one hard rule, repeated in every file — "No fabrication. Do not
add facts, names, dates, numbers, or citations that are not in the source."
(`shared/core-patterns.md:22-24`, restated in `AGENTS.md:15-18` and echoed at
the end of every `SKILL.md`'s Process section, e.g.
`skills/ar/SKILL.md:47-51`). This is a stated rule with no enforcement
mechanism: no validator script, no diff check, no protected-span list, no
automated way to catch a violation.

SEO safety: not addressed at all. No SEO mode, no keyword-preservation
guidance, no markdown/frontmatter/JSON-LD protection of any kind.

Validator: none (confirmed under §5 — no code in the repo at all).

## 9. Tests/evals/evidence

None. Zero test files, zero eval harnesses, zero example corpora, zero
before/after benchmark fixtures. The README's own before/after examples
(`README.md:220-234`) are illustrative prose in the documentation, not
executable test cases. No CI configuration (`.github/` does not exist in the
tree).

## 10. Native-speaker quality signals for the Arabic file

Three verbatim Arabic examples from `skills/ar/SKILL.md`, quoted exactly as
they appear in the source, each under the 15-word copyright-quote limit:

1. `skills/ar/SKILL.md:21`: "المدير قرّر instead of قرّر المدير" — cited as
   the AI-calqued SVO order vs. the corrected VSO order.
2. `skills/ar/SKILL.md:23`: "كُتُب not كتابون, أقلام not قلَمات" — the
   broken-plural correction pair.
3. `skills/ar/SKILL.md:29`: "المدير قرّر" is not repeated here; instead using
   `skills/ar/SKILL.md:31`: "مسؤلية instead of مسؤولية, هيئه instead of
   هيئة" — the hamza-seat correction pair.

Non-native read (assessed as a non-native Arabic reader cross-checking
against reference grammar, not as a certified native-speaker review — flagged
as such per the task's honesty requirement): the linguistic content reads as
competent and specific rather than generic. It correctly names real,
well-known MSA machine-translation tells — VSO-vs-SVO calquing, broken plural
(جمع التكسير) vs. sound plural misuse, hamza-seat (إعراب) errors, dual-number
neglect, non-human plural taking feminine-singular agreement — all of which
are standard items in Arabic pedagogical and NLP-error literature, not
invented-sounding claims. The examples given (كُتُب/كتابون, مسؤلية/مسؤولية)
are correct as written. The file explicitly and correctly separates MSA from
dialect rather than blending them, which is linguistically sound practice.
Weaknesses visible even to a non-native reader: the file gives no worked
full-sentence before/after example (only word/phrase pairs), so a reader
cannot verify the claimed VSO correction produces natural prose at sentence
level; and, like every file in the set, none of the 10 tells carries a
citation to a grammar reference or a real corpus example, so correctness
rests entirely on the generating model's internalized Arabic knowledge with
no external verification trail — this is the same "no independent Arabic
review" gap flagged in `docs/REVIEW-HANDOFF.md:229-243` (section 3.2, 3.1) for
humanizer-pro's own Arabic surface.

## 11. Ethics

The only ethical commitment is the no-fabrication rule (§8, repeated in every
file). There is **no mention anywhere** of AI-detector evasion, academic
integrity, plagiarism, or a refusal policy — the words "detector," "evade,"
"plagiarism," and "academic" do not appear in `README.md`, `AGENTS.md`,
`shared/core-patterns.md`, or the seven `SKILL.md` files read in full
(verified by scanning each file's content above). The framing throughout is
purely "make translated/AI text read naturally," with no acknowledgment that
this capability could be used to defeat AI-detection tooling and no refusal
clause for that use case, unlike humanizer-pro's explicit stance
(`skills/humanizer-pro/SKILL.md:48-50` per COMPETITIVE-ANALYSIS.md) or
eddyplolz's anti-evasion posture.

## 12. Notable ideas worth borrowing

- **Shared core + thin per-language adapter, cleanly separated.**
  `shared/core-patterns.md` holds every language-independent rule (modes,
  hard rules, five-step process) and each `SKILL.md` is purely the
  language-specific tells plus a one-line pointer back to the core file
  (`skills/ar/SKILL.md:13-15`: "First read `../../shared/core-patterns.md`
  for the shared principles..."). This is a cleaner split than
  humanizer-pro's reference-file loading table (`SKILL.md:111-128`), which
  already does something similar but less explicitly documented as "thin
  adapter" architecture. Worth adopting as an explicit design principle
  statement in `core-principles.md`.
- **BCP 47 as the sole naming convention, documented as its own doc.**
  `docs/LANGUAGE-CODES.md` is a self-contained, reusable standard: base
  language (ISO 639-1, falling back to ISO 639-3), script subtag only when
  the language has more than one script in active use, region subtag only
  when it changes the actual output, with a worked table
  (`docs/LANGUAGE-CODES.md:31-38`). This is directly reusable if
  humanizer-pro ever adds a third language or an Arabic-adjacent language
  (Persian/Urdu use the same Arabic script family and could reuse this
  naming discipline for variety codes like `ar-eg`, `ar-lev` instead of the
  current ad hoc "egt"/"shami" identifiers in `lib/lang.js`).
- **Routing by BCP 47 slug as the plugin command surface**
  (`.claude-plugin/plugin.json:4`: `/rehumanize:<bcp47>`), and a
  `_TEMPLATE.md` contributor file (`skills/_TEMPLATE.md:1-30`) that gives an
  exact, numbered recipe for adding a new language skill including where the
  BCP 47 tag goes in frontmatter (`metadata.bcp47`, `metadata.script`). This
  is a reusable pattern for humanizer-pro's own IMP-24 (Gulf Arabic
  exploration) and any future language/variety addition: a contributor
  template file plus a documented code-selection standard lowers the bar for
  adding `ar-gulf` or `ar-maghrebi` correctly and consistently.
- **Marketplace manifest shape.** `.claude-plugin/marketplace.json` is a
  minimal, reusable shape: `name`, `owner.name`, and a `plugins` array with
  `name`, `source: "."`, `description`, `category`, `tags`
  (`.claude-plugin/marketplace.json:1-13`). Directly comparable to what
  IMP-05 in `COMPETITIVE-ANALYSIS.md` already proposes adding for
  humanizer-pro; this file is a clean, minimal worked example to copy the
  shape (not the content) from.
- **AGENTS.md as a dedicated, separate cross-agent entry point** distinct
  from the Claude-specific plugin manifest (`AGENTS.md:1-27`), explicitly
  stated as swappable wrapper documentation. humanizer-pro's README already
  documents multi-host install but does not have a dedicated `AGENTS.md`
  file at the repo root for non-Claude agents to discover automatically —
  worth considering as a lightweight addition alongside IMP-05.

## 13. Weaknesses

- No code at all: no detector, no validator, no CLI, no tests, no CI. Every
  claim in the repository is unverified prose with zero automated
  enforcement of its own no-fabrication rule.
- No pattern IDs or provenance anywhere; every one of the ~1,000 tells across
  100 files is an assertion with no citation to a grammar source, corpus, or
  prior work.
- Arabic (and every other language) is single-register only: no dialect
  support for Arabic despite Arabic being one of the most dialect-diverse
  languages in the set, and no regional-variant files despite
  `docs/LANGUAGE-CODES.md` documenting exactly how to add them (`pt-BR` vs
  `pt-PT` is described but never shipped).
- No detect/audit mode and no numeric or qualitative score — the tool cannot
  tell a user whether text needs humanizing, only rewrite it.
- No SEO mode, no protected-span mechanism, no structural preservation
  guarantee beyond the prose no-fabrication rule.
- No voice matching or sample calibration.
- Uneven per-language depth with no stated reason: the six Romance-language
  files (`es`, `pt`, `fr`, `ca`, `it`, `gl`) are roughly double the length of
  the 50-line template used everywhere else, while some real languages
  (Amharic, Yoruba, Hausa, Zulu, Swahili, and others, all at 46 lines) get
  visibly less elaborated treatment — the length variance tracks nothing
  documented (not corpus availability, not speaker population, not script
  complexity), suggesting inconsistent generation effort rather than a
  principled depth allocation.
- Single-commit repository with no version history, no issue-driven
  iteration evidence, and (per the AGENTS.md/README credit line) generated in
  a single build session with a co-authoring LLM, similar in kind to
  humanizer-pro's own "builder self-assessed only" status
  (`README.md:20-27` of humanizer-pro) — this is a shared weakness, not a
  competitor advantage.
- No ethics/refusal stance on detector evasion at all (see §11) — silence
  rather than either a strong stance for or against.

## 14. Verdict vs humanizer-pro

| # | Dimension | sawradip/rehumanize | humanizer-pro | Who leads |
|---|---|---|---|---|
| 1 | Language breadth | 100 languages, BCP 47 named, one register each | 2 languages (English, Arabic MSA/Egyptian/Levantine) | **They lead**, by a wide margin |
| 2 | Arabic dialect depth | MSA only, dialect forms named solely as tells to remove | MSA, Egyptian, Levantine (experimental), with a leakage detector between them | **We lead** |
| 3 | Pattern catalog rigour/provenance | ~10 tells per language, no IDs, no citations, no corpus grounding | 141 ID-tracked patterns, pinned to upstream file/line (`REVIEW-HANDOFF.md:318-344`) | **We lead** |
| 4 | Deterministic detection | none — no code in the repo at all | Node detector for both languages, scored, P0/P1/P2 severity | **We lead** |
| 5 | Modes & output contract | 2 auto-detected modes (humanize-in-place, translate-then-humanize), rewrite-only, no structured report | 3 modes (detect/rewrite/edit) plus an SEO modifier, structured output contract per mode | **We lead** |
| 6 | Voice matching | none | named voice profiles plus sample calibration | **We lead** |
| 7 | Preservation & SEO safety | one stated no-fabrication rule, no enforcement mechanism | dedicated SEO mode, protected spans, `validate.js` | **We lead** |
| 8 | Tests/evals/evidence | zero | 114 tests, evals, evidence docs (own weaknesses noted in `REVIEW-HANDOFF.md` §3) | **We lead** |
| 9 | Architecture: shared core + thin per-language adapter | clean, explicit, well-documented separation (`shared/core-patterns.md` + `skills/<code>/SKILL.md`) | reference-file loading table exists (`SKILL.md:111-128`) but less explicitly framed as a reusable adapter pattern | **They lead** (architecture clarity, not content) |
| 10 | Agent portability / host-agnosticism | `AGENTS.md` as a dedicated cross-agent entry point, plus Claude plugin manifest; no code to port | multi-host install docs in README, no dedicated `AGENTS.md`, Node CLI scripts that must run per host | **Tie**, different strengths: they are trivially portable because they ship no code; we have real functionality that needs a runtime |
| 11 | Naming/versioning discipline | single commit, no version field, no CHANGELOG | `v0.1.0-build`, explicitly self-assessed and unreleased (`README.md:20-27`) | **Tie**, both pre-release with no independent review |
| 12 | Ethics / refusal stance | silent on detector evasion; only rule is no-fabrication | explicit refusal of detector-evasion and academic-integrity misuse, plus no-fabrication (`SKILL.md:48-50`) | **We lead** |
| 13 | Native-speaker verification of Arabic output | unverified (no native review claimed or evidenced) | unverified (`REVIEW-HANDOFF.md` 3.1-3.2: MSA fixtures self-written, Levantine entirely unreviewed) | **Tie**, both unverified |
