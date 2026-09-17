# English AI-writing tells — merged reference

Merged from two upstream catalogs: blader/humanizer's 25-pattern catalog
(`_sources/blader/SKILL.md`, commit `9862685f575c65a8247f90369951df1b3416e3d6`,
ids `BL-001…BL-025`) and avoid-ai-writing's 90-entry catalog
(`_sources/avoid-ai-writing/references/patterns.md`, commit
`7a2c7d11d4a74d90c6be41fbed8402d972543798`, ids `AW-001…AW-090`). See
`docs/dedup-log/en.md` for every merge, split, and drop decision, and
`docs/provenance/en.md` for a flat id-to-source table.

**Severity.** Adopts avoid-ai-writing's P0/P1/P2 scale as the base (per
`docs/CONFLICTS.md` C-09/C-14: AW is the only source with numeric detector
weights to anchor a scale). blader's *(weak alone)* patterns keep that
label as a modifier — "P2, weak alone" means: needs corroborating tells in
the same passage before you act on it, not just a lower severity.

**Em dashes.** Removed by default. A user-supplied writing-voice sample
overrides the default (match the sample's rate instead). Never score a
dash, alone, as authorship evidence — see EN-022.

**Rhetorical questions.** The rule in this file (EN-043) is scoped to
**English only** (`docs/CONFLICTS.md` C-02). Arabic-language rules use the
opposite default (absence of rhetorical questions is the tell) and live in
a separate, language-scoped reference, not here.

**Lists and headings.** Carve-outs follow avoid-ai-writing: feature
comparisons, step-by-step instructions, API/parameter lists, and other
genuinely list-shaped or SEO-structured content are protected and never
auto-converted to prose (see EN-036, EN-038, EN-039, EN-040).

## Category naming note

The brief's eight categories (content, language, structure, communication,
meta, structural detection, tool fingerprints, conversational register)
have no single upstream source — blader groups patterns into five named
sections (A. Staging instead of stating, B. Rhythm by rule, C. Inflation
and borrowed authority, D. Formatting by rule, E. Leftovers from the chat
and the draft) and avoid-ai-writing groups by a looser mix (Formatting,
Sentence structure, Words and phrases, Structural issues, and a long tail
of individually named `###` patterns with no umbrella heading at all).
Neither source names "structural detection," "tool fingerprints," or
"conversational register" as categories. Those three are introduced here
to split avoid-ai-writing's tail into groups that actually behave
differently: whole-document stylometric tests (structural detection: TTR,
paragraph-reshuffle, sentence/paragraph uniformity) behave nothing like
mechanical leaked tokens (tool fingerprints: citation markup, UTM
parameters) or register-specific social/chat props (conversational
register: hashtag stuffing, fake-casual register). Collapsing all three
into blader's single "Leftovers" bucket would hide that distinction. Kept
as-is otherwise.

## Table of contents

### A. Content
- [EN-001 — Not-X-but-Y contrast](#en-001--not-x-but-y-contrast)
- [EN-002 — One-line closers and dramatic fragments](#en-002--one-line-closers-and-dramatic-fragments)
- [EN-003 — Sayings that sound deep / aphorism formulas](#en-003--sayings-that-sound-deep--aphorism-formulas)
- [EN-004 — Staged run-up before the point](#en-004--staged-run-up-before-the-point)
- [EN-005 — Arguing with no one / false concession / narrated candor](#en-005--arguing-with-no-one--false-concession--narrated-candor)
- [EN-006 — Inflated significance and future-narrative closers](#en-006--inflated-significance-and-future-narrative-closers)
- [EN-007 — Vague connection or association](#en-007--vague-connection-or-association)
- [EN-008 — Shallow -ing riders and superficial analyses](#en-008--shallow--ing-riders-and-superficial-analyses)
- [EN-009 — Sales language and promotional copy](#en-009--sales-language-and-promotional-copy)
- [EN-010 — Borrowed authority and unnamed validation](#en-010--borrowed-authority-and-unnamed-validation)
- [EN-011 — Knowledge-limit disclaimers and speculative gap-filling](#en-011--knowledge-limit-disclaimers-and-speculative-gap-filling)
- [EN-012 — Writing about the previous version / diff-anchored prose](#en-012--writing-about-the-previous-version--diff-anchored-prose)
- [EN-013 — Real/actual adjective inflation](#en-013--realactual-adjective-inflation)
- [EN-014 — Moral-adjective category errors](#en-014--moral-adjective-category-errors)
- [EN-015 — Transformation crutch](#en-015--transformation-crutch)
- [EN-016 — False agency](#en-016--false-agency)
- [EN-017 — Speculative scenario openers](#en-017--speculative-scenario-openers)
- [EN-018 — False ranges](#en-018--false-ranges)
- [EN-019 — Dev-blog boilerplate slogans](#en-019--dev-blog-boilerplate-slogans)

### B. Language
- [EN-020 — Forced triads / colon into a triple](#en-020--forced-triads--colon-into-a-triple)
- [EN-021 — Repeated sentence openings](#en-021--repeated-sentence-openings)
- [EN-022 — Dashes as the universal connector](#en-022--dashes-as-the-universal-connector)
- [EN-023 — Stacked qualifiers and hedge-stacked predictions](#en-023--stacked-qualifiers-and-hedge-stacked-predictions)
- [EN-024 — Hyphenated pairs and modifier stacking](#en-024--hyphenated-pairs-and-modifier-stacking)
- [EN-025 — Passive voice and missing subjects](#en-025--passive-voice-and-missing-subjects)
- [EN-026 — Avoiding is/are/has (copula avoidance)](#en-026--avoiding-isarehas-copula-avoidance)
- [EN-027 — Curly quotation marks and immaculate typography](#en-027--curly-quotation-marks-and-immaculate-typography)
- [EN-028 — Hollow intensifiers and vague endorsement](#en-028--hollow-intensifiers-and-vague-endorsement)
- [EN-029 — Template phrases](#en-029--template-phrases)
- [EN-030 — Transition phrases to remove or rewrite](#en-030--transition-phrases-to-remove-or-rewrite)
- [EN-031 — Synonym cycling](#en-031--synonym-cycling)
- [EN-032 — Filler phrases](#en-032--filler-phrases)

### C. Structure
- [EN-033 — Bold as decoration](#en-033--bold-as-decoration)
- [EN-034 — Decorative headings](#en-034--decorative-headings)
- [EN-035 — A heading repeated in the first sentence](#en-035--a-heading-repeated-in-the-first-sentence)
- [EN-036 — Excessive structure and bullet-list overload](#en-036--excessive-structure-and-bullet-list-overload)
- [EN-037 — Missing bridge sentences](#en-037--missing-bridge-sentences)
- [EN-038 — Bullet lists of bare noun phrases](#en-038--bullet-lists-of-bare-noun-phrases)
- [EN-039 — Inline-header list labels and list-label periods](#en-039--inline-header-list-labels-and-list-label-periods)
- [EN-040 — Numbered list inflation](#en-040--numbered-list-inflation)

### D. Communication
- [EN-041 — Chatbot residue and conversational leftovers](#en-041--chatbot-residue-and-conversational-leftovers)
- [EN-042 — Recap-flattery opener](#en-042--recap-flattery-opener)
- [EN-043 — Rhetorical question openers (English only)](#en-043--rhetorical-question-openers-english-only)
- [EN-044 — Stock reaction framing](#en-044--stock-reaction-framing)

### E. Meta
- [EN-045 — Reasoning chain artifacts](#en-045--reasoning-chain-artifacts)

### F. Structural detection
- [EN-046 — Rhythm and uniformity](#en-046--rhythm-and-uniformity)
- [EN-047 — Vocabulary diversity (TTR)](#en-047--vocabulary-diversity-ttr)
- [EN-048 — Paragraph-reshuffle immunity](#en-048--paragraph-reshuffle-immunity)
- [EN-049 — Treadmill effect / low information density](#en-049--treadmill-effect--low-information-density)

### G. Tool fingerprints
- [EN-050 — Chatbot citation markup and AI-tool URL parameter leaks](#en-050--chatbot-citation-markup-and-ai-tool-url-parameter-leaks)
- [EN-051 — Unfilled placeholders](#en-051--unfilled-placeholders)

### H. Conversational register
- [EN-052 — Hashtag stuffing](#en-052--hashtag-stuffing)
- [EN-053 — Fake-casual register and infomercial engagement hooks](#en-053--fake-casual-register-and-infomercial-engagement-hooks)
- [EN-054 — Wall-of-text replies](#en-054--wall-of-text-replies)
- [EN-055 — Social endorsement closers](#en-055--social-endorsement-closers)

---

# A. Content

## EN-001 — Not-X-but-Y contrast

**Severity:** P1
**Provenance:** BL-001 (`blader/SKILL.md:58-74`); AW-007, AW-063, AW-073, AW-083 (`avoid-ai-writing/references/patterns.md:18, 443-445, 498-502, 553-555`)
**What it looks like:** "not X but Y," "it's not X — it's Y," the split-sentence form ("This does not mean X. It means Y."), a multi-negation countdown before the reveal, a clipped tailing negation ("…, no guessing"), a manufactured mirror pair where one half is a real term and the other is invented to balance it ("false precision rather than genuine accuracy"), or a contrast propped on an invented lagging crowd ("shipped it in 2022, while everyone else was still debating timelines").
**Why it reads as AI:** The negative half names something no one claimed, so the positive half sounds larger than it is. It adds weight without adding a claim. The mirrored and crowd-contrast variants do the same thing with a fabricated foil instead of a fabricated objection.
**Fix:** State the point directly. Keep a contrast only when the negative half corrects a belief the reader actually holds, when both halves carry real information, or when a real opposite exists for a mirrored pair.
**Before:** "It's not just about the beat riding under the vocals; it's part of the aggression and atmosphere. It's not merely a song, it's a statement." **After:** "The heavy beat adds to the aggressive tone." (adapted from `blader/SKILL.md:62-65`)
**Before:** "The headline isn't the speed. The real story is Y." (split-sentence form, `avoid-ai-writing/references/patterns.md:18`) **After:** State Y directly; drop the split negation.
**Carve-outs (do not flag when):** Negations enumerating spec constraints in a list ("no dependencies, no telemetry") are list content, not a reveal. Literal simultaneity in narrative ("she read while everyone else watched the movie") is ordinary prose, not a manufactured crowd contrast. A mirrored pair where both halves are real descriptions ("real data rather than theoretical models") is legitimate contrast, not invention.

## EN-002 — One-line closers and dramatic fragments

**Severity:** P1
**Provenance:** BL-002 (`blader/SKILL.md:75-95`); AW-035, AW-079, AW-085 (`avoid-ai-writing/references/patterns.md:315-316, 534-538, 561-571`)
**What it looks like:** A one-sentence paragraph restating the paragraph before it ("That is the real win."); a row of clipped fragments engineered to land like reveals ("No aesthetic prior. No nostalgia."); a negation chain ("No fluff, no filler, no jargon." / "It didn't ask. It didn't wait."); a generic conclusion ("The future looks bright," "Only time will tell," "One thing is certain"); a repeated setup/reversal punchline used more than once in a piece.
**Why it reads as AI:** The line asks the reader to pause on a claim instead of adding to it. A drumroll of same-shape fragments performs decisiveness without being load-bearing.
**Fix:** Cut a closer that repeats. Merge a row of fragments into a sentence with a specific claim. Say what the thing *is* instead of stacking what it isn't. Add a closing thought only when the source supplies one; do not invent a conclusion to replace filler.
**Before:** "Then AlphaEvolve arrived. It had no preference for symmetry. No aesthetic prior. No nostalgia for human taste. The old rules were gone." **After:** "AlphaEvolve changed the search because it did not favor symmetry or human-looking designs. That made some of the older assumptions less useful." (`blader/SKILL.md:80-82`)
**Carve-outs (do not flag when):** One short sentence that carries a new fact is real emphasis, not a tell. A single supported, voice-appropriate reversal is fine — only *repeated* reversals across a piece are the tell. Intentional comedy, fiction, speeches, and quotations are exempt.

## EN-003 — Sayings that sound deep / aphorism formulas

**Severity:** P1
**Provenance:** BL-003 (`blader/SKILL.md:96-107`); AW-021, AW-078 (`avoid-ai-writing/references/patterns.md:243-247, 529-532`)
**What it looks like:** "the real question is," "at its core," "fundamentally," "the heart of the matter"; slot-fill profundity such as "X is the language of Y," "X becomes a trap," "X is not a tool but a mirror"; performed-insight phrases like "sit with that for a moment," "that's not nothing," "the punchline is," "worth naming," "that's the whole point."
**Why it reads as AI:** An ordinary point is dressed as a hidden truth or an aphorism. The formula turns a claim into something quotable without adding precision — the shape does the persuading instead of the evidence.
**Fix:** Replace the saying with the specific claim it gestures at. If the source says users found symmetric layouts more predictable, state that result directly; don't invent it from the metaphor.
**Before:** "The real question is whether teams can adapt. At its core, what really matters is organizational readiness." **After:** "The question is whether teams can adapt. That mostly depends on whether the organization is ready to change its habits." (`blader/SKILL.md:101-103`)
**Carve-outs (do not flag when):** Quotations and established idioms ("time is money") are attributed speech or common coin — leave them. Quoted speech and genuinely comedic writing where a punchline is literal.

## EN-004 — Staged run-up before the point

**Severity:** P1
**Provenance:** BL-004 (`blader/SKILL.md:109-121`); AW-018, AW-037, AW-042 (`avoid-ai-writing/references/patterns.md:236, 322-323, 342-343`)
**What it looks like:** "Let's dive in," "let's explore," "here's what you need to know," "without further ado"; formulaic openings that lead with broad context before the point ("In the rapidly evolving world of…"); "Let's" as a false-collaborative transition; formulaic challenges ("Despite challenges, X continues to thrive").
**Why it reads as AI:** The writer announces the point or stages a moment of candor instead of making the point.
**Fix:** Remove the run-up, not just its tone. Just start with the point.
**Before:** "Let's dive into how caching works in Next.js. Here's what you need to know." **After:** "Next.js caches data at multiple layers, including request memoization, the data cache, and the router cache." (`blader/SKILL.md:114-116`)
**Carve-outs (do not flag when):** "Honestly" or "look" inside a casual sentence is ordinary English; the tell is the standalone opener before a routine claim, not the word itself.

## EN-005 — Arguing with no one / false concession / narrated candor

**Severity:** P1
**Provenance:** BL-005 (`blader/SKILL.md:122-133`); AW-062, AW-069 (`avoid-ai-writing/references/patterns.md:440-441, 464-472`)
**What it looks like:** "This isn't mainly about," "I'm not saying," "To be clear," "A tempting approach would be," "One might be tempted to" (answering an objection that appears nowhere else); "While X is impressive, Y remains a challenge" (false balance); announcing your own disclosure instead of disclosing it — "Two caveats I would rather flag than let you discover later:", "I want to be upfront:".
**Why it reads as AI:** The text answers an objection or performs candor about itself instead of just being candid, usually a leftover from an earlier draft.
**Fix:** Remove the defense; if it holds a real claim, state the claim. Cut the frame around a disclosure and keep the disclosure itself. The deletion test: if cutting the frame loses no information, the frame was never content.
**Before:** "This isn't mainly about prompt length, and I'm not arguing that documentation doesn't matter. You could categorize the problem another way, but the issue is whether the agent can use the instruction when it acts." **After:** "The issue is whether the agent can use the instruction when it acts." (`blader/SKILL.md:127-129`)
**Carve-outs (do not flag when):** Keep an objection the text attributes or answers in full, and an option a reader would actually weigh. Substantive admissions stay ("I haven't tested this on Windows") — the tell is the separable clause *about* disclosing, not the disclosure. Conflict-of-interest disclosure openers ("In the interest of full disclosure, I own shares…") are a conventional label, not narrated candor.

## EN-006 — Inflated significance and future-narrative closers

**Severity:** P0
**Provenance:** BL-013 (`blader/SKILL.md:207-222`); AW-020, AW-022, AW-055, AW-061, AW-072 (`avoid-ai-writing/references/patterns.md:239-241, 249-252, 391-396, 434-438, 490-496`)
**What it looks like:** "stands as a testament," "a pivotal or crucial moment," "marking a pivotal moment in the evolution of…"; a stock "Challenges and Legacy" / "Future Outlook" section; a generic send-off ("the future looks bright, exciting times ahead"); a falsifiable-sounding but empty closer ("may become one of the most important narratives of the next market cycle"); a novelty claim for an established idea ("she coined the phrase," "a concept nobody's naming"); a claim of lingering attention ("the line I keep coming back to," "I can't stop thinking about this"); back-pointing at an item to label it contrarian/clever/surprising after the fact ("That last move is the contrarian one").
**Why it reads as AI:** An ordinary detail is said to mark a change, prove a legacy, promise a future, claim novelty, or earn unstated significance. The move appears at a phrase scale, a section scale, and a paragraph scale, but it's the same inflation each time.
**Fix:** Keep the fact and drop the significance. End on the last concrete fact. Use a falsifiable closer only when the source supplies its details. Preserve any supported action or first-person experience while removing the unsupported novelty or significance claim.
**Before:** "The Statistical Institute of Catalonia was officially established in 1989, marking a pivotal moment in the evolution of regional statistics in Spain." **After:** "The Statistical Institute of Catalonia was established in 1989, part of a wider decentralization of administrative functions in Spain." (`blader/SKILL.md:212-214`)
**Carve-outs (do not flag when):** If the source states real plans, use those instead of cutting the closer entirely. Leave a lingering-attention claim when the sentence says *why* the thing recurred ("I keep coming back to Hirschman's exit-voice framing because it predicts which engineers quit").

## EN-007 — Vague connection or association

**Severity:** P2
**Provenance:** BL-014 (`blader/SKILL.md:224-231`)
**What it looks like:** "associated with," "in association with," "connected to," "linked to," "tied to."
**Why it reads as AI:** The text says two things are connected without saying how. "He was associated with the leadership of ExampleCorp" hides whether he was the CEO, a board member, or a consultant.
**Fix:** Name the relationship the source gives.
**Before:** "He is associated with the Rajhans Orchestra, which he founded and conducts." **After:** "He founded and conducts the Rajhans Orchestra." (`blader/SKILL.md:229-231`)
**Carve-outs (do not flag when):** If the source does not say what the relationship is, keep the vague wording rather than inventing a role.

## EN-008 — Shallow -ing riders and superficial analyses

**Severity:** P2
**Provenance:** BL-015 (`blader/SKILL.md:233-240`); AW-040 (`avoid-ai-writing/references/patterns.md:335-337`)
**What it looks like:** A string of present participles bolted onto a fact — "symbolizing the region's natural beauty, reflecting the community's deep connection to the land, showcasing…"; the declarative version without the -ing — "this represents a broader shift," "it speaks to a larger trend."
**Why it reads as AI:** The rider is bolted onto a simple fact to make it sound deeper. Attaching it to a named source doesn't make it true.
**Fix:** Keep the fact; keep the rider only when the source supports what it claims. Use a specific consequence only when the source supplies one; otherwise cut the unsupported gloss.
**Before:** "The temple's color palette of blue, green, and gold resonates with the region's natural beauty, symbolizing Texas bluebonnets, the Gulf of Mexico, and the diverse Texan landscapes." **After:** "The temple is painted blue, green, and gold, colors meant to evoke Texas bluebonnets and the Gulf of Mexico." (`blader/SKILL.md:238-240`)
**Carve-outs (do not flag when):** None stated beyond source support — a rider attributed to a named person still needs the source to back the claim, not just the attribution.

## EN-009 — Sales language and promotional copy

**Severity:** P2
**Provenance:** BL-016 (`blader/SKILL.md:242-249`); AW-041, AW-057 (`avoid-ai-writing/references/patterns.md:339-340, 403-407`)
**What it looks like:** "boasts," "vibrant," "nestled within the breathtaking region of," "a thriving ecosystem," "must-visit," "stunning"; launch-copy dramatic introductions — "Enter Flowdesk.", "Meet Flowdesk, your new favorite treasury dashboard", "Think Notion meets Figma".
**Why it reads as AI:** The text reads like an advertisement, especially for places, culture, products, or organizations, or introduces a product like a game-show contestant instead of saying anything about it.
**Fix:** State what the thing is, grounded in the source. Add capabilities or an audience only when the source supplies them.
**Before:** "Nestled within the breathtaking region of Gonder in Ethiopia, Alamata Raya Kobo stands as a vibrant town with a rich cultural heritage and stunning natural beauty." **After:** "Alamata Raya Kobo is a town in the Gonder region of Ethiopia." (`blader/SKILL.md:247-249`)
**Carve-outs (do not flag when):** "Groundbreaking" and "rich" keep their literal senses. "Say hello to X" and bare "Enter X." stay judgment-only — both are ordinary human prose in the right context (introducing a person, or a UI instruction like "Enter Password.").

## EN-010 — Borrowed authority and unnamed validation

**Severity:** P0
**Provenance:** BL-017 (`blader/SKILL.md:251-262`); AW-033, AW-038, AW-039 (`avoid-ai-writing/references/patterns.md:305-306, 325-333`)
**What it looks like:** "Experts believe," "Studies show," "observers have cited," "industry reports"; a list of prestige outlets ("cited in The New York Times, BBC, Financial Times, and The Hindu"); rapid-fire historical-analogy stacking ("like the printing press, the telegraph, and the internet before it"); an unnamed external authority paired with a generic superlative ("independent testing confirms," "analysts agree").
**Why it reads as AI:** A name or an unnamed authority stands in for what was actually said or shown. The reader can't tell who measured what, or go check.
**Fix:** When the source names the real source and what it said, use that. Otherwise cut the unsupported claim or the list. Never invent a source. Name the one analogy that does analytical work and say what it explains, or cut the montage.
**Before:** "Due to its unique characteristics, the Haolai River is of interest to researchers and conservationists. Experts believe it plays a crucial role in the regional ecosystem." **After:** "Researchers and conservationists study the Haolai River for its unusual characteristics." (`blader/SKILL.md:256-258`)
**Carve-outs (do not flag when):** A missing citation alone is not a tell; most writing is unsourced. Specifically attributed, checkable validation stays unflagged — a named benchmark, a linked report, a dated audit ("SOC 2 Type II, audited by Prescient Assurance").

## EN-011 — Knowledge-limit disclaimers and speculative gap-filling

**Severity:** P0
**Provenance:** BL-023 (`blader/SKILL.md:325-336`); AW-050, AW-051 (`avoid-ai-writing/references/patterns.md:372-376`)
**What it looks like:** "as of [date]," "up to my last training update," "while specific details are limited"; a guess dressed as background — "maintains a relatively low public profile," "likely began his career in," "appears to have studied."
**Why it reads as AI:** The text mentions where the model's knowledge ends, or hides a missing fact behind plausible-sounding filler instead of admitting the gap. Speculative gap-filling is worse than a bare disclaimer because the reader can't tell what's known from what's invented.
**Fix:** State what the source does not show, or remove the sentence. Never present a guess as a fact.
**Before:** "While specific details about the company's founding are not extensively documented in readily available sources, it appears to have been established sometime in the 1990s." **After:** "The company's founding date is not documented in the available sources." (or cut the sentence) (`blader/SKILL.md:329-332`)
**Carve-outs (do not flag when):** None — this category has no legitimate use in finished prose; the fix is always to state the gap plainly or cut it.

## EN-012 — Writing about the previous version / diff-anchored prose

**Severity:** P1
**Provenance:** BL-025 (`blader/SKILL.md:352-359`); AW-077 (`avoid-ai-writing/references/patterns.md:524-527`)
**What it looks like:** Documentation or a comment narrating what the text replaced instead of describing current behavior — "This function was added to replace the previous approach of iterating through all items, which caused O(n²) performance."
**Why it reads as AI:** An assistant writes docs in the context of the edit it just made, so the prose anchors to the diff instead of the artifact. A reader without the commit history gets archaeology, not documentation.
**Fix:** Describe current behavior using implementation and rationale already present in the source. Mention the previous version only in change logs, release notes, migration guides, and other documents about change.
**Before:** "This function was added to replace the previous approach of iterating through all items, which caused O(n²) performance." **After:** "This function uses a hash map for O(1) lookups, avoiding the O(n²) cost of naive iteration." (`blader/SKILL.md:355-358`)
**Carve-outs (do not flag when):** Documents that are inherently version-scoped — changelogs, release notes, migration guides, decision records — narrate change correctly and stay unflagged.

## EN-013 — Real/actual adjective inflation

**Severity:** P1
**Provenance:** AW-024 (`avoid-ai-writing/references/patterns.md:258-262`)
**What it looks like:** "Real on-chain tokenomics," "actual reward sustainability," "genuine utility," "true product-market fit" — `real`/`actual`/`genuine`/`true` used as an empty intensifier on an abstract noun.
**Why it reads as AI:** It implies the rest of the field is fake or superficial without naming what makes this instance the real one. Common where a writer wants to signal sophistication without evidence.
**Fix:** Drop the adjective when no contrast is named. Add a specific claim only when the source supplies it.
**Before:** "Real on-chain tokenomics" with no stated contrast (`avoid-ai-writing/references/patterns.md:259`) **After:** State the mechanism the source describes, or cut the adjective.
**Carve-outs (do not flag when):** A named contrast is honest, not empty — "Real on-chain settlement, not bridged IOUs" or "actual revenue from paying customers, not grants" names what the fake version would be.

## EN-014 — Moral-adjective category errors

**Severity:** P1
**Provenance:** AW-025 (`avoid-ai-writing/references/patterns.md:264-268`)
**What it looks like:** Moral or character adjectives (`honest`, `genuine`, `faithful`, `truthful`) glued onto non-agentic technical nouns (`shape`, `number`, `representation`, `curve`, `output`) — "an honest shape"; the passive adverb form ("flagged honestly," "described honestly") that hides there is no subject capable of honesty; "the assumption stops being true" (assumptions degrade in adequacy, they don't flip); gratuitous universal quantifiers ("taught in every first-year biochemistry course").
**Why it reads as AI:** The adjective cannot literally modify a non-agentic noun — it's a category error that borrows moral weight the sentence hasn't earned.
**Fix:** State a concrete property only when the source establishes it (`realistic`, `clearer` are valid replacements only when those are the intended properties). Cut empty moral adverbs from passive constructions ("flagged honestly" → "flagged" or "noted"). Replace a universal quantifier with the actual scope or drop it.
**Before:** "An honest shape" (`avoid-ai-writing/references/patterns.md:265`) **After:** Name the concrete property the source establishes, or cut the adjective.
**Carve-outs (do not flag when):** None stated beyond source support for a concrete replacement property.

## EN-015 — Transformation crutch

**Severity:** P2
**Provenance:** AW-026 (`avoid-ai-writing/references/patterns.md:270-273`)
**What it looks like:** Repeated unexplained relabeling across a passage — "the concern turns into panic," "a feature turns into a strategy," "the risk becomes real."
**Why it reads as AI:** The label claims a change happened without explaining what changed. Treat as a clarity judgment, not evidence of AI authorship.
**Fix:** Ask what changed. If the writer supplies the missing action, threshold, or consequence, use those facts; never invent a mechanism or actor.
**Before:** "The risk becomes real" with no stated threshold (`avoid-ai-writing/references/patterns.md:270`) **After:** Name the threshold or event that made the risk concrete, using only source-supplied facts.
**Carve-outs (do not flag when):** Literal transformations ("water turns into ice"), supported metaphors, and changes explained anywhere in the passage ("the queue turns into a bottleneck" after a stated capacity limit) pass. Deliberate summaries of already-explained changes pass too, including multiple summaries in one passage.

## EN-016 — False agency

**Severity:** P2
**Provenance:** AW-031 (`avoid-ai-writing/references/patterns.md:296-299`)
**What it looks like:** An obscured accountable decision-maker — "The decision emerged after the offsite" leaves unclear who made the choice.
**Why it reads as AI:** The passage attributes a consequential choice to an abstraction instead of naming who exercised judgment, when naming them would matter.
**Fix:** Name the actor only when the source identifies them ("The board decided after the offsite."). Otherwise ask who decided; do not invent "we," a team, or an interpreter for the data.
**Before:** "The decision emerged after the offsite." (`avoid-ai-writing/references/patterns.md:297`) **After:** "The board decided after the offsite." — only when the source names the board as decision-maker.
**Carve-outs (do not flag when):** Conventional personification ("the data shows adoption is early"), literal system behavior, and collective shorthand ("the market rewards shipping") are not hidden decision-makers by themselves.

## EN-017 — Speculative scenario openers

**Severity:** P2
**Provenance:** AW-043 (`avoid-ai-writing/references/patterns.md:345-348`)
**What it looks like:** "Imagine a world where…", "Picture a future in which…", "Envision a world where…" opening an argument with a hypothetical.
**Why it reads as AI:** The scenario does the persuading; no evidence is offered, just a list of desirable outcomes.
**Fix:** Cut the scene-setting and retain the source's claim at the same confidence. Add an effect only when the source supplies it.
**Before:** "Imagine a world where every deploy is instant." **After:** "Every deploy would be instant." (`avoid-ai-writing/references/patterns.md:347`)
**Carve-outs (do not flag when):** Fiction, a thought experiment with a stated payoff, and instructional "imagine you have a sorted array" (a teaching device pointing at a concrete example) are fine.

## EN-018 — False ranges

**Severity:** P2
**Provenance:** AW-044 (`avoid-ai-writing/references/patterns.md:350-351`)
**What it looks like:** Pairing unrelated extremes for false breadth — "from the Big Bang to dark matter," "from ancient civilizations to modern startups."
**Why it reads as AI:** It sounds sweeping but says nothing; the range is chosen for drama, not coverage.
**Fix:** List the actual topics, or pick the one that matters.
**Before:** "From ancient civilizations to modern startups" (`avoid-ai-writing/references/patterns.md:351`) **After:** Name the specific topics the passage actually covers.
**Carve-outs (do not flag when):** None stated — a genuine range grounded in the source's own scope is simply a scope statement, not this pattern.

## EN-019 — Dev-blog boilerplate slogans

**Severity:** P2
**Provenance:** AW-080 (`avoid-ai-writing/references/patterns.md:540-543`)
**What it looks like:** Stock simplicity claims from developer marketing — "batteries included," "it just works," "zero config," "sane defaults," "small enough to fit in your head."
**Why it reads as AI:** Each substitutes a slogan for a property you could demonstrate.
**Fix:** Name a concrete behavior only when the source supplies it — "zero config" may become "installs with no config file" when that equivalence is established. Otherwise cut the slogan or flag the missing detail.
**Before:** "It just works." with no supporting detail (`avoid-ai-writing/references/patterns.md:541`) **After:** State the specific behavior the source documents.
**Carve-outs (do not flag when):** Quoting a product's own tagline, or discussing the phrase itself. "Batteries included" specifically is judgment-only — a software slogan and literal package contents share the same surface form.

---

# B. Language

## EN-020 — Forced triads / colon into a triple

**Severity:** P2
**Provenance:** BL-006 (`blader/SKILL.md:139-149`); AW-012, AW-084 (`avoid-ai-writing/references/patterns.md:23, 557-559`)
**What it looks like:** Ideas arriving in threes to sound complete — one sentence ("innovation, inspiration, and insights"), three parallel examples, three short facts followed by a lesson, or a colon opening onto exactly three comma-separated items ("separate ports, processes, and local state").
**Why it reads as AI:** Three is the default rhythm a model reaches for whether or not the content actually has three parts.
**Fix:** Check that each item adds a distinct idea. Merge examples, develop the strongest one, or vary the structure when they don't. If there are really two things, or four, write that.
**Before:** "The event features keynote sessions, panel discussions, and networking opportunities. Attendees can expect innovation, inspiration, and industry insights." **After:** "The event includes talks and panels. There's also time for informal networking between sessions." (`blader/SKILL.md:143-145`)
**Carve-outs (do not flag when):** Keep three real items when the meaning needs three, or when the repetition serves an intentional rhetorical purpose. Noisy by design in technical writing, where three-item lists are often just true — weigh by genre, not per hit.

## EN-021 — Repeated sentence openings

**Severity:** P2
**Provenance:** BL-007 (`blader/SKILL.md:151-157`); AW-082 (`avoid-ai-writing/references/patterns.md:549-551`)
**What it looks like:** Three or more consecutive sentences opening on the same word or subject ("She noted the door. She noted the lock on it."), or the cousin form: consecutive sentences built on the same repeated skeleton ("A cart is an object in the system. A chat room is an object in the system.").
**Why it reads as AI:** Repetition is handled by rule instead of by ear.
**Fix:** Merge the sentences, change the subject, or begin with the action. Keep the first, vary or merge the rest.
**Before:** "She noted the door. She noted the lock on it. She filed both away." **After:** "She noted the door and its lock, then filed both away." (`blader/SKILL.md:155-157`)
**Carve-outs (do not flag when):** Do not ban the repeated word — a remaining sentence may still start with "She." Deliberate anaphora for rhythm ("She came. She saw. She conquered.") is a rhetorical device, not a tell. Pronoun-opener runs ("He… He… He…") are ordinary narration.

## EN-022 — Dashes as the universal connector

**Severity:** P2, weak alone
**Provenance:** BL-008 (`blader/SKILL.md:159-166`); AW-001 (`avoid-ai-writing/references/patterns.md:10`) — see `docs/CONFLICTS.md` C-01
**What it looks like:** Em dashes (—) or en dashes (–), including spaced dashes and double-hyphen substitutes (` -- `), used as the default connector between clauses instead of choosing how they relate.
**Why it reads as AI:** A dash lets the writer skip choosing how two clauses relate, so a model reaches for it everywhere. Score it as style-only (weight 0) — never as authorship evidence by itself, and never invert it into an authorship signal.
**Fix (merged rule):** Default: remove em/en dashes. Replace each with a comma, period, colon, or parentheses, or rewrite the sentence. **Voice-sample override:** if the writer supplies a writing sample and it uses dashes, match the sample's rate instead of removing them — the sample is dispositive over the numeric cap. **No-sample fallback (from AW):** target zero; hard max one per 1,000 words, applying to headings and section titles too. Leave dashes and hyphens inside code blocks, inline code, commands, paths, and URLs alone.
**Before:** "The new policy — announced without warning — affects thousands of workers." **After:** "The new policy, announced without warning, affects thousands of workers." (`blader/SKILL.md:164-166`)
**Carve-outs (do not flag when):** An em dash as the separator in a bulleted/numbered list item that opens with a bolded lead term or a markdown link (`- **Term** — description`) is typography, not a prose splice — don't count it toward the rate. A mid-sentence splice still counts, as does a line-initial `**Bold lead** — full sentence` outside a list, and the double-hyphen substitute is never carved out. One dash alone is *weak alone*; a text full of them is not.

## EN-023 — Stacked qualifiers and hedge-stacked predictions

**Severity:** P1, weak alone
**Provenance:** BL-009 (`blader/SKILL.md:168-175`); AW-010, AW-023, AW-065, AW-071 (`avoid-ai-writing/references/patterns.md:21, 254-256, 450-451, 482-488`)
**What it looks like:** "to be fair, it's also possible, could potentially, might arguably, in some cases it may"; a modal stacked with a hedge adverb ("could potentially create," "may eventually unlock," "might ultimately transform"); a parenthetical aside used to sound nuanced without committing ("(and, increasingly, Z)"); confidence-calibration phrases used to signal how the reader should feel instead of letting the fact speak ("It's worth noting that," "Interestingly," "Certainly," "Undoubtedly").
**Why it reads as AI:** Repeated editing adds one qualifier after another until every claim sounds uncertain, usually to repair an earlier overstatement rather than to report real doubt. Each hedge in a stack cancels the next, leaving a sentence that asserts nothing while sounding cautious.
**Fix:** Keep a qualifier only when the source supports it and the meaning needs it. In a stack, keep the one qualifier that retains the source's intended uncertainty. If an aside matters, give it its own sentence; if it doesn't, cut it.
**Before:** "It could potentially possibly be argued that the policy might have some effect on outcomes." **After:** "The policy may affect outcomes." (`blader/SKILL.md:173-175`)
**Carve-outs (do not flag when):** Keep scope statements, legal and safety notices, and real corrections. Ordinary hedges such as *perhaps* or *tends to* are human habits, not tells. One "notably" in a 2,000-word piece is fine — flag confidence-calibration phrases by density, not per instance.

## EN-024 — Hyphenated pairs and modifier stacking

**Severity:** P2, weak alone
**Provenance:** BL-010 (`blader/SKILL.md:177-184`); AW-048, AW-049 (`avoid-ai-writing/references/patterns.md:362-370`)
**What it looks like:** "third-party, cross-functional, client-facing, data-driven" hyphenated in every position regardless of grammar; stacked compound modifiers ("a high-quality, well-architected, future-proof solution"); welded-open noun phrases ("research-impact aggregator" for "research impact aggregator"); compounds whose standard form is one word left hyphenated ("code-base," "data-set," "time-frame," "road-map").
**Why it reads as AI:** These pairs get hyphenated in every position by rule, not by grammar.
**Fix:** Keep the hyphen before a noun when grammar needs it ("a high-quality report") and drop it after the noun ("the report is high quality"). For stacked modifiers, cut to the one that matters. Close compounds whose standard form is one word ("codebase," "dataset," "timeframe," "roadmap").
**Before:** "The team is cross-functional, the report is high-quality, and the methodology is data-driven." **After:** "The team is cross functional, the report is high quality, and the methodology is data driven." (`blader/SKILL.md:182-184`)
**Carve-outs (do not flag when):** Preserve established and technical compounds — "high-quality," "open-access," "third-party," "machine-readable," "server-side," "field-normalized," "family-owned" — before a noun. Spelling varies by dialect and house style; ambiguous pairs are judgment calls, not automatic rewrites.

## EN-025 — Passive voice and missing subjects

**Severity:** P2, weak alone
**Provenance:** BL-011 (`blader/SKILL.md:186-192`); AW-030 (`avoid-ai-writing/references/patterns.md:291-294`)
**What it looks like:** The subject dropped or the actor hidden — "No configuration file needed." "The results are preserved automatically." "Support for nested queries was added."
**Why it reads as AI:** The clipped no-subject form is a shape a model reaches for when compressing feature descriptions; the passive hides who does what.
**Fix:** Use active voice when it makes the actor and action clearer. Name the actor when the source identifies it and the actor clarifies the sentence; do not invent `you`, a team, or a system component.
**Before:** "No configuration file needed. The results are preserved automatically." **After:** "You do not need a configuration file. The system preserves the results automatically." (`blader/SKILL.md:190-192`)
**Carve-outs (do not flag when):** Terse reference registers where the fragment is the correct form — README feature lists, changelog entries, parameter docs, commit subjects ("No breaking changes"). A single deliberate fragment for emphasis is rhythm, not a tell.

## EN-026 — Avoiding is/are/has (copula avoidance)

**Severity:** P2
**Provenance:** BL-018 (`blader/SKILL.md:264-271`); AW-029 (`avoid-ai-writing/references/patterns.md:287-289`)
**What it looks like:** "serves as, stands as, functions as, operates as, marks, represents"; "boasts, features, offers, maintains"; "refers to" — simple verbs replaced with longer phrases that read like a press release.
**Why it reads as AI:** AI text avoids "is" and "has" by substituting fancier verbs.
**Fix:** Use *is*, *are*, and *has* unless a more specific verb genuinely adds meaning.
**Before:** "Gallery 825 serves as LAAA's exhibition space for contemporary art. The gallery features four separate spaces and boasts over 3,000 square feet." **After:** "Gallery 825 is LAAA's exhibition space for contemporary art. The gallery has four rooms totaling 3,000 square feet." (`blader/SKILL.md:269-271`)
**Carve-outs (do not flag when):** None stated beyond "unless a more specific verb genuinely adds meaning."

## EN-027 — Curly quotation marks and immaculate typography

**Severity:** P2, weak alone
**Provenance:** BL-021 (`blader/SKILL.md:304-310`); AW-005, AW-006 (`avoid-ai-writing/references/patterns.md:14-15`)
**What it looks like:** Curly quotes (" ") appearing where the writer or target format uses straight quotes; perfect spacing, punctuation, and capitalization in a context where humans type fast (issue/PR comments, chat, DMs).
**Why it reads as AI:** Most editors and platforms auto-curl quotes, so this is weak alone; both sources agree it's corroborating, never conclusive.
**Fix:** Replace with straight quotes in plain-text/code contexts; leave curly quotes in finished publications and locale-correct punctuation (French « », German „ "). When editing a human's casual text, preserve their typos, contractions, and idiosyncratic capitalization rather than correcting them — smoothing them erases the fingerprint that marks the text as theirs.
**Before:** "He said "the project is on track" but others disagreed." **After:** "He said \"the project is on track\" but others disagreed." (`blader/SKILL.md:308-310`)
**Carve-outs (do not flag when):** Don't flag curly apostrophes (U+2019) on their own. Word, Google Docs, macOS, and iOS curl quotes by default, so most human prose contains them too — a careful human can type a flawless comment, and a rushed one can type a sloppy one; judge alongside other signals.

## EN-028 — Hollow intensifiers and vague endorsement

**Severity:** P2
**Provenance:** AW-008, AW-009 (`avoid-ai-writing/references/patterns.md:19-20`)
**What it looks like:** `genuine`/`genuinely`, `real` (as in "a real improvement"), `truly`, `quite frankly`, `to be honest`, `let's be clear`, `it's worth noting that`, and `actually` when it only adds emphasis; vague endorsement that substitutes a thumbs-up for a reason — "worth reading," "worth a look," "worth checking out."
**Why it reads as AI:** These words dress up a claim without adding content, or recommend something without saying why.
**Fix:** The default fix for `actually` is deletion, not substitution: "This actually makes the process simpler" becomes "This makes the process simpler." State why something matters only when the source supplies that reason.
**Before:** "This actually makes the process simpler." (`avoid-ai-writing/references/patterns.md:19`) **After:** "This makes the process simpler."
**Carve-outs (do not flag when):** Keep `actually` when it marks a specific correction or expectation gap the sentence names ("we expected a cache hit; it was actually a miss"), though a direct contrast may still be clearer.

## EN-029 — Template phrases

**Severity:** P2
**Provenance:** AW-015 (`avoid-ai-writing/references/patterns.md:215-222`)
**What it looks like:** Slot-fill constructions where a blank noun or adjective would sound the same — "a [adjective] step towards [adjective] AI infrastructure"; "Whether you're [X] or [Y]"; "I recently had the pleasure of [verb]-ing."
**Why it reads as AI:** If a phrase has a blank where a noun or adjective could go and still sound the same, it's too generic to have been chosen for this sentence.
**Fix:** Use a capability, benchmark, or outcome already supplied; otherwise cut the empty modifier. Pick the audience you're actually addressing, or cut a false-breadth "whether you're X or Y." Just say what happened: "I talked to," "I read," "I attended."
**Before:** "I recently had the pleasure of attending the conference." **After:** "I attended the conference." (`avoid-ai-writing/references/patterns.md:222`)
**Carve-outs (do not flag when):** None stated — the slot-fill test itself is the carve-out check: if a different noun/adjective would sound equally natural, it's generic.

## EN-030 — Transition phrases to remove or rewrite

**Severity:** P2
**Provenance:** AW-016 (`avoid-ai-writing/references/patterns.md:224-232`)
**What it looks like:** "Moreover" / "Furthermore" / "Additionally"; "In today's [X]" / "In an era where"; "It's worth noting that" / "Notably"; "Here's what's interesting" / "Here's what caught my eye"; "In conclusion" / "In summary"; "When it comes to"; "At the end of the day"; "That said" / "That being said."
**Why it reads as AI:** These are mechanical connective tissue rather than a real transition earned by the content.
**Fix:** Restructure so the connection is obvious, or use "and," "also," "on top of that." Let the content signal its own importance instead of a reader-steering frame; if the source explains why a detail matters, lead with that explanation instead of inventing one. Your conclusion should be obvious without announcing it.
**Before:** "Moreover, the results were significant." **After:** "The results were also significant." or restructure so the connection is implicit.
**Carve-outs (do not flag when):** Don't overuse any single replacement connective either — variety in the fix matters as much as removing the original.

## EN-031 — Synonym cycling

**Severity:** P2
**Provenance:** AW-032 (`avoid-ai-writing/references/patterns.md:301-303`)
**What it looks like:** Rotating synonyms to avoid repeating a word in one paragraph — "developers… engineers… practitioners… builders."
**Why it reads as AI:** Human writers repeat the clearest word; forced variation reads as thesaurus abuse.
**Fix:** If the same noun or verb appears three times in a paragraph and it's the right word, keep all three.
**Before:** "Developers rely on this. Engineers depend on it. Practitioners can't work without it. Builders need it daily." (illustrative, humanizer-pro) **After:** "Developers rely on this every day."
**Carve-outs (do not flag when):** None stated — the rule is simply "keep the right word repeated" over forced variation.

## EN-032 — Filler phrases

**Severity:** P2
**Provenance:** AW-034 (`avoid-ai-writing/references/patterns.md:308-313`)
**What it looks like:** "It is important to note that," "In terms of," "The reality is that" — mechanical padding that adds words without meaning.
**Why it reads as AI:** The phrase carries no content; it only delays the actual sentence.
**Fix:** Just state it, or cut it. "In terms of" usually needs a rewrite, not a substitution.
**Before:** "It is important to note that the results were significant." **After:** "The results were significant." (`avoid-ai-writing/references/patterns.md:310`)
**Carve-outs (do not flag when):** "In order to," "Due to the fact that," and "At the end of the day" are covered by EN-030/the vocabulary tables — don't duplicate the finding under both rules.

---

# C. Structure

## EN-033 — Bold as decoration

**Severity:** P2
**Provenance:** BL-019 (`blader/SKILL.md:277-289`); AW-002 (`avoid-ai-writing/references/patterns.md:11`)
**What it looks like:** Words bolded without a reason; a vertical list where every item gets a bold label and a colon.
**Why it reads as AI:** Templates and visual editors also produce clean bold formatting; the tell is decoration on every item rather than emphasis on the one that needs it.
**Fix:** Remove the bold. One bolded phrase per major section at most, or none. Turn a labeled list into prose when the labels carry no information of their own — if something's important enough to bold, restructure the sentence to lead with it instead.
**Before:** "- **User Experience:** The user experience has been significantly improved with a new interface." **After:** "The update improves the interface, speeds up load times through optimized algorithms, and adds end-to-end encryption." (`blader/SKILL.md:284-289`)
**Carve-outs (do not flag when):** None stated beyond the one-bold-phrase-per-section guardrail.

## EN-034 — Decorative headings

**Severity:** P2
**Provenance:** BL-020 (`blader/SKILL.md:291-302`); AW-003, AW-047 (`avoid-ai-writing/references/patterns.md:12, 359-360`)
**What it looks like:** Headings that capitalize every main word ("Strategic Negotiations And Global Partnerships"); emojis or arrows (→) on headings or list items as decoration; a horizontal rule between every section; a top-level heading that repeats the document's own title.
**Why it reads as AI:** Title-case and emoji decoration are applied to every heading by rule.
**Fix:** Use sentence case. Remove the decoration and the rules. Let the title stand once.
**Before:** "## Strategic Negotiations And Global Partnerships" **After:** "## Strategic negotiations and global partnerships" (`blader/SKILL.md:295-297`)
**Carve-outs (do not flag when):** Social posts may use one or two emoji sparingly, at the end of a line, never mid-sentence. Title case only for the piece's main title, if at all — technical-context title-case flagging is suppressed per AW-047.

## EN-035 — A heading repeated in the first sentence

**Severity:** P2
**Provenance:** BL-024 (`blader/SKILL.md:338-350`)
**What it looks like:** A heading followed by a one-line paragraph that restates it before the real content begins — "## Performance / Speed matters. / When users hit a slow page, they leave."
**Why it reads as AI:** The warm-up sentence does the job the heading already did.
**Fix:** Remove the repeated sentence.
**Before:** "## Performance\n\nSpeed matters.\n\nWhen users hit a slow page, they leave." **After:** "## Performance\n\nWhen users hit a slow page, they leave." (`blader/SKILL.md:342-350`)
**Carve-outs (do not flag when):** None stated.

## EN-036 — Excessive structure and bullet-list overload

**Severity:** P2
**Provenance:** AW-004, AW-076 (`avoid-ai-writing/references/patterns.md:13, 518-522`)
**What it looks like:** More than 3 headings in under 300 words; 8+ bullet points in under 200 words where the material isn't genuinely list-shaped; formulaic section headers ("Overview," "Key Points," "Summary," "Conclusion," "Introduction") used as default scaffolding; a fragmented heading followed by a one-line warm-up restating it; bullet-heavy sections whose content is not genuinely list-like.
**Why it reads as AI:** The document is over-scaffolded relative to its length and argument.
**Fix:** Report the structural problem during ordinary cleanup. Merge sections, rename empty labels using the source's own subject matter, or convert to prose only when the user's scope permits restructuring.
**Before:** A 250-word section with 5 headings, each "Overview"/"Summary"-style. **After:** Merge into one or two sections using subject-specific headings, or flag the overstructuring if restructuring isn't in scope.
**Carve-outs (do not flag when):** Feature comparisons, step-by-step instructions, and API parameters stay as lists — this rule targets scaffolding density, not legitimate structure. See EN-038/EN-040 for the SEO/technical-list carve-out stated explicitly.

## EN-037 — Missing bridge sentences

**Severity:** P2
**Provenance:** AW-011 (`avoid-ai-writing/references/patterns.md:22`)
**What it looks like:** Paragraphs that don't connect to the one before — if they could be rearranged without the reader noticing, the through-line is missing.
**Why it reads as AI:** Each paragraph reads as a self-contained module with no load-bearing connection to its neighbors.
**Fix:** Report the missing through-line. Add connective tissue only when the relationship already exists in the source and the user's scope permits structural editing.
**Before:** Three paragraphs on unrelated sub-topics with no transitional claim between them (illustrative). **After:** Add a bridge sentence using a relationship the source already supports, or flag the gap.
**Carve-outs (do not flag when):** None stated — this stays judgment-only; a regex can't determine whether paragraph order matters.

## EN-038 — Bullet lists of bare noun phrases

**Severity:** P1
**Provenance:** AW-028 (`avoid-ai-writing/references/patterns.md:281-285`)
**What it looks like:** 5+ consecutive bullet items where each item is a short (≤6 word) adjective-plus-noun phrase with no verb — "Stable mining efficiency / Reliable pool connectivity / Optimized RandomX performance…"
**Why it reads as AI:** The tell is the symmetry — every item is the same grammatical shape and length, and none of them assert anything checkable. A genuine list of observations has varying length, occasional verbs, and at least one item that doesn't fit the pattern.
**Fix:** When structural editing is authorized, convert the list to prose or rewrite items as full claims using details the source provides — state the rate and measurement period if the source records them, don't invent them.
**Before:** "- Stable mining efficiency / - Reliable pool connectivity / - Optimized RandomX performance" (`avoid-ai-writing/references/patterns.md:282`) **After:** Convert to prose using the source's actual measured values, or leave as-is if it's genuinely the right form.
**Carve-outs (do not flag when):** Genuine list content — changelog entries, todo lists, parameter docs, ingredient lists — where bare noun phrases are the correct form. Ask whether the bullets are summarizing claims (rewrite) or enumerating items (leave).

## EN-039 — Inline-header list labels and list-label periods

**Severity:** P2
**Provenance:** AW-045, AW-046 (`avoid-ai-writing/references/patterns.md:353-357`)
**What it looks like:** A bullet list where each item's bold header repeats itself ("**Performance:** Performance improved by…"); a bold label ending in a period followed by a separate sentence where a human would use a colon (`**Intros.** Years of conferences…` instead of `**Intros:** years of conferences…`).
**Why it reads as AI:** The redundant label restates the point it's about to make; the period-instead-of-colon shape reads as a sentence the following clause then contradicts by continuing.
**Fix:** Strip the redundant label and keep the supplied point (converting the whole list to paragraphs needs structural scope). Fix the period to a colon and lowercase the start of the gloss, or drop the label and write the point as a plain sentence.
**Before:** "**Intros.** Years of conferences and operator network." **After:** "**Intros:** years of conferences and operator network." (`avoid-ai-writing/references/patterns.md:357`)
**Carve-outs (do not flag when):** When the label span is a full sentence on its own (not a label introducing a gloss), the period is correct. For the unbolded form, only flag when the leading fragment is clearly a label (a 1-4 word noun phrase, no verb) — a short complete sentence opening a bullet is fine.

## EN-040 — Numbered list inflation

**Severity:** P2
**Provenance:** AW-066 (`avoid-ai-writing/references/patterns.md:453-454`)
**What it looks like:** "Three key takeaways" / "Five things to know" / "Here are the top seven" defaulting to a numbered list because it's structurally safe.
**Why it reads as AI:** The count is chosen for the list shape, not because the source has that many discrete, parallel items.
**Fix:** Report padding during ordinary cleanup; remove or rebuild the list only when structural editing is authorized.
**Before:** "Here are the top seven things to know" padded to a round number. **After:** State the number of genuinely distinct, source-supported items.
**Carve-outs (do not flag when):** A numbered list is justified when the source genuinely has that many discrete, parallel items — API parameters, step-by-step instructions.

---

# D. Communication

## EN-041 — Chatbot residue and conversational leftovers

**Severity:** P0
**Provenance:** BL-022 (`blader/SKILL.md:316-323`); AW-036, AW-068, AW-070 (`avoid-ai-writing/references/patterns.md:318-320, 460-462, 474-480`)
**What it looks like:** "I hope this helps," "Of course!," "Certainly!," "Great question!," "You're absolutely right," "Would you like…?," "Should I continue?," "let me know," "here is a…"; sycophantic validation of the reader/questioner ("Excellent point!," "That's a really insightful observation"); acknowledgment loops that restate the prompt before answering ("You're asking about retries. Retries are how the client handles failures.").
**Why it reads as AI:** A chatbot's greeting, praise, offer, or closing remains in text that should stand on its own. It is the most certain tell in either catalog and the easiest to miss when it wraps real content.
**Fix:** Remove the wrapper and keep the content. The deletion test for acknowledgment loops: cut the opener — if the reply loses nothing, it was a loop.
**Before:** "Great question! Here is an overview of the French Revolution. It began in 1789… I hope this helps! Let me know if you'd like me to expand on any section." **After:** "The French Revolution began in 1789 when a financial crisis and food shortages led to widespread unrest." (`blader/SKILL.md:321-323`)
**Carve-outs (do not flag when):** Replies that orient the reader to which question is being answered stay ("To answer your question from Tuesday: the invoice went out on the 3rd") — email, support, and docs replies open this way on purpose. Sycophancy is distinct from chatbot artifacts: chatbot residue performs helpfulness broadly, sycophancy specifically validates the reader.

## EN-042 — Recap-flattery opener

**Severity:** P2
**Provenance:** AW-075 (`avoid-ai-writing/references/patterns.md:511-516`)
**What it looks like:** Replying to a person by summarizing their own work back at them with praise before getting to the point — "Thanks for all the legwork here — the migration script and the rollback plan you worked through are what made this possible."
**Why it reads as AI:** The reader already knows what they did; the recap performs appreciation instead of conveying information.
**Fix:** Cut the recap and keep any thanks or substantive response the source already contains. Do not add agreement, a review judgment, or promised comments merely to replace the opener.
**Before:** "Thanks for all the legwork here — the migration script and the rollback plan you worked through are what made this possible." (`avoid-ai-writing/references/patterns.md:512`) **After:** State the substantive response directly; keep a short, genuine thanks if the source has one.
**Carve-outs (do not flag when):** A genuine thank-you that's short and moves on is not this pattern — the tell is the *recap* of specifics the other person already knows, not gratitude itself.

## EN-043 — Rhetorical question openers (English only)

**Severity:** P2
**Provenance:** AW-064, AW-081 (`avoid-ai-writing/references/patterns.md:447-448, 545-547`) — scope per `docs/CONFLICTS.md` C-02
**What it looks like:** "But what does this mean for developers?" / "So why should you care?" / "What's next?" stalling before the actual point; two or more questions fired in a row, often fragments after the first ("Do I know how it works? Where it breaks? Which corners it cut?").
**Why it reads as AI:** The question stalls before the point instead of making it, or performs curiosity through a chain of fragments.
**Fix:** State an answer only when the source supplies one; otherwise cut an empty transition or leave an open question open. Keep at most one question in a stack and use answers already supplied.
**Before:** "But what does this mean for developers? It means faster builds." **After:** "This means faster builds for developers." (illustrative, humanizer-pro, adapted from `avoid-ai-writing/references/patterns.md:448`)
**Carve-outs (do not flag when):** Rhetorical questions are earned by strong setup, not dropped as section transitions — a single well-set-up question stays. Interviews, FAQs, and dialogue stack questions legitimately. **This rule applies to English text only** — Arabic-language varieties treat the *absence* of rhetorical questions as the tell and are governed by a separate, language-scoped reference; do not apply this rule to non-English text.

## EN-044 — Stock reaction framing

**Severity:** P2
**Provenance:** AW-060 (`avoid-ai-writing/references/patterns.md:427-432`)
**What it looks like:** "What surprised me most," "I was fascinated to discover," "What struck me was," "The most interesting part," or the bare section-header variant ("Interesting part of the project:").
**Why it reads as AI:** These function as generic list introductions or significance pre-announcements when the sentence would say the same thing without them. Treat as a **style heuristic, not an authorship signal** — the source corpus produces no reliable detector hits for this category in either direction.
**Fix:** Fix only the empty frame. If the reaction adds nothing, lead with the source's concrete fact. If the source supplies the expectation and reason, a specific form ("I expected X; the 40% drop surprised me because Y") can preserve the reaction.
**Before:** "What surprised me most was the drop in latency." (with no stated expectation) **After:** "I expected the change to have no effect; latency dropped 40% instead." — only when the source supplies the expectation and number.
**Carve-outs (do not flag when):** "I was surprised" is not a machine tell by itself. Keep authentic, specific reactions — a rewrite must not replace a named emotion with theatrical body language just to satisfy "show, don't tell."

---

# E. Meta

## EN-045 — Reasoning chain artifacts

**Severity:** P2
**Provenance:** AW-067 (`avoid-ai-writing/references/patterns.md:456-458`)
**What it looks like:** "Let me think step by step," "Breaking this down," "To approach this systematically," "Step 1:," "Here's my thought process," "Working through this logically"; numbered reasoning steps that read like an internal monologue rather than an argument meant for an audience.
**Why it reads as AI:** These are artifacts of chain-of-thought reasoning leaking into published prose — drafting scaffolding that was never meant for the reader.
**Fix:** Cut local scaffolding while preserving the supplied reasoning. Reordering the conclusion and evidence requires structural scope.
**Before:** "Let me think step by step. First, let's consider the cost. Second, the timeline. So the answer is X." **After:** "X, given the cost and timeline." (illustrative, humanizer-pro, adapted from `avoid-ai-writing/references/patterns.md:457`)
**Carve-outs (do not flag when):** None stated — this category has no legitimate use in finished, reader-facing prose (as distinct from a deliberately shown worked-example in instructional content, which is not scaffolding leakage).

---

# F. Structural detection

## EN-046 — Rhythm and uniformity

**Severity:** P2
**Provenance:** AW-086, AW-017, AW-019 (`avoid-ai-writing/references/patterns.md:235, 237, 573-584`)
**What it looks like:** A run of similarly shaped sentences where the rhythm sounds accidental; repeated same-size paragraphs whose boundaries don't follow the argument; text that reads flawlessly aloud like text-to-speech, with no resistance; suspiciously clean grammar with none of a writer's natural irregularities (fragments, sentences starting with "And" or "But," comma splices for effect) sanded away.
**Why it reads as AI:** AI text is metronomic; human text has varied rhythm. Structural regularity can matter more than any single vocabulary swap.
**Fix:** Vary sentence rhythm by clarifying the source, not by imposing word-count bands, adding questions, or chopping sentences into fragments. Adjust paragraph boundaries around source-supported ideas rather than imposing short/long quotas. Don't sand away all personality in pursuit of clean prose — over-polishing can push human writing *toward* AI statistical profiles.
**Before:** A passage where every sentence runs 15-20 words with no variation (illustrative). **After:** Vary length by clarifying or combining ideas the source supports, not by mechanically alternating short and long.
**Carve-outs (do not flag when):** Keep a regular structure when the genre, source voice, or content calls for it — regularity alone does not authorize a rewrite or establish authorship. Preserve first person, opinions, preferences, and reactions when the source contains them; their absence is not a finding by itself.

## EN-047 — Vocabulary diversity (TTR)

**Severity:** P2
**Provenance:** AW-087 (`avoid-ai-writing/references/patterns.md:586-592`)
**What it looks like:** In pieces of 200+ words, a low type-token ratio (distinct word types ÷ total tokens). Human prose at this length usually lands around **0.50–0.65**; AI text trends flatter, sometimes drifting under **0.40** when the model locks onto a small vocabulary loop.
**Why it reads as AI:** A flat, repetitive vocabulary loop is a classical stylometric signal.
**Fix:** Use specific things and cases already present in the source rather than thesaurus-ing the text. Repeat a technical term when it's the accurate term.
**Before:** N/A — this is a whole-document measurement, not a sentence-level before/after.
**Carve-outs (do not flag when):** A very low TTR is not by itself proof of AI authorship — narrow topics, technical reference material, and second-language writing all legitimately compress vocabulary. Only worth a second look on general prose over ~200 words where you'd expect range.

## EN-048 — Paragraph-reshuffle immunity

**Severity:** P2
**Provenance:** AW-088 (`avoid-ai-writing/references/patterns.md:594-596`)
**What it looks like:** A writer-side diagnostic, not a regex: can you swap two body paragraphs without breaking the piece? If order doesn't matter, it's a list of points, not an argument that builds.
**Why it reads as AI:** AI prose often fails this test — each paragraph is a self-contained module with no load-bearing connection to its neighbors.
**Fix:** Report the diagnosis during ordinary cleanup. Establish a through-line, reorder paragraphs, or convert to a list only when the user's scope permits restructuring, using relationships already supported by the source.
**Before:** N/A — structural test, not a sentence-level edit.
**Carve-outs (do not flag when):** None stated — this is diagnostic, not a mechanical rule; a genuinely list-shaped argument (where order doesn't matter) may be correctly a list, not a failed essay.

## EN-049 — Treadmill effect / low information density

**Severity:** P2
**Provenance:** AW-089 (`avoid-ai-writing/references/patterns.md:598-600`)
**What it looks like:** Another writer-side test: for each paragraph, ask "what's actually new here?" AI prose frequently restates the premise in fresh words instead of advancing it — lots of motion, no distance covered. The tell is that you could cut 40-60% and lose no information.
**Why it reads as AI:** Restating instead of advancing is a low-information-density pattern typical of filler-generation.
**Fix:** For each paragraph, identify the fact, claim, or turn it contributes. A targeted cleanup may remove local throat-clearing; substantial condensation requires user scope broad enough for structural editing.
**Before:** N/A — structural/content test, not a sentence-level edit.
**Carve-outs (do not flag when):** None stated — this is diagnostic; a paragraph that's deliberately restating for pedagogical reinforcement should be judged against that intent, not mechanically flagged.

---

# G. Tool fingerprints

## EN-050 — Chatbot citation markup and AI-tool URL parameter leaks

**Severity:** P1
**Provenance:** AW-053, AW-054 (`avoid-ai-writing/references/patterns.md:382-389`)
**What it looks like:** Internal citation tokens leaking from chat UIs — `citeturn0search0`, `contentReference[oaicite:0]{index=0}`, `oai_citation`, `[attached_file:1]`, `grok_card`; AI-tool tracking parameters surviving copy-paste into a URL — `utm_source=chatgpt.com`, `utm_source=copilot.com`, `utm_source=claude.ai`, `utm_source=perplexity.ai`, `referrer=grok.com`.
**Why it reads as AI:** These are not patterns — they are fingerprints. Their presence is essentially proof the text was generated by a specific chat tool and pasted without cleanup, regardless of what the surrounding text reads like.
**Fix:** Strip every markup token mechanically. For URLs, strip only the AI-referrer tracking parameter and leave the rest of the query string alone — a functional parameter (`?page=2`, `?v=4`) is not evidence of anything. If the source or user supplies the intended reference, insert it; otherwise flag the citation gap rather than fabricating one.
**Before:** "The results were strong[oai_citation:https://example.com/?utm_source=chatgpt.com]." **After:** "The results were strong (https://example.com/)." (illustrative, humanizer-pro, adapted from `avoid-ai-writing/references/patterns.md:383-389`)
**Carve-outs (do not flag when):** None — worth catching even when nothing else in the text reads as AI; the token itself is enough. Don't try to humanize the markup, just remove it.

## EN-051 — Unfilled placeholders

**Severity:** P1
**Provenance:** AW-052 (`avoid-ai-writing/references/patterns.md:378-380`)
**What it looks like:** Bracketed slot-fillers meant to be replaced before publishing — `[Your Name]`, `[INSERT SOURCE URL]`, `[Describe the specific section]`, `2025-XX-XX`, `<!-- Add citation if available -->`.
**Why it reads as AI:** Near-definitive evidence that AI-generated boilerplate was pasted without editing. Humans use placeholders in templates too, but rarely ship them.
**Fix:** Fill only with content the user supplies, or flag the missing value and leave or delete the surrounding sentence as the authorized scope permits.
**Before:** "Contact us at [INSERT EMAIL HERE] for more information." **After:** Fill with the source-supplied address, or flag the gap — never invent one. (`avoid-ai-writing/references/patterns.md:379`)
**Carve-outs (do not flag when):** Preserve placeholders in templates and drafts where they are intentional — a template file is supposed to have them.

---

# H. Conversational register

## EN-052 — Hashtag stuffing

**Severity:** P0 (profile-dependent — extra strict on LinkedIn/investor-email, skip on docs/casual)
**Provenance:** AW-027 (`avoid-ai-writing/references/patterns.md:275-279`)
**What it looks like:** Long trailing hashtag blocks (6+ hashtags on a single short post), usually mixing a project-specific tag with broad category tags (#AI #Crypto #Web3 #Innovation #FutureTech #Technology).
**Why it reads as AI:** LinkedIn and X organic engagement plateaus or declines past 3-5 tags; human posts that exceed 5 are usually launch posts trading reach for engagement, while LLM-generated posts default to 10-15.
**Fix:** 2-3 specific tags max, or none. If a hashtag wouldn't help a reader find related work, it's filler.
**Before:** "#AI #Crypto #Web3 #Innovation #FutureTech #Technology" (`avoid-ai-writing/references/patterns.md:276`) **After:** Keep only the 2-3 tags specific enough to aid discovery; drop the categorical ones.
**Carve-outs (do not flag when):** A `#` in technical prose is usually not a tag — issue/PR references (`#88`), hex colors (`#1a2b3c`), C preprocessor directives (`#include`), URL fragments, Markdown headings, and code spans are all subtracted before the threshold applies.

## EN-053 — Fake-casual register and infomercial engagement hooks

**Severity:** P2
**Provenance:** AW-058, AW-056 (`avoid-ai-writing/references/patterns.md:398-401, 409-419`)
**What it looks like:** Punchy fragment-hooks that tee up a reveal — "The catch?," "The kicker?," "But here's the kicker:," "Plot twist:," "The result?"; the fake-candid register version — "Honestly?," "Look,," "Real talk:"; a closed set of casual-register props: one-word verdict closers ("wild." / "insane."), stage directions ("*checks notes*", "*chef's kiss*"), wink asides ("(yes, really)"), label-prefix openers ("hot take", "pro tip", "PSA"), "because of course it does," the self-QA volley ("Is it fast? Yes. Is it cheap? Also yes.").
**Why it reads as AI:** These fake momentum and manufacture suspense around ordinary information — the drama is outsourced to the prop instead of carried by the content. A post can clear every vocabulary tier and still be wearing this costume.
**Fix:** Delete the hook and state the thing — "The catch? It only works on weekends." becomes "It only works on weekends." Delete the label, wink, or stage business and keep the source's observation. Replace a verdict word with a specific surprise only when the source supplies it.
**Before:** "The catch? It only works on weekends." **After:** "It only works on weekends." (`avoid-ai-writing/references/patterns.md:400`)
**Carve-outs (do not flag when):** A writer whose established voice runs on these props keeps them — the tell is *imposed* casualness, not a ban on playfulness. "Honestly" or "look" mid-sentence in casual prose is ordinary English and stays unflagged.

## EN-054 — Wall-of-text replies

**Severity:** P2
**Provenance:** AW-074 (`avoid-ai-writing/references/patterns.md:504-509`)
**What it looks like:** In conversational registers (issue/PR comments, chat, DMs, casual email), a reply-length text (roughly under 150 words) with four or more sentences delivered as one unbroken paragraph, with no line break anywhere.
**Why it reads as AI:** Humans break a reply at thought boundaries — one idea, then a break, then the next. LLMs default to a single dense block regardless of length.
**Fix:** Report the missing breaks during ordinary cleanup. Break at thought boundaries already present in the source; do not impose a fixed paragraph pattern.
**Before:** A four-sentence GitHub issue reply with zero line breaks (illustrative, adapted from `avoid-ai-writing/references/patterns.md:505-507`). **After:** Break at the natural idea boundaries the source already has.
**Carve-outs (do not flag when):** A single dense paragraph is the *correct* shape in formal, long-form registers — a blog intro, a docs paragraph, a deliberately tight one-paragraph email. Never flag continuous long-form prose just because it lacks internal breaks; this rule fires only in conversational reply registers.

## EN-055 — Social endorsement closers

**Severity:** P1
**Provenance:** AW-059 (`avoid-ai-writing/references/patterns.md:421-425`)
**What it looks like:** The curatorial sign-off LinkedIn/X posts append when sharing something — "This one is worth your time:," "I highly recommend giving this a read.," "Don't sleep on this one.," "Bookmark this.," "Trust me, you'll want to read this."
**Why it reads as AI:** It performs a recommendation without giving the reader a reason to click — the endorsement is generic and demonstrative-anchored ("THIS one is worth your time"), so it could sit under any link.
**Fix:** Use a reason or audience only when the source already supplies one, then drop the generic CTA. If the source gives no specific reason, the share doesn't need a sign-off — let the link stand on its own.
**Before:** "This one's a must-read: [link]" with no stated reason (`avoid-ai-writing/references/patterns.md:422`) **After:** Lead with the specific reason the source supplies, or drop the sign-off entirely.
**Carve-outs (do not flag when):** Distinct from the bare "worth [verb]ing" word-table entry (a single weak word inside a sentence, EN-028) and from infomercial engagement hooks (EN-053, mid-flow teasers) — this is specifically the whole closing line of a social post.
