# English AI-tell vocabulary (tiers 1A / 1B / 2 / 3)

Source of the tier system: `avoid-ai-writing/references/patterns.md:25-213`
(commit `7a2c7d11d4a74d90c6be41fbed8402d972543798`). Tier semantics are
reproduced here **exactly as avoid-ai-writing defines them** — this file does
not renumber or reinterpret the tiers. blader (`blader/SKILL.md:198-206`,
commit `9862685f575c65a8247f90369951df1b3416e3d6`) contributes one flat
28-word list (BL-012); its words are folded into whichever tier's own
trigger definition fits each word, logged in
`docs/dedup-log/en.md#vocabulary-placements`.

## Tier semantics (verbatim intent, avoid-ai-writing `patterns.md:29-45`)

- **Tier 1 — Review every match.** Strong candidates in their listed senses.
  Apply context exceptions; preserve legitimate technical or author-specific
  uses.
  - **1A — AI frequency markers.** Words claimed to appear far more often in
    machine text than in human writing. A cluster of 1A hits is evidence
    about how a passage was produced. Weighted higher than 1B: 1A is the
    authorship-relevant band.
    **Caveat (verbatim, `patterns.md:45`):** the "appears far more often in
    AI text" claim behind 1A is *inherited, not measured here* — traced to
    `brandonwise/humanizer`, which states a 5–20x ratio without publishing a
    method or dataset. Treat 1A as a well-supported convention, not a
    verified statistic.
  - **1B — Clarity edits.** Wordiness and inflated formality. Fixing them is
    good editing regardless of who wrote the sentence, and a 1B hit is
    **not** evidence of machine authorship — weighted like Tier 2 and
    excluded from the dense-AI-vocabulary signal. In `detect` mode, report
    1A and 1B separately; never present a 1B wordiness fix as authorship
    evidence.
- **Tier 2 — Flag in clusters.** Individually legitimate; two or more of
  these words in the same paragraph is a strong signal worth a rewrite.
- **Tier 3 — Flag by density.** Ordinary words AI overuses. Only flag when
  they make up a noticeable fraction of the text — roughly **3%+ of total
  words** (`patterns.md:31`).
- **Tier 3 phrases — flag at density or in clusters.** Multi-word
  boilerplate: flag at **2+ uses of the same phrase**, or when **3+ distinct
  phrases** from the table appear once each in one piece (`patterns.md:191`).

**Match inflected forms** (`patterns.md:33`): each entry covers the listed
word and its morphological variants — adverb (`-ly`), gerund/participle
(`-ing`), plural, comparative/superlative, verb conjugations — unless a
variant carries a distinct, legitimate meaning (e.g. `real` meaning factual
is not the intensifier sense). This is why several BL-012 words below are
marked "already covered by inflection" rather than added as new rows.

## Era column (Tier 1A)

Every Tier 1A row below carries an **Era** tag. It records whether a
specific upstream source ties that word's AI-frequency claim to a dated
model generation or a dated measurement, not this project's own opinion of
when the word became common. `unknown` is the honest default: neither
`_sources/avoid-ai-writing/` nor `_sources/blader/` ties any individual
Tier 1A word to a date or model generation. Two things they do date, neither
of which is a Tier 1A word: the em-dash frequency guidance ("usage has
varied by model generation and vendor," `_sources/avoid-ai-writing/SKILL.md:182`,
a formatting rule, not a vocabulary entry) and the Tier 1B false-positive
baseline ("Measured against 257 paragraphs of verified pre-2023 human
prose," `_sources/avoid-ai-writing/references/patterns.md:41`, which dates
the *test corpus*, not any individual word). Tag a row `unknown` unless a
future source ties that specific word to a date; do not infer a plausible
date from context. See `docs/discrepancies/round1-docs.md` for how many
entries carried a sourced era at the end of this pass (currently 0 of 49;
all `unknown`).

**Decay.** Lexical tiers are a snapshot of one model generation's habits,
not a permanent property of the words themselves. As models change, the
words they overuse change with them: a word flagged here today can fall out
of favor, and a word absent today can become tomorrow's tell. Treat this
file as needing periodic re-baselining against current model output, the
same caution the 1A caveat above already applies to the *existence* of the
5-20x frequency claim; the Era column is where that caution would attach if
and when a re-baselining effort dates specific words. Idea credited to
yoloshii (`SKILL.md:185-190`) and eddyplolz (`tell-catalog.md:138-142`);
wording here is original.

---

## Tier 1A — AI frequency markers

Source: `avoid-ai-writing/references/patterns.md:49-99`.

| Replace | With | Era |
|---|---|---|
| delve / delve into | explore, dig into, look at | unknown |
| landscape (metaphor) | field, space, industry, world | unknown |
| tapestry | (describe the actual complexity) | unknown |
| realm | area, field, domain | unknown |
| paradigm | model, approach, framework | unknown |
| embark | start, begin | unknown |
| beacon (metaphor) | example, guide, source of hope (name what provides the example or guidance) | unknown |
| testament to | shows, proves, demonstrates | unknown |
| robust | strong, reliable, solid | unknown |
| comprehensive | thorough, complete, full | unknown |
| cutting-edge | latest, newest, advanced | unknown |
| leverage (verb) | use | unknown |
| pivotal | important, key, critical | unknown |
| underscores | highlights, shows | unknown |
| meticulous / meticulously | careful, detailed, precise | unknown |
| seamless / seamlessly | smooth, easy, without friction | unknown |
| game-changer / game-changing | describe what specifically changed and why it matters | unknown |
| hit differently / hits different | (say what specifically changed, or cut) | unknown |
| watershed moment | turning point, shift (or describe what changed) | unknown |
| marking a pivotal moment | (state what happened) | unknown |
| the future looks bright | (cut — say something specific or nothing) | unknown |
| only time will tell | (cut — say something specific or nothing) | unknown |
| nestled | is located, sits, is in | unknown |
| vibrant | (describe what makes it active, or cut) | unknown |
| thriving | growing, active (or cite a number) | unknown |
| despite challenges… continues to thrive | (name the challenge and the response, or cut) | unknown |
| showcasing | showing, demonstrating (or cut the clause) | unknown |
| deep dive / dive into | look at, examine, explore | unknown |
| unpack / unpacking | explain, break down, walk through | unknown |
| bustling | busy, active (or cite what makes it busy) | unknown |
| intricate / intricacies | complex, detailed (or name the specific complexity) | unknown |
| complexities | (name the actual complexities, or use "problems" / "details") | unknown |
| ever-evolving | changing, growing (or describe how) | unknown |
| enduring | lasting, long-running (or cite how long) | unknown |
| daunting | hard, difficult, challenging | unknown |
| holistic / holistically | complete, full, whole (or describe what's included) | unknown |
| actionable | practical, useful, concrete | unknown |
| impactful | effective, significant (or describe the impact) | unknown |
| learnings | lessons, findings, takeaways | unknown |
| thought leader / thought leadership | expert, authority (or describe their actual contribution) | unknown |
| best practices | what works, proven methods, standard approach | unknown |
| at its core | (cut — just state the thing) | unknown |
| synergy / synergies | (describe the actual combined effect) | unknown |
| interplay | relationship, connection, interaction | unknown |
| keen (as intensifier) | interested, eager, enthusiastic (or cut — just state the interest) | unknown |
| genuinely / genuine (as intensifier) | (cut — just state the fact) | unknown |
| symphony (metaphor) | (describe the actual coordination or combination) | unknown |
| embrace (metaphor) | adopt, accept, use, switch to | unknown |
| load-bearing *(metaphor)* | essential, critical, necessary — or say what breaks if you remove it | unknown |

**Hyphen required:** unhyphenated "load bearing" is ordinary English ("the
load bearing down on the bridge") — only the hyphenated compound is the tell.

**Abstract-noun boundary:** flag hyphenated `load-bearing` only when it
immediately modifies `assumption`, `claim`, `invariant`, `premise`,
`constraint`, `dependency`, `argument`, or `abstraction` (incl. plurals).
Preserve literal building terminology, unlisted nouns, intervening
modifiers, and predicative uses ("the wall in the kitchen is
load-bearing"). Mixed physical/abstract nouns (`structure`, `element`,
`frame`, `foundation`, `test`, `detail`) also pass.

### BL-012 additions folded into Tier 1A (already covered by inflection — no new row)

These BL-012 words are morphological variants of an existing Tier 1A entry
and are covered by the inflected-forms rule above, so no separate row was
added:

- `bolstered` → variant of Tier 2's `bolster` (placed there, not 1A — see
  Tier 2 table below).
- `enduring` → already Tier 1A (`enduring | lasting, long-running`).
- `fostering` → variant of Tier 2's `foster` (placed there, not 1A).
- `showcase` → variant of Tier 1A's `showcasing`.
- `underscore (verb)` → base form of Tier 1A's `underscores`.
- `meticulous/meticulously`, `deep dive`, `intricate/intricacies`,
  `pivotal`, `robust`, `testament`, `landscape`, `tapestry`, `vibrant`,
  `quietly` → already present verbatim or as the listed sense.

---

## Tier 1B — Clarity edits

Source: `avoid-ai-writing/references/patterns.md:109-120`. Not authorship
evidence — a wordiness/formality fix, weighted like Tier 2.

| Replace | With |
|---|---|
| utilize | use |
| in order to | to |
| due to the fact that | because |
| serves as | is |
| features (verb) | has, includes |
| boasts | has |
| presents (inflated) | is, shows, gives |
| commence | start, begin |
| ascertain | find out, determine, learn |
| endeavor | effort, attempt, try |

### BL-012 addition (new row, tagged BL-012)

| Replace | With | Source |
|---|---|---|
| additionally | and, also, on top of that | BL-012 (`blader/SKILL.md:200`). AW's own catalog treats "Additionally" as a **transition phrase** to rewrite (`patterns.md:225`, EN-030), not a Tier 1B vocabulary row. Placed here as a clarity-edit vocabulary entry per its BL-012 sense (a formal connective, not evidence of authorship) — see the placement log for why it isn't duplicated into EN-030's trigger list. |

---

## Tier 2 — Flag when 2+ appear in the same paragraph

Source: `avoid-ai-writing/references/patterns.md:126-167`.

| Replace | With |
|---|---|
| harness | use, take advantage of |
| navigate / navigating | work through, handle, deal with |
| foster | encourage, support, build |
| elevate | improve, raise, strengthen |
| unleash | release, enable, unlock |
| streamline | simplify, speed up |
| empower | enable, let, allow |
| bolster | support, strengthen, back up |
| spearhead | lead, drive, run |
| resonate / resonates with | connect with, appeal to, matter to |
| revolutionize | change, transform, reshape (or describe what changed) |
| facilitate / facilitates | enable, help, allow, run |
| underpin | support, form the basis of |
| nuanced | specific, subtle, detailed (or name the actual nuance) |
| crucial | important, key, necessary |
| multifaceted | (describe the actual facets, or cut) |
| ecosystem (metaphor) | system, community, network, market |
| myriad | many, numerous (or give a number) |
| plethora | many, a lot of (or give a number) |
| encompass | include, cover, span |
| catalyze | start, trigger, accelerate |
| reimagine | rethink, redesign, rebuild |
| galvanize | motivate, rally, push |
| augment | add to, expand, supplement |
| cultivate | build, develop, grow |
| illuminate | clarify, explain, show |
| elucidate | explain, clarify, spell out |
| juxtapose | compare, contrast, set side by side |
| paradigm-shifting | (describe what actually shifted) |
| transformative / transformation | (describe what changed and how) |
| cornerstone | foundation, basis, key part |
| paramount | most important, top priority |
| poised (to) | ready, set, about to |
| burgeoning | growing, emerging (or cite a number) |
| nascent | new, early-stage, emerging |
| quintessential | typical, classic, defining |
| overarching | main, central, broad |
| quietly | cut, or name the concrete contrast |
| deeply *(significance collocations only — "deeply integrated," "deeply committed," "deeply rooted"; literal uses like "deeply nested" or "cares deeply" never count toward a cluster)* | cut, or name what specifically runs deep |
| underpinning / underpinnings | basis, foundation, what supports |

### BL-012 additions (new rows, tagged BL-012)

BL-012's flat list has no cluster/density distinction; these words are
individually legitimate and fit Tier 2's "flag in clusters" definition
better than Tier 1A's "strong candidate alone" or Tier 3's "flag only at
saturation" — none of them have AW's stated 5-20x frequency-marker evidence
behind them, so 1A would overclaim, and they aren't common enough for a
density threshold to be practical.

| Replace | With | Source |
|---|---|---|
| actually (as filler, not correction) | (cut — just state the fact) | BL-012 (`blader/SKILL.md:200`). AW already covers "actually" under **hollow intensifiers** (AW-008, EN-028) as a sentence-structure rule with the same correction-word carve-out. Listed here too because BL treats it as a vocabulary item; see the dedup log for why both homes are kept rather than merged. |
| align with | match, fit, support (or state the specific alignment) | BL-012 (`blader/SKILL.md:200`). Not in any AW tier; figurative-collocation shape similar to `resonate with`. |
| enhance | improve, strengthen (or say how) | BL-012 (`blader/SKILL.md:200`). Not in any AW tier. |
| garner | get, earn, receive | BL-012 (`blader/SKILL.md:200`). Not in any AW tier. |
| gate / gated / gating *(figurative only — keep technical uses, e.g. access gating, feature gates)* | restrict, limit, control access to | BL-012 (`blader/SKILL.md:200`), carve-out preserved verbatim from BL-012's own note. Not in any AW tier. |
| highlight (verb) | show, point out, note | BL-012 (`blader/SKILL.md:200`). Not in any AW tier; distinct from Tier 1A's `underscores`, which AW already treats as the stronger frequency marker. |

---

## Tier 3 — Flag only at high density (~3%+ of total words)

Source: `avoid-ai-writing/references/patterns.md:173-187`.

| Word | What to do |
|---|---|
| significant / significantly | Replace some with specifics: numbers, comparisons, examples |
| innovative / innovation | Describe what's actually new |
| effective / effectively | Say how or cite a metric |
| dynamic / dynamics | Name the actual forces or changes |
| scalable / scalability | Describe what scales and to what |
| compelling | Say why it compels |
| unprecedented | Name the precedent it breaks (or cut) |
| exceptional / exceptionally | Cite what makes it an exception |
| remarkable / remarkably | Say what's worth remarking on |
| sophisticated | Describe the sophistication |
| instrumental | Say what role it played |
| world-class / state-of-the-art / best-in-class | Cite a benchmark or comparison |
| verbatim | Usually redundant with the verb ("copies X verbatim" = "copies X") — cut it. If the exactness marks a contrast, name it: byte-for-byte, word for word, unchanged. Term of art in legal/research/QA registers, so weigh density in that context before flagging |

### BL-012 additions (new rows, tagged BL-012)

| Word | What to do | Source |
|---|---|---|
| key (adjective) | important, main, central (or name what makes it key) | BL-012 (`blader/SKILL.md:200`). Placed at Tier 3, not 1A/2: AW itself uses "key" as a *suggested replacement word* for other tells (e.g. `crucial → important, key, necessary`), so treating bare "key" as a tell only makes sense at the density band, never as a per-instance frequency marker — flagging every suggested-replacement use of "key" would contradict AW's own fix text. Logged as a discrepancy — see `docs/discrepancies/en.md`. |
| valuable | useful, worthwhile (or name the specific value) | BL-012 (`blader/SKILL.md:200`). Not in any AW tier; common enough that a density threshold, not a per-instance flag, avoids false positives on ordinary formal writing. |

---

## Tier 3 phrases — flag at density or in clusters

Source: `avoid-ai-writing/references/patterns.md:193-204`. Flag at **2+
uses of the same phrase**, or **3+ distinct phrases** from this table
appearing once each in one piece.

| Phrase | What to do |
|---|---|
| emerging sector / emerging space / emerging category | Name the actual sector or what's emerging about it |
| the integration of (X with Y) | Describe what's being integrated and what changes for the user |
| the intersection of (X and Y) | Pick the specific overlap that matters or cut the framing |
| community-driven | Name what the community does. "Community-driven" alone is filler |
| long-term sustainability | Cite the time horizon and the constraint. "Long-term" is hand-waving |
| user engagement | Name the action. "Engagement" is a wrapper around clicks/comments/retention |
| decentralized compute | Specify the architecture or cut. The phrase has become a category label, not a claim |
| (sustainable) reward emissions | Cite the emission schedule and the sink |
| tokenized incentive structures | Describe the actual mechanism (vesting, gauge, bonded LP, etc.) |
| designed for long-term [X] | Cut "designed for" — either it is or it isn't. Then state the property |

No BL-012 phrase additions — blader's list is single words only.

---

## Domain-term caveat (moved here from the pattern catalog)

**Audience-fit note: domain-term collision** (AW-014,
`avoid-ai-writing/references/patterns.md:206-213`). In cryptography
writing, flag generic "proof" or "proof point" only when a reader could
mistake supporting evidence for a cryptographic proof. Judgment-only, P2,
outside the deterministic tiers. Preserve literal cryptographic proofs,
ordinary "proof of purchase," and strategy uses whose meaning is clear.

| Ambiguous use | Clarify using source facts |
|---|---|
| "The launch is our proof" in a discussion of cryptographic guarantees | "The launch is evidence of demand" only if demand is the claim being supported; otherwise ask what the launch demonstrates. |
| "This demo is our proof point" when readers could infer a security proof | Name what the demo demonstrates; preserve "proof point" when the passage already distinguishes it from a cryptographic proof. |

## Technical-context exemptions

Source: `avoid-ai-writing/references/patterns.md:667`. These terms have
legitimate technical meaning and should not be flagged in technical
context: `robust`, `comprehensive`, `seamless`, `ecosystem`, `leverage`
(when discussing actual platform leverage/APIs), `facilitate`, `underpin`,
`streamline`, and the noun `harness` in established terms such as `test
harness`. Still flag ornamental uses and the listed senses of `delve`,
`tapestry`, `beacon`, `embark`, `testament to`, and `game-changer`;
`harness` as a stock verb remains subject to its normal rule. blader's own
technical-use carve-out (`blader/SKILL.md:200`, "gate/gated/gating
(figurative; keep technical uses), robust (figurative; keep technical
uses)") agrees with AW's list on `robust` and extends it to `gate/gated/
gating`, which AW's exemption list does not name — both carve-outs are
kept (union, not replacement), per `docs/DEDUP-MAP.draft.md`'s note on
BL-012.
