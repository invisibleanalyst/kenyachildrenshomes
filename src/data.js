import kenya from "@svg-maps/kenya";
export const countyMap = kenya;
const source = (slug) => `https://kch.co.ke/programs/${slug}/`;
// Six records preserve the five official navigation groups: the combined
// outreach/Butterfly page is split to distinguish its two forms of support.
export const projects = [
  {
    id: "kibera",
    title: "Kibera Sponsorship",
    county: "Nairobi",
    countyIds: ["nairobi"],
    programme: "Sponsorship & family support",
    status: "Ongoing",
    since: 2007,
    children: 300,
    measure: "300+ supported since 2007 · cumulative",
    description:
      "Education and practical assistance for children living with their families in Kibera.",
    source: source("outreach-butterfly"),
    update:
      "KCH’s published description places family life at the centre of this sponsorship programme.",
  },
  {
    id: "butterfly",
    title: "Butterfly Support",
    county: "Family-based support",
    countyIds: [],
    programme: "Sponsorship & family support",
    status: "Ongoing",
    since: null,
    children: 100,
    measure: "100+ currently supported · observation date unspecified",
    description:
      "Reintegration and continuing family-based support, with academic and welfare follow-up.",
    source: source("outreach-butterfly"),
    update:
      "August 2025: KCH’s Butterfly camp account describes academic-progress and welfare checks.",
    updateSource: "https://kch.co.ke/news/butterfly-childrens-camp/",
  },
  {
    id: "soila",
    title: "Soila",
    county: "Suswa, Narok",
    countyIds: ["narok"],
    programme: "Protection & education",
    status: "Ongoing",
    since: 2005,
    children: 150,
    measure: "150+ supported yearly · reporting year unspecified",
    description:
      "Protection and education for girls at risk of FGM and early marriage, including support beyond the centre.",
    source: source("soila"),
    update:
      "KCH describes support continuing into secondary school and university beyond the centre.",
  },
  {
    id: "jga",
    title: "Jonathan Gloag Academy",
    county: "Nairobi",
    countyIds: ["nairobi"],
    programme: "Education",
    status: "Ongoing",
    since: 2002,
    children: null,
    measure: "Opened in 2002 · pupil beneficiary count not defined",
    description:
      "Education for KCH-connected children and local fee-paying pupils. Enrolment is not a count of charity beneficiaries.",
    source: source("jga"),
    update:
      "The published school description includes both KCH-connected and local fee-paying pupils.",
  },
  {
    id: "adoption",
    title: "KCH Adoption Society",
    county: "Location to confirm",
    countyIds: [],
    programme: "Family placement",
    status: "Ongoing",
    since: null,
    children: null,
    measure: "Family placement through the applicable process",
    description:
      "Support for family placement through the applicable adoption process. Giving does not confer placement priority.",
    source: source("adoption"),
    update:
      "No comparable placement outcome series was supplied; no success rate is claimed here.",
  },
  {
    id: "sustainability",
    title: "Sustainability initiatives",
    county: "Locations to confirm",
    countyIds: [],
    programme: "Mission sustainability",
    status: "Ongoing",
    since: null,
    children: null,
    measure: "Enterprise revenue is not net mission contribution",
    description:
      "Kelvin Loaf Bakery, the thrift shop and Westminster Events Center help support the mission.",
    source: source("income-programs"),
    update:
      "No margin or net contribution figures were supplied for these initiatives.",
  },
];
export const programmeNames = [...new Set(projects.map((p) => p.programme))];
export const countyProgrammes = Object.fromEntries(
  kenya.locations.map((c) => [
    c.id,
    projects.filter((p) => p.countyIds.includes(c.id)).map((p) => p.id),
  ]),
);
export const programmesForCounty = (id) =>
  (countyProgrammes[id] || []).map((id) => projects.find((p) => p.id === id));
export const followUps = [
  { period: "A", scheduled: 30, completed: 21 },
  { period: "B", scheduled: 30, completed: 24 },
  { period: "C", scheduled: 30, completed: 27 },
];
export const exampleBudget = {
  required: 120000,
  confirmed: 80000,
  pledged: 10000,
};
export const cashRequired = (budget) => budget.required - budget.confirmed;
export const exampleLabel = "Illustrative example — not KCH results";
export const exampleUpdate =
  "Across example periods A, B and C, completed follow-ups were 21, 24 and 27 of 30 scheduled each period. A fictional staff review flagged transport coordination as a possible issue and assigned a programme coordinator to arrange follow-up. Completion was higher in the later period; this association does not prove the response caused the change or improved child wellbeing. Next review: check missed visits and transport arrangements in example period D.";
