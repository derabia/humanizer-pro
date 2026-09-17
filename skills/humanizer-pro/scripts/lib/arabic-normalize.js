/**
 * humanizer-pro — Arabic text normalizer
 *
 * origin: humanizer-pro
 *
 * Produces a normalized form of Arabic text suitable for whole-word marker
 * matching (see lib/lang.js), while keeping an exact, reversible index map
 * back to the original string so callers can report offsets/highlights in
 * source coordinates.
 *
 * Normalization steps (deterministic, single left-to-right pass):
 *   1. Strip tashkeel (Arabic diacritics): U+064B-U+065F, U+0670,
 *      U+06D6-U+06ED (Quranic annotation marks included in that second
 *      range, harmless to strip for general text).
 *   2. Strip tatweel/kashida: U+0640.
 *   3. Unify alef forms: أ إ آ ٱ (U+0623 U+0625 U+0622 U+0671) -> ا (U+0627).
 *   4. Unify alef maqsura: ى (U+0649) -> ي (U+064A).
 *   5. Optional: unify ta marbuta: ة (U+0629) -> ه (U+0647), when
 *      options.taMarbuta is true. Off by default because ة/ه carry
 *      distinct grammatical meaning that some callers want to keep.
 *
 * Everything else (Arabic-Indic / Extended Arabic-Indic digits, Latin
 * text, punctuation, whitespace, control characters) passes through
 * untouched.
 *
 * Code-unit safety: this module walks the input one UTF-16 code unit at a
 * time, not one Unicode code point at a time. Every character this module
 * inspects or rewrites (tashkeel, tatweel, the alef family, alef maqsura,
 * ta marbuta) lives in the Arabic Unicode block (U+0600-U+06FF), which is
 * entirely within the Basic Multilingual Plane and therefore always a
 * single UTF-16 code unit — none of those characters can appear as (or
 * inside) a surrogate pair. A surrogate pair elsewhere in the input (e.g. an
 * emoji) is simply never matched by any rule here, so both of its code
 * units are copied through unchanged, one iteration apiece, keeping the
 * pair intact and the index map exact. No lookbehind or multi-code-unit
 * lookahead is used anywhere in this module.
 */

'use strict';

const TASHKEEL_RANGES = [
  [0x064b, 0x065f],
  [0x0670, 0x0670],
  [0x06d6, 0x06ed],
];
const TATWEEL = 0x0640;

const ALEF_VARIANTS = new Set([0x0623, 0x0625, 0x0622, 0x0671]); // أ إ آ ٱ
const ALEF = 'ا'; // ا
const ALEF_MAQSURA = 0x0649; // ى
const YA = 'ي'; // ي
const TA_MARBUTA = 0x0629; // ة
const HA = 'ه'; // ه

function isTashkeel(code) {
  for (let i = 0; i < TASHKEEL_RANGES.length; i += 1) {
    const [start, end] = TASHKEEL_RANGES[i];
    if (code >= start && code <= end) return true;
  }
  return false;
}

/**
 * normalize(text, options?) -> { normalized, map, toOriginal, toOriginalRange }
 *
 * - normalized: string, the normalized text.
 * - map: Int32Array of length normalized.length; map[i] is the index in the
 *   ORIGINAL string of the code unit that produced normalized[i]. For a
 *   character that was itself substituted (e.g. أ -> ا), map[i] is the index
 *   of the single source code unit it replaced (substitutions here are
 *   always one-code-unit-in, one-code-unit-out, so this is always exact,
 *   never approximate).
 * - toOriginal(normIndex): map[normIndex], or original.length if
 *   normIndex === normalized.length (end-of-string convenience so
 *   `toOriginalRange` can express a half-open range that reaches the end).
 * - toOriginalRange(start, end): [origStart, origEnd] half-open range in the
 *   original string spanning normalized[start:end].
 */
function normalize(text, options) {
  if (typeof text !== 'string') {
    throw new TypeError('normalize(text, options) expects a string');
  }
  const opts = options || {};
  const taMarbuta = opts.taMarbuta === true;

  const length = text.length;
  const outChars = [];
  const outMap = [];

  for (let i = 0; i < length; i += 1) {
    const code = text.charCodeAt(i);

    if (isTashkeel(code) || code === TATWEEL) {
      // Dropped entirely: no output char, no map entry.
      continue;
    }

    if (ALEF_VARIANTS.has(code)) {
      outChars.push(ALEF);
      outMap.push(i);
      continue;
    }

    if (code === ALEF_MAQSURA) {
      outChars.push(YA);
      outMap.push(i);
      continue;
    }

    if (taMarbuta && code === TA_MARBUTA) {
      outChars.push(HA);
      outMap.push(i);
      continue;
    }

    // Pass-through: any other code unit, including both halves of a
    // surrogate pair, digits (Arabic-Indic or otherwise), Latin text,
    // punctuation, and whitespace.
    outChars.push(text[i]);
    outMap.push(i);
  }

  const normalized = outChars.join('');
  const map = Int32Array.from(outMap);

  function toOriginal(normIndex) {
    if (normIndex < 0) {
      throw new RangeError('toOriginal: index out of range');
    }
    if (normIndex === map.length) return length; // end-of-string sentinel
    if (normIndex > map.length) {
      throw new RangeError('toOriginal: index out of range');
    }
    return map[normIndex];
  }

  function toOriginalRange(start, end) {
    if (start < 0 || end < start || end > map.length) {
      throw new RangeError('toOriginalRange: invalid range');
    }
    if (start === end) {
      const at = start === map.length ? length : map[start];
      return [at, at];
    }
    const origStart = map[start];
    // The end is exclusive: the original-side end is one past the source
    // code unit of the last included normalized character.
    const lastIncluded = map[end - 1];
    const origEnd = lastIncluded + 1;
    return [origStart, origEnd];
  }

  return { normalized, map, toOriginal, toOriginalRange };
}

module.exports = { normalize };
