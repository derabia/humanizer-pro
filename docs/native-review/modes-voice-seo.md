# Native review queue: modes, voice-matching, seo-mode

All `<!-- NATIVE-REVIEW: ... -->` items introduced by this pass, grouped by
variety. None of these are load-bearing for the English-language content —
each is either a translated heading label or a single illustrative Arabic
example that a native reviewer should confirm before this skill ships.

## MSA (`msa`)

### 1. Report-heading translation table

- **File**: `skills/humanizer-pro/references/modes.md`
- **Section**: "Report language follows the request"
- **Excerpt**:
  | English | Arabic |
  |---|---|
  | Issues found | المشكلات المرصودة |
  | Rewritten version | النسخة المعدَّلة |
  | What changed | ما الذي تغيّر |
  | Second-pass audit | المراجعة الثانية |
  | Assessment | التقييم |
  | Score | النتيجة |
  | Edits made | التعديلات المنفَّذة |
  | Verification | التحقق |
  | Protected spans | المقاطع المحمية |
  | SEO check | فحص تحسين محركات البحث |
- **Uncertainty**: the first six rows (Issues found through Score) were
  given directly in the build prompt and are treated as approved wording.
  The last four (Edits made, Verification, Protected spans, SEO check) are
  humanizer-pro's own translations, not sourced from the build prompt or
  any upstream file, and have not been checked by a native speaker. In
  particular: "التعديلات المنفَّذة" (literally "the edits carried out") and
  "المقاطع المحمية" ("the protected passages/spans") are functional
  translations rather than established SEO/editing terminology in Arabic —
  a reviewer familiar with Arabic technical-writing conventions should
  confirm these read naturally as section headings rather than as
  translated English.

### 2. SEO worked example (Arabic)

- **File**: `skills/humanizer-pro/references/seo-mode.md`
- **Section**: "Examples" → "Arabic"
- **Excerpt**: `## أهمية التخزين المؤقت عند الحافة` (heading), target
  keyword "التخزين المؤقت عند الحافة" ("edge caching"), and the surrounding
  worked-example prose explaining why changing the heading to
  `## لماذا نهتم بالسرعة` drops the keyword checkpoint.
- **Uncertainty**: "التخزين المؤقت عند الحافة" is a literal technical
  translation of "edge caching" constructed for this example, not a term
  verified against real Arabic technical/SEO content or an existing glossary
  (`ar-vocabulary.md` or equivalent, being written concurrently by another
  agent, was not consulted for this term). A reviewer should confirm this is
  the term an Arabic-speaking SEO writer would actually target, or supply
  the conventional term if different.

## Egyptian (`egt`)

### 3. Voice-matching Arabic-sample illustration

- **File**: `skills/humanizer-pro/references/voice-matching.md`
- **Section**: "Arabic samples" → "Illustration"
- **Excerpt**: "مش عارف ليه بس حاسس إن ده مهم" (sample sentence), and the
  surrounding claim that this sentence demonstrates: short clauses, بس as a
  connector, ده as a demonstrative, Western digits, no tashkeel.
- **Uncertainty**: this sentence was constructed for this document as a
  plausible Egyptian colloquial example (informed by the marker-word lists
  in `docs/inventory/semitic.md` §5, e.g. بس/ده/مش attested there for
  Egyptian), not transcribed from a real user sample or verified against
  `ar-egt.md`'s pattern catalog directly. A native Egyptian-Arabic reviewer
  should confirm: (a) the sentence reads as natural Egyptian colloquial
  rather than a MSA-inflected approximation, and (b) the claimed features
  (بس as connector, ده as demonstrative) are accurately described.

## Summary

| Variety | Count | Files touched |
|---|---:|---|
| MSA | 2 | `modes.md`, `seo-mode.md` |
| Egyptian | 1 | `voice-matching.md` |
| **Total** | **3** | 3 reference files |

No Levantine, Gulf, or Hebrew native-review items were introduced by this
pass — `core-principles.md` contains no language-specific illustrative
content (it cites upstream English/Arabic sources but does not construct
new non-English examples of its own).
