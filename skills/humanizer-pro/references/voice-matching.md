# Voice matching

Two layers: a **sample-based calibration** procedure (from blader, full
detail) that runs whenever the user supplies a writing sample, and five
**named voice profiles** (from avoid-ai-writing, verbatim) that apply when
no sample is given. A sample always outranks a named profile. See
`core-principles.md` for the guardrails both layers share.

## Sample-based calibration (blader procedure, in full)

Quoted from `_sources/blader/SKILL.md:40-44` (§"Voice", inventoried in
`docs/inventory/blader.md` §5):

> "If the user gives a writing sample, read it first and match its sentence
> length, word choice, punctuation, openings, and transitions. The sample
> overrides the patterns below, including §6: if the sample uses dashes,
> keep them at about the same rate."

### What to analyze

Five explicit dimensions, read from the sample before touching the target
text:

1. **Rhythm / sentence-length spread** — blader's "sentence length";
   README's paraphrase calls this "rhythm"
   (`_sources/blader/README.md`, quoted in `docs/inventory/blader.md:400`).
   Note the mix of short and long sentences, not an average.
2. **Word choice / lexicon** — the sample's actual vocabulary register.
   "Don't 'upgrade' their vocabulary: if they write 'stuff' and 'things,'
   keep that register" (`_sources/avoid-ai-writing/references/patterns.md`
   §"Calibrate to a sample", quoted in full below).
3. **Punctuation habits, including dashes** — "if the sample uses dashes,
   keep them at about the same rate" (`_sources/blader/SKILL.md:42`). This
   is the flagship named example of the override; treat it as the strongest
   signal that the sample, not the pattern catalog, governs punctuation.
4. **Openings and transitions** — how sentences and paragraphs start.
5. **Deliberate quirks** — anything a careful reader would call a signature
   move rather than noise: a first-person choice the writer can explain, a
   genuine aside or self-correction, a dated or era-bound reference, an odd
   but specific detail (`_sources/blader/SKILL.md:364-370`, "When not to
   act" — the same list core-principles.md uses for what to preserve).

### Applying the sample

**Precedence.** "The sample overrides the patterns below" is unqualified in
the source — it is not scoped only to the rhythm-and-dash patterns; read
literally it can override any pattern in the catalog, including vocabulary
and formatting rules, if the sample itself exhibits that habit
(`docs/inventory/blader.md` §9, point 3). In practice: match the sample's
observed habits first; fall back to the pattern catalog only where the
sample is silent.

**Never overridden.** The sample governs *style*, never *content*. It never
authorizes inventing a fact, softening or hardening a claim's confidence
beyond what the source supports, or adding a quote, number, or credential
the source does not have. Protected content (code, tables, URLs, frontmatter,
quotations) stays protected regardless of what the sample looks like
(`core-principles.md`, "The editing contract").

### Minimum sample size

Neither source states a hard minimum. blader's SKILL.md does not specify a
length; its README's worked invocation suggests "2-3 paragraphs"
(`docs/inventory/blader.md:369`,`:394`). Treat 2-3 paragraphs as a practical
floor for reliable rhythm/lexicon signal, not a hard requirement — a shorter
sample still overrides on whatever dimensions it clearly demonstrates (e.g.
a two-sentence sample with three em dashes is still enough to set the dash
rate).

### Without a sample

Falls through to the genre-based default, quoted from
`_sources/blader/SKILL.md:44`:

> "Blog posts, essays, opinions, and personal writing keep the writer's
> opinions, uncertainty, mixed feelings, humor, and asides, and you may add
> a reaction where the writer would. Reference, technical, legal, and
> factual text stays neutral and plain."

Use a named voice profile (below) to make this concrete, or infer the
closer of the two registers from the input itself.

## Named voice profiles

Five profiles, taken verbatim from avoid-ai-writing
(`_sources/avoid-ai-writing/references/patterns.md`, quoted in
`docs/inventory/avoid-ai-writing.md` §7). All five names match the five
this skill exposes exactly — no name remapping was needed; see
`docs/discrepancies/modes-voice-seo.md` for the verification note.

Every target below is bounded by the "Never inject these" guardrails in
`core-principles.md`: a voice profile can bring out what the source already
has, never manufacture what it doesn't.

**`casual`** — "When explicitly requested, prefer contractions and direct,
conversational sentences; do not force fragments or a sentence-length
quota. When inferred, preserve the source's existing casual markers rather
than intensifying them. Keep first-person and concrete touches the source
establishes. Prefer everyday wording while retaining jargon the audience
needs. Keep meaningful warm hedges and cut corporate padding such as 'it's
worth noting.'" *Blog posts, social, community.*

**`professional`** — "Prefer active voice when the actor matters. Vary
accidental repetition without enforcing a sentence-length quota. Use
concrete claims when the source provides them; never invent a source behind
'experts say.' Keep an existing ask explicit. Cut empty hedging while
preserving real uncertainty." *LinkedIn, investor email, sponsor pitches.*

**`technical`** — "Prefer plain copulatives ('X is Y') over inflated
substitutes ('serves as,' 'stands as a testament to'). Separate ideas when
that improves comprehension, and use imperative mood for instructions when
it matches the source. Preserve accurate technical terms; define one on
first use only when the source supplies the definition or the user asks for
it. Tables and lists stay where the content is genuinely list-shaped."
*Docs, technical blog.*

**`warm`** — "Address the reader directly where the source already speaks
to them ('you'), and keep its acknowledgment rather than adding one. Cut
empty intensifiers while preserving the underlying degree. Avoid
performative-empathy openers ('I completely understand how you feel'). Use
an unhurried cadence without enforcing a sentence-length band."
*Mentorship, onboarding, thank-yous.*

**`blunt`** — "Lead with the claim; cut 'It's important to note that'
windups. Em-dashes are rare here; use periods for emphasis when the source
meaning permits it. Do not pad to hit a rule of three. Cut redundant hedge
stacks, but preserve modals and qualifiers that carry uncertainty,
conditions, or technical limits. Prefer direct sentences without
manufacturing staccato rhythm." *Decision memos, thought leadership, hard
feedback.*

**Voice is optional.** "If the writer doesn't name one, infer it from the
input's existing register and don't impose a persona on text that already
has one" (`_sources/avoid-ai-writing/references/patterns.md`, quoted in
`docs/inventory/avoid-ai-writing.md:604-608`).

**How voice composes with mode and context.** Apply context/mode rules and
each pattern's pass conditions first. An inferred voice does not reactivate
a category the mode or context skips. When applicable voice and context
rules set numeric thresholds for the same feature, use the stricter
threshold. Sensible default pairings: casual↔casual content, professional↔
LinkedIn/investor-email, technical↔docs/technical-blog
(`_sources/avoid-ai-writing/references/patterns.md`, "How voice composes
with context", quoted in full in `docs/inventory/avoid-ai-writing.md:602-656`).

**Calibrate to a sample, verbatim source of the rule above:**

> "If the writer gives you a sample of their own writing ('match my voice —
> here's a post'), analyze its sentence-length pattern, contraction rate,
> paragraph openings, and recurring word choices, then match those instead
> of a named profile. Don't 'upgrade' their vocabulary: if they write
> 'stuff' and 'things,' keep that register."
> (`_sources/avoid-ai-writing/references/patterns.md`)

Where blader and avoid-ai-writing both describe sample calibration, the two
procedures agree on substance (sentence length/rhythm, word choice,
punctuation/openings) and differ only in wording; blader's five-dimension
list (sentence length, word choice, punctuation, openings, transitions) is
used as the primary checklist above because it is the more explicit of the
two, with avoid-ai-writing's "contraction rate" and "recurring word choices"
folded into "word choice / lexicon."

## Arabic samples

`origin: humanizer-pro`. The same blader procedure applies to an Arabic
writing sample, with two additions specific to Arabic: **dialect markers**
and **digit convention** join the five dimensions above, because Arabic
text varies on axes English does not (MSA vs. Egyptian vs. Levantine vs.
Gulf/other; Arabic-Indic ٠١٢٣ vs. Western 0123 digits).

When a user supplies an Arabic sample, read it for:

1. **Dialect markers** — which variety's vocabulary and grammar the sample
   actually uses (see `ar-msa.md` / `ar-egt.md` / `ar-shami.md` for the
   marker-word inventories). A sample in Egyptian sets the target dialect
   for the rewrite even if the source text being humanized is in MSA;
   report this choice rather than silently switching dialects.
2. **Sentence rhythm** — same concept as English rhythm, but Arabic
   coordination (و، ف) and clause-chaining patterns differ from English
   sentence boundaries; read rhythm at the clause level, not just the
   period-to-period level.
3. **Digit convention** — Arabic-Indic vs. Western digits, and match
   whichever the sample uses consistently.
4. **Punctuation habits** — the sample's actual use of Arabic vs. Latin
   punctuation (، vs. `,`; ؟ vs. `?`), tashkeel/diacritic density if any,
   and any code-switching (Franco-Arabic/Arabizi, French loanwords in
   Levantine, English loanwords) the sample exhibits on its own.

As with the English procedure, the sample overrides dialect-pattern
guidance on these dimensions but never authorizes inventing content, and
protected spans stay protected regardless of dialect.

<!-- NATIVE-REVIEW: egt -->
**Illustration.** A user's Egyptian writing sample that consistently writes
"مش عارف ليه بس حاسس إن ده مهم" (short clauses, بس as a connector, ده as a
demonstrative, Western digits, no tashkeel) sets the target: keep clauses
short, keep بس over MSA لكن, keep ده/دي over MSA هذا/هذه, keep Western
digits, and do not introduce tashkeel the sample never uses — even though
`ar-egt.md`'s general guidance might otherwise be silent on digit choice for
a given passage.
<!-- /NATIVE-REVIEW -->

## Provenance and discrepancies

See `docs/provenance/modes-voice-seo.md` and
`docs/discrepancies/modes-voice-seo.md`.
