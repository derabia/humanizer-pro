# .claude-plugin manifests

`plugin.json` and `marketplace.json` in this directory follow the shape
observed in two competitor repos under `_sources/competitors/`, reviewed for
`docs/COMPETITIVE-ANALYSIS.md` IMP-05:

- `_sources/competitors/sawradip_rehumanize/.claude-plugin/plugin.json` and
  `marketplace.json` — base field set (`name`, `version`, `description`,
  `author`, `keywords`, and the `plugins[]` array shape in
  `marketplace.json`).
- `_sources/competitors/amanmaqsood_prose-humanizer/.claude-plugin/plugin.json`
  — the `$schema` pointer and `skills` array field.
- `_sources/semitic/.claude-plugin/plugin.json` — the `"skills": [...]` field
  that points at the actual skill directory/directories (that repo ships
  four skill folders; humanizer-pro ships one, `./skills/humanizer-pro`).

Fields present in amanmaqsood's manifest that depend on assets this repo
does not have (a hosted homepage, a privacy/terms URL, brand color, icon
files) were left out rather than filled with placeholders.
