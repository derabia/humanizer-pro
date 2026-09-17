# Provenance: modes, voice-matching, seo-mode, core-principles

Section-by-section source map for the four reference files written by this
pass. Format: section → repo/file:line (or `origin: humanizer-pro`) →
rationale.

## `references/core-principles.md`

| Section | Source | Rationale |
|---|---|---|
| Why AI text reads as AI | `_sources/blader/SKILL.md:17-23` + `_sources/avoid-ai-writing/SKILL.md:19` | blader's five-shape taxonomy is the more structured framing; avoid-ai-writing's "signal, not proof" framing added to prevent detector-evasion misreading. |
| Meaning preservation over detector evasion | `_sources/avoid-ai-writing/SKILL.md:301` ("Never inject these" intro) + `_sources/blader/SKILL.md:44` | Both sources converge on the same warning independently; quoted both to show it's not one repo's opinion. |
| Never invent | `_sources/blader/SKILL.md:35-36` + `_sources/avoid-ai-writing/SKILL.md:61-64,303,309` | Merged anti-fabrication language; avoid-ai-writing's list (fabricated perspective, manufactured stakes, invented specifics) is the more exhaustive enumeration, blader's "ask for it or write a simpler sentence" is the more actionable instruction. |
| If the draft lacks substance, say so | `_sources/blader/SKILL.md` §23 (knowledge-limit disclaimers) | Generalized from the knowledge-limit-disclaimer pattern to a standing principle per the build prompt's explicit requirement. |
| Drop unsourced research claims | `docs/inventory/blader.md` §6, §9 point 2 + `docs/inventory/semitic.md` §8 + `docs/inventory/avoid-ai-writing.md:1023` | Directly implements the build prompt's instruction not to repeat "people judge little better than chance" or similar; cites the inventory sections that already did this verification work. |
| The editing contract | `_sources/avoid-ai-writing/SKILL.md:33-37,71-76` | Verbatim contract; no equivalent exists in blader (blader has no scope/protection framework, only a File mode note). |
| When not to act | `_sources/blader/SKILL.md:361-370` | Verbatim; avoid-ai-writing's equivalent ("self-reference escape hatch") is narrower (only about quoted examples of AI writing), so blader's broader list was used. |

## `references/modes.md`

| Section | Source | Rationale |
|---|---|---|
| `detect` contract | `_sources/avoid-ai-writing/SKILL.md:246-256` | avoid-ai-writing is the only upstream source with named modes; blader has no `detect` mode. |
| `rewrite` — Issues found | `_sources/avoid-ai-writing/SKILL.md:131,244` | Upstream reserves this section for an explicit "detailed audit" request; humanizer-pro makes it standard. See discrepancies log. |
| `rewrite` — Rewritten version | `_sources/avoid-ai-writing/SKILL.md:220-224` | Verbatim "never publish a first-pass draft" rule. |
| `rewrite` — What changed | `_sources/avoid-ai-writing/SKILL.md:132` | "Summarize when useful... omit for a no-op." |
| `rewrite` — Second-pass audit | `_sources/avoid-ai-writing/SKILL.md:125-128,226-228,234` + `_sources/blader/SKILL.md:33` | avoid-ai-writing's iterate-to-convergence budget supplies the mechanism and the four Verification items; blader's step 3 ("Check the draft... search for the five tells that most often survive a rewrite") supplies the concrete self-check content folded into the same step, per the build prompt's instruction to make this mandatory and adapt avoid-ai-writing's procedure "verbatim where possible." |
| `edit` contract | `_sources/avoid-ai-writing/SKILL.md:117-118,258-276` | Verbatim; blader's "File mode" (`_sources/blader/SKILL.md:47-48`) is a much thinner two-sentence rule folded into the extension note in `edit`'s refusal list, not separately cited since it adds no field beyond what avoid-ai-writing already specifies. |
| `seo` modifier | `origin: humanizer-pro` | No upstream equivalent; see `references/seo-mode.md` provenance below. |
| Report language table | `origin: humanizer-pro` | Arabic headings for five items given directly in the build prompt; the remaining four (Edits made, Verification, Protected spans, SEO check) are humanizer-pro's own translations, marked NATIVE-REVIEW for the same reason. |
| Manual fallback checklist | `_sources/avoid-ai-writing/detector/validate.js` checks (`docs/inventory/avoid-ai-writing.md:860-877`) + `_sources/blader/SKILL.md:33` | Restated as a human-executable checklist from the validator's error/warning table, plus blader's five-tells re-scan. |

## `references/voice-matching.md`

| Section | Source | Rationale |
|---|---|---|
| Sample-based calibration — What to analyze | `_sources/blader/SKILL.md:40-42` | Verbatim quote is the primary procedure per the build prompt's instruction ("blader's sample-based calibration procedure in full"). |
| Precedence | `docs/inventory/blader.md` §9 point 3 | The inventory's own analysis of how far "overrides the patterns below" reaches; cited rather than re-derived. |
| Minimum sample size | `docs/inventory/blader.md:369,394` | blader's README example ("2-3 paragraphs") is the only length signal in either source; presented as a practical floor, not a hard rule, since SKILL.md itself states no minimum. |
| Without a sample | `_sources/blader/SKILL.md:44` | Verbatim. |
| Named voice profiles | `_sources/avoid-ai-writing/references/patterns.md` (quoted in `docs/inventory/avoid-ai-writing.md:602-632`) | Verbatim, all five profiles, per the build prompt's "take definitions from avoid-ai-writing's voice profiles verbatim where names match." |
| How voice composes | `_sources/avoid-ai-writing/references/patterns.md` (quoted in `docs/inventory/avoid-ai-writing.md:602-656`) | Verbatim. |
| Calibrate to a sample (avoid-ai-writing's own version) | `_sources/avoid-ai-writing/references/patterns.md`, "Calibrate to a sample" | Quoted in full alongside blader's version to show the two sources agree; avoid-ai-writing's is used only to supply "contraction rate" as an added dimension folded into "word choice / lexicon." |
| Arabic samples | `origin: humanizer-pro` | No upstream Arabic voice-calibration content for user-supplied samples exists; `docs/inventory/semitic.md` §7 describes each dialect skill's own internal "Voice Calibration by register tier" sub-workflow (register tiers, not user-sample calibration), which is a different mechanism from what's built here. Digit convention and dialect-marker reading were added because `docs/inventory/semitic.md` §6 flags Arabic digit/punctuation convention as an unaddressed gap upstream — humanizer-pro fills it rather than leaving it silent. |

## `references/seo-mode.md`

| Section | Source | Rationale |
|---|---|---|
| Whole file | `origin: humanizer-pro` | Confirmed absent from both upstream repos (grep of both SKILL.md/patterns.md trees for SEO-related terms returns no relevant hits). |
| Heading hierarchy/text protection | `_sources/avoid-ai-writing/detector/validate.js` (`heading-count`, `heading-level`, `heading-text` — `docs/inventory/avoid-ai-writing.md:872-874`) | Validator already protects heading count/nesting as hard errors and wording as a warning; SEO mode cites and tightens this rather than inventing new heading-protection logic from scratch. |
| Links/URLs protection | `_sources/avoid-ai-writing/detector/validate.js` (`url-missing`, tracking-param stripping — `docs/inventory/avoid-ai-writing.md:870,879-884`) | Same reuse pattern: cite the existing hard protection, extend to anchor text which the base validator doesn't check. |
| Tables protection | `_sources/avoid-ai-writing/detector/validate.js` (`table-modified` — `docs/inventory/avoid-ai-writing.md:868`) | Already a hard-protected region; SEO mode adds it to its own list rather than re-specifying new table-diff logic. |
| Frontmatter/meta protection | `_sources/avoid-ai-writing/detector/validate.js` (`frontmatter-modified` — `docs/inventory/avoid-ai-writing.md:866`) | Same reuse pattern. |
| Validator contract shape (`{ok, errors[], warnings[], stats}`, exit codes) | `_sources/avoid-ai-writing/detector/validate.js` API (`docs/inventory/avoid-ai-writing.md:846-859,899-901`) | Intended `scripts/validate.js --seo` behavior modeled directly on the existing validator's shape and exit-code convention for consistency across the skill's scripts. |
| Stuffing-detection scope note | `docs/inventory/avoid-ai-writing.md` §15, Group C (skill-only judgment rules, e.g. promotional language) | Used as precedent for leaving stuffing detection to model judgment rather than the deterministic script, matching how avoid-ai-writing itself splits deterministic vs. judgment checks. |
