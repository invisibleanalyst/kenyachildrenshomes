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

The Playwright runner starts Vite if needed and uses `/usr/bin/chromium`. Set `CHROMIUM_PATH` on another machine. Tests cover five routes, image/font loading, all 47 counties, keyboard navigation, atlas layers, project filtering, delivery-ring controls, outcome/year controls, story chapters, giving themes, donation preview, the UK–Kenya story connection, and mobile overflow at 320px and 375px.

## Vercel preview

Connect this GitHub repository to Vercel and deploy `design-02` as a Preview branch. Framework: Vite; build: `npm run build`; output: `dist`; repository root. No environment variables are needed. `vercel.json` provides direct-link routing. A Git push alone does not prove a Vercel deployment was created or succeeded.

## Content and payment boundaries

- Projects and outcomes in `src/data.js` are fictional presentation content. Verify and replace figures, geography, programme claims, and reporting records before publication.
- The atlas uses authentic county geometry, decorative route connections, and computed bounding-box centres. Dots and routes are not verified service locations. Layer controls alter emphasis without removing keyboard access to any county.
- Ring segments use the project status counts; outcome totals and yearly figures derive from the presentation dataset. Flowing ribbons are a narrative visual rather than a quantitative stacked chart.
- The UK–Kenya connection is symbolic. Team images represent roles, not actual employees; biographies and identities are not invented.
- The giving-theme selector explores themes and does not earmark funds. The form validates locally, does not transmit personal details, and never takes payment. The gift route is a proposed process, not transaction tracking.
- M-Pesa/card processing, recurring billing, receipts, CMS editing, verified financial reporting, and actual donation allocation are not implemented. Verify provider compatibility before integration.
- Actual photography, final logo assets, staff profiles, and verified organisational copy still need approval. The header retains a compact presentation notice.

## Image and map sources

- `discovery-journey.png` and `discovery-together.png`: new AI-created photo-style concept images for Design 02, representing a Kenyan landscape journey and a caring outdoor learning activity. They do not depict actual beneficiaries.
- `children-care.png` and `community-care.png`: generated care scenes shared with Design 01 where relevant. All displayed photos preserve natural proportions with `object-fit: cover`.
- `kenya-stories.png`: created editorial role portraits, retained for the About page.
- Original MDN photographs remain unused in this design; their original CC0 source is https://github.com/mdn/learning-area/tree/main/html/multimedia-and-embedding/responsive-images.
- County geometry: `@svg-maps/kenya` 2.0.0, SVG Maps / Mihai Ro, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), https://github.com/VictorCazanave/svg-maps/tree/master/packages/kenya. Design 02 adapts geometry styling and interactions.
- Figtree and DM Mono are served locally through Fontsource; font packages include their licenses.
