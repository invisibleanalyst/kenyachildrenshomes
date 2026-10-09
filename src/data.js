import kenya from "@svg-maps/kenya";
export const countyMap = kenya;
const programmes = [
  "Learning & opportunity",
  "Care & belonging",
  "Health & wellbeing",
  "Family & community",
];
export const projects = kenya.locations.map((county, i) => ({
  id: county.id,
  county: county.name,
  title: [
    "Community learning hub",
    "Family support programme",
    "School essentials initiative",
    "Community wellbeing centre",
  ][i % 4],
  programme: programmes[i % 4],
  status: ["Active", "Completed", "Planned"][i % 3],
  children: 40 + i * 7,
  progress: [30 + ((i * 11) % 60), 100, 0][i % 3],
  year: 2024 + (i % 3),
  description: [
    "A welcoming space for after-school learning, reading, and mentorship.",
    "Practical support and guidance to help families provide stable, nurturing care.",
    "Learning materials and classroom support to help children participate in school.",
    "A community-led space connecting families with nutrition and wellbeing support.",
  ][i % 4],
}));
export const programmeNames = programmes;
export const totals = {
  children: projects.reduce((n, p) => n + p.children, 0),
  active: projects.filter((p) => p.status === "Active").length,
  completed: projects.filter((p) => p.status === "Completed").length,
  planned: projects.filter((p) => p.status === "Planned").length,
};

// Presentation data remains fictional until approved organisational records are supplied.
export const outcomes = projects.map((p, i) => ({
  id: p.id,
  county: p.county,
  learning: 25 + i * 5,
  families: 12 + i * 2,
  meals: 400 + i * 47,
  attendance: 65 + ((i * 7) % 31),
}));
export function assessment(p) {
  return p.status === "Completed"
    ? "Delivery complete; follow-up visits and community feedback are the next priority."
    : p.status === "Planned"
      ? "Local needs identified; resources, partners, and delivery dates still need to be confirmed."
      : `Delivery is ${p.progress}% through the current plan; local teams are reviewing participation and resources.`;
}
export function nextAction(p) {
  return p.status === "Completed"
    ? "Check longer-term outcomes and strengthen ongoing family support."
    : p.status === "Planned"
      ? "Confirm community partners, funding, and the first delivery milestone."
      : "Complete the next learning sessions and replenish essential supplies.";
}
export const outcomeTypes = {
  learning: {
    label: "Learning",
    unit: "children accessing learning",
    icon: "book",
  },
  families: {
    label: "Belonging",
    unit: "families receiving support",
    icon: "heart",
  },
  meals: { label: "Wellbeing", unit: "nutritious meals", icon: "sprout" },
};
