# Language and variety codes

How this project names a language or Arabic variety in documentation, and
why the engine's internal identifiers (`msa`, `egt`, `shami`) are not the
same thing as the naming standard this document states.

## The naming rule: BCP 47

Documentation, `SKILL.md` frontmatter, and any future variety beyond the
three Arabic ones ship today name a language or locale using **BCP 47**
(RFC 5646), the same tag scheme used by HTML `lang`, browsers, and most
serious internationalization systems. A tag is built from subtags, most
general first:

    language[-script][-region]

- **language**: the ISO 639-1 two-letter code when one exists (`en`, `ar`),
  or ISO 639-3 when it does not.
- **script**: ISO 15924, four letters, Title-case. Included only when the
  language is written in more than one script for the same audience (not
  needed for any variety this project ships today).
- **region**: ISO 3166-1, two letters, uppercase. Included only when the
  regional variety changes what the humanized output should look like, not
  as a label of convenience.

Keep a tag as short as it can be while still being unambiguous. Add a
region subtag only once a variety actually needs distinguishing from its
neighbors, the same principle `precedence.md` applies to every other rule
in this project: state only what is specific, and no more.

## Worked table for this project's Arabic varieties

| BCP 47 tag | Variety | This project's engine id | Reference file |
|---|---|---|---|
| `ar` | Modern Standard Arabic (فصحى) | `msa` | `references/ar-msa.md` |
| `ar-EG` | Egyptian Arabic (مصري) | `egt` | `references/ar-egyptian.md` |
| `ar-LB`, `ar-SY`, `ar-PS`, `ar-JO` | Levantine Arabic (شامي): Lebanese, Syrian, Palestinian, Jordanian | `shami` | `references/ar-levantine.md` (experimental; see `SKILL.md` §3) |
| `ar-SA`, `ar-AE`, `ar-KW`, and other Gulf states | Gulf Arabic (خليجي) | `gulf` (not yet shipped) | none yet; would follow `references/_TEMPLATE.md` |

`ar` with no region subtag is the default: any Arabic text without strong
dialect evidence routes to MSA, per `SKILL.md` §3's identification
heuristics. A region subtag is added to the *documentation* label only once
a variety has its own reference file and its own engine id; it is never
used to imply support that does not exist yet (Gulf Arabic is listed above
as a documented gap, not a shipped variety).

## `lib/lang.js` does not use BCP 47

This is the one place this project's naming diverges from the rule above,
and it is stated here explicitly so the divergence never gets mistaken for
an oversight. `scripts/lib/lang.js`'s `identify()` function, `--variety`
CLI flags on `detect.js` and `validate.js`, and the `variety` field in
`detect.js --json` output all use short internal identifiers: `msa`, `egt`,
`shami`. These are **not** BCP 47 subtags (`egt` is not an ISO 639 or ISO
3166 code; `shami` is not either), and no code in this project currently
maps them to or from a BCP 47 tag.

Why the two systems are kept separate rather than unified now:

- Changing `lib/lang.js`'s identifiers is a breaking change to the CLI
  contract (`--variety egt` would become `--variety ar-EG` or similar) and
  to every script and test that reads its output; that is scripts work,
  out of scope for a documentation-only pass.
- The three current identifiers are short, memorable, and already used
  throughout `references/`, `scripts/`, and `tests/`; a rename touches far
  more than this document does.

If a future pass unifies the two, `docs/discrepancies/` is where that
decision and its migration path belong. Until then: **use BCP 47 in prose,
in `SKILL.md` frontmatter, and in any new variety's documentation; use
`msa`/`egt`/`shami` (and eventually `gulf`) only when writing code, CLI
invocations, or JSON field values that talk to `lib/lang.js` directly.**

## Adding a new variety

See `references/_TEMPLATE.md` for the exact steps, including where the new
variety's BCP 47 tag and its `lib/lang.js` engine id both need to be
recorded so this table stays accurate.

## Credits and provenance

Idea and the general BCP 47-as-naming-standard framing credited to
sawradip/rehumanize's `docs/LANGUAGE-CODES.md` (MIT license; wording here
is original, not reproduced from the source, and the worked table is this
project's own Arabic-variety content). See `docs/provenance/round1-docs.md`
for this document's addition.
