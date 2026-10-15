# Kenya Children’s Homes

A five-page React + Vite design prototype using Figtree, DM Mono, and red, white, and black. Fonts and Kenya-focused editorial artwork are served locally.

## Development

Use the existing `/workspace/kenyachildrenshomes` checkout; no worktree is needed.

```sh
cd /workspace/kenyachildrenshomes
npm ci --cache /tmp/npm-cache
npm run dev
```

Requires Node.js 22 or newer. Vite serves the site on port 5173. Routes: `/`, `/about`, `/projects`, `/impact`, `/donate`.

```sh
npm run build
npm test
```

Browser tests use `/usr/bin/chromium` in this cloud environment. Set `CHROMIUM_PATH` to an installed Chromium executable elsewhere. The test runner starts Vite if it is not already running.

## Content and integrations

- `src/data.js` now holds six independent programme records in five public groupings. All 47 county outlines remain; only published locations in the supplied brief are mapped. Missing numeric values are null, and cumulative/current programme claims are not added.
- Home retains its photographic 01/02/03 care approach, with shorter programme-based listening, support and follow-up copy. Projects and Impact keep their distinct rounded map treatments with factual location information, no fake progress or attendance.
- Impact uses explicitly fictional education/family follow-up observations: 21, 24 and 27 completed of 30 scheduled in periods A/B/C. Its three warm metric tiles and delicate data-driven trend remain; no historical year multiplier or wellbeing inference remains.
- About retains the symbolic UK–Kenya connection as a historical partnership illustration. The current organisation is described under Kenyan leadership, and portrait artwork describes roles rather than named employees.
- The giving form demonstrates idle, pending, confirmed, cancelled, failed and timed-out states locally. It sends no request, STK prompt, charge, message or receipt, stores no personal data, and creates no subscription or recurring billing. Use fictional details only. Optional sample updates are revealed separately after confirmation. The four-step DonationJourney is proposed-process storytelling, not actual payment tracking.
- Read `docs/kch-content-sources.md` for evidence basis, definitions, artwork status and KCH input needs. Official page retrieval was unavailable; supplied source-brief claims are not independent verification or republication approval.
- Read `docs/design-01-refinement-review.md` and `docs/review/README.md` for component changes, checks and before/after screenshots.
- Existing `vercel.json` rewrites application routes to `index.html`; hosting and deployment are unchanged.

## Design versions

- `design-01-original`: the original committed design.
- `design-01-refined`: this revision, with larger type, rounder frames, image-filled numerals, distinct map experiences, donation storytelling, and team-role portraits.
- `main` remains the original design until a preferred version is merged.
- With a connected Vercel project, branch deployments can provide separate browser previews. No deployment is performed by these repository changes.
- `design-previews/` contains the original branch’s screenshots. `docs/review/` contains this refinement’s before/after and interaction-state evidence.

## Asset sources

- `public/images/kenya-stories.png`: AI-created editorial artwork for this concept, with six scenes, now used for the original team-role portraits. The children, educator, and outdoor-care scenes have been replaced by individual artwork files (`children-care.png`, `learning-care.png`, and `community-care.png`). These show happy Kenyan children with nurturing adults. Individual scenes use `object-fit: cover` and controlled focal points; numerical overlays use proportional background cover sizing. It does not depict actual beneficiaries or staff. Source photo downloads remain blocked in this environment; approved real photographs remain a pre-publication requirement.

- County geometry: `@svg-maps/kenya` 2.0.0, SVG Maps / Mihai Ro, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), https://github.com/VictorCazanave/svg-maps/tree/master/packages/kenya. Styling and interactions are adapted here.
- Original-design photos, retained but unused in this revision: MDN learning-area `elva-800w.jpg` and `elva-fairy-800w.jpg`, https://github.com/mdn/learning-area/tree/main/html/multimedia-and-embedding/responsive-images. Repository license: CC0 1.0. These are general design placeholders and do not depict the organisation’s work. Replace with approved Kenyan programme photography before launch.
- Fonts: Figtree and DM Mono via Fontsource; font packages include their licenses.

The organisation’s current website returned HTTP 403 in this environment, so none of its images were copied.
