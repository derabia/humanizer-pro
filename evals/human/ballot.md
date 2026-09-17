# استمارة تقييم أعمى (Blinded pairwise) — humanizer-pro

هاي استمارة تقييم أعمى: كل فقرة بتعرض النص الأصلي ونسختين مرقّمتين 1 و 2،
من غير ما تعرف أي نسخة هي الأصل أو المعدَّلة (الترتيب بيتغيّر عشوائيًا لكل
فقرة). اقرأ الفقرتين وجاوب على الأسئلة اللي تحت كل فقرة بصدق، بناءً على
انطباعك الفعلي، مش على تخمين مين كتبها.

**الوقت المتوقع:** حوالي 3-5 دقايق لكل فقرة (حوالي 45-60 دقيقة للاستمارة
كاملة، 12 فقرة).

**كيف ترجع النتائج:** عدّل هذا الملف مباشرة (املأ الأعمدة الفاضية بعد كل
فقرة)، واحفظه. أنا (فريق البناء) رح آخذ نسختك المعدَّلة وأطابقها مع
`key.json` لمعرفة أي رقم كان النص الأصلي وأي رقم كان النص المُعدَّل.

## English instructions

This is a blinded pairwise ballot: each item shows the original text and two
labelled candidates, "1" and "2", with no indication of which one is the
unedited original and which is the rewrite (the order is randomized per
item from a fixed seed). Read both candidates and answer the questions
below each item honestly, based on your actual reading, not a guess at
which side is which.

**Time estimate:** roughly 3-5 minutes per item (about 45-60 minutes for
the full 12-item ballot).

**How to return results:** edit this file directly (fill in the blank
columns after each item) and save it. The build team will take your
completed copy and match it against `key.json` to learn which label was
the original and which was the rewrite.

---

## فقرة 1 / Item 1 — `en-rewrite-01`

_ملاحظة: ما في نص أصلي منفصل معروض هنا لأن أحد الخيارين هو نفسه النص الأصلي بدون تعديل — عرضه بشكل منفصل كان رح يكشف أي رقم هو الأصل. قيّم الاثنين بناءً على نصهم فقط. / Note: no separate reference block is shown for this item because one candidate IS the unedited original — showing it separately would reveal which label is which. Judge both candidates on their own text._

**1:**

```
New-hire onboarding isn't paperwork. It's the difference between a new hire finding their footing in two weeks or two months.

A welcome email isn't enough. It doesn't tell a new hire where the staging credentials live, who to ask when they're stuck, or what "done" looks like in week one.

Basecraft's onboarding module is built for that gap. Ramp-up time varies by team size and role complexity, and by how good the existing documentation is, and the module keeps onboarding consistent regardless.

Here's what the module includes:

- Task tracking
- Manager check-ins
- Document library
- Progress dashboard
- Slack reminders
- Buddy system pairing
- Feedback surveys
- Calendar sync

A new hire and their manager see the same checklist without switching tools, because it runs off a shared timeline. Teams using the module reported fewer missed steps during the first month. Managers spent less time answering the same setup questions over and over.

HR can customize checklist templates per department. That matters: a sales onboarding flow looks nothing like an engineering one. Role-based templates shipped in this release. So did a lightweight API, for teams that want to pull checklist status into their own dashboards.

And honestly? What actually saves time isn't the tracker. It's not answering the same setup question twice.
```

**2:**

```
<!-- targets: EN-001, EN-005, EN-007, EN-023, EN-036, EN-042 -->

Great question about onboarding checklists — let's dig into why they matter
more than most teams realize.

New-hire onboarding isn't just paperwork, it's the foundation of long-term
retention. Some might argue that a simple welcome email is enough, but that
overlooks how much context a new hire actually needs in the first two
weeks.

Basecraft's new onboarding module might possibly help teams who are
potentially struggling with inconsistent ramp-up times, though results
could vary depending on team size, role complexity, and how well existing
documentation is maintained.

Here's what the module includes:

- Task tracking
- Manager check-ins
- Document library
- Progress dashboard
- Slack reminders
- Buddy system pairing
- Feedback surveys
- Calendar sync

Each of these connects to a shared timeline, so a new hire and their
manager can see the same checklist without switching tools. Teams using
the module reported fewer missed steps during the first month, and
managers spent less time answering the same setup questions over and over.

The module also lets HR customize checklist templates per department,
which matters because a sales onboarding flow looks nothing like an
engineering one. Support for role-based templates shipped in this release,
along with a lightweight API for teams that want to pull checklist status
into their own dashboards.
```

| السؤال / Question | إجابتك / Your answer |
|---|---|
| أيهما أكثر طبيعية (يقرأ كإنسان)؟ 1 أم 2؟ / Which reads more human, 1 or 2? | |
| هل المعنى محفوظ في كليهما؟ (نعم/لا) / Is the meaning preserved in both? (y/n) | |
| هل في أي شيء مُختلَق (أرقام/حقائق/أسماء)؟ (نعم/لا) — إذا نعم، وضّح أين / Is anything invented (numbers/facts/names)? (y/n) — if yes, note where | |
| الطبيعية: 1 (ضعيف) - 5 (ممتاز) لـ 1 / Naturalness 1-5 for candidate 1 | |
| الطبيعية: 1 (ضعيف) - 5 (ممتاز) لـ 2 / Naturalness 1-5 for candidate 2 | |
| ملاحظات حرة / Free comment | |

---

## فقرة 2 / Item 2 — `en-edit-01`

_ملاحظة: ما في نص أصلي منفصل معروض هنا لأن أحد الخيارين هو نفسه النص الأصلي بدون تعديل — عرضه بشكل منفصل كان رح يكشف أي رقم هو الأصل. قيّم الاثنين بناءً على نصهم فقط. / Note: no separate reference block is shown for this item because one candidate IS the unedited original — showing it separately would reveal which label is which. Judge both candidates on their own text._

**1:**

````
# How we deploy our internal tools

We keep deploys boring on purpose. Most of our internal tools — the
timesheet app, the on-call scheduler, the two dashboards nobody outside
ops has heard of — ship through the same pipeline, and we've resisted the
urge to special-case any of them.

Furthermore, it is worth noting that a robust and seamless deployment
process is essential for any modern engineering organization, and teams
that invest in this foundational capability position themselves for
long-term success across every dimension of the software lifecycle.

The pipeline itself is simple. A merge to `main` triggers the build, the
build runs our test suite, and if that passes, it ships to staging
automatically. Production is a manual promote — one command, one person
approving it, no exceptions, even for a one-line copy fix.

```bash
#!/usr/bin/env bash
set -euo pipefail

./scripts/build.sh
./scripts/test.sh
./scripts/promote.sh --env=staging
echo "staging deploy complete, run ./scripts/promote.sh --env=prod when ready"
```

Here's how the three environments compare:

| Environment | Trigger | Approval | Rollback time |
|---|---|---|---|
| Staging | Auto on merge | None | ~2 min |
| Production | Manual promote | One engineer | ~5 min |
| Sandbox | On demand | None | ~1 min |

The manual production step has saved us twice this year — once from a bad
migration, once from a config typo that would have knocked out the
on-call scheduler during an actual incident. Neither would have shown up
in staging, since staging doesn't carry real on-call data.

We don't plan to automate that last step away. A ten-second pause before
production is cheap insurance.
````

**2:**

````
# How we deploy our internal tools

We keep deploys boring on purpose. Most of our internal tools — the
timesheet app, the on-call scheduler, the two dashboards nobody outside
ops has heard of — ship through the same pipeline, and we've resisted the
urge to special-case any of them.

A deploy process teams can trust matters here specifically. It's why we
didn't special-case any of these tools, and why the pipeline below looks
the same for all of them.

The pipeline itself is simple. A merge to `main` triggers the build, the
build runs our test suite, and if that passes, it ships to staging
automatically. Production is a manual promote — one command, one person
approving it, no exceptions, even for a one-line copy fix.

```bash
#!/usr/bin/env bash
set -euo pipefail

./scripts/build.sh
./scripts/test.sh
./scripts/promote.sh --env=staging
echo "staging deploy complete, run ./scripts/promote.sh --env=prod when ready"
```

Here's how the three environments compare:

| Environment | Trigger | Approval | Rollback time |
|---|---|---|---|
| Staging | Auto on merge | None | ~2 min |
| Production | Manual promote | One engineer | ~5 min |
| Sandbox | On demand | None | ~1 min |

The manual production step has saved us twice this year — once from a bad
migration, once from a config typo that would have knocked out the
on-call scheduler during an actual incident. Neither would have shown up
in staging, since staging doesn't carry real on-call data.

We don't plan to automate that last step away. A ten-second pause before
production is cheap insurance.
````

| السؤال / Question | إجابتك / Your answer |
|---|---|
| أيهما أكثر طبيعية (يقرأ كإنسان)؟ 1 أم 2؟ / Which reads more human, 1 or 2? | |
| هل المعنى محفوظ في كليهما؟ (نعم/لا) / Is the meaning preserved in both? (y/n) | |
| هل في أي شيء مُختلَق (أرقام/حقائق/أسماء)؟ (نعم/لا) — إذا نعم، وضّح أين / Is anything invented (numbers/facts/names)? (y/n) — if yes, note where | |
| الطبيعية: 1 (ضعيف) - 5 (ممتاز) لـ 1 / Naturalness 1-5 for candidate 1 | |
| الطبيعية: 1 (ضعيف) - 5 (ممتاز) لـ 2 / Naturalness 1-5 for candidate 2 | |
| ملاحظات حرة / Free comment | |

---

## فقرة 3 / Item 3 — `en-seo-01`

_ملاحظة: ما في نص أصلي منفصل معروض هنا لأن أحد الخيارين هو نفسه النص الأصلي بدون تعديل — عرضه بشكل منفصل كان رح يكشف أي رقم هو الأصل. قيّم الاثنين بناءً على نصهم فقط. / Note: no separate reference block is shown for this item because one candidate IS the unedited original — showing it separately would reveal which label is which. Judge both candidates on their own text._

**1:**

```
---
title: Standing desks for small home offices
description: A quick look at standing desks for compact home offices.
---

# Standing desks for small home offices

A standing desk lets you change position during the day instead of sitting
for eight hours straight, and that's most of why people working from home
reach for one. Posture and energy levels are the usual reasons people give,
and alternating between sitting and standing does make a long workday feel
less tiring for a lot of people [shortcode
cta id="12"].

## Why standing desks help

Movement helps circulation, and switching between sitting and standing
breaks up the kind of stretch that makes your back stiffen up at a desk.
That's the whole mechanism: change position often enough and the day feels
shorter. See our [home office setup guide](/blog/home-office-setup) for more
general tips, and check out
[our desk accessories roundup](/blog/desk-accessories) for things that pair
well with a standing desk.

<!-- wp:paragraph {"align":"left"} -->
<p>Compatible with monitor arms up to 32 inches, per the spec sheet in
<code>desk-specs.json</code>.</p>
<!-- /wp:paragraph -->

## Choosing a small-footprint desk

In a small home office, footprint and stability matter more than almost
anything else. A desk that wobbles when you type is worse than no standing
desk at all, and a desk that's too deep will make a small room feel
cramped no matter how nice the desk itself is. Measure how much desk space
you actually use day to day before buying anything — most people use far
less surface than they think.

![A compact standing desk in a small home office corner](desk-corner.jpg)

<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Article","headline":"Standing desks for small home offices"}
</script>

## Sizes to consider

Sizes here run roughly 40, 48, and 55 inches wide, and most small offices
land somewhere in the 40-to-48-inch range depending on the room.
```

**2:**

```
---
title: Standing desks for small home offices
description: A quick look at standing desks for compact home offices.
---

# Standing desks for small home offices

Standing desks are a popular choice for people who work from home and want
to move more during the day. A standing desk can help with posture and
energy levels, and many people find that alternating between sitting and
standing makes the workday feel less tiring overall [shortcode
cta id="12"].

## Why standing desks help

Standing desks help because they let you change position throughout the
day instead of staying seated for eight hours straight. Movement is
generally considered good for circulation, and switching positions can
make long stretches at a computer feel more comfortable. See our
[home office setup guide](/blog/home-office-setup) for more general tips,
and check out [our desk accessories roundup](/blog/desk-accessories) for
things that pair well with a standing desk.

<!-- wp:paragraph {"align":"left"} -->
<p>Compatible with monitor arms up to 32 inches, per the spec sheet in
<code>desk-specs.json</code>.</p>
<!-- /wp:paragraph -->

## Choosing a small-footprint desk

Choosing the right desk for a small home office mostly comes down to
footprint and stability. A desk that wobbles when you type is worse than
no standing desk at all, and a desk that's too deep can make a small room
feel cramped. It's worth thinking about how much desk space you actually
use day to day before buying anything.

![A compact standing desk in a small home office corner](desk-corner.jpg)

<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Article","headline":"Standing desks for small home offices"}
</script>

## Sizes to consider

There are a few sizes worth considering, generally around 40 inches, 48
inches, and 55 inches wide, and most small offices do fine with something
in the 40 to 48 inch range depending on the room.
```

| السؤال / Question | إجابتك / Your answer |
|---|---|
| أيهما أكثر طبيعية (يقرأ كإنسان)؟ 1 أم 2؟ / Which reads more human, 1 or 2? | |
| هل المعنى محفوظ في كليهما؟ (نعم/لا) / Is the meaning preserved in both? (y/n) | |
| هل في أي شيء مُختلَق (أرقام/حقائق/أسماء)؟ (نعم/لا) — إذا نعم، وضّح أين / Is anything invented (numbers/facts/names)? (y/n) — if yes, note where | |
| الطبيعية: 1 (ضعيف) - 5 (ممتاز) لـ 1 / Naturalness 1-5 for candidate 1 | |
| الطبيعية: 1 (ضعيف) - 5 (ممتاز) لـ 2 / Naturalness 1-5 for candidate 2 | |
| ملاحظات حرة / Free comment | |

---

## فقرة 4 / Item 4 — `msa-rewrite-01`

_ملاحظة: ما في نص أصلي منفصل معروض هنا لأن أحد الخيارين هو نفسه النص الأصلي بدون تعديل — عرضه بشكل منفصل كان رح يكشف أي رقم هو الأصل. قيّم الاثنين بناءً على نصهم فقط. / Note: no separate reference block is shown for this item because one candidate IS the unedited original — showing it separately would reveal which label is which. Judge both candidates on their own text._

**1:**

```
التعليم الإلكتروني لم يعد بديلاً مؤقتًا؛ صار خيارًا أساسيًا. منصة "جسر" التعليمية الجديدة تقدّم تجربة تعلّم تفاعلية لطلاب مراحل التعليم الأساسي.

توفر المنصة مجموعة من المزايا:

- دروس تفاعلية
- اختبارات قصيرة
- تقارير للأهل
- دعم فني مستمر

تعتمد المنصة على خوارزميات تحدد مستوى كل طالب على حدة، وتقدّم له محتوى مخصصًا وفقًا لذلك.

أشارت إدارة المنصة إلى أن عدد المدارس المشتركة تجاوز خمسين مدرسة خلال الفصل الدراسي الأول فقط، وهو رقم تصفه الإدارة بأنه يعكس إقبالاً متزايدًا على الحلول الرقمية في التعليم.

هل ستنجح المنصة في الحفاظ على هذا الزخم مع دخول مدارس جديدة في الفصل القادم؟ الإجابة، كما تقول إدارة المنصة، مرتبطة بمدى استمرار التدريب الميداني للمعلمين.
```

**2:**

```
<!-- targets: AR-SH-001, AR-SH-002, AR-SH-005, AR-SH-006, AR-MSA-004 -->
<!-- NATIVE-REVIEW: msa -->

من المهم الإشارة إلى أن التعليم الإلكتروني أصبح خيارًا أساسيًا وليس مجرد
بديل مؤقت. علاوة على ذلك، فإن منصة "جسر" التعليمية الجديدة تقدم تجربة
تعلم تفاعلية للطلاب في مراحل التعليم الأساسي.

بالإضافة إلى ذلك، توفر المنصة مجموعة من المزايا التي تستحق الذكر:

- دروس تفاعلية
- اختبارات قصيرة
- تقارير للأهل
- دعم فني مستمر

كما أنه من الجدير بالذكر أن المنصة تعتمد على خوارزميات لتحديد مستوى كل
طالب على حدة، وتُقدّم له محتوى مخصصًا وفقًا لذلك. وفي هذا السياق، يمكن
القول إن هذا النهج يمثل نقلة نوعية في طريقة التعلم.

من ناحية أخرى، أشارت إدارة المنصة إلى أن عدد المدارس المشتركة تجاوز
خمسين مدرسة خلال الفصل الدراسي الأول فقط، وهو رقم يعكس، بحسب تصريحاتهم،
الإقبال المتزايد على الحلول الرقمية في التعليم.

في نهاية المطاف، يبقى السؤال المطروح: هل ستنجح المنصة في الحفاظ على هذا
الزخم مع دخول مدارس جديدة في الفصل القادم؟ الإجابة، كما تقول إدارة
المنصة، مرتبطة بمدى استمرار التدريب الميداني للمعلمين.
```

| السؤال / Question | إجابتك / Your answer |
|---|---|
| أيهما أكثر طبيعية (يقرأ كإنسان)؟ 1 أم 2؟ / Which reads more human, 1 or 2? | |
| هل المعنى محفوظ في كليهما؟ (نعم/لا) / Is the meaning preserved in both? (y/n) | |
| هل في أي شيء مُختلَق (أرقام/حقائق/أسماء)؟ (نعم/لا) — إذا نعم، وضّح أين / Is anything invented (numbers/facts/names)? (y/n) — if yes, note where | |
| الطبيعية: 1 (ضعيف) - 5 (ممتاز) لـ 1 / Naturalness 1-5 for candidate 1 | |
| الطبيعية: 1 (ضعيف) - 5 (ممتاز) لـ 2 / Naturalness 1-5 for candidate 2 | |
| ملاحظات حرة / Free comment | |

---

## فقرة 5 / Item 5 — `msa-edit-01`

_ملاحظة: ما في نص أصلي منفصل معروض هنا لأن أحد الخيارين هو نفسه النص الأصلي بدون تعديل — عرضه بشكل منفصل كان رح يكشف أي رقم هو الأصل. قيّم الاثنين بناءً على نصهم فقط. / Note: no separate reference block is shown for this item because one candidate IS the unedited original — showing it separately would reveal which label is which. Judge both candidates on their own text._

**1:**

````
<!-- NATIVE-REVIEW: msa -->
# دليل مختصر لاستخدام واجهة برمجة التطبيقات الخاصة بنا

نحاول أن نجعل توثيق واجهة البرمجة (API) واضحًا قدر الإمكان، لأن أغلب
المطورين الذين يستخدمونها في الأسبوع الأول يواجهون نفس الأسئلة تقريبًا:
كيف نحصل على مفتاح الوصول، وما حد عدد الطلبات المسموح به في الدقيقة.

من الجدير بالإشارة أن اعتماد نهج موحّد وشامل في تصميم واجهات البرمجة
يُعدّ أمرًا بالغ الأهمية بالنسبة لأي فريق تقني يسعى إلى تحقيق النجاح على
المدى الطويل في جميع جوانب دورة حياة المنتج.

الخطوة الأولى هي إنشاء مفتاح API من لوحة التحكم، ثم إرسال طلب GET بسيط
للتأكد من أن المفتاح يعمل:

```javascript
const res = await fetch("https://api.example.com/v1/ping", {
  headers: { Authorization: `Bearer ${apiKey}` }
});
console.log(await res.json());
```

الجدول التالي يلخص الحدود المسموح بها لكل نوع حساب:

| نوع الحساب | الطلبات في الدقيقة | الدعم الفني |
|---|---|---|
| مجاني | 60 | عبر البريد فقط |
| احترافي | 600 | دردشة مباشرة |
| مؤسسات | حسب الاتفاق | مدير حساب مخصص |

إذا تجاوز الطلب الحد المسموح، يعيد الخادم رمز الحالة 429، ويُفضّل أن
يتعامل التطبيق مع هذا الرمز بإعادة المحاولة بعد فترة انتظار قصيرة بدلًا
من الفشل الفوري.
````

**2:**

````
<!-- NATIVE-REVIEW: msa -->
# دليل مختصر لاستخدام واجهة برمجة التطبيقات الخاصة بنا

نحاول أن نجعل توثيق واجهة البرمجة (API) واضحًا قدر الإمكان، لأن أغلب
المطورين الذين يستخدمونها في الأسبوع الأول يواجهون نفس الأسئلة تقريبًا:
كيف نحصل على مفتاح الوصول، وما حد عدد الطلبات المسموح به في الدقيقة.

نهج تصميم واحد لواجهة البرمجة يوفر وقت فريقنا التقني على المدى الطويل،
وهذا بالضبط سبب أن معظم المطورين يواجهون نفس السؤالين في الأسبوع الأول:
هذا التوثيق مصمم ليجيب عنهما مباشرة.

الخطوة الأولى هي إنشاء مفتاح API من لوحة التحكم، ثم إرسال طلب GET بسيط
للتأكد من أن المفتاح يعمل:

```javascript
const res = await fetch("https://api.example.com/v1/ping", {
  headers: { Authorization: `Bearer ${apiKey}` }
});
console.log(await res.json());
```

الجدول التالي يلخص الحدود المسموح بها لكل نوع حساب:

| نوع الحساب | الطلبات في الدقيقة | الدعم الفني |
|---|---|---|
| مجاني | 60 | عبر البريد فقط |
| احترافي | 600 | دردشة مباشرة |
| مؤسسات | حسب الاتفاق | مدير حساب مخصص |

إذا تجاوز الطلب الحد المسموح، يعيد الخادم رمز الحالة 429، ويُفضّل أن
يتعامل التطبيق مع هذا الرمز بإعادة المحاولة بعد فترة انتظار قصيرة بدلًا
من الفشل الفوري.
````

| السؤال / Question | إجابتك / Your answer |
|---|---|
| أيهما أكثر طبيعية (يقرأ كإنسان)؟ 1 أم 2؟ / Which reads more human, 1 or 2? | |
| هل المعنى محفوظ في كليهما؟ (نعم/لا) / Is the meaning preserved in both? (y/n) | |
| هل في أي شيء مُختلَق (أرقام/حقائق/أسماء)؟ (نعم/لا) — إذا نعم، وضّح أين / Is anything invented (numbers/facts/names)? (y/n) — if yes, note where | |
| الطبيعية: 1 (ضعيف) - 5 (ممتاز) لـ 1 / Naturalness 1-5 for candidate 1 | |
| الطبيعية: 1 (ضعيف) - 5 (ممتاز) لـ 2 / Naturalness 1-5 for candidate 2 | |
| ملاحظات حرة / Free comment | |

---

## فقرة 6 / Item 6 — `msa-seo-01`

_ملاحظة: ما في نص أصلي منفصل معروض هنا لأن أحد الخيارين هو نفسه النص الأصلي بدون تعديل — عرضه بشكل منفصل كان رح يكشف أي رقم هو الأصل. قيّم الاثنين بناءً على نصهم فقط. / Note: no separate reference block is shown for this item because one candidate IS the unedited original — showing it separately would reveal which label is which. Judge both candidates on their own text._

**1:**

```
---
title: أساسيات التسويق عبر البريد الإلكتروني
description: مقدمة عملية حول بناء حملات بريد إلكتروني فعالة.
---
<!-- NATIVE-REVIEW: msa -->

# أساسيات التسويق عبر البريد الإلكتروني

يُعد التسويق عبر البريد الإلكتروني من أكثر القنوات فعالية من حيث التكلفة
بالنسبة للشركات الصغيرة والمتوسطة، إذ يتيح التواصل المباشر مع العملاء دون
الاعتماد الكامل على خوارزميات منصات التواصل الاجتماعي [shortcode
cta id="7"].

## لماذا تبقى القائمة البريدية مهمة

القائمة البريدية المبنية بعناية أصل طويل الأمد للشركة، ومعدل الفتح يتراوح
بين حملة وأخرى بحسب جودة العنوان. راجع [دليل بناء القائمة البريدية](/blog/email-list)
لمزيد من التفاصيل، وكذلك [مقارنة أدوات إرسال البريد](/blog/email-tools).

<!-- wp:paragraph {"align":"right"} -->
<p>الإعدادات التقنية موثقة في ملف <code>mail-config.json</code>.</p>
<!-- /wp:paragraph -->

## بناء حملة أولى

بناء أول حملة بريد إلكتروني يبدأ عادة بتحديد الهدف: هل الغرض هو الترويج
لمنتج جديد، أم تذكير العملاء بعرض قائم؟ يُنصح بألا تتجاوز الحملة الواحدة
هدفًا رئيسيًا واحدًا حتى لا يتشتت القارئ.

![لقطة شاشة لواجهة إنشاء حملة بريد إلكتروني](email-dashboard.jpg)

<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Article","headline":"أساسيات التسويق عبر البريد الإلكتروني"}
</script>

## معدلات يجب مراقبتها

هناك ثلاثة أرقام تستحق المتابعة أسبوعيًا: معدل الفتح، ومعدل النقر، ومعدل
إلغاء الاشتراك، وغالبًا ما تكفي مراجعة أسبوعية بسيطة لهذه الأرقام الثلاثة
لضبط مسار الحملة القادمة.
```

**2:**

```
---
title: أساسيات التسويق عبر البريد الإلكتروني
description: مقدمة عملية حول بناء حملات بريد إلكتروني فعالة.
---
<!-- NATIVE-REVIEW: msa -->

# أساسيات التسويق عبر البريد الإلكتروني

يُعد التسويق عبر البريد الإلكتروني من أكثر القنوات فعالية من حيث التكلفة
بالنسبة للشركات الصغيرة والمتوسطة، إذ يتيح التواصل المباشر مع العملاء دون
الاعتماد الكامل على خوارزميات منصات التواصل الاجتماعي [shortcode
cta id="7"].

## لماذا تبقى القائمة البريدية مهمة

من الجدير بالإشارة أن قائمة بريدية مبنية بعناية تُعتبر من الأصول طويلة
الأمد للشركة، ومن المهم الإشارة إلى أن معدل الفتح يتراوح بين حملة وأخرى
بحسب جودة العنوان. راجع [دليل بناء القائمة البريدية](/blog/email-list)
لمزيد من التفاصيل، وكذلك [مقارنة أدوات إرسال البريد](/blog/email-tools).

<!-- wp:paragraph {"align":"right"} -->
<p>الإعدادات التقنية موثقة في ملف <code>mail-config.json</code>.</p>
<!-- /wp:paragraph -->

## بناء حملة أولى

بناء أول حملة بريد إلكتروني يبدأ عادة بتحديد الهدف: هل الغرض هو الترويج
لمنتج جديد، أم تذكير العملاء بعرض قائم؟ يُنصح بألا تتجاوز الحملة الواحدة
هدفًا رئيسيًا واحدًا حتى لا يتشتت القارئ.

![لقطة شاشة لواجهة إنشاء حملة بريد إلكتروني](email-dashboard.jpg)

<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Article","headline":"أساسيات التسويق عبر البريد الإلكتروني"}
</script>

## معدلات يجب مراقبتها

هناك ثلاثة أرقام تستحق المتابعة أسبوعيًا: معدل الفتح، ومعدل النقر، ومعدل
إلغاء الاشتراك، وغالبًا ما تكفي مراجعة أسبوعية بسيطة لهذه الأرقام الثلاثة
لضبط مسار الحملة القادمة.
```

| السؤال / Question | إجابتك / Your answer |
|---|---|
| أيهما أكثر طبيعية (يقرأ كإنسان)؟ 1 أم 2؟ / Which reads more human, 1 or 2? | |
| هل المعنى محفوظ في كليهما؟ (نعم/لا) / Is the meaning preserved in both? (y/n) | |
| هل في أي شيء مُختلَق (أرقام/حقائق/أسماء)؟ (نعم/لا) — إذا نعم، وضّح أين / Is anything invented (numbers/facts/names)? (y/n) — if yes, note where | |
| الطبيعية: 1 (ضعيف) - 5 (ممتاز) لـ 1 / Naturalness 1-5 for candidate 1 | |
| الطبيعية: 1 (ضعيف) - 5 (ممتاز) لـ 2 / Naturalness 1-5 for candidate 2 | |
| ملاحظات حرة / Free comment | |

---

## فقرة 7 / Item 7 — `egt-rewrite-01`

_ملاحظة: ما في نص أصلي منفصل معروض هنا لأن أحد الخيارين هو نفسه النص الأصلي بدون تعديل — عرضه بشكل منفصل كان رح يكشف أي رقم هو الأصل. قيّم الاثنين بناءً على نصهم فقط. / Note: no separate reference block is shown for this item because one candidate IS the unedited original — showing it separately would reveal which label is which. Judge both candidates on their own text._

**1:**

```
<!-- targets: AR-EGT-001, AR-EGT-004, AR-EGT-006, AR-EGT-011, AR-EGT-022 -->
<!-- NATIVE-REVIEW: egt -->

من المهم أن نتحدث اليوم عن سماعة "نايل ساوند" اللاسلكية الجديدة، والتي
تم إطلاقها الشهر الماضي بسعر يناسب فئة واسعة من المستخدمين في السوق
المحلي.

السماعة تأتي بتصميم مضغوط، وتحتوي على بطارية تدوم لمدة تصل إلى ثمانية
ساعات على شحنة واحدة، وهذا الأمر يُعتبر مناسبًا لمن يستخدمها طوال اليوم
في العمل أو أثناء التنقل بين الأماكن المختلفة.

جودة الصوت جيدة بشكل عام، لكن هناك ملاحظة على أداء الميكروفون في الأماكن
المزدحمة، حيث يلتقط ضوضاء الخلفية بشكل واضح أثناء المكالمات، وهذا الأمر
يحتاج إلى تحسين في الإصدارات القادمة من المنتج.

السعر يبلغ تسعمائة جنيه، وهو أقل من المنافسين المباشرين الذين تتراوح
أسعارهم بين ألف ومائتين جنيه إلى ألف وخمسمائة جنيه، مع فروقات بسيطة في
جودة العزل الصوتي.

بشكل عام، السماعة خيار جيد لمن يريد سماعة عملية بسعر معقول، لكنها ليست
الخيار الأفضل لمن يحتاج جودة ميكروفون احترافية لتسجيل المكالمات الطويلة.
```

**2:**

```
يعني خليني أحكيلكم عن سماعة "نايل ساوند" اللاسلكية. طلعت الشهر اللي فات
بسعر مناسب لشريحة كبيرة من الناس في السوق المحلي. سعرها كويس بجد.

الشكل بتاعها مضغوط ومريح، والبطارية بجد حلوة: بتدوم ثمانية ساعات على شحنة
واحدة، يعني تقريبا كفاية يوم شغل كامل من غير ما تدوّر على الشاحن — وده مناسب
أوي لو بتستخدمها طول اليوم في الشغل أو وانت متنقل من مكان لمكان.

الصوت كويس بصراحة بشكل عام، بس في حاجة لازم أقولها: المايك بيتخانق شوية في
الأماكن الزحمة. لو بتكلم حد وانت في مكان فيه دوشة، هيسمع صوت اللي حواليك واضح
في المكالمة، وده حاجة محتاجة تتحسّن في الإصدارات الجاية.

السعر تسعمائة جنيه، وده أقل من المنافسين المباشرين اللي بياخدوا من ألف ومائتين
جنيه لحد ألف وخمسمائة جنيه، مع فروق بسيطة في جودة العزل الصوتي.

في الآخر، هي كويسة بس مش تحفة — اختيار كويس لو عايز سماعة عملية بسعر معقول،
بس مش هي الاختيار الأفضل لو شغلك محتاج جودة مايك احترافية في مكالمات طويلة.
```

| السؤال / Question | إجابتك / Your answer |
|---|---|
| أيهما أكثر طبيعية (يقرأ كإنسان)؟ 1 أم 2؟ / Which reads more human, 1 or 2? | |
| هل المعنى محفوظ في كليهما؟ (نعم/لا) / Is the meaning preserved in both? (y/n) | |
| هل في أي شيء مُختلَق (أرقام/حقائق/أسماء)؟ (نعم/لا) — إذا نعم، وضّح أين / Is anything invented (numbers/facts/names)? (y/n) — if yes, note where | |
| الطبيعية: 1 (ضعيف) - 5 (ممتاز) لـ 1 / Naturalness 1-5 for candidate 1 | |
| الطبيعية: 1 (ضعيف) - 5 (ممتاز) لـ 2 / Naturalness 1-5 for candidate 2 | |
| ملاحظات حرة / Free comment | |

---

## فقرة 8 / Item 8 — `egt-edit-01`

_ملاحظة: ما في نص أصلي منفصل معروض هنا لأن أحد الخيارين هو نفسه النص الأصلي بدون تعديل — عرضه بشكل منفصل كان رح يكشف أي رقم هو الأصل. قيّم الاثنين بناءً على نصهم فقط. / Note: no separate reference block is shown for this item because one candidate IS the unedited original — showing it separately would reveal which label is which. Judge both candidates on their own text._

**1:**

````
<!-- NATIVE-REVIEW: egt -->
# تجربتي في عمل بوت واتساب لمحلي

بقالي شهرين عامل بوت واتساب بسيط لمحل الموبايلات بتاعي، وحبيت أشارك
تجربتي مع اللي بيفكروا يعملوا حاجة زي كده. مكنتش أعرف حاجة في البرمجة
أصلاً، بس لقيت شرح بسيط على يوتيوب وبدأت منه.

وحاجة مهمة اتعلمتها وأنا بعمل كده: متحاولش تعمل كل حاجة مرة واحدة. اللي
فرق معايا إني بدأت بسيط وبعدين ضفت حاجات بالراحة، مش رميت كل الأتمتة على
البوت من أول يوم.

الفكرة كانت بسيطة: لما حد يبعت رسالة فيها كلمة "سعر"، البوت يرد بقائمة
الأسعار أوتوماتيك من غير ما أرد أنا بنفسي كل مرة. الكود مش معقد خالص:

```javascript
if (message.includes("سعر")) {
  reply(priceList);
} else {
  reply("اكتب سعر عشان تشوف قائمة الأسعار");
}
```

وده جدول بسيط بالفرق قبل وبعد ما ركبت البوت:

| قبل البوت | بعد البوت |
|---|---|
| رد على كل رسالة يدويًا | رد أوتوماتيك على الاستفسارات المتكررة |
| ساعتين يوميًا على الرسايل | نص ساعة بس |
| بنسى أرد على بعض العملاء | كل حد بياخد رد فورًا |

النصيحة اللي أقدر أديها لحد بيفكر يعمل نفس الحاجة: ابدأ بسيط، البوت مش
لازم يرد على كل حاجة، يكفي إنه يمسك أكتر سؤال بيتكرر.
````

**2:**

````
<!-- NATIVE-REVIEW: egt -->
# تجربتي في عمل بوت واتساب لمحلي

بقالي شهرين عامل بوت واتساب بسيط لمحل الموبايلات بتاعي، وحبيت أشارك
تجربتي مع اللي بيفكروا يعملوا حاجة زي كده. مكنتش أعرف حاجة في البرمجة
أصلاً، بس لقيت شرح بسيط على يوتيوب وبدأت منه.

من الجدير بالذكر أن اعتماد نهج شامل ومتكامل في أتمتة خدمة العملاء يُعد
أمرًا بالغ الأهمية لأي نشاط تجاري يسعى لتحقيق النجاح المستدام على المدى
الطويل.

الفكرة كانت بسيطة: لما حد يبعت رسالة فيها كلمة "سعر"، البوت يرد بقائمة
الأسعار أوتوماتيك من غير ما أرد أنا بنفسي كل مرة. الكود مش معقد خالص:

```javascript
if (message.includes("سعر")) {
  reply(priceList);
} else {
  reply("اكتب سعر عشان تشوف قائمة الأسعار");
}
```

وده جدول بسيط بالفرق قبل وبعد ما ركبت البوت:

| قبل البوت | بعد البوت |
|---|---|
| رد على كل رسالة يدويًا | رد أوتوماتيك على الاستفسارات المتكررة |
| ساعتين يوميًا على الرسايل | نص ساعة بس |
| بنسى أرد على بعض العملاء | كل حد بياخد رد فورًا |

النصيحة اللي أقدر أديها لحد بيفكر يعمل نفس الحاجة: ابدأ بسيط، البوت مش
لازم يرد على كل حاجة، يكفي إنه يمسك أكتر سؤال بيتكرر.
````

| السؤال / Question | إجابتك / Your answer |
|---|---|
| أيهما أكثر طبيعية (يقرأ كإنسان)؟ 1 أم 2؟ / Which reads more human, 1 or 2? | |
| هل المعنى محفوظ في كليهما؟ (نعم/لا) / Is the meaning preserved in both? (y/n) | |
| هل في أي شيء مُختلَق (أرقام/حقائق/أسماء)؟ (نعم/لا) — إذا نعم، وضّح أين / Is anything invented (numbers/facts/names)? (y/n) — if yes, note where | |
| الطبيعية: 1 (ضعيف) - 5 (ممتاز) لـ 1 / Naturalness 1-5 for candidate 1 | |
| الطبيعية: 1 (ضعيف) - 5 (ممتاز) لـ 2 / Naturalness 1-5 for candidate 2 | |
| ملاحظات حرة / Free comment | |

---

## فقرة 9 / Item 9 — `egt-seo-01`

_ملاحظة: ما في نص أصلي منفصل معروض هنا لأن أحد الخيارين هو نفسه النص الأصلي بدون تعديل — عرضه بشكل منفصل كان رح يكشف أي رقم هو الأصل. قيّم الاثنين بناءً على نصهم فقط. / Note: no separate reference block is shown for this item because one candidate IS the unedited original — showing it separately would reveal which label is which. Judge both candidates on their own text._

**1:**

```
---
title: أكلات مصرية سريعة للعشا
description: أفكار أكل مصري سريع وسهل لما مايكونش عندك وقت كتير.
---
<!-- NATIVE-REVIEW: egt -->

# أكلات مصرية سريعة للعشا

لما بيكون معاك وقت محدود، مش لازم الأكل السريع يبقى وجبة جاهزة بس —
فيه أكل مصري سريع تقدر تعمله في البيت بنفسك، أكلات بسيطة بتتعمل في أقل من
نص ساعة وطعمها حلو أوي [shortcode
cta id="4"].

## ليه الأكل السريع مش لازم يبقى مضر

الأكل السريع في البيت مختلف تمام عن الأكل الجاهز، لأنك متحكم في
المكونات واللي بتحطه في الأكل. شوف [مقالنا عن وجبات الفريزر](/blog/freezer-meals)
لأفكار تانية، وكمان [قائمة مكونات أساسية للمطبخ](/blog/pantry-basics)
تفيدك في التخطيط.

<!-- wp:paragraph {"align":"right"} -->
<p>المقادير الكاملة موجودة في ملف <code>recipes.json</code> لو حابب
تعدلها.</p>
<!-- /wp:paragraph -->

## أكلة الكشري السريع

الكشري مش لازم ياخد ساعتين، فيه طريقة مختصرة بتستخدم أرز مسبق وعدس أحمر
بيستوي بسرعة، والصلصة بتتعمل في نفس الوقت وهي بتستوي.

![طبق كشري مصري سريع التحضير](koshari-quick.jpg)

<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Recipe","name":"أكلات مصرية سريعة للعشا"}
</script>

## وقت التحضير لكل أكلة

في تلات أكلات هنا، وقت تحضيرهم يتراوح بين خمستاشر دقيقة للسلطة، وعشرين
دقيقة للكشري المختصر، وخمس وعشرين دقيقة للفتة السريعة.
```

**2:**

```
---
title: أكلات مصرية سريعة للعشا
description: أفكار أكل مصري سريع وسهل لما مايكونش عندك وقت كتير.
---
<!-- NATIVE-REVIEW: egt -->

# أكلات مصرية سريعة للعشا

لما بيكون معاك وقت محدود، مش لازم الأكل السريع يبقى وجبة جاهزة بس.
فيه أكلات مصرية بسيطة بتتعمل في أقل من نص ساعة وطعمها حلو أوي [shortcode
cta id="4"].

## ليه الأكل السريع مش لازم يبقى مضر

الأكل السريع في البيت مختلف تمامًا عن الأكل الجاهز، لأنك متحكم في
المكونات واللي بتحطه في الأكل. شوف [مقالنا عن وجبات الفريزر](/blog/freezer-meals)
لأفكار تانية، وكمان [قائمة مكونات أساسية للمطبخ](/blog/pantry-basics)
تفيدك في التخطيط.

<!-- wp:paragraph {"align":"right"} -->
<p>المقادير الكاملة موجودة في ملف <code>recipes.json</code> لو حابب
تعدلها.</p>
<!-- /wp:paragraph -->

## أكلة الكشري السريع

الكشري مش لازم ياخد ساعتين، فيه طريقة مختصرة بتستخدم أرز مسبق وعدس أحمر
بيستوي بسرعة، والصلصة بتتعمل في نفس الوقت وهي بتستوي.

![طبق كشري مصري سريع التحضير](koshari-quick.jpg)

<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Recipe","name":"أكلات مصرية سريعة للعشا"}
</script>

## وقت التحضير لكل أكلة

في تلات أكلات هنا، وقت تحضيرهم يتراوح بين خمستاشر دقيقة للسلطة، وعشرين
دقيقة للكشري المختصر، وخمس وعشرين دقيقة للفتة السريعة.
```

| السؤال / Question | إجابتك / Your answer |
|---|---|
| أيهما أكثر طبيعية (يقرأ كإنسان)؟ 1 أم 2؟ / Which reads more human, 1 or 2? | |
| هل المعنى محفوظ في كليهما؟ (نعم/لا) / Is the meaning preserved in both? (y/n) | |
| هل في أي شيء مُختلَق (أرقام/حقائق/أسماء)؟ (نعم/لا) — إذا نعم، وضّح أين / Is anything invented (numbers/facts/names)? (y/n) — if yes, note where | |
| الطبيعية: 1 (ضعيف) - 5 (ممتاز) لـ 1 / Naturalness 1-5 for candidate 1 | |
| الطبيعية: 1 (ضعيف) - 5 (ممتاز) لـ 2 / Naturalness 1-5 for candidate 2 | |
| ملاحظات حرة / Free comment | |

---

## فقرة 10 / Item 10 — `shami-rewrite-01`

_ملاحظة: ما في نص أصلي منفصل معروض هنا لأن أحد الخيارين هو نفسه النص الأصلي بدون تعديل — عرضه بشكل منفصل كان رح يكشف أي رقم هو الأصل. قيّم الاثنين بناءً على نصهم فقط. / Note: no separate reference block is shown for this item because one candidate IS the unedited original — showing it separately would reveal which label is which. Judge both candidates on their own text._

**1:**

```
<!-- targets: AR-SHM-001, AR-SHM-005, AR-SHM-006, AR-SHM-007, AR-SHM-015 -->
<!-- NATIVE-REVIEW: shami -->

يُريدُ الكثير من الزوّار أن يعرفوا أفضل الأماكن في المدينة القديمة قبل
زيارتها، ولذلك سوف نستعرض في هذا المقال أهم النقاط التي يجب أن يزورها أي
سائح لأول مرة.

المدينة القديمة تحتوي على سوق كبير مليء بالمحلات التقليدية، ولا يستطيع
الزائر أن يفوّت زيارة السوق المركزي الذي يعود تاريخه إلى مئات السنين.
هناك أيضًا العديد من المقاهي القديمة التي يجلس فيها الناس لساعات طويلة.

يجب على الزائر أن يبدأ جولته في الصباح الباكر قبل أن يزدحم السوق
بالناس، وذلك لأنه سيحصل على تجربة أهدأ ويستطيع أن يلتقط صورًا أوضح
للأزقة الضيقة والمباني القديمة.

الأسعار في المطاعم المحلية تتراوح بين خمسة عشر وخمسة وعشرين دولارًا
للوجبة الكاملة، وهي أسعار معقولة مقارنة بالمطاعم السياحية الأكبر
القريبة من المداخل الرئيسية للمدينة القديمة.

في النهاية، ننصح كل زائر بأن يخصص يومًا كاملاً على الأقل لاستكشاف المدينة
القديمة، لأن ساعتين أو ثلاث ساعات لا تكفي لرؤية تفاصيلها الكثيرة.
```

**2:**

```
كتير من الزوّار بدّهم يعرفوا أحسن الأماكن بالمدينة القديمة قبل ما يزوروها.
رح نحكي بهاد المقال عن أهم النقاط يلي لازم أي سائح يزورها أول مرة. بس خلينا
نبلش.

المدينة القديمة فيها سوق كبير مليان محلات تقليدية، وما بيقدر الزائر يفوّت
زيارة السوق المركزي يلي بيرجع تاريخه لمية سنين. كمان في كتير مقاهي قديمة
بيقعد فيها الناس ساعات طويلة.

الزائر لازم يبلش جولته بدري الصبح قبل ما السوق يزدحم بالناس، لأنو هيك رح
ياخد تجربة أهدأ وبيقدر يلتقط صور أوضح للأزقة الضيقة والأبنية القديمة.

أسعار المطاعم المحلية بتتراوح بين خمسة عشر وخمسة وعشرين دولارًا للوجبة
الكاملة، وهاد سعر معقول قياسًا بالمطاعم السياحية الأكبر يلي قريبة من
المداخل الرئيسية للمدينة القديمة.

بالآخر، بننصح كل زائر يخصص يوم كامل عالأقل لاستكشاف المدينة القديمة، لأنو
ساعتين أو تلات ساعات ما بتكفي يشوف كل تفاصيلها.
```

| السؤال / Question | إجابتك / Your answer |
|---|---|
| أيهما أكثر طبيعية (يقرأ كإنسان)؟ 1 أم 2؟ / Which reads more human, 1 or 2? | |
| هل المعنى محفوظ في كليهما؟ (نعم/لا) / Is the meaning preserved in both? (y/n) | |
| هل في أي شيء مُختلَق (أرقام/حقائق/أسماء)؟ (نعم/لا) — إذا نعم، وضّح أين / Is anything invented (numbers/facts/names)? (y/n) — if yes, note where | |
| الطبيعية: 1 (ضعيف) - 5 (ممتاز) لـ 1 / Naturalness 1-5 for candidate 1 | |
| الطبيعية: 1 (ضعيف) - 5 (ممتاز) لـ 2 / Naturalness 1-5 for candidate 2 | |
| ملاحظات حرة / Free comment | |

---

## فقرة 11 / Item 11 — `shami-edit-01`

_ملاحظة: ما في نص أصلي منفصل معروض هنا لأن أحد الخيارين هو نفسه النص الأصلي بدون تعديل — عرضه بشكل منفصل كان رح يكشف أي رقم هو الأصل. قيّم الاثنين بناءً على نصهم فقط. / Note: no separate reference block is shown for this item because one candidate IS the unedited original — showing it separately would reveal which label is which. Judge both candidates on their own text._

**1:**

````
<!-- NATIVE-REVIEW: shami -->
# كيف رتّبت الشبكة المنزلية عندي

من كام شهر قررت رتّب الشبكة بالبيت لأنه كان في نقطة عمياء بالغرفة
الخلفية، الواي فاي ما كان يوصل عليها أبداً. جربت كذا حل قبل ما ألاقي
الطريقة يلي نفعت معي.

يُريدُ المستخدم أن يحصل على تغطية شاملة وقوية في جميع أنحاء المنزل، ومن
الضروري أن يتم اختيار جهاز راوتر يتمتع بمواصفات تقنية متقدمة لضمان ذلك.

الحل يلي اشتغل معي كان راوتر مش مكلف كتير، بس ضفت عليه extender بالغرفة
الخلفية. الإعداد كان بسيط، هيك تقريباً:

```
SSID: home-network
Channel: auto
Extender mode: repeater
Backhaul: wireless
```

هاد جدول فيه مقارنة بسيطة بين الحل القديم والجديد:

| قبل | بعد |
|---|---|
| سرعة ضعيفة بالغرفة الخلفية | تغطية كاملة بكل الغرف |
| قطع متكرر بالاتصال | اتصال ثابت تقريباً طول اليوم |
| راوتر واحد بس | راوتر + extender |

يلي بدّو يعمل نفس الشي، بنصحه يبلش بمكان الراوتر قبل ما يشتري أي جهاز
إضافي، بكتير حالات المشكلة بتكون بس بمكان الراوتر مش بقوته.
````

**2:**

````
<!-- NATIVE-REVIEW: shami -->
# كيف رتّبت الشبكة المنزلية عندي

من كام شهر قررت رتّب الشبكة بالبيت لأنه كان في نقطة عمياء بالغرفة
الخلفية، الواي فاي ما كان يوصل عليها أبداً. جربت كذا حل قبل ما ألاقي
الطريقة يلي نفعت معي.

كنت بدّي تغطية قوية بكل أنحاء البيت، فلازم دوّر على راوتر مواصفاته منيحة
يضمنلي هيك الشي.

الحل يلي اشتغل معي كان راوتر مش مكلف كتير، بس ضفت عليه extender بالغرفة
الخلفية. الإعداد كان بسيط، هيك تقريباً:

```
SSID: home-network
Channel: auto
Extender mode: repeater
Backhaul: wireless
```

هاد جدول فيه مقارنة بسيطة بين الحل القديم والجديد:

| قبل | بعد |
|---|---|
| سرعة ضعيفة بالغرفة الخلفية | تغطية كاملة بكل الغرف |
| قطع متكرر بالاتصال | اتصال ثابت تقريباً طول اليوم |
| راوتر واحد بس | راوتر + extender |

يلي بدّو يعمل نفس الشي، بنصحه يبلش بمكان الراوتر قبل ما يشتري أي جهاز
إضافي، بكتير حالات المشكلة بتكون بس بمكان الراوتر مش بقوته.
````

| السؤال / Question | إجابتك / Your answer |
|---|---|
| أيهما أكثر طبيعية (يقرأ كإنسان)؟ 1 أم 2؟ / Which reads more human, 1 or 2? | |
| هل المعنى محفوظ في كليهما؟ (نعم/لا) / Is the meaning preserved in both? (y/n) | |
| هل في أي شيء مُختلَق (أرقام/حقائق/أسماء)؟ (نعم/لا) — إذا نعم، وضّح أين / Is anything invented (numbers/facts/names)? (y/n) — if yes, note where | |
| الطبيعية: 1 (ضعيف) - 5 (ممتاز) لـ 1 / Naturalness 1-5 for candidate 1 | |
| الطبيعية: 1 (ضعيف) - 5 (ممتاز) لـ 2 / Naturalness 1-5 for candidate 2 | |
| ملاحظات حرة / Free comment | |

---

## فقرة 12 / Item 12 — `shami-seo-01`

_ملاحظة: ما في نص أصلي منفصل معروض هنا لأن أحد الخيارين هو نفسه النص الأصلي بدون تعديل — عرضه بشكل منفصل كان رح يكشف أي رقم هو الأصل. قيّم الاثنين بناءً على نصهم فقط. / Note: no separate reference block is shown for this item because one candidate IS the unedited original — showing it separately would reveal which label is which. Judge both candidates on their own text._

**1:**

```
---
title: أكلات شامية سهلة للبيت
description: وصفات شامية بسيطة تقدر تحضرها بالبيت بدون تعقيد.
---
<!-- NATIVE-REVIEW: shami -->

# أكلات شامية سهلة للبيت

المطبخ الشامي فيه أكلات كتير بتاخد وقت طويل، بس في كمان أكلات بسيطة
وسريعة ممكن تحضرها أي يوم بالأسبوع [shortcode cta id="5"].

## ليش نبلش بأكلات بسيطة

إذا بدّك تتقن المطبخ الشامي، الأحسن تتعلم خطوة خطوة وما تستعجل — هيك
بتضمن نتيجة أحلى عالمدى الطويل. راجع [مقالنا عن أدوات المطبخ الأساسية](/blog/kitchen-basics)
وكمان [دليل التوابل الشامية](/blog/spices-guide) لمزيد من التفاصيل.

<!-- wp:paragraph {"align":"right"} -->
<p>المقادير الكاملة موجودة بملف <code>recipes-sham.json</code>.</p>
<!-- /wp:paragraph -->

## أكلة الفتوش السريع

الفتوش من أسهل الأكلات، بس المهم تحمّص الخبز منيح لأنه هو يلي بيعطي
الطبق طعمه المميز. الخضار لازم تكون طازة، وصلصة الرمان لازم تنحط بآخر
لحظة قبل التقديم.

![طبق فتوش شامي جاهز للتقديم](fattoush-sham.jpg)

<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Recipe","name":"أكلات شامية سهلة للبيت"}
</script>

## وقت التحضير

في تلات وصفات هون: الفتوش بياخد عشر دقايق، والمتبل بياخد خمس وعشرين
دقيقة، والمجدرة بتاخد أربعين دقيقة تقريباً من البداية للنهاية.
```

**2:**

```
---
title: أكلات شامية سهلة للبيت
description: وصفات شامية بسيطة تقدر تحضرها بالبيت بدون تعقيد.
---
<!-- NATIVE-REVIEW: shami -->

# أكلات شامية سهلة للبيت

المطبخ الشامي فيه أكلات كتير بتاخد وقت طويل، بس في كمان أكلات بسيطة
وسريعة ممكن تحضرها أي يوم بالأسبوع [shortcode cta id="5"].

## ليش نبلش بأكلات بسيطة

من الجدير بالإشارة أن اعتماد نهج تدريجي ومنظم في تعلم الطبخ الشامي يُعد
أمرًا بالغ الأهمية لأي شخص يسعى لإتقان هذا المطبخ الغني على المدى
الطويل. راجع [مقالنا عن أدوات المطبخ الأساسية](/blog/kitchen-basics)
وكمان [دليل التوابل الشامية](/blog/spices-guide) لمزيد من التفاصيل.

<!-- wp:paragraph {"align":"right"} -->
<p>المقادير الكاملة موجودة بملف <code>recipes-sham.json</code>.</p>
<!-- /wp:paragraph -->

## أكلة الفتوش السريع

الفتوش من أسهل الأكلات، بس المهم تحمّص الخبز منيح لأنه هو يلي بيعطي
الطبق طعمه المميز. الخضار لازم تكون طازة، وصلصة الرمان لازم تنحط بآخر
لحظة قبل التقديم.

![طبق فتوش شامي جاهز للتقديم](fattoush-sham.jpg)

<script type="application/ld+json">
{"@context":"https://schema.org","@type":"Recipe","name":"أكلات شامية سهلة للبيت"}
</script>

## وقت التحضير

في تلات وصفات هون: الفتوش بياخد عشر دقايق، والمتبل بياخد خمس وعشرين
دقيقة، والمجدرة بتاخد أربعين دقيقة تقريباً من البداية للنهاية.
```

| السؤال / Question | إجابتك / Your answer |
|---|---|
| أيهما أكثر طبيعية (يقرأ كإنسان)؟ 1 أم 2؟ / Which reads more human, 1 or 2? | |
| هل المعنى محفوظ في كليهما؟ (نعم/لا) / Is the meaning preserved in both? (y/n) | |
| هل في أي شيء مُختلَق (أرقام/حقائق/أسماء)؟ (نعم/لا) — إذا نعم، وضّح أين / Is anything invented (numbers/facts/names)? (y/n) — if yes, note where | |
| الطبيعية: 1 (ضعيف) - 5 (ممتاز) لـ 1 / Naturalness 1-5 for candidate 1 | |
| الطبيعية: 1 (ضعيف) - 5 (ممتاز) لـ 2 / Naturalness 1-5 for candidate 2 | |
| ملاحظات حرة / Free comment | |

---

_Seed used to order this ballot is recorded only in `key.json`, not here._
