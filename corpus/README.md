# `corpus/` — Arabic human control corpus (IMP-01)

A sample of Arabic prose written **before 2022-11-30**, used by
`tools/fp-measure.js` to measure the Arabic engine's false-positive rate.
Because every document predates the public release of ChatGPT, an `AI`
verdict on any of them is a false positive by construction, and a `MIXED`
verdict is a partial one.

What is in git and what is not:

| path | committed | contents |
|---|---|---|
| `corpus/manifest.json` | yes | one record per document: title, pageid, revid, timestamp, permanent url, project, licence, register, provenance class, word counts, sha256 |
| `corpus/README.md` | yes | this file |
| `corpus/RESULTS.md` | yes | the measured results, written by `tools/fp-measure.js` |
| `corpus/raw/` | **no**, gitignored | the cleaned document text, one `.txt` per record |

The text itself is not redistributed here. It is licensed and could be, but
keeping it out of the repository keeps the repository small and keeps the
corpus honest: anyone re-running the measurement re-fetches from the source
and the sha256 in the manifest proves they got the same bytes.

## Re-fetching

```
node tools/fetch-corpus.js
node tools/fetch-corpus.js --merge --news 70      # top up one register
node tools/fp-measure.js
```

`fetch-corpus.js` writes `corpus/raw/*.txt` and rewrites
`corpus/manifest.json`. `--merge` keeps every existing record whose raw file
is present and still hashes to the manifest value, and downloads only the
shortfall against the requested per-class targets; it exists because a run
can stop on the download budget part-way through.

`fp-measure.js` reads the manifest, verifies each file's sha256, excludes
(never fails on) any mismatch, and writes `corpus/RESULTS.md`.

Flags that change the sample: `--featured`, `--good`, `--random`, `--news`
(per-class targets) and `--min-words`. `--dry-run` resolves candidate titles
and stops.

Re-fetching is not guaranteed to reproduce the same *sample*: the `random`
and `news` classes draw from `list=random`, so a fresh run picks different
pages. Re-fetching a *known* sample is what the manifest is for, since every
record carries its permanent `oldid` url. Re-fetching the same **document**
is deterministic: same revision plus same cleaner gives the same sha256.

## How a document is built

1. **Candidate titles.** `featured` and `good` come from the ar.wikipedia
   categories `تصنيف:مقالات مختارة` and `تصنيف:مقالات جيدة`; `random` comes
   from `list=random` in namespace 0; the `news` register comes from
   `list=random` on ar.wikinews. `random` and `news` candidates are
   size-filtered with a batched `prop=info` call before any revision call is
   spent on them, because a random Arabic Wikipedia page is usually a stub.
2. **Revision.** `prop=revisions&rvprop=timestamp|ids|user` with
   `rvstart=2022-11-29T23:59:59Z&rvdir=older&rvlimit=1` gives the newest
   revision strictly before the cutoff. Its `revid` and `timestamp` go in
   the manifest, and the manifest url is that revision's permanent link.
3. **Text.** `action=parse&oldid=<revid>&prop=wikitext`.

   **`prop=extracts` is not usable for this and is not used.** The
   TextExtracts extension ignores `revids`/`oldid` and returns the *current*
   revision's extract. Verified: the extract requested for ar.wikipedia
   revision `1623` (2004-02-25) came back identical, to the character, to
   the current revision's extract. Everything here therefore goes through
   wikitext plus the cleaner below.
4. **Cleanup** (`cleanWikitext()` in `tools/fetch-corpus.js`, deterministic,
   in this order): HTML comments, `<ref>` in both paired and self-closing
   forms, and stripped tags (gallery, table, math, syntaxhighlight,
   timeline, imagemap, poem, nowiki); balanced `{{template}}` and
   `{| table |}` constructs, by brace matching rather than by regex; file,
   image, category and interlanguage links; link unwrapping, so `[[a|b]]`
   becomes `b` and `[url label]` becomes `label`; quote markup, residual
   HTML tags, magic words and the common HTML entities. Then a line filter
   keeps only lines whose first character is an Arabic letter and which are
   at least half Arabic by character count, which removes headings, list
   items, indented definitions and leftover table rows while keeping blank
   lines as paragraph separators. Finally runs of blank lines collapse to
   one.

   The filter is deliberately lossy: anything whose prose status is
   uncertain is dropped, because a stray template parameter or list fragment
   would distort exactly the stylometric signals the engine measures
   (sentence-length burstiness, paragraph uniformity, trigram repetition).
5. **Length.** A document must have at least `minWords` Arabic words (150 by
   default) after cleaning, and is then trimmed **at a paragraph boundary**
   to its leading `maxWords` (600). Both numbers are recorded in the
   manifest, along with `words` (the stored text) and `fullWords` (before
   trimming), so the trimming is auditable.

   Why trim: a featured article runs 5,000 to 12,000 words, and the Arabic
   engine applies no length normalization (`scripts/README.md`, "Weights").
   Scoring a 10,000-word article against thresholds calibrated on
   article-length documents would measure the missing length normalization
   rather than the lexicon, and would not be comparable across registers or
   with this repository's own fixtures.
6. **Hash.** `sha256` in the manifest is of the stored, trimmed text as
   UTF-8. `fp-measure.js` re-verifies it and excludes any document that no
   longer matches.

"Word" throughout means an Arabic-letter token,
`/[ء-يٱ-ۓـ]+/g`. Latin-script tokens and digits do
not count toward the length filter, though they remain in the text.

## Sampling and register stratification

| register | project | provenance classes | what it is |
|---|---|---|---|
| `encyclopedic` | ar.wikipedia | `featured`, `good`, `random` | encyclopedia prose |
| `news` | ar.wikinews | `random` | news reporting |

The three encyclopedic provenance classes are kept separate in the manifest
and reported separately by `fp-measure.js` on purpose. Arabic Wikipedia has
two well-known register contaminants: bot-created templated articles, and
machine-translated text imported through the Content Translation tool.
`featured` and `good` are human-curated and largely free of both; `random`
is not. If `random` flags at a higher rate than `featured`, that is evidence
about the sample, not about the lexicon, and `RESULTS.md` says so rather
than treating it as a tuning target.

The featured share is the smallest of the three because a featured article's
wikitext runs 150 to 300 KB, an order of magnitude more than a good
article's, and the download budget is the binding constraint on the run.

**A third register was attempted and not achieved.** The plan was a
`literary` register from Arabic Wikisource. It is not in this corpus: the
run's download budget was consumed by the encyclopedic register before
Wikisource was reached, and Arabic Wikisource's holdings are dominated by
pre-modern classical texts whose register is far enough from contemporary
written Arabic that mixing them in would have measured something else
again. Adding it is a separate, cheap run (`--merge`) for a later round.
Until then this corpus is two registers, and every per-register number in
`RESULTS.md` should be read as encyclopedic-plus-news, not as
contemporary written Arabic in general.

## Licence and attribution

All text in this corpus is user-generated Wikimedia content reused under
**Creative Commons Attribution-ShareAlike 4.0** (CC BY-SA 4.0),
<https://creativecommons.org/licenses/by-sa/4.0/>. The licence is read at
fetch time from each project's own `meta=siteinfo&siprop=rightsinfo` and
stored per record in the manifest, rather than assumed.

- **Arabic Wikipedia** (`ar.wikipedia.org`), contributors, CC BY-SA 4.0.
- **Arabic Wikinews** (`ar.wikinews.org`), contributors, CC BY-SA 4.0.

Attribution for any individual document is its `url` field, which is the
permanent `?oldid=` link to the exact revision used; that page's History
view lists its authors, which is the attribution method the licence
contemplates for wiki reuse. No document is republished in this repository,
so no further notice travels with it; anything that later quotes this text
outward has to carry the licence and the link.

Wikimedia's trademarks are not licensed by CC BY-SA and are not used here.

## API etiquette

`fetch-corpus.js` sends a descriptive `User-Agent`, passes `maxlag=5`,
paces itself to one request every 500 ms, and backs off on both the JSON
`maxlag`/`ratelimited` errors and the plain-text "too many requests" page
the API serves instead of JSON when a client goes too fast. It stops at a
byte budget (29 MB of decompressed API payload) rather than running
unbounded. Counts for the run are recorded in the manifest as
`apiRequests` and `decompressedBytes`.
