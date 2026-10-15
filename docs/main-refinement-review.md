# Main refinement review

Local branch: `surgical/main-fundraising`, based on main `6dcca247bdb68813fc86231f4307e5c083a571b7`. GitHub connector confirmed that current remote tip on 15 October 2026; shell fetch was unavailable because its proxy could not connect. Working tree was initially clean. No original branch was overwritten. The user subsequently authorised pushing this feature branch to GitHub. No merge, deployment or transaction was performed.

## Component changes

| Component | Change |
| --- | --- |
| Hero / photography | Original three-line heading, underline SVG, red disc, photograph frames/transforms, handwritten note, star, sticker, ticker and image crops retained. Labels now explicitly distinguish illustration from KCH photography. Programme replacements remain pending approved assets |
| Stats | Same three-number horizontal rhythm: 1961 foundation, 6,000+ historical published care summary, ~400 published annual estimate. Short expandable source/time-basis note. No sum or growth inference |
| CountyMap | All 47 county paths, keyboard operation, selector, zoom and credit retained. Neutral county state is explicit. Nairobi offers Kibera and JGA; Narok map activation opens Soila; other unknown-location records are not pinned |
| ProjectCard / directory | Original cards, images and spacing; six programme records across five groupings. Search, programme and All/Ongoing filters retained without invented completed/planned work. Home preview uses three actual records |
| ProjectDialog | Sourced descriptor replaces progress/children panel. Source context and dated update/note. Butterfly includes August 2025 camp account plus contained fictional review/funding bar. CTA carries programme interest into giving. Focus trap, Escape, restore and scroll lock |
| Charts | Original bars, horizontal comparison bars, card footprints and colours retained. Explicit 21/24/27 completed of 30 scheduled; selector switches measure. Definitions are expandable. No fictional KCH totals |
| Impact | Existing story region explains example evidence, coordinator response, later observation and next review. Other themes remain explicitly illustrative. Compact reports/questions area; footer reports link targets it |
| Donate | Existing split story/form, photos, preset/custom amounts and angular controls retained. Local reducer provides idle, pending, confirmed, cancelled, failed and timed-out states. Confirmation requires a separate event; duplicate/stale events ignored. Pending auto-times out after 30 seconds. Retry keeps intent. Unsupported payment options removed from availability. Monthly clarified. Updates optional, sample shown only after mock confirmation. Funding detail remains compact; in-kind, volunteering, partnerships and external help routes retained |
| About / Footer | Supplied KCH foundation, family-based mission and Kenyan Board positioning; values/roadmap composition retained with proposed-method label. Current website points to kch.co.ke; help and reports added to existing footer columns |
| Data / payment | Independent programme IDs, county lookup, null missing numbers and explicit comparable example observations; separate pledge accounting; network-free payment event reducer |

## Visual evidence and checks

Full-page before/after captures are saved under `work/screenshots/{before,after}/` at matching **1440×1000 desktop** and **375×812 mobile** viewports for `/`, `/about`, `/projects`, `/impact` and `/donate` (20 captures). `work/capture.mjs` reproduces them. Additional state captures and a comparison index accompany the screenshots. Copies are included in `docs/review/` for access through GitHub.

The requested chat output directory is absent on the attached environment and its `/` is not writable; captures therefore remain in the writable workspace. The user subsequently authorised including screenshot copies on the GitHub feature branch.

Original hero geometry, image masks/crops, typography, generous section spacing, cream backgrounds, angular buttons, ticker and heart banner remain. Sparse map data changes map fills and Nairobi detail height; the directory becomes shorter because 47 generated cards are removed. Added detail is confined to existing dialogs, expansions, story and form states. The form still sits alongside the story on desktop and below it on mobile. Footer remains the original grid. No other design branch was imported.

Validation: `npm run build`; eight Playwright checks cover direct routes, local font/photo loading, history, all 47 county selectors and paths, multiple programme locations, sparse counties, keyboard/zoom, directory filtering, dialog focus/Escape/restore, programme giving context, explicit chart observations/definitions, null presentation, pledge separation, pending confirmation, stale/duplicate events, failure/cancel/timeout retry, automatic timeout, optional update choice, absence of POST requests, mobile navigation and horizontal overflow. Final build passed; all eight Playwright tests passed (11.5 seconds). `git diff --check` passed.

Everything marked illustrative is simulated. No KCH outcome uplift, causal wellbeing improvement, real payment, subscription, receipt or email delivery is claimed. Source and remaining publication inputs are detailed in `kch-content-sources.md`.
