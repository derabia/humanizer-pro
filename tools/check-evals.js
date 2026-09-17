#!/usr/bin/env node
"use strict";

/**
 * check-evals.js — validates evals/evals.json against the Phase 9 contract.
 *
 * Node >= 18, no dependencies.
 *
 * Checks:
 *   - evals.json parses as an array of >= 16 entries
 *   - exactly 4 entries per language bucket (en, msa, egt, shami)
 *   - every mode (detect, rewrite, edit) appears >= 3 times, and seo:true
 *     appears >= 3 times (seo is a modifier, not a mode value)
 *   - exactly one voiceSample:true per language family (english, arabic)
 *   - at least one thinContent:true entry
 *   - every file referenced (inputFile, keywordsFile, voiceSampleFile)
 *     exists on disk
 *   - ids are unique
 *
 * Usage: node tools/check-evals.js [path/to/evals.json]
 * Exit codes: 0 = all checks pass, 1 = at least one check failed.
 */

const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");
const evalsPath = path.resolve(repoRoot, process.argv[2] || "evals/evals.json");

const errors = [];
const warnings = [];

function fail(msg) {
  errors.push(msg);
}

function bucketOf(entry) {
  // language bucket: english, or arabic variety (msa/egt/shami)
  if (entry.lang === "en") return "en";
  if (entry.lang === "ar") return entry.variety || "ar-unspecified";
  return `${entry.lang}-unknown`;
}

function langFamilyOf(entry) {
  if (entry.lang === "en") return "english";
  if (entry.lang === "ar") return "arabic";
  return entry.lang || "unknown";
}

let raw;
try {
  raw = fs.readFileSync(evalsPath, "utf8");
} catch (e) {
  console.error(`Cannot read ${evalsPath}: ${e.message}`);
  process.exit(1);
}

let evals;
try {
  evals = JSON.parse(raw);
} catch (e) {
  console.error(`evals.json does not parse as JSON: ${e.message}`);
  process.exit(1);
}

if (!Array.isArray(evals)) {
  console.error("evals.json must be a top-level array.");
  process.exit(1);
}

// --- count ---
if (evals.length < 16) {
  fail(`Expected >= 16 evals, found ${evals.length}.`);
}

// --- unique ids ---
const seenIds = new Map();
for (const e of evals) {
  if (!e.id) {
    fail("An eval entry is missing 'id'.");
    continue;
  }
  if (seenIds.has(e.id)) {
    fail(`Duplicate id: '${e.id}' (also at index ${seenIds.get(e.id)}).`);
  }
  seenIds.set(e.id, evals.indexOf(e));
}

// --- per-language bucket counts (expect exactly 4 each: en, msa, egt, shami) ---
const expectedBuckets = ["en", "msa", "egt", "shami"];
const bucketCounts = {};
for (const e of evals) {
  const b = bucketOf(e);
  bucketCounts[b] = (bucketCounts[b] || 0) + 1;
}
for (const b of expectedBuckets) {
  const n = bucketCounts[b] || 0;
  if (n !== 4) {
    fail(`Expected exactly 4 evals for language bucket '${b}', found ${n}.`);
  }
}
for (const b of Object.keys(bucketCounts)) {
  if (!expectedBuckets.includes(b)) {
    warnings.push(`Unexpected language bucket '${b}' with ${bucketCounts[b]} entries.`);
  }
}

// --- mode counts (>= 3 each) and seo:true count (>= 3) ---
const modeCounts = {};
let seoCount = 0;
for (const e of evals) {
  if (!e.mode) {
    fail(`Eval '${e.id}' is missing 'mode'.`);
  } else {
    modeCounts[e.mode] = (modeCounts[e.mode] || 0) + 1;
  }
  if (e.seo === true) seoCount++;
}
for (const m of ["detect", "rewrite", "edit"]) {
  const n = modeCounts[m] || 0;
  if (n < 3) {
    fail(`Expected mode '${m}' to appear >= 3 times, found ${n}.`);
  }
}
if (seoCount < 3) {
  fail(`Expected seo:true to appear >= 3 times, found ${seoCount}.`);
}

// --- voiceSample: exactly one per language family (english, arabic) ---
const voiceSampleByFamily = {};
for (const e of evals) {
  if (e.voiceSample === true) {
    const fam = langFamilyOf(e);
    voiceSampleByFamily[fam] = (voiceSampleByFamily[fam] || 0) + 1;
  }
}
for (const fam of ["english", "arabic"]) {
  const n = voiceSampleByFamily[fam] || 0;
  if (n !== 1) {
    fail(`Expected exactly 1 voiceSample:true eval for '${fam}', found ${n}.`);
  }
}
const otherFamilies = Object.keys(voiceSampleByFamily).filter(
  (f) => f !== "english" && f !== "arabic"
);
if (otherFamilies.length) {
  warnings.push(`voiceSample:true set for unexpected language families: ${otherFamilies.join(", ")}`);
}

// --- thinContent: >= 1 ---
const thinCount = evals.filter((e) => e.thinContent === true).length;
if (thinCount < 1) {
  fail("Expected at least 1 thinContent:true eval, found 0.");
}

// --- voiceSampleFile presence matches voiceSample flag ---
for (const e of evals) {
  if (e.voiceSample === true && !e.voiceSampleFile) {
    fail(`Eval '${e.id}' has voiceSample:true but no voiceSampleFile.`);
  }
  if (e.voiceSample === false && e.voiceSampleFile) {
    warnings.push(`Eval '${e.id}' has voiceSample:false but sets voiceSampleFile.`);
  }
}

// --- referenced files exist ---
const fileFields = ["inputFile", "keywordsFile", "voiceSampleFile"];
for (const e of evals) {
  for (const field of fileFields) {
    const rel = e[field];
    if (!rel) continue; // null is allowed for keywordsFile/voiceSampleFile
    const abs = path.resolve(repoRoot, rel);
    if (!fs.existsSync(abs)) {
      fail(`Eval '${e.id}': ${field} '${rel}' does not exist.`);
    }
  }
}

// --- required top-level fields present ---
const requiredFields = [
  "id", "lang", "variety", "mode", "seo", "voiceSample", "thinContent",
  "prompt", "inputFile", "keywordsFile", "voiceSampleFile", "expected",
];
for (const e of evals) {
  for (const field of requiredFields) {
    if (!(field in e)) {
      fail(`Eval '${e.id || "?"}' is missing required field '${field}'.`);
    }
  }
  if (e.expected) {
    const expectedFields = [
      "reportLanguage", "outputLanguage", "outputVariety", "mustPreserve",
      "mustNotContain", "scoreShouldImprove", "notes",
    ];
    for (const field of expectedFields) {
      if (!(field in e.expected)) {
        fail(`Eval '${e.id}'.expected is missing required field '${field}'.`);
      }
    }
  }
}

// --- report ---
console.log(`evals.json: ${evals.length} entries`);
console.log("Language buckets:", JSON.stringify(bucketCounts));
console.log("Mode counts:", JSON.stringify(modeCounts));
console.log(`seo:true count: ${seoCount}`);
console.log("voiceSample by language family:", JSON.stringify(voiceSampleByFamily));
console.log(`thinContent:true count: ${thinCount}`);
console.log("");

if (warnings.length) {
  console.log(`Warnings (${warnings.length}):`);
  for (const w of warnings) console.log(`  - ${w}`);
  console.log("");
}

if (errors.length) {
  console.log(`FAIL — ${errors.length} error(s):`);
  for (const e of errors) console.log(`  - ${e}`);
  process.exit(1);
} else {
  console.log("PASS — all checks passed.");
  process.exit(0);
}
