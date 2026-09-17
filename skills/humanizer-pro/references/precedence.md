# Rule precedence

When two rules in this skill disagree, this file decides. It merges three
upstreams (`blader/humanizer`, `avoid-ai-writing`, `humanizer-semitic`) whose
rules were written independently and sometimes point in opposite directions.
Levels are numbered 1 (highest) to 6 (lowest).

## The precedence order

### Level 1 — Protected content

Facts, numbers, dates, proper names, quotations and attributed passages,
citations, URLs and paths, identifiers, frontmatter, code blocks and inline
code, tables, and spans the user has marked as SEO-protected. Their meaning is
never changed. Also protected as *structure*: content that is genuinely
list-like — step-by-step instructions, API or configuration parameters, feature
comparisons, spec tables — which stays a list in every language
(`avoid-ai-writing/references/patterns.md:13`). A style rule at any lower level
that would alter a protected span does not fire; report the finding instead of
applying it (`avoid-ai-writing/SKILL.md:69-71`). Level 1 may not be overridden
by a voice sample, a voice profile, a language reference, or a core pattern. It
may be re-scoped only by level 2, and only when the user names the span.

### Level 2 — Explicit user instruction in the current request

What the user asked for in this request: scope ("only fix the second
paragraph"), an exception ("keep my opening question"), a correction of fact, or
permission to restructure. It overrides levels 3–6 outright. Against level 1 it
may re-scope the protected set — the user can declare a specific quote, number,
or list fair game, and can supply a correction that changes a fact — but a
general style instruction ("make it punchier", "sound more human") never
licenses changing the meaning of a fact, number, quotation, or URL
(`avoid-ai-writing/SKILL.md:87-89`). If the instruction is ambiguous about
scope, treat it as style-level, not as level-1 authorization.

### Level 3 — User voice sample

A sample of the user's own writing, supplied in this request. Read it first and
match its sentence length, word choice, punctuation habits, openings, and
transitions; deliberate quirks in the sample are the target, not a defect
(`blader/SKILL.md:42`; `avoid-ai-writing/references/patterns.md:708`). This
includes dash usage: if the sample uses em dashes, keep them at roughly the
sample's rate instead of applying the default removal. The sample overrides
**style** rules only — levels 4, 5, and 6. It cannot override level 1 or level
2, it cannot license inventing facts, personality, or stance the source does not
have, and it cannot suppress a preservation check. (blader's own text says "The
sample overrides the patterns below, including §6" at `blader/SKILL.md:42`; the
`§6` there is a stale cross-reference — the dash rule is §8 at
`blader/SKILL.md:159` — and the unqualified "the patterns below" is narrowed
here to the stylistic subset.)

### Level 4 — Selected voice profile

One of `casual`, `professional`, `technical`, `warm`, `blunt`
(`avoid-ai-writing/references/patterns.md:690-706`). A profile is a set of
concrete targets for how the prose should sound, not a vibe, and it is optional:
with no profile named, infer the register from the source and impose nothing. It
overrides the language reference and shared core where they only express a
default register preference (for example `blunt` preferring periods over a
softened connector). It never overrides a sample at level 3, and it can only
bring out what the source already has — never manufacture stance, warmth, or
detail (`avoid-ai-writing/references/patterns.md:694`).

### Level 5 — Language / dialect reference

The active `en-*.md` or `ar-*.md` reference: MSA, Egyptian, Levantine, English.
It owns everything that is language-specific — native rhetoric, grammar and
morphology, MSA-versus-dialect substitutions, per-variety thresholds, and native
typography. A rule written for one language does not run against another. Two
consequences carry most of the merge: rhetorical questions are an English tell
but a native Arabic device, so the English rule does not apply to Arabic text of
any variety; and MSA-leakage rules (demonstratives, future marker, negators,
tanwin, passives) run only when the target is a dialect, never against MSA text.
Native typography lives here too: in Arabic, keep ، ؛ ؟ and « » and do not
Latin-punctuate or straighten Arabic prose (`origin: humanizer-pro`). Level 5
overrides level 6 but yields to 1–4.

### Level 6 — Shared core patterns

The language-neutral catalogue: the merged blader/avoid-ai-writing pattern set
and its defaults, including the no-sample em-dash default, hedge stacking, bold
as decoration, sentence-case headings, promotional inflation, chatbot residue,
and the severity scheme below. It applies wherever nothing above it speaks. It
is the lowest level: any explicit statement at levels 1–5 wins against it.

## How to apply

1. Find every rule that speaks to the span in question.
2. Take the highest level that speaks. That rule decides. Stop.
3. If two rules sit at the same level, prefer the more specific one — the one
   scoped to this variety, genre, or construction over the general one.
4. If they are still tied, prefer the less invasive edit (report over rewrite,
   patch over restructure) and say in the report that the tie was broken this
   way and what the alternative would have been.
5. Never resolve a tie by inventing a third option that adds content.
6. **P2-only stop rule.** When a `detect` pass finds nothing above P2 (see
   Severity mapping below), the report closes with "no verdict; weak signals
   only" instead of a confident label. This changes only the closing
   sentence of the report, never the findings themselves or the numeric
   score: every P2 finding is still listed, with its pattern ID and family
   tag, exactly as found. See `modes.md`'s `detect` contract for the exact
   wording and `ar-shared.md` for the five-family tags this rule reads
   alongside severity. Taxonomy idea (the five-family cross-index and the
   stop rule together) credited to finestructure-ai/humanizer-multilingual
   (MIT); wording here is original.

## Conflict resolution

Every conflict in `docs/CONFLICTS.md` is resolved here.

| ID | Conflict | Resolution | Deciding level |
|---|---|---|---|
| C-01 | Em dash: blader sample-overridable vs avoid-ai-writing "target zero, max one per 1,000 words" | Remove em dashes by default in English; a user voice sample that uses them overrides and sets the rate. Keep the list-item carve-out (`- **Term** — description`) and leave dashes in code, paths, and URLs. Never score a dash as authorship evidence. | 3 with a sample; 6 without |
| C-02 | Rhetorical questions: an AI tell (EN) vs a required native device (AR) | English: keep the avoid-ai-writing rule — earned by setup, not used as a transition. Arabic (MSA, Egyptian, Levantine): the English rule does not apply; absence is the tell and questions are added per the variety reference. | 5 |
| C-03 | Arabic typography and digits have no upstream rule | Adopt, as `origin: humanizer-pro`: Arabic prose uses ، ؛ ؟ and « » ; never convert Arabic punctuation to Latin equivalents, never straighten or curl Arabic quotes to an English convention, and never apply the English dash rule to Arabic text. Digits are numbers, so Arabic-Indic and Western digits are never converted either way. | 5 for typography; 1 for digits |
| C-04 | MSA demonstratives: correct in MSA, an AI tell in dialect | Dialect-scope the rule. هذا/هذه/هؤلاء are correct MSA and are never flagged in MSA text; they are fixed to post-nominal dialect forms only when the target is Egyptian or Levantine. | 5 |
| C-05 | Future marker سـ/سوف vs حـ/هـ/رح | Same treatment as C-04: سـ/سوف is standard MSA and unflagged in MSA text; in Egyptian it becomes حـ/هـ + imperfect, in Levantine رح. | 5 |
| C-06 | Tanwin and case endings: a genre choice in MSA, stripped in Egyptian | MSA rule is "diacritize consistently per genre"; Egyptian rule is "strip tanwin and case endings". Both stand, each in its own variety. | 5 |
| C-07 | Passive severity: blader weak-alone vs MSA تم/يتم critical vs unranked elsewhere | MSA: تم/يتم overuse is P0 with its numeric cap (at most one per 300 words). English: agentless passive is P2, needs corroboration. Egyptian and Levantine: P2. | 5 for MSA; 6 elsewhere |
| C-08 | Bullet lists: avoid-ai-writing carve-outs vs MSA's blanket >15% / >5-item rule | Structurally list-like content (steps, parameters, feature comparisons, spec tables) is protected content and is never converted to prose, in any language. The MSA thresholds still fire on the residue — list-shaped argumentation. | 1 for carve-out content; 5 for the residue |
| C-09 | Three incompatible severity vocabularies | Unify on P0/P1/P2 (see Severity mapping). blader's "weak alone" becomes a corroboration note inside P2, not a tier. | 6 |
| C-10 | MSA negators vs Egyptian ما...ش/مش vs Levantine regional split | Dialect-scope the leakage rule; keep Egyptian and Levantine negation tables separate rather than merging them, because the ـش circumfix is general in Egyptian but regionally restricted in Levantine. | 5 |
| C-11 | One MSA hedge/opener family, three different dialect replacement sets | One shared detection rule for the MSA hedge-opener family; three fix tables (MSA-register, Egyptian, Levantine) selected by the active reference. | 6 detects, 5 fixes |
| C-12 | Four different sentence-length bands | Do not unify. Shared core stays judgment-only with no numeric band. Each Arabic variety keeps its own band as an override, labelled in the reference as an upstream uncited heuristic, not a measured statistic. | 5 |
| C-13 | Does a voice sample override everything, including preservation checks? | No. Sample authority is capped at level 3: it overrides style rules at 4–6 only. Protected content and explicit instruction always win. | 1 and 2 over 3 |
| C-14 | No shared severity/confidence vocabulary across upstreams | Adopt P0/P1/P2 as the single scale (see Severity mapping). semitic's 50-point rubric is dropped. The avoid-ai-writing detector score and its HUMAN/MIXED/AI label stay as an optional reporting layer and are not folded into the tier scale. | 6 |

## Worked examples

**EN-1 — Em dash against a voice sample.**
Rules in tension: shared-core em-dash removal (level 6) vs a sample whose
paragraphs average two em dashes each (level 3). Level 3 wins; the dashes stay
at the sample's rate.
Before: `The rollout — delayed twice — finally shipped.`
After: `The rollout — delayed twice — finally shipped.` (unchanged; report that
the dash rule was suppressed by the sample)

**EN-2 — Em dash inside a quotation.**
Rules in tension: the same level-6 dash rule vs protected content (level 1). No
sample is supplied, so level 6 would normally fire — but the dash sits inside an
attributed quote. Level 1 wins.
Before: `She wrote, "The policy — announced without warning — hurt us."`
After: unchanged. The finding is reported as a protected residual, not fixed.

**EN-3 — User keeps an opening question.**
Rules in tension: the rhetorical-question-opener rule (level 6) vs "keep my
opening question, it's the hook" (level 2). Level 2 wins for that sentence; the
rule still applies to the other three section-transition questions.
Before: `So why should you care? Three teams missed the deadline.`
After: `So why should you care? Three teams missed the deadline.` (kept; the
later transition questions are cut)

**AR-1 (MSA) — Rhetorical question. <!-- NATIVE-REVIEW: msa -->**
Rules in tension: the English "rhetorical questions are a stalling tell" rule
(level 6, English-scoped) vs the MSA reference, which treats their absence in
texts over 400 words as the tell (level 5). Level 5 wins: the English rule does
not run on Arabic, and a question is added.
Before: `إن التعليم يؤثر بشكل مباشر على مستوى التنمية الاقتصادية والاجتماعية في أي مجتمع من المجتمعات.`
After: `متى تعلّمنا أخيرًا أن الأمم لا تُبنى بالثروات، بل بما تفعله بها؟`
(borrowed from `semitic/skills/humanizer-ar-msa/SKILL.md:361-362`)

**AR-2 (MSA) — تم/يتم passive at P0.**
Rules in tension: the shared-core passive rule, P2 and weak alone (level 6), vs
the MSA reference, which caps تم/يتم at one per 300 words and marks it P0
(level 5). Level 5 wins; the passive is converted even without corroborating
signals.
Before: `تم إجراء الدراسة من قِبَل الباحثين، وتم جمع البيانات على مدى ثلاثة أشهر، وتمت معالجتها إحصائيًا.`
After: `أجرى الباحثون دراستهم على مدى ثلاثة أشهر، جمعوا خلالها البيانات وحللوها إحصائيًا.`
(borrowed from `semitic/skills/humanizer-ar-msa/SKILL.md:123-124`)

**AR-3 (Egyptian) — Future marker, and why it does not fire in MSA. <!-- NATIVE-REVIEW: egt -->**
Rules in tension: nothing in the MSA reference flags سوف, while the Egyptian
reference calls it a systematic grammatical error (both level 5). The active
reference decides: in an MSA document the سوف stays; in an Egyptian document it
is replaced.
Before (Egyptian target): `سوف نتحدث عن هذا الموضوع لاحقاً وسأذهب لمقابلته غداً`
After: `هنتكلم في الموضوع ده بعدين وهروح أقابله بكره`
(borrowed from `semitic/skills/humanizer-ar-egt/SKILL.md:136-137`)

**AR-4 (Egyptian) — Protected list beats the MSA list threshold. <!-- NATIVE-REVIEW: egt -->**
Rules in tension: the MSA-derived list rule, which flags lists over five items
inside argumentative text and converts them to prose (level 5), vs protected
structure — these are numbered installation steps (level 1). Level 1 wins; the
list stays a list, and only the prose around it is edited.
Before: a seven-step numbered install procedure plus a hedged MSA opener
(`من الجدير بالذكر أن ...`).
After: the same seven steps, untouched; the opener is cut and the paragraph
starts on the claim. The list-overuse finding is reported as protected.

**AR-5 (Levantine) — Sample suppresses the add-questions rule. <!-- NATIVE-REVIEW: shami -->**
Rules in tension: the Levantine reference, which says to add 2–3 reader-directed
confirmation questions (level 5), vs a user voice sample of six Levantine posts
containing none (level 3). Level 3 wins; no questions are injected, and the
report says the rule was suppressed by the sample.
Without a sample the level-5 rule fires and produces the upstream form:
`هاد الأسلوب أحسن لأنو بيوفر وقت وجهد، بتفهم؟`
(borrowed from `semitic/skills/humanizer-ar-shami/SKILL.md:600-601`)

## Severity mapping

One scale, three tiers. There is no fourth "judgment-only" tier.

- **P0** — Act on sighting. A single instance justifies an edit within scope.
  Chatbot residue, invented facts or citations, significance inflation, vague
  attribution, and MSA تم/يتم overuse in MSA text.
- **P1** — Act when the pattern repeats or the context is strict. A pattern that
  is a genuine tell but tolerable once in a permissive register.
- **P2** — Weak alone. Fix only with corroboration from other findings, or when
  a stricter context profile calls for it. Em dashes with no sample, stacked
  qualifiers, hyphenated pairs, agentless passives in English, curly quotes.

Mapping from upstream vocabulary:

| Upstream | Term | Maps to |
|---|---|---|
| blader | §1–§5, which "justify an edit on one sighting" (`blader/SKILL.md:29`) | P0 |
| blader | "the most certain tell in this list" (§22 chatbot residue) | P0 |
| blader | unmarked pattern outside §1–§5 | P1 |
| blader | *weak alone* (§8 dashes, §9 stacked qualifiers, §10 hyphenated pairs, §11 passive, §21 curly quotes) | P2, with the corroboration note kept |
| avoid-ai-writing | P0 / P1 / P2 tags | P0 / P1 / P2 unchanged |
| avoid-ai-writing | untagged, judgment-only pattern | P2 |
| avoid-ai-writing | detector weight 0 (style-only, e.g. em dash) | P2, and never scored as authorship evidence |
| semitic | critical / "must always be addressed" | P0 |
| semitic | significant | P1 |
| semitic | minor | P2 |
| semitic | 50-point, 5-dimension quality rubric | dropped |

The avoid-ai-writing 0–100 detector score and its HUMAN_ONLY / MIXED / AI_ONLY
label remain an optional reporting layer. They do not set a severity tier and do
not override any level in this file.

## Provenance

Statements in this file are built from:

- `blader/SKILL.md:42` — voice sample overrides the pattern set (levels 3, C-13;
  the inline `§6` there is a stale reference to the dash rule at
  `blader/SKILL.md:159`).
- `blader/SKILL.md:161-162` — dash rule, sample-overridable, with code/path/URL
  carve-out (C-01, EN-1, EN-2).
- `blader/SKILL.md:29,162,171,180,188,306,319` — the *weak alone* tier, its five
  markings, and the chatbot-residue "most certain tell" note (C-09, severity
  mapping).
- `avoid-ai-writing/references/patterns.md:10` — em dash target zero, hard max
  one per 1,000 words, list-item carve-out (C-01, level 6).
- `avoid-ai-writing/SKILL.md:182` — em dash frequency is writing-quality guidance,
  not evidence of machine authorship (C-01, severity mapping).
- `avoid-ai-writing/references/patterns.md:13` — list carve-outs for feature
  comparisons, step-by-step instructions, API parameters (level 1, C-08, AR-4).
- `avoid-ai-writing/references/patterns.md:14` — curly quotes and locale-correct
  punctuation as a weak signal (C-03, P2).
- `avoid-ai-writing/references/patterns.md:448` — rhetorical question openers
  (C-02, EN-3).
- `avoid-ai-writing/references/patterns.md:690-706` — the five voice profiles and
  their independence from context profiles (level 4).
- `avoid-ai-writing/references/patterns.md:694` — a profile brings out what the
  source has, never manufactures it (level 4).
- `avoid-ai-writing/references/patterns.md:708` — calibrate to a supplied sample,
  do not upgrade the writer's register (level 3).
- `avoid-ai-writing/SKILL.md:69-71` — protected content list and "report the
  finding inside a protected region" (level 1).
- `avoid-ai-writing/SKILL.md:87-89` — an explicit voice request may not override
  source fidelity or protected content (levels 2 and 3, C-13).
- `semitic/skills/humanizer-ar-msa/SKILL.md:116,123-124,489-492` — تم/يتم
  detection, fix example, and its critical/must-address status (C-07, AR-2).
- `semitic/skills/humanizer-ar-msa/SKILL.md:257,264-272` — list thresholds and the
  convert-to-prose fix (C-08, AR-4).
- `semitic/skills/humanizer-ar-msa/SKILL.md:226` — sentence-length band and
  std-dev threshold (C-12).
- `semitic/skills/humanizer-ar-msa/SKILL.md:354-358,361-362` — rhetorical
  questions as a native device (C-02, AR-1).
- `semitic/skills/humanizer-ar-msa/SKILL.md:390` — diacritics as a genre choice
  applied uniformly (C-06).
- `semitic/skills/humanizer-ar-msa/SKILL.md:485` — minor / significant / critical
  per-instance tags (severity mapping).
- `semitic/skills/humanizer-ar-egt/SKILL.md:110,114` — tanwin and case endings
  stripped in Egyptian (C-06).
- `semitic/skills/humanizer-ar-egt/SKILL.md:124,137-138` — future marker
  سـ/سوف → حـ/هـ (C-05, AR-3).
- `semitic/skills/humanizer-ar-egt/SKILL.md:162,168-176` — demonstrative order
  (C-04).
- `semitic/skills/humanizer-ar-egt/SKILL.md:262` — Egyptian sentence-length band
  (C-12).
- `semitic/skills/humanizer-ar-egt/SKILL.md:282-290` — MSA formal openers and
  their Egyptian replacements (C-11).
- `semitic/skills/humanizer-ar-egt/SKILL.md:491-509` — reader-directed questions
  (C-02).
- `semitic/skills/humanizer-ar-shami/SKILL.md:201-215` — سوف/سـ → رح (C-05).
- `semitic/skills/humanizer-ar-shami/SKILL.md:574-602` — reader-directed
  confirmation questions and the regional table (C-02, AR-5).
- `semitic/skills/humanizer-ar-shami/SKILL.md:907-909` — Levantine sentence-length
  band (C-12).
- `origin: humanizer-pro` — the six-level order itself, the Arabic typography and
  digit rule (C-03), the placement of structurally list-like content inside level
  1 (C-08), the three-tier P0/P1/P2 collapse without a judgment-only tier
  (C-09, C-14), and the tie-breaking algorithm under "How to apply".
