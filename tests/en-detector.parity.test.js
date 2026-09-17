/**
 * humanizer-pro — English detector parity test
 *
 * Confirms that skills/humanizer-pro/scripts/lib/en-detector/index.js
 * (a relocated, header-annotated copy of upstream detector/patterns.js)
 * produces the IDENTICAL score and label as the upstream engine loaded
 * directly from _sources/avoid-ai-writing/detector/patterns.js, for a set
 * of fixture texts lifted verbatim from upstream's own
 * detector/patterns.test.js.
 *
 * _sources/ is gitignored (see project .gitignore / UPSTREAM.md) so it may
 * be absent in some checkouts or CI contexts. When absent, this suite skips
 * with a clear message rather than failing — the adapted engine still gets
 * exercised by tests/en-detector.upstream.test.js, which runs entirely
 * against our own copy and needs no upstream checkout.
 *
 * origin: humanizer-pro
 */

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test } = require('node:test');

const OURS_PATH = path.join(__dirname, '..', 'skills', 'humanizer-pro', 'scripts', 'lib', 'en-detector', 'index.js');
const UPSTREAM_PATH = path.join(__dirname, '..', '_sources', 'avoid-ai-writing', 'detector', 'patterns.js');

const upstreamAvailable = fs.existsSync(UPSTREAM_PATH);

// Fixture texts lifted verbatim from upstream detector/patterns.test.js
// (conorbronsdon/avoid-ai-writing@7a2c7d11), one per named upstream test.
const FIXTURES = [
  {
    name: 'AI-heavy paragraph scores in Strong/Heavy range',
    text: [
      "In today's ever-evolving landscape, we delve into the intricate",
      'tapestry of innovation. This seamless, robust paradigm showcases a',
      'comprehensive framework. Moreover, it truly is a game-changer.',
      'Furthermore, this pivotal moment underscores how we navigate the',
      'complexities of modern AI.',
    ].join(' '),
  },
  {
    name: 'plain human bug-report prose stays in Minimal range',
    text: [
      'The build broke again this morning. Rolled back the auth refactor',
      'and tests pass now. Still need to figure out why the token refresh',
      'path hits a 401 for users on Safari but not Firefox — probably a',
      'cookie scope issue but I want to confirm before shipping a fix.',
    ].join(' '),
  },
  {
    name: 'stats fields sum to issues length fixture',
    text: [
      "In today's landscape of innovation, we leverage seamless paradigms",
      'to harness the power of transformation. It is important to note',
      'that experts believe this is pivotal. Let me think step by step.',
    ].join(' '),
  },
  {
    name: 'chatbot artifacts score as P0 critical',
    text: 'I hope this helps! Let me know if you need anything else. Great question! Feel free to reach out.',
  },
  {
    name: 'crypto-shill social post with hashtag block + bullet-NP lists flags',
    text: `The future of decentralized computational infrastructure is evolving rapidly as blockchain-integrated mining ecosystems continue to merge with artificial intelligence, distributed compute, and tokenized incentive structures.

MineBench represents an interesting example of this emerging sector by combining benchmark-based mining participation, token rewards, and scalable network contribution models into a unified ecosystem designed for long-term sustainability and user engagement.

After several hours of testing, the platform demonstrated:

* Stable mining efficiency
* Reliable pool connectivity
* Optimized RandomX computational performance
* Low failed share rates
* Effective hardware utilization
* Consistent thermal stability

The integration of reward-based participation mechanisms alongside decentralized infrastructure concepts could potentially create new opportunities for community-driven computational networks.

The intersection of AI, DePIN, mining infrastructure, and decentralized compute may become one of the most important narratives of the next market cycle.

#AI #Crypto #Blockchain #DePIN #Mining #Web3 #Solana #RandomX #DecentralizedAI #PassiveIncome #Infrastructure #Innovation #Technology #FutureTech #Tokenomics`,
  },
  {
    name: 'text under 10 words returns tooShort flag',
    text: 'Short unscorable text snippet.',
  },
];

if (!upstreamAvailable) {
  test('en-detector parity (skipped: _sources/ absent)', { skip: 'upstream _sources/avoid-ai-writing is gitignored and not present in this checkout' }, () => {});
} else {
  const ours = require(OURS_PATH);
  const upstream = require(UPSTREAM_PATH);

  for (const fixture of FIXTURES) {
    test(`parity: ${fixture.name}`, () => {
      const a = ours.analyzeText(fixture.text);
      const b = upstream.analyzeText(fixture.text);
      assert.equal(a.score, b.score, `score mismatch for "${fixture.name}": ours=${a.score} upstream=${b.score}`);
      assert.equal(a.label, b.label, `label mismatch for "${fixture.name}": ours=${a.label} upstream=${b.label}`);
    });
  }
}
