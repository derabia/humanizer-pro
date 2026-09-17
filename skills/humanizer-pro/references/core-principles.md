# Core principles

Shared philosophy behind every mode, language, and dialect in humanizer-pro.
Read this before `modes.md`, `voice-matching.md`, or `seo-mode.md` — it sets
the constraints those files inherit.

## Why AI text reads as AI

A language model writes whatever is most likely to come next, so by default
it picks the choice that fits the widest range of readers and subjects. A
human writer chooses for one reader and one subject, so their choices are
uneven and specific (`_sources/blader/SKILL.md:17`). Five shapes follow:
staging instead of stating, rhythm applied by rule instead of by ear,
ordinary facts inflated toward significance, formatting applied uniformly
instead of purposefully, and leftover chat/drafting artifacts never meant
for the reader (`_sources/blader/SKILL.md:19-23`).

avoid-ai-writing frames the same idea from the audit side: these patterns
are "statistically more common in LLM output," not proof of authorship —
"humans on autopilot... produce the same shapes"
(`_sources/avoid-ai-writing/SKILL.md:19`). Treat every pattern as a signal
to weigh, not a verdict to hand down.

## Meaning preservation over detector evasion

The goal is never to defeat a detector. It is prose that reads like the
person who should have written it, with everything they meant to say intact.
avoid-ai-writing's "Never inject these" section names the failure mode
directly: an independent stress test of `blader/humanizer` found rewrites
that replaced "generic AI phrasing with a recognizable *humanizer* voice of
fragments and staccato rhythm" — "a new fingerprint, not the absence of one"
(`_sources/avoid-ai-writing/SKILL.md:301`). Do not chase a score. Chase
fidelity to what the source actually says, in a voice that actually fits it.

Removing tells is half the job. blader states the other half plainly: "the
result must still sound like a person" (`_sources/blader/SKILL.md:44`).
avoid-ai-writing agrees: a rewrite that clears every flag but erases the
source's cadence, stance, or idiosyncrasies "has failed to preserve its
voice" (`_sources/avoid-ai-writing/SKILL.md:291`).

## Never invent

No mode, no language, no voice profile overrides this. Do not add:

- **Facts, numbers, dates, names, quotes, or citations** not supplied by
  the source or an explicit user correction (`_sources/blader/SKILL.md:36`;
  `_sources/avoid-ai-writing/SKILL.md:61-64`).
- **Statistics or research findings** without a source the user or the
  document supplies (see "Drop unsourced research claims" below).
- **Speaker experience, stance, or credentials** — "in my experience,"
  "I've seen this a hundred times," a claimed credential, or a first-person
  reaction the source never expressed
  (`_sources/avoid-ai-writing/SKILL.md:303`).
- **Sources or experts** — an unnamed "experts say" or a borrowed citation
  list is fabrication dressed as authority (`_sources/blader/SKILL.md`
  §17, `docs/inventory/blader.md:247-254`).

If a sentence needs a detail that is not available, ask for it or write a
simpler sentence — never guess and present the guess as fact
(`_sources/blader/SKILL.md:35`; `_sources/avoid-ai-writing/SKILL.md:309`).
Fiction is the one named exception, since invented detail is the task
(`_sources/blader/SKILL.md:35`).

**If the draft lacks substance, say so.** A thin draft is not humanizer-pro's
problem to solve by padding it. When a passage has no real content to
preserve, or a request would require inventing the missing substance, name
the gap instead of filling it with confident-sounding filler — the same
direction as blader's "Knowledge-limit disclaimers and guesses": state what
the source does not show, or cut the sentence, never fill the gap with a
guess (`_sources/blader/SKILL.md` §23).

## Drop unsourced research claims carried in from upstream

Both upstream repos state real, cited statistics (e.g. false-positive rates
on non-native writers, Liang et al., *Patterns* 2023,
`_sources/avoid-ai-writing/SKILL.md:19`) alongside unsourced ones. Carry
forward only the cited ones, and only with their citation attached.

Do **not** repeat, in any humanizer-pro reference or output:

- "People who judge by feel do little better than chance" and "human
  writing keeps absorbing AI habits" — asserted with no source
  (`_sources/blader/SKILL.md:362`; `docs/inventory/blader.md` §6).
- The Arabic-inventory statistics flagged unsourced in
  `docs/inventory/semitic.md` §8 (BLEU-score claims, "95% vs 38%"
  syntactic-template claims, "3,000+ Turkish borrowings," numeric
  thresholds given without a corpus or method).
- Any tiered-vocabulary ratio (e.g. "5-20x") its own source flags as
  unverified (`docs/inventory/avoid-ai-writing.md:1023`).

A useful but uncited upstream heuristic can be kept, reframed as a house
convention rather than a finding — the same move avoid-ai-writing uses for
its own self-measured defaults (`docs/inventory/avoid-ai-writing.md:1025`).

## The editing contract, in one paragraph

A candidate match is text worth checking. It becomes a finding only after
the rule's pass conditions, exceptions, and surrounding meaning are read. A
finding becomes an edit only when the user's requested mode and scope
authorize one — detection alone never authorizes rewriting
(`_sources/avoid-ai-writing/SKILL.md:33-37`). Protected content (quotations,
code, tables, URLs, paths, identifiers, frontmatter) keeps its content
during ordinary cleanup regardless of mode
(`_sources/avoid-ai-writing/SKILL.md:71-76`).

## When not to act

Leave a tell alone inside a quotation, a title, a proper name, or a passage
that discusses the phrase rather than uses it. Salutations and sign-offs
predate chatbots. A single weak-alone tell needs company from other tells
before it becomes a finding (`_sources/blader/SKILL.md:361-362`). Preserve
the details that carry the writer's voice — a specific unusual detail,
mixed feelings, a dated reference, a defensible first-person choice, a
genuine aside — unless they actively hurt the meaning
(`_sources/blader/SKILL.md:364-370`).

## Provenance

See `docs/provenance/modes-voice-seo.md` for the section-by-section source
map and `docs/discrepancies/modes-voice-seo.md` for resolved conflicts.
