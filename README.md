# Kenya Children’s Homes — Design 02 / Discovery

A separate five-page React + Vite design direction: immersive landscape imagery, flowing wave transitions, editorial story chapters, and an interactive county atlas. Figtree is the primary font; DM Mono provides annotation and navigation details.

## Design branches

- `main` and `design-01-original`: original Design 01.
- `design-01-refined`: refined Design 01, preserved on its own branch.
- `design-02`: this discovery and storytelling direction.

Switch branches to compare implementations. No worktree is needed in the isolated cloud environment. `design-previews/` contains current screenshots for this branch. Existing Design 01 helper files remain available but are not imported by the Design 02 entry point.

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

The Playwright runner starts Vite if needed and uses `/usr/bin/chromium`. Set `CHROMIUM_PATH` on another machine. Tests cover five routes, image/font loading, all 47 counties, keyboard navigation, sparse atlas coverage, programme filtering, defined delivery-ring controls, explicit example-period controls, story chapters, giving themes, donation preview, the UK–Kenya story connection, and mobile overflow at 320px and 375px.

## Vercel preview

Connect this GitHub repository to Vercel and deploy `design-02` as a Preview branch. Framework: Vite; build: `npm run build`; output: `dist`; repository root. No environment variables are needed. `vercel.json` provides direct-link routing. A Git push alone does not prove a Vercel deployment was created or succeeded.

## Content and payment boundaries

- `src/data.js` holds six source-brief programme records in five public groupings, independent of county geometry. Missing numbers are null, and cumulative/current claims are not added.
- Atlas retains all 47 accessible county outlines but marks only published Nairobi/Narok locations. County-centre markers are not exact sites; invented network routes are removed. Unknown coverage is explicit.
- The delivery ring and single-line river use the labelled fictional follow-up example: 21/24/27 completed of 30 scheduled in A/B/C; period C is 90% completion. These are delivery examples, not KCH results or child wellbeing outcomes. No fabricated reporting years remain.
- The UK–Kenya graphic describes a historical partnership, not a current UK base. Role portraits remain illustrations, not actual staff profiles.
- Giving themes and programme interest do not promise restricted allocation. The form uses a local mock with idle/pending/confirmed/cancelled/failed/timed-out states. It sends no payment, STK prompt, receipt, email or personal data, creates no subscription and performs no recurring billing. Use fictional details only.
- The scenic giving hero includes a jump to the form. The large-number journey describes a proposed process, separate from local payment states. Optional sample updates appear after mock confirmation.
- Read `docs/kch-content-sources.md` for sources, definitions, artwork provenance and KCH publication needs. Official pages remained inaccessible; content uses the supplied brief.
- Read `docs/design-02-refinement-review.md` and `docs/review/README.md` for exact changes, verification and before/after evidence. Original `design-previews/` files remain untouched.

## Image and map sources

- `discovery-journey.png` and `discovery-together.png`: new AI-created photo-style concept images for Design 02, representing a Kenyan landscape journey and a caring outdoor learning activity. They do not depict actual beneficiaries.
- `children-care.png` and `community-care.png`: generated care scenes shared with Design 01 where relevant. All displayed photos preserve natural proportions with `object-fit: cover`.
- `kenya-stories.png`: created editorial role portraits, retained for the About page.
- Original MDN photographs remain unused in this design; their original CC0 source is https://github.com/mdn/learning-area/tree/main/html/multimedia-and-embedding/responsive-images.
- County geometry: `@svg-maps/kenya` 2.0.0, SVG Maps / Mihai Ro, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), https://github.com/VictorCazanave/svg-maps/tree/master/packages/kenya. Design 02 adapts geometry styling and interactions.
- Figtree and DM Mono are served locally through Fontsource; font packages include their licenses.
