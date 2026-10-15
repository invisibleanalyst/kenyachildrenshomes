# Kenya Children’s Homes — Main workflow demonstration

Main’s angular red/cream React + Vite design now demonstrates one coherent fictional programme: **Room to learn**. This implementation targets Main only. The other design branches remain separate; `src/shared/` provides the scenario, calculations, navigation and workflow to reuse when those designs are reviewed in turn.

## Run

Requires Node 22+. `npm ci`, then `npm run dev` (port 5173). Run `npm run build` and `npm test`. Playwright uses `/usr/bin/chromium`; set `CHROMIUM_PATH` elsewhere. `vercel.json` supplies application-route rewrites; no deployment or payment connection is included.

Routes: `/`, `/about`, `/projects`, `/impact`, `/donate`, `/feedback`, `/staff`.

## Three-minute walkthrough

1. **Home, 0:00–0:25.** Read the September baseline: 24 of 40 learners met a defined weekly attendance threshold. The fictional budget is KES 120,000, with KES 60,000 confirmed and a KES 60,000 gap. Open Projects for objective, source, interpretation, response, review and funding. The Nairobi map is explicitly a fictional location, not national coverage.
2. **Staff demonstration, 0:25–1:00.** Use the footer link or `/staff`. Reset the scenario. Review programme evidence, identify the materials/travel need, select a role owner and assign the action. Its delivery date is 23 October and review date 30 October 2026. Dates after 15 October are explicitly simulated future steps.
3. **Follow-up and funding, 1:00–1:35.** Assign and record the seeded enquiry response, close it, then record the **separate** KES 30,000 confirmed contribution. Programme confirmed funding becomes KES 90,000. Match the KES 5,000 unmatched receipt; funding becomes KES 95,000 and the gap KES 25,000. The KES 10,000 pending payment and KES 20,000 pledge remain excluded. Funding does not complete the programme action.
4. **Review and publication, 1:35–2:10.** Select the delivered review result, record the operational review and inspect the draft. Public pages still show September. Approve the summary; Home and Impact now show the approved simulated review: 32 of 40, up 8 learners / 20 percentage points. Alternatively choose delivery delayed: the public update reports missing results and never shows a successful October chart.
5. **Giving and questions, 2:10–3:00.** Open Donate, choose amount/frequency/method and optional update preference. Start a simulated gift; exercise pending, failed, cancelled and confirmed outcomes. Only confirmation changes funding. No personal fields are collected and no money moves. A sample question on `/feedback` enters the staff queue, where it can be assigned, answered and closed. Reset in Staff to repeat.

## Architecture and scope

- `src/main.jsx`: original visual shell, emotional hero, route selection and shared page integration.
- `src/shared/scenario.js`: one fictional dataset, guarded workflow reducer, funding and campaign calculations. `src/data.js` re-exports it in place of the former invented nationwide portfolio.
- `src/shared/demo.jsx`: browser-only scenario persistence (`kch-scenario-v1`). Reset restores the original fictional records.
- `src/shared/Experience.jsx`: reusable public evidence, impact, giving, enquiries and staff demo. A future design can style these components or compose the same reducer/data into its own presentation.
- `src/shared/experience.css`: accessible evidence cards, controls, responsive charts and tables, inheriting variation tokens. Main keeps Figtree / DM Mono, cream, black and red; small red buttons use a darker red for contrast.
- [Measurement specification](docs/measurement.md): proposed events, reconciliation and fundraising definitions.

## What is simulated

Everything in the workflow is fictional, including sources, programme geography, approvals, campaign costs, payment receipts and October results. Local storage is neither a database nor access control. `/staff` is intentionally an **unsecured demonstration**, not a production system. Do not enter real records. No submissions, analytics, emails, payment requests, recurring billing or integrations are sent. Update preferences only store a local choice. The pending/failed/cancelled/confirmed controls imitate a provider response and are not transaction verification.

Programme interest does not restrict funds in the concept; KCH must confirm its policy. Campaign association and enquiry links are not causal attribution. Attendance is not learning attainment; the comparison cannot establish that funding caused an outcome.

## KCH input needed

Current official Kenyan leadership/governance, approved history, real programme locations and evidence, approved photography and logo, allocation policy, safeguarding/contact routes, update consent/retention policy, campaign cost definitions and reporting responsibilities. The existing organisation website (`https://www.kenyachildrenshomes.org.uk/`) returned an access error in this environment on 15 October 2026. No new organisational facts were inferred. Neutral roles replace staff identities; no UK leadership claim or symbolic UK–Kenya connection is presented.

Production requires authenticated role-based staff access, a server-side database and audit trail, approval enforcement, provider webhook verification and reconciliation, safeguarding routes, privacy/consent controls, messaging and analytics integrations. Monthly selection alone does not implement recurring billing.

## Assets

- `children-care.png` and `learning-care.png`: existing generated artwork reused from `design-01-refined`, not actual beneficiaries or staff. Replaces Main’s unrelated original placeholder photography in rendered pages.
- County geometry: SVG Maps / Mihai Ro, `@svg-maps/kenya` 2.0.0, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Only Nairobi is highlighted as a fictional example. No project dots/routes or nationwide coverage.
- Figtree and DM Mono via Fontsource, with package licenses.
- Original `community.jpg` / `learning.jpg` and `design-previews/` screenshots remain historical assets from the original concept, unused by the new implementation. They are not current review screenshots.

## Verification

Eight automated tests cover all seven routes, loaded imagery/fonts, complete approval and delay paths, funding exclusions and idempotency, enquiry privacy/follow-up, form validation/payment states, status/programme filters, browser history, keyboard navigation and document overflow at 320, 375, 768 and 1440px. Automated WCAG A/AA checks and visual inspection supplement these tests; they do not replace testing with assistive technology or real KCH users.
