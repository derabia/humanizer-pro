# Native review — test fixtures

Fixtures that need a native speaker's eye before they can be trusted as
ground truth. Each entry names what is uncertain about it.

Fixture headers follow the convention:

```
<!-- fixture: ai-style | synthetic-human ; variety: msa|egt|shami ; source: <upstream file:line if adapted, else humanizer-pro> -->
```

Human-style Arabic fixtures carry `<!-- NATIVE-REVIEW: <variety> -->` as
their second line.

---

## Arabic engine

Every fixture below is marked `synthetic-human`: it was written by this
project for `tests/ar-detector.test.js`, not sampled from native writing.
The AI-style fixtures in the same directories are **not** listed here — they
are adaptations of the upstream ❌ examples cited in their headers, and their
job is to be unnatural.

### MSA (`msa`)

| fixture | content | what is uncertain |
|---|---|---|
| `tests/fixtures/ar-msa/human-01.md` | a Friday-market visit | naturalness of self-written dialect text |
| `tests/fixtures/ar-msa/human-02.md` | a football match and the ride home | naturalness of self-written dialect text |
| `tests/fixtures/ar-msa/human-03.md` | a molokhia recipe as a grandmother gives it | naturalness of self-written dialect text |
| `tests/fixtures/ar-msa/human-04.md` | a bus ride across the city | naturalness of self-written dialect text |
| `tests/fixtures/ar-msa/human-05.md` | the periodicals room of a municipal library | naturalness of self-written dialect text |

For the MSA files, "dialect" means register rather than variety: the
uncertainty is whether the prose reads as something a native MSA writer would
actually produce, including the quoted colloquial line in `human-02` /
`human-03` and the mixed-register dialogue in
`tests/fixtures/false-positives/ar-quoted-speech.md`.

### Egyptian (`egt`)

| fixture | content | what is uncertain |
|---|---|---|
| `tests/fixtures/ar-egt/human-01.md` | a Friday-market visit | naturalness of self-written dialect text |
| `tests/fixtures/ar-egt/human-02.md` | a football match and the ride home | naturalness of self-written dialect text |
| `tests/fixtures/ar-egt/human-03.md` | a molokhia recipe as a grandmother gives it | naturalness of self-written dialect text |
| `tests/fixtures/ar-egt/human-04.md` | a bus ride across the city | naturalness of self-written dialect text |
| `tests/fixtures/ar-egt/human-05.md` | a work day with English code-switching | naturalness of self-written dialect text |

Specific things to check in the Egyptian set: the `بـ`-prefix coverage on
present-tense verbs (`AR-EGT-004`), whether the `حـ/هـ` future forms are
spelled the way people actually type them (`AR-EGT-003`), whether the
code-switching density in `human-05` matches educated Cairo usage
(`AR-EGT-016`), and whether any of the orthographic choices read as a
non-native's guess (`AR-EGT-018`, `AR-EGT-023`).

### Levantine (`shami`)

| fixture | content | what is uncertain |
|---|---|---|
| `tests/fixtures/ar-shami/human-01.md` | a Friday-market visit | naturalness of self-written dialect text |
| `tests/fixtures/ar-shami/human-02.md` | a football match and the ride home | naturalness of self-written dialect text |
| `tests/fixtures/ar-shami/human-03.md` | a kibbeh-nayyeh recipe as a grandmother gives it | naturalness of self-written dialect text |
| `tests/fixtures/ar-shami/human-04.md` | a bus ride across the city | naturalness of self-written dialect text |
| `tests/fixtures/ar-shami/human-05.md` | a work day with English code-switching | naturalness of self-written dialect text |

The Levantine set carries the most uncertainty. `references/ar-levantine.md`
is itself marked "experimental — pending native Levantine review", and these
fixtures were written without pinning a regional sub-variant. They mix forms
that the reference marks as Syrian, Lebanese or Palestinian without
committing to one (`يلي` vs `اللي`, `هني`, `منيح`, `عم` with and without the
`بـ`-prefix, `لهيك` vs `مشان هيك`). A native reviewer should decide, per
file, which regional variant it is meant to be and make it internally
consistent — see `AR-SHM-002`, `AR-SHM-003`, `AR-SHM-005`, `AR-SHM-006`,
`AR-SHM-008`.

### False positives (`tests/fixtures/false-positives/`)

These must score `HUMAN`. All are `synthetic-human`.

| fixture | variety | content | what is uncertain |
|---|---|---|---|
| `tests/fixtures/false-positives/ar-rhetorical-msa.md` | msa | legitimate rhetorical questions (الاستفهام البلاغي) | naturalness of self-written dialect text |
| `tests/fixtures/false-positives/ar-rhetorical-egt.md` | egt | legitimate reader-directed questions | naturalness of self-written dialect text |
| `tests/fixtures/false-positives/ar-quoted-speech.md` | msa | MSA narration quoting colloquial speech verbatim | naturalness of self-written dialect text |
| `tests/fixtures/false-positives/ar-changelog-list.md` | msa | an Arabic changelog as a bullet list | naturalness of self-written dialect text |
| `tests/fixtures/false-positives/ar-technical-en-terms.md` | msa | a technical Arabic paragraph with English terms (`real-time`, `feature flag`, `API`) | naturalness of self-written dialect text |

`ar-quoted-speech.md` reuses the colloquial line مش تمام from
`references/ar-msa.md` `AR-MSA-025`, which that reference already flags as an
unpinned colloquial blend in the upstream source. If a reviewer pins it to a
dialect there, pin it here too.
