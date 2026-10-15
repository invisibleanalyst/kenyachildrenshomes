# Kenya Children’s Homes — Design 03 / Editorial

A separate five-page React + Vite design direction: bold red and black layouts, diagonal photographic strips, overlapping image collages, oversized numbers, and a screenprint-style county atlas. Figtree is the primary font; DM Mono provides annotation and navigation details.

## Design branches

- `main` and `design-01-original`: original Design 01.
- `design-01-refined`: refined Design 01, preserved on its own branch.
- `design-02`: preserved discovery and storytelling direction.
- `design-03`: this bold editorial direction.

Switch branches to compare implementations. No worktree is needed in the isolated cloud environment. `design-previews/` contains current screenshots for this branch. Existing Design 01 helper files remain available but are not imported by the Design 03 entry point.

## Run and validate

Requires Node.js 22+ (validated with Node 24). Use the existing checkout:

```sh
cd /workspace/kenyachildrenshomes
npm ci --cache /tmp/npm-cache
npm run dev
```

Vite defaults to port 5173. Routes: `/`, `/about`, `/projects`, `/impact`, `/donate`.

```sh
npm run build
npm test
```

The Playwright runner starts Vite if needed and uses `/usr/bin/chromium`. Set `CHROMIUM_PATH` on another machine. Tests cover five routes, image/font loading, all 47 counties, keyboard navigation, sparse atlas coverage, programme filtering, defined follow-up tiles, explicit period/bar controls, story chapters, giving themes, donation preview, the UK–Kenya story connection, and mobile overflow at 320px and 375px.

## Vercel preview

Connect this GitHub repository to Vercel and deploy `design-03` as a Preview branch. Framework: Vite; build: `npm run build`; output: `dist`; repository root. No environment variables are needed. `vercel.json` provides direct-link routing. A Git push alone does not prove a Vercel deployment was created or succeeded.

## Content and payment boundaries

- `src/data.js` contains six source-brief programme records in five public groupings, separate county geometry/lookups, null missing numbers and explicit fictional follow-up observations. Cumulative/current claims are not added.
- Atlas keeps 47 accessible outlines but marks only published Nairobi/Narok locations. County centres are not exact programme sites. Unknown coverage is explicit; invented network routes are removed.
- The delivery board has 30 example scheduled follow-ups: 27 completed and three outstanding. Impact retains black/red editorial bars with A/B/C counts 21/24/27, a zero baseline and maximum 30. Hatching means earlier example periods, not audit/provisional status. No fabricated reporting years or KCH outcome totals remain.
- Home’s stamp reads 1961 / ESTABLISHED; compact stamps read KE / KENYAN-LED. Care/Learn/Grow remains an emotional bridge. The UK–Kenya graphic is historical context; portrait artwork explains roles, not actual staff.
- Giving themes/programme interest do not promise earmarking. Local mock states demonstrate pending confirmation, cancellation/failure/timeout recovery and optional sample updates. No payment, STK prompt, personal-data submission/storage, receipt, email, subscription or recurring billing occurs. Use fictional details only.
- The Kenya-mask hero offers a jump to the form; the four-step black journey remains proposed-process storytelling, separate from mock payment state.
- Read `docs/design-03-refinement-review.md` for exact changes/checks; `docs/kch-content-sources.md` for evidence/artwork status and KCH publication needs; and `docs/review/README.md` for before/after and interaction-state images.
- The active entry point remains EditorialApp. DiscoveryApp, DesignSections, inherited discovery.css, original artwork and deployment configuration are unchanged.

## Image and map sources

- `editorial-children.png`: AI-created portrait of Kenyan children with an educator for the diagonal-strip hero and editorial layouts. It does not depict actual beneficiaries.

- `discovery-journey.png` and `discovery-together.png`: new AI-created photo-style concept images for Design 02, representing a Kenyan landscape journey and a caring outdoor learning activity. They do not depict actual beneficiaries.
- `children-care.png` and `community-care.png`: generated care scenes shared with Design 01 where relevant. All displayed photos preserve natural proportions with `object-fit: cover`.
- `kenya-stories.png`: created editorial role portraits, retained for the About page.
- Original MDN photographs remain unused in this design; their original CC0 source is https://github.com/mdn/learning-area/tree/main/html/multimedia-and-embedding/responsive-images.
- County geometry: `@svg-maps/kenya` 2.0.0, SVG Maps / Mihai Ro, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), https://github.com/VictorCazanave/svg-maps/tree/master/packages/kenya. Design 03 adapts geometry styling and interactions.
- Figtree and DM Mono are served locally through Fontsource; font packages include their licenses.
