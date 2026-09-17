#!/usr/bin/env node
/**
 * humanizer-pro — Arabic human-control corpus fetcher (IMP-01)
 *
 * origin: humanizer-pro. Node >= 18, CommonJS, zero npm dependencies.
 *
 * Downloads Arabic prose written *before* the pre-ChatGPT cutoff
 * (2022-11-30) from Wikimedia projects through the MediaWiki action API, so
 * `tools/fp-measure.js` can measure the Arabic engine's false-positive rate
 * against text no language model could have produced.
 *
 * Why wikitext and not `prop=extracts`
 * ------------------------------------
 * The TextExtracts extension (`prop=extracts&explaintext=1`) ignores
 * `revids`/`oldid` and always returns the extract of the *current* revision.
 * Verified empirically: requesting the extract of ar.wikipedia revision 1623
 * (2004-02-25) returns byte-identical text to the current revision's
 * extract. Extracts are therefore unusable for a pre-cutoff corpus.
 *
 * This tool instead resolves, per page, the newest revision whose timestamp
 * is strictly before the cutoff (`prop=revisions&rvprop=timestamp|ids|user`
 * with `rvstart`/`rvdir=older`), fetches that exact revision's wikitext
 * (`action=parse&oldid=<revid>&prop=wikitext`), and reduces it to prose with
 * the conservative cleaner in `cleanWikitext()` below. The cleaner is
 * deterministic: the sha256 recorded in `corpus/manifest.json` is the hash
 * of its output, and `tools/fp-measure.js` re-verifies it.
 *
 * Usage
 * -----
 *   node tools/fetch-corpus.js                    # default targets
 *   node tools/fetch-corpus.js --featured 25 --good 105 --random 100 --news 70
 *   node tools/fetch-corpus.js --out corpus --min-words 150
 *   node tools/fetch-corpus.js --dry-run          # resolve titles only
 *   node tools/fetch-corpus.js --merge --news 70  # top up an existing corpus
 *
 * Output
 * ------
 *   <out>/raw/<register>-<pageid>.txt   cleaned plain text (gitignored)
 *   <out>/manifest.json                 one record per document (committed)
 */

'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// ─────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────

/** Pre-ChatGPT cutoff. Only revisions strictly before this are eligible. */
const CUTOFF = '2022-11-30T00:00:00Z';
/** rvstart for rvdir=older: the last instant still before the cutoff. */
const RV_START = '2022-11-29T23:59:59Z';

const USER_AGENT =
  'humanizer-pro-corpus/0.1 (research corpus fetch for Arabic AI-detector ' +
  'false-positive measurement; https://github.com/search?q=humanizer-pro)';

/**
 * Minimum gap between API calls. The Wikimedia API answers a burst of
 * unthrottled requests with a plain-text "You are making too many requests"
 * page instead of JSON, so the client paces itself rather than relying on
 * retries to absorb it.
 */
const THROTTLE_MS = 500;

/** Per-document ceiling in Arabic words; see truncateToWords(). */
const MAX_WORDS = 600;

/** Soft ceiling on decompressed API payload, in bytes. */
const BYTE_BUDGET = 29 * 1024 * 1024;

/**
 * Licence urls by project, used only to normalize a manifest written
 * before the short licence id existed. Live runs read the url from each
 * project's own `meta=siteinfo&siprop=rightsinfo`.
 */
const LICENCE_URL_BY_PROJECT = {
  'ar.wikipedia': 'https://creativecommons.org/licenses/by-sa/4.0/',
  'ar.wikinews': 'https://creativecommons.org/licenses/by-sa/4.0/',
};

const ARABIC_LETTER = /[ء-يٱ-ۓ]/;
const ARABIC_WORD = /[ء-يٱ-ۓـ]+/g;

// ─────────────────────────────────────────────────────────────────────────
// CLI
// ─────────────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const opts = {
    featured: 25,
    good: 105,
    random: 100,
    news: 70,
    minWords: 150,
    out: path.join(__dirname, '..', 'corpus'),
    dryRun: false,
    merge: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === '--featured') opts.featured = Number(argv[++i]);
    else if (a === '--good') opts.good = Number(argv[++i]);
    else if (a === '--random') opts.random = Number(argv[++i]);
    else if (a === '--news') opts.news = Number(argv[++i]);
    else if (a === '--min-words') opts.minWords = Number(argv[++i]);
    else if (a === '--out') opts.out = path.resolve(argv[++i]);
    else if (a === '--dry-run') opts.dryRun = true;
    else if (a === '--merge') opts.merge = true;
    else {
      process.stderr.write(`fetch-corpus: unknown flag ${a}\n`);
      process.exit(2);
    }
  }
  return opts;
}

// ─────────────────────────────────────────────────────────────────────────
// API plumbing
// ─────────────────────────────────────────────────────────────────────────

let bytesSeen = 0;
let requests = 0;
let nextSlot = 0;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Block until this process's next throttle slot. */
async function throttle() {
  const now = Date.now();
  if (now < nextSlot) await sleep(nextSlot - now);
  nextSlot = Math.max(now, nextSlot) + THROTTLE_MS;
}

/**
 * One API call with `maxlag` and exponential backoff.
 *
 * Note on byte accounting: Node's fetch transparently gunzips the response,
 * so `bytesSeen` counts *decompressed* JSON, which over-states the bytes
 * actually pulled over the wire. That makes the budget check conservative.
 */
async function api(host, params, attempt = 0) {
  const qs = new URLSearchParams({ format: 'json', formatversion: '1', maxlag: '5', ...params });
  const url = `https://${host}/w/api.php?${qs}`;
  let res;
  let body;
  await throttle();
  try {
    res = await fetch(url, { headers: { 'User-Agent': USER_AGENT, 'Accept-Encoding': 'gzip' } });
    body = await res.text();
  } catch (err) {
    if (attempt >= 5) throw err;
    await sleep(1000 * 2 ** attempt);
    return api(host, params, attempt + 1);
  }
  requests += 1;
  bytesSeen += Buffer.byteLength(body, 'utf8');
  let json;
  try {
    json = JSON.parse(body);
  } catch (err) {
    // A rate-limit refusal arrives as a plain-text page, not JSON. Wait
    // well past the limiter's window before trying again.
    const throttled = /too many requests/i.test(body);
    if (attempt >= 7) throw new Error(`non-JSON response from ${host}: ${body.slice(0, 120)}`);
    const wait = throttled ? 15000 * (attempt + 1) : 1000 * 2 ** attempt;
    process.stderr.write(`  non-JSON response (${res.status}), waiting ${wait}ms
`);
    nextSlot = Date.now() + wait;
    await sleep(wait);
    return api(host, params, attempt + 1);
  }
  // maxlag / ratelimit backoff.
  if (json.error && (json.error.code === 'maxlag' || json.error.code === 'ratelimited')) {
    if (attempt >= 6) throw new Error(`${json.error.code} did not clear: ${json.error.info}`);
    const wait = Number(res.headers.get('retry-after') || 0) * 1000 || 2000 * 2 ** attempt;
    process.stderr.write(`  ${json.error.code}, backing off ${wait}ms\n`);
    await sleep(wait);
    return api(host, params, attempt + 1);
  }
  if (json.error) throw new Error(`${json.error.code}: ${json.error.info}`);
  return json;
}

/**
 * Short licence id for the manifest, derived from the project's own
 * `rightsinfo` rather than assumed.
 *
 * `rightsinfo.text` is a display name ("Creative Commons Attribution-Share
 * Alike 4.0") and its wording is a wiki-configurable string, so the short
 * id used for machine comparison comes from the licence *url*, which is
 * stable. Both are recorded per document, with the url, so a reader can see
 * what the project actually claimed.
 */
function licenceLabel(rights) {
  const url = String((rights && rights.url) || '');
  const name = String((rights && rights.text) || '').trim();
  const m = /creativecommons\.org\/licenses\/([a-z-]+)\/(\d+\.\d+)/i.exec(url);
  const id = m ? `CC ${m[1].toUpperCase()} ${m[2]}` : name || 'unknown';
  return { licence: id, licenceName: name, licenceUrl: url };
}

async function rightsInfo(host) {
  const j = await api(host, { action: 'query', meta: 'siteinfo', siprop: 'rightsinfo' });
  return j.query.rightsinfo;
}

/** Category members in the main namespace. */
async function categoryMembers(host, category, limit) {
  const out = [];
  let cont;
  do {
    const params = {
      action: 'query',
      list: 'categorymembers',
      cmtitle: category,
      cmnamespace: '0',
      cmlimit: '500',
    };
    if (cont) params.cmcontinue = cont;
    const j = await api(host, params);
    for (const m of (j.query && j.query.categorymembers) || []) {
      out.push({ title: m.title, pageid: m.pageid });
    }
    cont = j.continue && j.continue.cmcontinue;
  } while (cont && out.length < limit);
  return out.slice(0, limit);
}

async function randomPages(host, count) {
  const out = [];
  const seen = new Set();
  while (out.length < count) {
    const j = await api(host, { action: 'query', list: 'random', rnnamespace: '0', rnlimit: '20' });
    for (const p of (j.query && j.query.random) || []) {
      if (seen.has(p.id)) continue;
      seen.add(p.id);
      out.push({ title: p.title, pageid: p.id });
    }
  }
  return out.slice(0, count);
}

/**
 * Drop candidate titles whose *current* page is too small to ever yield
 * `minWords` Arabic words, batching 50 titles per request.
 *
 * This is a cost filter, not a correctness filter: the current size is only
 * a proxy for the pre-cutoff revision's size, and every surviving candidate
 * is still validated by the real word count after cleaning. Without it, a
 * random-page sample spends two requests per stub, and ar.wikipedia's
 * random sample is mostly stubs.
 */
async function filterBySize(host, candidates, minBytes) {
  const kept = [];
  for (let i = 0; i < candidates.length; i += 50) {
    const batch = candidates.slice(i, i + 50);
    const j = await api(host, {
      action: 'query',
      prop: 'info',
      pageids: batch.map((c) => c.pageid).join('|'),
    });
    const pages = (j.query && j.query.pages) || {};
    for (const page of Object.values(pages)) {
      if (page.missing !== undefined) continue;
      if ((page.length || 0) < minBytes) continue;
      kept.push({ title: page.title, pageid: page.pageid });
    }
  }
  return kept;
}

/** Newest revision strictly before the cutoff, or null. */
async function preCutoffRevision(host, title) {
  const j = await api(host, {
    action: 'query',
    prop: 'revisions',
    titles: title,
    rvprop: 'timestamp|ids|user',
    rvlimit: '1',
    rvstart: RV_START,
    rvdir: 'older',
  });
  const pages = (j.query && j.query.pages) || [];
  const page = Array.isArray(pages) ? pages[0] : Object.values(pages)[0];
  if (!page || page.missing !== undefined || !page.revisions || !page.revisions.length) return null;
  const rev = page.revisions[0];
  if (!(rev.timestamp < CUTOFF)) return null;
  return { pageid: page.pageid, title: page.title, revid: rev.revid, timestamp: rev.timestamp, user: rev.user };
}

async function revisionWikitext(host, revid) {
  const j = await api(host, { action: 'parse', oldid: String(revid), prop: 'wikitext' });
  return (j.parse && j.parse.wikitext && (j.parse.wikitext['*'] || j.parse.wikitext)) || '';
}

// ─────────────────────────────────────────────────────────────────────────
// Conservative wikitext cleaner
// ─────────────────────────────────────────────────────────────────────────

/** Remove every balanced `{{ … }}` template and `{| … |}` table. */
function stripBraceConstructs(src) {
  let out = '';
  let i = 0;
  while (i < src.length) {
    if (src.startsWith('{{', i) || src.startsWith('{|', i)) {
      const closer = src[i + 1] === '{' ? '}}' : '|}';
      const opener = src.slice(i, i + 2);
      let depth = 0;
      let j = i;
      while (j < src.length) {
        if (src.startsWith(opener, j)) {
          depth += 1;
          j += 2;
        } else if (src.startsWith(closer, j)) {
          depth -= 1;
          j += 2;
          if (depth === 0) break;
        } else {
          j += 1;
        }
      }
      if (depth !== 0) {
        // Unbalanced: drop the rest of the line only, so one broken
        // construct cannot swallow an entire article.
        const nl = src.indexOf('\n', i);
        i = nl === -1 ? src.length : nl;
      } else {
        i = j;
      }
      continue;
    }
    out += src[i];
    i += 1;
  }
  return out;
}

/**
 * Reduce one revision's wikitext to running prose.
 *
 * Deterministic and intentionally lossy: anything whose prose status is
 * uncertain is dropped rather than kept, because a stray template parameter
 * or list fragment would distort the stylometric signals the engine measures
 * (sentence-length burstiness, paragraph uniformity, trigram repetition).
 *
 * Steps, in order:
 *  1. HTML comments, `<ref>` (paired and self-closing), and other stripped
 *     tags (gallery, table, math, syntaxhighlight, timeline, imagemap).
 *  2. Balanced `{{template}}` and `{| table |}` constructs.
 *  3. File/image and category links, interlanguage links.
 *  4. Link unwrapping: `[[a|b]]` -> `b`, `[[a]]` -> `a`,
 *     `[http://x label]` -> `label`.
 *  5. Bold/italic quotes, remaining HTML tags, `__MAGIC__` words.
 *  6. Line filter: keep only lines whose first non-space character is an
 *     Arabic letter. That drops headings (`==`), lists (`*`, `#`), indents
 *     (`:`, `;`), leftover table rows (`|`, `!`) and any line that begins
 *     with Latin text, while keeping blank lines as paragraph separators so
 *     the paragraph-uniformity signal still has paragraphs to count.
 *  7. Whitespace collapse: at most one blank line between paragraphs.
 */
function cleanWikitext(src) {
  let t = String(src).replace(/\r\n?/g, '\n');

  // 1. comments, refs, stripped tags
  t = t.replace(/<!--[\s\S]*?-->/g, '');
  t = t.replace(/<ref[^>]*\/>/gi, '');
  t = t.replace(/<ref[^>]*>[\s\S]*?<\/ref>/gi, '');
  t = t.replace(
    /<(gallery|table|math|chem|syntaxhighlight|source|pre|code|timeline|imagemap|score|mapframe|maplink|nowiki|poem)\b[^>]*>[\s\S]*?<\/\1>/gi,
    '',
  );

  // 2. templates and tables
  t = stripBraceConstructs(t);

  // 3. file / category / interlanguage links
  t = t.replace(
    /\[\[\s*(?:ملف|صورة|تصنيف|File|Image|Category)\s*:[^[\]]*(?:\[\[[^[\]]*\]\][^[\]]*)*\]\]/gi,
    '',
  );
  t = t.replace(/\[\[\s*[a-z-]{2,12}\s*:[^[\]|]*\]\]/gi, '');

  // 4. link unwrapping
  for (let pass = 0; pass < 3; pass += 1) {
    t = t.replace(/\[\[([^[\]|]*)\|([^[\]|]*)\]\]/g, '$2');
    t = t.replace(/\[\[([^[\]|]*)\]\]/g, '$1');
  }
  t = t.replace(/\[(?:https?:|\/\/)\S+\s+([^\]]*)\]/g, '$1');
  t = t.replace(/\[(?:https?:|\/\/)\S+\]/g, '');

  // 5. quote markup, residual tags, magic words
  t = t.replace(/'{2,5}/g, '');
  t = t.replace(/<\/?[A-Za-z][^>]*>/g, '');
  t = t.replace(/__[A-Z_]+__/g, '');
  t = t.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"');

  // 6. line filter
  const kept = [];
  for (const rawLine of t.split('\n')) {
    const line = rawLine.trim();
    if (line === '') {
      kept.push('');
      continue;
    }
    if (!ARABIC_LETTER.test(line[0])) continue;
    // A prose line must still be mostly Arabic once template noise is gone.
    const arabic = (line.match(ARABIC_WORD) || []).join('').length;
    if (arabic < line.replace(/\s/g, '').length * 0.5) continue;
    kept.push(line.replace(/[ \t]{2,}/g, ' '));
  }

  // 7. whitespace collapse
  return kept
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Word count used by the >=150-word filter: Arabic-letter tokens only. */
function arabicWordCount(text) {
  return (text.match(ARABIC_WORD) || []).length;
}

/**
 * Trim a cleaned article to its leading `max` Arabic words, cutting only at
 * a paragraph boundary.
 *
 * Why truncate at all: a full featured article runs 5,000 to 12,000 words,
 * and the Arabic engine applies no length normalization (see
 * `scripts/README.md`, "Weights"). Scoring a 10,000-word article against
 * thresholds calibrated on article-length documents measures the missing
 * length normalization, not the lexicon. Capping every document at the same
 * ceiling keeps the corpus comparable across registers and comparable with
 * the repository's own fixtures. The cap is recorded in the manifest, and
 * `fullWords` keeps the untruncated count for every document so the effect
 * is auditable.
 */
function truncateToWords(text, max) {
  const paras = text.split(/\n{2,}/);
  const kept = [];
  let total = 0;
  for (const p of paras) {
    const n = arabicWordCount(p);
    if (total > 0 && total + n > max) break;
    kept.push(p);
    total += n;
    if (total >= max) break;
  }
  return kept.join('\n\n').trim();
}

function sha256(text) {
  return crypto.createHash('sha256').update(text, 'utf8').digest('hex');
}

// ─────────────────────────────────────────────────────────────────────────
// Collection
// ─────────────────────────────────────────────────────────────────────────

async function collect({ host, project, register, source, candidates, want, minWords, rawDir, taken, licence, records }) {
  let got = 0;
  for (const cand of candidates) {
    if (got >= want) break;
    if (bytesSeen > BYTE_BUDGET) {
      process.stderr.write('byte budget reached, stopping collection\n');
      break;
    }
    if (taken.has(`${project}:${cand.pageid}`)) continue;
    let rev;
    try {
      rev = await preCutoffRevision(host, cand.title);
    } catch (err) {
      process.stderr.write(`  skip ${cand.title}: ${err.message}\n`);
      continue;
    }
    if (!rev) continue;
    let wikitext;
    try {
      wikitext = await revisionWikitext(host, rev.revid);
    } catch (err) {
      process.stderr.write(`  skip ${cand.title} (rev ${rev.revid}): ${err.message}\n`);
      continue;
    }
    const full = cleanWikitext(wikitext);
    const fullWords = arabicWordCount(full);
    if (fullWords < minWords) continue;
    const text = truncateToWords(full, MAX_WORDS);
    const words = arabicWordCount(text);
    if (words < minWords) continue;

    const file = `${register}-${rev.pageid}.txt`;
    fs.writeFileSync(path.join(rawDir, file), text, 'utf8');
    taken.add(`${project}:${rev.pageid}`);
    records.push({
      file,
      title: rev.title,
      pageid: rev.pageid,
      revid: rev.revid,
      timestamp: rev.timestamp,
      url: `https://${host}/w/index.php?oldid=${rev.revid}`,
      project,
      ...licence,
      register,
      source,
      words,
      fullWords,
      sha256: sha256(text),
    });
    got += 1;
    if (got % 20 === 0) {
      process.stderr.write(`  ${register}/${source}: ${got}/${want} (${(bytesSeen / 1048576).toFixed(1)} MB)\n`);
    }
  }
  return got;
}

function shuffle(arr, seed) {
  // Deterministic Fisher-Yates so a re-run picks the same candidate order.
  let s = seed;
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i -= 1) {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    const j = s % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const rawDir = path.join(opts.out, 'raw');
  fs.mkdirSync(rawDir, { recursive: true });

  const taken = new Set();
  const records = [];
  let carriedRequests = 0;
  let carriedBytes = 0;

  // `--merge` tops up an existing corpus instead of replacing it: every
  // record whose raw file is still present and still hashes to the value in
  // the manifest is carried over untouched, and only the shortfall against
  // the requested targets is downloaded. This exists because the byte
  // budget can stop a run part-way through, and re-downloading the
  // documents that already succeeded would waste the budget a second time.
  if (opts.merge) {
    const manifestPath = path.join(opts.out, 'manifest.json');
    if (fs.existsSync(manifestPath)) {
      const prev = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      carriedRequests = prev.apiRequests || 0;
      carriedBytes = prev.decompressedBytes || 0;
      let dropped = 0;
      for (const doc of prev.docs || []) {
        const file = path.join(rawDir, doc.file);
        if (!fs.existsSync(file)) { dropped += 1; continue; }
        if (sha256(fs.readFileSync(file, 'utf8')) !== doc.sha256) { dropped += 1; continue; }
        taken.add(`${doc.project}:${doc.pageid}`);
        // Carried records are normalized through licenceLabel() so a
        // manifest written by an older version of this tool gains the
        // short licence id without re-downloading anything.
        records.push(doc.licenceUrl
          ? doc
          : { ...doc, ...licenceLabel({ url: LICENCE_URL_BY_PROJECT[doc.project], text: doc.licence }) });
      }
      console.error(`merge: carried ${records.length} existing documents, dropped ${dropped}`);
    } else {
      console.error('merge: no existing manifest, starting fresh');
    }
  }

  const alreadyHave = (register, source) =>
    records.filter((r) => r.register === register && r.source === source).length;

  process.stderr.write('resolving ar.wikipedia candidate titles\n');
  const featured = await categoryMembers('ar.wikipedia.org', 'تصنيف:مقالات مختارة', 500);
  const good = await categoryMembers('ar.wikipedia.org', 'تصنيف:مقالات جيدة', 500);
  process.stderr.write(`  featured: ${featured.length}, good: ${good.length}\n`);

  if (opts.dryRun) {
    process.stdout.write(JSON.stringify({ featured: featured.length, good: good.length }, null, 2) + '\n');
    return;
  }

  const wpLicence = licenceLabel(await rightsInfo('ar.wikipedia.org'));
  const wnLicence = licenceLabel(await rightsInfo('ar.wikinews.org'));

  // Encyclopedic register is sampled from three provenance classes. The
  // featured share is deliberately the smallest: a featured article's
  // wikitext runs 150 to 300 KB, an order of magnitude more than a good
  // article's, and the download budget is the binding constraint. Every
  // class is still represented so fp-measure can break the register down
  // by curation level (see corpus/README.md, "Sampling").
  const encFeatured = opts.featured;
  const encGood = opts.good;
  const encRandom = opts.random;

  process.stderr.write('collecting encyclopedic/featured\n');
  await collect({
    host: 'ar.wikipedia.org', project: 'ar.wikipedia', register: 'encyclopedic', source: 'featured',
    candidates: shuffle(featured, 20221130),
    want: Math.max(0, encFeatured - alreadyHave('encyclopedic', 'featured')), minWords: opts.minWords,
    rawDir, taken, licence: wpLicence, records,
  });

  process.stderr.write('collecting encyclopedic/good\n');
  await collect({
    host: 'ar.wikipedia.org', project: 'ar.wikipedia', register: 'encyclopedic', source: 'good',
    candidates: shuffle(good, 20221129),
    want: Math.max(0, encGood - alreadyHave('encyclopedic', 'good')), minWords: opts.minWords,
    rawDir, taken, licence: wpLicence, records,
  });

  process.stderr.write('collecting encyclopedic/random\n');
  // Arabic Wikipedia's random sample is dominated by bot-created stubs, so
  // over-sample the pool and size-filter it before spending revision calls.
  const randomWanted = Math.max(0, encRandom - alreadyHave('encyclopedic', 'random'));
  const randomCands = randomWanted
    ? await filterBySize(
      'ar.wikipedia.org',
      await randomPages('ar.wikipedia.org', randomWanted * 20),
      6000,
    )
    : [];
  console.error(`  random candidates surviving the size filter: ${randomCands.length}`);
  await collect({
    host: 'ar.wikipedia.org', project: 'ar.wikipedia', register: 'encyclopedic', source: 'random',
    candidates: randomCands,
    want: Math.max(0, encRandom - alreadyHave('encyclopedic', 'random')), minWords: opts.minWords,
    rawDir, taken, licence: wpLicence, records,
  });

  process.stderr.write('collecting news register from ar.wikinews\n');
  const newsWanted = Math.max(0, opts.news - alreadyHave('news', 'random'));
  const newsCands = newsWanted
    ? await filterBySize(
      'ar.wikinews.org',
      await randomPages('ar.wikinews.org', newsWanted * 20),
      2500,
    )
    : [];
  console.error(`  news candidates surviving the size filter: ${newsCands.length}`);
  await collect({
    host: 'ar.wikinews.org', project: 'ar.wikinews', register: 'news', source: 'random',
    candidates: newsCands,
    want: Math.max(0, opts.news - alreadyHave('news', 'random')), minWords: opts.minWords,
    rawDir, taken, licence: wnLicence, records,
  });

  records.sort((a, b) => (a.register === b.register ? a.pageid - b.pageid : a.register < b.register ? -1 : 1));

  const byRegister = {};
  for (const r of records) {
    byRegister[r.register] = byRegister[r.register] || { n: 0, sources: {} };
    byRegister[r.register].n += 1;
    byRegister[r.register].sources[r.source] = (byRegister[r.register].sources[r.source] || 0) + 1;
  }

  const manifest = {
    schema: 1,
    generated: new Date().toISOString().slice(0, 10),
    cutoff: CUTOFF,
    minWords: opts.minWords,
    maxWords: MAX_WORDS,
    wordDefinition: 'Arabic-letter token (/[\\u0621-\\u064A\\u0671-\\u06D3\\u0640]+/g)',
    method:
      'prop=revisions (rvstart=' + RV_START + ', rvdir=older, rvlimit=1) to pick the newest revision ' +
      'strictly before the cutoff, then action=parse&oldid=<revid>&prop=wikitext, then the ' +
      'conservative cleaner in tools/fetch-corpus.js cleanWikitext(). prop=extracts is NOT used: ' +
      'TextExtracts ignores revids/oldid and returns the current revision, verified against ' +
      'ar.wikipedia revid 1623 (2004-02-25), which returned the current extract byte for byte. ' +
      'Each cleaned document is then trimmed at a paragraph boundary to its leading ' + MAX_WORDS +
      ' Arabic words; sha256 is the hash of the trimmed text as stored under raw/.',
    apiRequests: requests + carriedRequests,
    decompressedBytes: bytesSeen + carriedBytes,
    apiRequestsThisRun: requests,
    decompressedBytesThisRun: bytesSeen,
    counts: byRegister,
    docs: records,
  };

  fs.writeFileSync(path.join(opts.out, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');

  process.stderr.write(`\nwrote ${records.length} documents to ${rawDir}\n`);
  for (const [reg, info] of Object.entries(byRegister)) {
    process.stderr.write(`  ${reg}: ${info.n} (${JSON.stringify(info.sources)})\n`);
  }
  process.stderr.write(`api requests: ${requests}, decompressed bytes: ${(bytesSeen / 1048576).toFixed(1)} MB\n`);
}

if (require.main === module) {
  main().catch((err) => {
    process.stderr.write(`fetch-corpus failed: ${err.stack || err.message}\n`);
    process.exit(1);
  });
}

module.exports = { cleanWikitext, arabicWordCount, truncateToWords, sha256, CUTOFF, MAX_WORDS };
