# KCH content sources — refined 01

Prepared 15 October 2026. This is a local public-site prototype, not an approved KCH publication.

## Retrieval and evidence basis

The user supplied the KCH source/content brief reviewed 15 October 2026. Attempts to retrieve the nine official pages below with the web tool on 15 October 2026 returned “not accessible via this tool”. No source text or image was recovered from those attempts. The About, Contact and Donate pages were retried for this refined-01 pass on the same date and remained inaccessible. The implementation therefore paraphrases the **supplied brief**, not a fresh successful retrieval. Retrieval-attempt date is not the reporting period. Public publication does not establish independent verification or permission to republish. Programme descriptions and contact details require KCH confirmation before live use.

| Official source | Paraphrased material used | Content period / measurement | Unresolved questions |
| --- | --- | --- | --- |
| https://kch.co.ke/about/ | Founded as Thomas Barnardo House; education, sponsorship, reintegration, family support; Kenyan Board leadership after end-2025 handover | Foundation: 1961. Leadership: following end of 2025. Historical summary: 6,000+ cared for; around 400 supported annually. Historical observation cutoff and annual reporting year unspecified | Definitions, dates, overlap and approved governance wording |
| https://kch.co.ke/programs/outreach-butterfly/ | Distinct Kibera Sponsorship and Butterfly Support descriptions | Kibera began 2007; 300+ since 2007 is cumulative. Butterfly 100+ current, observation date unspecified | Current scope, locations of dispersed family support, overlap. Combined-page 400+ and 100% excluded as numeric results |
| https://kch.co.ke/programs/soila/ | Suswa, Narok; protection and education for girls at risk of FGM and early marriage; continuing education beyond centre | Established 2005; 150+ yearly with unspecified reporting year and inclusion of secondary/university support | Year, denominator, overlap, location coverage |
| https://kch.co.ke/programs/jga/ | Jonathan Gloag Academy, Nairobi, education for KCH-connected and local fee-paying pupils | Opened 2002; beneficiary count null | Separate enrolment from charitable support; comparable observations |
| https://kch.co.ke/programs/adoption/ | Family placement through applicable process | Numeric measures and establishment date null | Programme base/coverage, appropriate approved public description. No success rate or link between donations and placement priority |
| https://kch.co.ke/programs/income-programs/ | Kelvin Loaf Bakery, thrift shop and Westminster Events Center | Revenue is not net mission contribution; no financial measure supplied | Locations, net contribution, margins, reporting period |
| https://kch.co.ke/news/butterfly-childrens-camp/ | Academic-progress and welfare checks at Butterfly camp | **August 2025**, retained as a dated account. No outcome series supplied | Approved follow-up observations and measures; permission for imagery |
| https://kch.co.ke/contact/ | info@kch.co.ke for general enquiries/report requests | Contact detail from supplied 15 October 2026 review; not reverified | Confirm current inbox, confidential-feedback route |
| https://kch.co.ke/donate/ | fundraising@kch.co.ke as giving contact; M-Pesa advertised; monthly contact route, in-kind support | No live transaction tested | Confirm all live payment and recurring mechanisms, current contact and instructions |

The current organisation link is https://kch.co.ke/. The historical UK site is not labelled current. No verified KCH report or financial PDF was supplied/retrieved; the prototype requests reports through the brief-sourced general email instead of fabricating downloads or audit status. No EMKF document is presented as KCH evidence.

## Data and geography

`src/data.js` has six independent programme IDs. Kibera and Butterfly are split from one official combined card; the six records retain five directory groupings. Neither count is an impact statistic. `countyProgrammes` is separate from the 47 geometry paths. Only explicit locations in the brief are mapped: Kibera and JGA in Nairobi; Soila in Narok. Butterfly, adoption and sustainability stay in the directory with no inferred county location. Unrecorded counties mean “No programme information published here”, not no need or no operation. No child/family addresses are used.

Numeric values without a basis are `null`. The `children` values on Kibera, Butterfly and Soila are lower-bound published claims with different time bases, carried with `measure`; they are never added or used to generate chart/headline totals. No synthetic historical multipliers or annual growth series remains. The 390+ “in our care” claim and undefined combined-page measures are excluded. Generic ongoing support is a commitment, not a measured 100% result.

## Fictional contained example

All example records are explicitly fictional and labelled “Illustrative example — not KCH results”. They do not represent KCH programme performance or improved child wellbeing.

- Scenario: education and family follow-up, inspired by the published Butterfly camp activity.
- Explicit example observations: A 21/30, B 24/30, C 27/30 completed/scheduled follow-ups. These are comparable fictional support periods, not dated KCH years.
- Completed: both academic-progress and welfare checks recorded and reviewed by a coordinator. Scheduled: due within that example period. These definitions live in the chart expansion.
- A fictional review identifies transport coordination as a possible issue, assigns a programme coordinator, and records a higher later completion count. The update describes association, not causation. The next review is example period D.
- One support-period budget KES 120,000; confirmed contributions KES 80,000; outstanding pledges KES 10,000. Cash required = budget − confirmed = KES 40,000, **including** KES 10,000 pledged. Pledges are not subtracted again or represented as cash.
- Placement: existing Impact story/charts and Butterfly detail; compact giving expansion; optional post-confirmation sample update. No invented names, testimonies or staff identities.

## Photographic artwork, portraits and rights

No approved real KCH programme photograph was available. Preserve refined 01’s existing locally served photographic editorial artwork, masks, object-fit cover, focal positions, rounded panels and image-filled numerals. These are illustrations, not evidence of beneficiaries, staff or programme delivery. No new image assets were generated or copied in this pass.

| Local asset | Repository provenance | Use / status |
| --- | --- | --- |
| `public/images/children-care.png` | Existing branch artwork; README identifies AI-created concept imagery | Child/adult scene; unchanged proportional crops. Not an actual beneficiary photograph |
| `public/images/learning-care.png` | Same repository provenance | Reading scene and photographic numerals; not KCH programme evidence |
| `public/images/community-care.png` | Same repository provenance | Outdoor community scene and numerals; not KCH programme evidence |
| `public/images/kenya-stories.png` | Existing composite AI editorial artwork | Role portraits remain unchanged. Visible labels identify illustrative roles, not KCH staff; no invented names, locations of employment or biographies |

Repository descriptions establish design provenance, not KCH approval to use these images publicly. Approved programme images, consent/rights review and verified staff profiles remain publication inputs. Original MDN photos are unused on this branch. Local Figtree and DM Mono packages and their licences remain. SVG Maps / Mihai Ro geometry remains CC BY 4.0, credited on all maps. The CSS logo remains a prototype approximation.

## Leadership and historical partnership illustration

The About copy and hero footnote no longer describe a UK base. Kenyan Board leadership after the end-2025 handover is attributed to the supplied official-site brief. ConnectionMap retains its symbolic UK–Kenya composition as **historical partnership** storytelling; the tab content explicitly disclaims a verified current support structure or funding route. No partnership dates, present posts, fund flows or organisation names are inferred. TeamSection explains illustrative care, coordination and supporter-communication roles, without portraying the artwork as current KCH employees.

## Payment and contact boundaries

M-Pesa difficulty is user-reported and was not independently reproduced. This task does not fix KCH's production payment system. Paybill 513500 / FOBS is in the supplied observations but is **not published as actionable payment instructions in this prototype**. No Bonga conversion is claimed. Card/PayPal are not offered as available; the only control is an explicitly local M-Pesa preview. Monthly is an intention/setup enquiry, not recurring billing.

The mock reducer in `src/payment.js` makes confirmation event-driven and ignores repeated/stale events. It makes no requests and uses no persistent storage. Only amount is required; optional fictional name/email fields are retained within the existing form. Optional sample update preferences appear only after a mock confirmation and are separate from the payment controls. No subscription, receipt, email or enquiry delivery is simulated as a real success. Pending times out after 30 seconds. Retry preserves amount, frequency, programme interest and entered fictional name/email. The optional update preference is offered separately after confirmation. Mail links open an external contact route; users are asked not to enter real personal data into the prototype.

## KCH input before publication

1. Approve factual/governance copy, programme grouping and republication; clarify reporting periods, denominators and overlaps.
2. Confirm mapped and unmapped programme locations without identifying individual homes or families.
3. Provide approved photography, rights and appropriate safeguarding/consent review; replace MDN fallbacks.
4. Supply approved comparable results, budget periods, funding needs, reports and financial documents; confirm audit status only where supported.
5. Verify live giving, M-Pesa details, recurring setup, provider callbacks/reconciliation, supporter consent and update delivery outside this prototype.
6. Reconfirm contact inboxes, confidential-feedback routing and approved source-derived updates.
