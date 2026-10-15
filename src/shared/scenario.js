// One portable dataset for all KCH design variations. Every record is fictional.
export const scenario = {
  id: "learning-2026",
  name: "Room to learn",
  location: "Nairobi County — fictional example, not a verified KCH location",
  objective:
    "Help 40 learners attend at least three of four weekly learning sessions.",
  budget: 120000,
  campaignCost: 6000,
  costDefinition:
    "KES 4,000 creative production + KES 2,000 outreach. Excludes payment fees, staff time and programme delivery costs; those costs are unknown.",
  periods: [
    {
      id: "baseline",
      label: "Baseline · 1–28 September 2026",
      attended: 24,
      total: 40,
      sessions: 16,
      source: "DEMO-REGISTER-SEP: fictional aggregate attendance register",
      updated: "30 September 2026",
    },
    {
      id: "review",
      label: "Review · 1–28 October 2026 (simulated future review)",
      attended: 32,
      total: 40,
      sessions: 16,
      source: "DEMO-REGISTER-OCT: fictional aggregate attendance register",
      updated: "30 October 2026 (simulated)",
    },
  ],
  initialUpdate:
    "In September, 24 of 40 learners attended at least three of four sessions each week. Staff identified a need for learning materials and travel support. The next review is scheduled for 30 October 2026.",
  reviewedUpdate:
    "At the simulated October review, 32 of 40 learners met the attendance threshold, compared with 24 of 40 in September. Materials and travel support were delivered. This is an observed association; it does not establish that funding caused the change. Learning attainment has not yet been assessed.",
  action:
    "Provide learning materials and travel support; review attendance with the programme team.",
  reviewDate: "30 October 2026",
};
export const initialState = () => ({
  evidenceReviewed: false,
  needIdentified: false,
  action: null,
  review: null,
  approved: false,
  payments: [
    {
      id: "DEMO-001",
      amount: 45000,
      status: "confirmed",
      supporter: "S-01",
      campaign: "Learning appeal",
      frequency: "Once",
      linkedEnquiry: null,
    },
    {
      id: "DEMO-002",
      amount: 15000,
      status: "confirmed",
      supporter: "S-01",
      campaign: "Learning appeal",
      frequency: "Monthly",
      linkedEnquiry: null,
    },
    {
      id: "DEMO-PENDING",
      amount: 10000,
      status: "pending",
      supporter: "S-02",
      campaign: null,
      frequency: "Once",
      linkedEnquiry: null,
    },
    {
      id: "DEMO-UNMATCHED",
      amount: 5000,
      status: "confirmed",
      supporter: null,
      campaign: null,
      programme: null,
      frequency: "Once",
      linkedEnquiry: null,
    },
  ],
  pledges: [{ id: "PLEDGE-01", amount: 20000 }],
  enquiries: [
    {
      id: "ENQ-001",
      topic: "Could we help meet the learning materials need?",
      owner: "",
      status: "new",
      history: [],
      response: "",
    },
  ],
  events: [],
  subscriptions: [],
  nextId: 1,
});
export function funding(state) {
  const assigned = state.payments.filter((p) => p.programme !== null);
  const confirmed = assigned
    .filter((p) => p.status === "confirmed")
    .reduce((n, p) => n + p.amount, 0);
  return {
    confirmed,
    gap: Math.max(0, scenario.budget - confirmed),
    excess: Math.max(0, confirmed - scenario.budget),
    pending: assigned
      .filter((p) => p.status === "pending")
      .reduce((n, p) => n + p.amount, 0),
    pledged: state.pledges.reduce((n, p) => n + p.amount, 0),
  };
}
export function campaignMetrics(state) {
  const payments = state.payments.filter(
    (p) => p.status === "confirmed" && p.campaign === "Learning appeal",
  );
  const confirmed = payments.reduce((n, p) => n + p.amount, 0);
  const counts = {};
  payments
    .filter((p) => p.supporter)
    .forEach((p) => (counts[p.supporter] = (counts[p.supporter] || 0) + 1));
  return {
    confirmed,
    net: confirmed - scenario.campaignCost,
    repeat: Object.values(counts).filter((n) => n > 1).length,
    supporters: Object.keys(counts).length,
  };
}
const event = (state, name, details = {}) => ({
  ...state,
  events: [...state.events, { name, at: new Date().toISOString(), ...details }],
});
export function reducer(state, a) {
  switch (a.type) {
    case "event":
      return event(state, a.name, a.details);
    case "reviewEvidence":
      return event({ ...state, evidenceReviewed: true }, "evidence_reviewed");
    case "identifyNeed":
      return state.evidenceReviewed
        ? event({ ...state, needIdentified: true }, "need_identified")
        : state;
    case "assignAction":
      return state.needIdentified && !state.action && a.owner
        ? event(
            {
              ...state,
              action: {
                owner: a.owner,
                due: "23 October 2026",
                status: "assigned",
              },
            },
            "action_assigned",
            { owner: a.owner },
          )
        : state;
    case "followUp":
      return event(
        {
          ...state,
          enquiries: state.enquiries.map((q) =>
            q.id === a.id && q.status !== "closed"
              ? {
                  ...q,
                  owner: a.owner,
                  status: "addressed",
                  response: a.response,
                  history: [
                    ...q.history,
                    {
                      at: new Date().toISOString(),
                      owner: a.owner,
                      response: a.response,
                    },
                  ],
                }
              : q,
          ),
        },
        "supporter_follow_up",
        { enquiry: a.id },
      );
    case "closeEnquiry":
      return {
        ...state,
        enquiries: state.enquiries.map((q) =>
          q.id === a.id && q.response ? { ...q, status: "closed" } : q,
        ),
      };
    case "enquiry": {
      const id = `ENQ-${String(state.nextId + 1).padStart(3, "0")}`;
      return event(
        {
          ...state,
          nextId: state.nextId + 1,
          enquiries: [
            ...state.enquiries,
            {
              id,
              topic: a.topic,
              owner: "",
              status: "new",
              history: [],
              response: "",
            },
          ],
        },
        "supporter_enquiry",
        { enquiry: id },
      );
    }
    case "linkedContribution": {
      const q = state.enquiries.find((q) => q.id === a.id);
      if (!q?.response || state.payments.some((p) => p.linkedEnquiry === a.id))
        return state;
      return event(
        {
          ...state,
          payments: [
            ...state.payments,
            {
              id: `DEMO-ENQ-${a.id}`,
              amount: 30000,
              status: "confirmed",
              supporter: `S-${a.id}`,
              campaign: "Learning appeal",
              frequency: "Once",
              linkedEnquiry: a.id,
            },
          ],
        },
        "payment_confirmed",
        { reference: `DEMO-ENQ-${a.id}`, amount: 30000, simulation: true },
      );
    }
    case "matchPayment":
      return event(
        {
          ...state,
          payments: state.payments.map((p) =>
            p.id === a.id ? { ...p, programme: scenario.id } : p,
          ),
        },
        "payment_matched",
      );
    case "startPayment": {
      if (!Number.isInteger(a.amount) || a.amount < 100 || a.amount > 1000000)
        return state;
      const id = `DEMO-GIFT-${state.nextId}`;
      return event(
        {
          ...state,
          nextId: state.nextId + 1,
          payments: [
            ...state.payments,
            {
              id,
              amount: a.amount,
              status: "pending",
              supporter: `S-GIFT-${state.nextId}`,
              campaign: null,
              frequency: a.frequency,
              method: a.method,
              linkedEnquiry: null,
            },
          ],
          subscriptions: a.subscribe
            ? [
                ...state.subscriptions,
                {
                  reference: id,
                  preference: "approved programme updates",
                  simulated: true,
                },
              ]
            : state.subscriptions,
        },
        "donation_started",
        { reference: id, amount: a.amount, simulation: true },
      );
    }
    case "paymentOutcome": {
      const p = state.payments.find((p) => p.id === a.id);
      if (
        p?.status !== "pending" ||
        !["confirmed", "failed", "cancelled"].includes(a.status)
      )
        return state;
      return event(
        {
          ...state,
          payments: state.payments.map((p) =>
            p.id === a.id ? { ...p, status: a.status } : p,
          ),
        },
        `payment_${a.status}`,
        { reference: a.id, amount: p.amount, simulation: true },
      );
    }
    case "reviewAction":
      return state.action &&
        !state.review &&
        ["delivered", "delayed"].includes(a.result)
        ? event(
            {
              ...state,
              review: { result: a.result, date: scenario.reviewDate },
              action: { ...state.action, status: "reviewed" },
            },
            "action_reviewed",
          )
        : state;
    case "approve":
      return state.review
        ? event({ ...state, approved: true }, "public_update_approved")
        : state;
    case "reset":
      return initialState();
    default:
      return state;
  }
}
