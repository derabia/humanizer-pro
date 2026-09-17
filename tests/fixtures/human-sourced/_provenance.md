# `tests/fixtures/human-sourced/` — provenance (IMP-02)

Every other Arabic human-style fixture in this repository was written by
this project and is marked `synthetic-human`
(`docs/native-review/fixtures.md`). The files here are different: they are
**sourced** human Arabic, published before 2022-11-30, reused under a
licence that permits it, with the exact revision recorded. They exist so
the false-positive side of the Arabic engine has at least one anchor that
nobody involved in building the engine wrote.

Each file carries a one-line header comment:

```
<!-- fixture: sourced-human ; variety: … ; source: <url> rev <id> ; licence: … ; cleanup: … -->
```

The test that uses them is in `tests/ar-detector.test.js`: every file here
must score below `THRESHOLDS.MIXED` (25) under **auto-routing**, with no
`--lang` and no `--variety` forced.

## Files

| file | variety | routed as | score | source | revision | date | licence |
|---|---|---|---|---|---|---|---|
| `msa-01.md` | msa | `ar` / `msa` | 0 | [دسوق, Arabic Wikipedia](https://ar.wikipedia.org/w/index.php?oldid=58641269) | 58641269 | 2022-07-09 | CC BY-SA 4.0 |
| `egt-01.md` | egt | `ar` / `egt` | 8 | [اللغه المصريه الحديثه, Egyptian Arabic Wikipedia](https://arz.wikipedia.org/w/index.php?oldid=6890147) | 6890147 | 2022-04-21 | CC BY-SA 4.0 |

Attribution, as CC BY-SA 4.0 requires for wiki reuse: the contributors of
Arabic Wikipedia and of Egyptian Arabic Wikipedia respectively, listed in
each linked revision's page history. Text reused under
<https://creativecommons.org/licenses/by-sa/4.0/>; these two files are
therefore themselves CC BY-SA 4.0, not MIT like the rest of the repository.
Anything derived from them onward carries the same licence.

### `msa-01.md`

- **Why this document.** It comes out of the IMP-01 control corpus
  (`corpus/manifest.json`, record `encyclopedic-39699.txt`, provenance class
  `featured`), so it is human-curated Arabic Wikipedia prose that the
  corpus measurement already saw. Featured status is the best available
  proxy for "not machine-translated and not bot-generated", which matters
  because Arabic Wikipedia contains plenty of both.
- **Score.** 0, with no issues at all, in both `plain` and
  `rendered-markdown` source modes.
- **Cleanup.** As recorded in the header: wikitext of the pre-cutoff
  revision through `action=parse&oldid`, then `cleanWikitext()` from
  `tools/fetch-corpus.js`, then trimmed at a paragraph boundary to the
  leading 600 Arabic words. See `corpus/README.md` for the full cleaner
  description.

### `egt-01.md`

- **Why this document.** Egyptian Arabic Wikipedia (`arz`) is largely
  bot-created stubs, so the pick had to be deliberate: this is one of a
  small number of `arz` articles long enough to score, on a subject
  (Egyptian Arabic itself) whose prose is actually written in the dialect,
  and its pre-cutoff revision was made by a human account (`Esperfulmo`),
  not a bot.
- **It does exercise the Egyptian engine.** Auto-routing resolves it to
  `variety: 'egt'`, so the Egyptian lexicon and the MSA-leakage signal both
  run against it. That was the reason for preferring it over shorter `arz`
  articles that resolve to `msa` and therefore would have tested nothing
  Egyptian at all. Three other `arz` candidates were scored and rejected on
  exactly that ground (ام كلثوم, اخناتون, احمد زويل all routed to `msa`).
- **Score.** 8, from `AR-SH-TYPO` (mixed digit systems, which is genuinely
  present in the source) and one `AR-EGT-002` (tanwin in Egyptian-target
  text). Both are `P2`/`P1` residue on real human dialect text, and worth
  knowing about: they are the kind of hit a sourced fixture surfaces and a
  self-written one never would.
- **Cleanup.** Identical pipeline to `msa-01.md`.

## Levantine: searched for, not found

**There is no `shami-01.md`, and the variety is skipped rather than
substituted.** What was checked, all through the MediaWiki API:

- **`apc.wikipedia.org` and `ajp.wikipedia.org` do not exist.** DNS
  resolution fails; North and South Levantine have no Wikipedia of their
  own.
- **Wikimedia Incubator, `Wp/apc/`.** 500 pages in the main namespace. The
  largest are 883 bytes and are date stubs (`Wp/apc/10 كانون الأول` and its
  siblings), which are list pages, not prose. The longest actual prose page
  with a pre-cutoff revision, `Wp/apc/فلسطين` (rev 5554797, 2022-09-21),
  cleans down to 117 Arabic words, below the 150-word floor, and
  auto-routing sends it to `egt` rather than `shami` anyway.
  `Wp/apc/لهجات شامية` cleans down to 27 words. Several other apc pages
  (عاصي الرحباني, ماجدة الرومي, فريد الأطرش, عبد الرحمن الكواكبي) have no
  revision at all before the cutoff: they were created after it.
- **Incubator `Wp/ajp/`.** 17 pages, largest 80 bytes. Nothing usable.
- **Arabic Wikisource.** Searched for زجل, موال, لهجة شامية and
  أغاني شعبية لبنانية. Every result is classical or MSA material
  (pre-modern poetry and prose, `مجلة الرسالة` and `مجلة المقتبس` articles,
  hadith and grammar works). Arabic Wikisource holds essentially no
  Levantine-dialect prose, which is expected: public-domain published
  Arabic is overwhelmingly written in MSA or classical Arabic, because
  dialect was until recently not a published written register.

The structural reason is worth stating, because it will not change by
looking harder in the same places: pre-2022, licence-clean, published
Levantine **written** prose of paragraph length is close to nonexistent in
Wikimedia projects. Finding it means going outside Wikimedia, to sources
whose licensing has to be checked one document at a time (dialect poetry
collections, transcribed oral corpora, Levantine-language public-domain
theatre). That is a research task, not a fetch, and it is left open.

Consequence for the acceptance criterion: IMP-02 asked for one sourced
fixture per variety "where available". Two of three varieties are covered;
the Levantine engine's false-positive behaviour still rests only on
synthetic fixtures. `references/ar-levantine.md` is already marked
experimental and pending native review, and this is a second, independent
reason to treat Levantine results as the least evidenced of the three.

## What these fixtures do and do not prove

They prove that two specific human documents are not flagged. They are
anchors against regression, not a measurement: the measurement is IMP-01
(`corpus/RESULTS.md`, 300 documents, Wilson intervals). Two files cannot
establish a rate, and nothing here should be cited as one.
