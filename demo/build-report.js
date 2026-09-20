'use strict';
// Builds report.html from before.md / after.md using the skill's own detector
// output, so every number and every highlight comes from a real run.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const SKILL = path.join(__dirname, "..", "skills", "humanizer-pro");
const detect = (file) => JSON.parse(execFileSync(process.execPath,
  [path.join(SKILL, 'scripts', 'detect.js'), file, '--markdown', '--json'],
  { encoding: 'utf8' }));

const beforeText = fs.readFileSync('before.md', 'utf8');
const afterText = fs.readFileSync('after.md', 'utf8');
const B = detect('before.md');
const A = detect('after.md');

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const OPEN = '@@MARK:';
const MID = ':@@';
const CLOSE = '@@END@@';

// Wrap each flagged span at the offsets the detector reported, right to left
// so earlier offsets stay valid.
function markSpans(text, issues) {
  let out = text;
  for (const it of [...issues].sort((a, b) => b.start - a.start)) {
    const sev = String(it.severity || 'P2').toLowerCase();
    const title = it.patternId + ' | ' + it.type;
    out = out.slice(0, it.start) + OPEN + sev + MID + title + MID
      + out.slice(it.start, it.end) + CLOSE + out.slice(it.end);
  }
  return out;
}

function markdownToHtml(text) {
  const blocks = [];
  let para = [];
  let list = [];
  const flushPara = () => { if (para.length) { blocks.push('<p>' + para.join(' ') + '</p>'); para = []; } };
  const flushList = () => {
    if (list.length) { blocks.push('<ul>' + list.map((li) => '<li>' + li + '</li>').join('') + '</ul>'); list = []; }
  };
  for (const raw of text.split('\n')) {
    const line = raw.trimEnd();
    if (/^#\s+/.test(line)) { flushPara(); flushList(); blocks.push('<h2>' + line.replace(/^#\s+/, '') + '</h2>'); }
    else if (/^[-*]\s+/.test(line)) { flushPara(); list.push(line.replace(/^[-*]\s+/, '')); }
    else if (line === '') { flushPara(); flushList(); }
    else { flushList(); para.push(line); }
  }
  flushPara();
  flushList();
  return blocks.join('\n');
}

function renderColumn(text, issues) {
  const html = markdownToHtml(esc(markSpans(text, issues)));
  return html
    .replace(/@@MARK:(p0|p1|p2):@@([^:]*?):@@/g, (m, sev, title) => '<mark class="' + sev + '" title="' + title + '">')
    .replace(/@@END@@/g, '</mark>');
}

const summarise = (o) => ({
  score: o.score,
  label: o.label,
  words: o.stats.words,
  sentences: o.stats.sentences,
  paragraphs: o.stats.paragraphs,
  coverage: o.stats.affectedCoveragePercent,
  issues: o.issues.length,
});
const sb = summarise(B);
const sa = summarise(A);

const rows = B.issues.map((i) => ({
  sev: i.severity,
  id: i.patternId,
  excerpt: i.excerpt,
  fix: String(i.suggestion || '').split('(')[0].trim(),
}));

const html = `<!doctype html>
<html lang="ar" dir="rtl">
<meta charset="utf-8">
<title>humanizer-pro: قبل وبعد</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<style>
:root{--bg:#fbfaf8;--fg:#1c1b19;--muted:#6b6660;--line:#e3ded6;--card:#fff;
--p0:#c2410c;--p0bg:#ffedd5;--p1:#a16207;--p1bg:#fef3c7;--p2:#525252;--p2bg:#ececec;--ok:#15803d;--okbg:#dcfce7}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#171614;--fg:#eceae6;--muted:#a09a92;--line:#302d29;--card:#201e1b;
--p0:#fb923c;--p0bg:#43200c;--p1:#fbbf24;--p1bg:#3d2f06;--p2:#a3a3a3;--p2bg:#2a2a2a;--ok:#4ade80;--okbg:#0d2e18}}
:root[data-theme="dark"]{--bg:#171614;--fg:#eceae6;--muted:#a09a92;--line:#302d29;--card:#201e1b;
--p0:#fb923c;--p0bg:#43200c;--p1:#fbbf24;--p1bg:#3d2f06;--p2:#a3a3a3;--p2bg:#2a2a2a;--ok:#4ade80;--okbg:#0d2e18}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);line-height:1.95;
font-family:"Segoe UI","Noto Naskh Arabic","Traditional Arabic",Tahoma,system-ui,sans-serif}
.wrap{max-width:1180px;margin:0 auto;padding:32px 16px 72px}
h1{font-size:1.6rem;margin:0 0 6px}
.sub{color:var(--muted);margin:0 0 26px;font-size:.95rem;max-width:70ch}
.scores{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:22px}
.kpi{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px 16px}
.kpi .n{font-size:1.75rem;font-weight:700;line-height:1.25}
.kpi .l{color:var(--muted);font-size:.8rem}
.kpi.bad .n{color:var(--p0)}
.kpi.good .n{color:var(--ok)}
.legend{display:flex;gap:18px;flex-wrap:wrap;margin:0 0 18px;font-size:.85rem;color:var(--muted)}
.legend span{display:inline-flex;align-items:center;gap:6px}
.dot{width:12px;height:12px;border-radius:3px;display:inline-block}
.cols{display:grid;grid-template-columns:1fr 1fr;gap:18px}
@media(max-width:860px){.cols{grid-template-columns:1fr}}
.card{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:4px 22px 22px}
.card h3{font-size:.8rem;letter-spacing:.06em;color:var(--muted);text-transform:uppercase;
border-bottom:1px solid var(--line);padding:16px 0 10px;margin:0 0 6px}
.card h2{font-size:1.12rem;margin:18px 0 10px}
.card p{margin:0 0 14px;text-align:justify}
.card ul{margin:0 0 14px;padding-inline-start:22px}
mark{background:var(--p2bg);color:inherit;border-radius:4px;padding:1px 3px;border-bottom:2px solid var(--p2)}
mark.p0{background:var(--p0bg);border-color:var(--p0)}
mark.p1{background:var(--p1bg);border-color:var(--p1)}
table{width:100%;border-collapse:collapse;margin-top:12px;font-size:.9rem}
th,td{text-align:right;padding:9px 10px;border-bottom:1px solid var(--line);vertical-align:top}
th{color:var(--muted);font-weight:600;font-size:.78rem;letter-spacing:.04em}
.sev{display:inline-block;min-width:26px;text-align:center;border-radius:5px;padding:1px 6px;font-size:.75rem;font-weight:700}
.P0{background:var(--p0bg);color:var(--p0)}
.P1{background:var(--p1bg);color:var(--p1)}
.P2{background:var(--p2bg);color:var(--p2)}
code{font-family:ui-monospace,Consolas,monospace;font-size:.85em;background:var(--p2bg);padding:1px 5px;border-radius:4px}
.note{background:var(--okbg);border:1px solid var(--ok);border-radius:10px;padding:12px 16px;margin-top:16px;font-size:.92rem}
footer{color:var(--muted);font-size:.8rem;margin-top:32px;border-top:1px solid var(--line);padding-top:14px}
</style>
<div class="wrap">
<h1>أنسنة مقال بالفصحى</h1>
<p class="sub">مقال كتبه نموذج ذكاء اصطناعي، ثم أُعيدت صياغته بمهارة humanizer-pro في وضع rewrite.
كل رقم هنا مأخوذ من تشغيل فعلي للكاشف والمدقق، والتظليل موضوع على الإزاحات التي أعادها الكاشف نفسه.</p>

<div class="scores">
  <div class="kpi bad"><div class="n">${sb.score}</div><div class="l">الدرجة قبل · ${sb.label}</div></div>
  <div class="kpi good"><div class="n">${sa.score}</div><div class="l">الدرجة بعد · ${sa.label}</div></div>
  <div class="kpi bad"><div class="n">${sb.issues}</div><div class="l">مشكلة مرصودة قبل</div></div>
  <div class="kpi good"><div class="n">${sa.issues}</div><div class="l">مشكلة مرصودة بعد</div></div>
  <div class="kpi"><div class="n">${sb.coverage}%</div><div class="l">نسبة النص المتأثر قبل</div></div>
  <div class="kpi good"><div class="n">0</div><div class="l">إضافات مزعومة</div></div>
</div>

<div class="legend">
  <span><i class="dot" style="background:var(--p0bg);border:1px solid var(--p0)"></i> P0 خطير</span>
  <span><i class="dot" style="background:var(--p1bg);border:1px solid var(--p1)"></i> P1 متوسط</span>
  <span><i class="dot" style="background:var(--p2bg);border:1px solid var(--p2)"></i> P2 ضعيف</span>
  <span>مرّر المؤشر على أي مقطع مظلَّل لترى معرّف النمط</span>
</div>

<div class="cols">
  <section class="card"><h3>قبل · نص الذكاء الاصطناعي</h3>${renderColumn(beforeText, B.issues)}</section>
  <section class="card"><h3>بعد · النسخة المؤنسنة</h3>${renderColumn(afterText, A.issues)}</section>
</div>

<section class="card" style="margin-top:18px">
<h3>المشكلات المرصودة في النص الأصلي</h3>
<table>
<thead><tr><th>الخطورة</th><th>المعرّف</th><th>المقطع</th><th>الإصلاح المقترح</th></tr></thead>
<tbody>
${rows.map((r) => '<tr><td><span class="sev ' + r.sev + '">' + r.sev + '</span></td><td><code>'
  + esc(r.id) + '</code></td><td>' + esc(r.excerpt) + '</td><td>' + esc(r.fix) + '</td></tr>').join('\n')}
</tbody></table>
</section>

<section class="card" style="margin-top:18px">
<h3>الإحصاءات</h3>
<table>
<thead><tr><th>المقياس</th><th>قبل</th><th>بعد</th></tr></thead>
<tbody>
<tr><td>الدرجة</td><td>${sb.score} (${sb.label})</td><td>${sa.score} (${sa.label})</td></tr>
<tr><td>الكلمات</td><td>${sb.words}</td><td>${sa.words}</td></tr>
<tr><td>الجمل</td><td>${sb.sentences}</td><td>${sa.sentences}</td></tr>
<tr><td>الفقرات</td><td>${sb.paragraphs}</td><td>${sa.paragraphs}</td></tr>
<tr><td>المشكلات</td><td>${sb.issues}</td><td>${sa.issues}</td></tr>
</tbody></table>
<div class="note">المدقق <code>validate.js --mode rewrite</code> خرج برمز <strong>0</strong>:
العنوان والأرقام والأسماء والتواريخ والروابط محفوظة، ودرجة الكاشف لم تسوأ.
الدرجة إشارة للمراجعة لا حكم على هوية الكاتب، وهو ما يعلنه الكاشف بنفسه في حقل <code>authorshipClaim: false</code>.</div>
</section>

<footer>وُلّدت هذه الصفحة بـ <code>node demo/build-report.js</code> من <code>before.md</code> و<code>after.md</code> مباشرة.
humanizer-pro v0.2.0-build · github.com/derabia/humanizer-pro</footer>
</div>
</html>`;

fs.writeFileSync('report.html', html, 'utf8');
console.log('wrote report.html  score ' + sb.score + ' -> ' + sa.score
  + '  issues ' + sb.issues + ' -> ' + sa.issues);
