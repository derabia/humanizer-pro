/**
 * humanizer-pro — validate.js extension checks
 *
 * origin: humanizer-pro
 *
 * `lib/en-validate.js` is adapted verbatim from avoid-ai-writing's
 * `detector/validate.js` (MIT) and is deliberately left untouched. This
 * module adds the protected-span checks that upstream validator has no
 * concept of (SEO-mode spans from `references/seo-mode.md`, Arabic-aware
 * number/heading comparison) as a separate, humanizer-pro-original module,
 * per the constraint in the build task: "if it must be extended, add a new
 * module rather than editing the upstream-derived file."
 *
 * Every exported check function takes (original, rewritten, options) and
 * returns one or more `{ name, status, details }` entries, status one of
 * 'PASS' | 'FAIL' | 'WARN'. `checkExtra` runs all of them and concatenates
 * the results, plus the SEO-specific checks when `options.seoKeywords` is
 * given.
 *
 * Dependency-free. Node >= 18. No mutation of inputs.
 */

'use strict';

const { normalize: normalizeArabic } = require('./arabic-normalize.js');

// ─── shared helpers ────────────────────────────────────────────────────

function counts(list) {
  const map = new Map();
  for (const item of list) map.set(item, (map.get(item) || 0) + 1);
  return map;
}

/** Items present in `a` more often than in `b` (multiset difference). */
function missingFrom(a, b) {
  const have = counts(b);
  const out = [];
  for (const item of a) {
    const n = have.get(item) || 0;
    if (n === 0) out.push(item);
    else have.set(item, n - 1);
  }
  return out;
}

function sample(list, n = 5) {
  const shown = list.slice(0, n);
  return shown.join(' | ') + (list.length > n ? ` (+${list.length - n} more)` : '');
}

function extractAll(re, text) {
  const out = [];
  const rx = new RegExp(re.source, re.flags.includes('g') ? re.flags : `${re.flags}g`);
  let m;
  while ((m = rx.exec(text)) !== null) {
    out.push(m);
    if (m.index === rx.lastIndex) rx.lastIndex++;
  }
  return out;
}

function normalizeCRLF(text) {
  return text.replace(/\r\n/g, '\n');
}

// ─── protected block extractors ───────────────────────────────────────

const JSON_LD_RE = /<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script\s*>/gi;
const SHORTCODE_RE = /\[[A-Za-z_][\w-]*(?:\s[^[\]\n]*)?\](?!\()/g;
const WP_COMMENT_RE = /<!--\s*\/?wp:[\s\S]*?-->/g;
// Opening HTML tags with their attributes (self-closing or not). Excludes
// the closing-tag form `</tag>`, which carries no attributes to protect.
const HTML_TAG_RE = /<([a-zA-Z][\w-]*)((?:\s+[a-zA-Z_:][-\w:.]*(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)*)\s*\/?>/g;
const MD_IMAGE_RE = /!\[([^\]]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g;
const MD_LINK_RE = /(?<!!)\[([^\]\n]*)\]\(([^)\s]+)(?:\s+"([^"]*)")?\)/g;
const YAML_FRONTMATTER_RE = /^---\n([\s\S]*?)\n---(?=\n|$)/;
const MD_HEADING_RE = /^(#{1,6})[ \t]+(.+?)[ \t]*$/gm;

function extractJsonLd(text) {
  return extractAll(JSON_LD_RE, text).map((m) => m[0]);
}
function extractShortcodes(text) {
  return extractAll(SHORTCODE_RE, text).map((m) => m[0]);
}
function extractWpComments(text) {
  return extractAll(WP_COMMENT_RE, text).map((m) => m[0]);
}
function extractHtmlTags(text) {
  return extractAll(HTML_TAG_RE, text).map((m) => m[0]);
}
function extractImages(text) {
  return extractAll(MD_IMAGE_RE, text).map((m) => m[0]);
}
function extractLinks(text) {
  return extractAll(MD_LINK_RE, text).map((m) => ({ full: m[0], text: m[1], href: m[2] }));
}

function isInternalHref(href) {
  if (!href) return false;
  if (/^(https?:)?\/\//i.test(href)) return false; // absolute external
  if (/^mailto:/i.test(href)) return false;
  if (/^tel:/i.test(href)) return false;
  return true; // relative path, root-relative path, or #anchor
}

function frontmatterFields(text) {
  const m = text.match(YAML_FRONTMATTER_RE);
  if (!m) return {};
  const out = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
    if (!kv) continue;
    const key = kv[1].toLowerCase();
    if (key === 'title' || key === 'description' || key === 'meta_description' || key === 'meta_title') {
      out[key] = kv[2].trim().replace(/^["']|["']$/g, '');
    }
  }
  return out;
}

function extractHeadings(text) {
  const out = [];
  for (const [, hashes, headingText] of text.matchAll(MD_HEADING_RE)) {
    out.push({ level: hashes.length, text: headingText });
  }
  return out;
}

function normalizeHeadingText(text) {
  return normalizeArabic(text).normalized.trim().replace(/\s+/g, ' ');
}

// ─── numbers, Arabic-digit-aware ──────────────────────────────────────

const ARABIC_INDIC = '٠-٩'; // ٠-٩
const EXT_ARABIC_INDIC = '۰-۹'; // ۰-۹
const DIGIT_CLASS = `[0-9${ARABIC_INDIC}${EXT_ARABIC_INDIC}]`;
const NUMBER_RE = new RegExp(
  `${DIGIT_CLASS}[${ARABIC_INDIC}${EXT_ARABIC_INDIC}0-9,٬]*(?:[.٫]${DIGIT_CLASS}+)?[%٪]?`,
  'g',
);

function digitScript(numStr) {
  if (new RegExp(`[${ARABIC_INDIC}]`).test(numStr)) return 'arabic-indic';
  if (new RegExp(`[${EXT_ARABIC_INDIC}]`).test(numStr)) return 'ext-arabic-indic';
  return 'western';
}

function toWesternValue(numStr) {
  let s = '';
  for (const ch of numStr) {
    const code = ch.codePointAt(0);
    if (code >= 0x0660 && code <= 0x0669) s += String(code - 0x0660);
    else if (code >= 0x06f0 && code <= 0x06f9) s += String(code - 0x06f0);
    else s += ch;
  }
  // Normalize separators: comma / Arabic thousands separator dropped,
  // Arabic decimal separator and Arabic percent sign mapped to ASCII.
  return s.replace(/[,٬]/g, '').replace(/٫/g, '.').replace(/٪/g, '%');
}

function extractNumbers(text) {
  return extractAll(NUMBER_RE, text).map((m) => ({
    raw: m[0],
    value: toWesternValue(m[0]),
    script: digitScript(m[0]),
  }));
}

/**
 * Numbers/dates check: a value missing or changed is a hard violation. A
 * pure digit-system change (same numeric value, different script) is a
 * P2 warning unless `options.strictDigits` is set, per the task spec.
 */
function checkNumbers(original, rewritten, options) {
  const origNums = extractNumbers(original);
  const newNums = extractNumbers(rewritten);

  const origValues = origNums.map((n) => n.value);
  const newValues = newNums.map((n) => n.value);
  const missingValues = missingFrom(origValues, newValues);

  if (missingValues.length) {
    return [{
      name: 'numbers',
      status: 'FAIL',
      details: `Number(s) missing or changed from the original: ${sample(missingValues)}.`,
    }];
  }

  // Same values present — check whether any changed digit system.
  const newByValue = new Map();
  for (const n of newNums) {
    if (!newByValue.has(n.value)) newByValue.set(n.value, []);
    newByValue.get(n.value).push(n);
  }
  const scriptChanges = [];
  const usedIndex = new Map(); // value -> next index to try
  for (const n of origNums) {
    const candidates = newByValue.get(n.value) || [];
    const idx = usedIndex.get(n.value) || 0;
    const match = candidates[idx];
    usedIndex.set(n.value, idx + 1);
    if (match && match.script !== n.script) {
      scriptChanges.push(`${n.raw} (${n.script}) → ${match.raw} (${match.script})`);
    }
  }

  if (scriptChanges.length) {
    if (options.strictDigits) {
      return [{
        name: 'numbers',
        status: 'FAIL',
        details: `Digit system changed for ${scriptChanges.length} number(s) under --strict-digits: ${sample(scriptChanges)}.`,
      }];
    }
    return [{
      name: 'numbers',
      status: 'WARN',
      details: `Digit system changed for ${scriptChanges.length} number(s) (value preserved): ${sample(scriptChanges)}. Pass --strict-digits to fail on this.`,
    }];
  }

  return [{ name: 'numbers', status: 'PASS', details: 'All numbers preserved (values and digit systems).' }];
}

// ─── structured/protected-block checks ────────────────────────────────

function checkListDiff(name, extractor, original, rewritten, label) {
  const origItems = extractor(original);
  const newItems = extractor(rewritten);
  const missing = missingFrom(origItems, newItems);
  if (missing.length) {
    return { name, status: 'FAIL', details: `${label} changed or removed (${missing.length}): ${sample(missing)}.` };
  }
  return { name, status: 'PASS', details: `${label}: ${origItems.length} block(s), unchanged.` };
}

function checkJsonLd(original, rewritten) {
  return checkListDiff('json-ld', extractJsonLd, original, rewritten, 'JSON-LD/schema block(s)');
}

function checkShortcodes(original, rewritten) {
  return checkListDiff('shortcodes', extractShortcodes, original, rewritten, 'Shortcode(s)');
}

function checkWpComments(original, rewritten) {
  return checkListDiff('wp-comments', extractWpComments, original, rewritten, 'WordPress block comment(s)');
}

function checkHtmlAttributes(original, rewritten) {
  return checkListDiff('html-attributes', extractHtmlTags, original, rewritten, 'HTML tag(s)/attribute(s)');
}

function checkImages(original, rewritten) {
  return checkListDiff('image-alt-captions', extractImages, original, rewritten, 'Image alt text/caption/filename');
}

function checkLinksAnchorsInternal(original, rewritten) {
  const origLinks = extractLinks(original);
  const newLinks = extractLinks(rewritten);

  const newHrefCounts = counts(newLinks.map((l) => l.href));
  const deletedInternal = [];
  for (const link of origLinks) {
    if (!isInternalHref(link.href)) continue;
    const remaining = newHrefCounts.get(link.href) || 0;
    if (remaining === 0) {
      deletedInternal.push(link.href);
    } else {
      newHrefCounts.set(link.href, remaining - 1);
    }
  }
  if (deletedInternal.length) {
    return {
      name: 'link-anchor-internal',
      status: 'FAIL',
      details: `Internal link(s) deleted: ${sample(deletedInternal)}.`,
    };
  }

  // Anchor text: for links whose href survives, the anchor text must match
  // (order-independent, matched by href multiset).
  const newByHref = new Map();
  for (const link of newLinks) {
    if (!newByHref.has(link.href)) newByHref.set(link.href, []);
    newByHref.get(link.href).push(link.text);
  }
  const reworded = [];
  for (const link of origLinks) {
    const bucket = newByHref.get(link.href);
    if (!bucket || bucket.length === 0) continue; // href itself missing: caught elsewhere for internal; external hrefs may be dropped
    const idx = bucket.indexOf(link.text);
    if (idx === -1) {
      reworded.push(`"${link.text}" → (anchor text changed for ${link.href})`);
    } else {
      bucket.splice(idx, 1);
    }
  }
  if (reworded.length) {
    return {
      name: 'link-anchor-internal',
      status: 'FAIL',
      details: `Link anchor text changed (${reworded.length}): ${sample(reworded)}.`,
    };
  }

  return { name: 'link-anchor-internal', status: 'PASS', details: `${origLinks.length} link(s): anchors and internal targets unchanged.` };
}

function checkFrontmatterMeta(original, rewritten) {
  const before = frontmatterFields(original);
  const after = frontmatterFields(rewritten);
  const changed = [];
  for (const key of ['title', 'description', 'meta_title', 'meta_description']) {
    if (before[key] !== undefined && before[key] !== after[key]) {
      changed.push(`${key}: "${before[key]}" → "${after[key] === undefined ? '(removed)' : after[key]}"`);
    }
  }
  if (changed.length) {
    return { name: 'frontmatter-meta', status: 'FAIL', details: `Frontmatter meta field(s) changed: ${sample(changed)}.` };
  }
  return { name: 'frontmatter-meta', status: 'PASS', details: 'Frontmatter meta title/description unchanged.' };
}

/** Arabic-aware heading structure check (supersedes en-validate's heading
 * logic for humanizer-pro's purposes: same count/level = error semantics,
 * but wording comparison runs through arabic-normalize first so tashkeel/
 * alef-form drift on an unedited Arabic heading is not reported as a
 * rewording). */
function checkHeadingsArabicAware(original, rewritten) {
  const origHeadings = extractHeadings(original);
  const newHeadings = extractHeadings(rewritten);

  if (origHeadings.length !== newHeadings.length) {
    return {
      name: 'heading-structure',
      status: 'FAIL',
      details: `Heading count changed: ${origHeadings.length} → ${newHeadings.length}.`,
    };
  }
  for (let i = 0; i < origHeadings.length; i++) {
    if (origHeadings[i].level !== newHeadings[i].level) {
      return {
        name: 'heading-structure',
        status: 'FAIL',
        details: `Heading nesting changed at heading #${i + 1}: h${origHeadings[i].level} → h${newHeadings[i].level}.`,
      };
    }
  }
  const reworded = [];
  for (let i = 0; i < origHeadings.length; i++) {
    if (normalizeHeadingText(origHeadings[i].text) !== normalizeHeadingText(newHeadings[i].text)) {
      reworded.push(`#${i + 1} "${origHeadings[i].text}" → "${newHeadings[i].text}"`);
    }
  }
  if (reworded.length) {
    return {
      name: 'heading-structure',
      status: 'WARN',
      details: `${reworded.length} heading(s) reworded (after Arabic-normalization comparison): ${sample(reworded)}.`,
    };
  }
  return { name: 'heading-structure', status: 'PASS', details: `${origHeadings.length} heading(s), structure and wording unchanged.` };
}

// ─── SEO keyword checks ────────────────────────────────────────────────

function stripCode(text) {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/~~~[\s\S]*?~~~/g, ' ')
    .replace(/`[^`\n]+`/g, ' ');
}

function bodyWithoutFrontmatter(text) {
  return text.replace(YAML_FRONTMATTER_RE, '').trim();
}

function firstNWords(text, n) {
  const words = stripCode(text).trim().match(/\S+/g) || [];
  return words.slice(0, n).join(' ');
}

function countOccurrences(needle, haystack) {
  if (!needle) return 0;
  const escaped = needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(escaped, 'gi');
  const m = haystack.match(re);
  return m ? m.length : 0;
}

function containsWord(needle, haystack) {
  return countOccurrences(needle, haystack) > 0;
}

function sectionsByHeading(text) {
  const lines = text.split('\n');
  const sections = [];
  let current = { heading: null, level: 0, bodyLines: [] };
  for (const line of lines) {
    const m = line.match(/^(#{1,6})[ \t]+(.+?)[ \t]*$/);
    if (m) {
      sections.push(current);
      current = { heading: m[2], level: m[1].length, bodyLines: [] };
    } else {
      current.bodyLines.push(line);
    }
  }
  sections.push(current);
  return sections.map((s) => ({ ...s, body: s.bodyLines.join('\n') }));
}

/**
 * SEO checks: keyword presence, primary-keyword placement (title/H1, first
 * 100 words, an H2), stuffing guard (count must not more than double), and
 * thin-section flags (never a failure — always WARN).
 */
function checkSeo(original, rewritten, keywords) {
  const results = [];
  if (!keywords || keywords.length === 0) return results;

  const primary = keywords[0];
  const origBody = bodyWithoutFrontmatter(stripCode(original));
  const newBody = bodyWithoutFrontmatter(stripCode(rewritten));

  // 1. Keyword presence: every keyword present in the original must remain.
  const missingKeywords = [];
  for (const kw of keywords) {
    if (containsWord(kw, origBody) && !containsWord(kw, newBody)) {
      missingKeywords.push(kw);
    }
  }
  results.push(missingKeywords.length
    ? { name: 'seo-keyword-presence', status: 'FAIL', details: `Keyword(s) removed entirely: ${sample(missingKeywords)}.` }
    : { name: 'seo-keyword-presence', status: 'PASS', details: `All ${keywords.length} keyword(s) still present.` });

  // 2. Primary keyword placement: title/H1, first 100 words, an H2.
  const origFrontmatter = frontmatterFields(original);
  const newFrontmatter = frontmatterFields(rewritten);
  const origHeadings = extractHeadings(original);
  const newHeadings = extractHeadings(rewritten);
  const origH1 = (origHeadings.find((h) => h.level === 1) || {}).text || '';
  const newH1 = (newHeadings.find((h) => h.level === 1) || {}).text || '';
  const origTitle = `${origFrontmatter.title || ''} ${origH1}`;
  const newTitle = `${newFrontmatter.title || ''} ${newH1}`;

  const placementFailures = [];
  if (containsWord(primary, origTitle) && !containsWord(primary, newTitle)) {
    placementFailures.push('title/H1');
  }
  const origFirst100 = firstNWords(origBody, 100);
  const newFirst100 = firstNWords(newBody, 100);
  if (containsWord(primary, origFirst100) && !containsWord(primary, newFirst100)) {
    placementFailures.push('first 100 words');
  }
  const origH2s = origHeadings.filter((h) => h.level === 2).map((h) => h.text).join(' | ');
  const newH2s = newHeadings.filter((h) => h.level === 2).map((h) => h.text).join(' | ');
  if (containsWord(primary, origH2s) && !containsWord(primary, newH2s)) {
    placementFailures.push('an H2');
  }
  results.push(placementFailures.length
    ? { name: 'seo-keyword-placement', status: 'FAIL', details: `Primary keyword "${primary}" dropped from: ${placementFailures.join(', ')}.` }
    : { name: 'seo-keyword-placement', status: 'PASS', details: `Primary keyword "${primary}" placement checkpoints preserved.` });

  // 3. Stuffing: keyword count must not more than double.
  const stuffed = [];
  for (const kw of keywords) {
    const origCount = countOccurrences(kw, origBody);
    const newCount = countOccurrences(kw, newBody);
    if (origCount > 0 && newCount > origCount * 2) {
      stuffed.push(`"${kw}": ${origCount} → ${newCount}`);
    }
  }
  results.push(stuffed.length
    ? { name: 'seo-stuffing', status: 'FAIL', details: `Keyword count more than doubled: ${sample(stuffed)}.` }
    : { name: 'seo-stuffing', status: 'PASS', details: 'No keyword stuffing detected.' });

  // 4. Thin sections: flag, never fail.
  const thin = [];
  for (const section of sectionsByHeading(newBody)) {
    if (!section.heading) continue;
    const words = (section.body.match(/\S+/g) || []).length;
    if (words > 0 && words < 40) thin.push(`"${section.heading}" (${words} words)`);
  }
  results.push({
    name: 'seo-thin-sections',
    status: thin.length ? 'WARN' : 'PASS',
    details: thin.length ? `Section(s) below 40 words: ${sample(thin)}.` : 'No thin sections.',
  });

  return results;
}

// ─── entry point ───────────────────────────────────────────────────────

function checkExtra(original, rewritten, options = {}) {
  const orig = normalizeCRLF(original);
  const rew = normalizeCRLF(rewritten);
  const opts = { strictDigits: false, seoKeywords: null, ...options };

  const results = [
    checkJsonLd(orig, rew),
    checkShortcodes(orig, rew),
    checkWpComments(orig, rew),
    checkHtmlAttributes(orig, rew),
    checkImages(orig, rew),
    checkLinksAnchorsInternal(orig, rew),
    checkFrontmatterMeta(orig, rew),
    checkHeadingsArabicAware(orig, rew),
    ...checkNumbers(orig, rew, opts),
  ];

  results.push(...checkSeo(orig, rew, opts.seoKeywords));

  return results;
}

module.exports = {
  checkExtra,
  // exported for unit testing
  extractJsonLd,
  extractShortcodes,
  extractWpComments,
  extractHtmlTags,
  extractImages,
  extractLinks,
  extractNumbers,
  toWesternValue,
  digitScript,
  frontmatterFields,
  extractHeadings,
  normalizeHeadingText,
  isInternalHref,
};
