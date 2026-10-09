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

- `src/data.js` contains one fictional project for each of Kenya’s 47 counties. Totals and charts derive from the same data. Replace these examples with verified project and impact records.
- Home uses a portfolio map; Projects uses a delivery-progress heatmap with county assessment and next actions; Impact uses outcome-intensity layers for learning, family support, and nutrition. Each county map supports hover, keyboard selection, click, and a mobile dropdown. About uses a symbolic UK–Kenya connection map.
- Projects and Impact intentionally use separate measures: project delivery stages versus child/family wellbeing outcomes. Reporting-year controls and outcome switches are interactive. All numbers remain fictional.
- Homepage storytelling and the donation journey use image-filled numerals. The donation journey describes a proposed four-stage process; it is not transaction tracking.
- Team artwork represents roles, not real employees. No staff names or biographies are invented.
- The donation page supports preset/custom KES amounts, monthly/one-off selection, M-Pesa/card selection, and client-side validation. It never stores or submits personal details or takes payment. Use example details while testing. Payment processing, recurring billing, receipts, and CMS editing are not implemented.
- Before payment integration, verify the selected provider’s charity eligibility and support for M-Pesa, cards, and recurring donations. Do not assume Polar supplies all three.
- Organisation history, actual programme descriptions, verified impact, approved photography, staff profiles, and final logo assets still need to be supplied. The current logo is a CSS approximation.
- `vercel.json` rewrites application routes to `index.html` while preserving image and build asset paths. No environment variables are needed for the concept site.

## Design versions

- `design-01-original`: the original committed design.
- `design-01-refined`: this revision, with larger type, rounder frames, image-filled numerals, distinct map experiences, donation storytelling, and team-role portraits.
- `main` remains the original design until a preferred version is merged.
- With a connected Vercel project, branch deployments can provide separate browser previews. No deployment is performed by these repository changes.
- `design-previews/` contains current screenshots for review on GitHub.

## Asset sources

- `public/images/kenya-stories.png`: AI-created editorial artwork for this concept, with six scenes representing Kenyan childhood, learning, landscape, two Kenyan team roles, and a UK support role. It does not depict actual beneficiaries or staff. Source photo downloads remain blocked in this environment; approved real photographs remain a pre-publication requirement.

- County geometry: `@svg-maps/kenya` 2.0.0, SVG Maps / Mihai Ro, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), https://github.com/VictorCazanave/svg-maps/tree/master/packages/kenya. Styling and interactions are adapted here.
- Original-design photos, retained but unused in this revision: MDN learning-area `elva-800w.jpg` and `elva-fairy-800w.jpg`, https://github.com/mdn/learning-area/tree/main/html/multimedia-and-embedding/responsive-images. Repository license: CC0 1.0. These are general design placeholders and do not depict the organisation’s work. Replace with approved Kenyan programme photography before launch.
- Fonts: Figtree and DM Mono via Fontsource; font packages include their licenses.

The organisation’s current website returned HTTP 403 in this environment, so none of its images were copied.
