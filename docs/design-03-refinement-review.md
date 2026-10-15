# Design 03 — editorial fundraising refinement

Prepared 15 October 2026. Local branch `surgical/design-03-fundraising`, based directly on the freshly fetched `design-03` tip `978e3ce9ab3b4b4779bf1b8677570a40214cf3f2`. The working tree was clean before branch creation. No user work was reset or overwritten. No branches were merged, and no push or deployment is part of this pass.

## Exact component changes

| Component | Concrete refinement | Preserved composition |
| --- | --- | --- |
| Hero stamps | Home replaces an implied 47-county footprint with `1961 / ESTABLISHED`; compact pages replace UK with `KE / KENYAN-LED`. Local numeral fit changes within recorded original stamp dimensions | Same width/height at 320/375/768/1024/1440px, original rotation/placement, black sticker, surrounding strip/mask composition, oversized hero type, brush accents and star |
| EditorialNumbers / Home | Care/Learn/Grow supporting lines describe Butterfly family support, Kibera/JGA education, Soila protection and family follow-up. Manifesto removes UK-base claim and uses source-attributed Kenyan Board positioning | Black emotional bridge, three word-led columns, original type and hierarchy; no metric/funding tiles added |
| Atlas | Six independent programme IDs and county lookup; Nairobi selector offers Kibera/JGA; Narok shows Soila. Only two published county markers; invented network routes and nationwide totals removed. Other counties remain explicit information gaps, with no reach inferred. County pin remains selection context | All 47 county outlines and keyboard/dropdown access, map scale, dotted field, compass, pin and offset photographic card |
| DeliveryChart | Thirty fictional scheduled follow-up tiles: 27 completed and three outstanding in period C. Legend and accessible summary define each tile. Completed/Outstanding controls focus the count and definition, not KCH programme status | Bold tile-board composition, three-part section, large red count, red/cream/black treatment. No ring or new generic card |
| OutcomeRiver | Keeps editorial bars. Explicit A/B/C completed counts 21/24/27, same zero baseline and maximum of 30 scheduled follow-ups. Hatch means earlier example periods A/B; solid red means C. Selected period gets a separate outline. Numeric labels, denominator, context controls and method expansion | Black panel, red bars and hatch pattern, oversized value, typography and chart placement; no imported green line/river layout |
| ChapterStories / Impact | Home/About retain genuine August 2025 Butterfly camp activity/date and source link. Impact’s first repeated collage block uses the shared fictional review: possible transport issue, coordinator response, higher later completion, next review. Association is explicit. Compact funding expansion, not KPI rows | All three collage images/masks, overlap, strong title contrast, chapter controls and large imagery |
| ProjectDialog | Source descriptor and dated note replace generated reach/progress. Butterfly detail includes the defined review and restrained funding bar. Source/method notes expand. CTA carries programme interest without promising restricted allocation. Escape, focus trap/restore and scroll lock | Original rounded dialog, red/cream typography and CTA treatment |
| Programme journal | Six records in five official public groupings; All/Ongoing and search retained. Fake progress bars become sourced establishment-year or continuing-support descriptors. Unknown counts stay null. Directory count is not an impact total | Thin lines, row hierarchy, status shape and page order |
| Donate | Jump-to-form access in Kenya-mask hero. Mock idle/pending/confirmed/cancelled/failed/timed-out states stay in form; confirmation requires an event and ignores stale/duplicate events. Automatic timeout, retained amount/intention/interest/email/theme on retry. Optional sample update choice appears after confirmation. Only amount required; no live card/PayPal availability claim. Monthly remains an intention, not billing. Funding/help and in-kind/volunteer/partner routes are contained | Kenya image mask, themed images, original poetic photo heading, photo-left/form-right desktop layout, photo-first mobile stack, amount controls and editorial spacing |
| Numbered journey | Final content includes delivery, review and approved supporter communication from one programme input. It remains a proposed process, distinct from local payment state | Black section, four steps, large red numeral and selected detail layout |
| About / Footer | Founded in 1961 as Thomas Barnardo House; current focus and source-attributed Kenyan Board leadership after end-2025 handover. UK–Kenya graphic is historical context only. Portraits are illustrative roles, not staff identities/current posts. Current site corrected; reports/help fit original footer columns | Portrait shapes, historical graphic, section order, black footer and red giving-panel ending |

## Evidence and simulation boundaries

See [source notes](kch-content-sources.md). Official About, Donate and Butterfly camp pages were retried and remained inaccessible; content relies on the supplied source brief, not fresh retrieval or independent verification. Retrieval/review date is not reporting period. KCH approval and clarification remain required before publication.

The common fictional example is unchanged: A/B/C each schedule 30 follow-ups; 21/24/27 completed. Both academic-progress and welfare checks must be recorded and reviewed by a coordinator. These are delivery counts, not child wellbeing evidence. Example budget KES 120,000; confirmed KES 80,000; cash required KES 40,000 including KES 10,000 pledged. Pledges are not received or subtracted twice.

No live STK prompt, charge, receipt, email, subscription, recurring mechanism, personal-data storage, external form submission, CMS or staff product was added. No production M-Pesa repair is claimed. All photo-style assets remain illustrative; no new images were generated, downloaded or falsely attributed.

## Visual evidence

[Review index](review/README.md) includes matching 1440×1000 desktop and 375×812 mobile before/after captures for all five routes (20 images), plus 22 interactive-state captures and compact comparison boards. `review/index.html` provides a side-by-side view. `review/baseline-geometry.json` records stamp dimensions before editing and is used by tests.

Comparison covers hero silhouette, diagonal strip crops, Kenya clip paths, sticker size/rotation/placement, brush accents, star, asymmetric collage, black Care/Learn/Grow band, dotted map footprint, black/red chart contrast, red giving panel, split form and large red journey numerals. Mobile chart labels are enlarged without changing the chart scale or panel. Original image files, inactive applications and inherited discovery styles are untouched.

## Verification

- Final `npm run build`: passed.
- All 16 Playwright tests passed in the full run (27.1 seconds). Mobile test passed again after the label-size refinement (4.1-second targeted run).
- Direct five-route loading, local imagery/fonts and browser history.
- All 47 county paths/selectors, keyboard operation, neutral counties, only two published markers/no network routes, Nairobi multiple programmes, Narok/Soila and all atlas modes.
- Real directory search/status filters, null presentation, pledge separation, dialog focus trap/restore/Escape, source expansion, scroll unlock and programme-interest routing.
- Thirty tiles/27 completed/three outstanding; explicit bar geometry, zero baseline, 30 maximum, period values/rates, accessible units and unambiguous hatch meaning.
- Mock states, event-only confirmation, duplicate/stale suppression, cancel/fail/timeout retry, automatic timeout, retained input/intent/theme, optional post-confirmation sample updates and absence of POST submissions.
- Genuine news date/source, Kenyan leadership, historical partnership, illustrative portraits, current-site/help/report links and hash navigation.
- Mobile navigation, direct routes, expanded states and no horizontal overflow at 320/375px. Form/photo layout checked at 320/375/760/768/1024/1440px.
- Stamp width/height and fitting checked against baseline at five widths; 47 Kenya mask paths, slice cropping, diagonal transform, brush/star and black emotional/journey sections retained.
- `git diff --check` passed; inherited styles, entry point, inactive applications and original image files were verified unchanged.

## Remaining KCH input

Approve public/governance/programme copy and republication; clarify reporting periods, definitions and overlap; confirm unrecorded programme locations without identifying families; provide approved imagery, staff profiles and permissions; supply actual observations, funding needs, reports and audit evidence; reconfirm contact/confidential feedback routes and verified live payment, recurring and supporter-update mechanisms.
