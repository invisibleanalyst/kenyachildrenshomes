import React, { useEffect, useState } from "react";
import kenya from "@svg-maps/kenya";
import { ArrowUpRight } from "lucide-react";
import { useDemo } from "./demo";
import { Link } from "./Navigation";
import { scenario, funding, campaignMetrics } from "./scenario";
export const money = (n) => `KES ${n.toLocaleString("en-KE")}`;
function Label({ children }) {
  return <p className="eyebrow">{children}</p>;
}
function Intro({ label, title, children }) {
  return (
    <section className="page-hero">
      <Label>{label}</Label>
      <h1>{title}</h1>
      {children && <p>{children}</p>}
    </section>
  );
}
function DemoNote() {
  return (
    <p className="demo-note">
      Fictional demonstration · All records, sources and figures below are
      invented for discussion. They describe no verified KCH programme.
    </p>
  );
}
function Funding() {
  const { state } = useDemo();
  const f = funding(state);
  return (
    <div className="evidence-grid funding-grid" aria-label="Programme funding">
      <Metric label="Agreed demo budget" value={money(scenario.budget)} />
      <Metric label="Confirmed funding" value={money(f.confirmed)} />
      <Metric label="Remaining gap" value={money(f.gap)} />
      {f.excess > 0 && (
        <Metric label="Above demo budget" value={money(f.excess)} />
      )}
    </div>
  );
}
function Metric({ label, value }) {
  return (
    <div className="metric">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
export function ApprovedUpdate() {
  const { state } = useDemo();
  return (
    <article className="approved-update">
      <Label>Latest approved demonstration update</Label>
      <p>
        {state.approved
          ? state.review?.result === "delivered"
            ? scenario.reviewedUpdate
            : "Delivery has been delayed. The October attendance outcome is not yet available. Staff will agree a revised action and review date."
          : scenario.initialUpdate}
      </p>
      <p className="source">
        Approved{" "}
        {state.approved
          ? "31 October 2026 (simulated future approval)"
          : "1 October 2026 (fictional baseline approval)"}{" "}
        · Aggregate attendance only ·{" "}
        {state.approved
          ? state.review?.result === "delivered"
            ? "DEMO-REGISTER-OCT"
            : "DEMO-REVIEW-LOG: fictional delivery delay record; no October attendance data"
          : "DEMO-REGISTER-SEP"}
      </p>
    </article>
  );
}
export function ProgrammeSummary() {
  const { state } = useDemo();
  const p =
    scenario.periods[
      state.approved && state.review?.result === "delivered" ? 1 : 0
    ];
  return (
    <section className="section programme-summary">
      <Label>A little clarity. A shared next step.</Label>
      <h2>{scenario.name}.</h2>
      <DemoNote />
      <p>{scenario.objective}</p>
      <div className="summary-layout">
        <div>
          <Metric
            value={`${p.attended} of ${p.total} learners`}
            label="Attended at least 3 of 4 weekly sessions, each week"
          />
          <p className="source">
            {p.label} · Source: {p.source} · Updated {p.updated}
          </p>
          <ApprovedUpdate />
        </div>
        <div>
          <Funding />
          <p>
            Current need: learning materials and travel support. Pending
            payments and pledges are excluded from confirmed funding.
          </p>
          <div className="demo-actions">
            <Link className="button" to="/projects">
              Understand the programme{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <Link className="text-button" to="/donate">
              Support its work <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
function ProgrammeEvidence() {
  const { state } = useDemo();
  return (
    <section className="section">
      <Label>From evidence to a next step</Label>
      <h2>Learning, with follow-through.</h2>
      <DemoNote />
      <div className="evidence-grid">
        <article className="evidence-card">
          <h3>Objective</h3>
          <p>{scenario.objective}</p>
        </article>
        <article className="evidence-card">
          <h3>Evidence</h3>
          <p>
            24 of 40 learners met the attendance threshold in 1–28 September
            2026.
          </p>
          <p className="source">
            Measure: attendance at ≥3 of 4 sessions every week in the four-week
            period. Fixed cohort of 40. Source: DEMO-REGISTER-SEP (fictional
            aggregate register). Updated 30 September 2026.
          </p>
        </article>
        <article className="evidence-card">
          <h3>Interpretation</h3>
          <p>
            16 learners did not meet the threshold. Fictional staff notes
            suggest material and travel barriers. Causes are unverified;
            attendance does not measure learning attainment.
          </p>
        </article>
        <article className="evidence-card">
          <h3>Response</h3>
          <p>{scenario.action}</p>
          <p>
            Milestone: materials and travel support delivered by 23 October
            2026. Budget decision: {money(scenario.budget)}.
          </p>
        </article>
        <article className="evidence-card">
          <h3>Review</h3>
          <p>Next review: {scenario.reviewDate} (simulated future review).</p>
          <p>
            {state.approved && state.review?.result === "delivered"
              ? "Previous action reviewed: materials and travel support delivered. 32 of 40 met the threshold; learning attainment remains unknown."
              : state.approved
                ? "Previous action reviewed: delivery delayed; October outcome unavailable. Revised review date not yet agreed."
                : "Previous action result: not yet available in the approved public record."}
          </p>
        </article>
        <article className="evidence-card">
          <h3>Funding</h3>
          <Funding />
          <p>
            Programme choice expresses an interest, not a restriction on funds.
            Actual allocation policy requires KCH confirmation.
          </p>
        </article>
      </div>
    </section>
  );
}
function ProgrammeMap() {
  const c = kenya.locations.find((c) => c.id === "nairobi");
  return (
    <section className="section programme-location">
      <div>
        <Label>One example. An honest boundary.</Label>
        <h2>Where this story sits.</h2>
        <p>{scenario.location}.</p>
        <p>
          No national service coverage, routes or project locations are claimed.
          All other counties are shown only for geographic context.
        </p>
        <p className="source">
          County geometry: SVG Maps / Mihai Ro, @svg-maps/kenya 2.0.0,{" "}
          <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>.
          The highlighted county is an invented scenario location.
        </p>
        <Link to="/donate" className="button">
          Support the demonstration programme{" "}
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
      <figure>
        <svg viewBox={kenya.viewBox} role="img" aria-labelledby="map-title">
          <title id="map-title">
            Kenya county boundaries; Nairobi highlighted for this fictional
            example only
          </title>
          {kenya.locations.map((x) => (
            <path
              key={x.id}
              d={x.path}
              className={x.id === c?.id ? "example-county" : ""}
            />
          ))}
        </svg>
        <figcaption>Red: Nairobi County, fictional example only</figcaption>
      </figure>
    </section>
  );
}
export function ProgrammePage() {
  const { dispatch } = useDemo();
  const [query, setQuery] = useState("");
  useEffect(() => {
    dispatch({
      type: "event",
      name: "programme_viewed",
      details: { programme: scenario.id },
    });
  }, [dispatch]);
  return (
    <>
      <Intro label="Care, with a clear purpose" title="Room to learn.">
        One fictional programme connects a need, a decision, a response and a
        reviewed result.
      </Intro>
      <section className="section programme-filter">
        <label htmlFor="programme-search">Find a demonstration programme</label>
        <input
          id="programme-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search learning or Nairobi"
        />
      </section>
      {"room to learn learning nairobi".includes(query.toLowerCase()) ? (
        <>
          <ProgrammeEvidence />
          <ProgrammeMap />
        </>
      ) : (
        <section className="section">
          <h2>No demonstration programmes match.</h2>
          <button onClick={() => setQuery("")}>Reset filters</button>
        </section>
      )}
    </>
  );
}
export function ImpactPage() {
  const { state } = useDemo();
  const [period, setPeriod] = useState("baseline");
  const available = state.approved && state.review?.result === "delivered";
  const reviewed = period === "review" && available;
  const p = scenario.periods.find(
    (p) => p.id === (reviewed ? "review" : "baseline"),
  );
  return (
    <>
      <Intro label="Behind the numbers" title="What changed. What’s next.">
        Evidence makes room for better questions, thoughtful action and honest
        follow-through.
      </Intro>
      <section className="section">
        <DemoNote />
        <label htmlFor="reporting-period">Reporting period</label>
        <select
          id="reporting-period"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="baseline">September 2026 · baseline</option>
          <option value="review" disabled={!available}>
            October 2026 · simulated review
            {!available ? " (not available in approved record)" : ""}
          </option>
        </select>
        <div className="summary-layout">
          <figure className="evidence-card attendance-chart">
            <h2>Learners meeting the attendance threshold</h2>
            {[
              scenario.periods[0],
              ...(available ? [scenario.periods[1]] : []),
            ].map((x) => (
              <div className="chart-row" key={x.id}>
                <span>
                  {x.id === "baseline" ? "September" : "October (simulated)"}
                </span>
                <div className="chart-track">
                  <span style={{ width: `${(x.attended / x.total) * 100}%` }} />
                </div>
                <strong>
                  {x.attended} / {x.total} ({(x.attended / x.total) * 100}%)
                </strong>
              </div>
            ))}
            <figcaption>
              Unit: learners in the same cohort of 40. Threshold: ≥3 of 4
              sessions every week over four weeks. {p.label}. Source: {p.source}
              . Updated {p.updated}.
            </figcaption>
          </figure>
          <article className="evidence-card">
            <h3>
              {reviewed
                ? "A response, then a review"
                : "What September tells us"}
            </h3>
            <p>
              {reviewed
                ? scenario.reviewedUpdate
                : "24 of 40 learners met the threshold; 16 did not. Staff proposed materials and travel support, with a 30 October review. The review result will appear after staff approval."}
            </p>
            <p>
              Activity: {p.sessions} learning sessions delivered. Outcome
              observed: {p.attended} learners met the attendance threshold.
              Learning attainment: not assessed.
            </p>
            <p className="source">
              {available
                ? "Comparison: +8 learners / +20 percentage points. No control group; no causal or long-term outcome claim."
                : "Comparison unavailable until a reviewed result is approved. No causal or long-term outcome claim."}
            </p>
          </article>
        </div>
        <ApprovedUpdate />
      </section>
      <ProgrammeEvidence />
    </>
  );
}
export function GivingPage() {
  const { state, dispatch } = useDemo();
  const [amount, setAmount] = useState(1500);
  const [frequency, setFrequency] = useState("Once");
  const [method, setMethod] = useState("M-Pesa");
  const [subscribe, setSubscribe] = useState(false);
  const [reference, setReference] = useState(null);
  const payment = state.payments.find((p) => p.id === reference);
  function start(e) {
    e.preventDefault();
    const id = `DEMO-GIFT-${state.nextId}`;
    dispatch({
      type: "startPayment",
      amount: Number(amount),
      frequency,
      method,
      subscribe,
    });
    if (subscribe)
      dispatch({
        type: "event",
        name: "update_subscription_selected",
        details: { reference: id, simulation: true },
      });
    setReference(id);
  }
  return (
    <>
      <Intro
        label="Give a little. Open a world."
        title="Be part of their tomorrow."
      >
        Explore how giving and thoughtful follow-up could work.
      </Intro>
      <section className="section donate-layout">
        <div className="donate-story">
          <img
            className="giving-photo"
            src="/images/learning-care.png"
            alt="Generated concept image of children learning with a caring adult"
          />
          <p className="source">
            Generated concept imagery; no actual beneficiaries depicted.
          </p>
          <h2>Room to learn.</h2>
          <p>
            Your programme choice expresses an interest; it does not restrict
            the use of funds. This demonstration cannot allocate money. KCH must
            confirm its actual policy.
          </p>
          <Funding />
          <p>
            We report aggregate programme results. An individual gift is never
            credited with a specific child’s outcome.
          </p>
          <ApprovedUpdate />
        </div>
        <form className="donation-form demo-form" onSubmit={start}>
          <h2>Explore a gift.</h2>
          <DemoNote />
          <p>
            No payment is taken. No personal information is requested. Payment
            controls below simulate provider outcomes.
          </p>
          <fieldset disabled={payment?.status === "pending"}>
            <legend>Your gift</legend>
            <label htmlFor="gift-frequency">Frequency</label>
            <select
              id="gift-frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              <option>Once</option>
              <option>Monthly</option>
            </select>
            <div className="amount-grid">
              {[500, 1500, 3000, 5000].map((n) => (
                <button
                  type="button"
                  key={n}
                  className={Number(amount) === n ? "selected" : ""}
                  aria-pressed={Number(amount) === n}
                  onClick={() => setAmount(n)}
                >
                  {money(n)}
                </button>
              ))}
            </div>
            <label htmlFor="gift-amount">Amount in KES</label>
            <input
              id="gift-amount"
              type="number"
              min="100"
              max="1000000"
              step="1"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <label htmlFor="gift-method">Payment method (simulated)</label>
            <select
              id="gift-method"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option>M-Pesa</option>
              <option>Card</option>
            </select>
            <label className="check-label">
              <input
                type="checkbox"
                checked={subscribe}
                onChange={(e) => setSubscribe(e.target.checked)}
              />
              Show optional approved programme updates (demo preference only; no
              email is sent)
            </label>
            <button type="submit" className="button">
              Start simulated gift
            </button>
          </fieldset>
          {payment && (
            <div className="payment-status" role="status">
              <h3>Payment {payment.status}</h3>
              <p>
                Reference: <strong>{payment.id}</strong>
              </p>
              <p>
                {money(payment.amount)} · {payment.frequency} · {payment.method}
                . No real payment was taken.
              </p>
              {payment.status === "pending" ? (
                <>
                  <p>
                    Waiting for a simulated payment-provider response. This
                    amount is excluded from confirmed funding.
                  </p>
                  <div className="demo-actions">
                    {["confirmed", "failed", "cancelled"].map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() =>
                          dispatch({
                            type: "paymentOutcome",
                            id: payment.id,
                            status,
                          })
                        }
                      >
                        Simulate {status}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <p>
                  {payment.status === "confirmed"
                    ? "Your simulated contribution is recorded. Keep this reference; explore the latest approved update or return to the programme. Monthly billing is not connected."
                    : "No contribution was confirmed. Adjust your selection and start a new simulated gift to try again."}
                </p>
              )}
            </div>
          )}
          {payment?.status === "confirmed" && (
            <>
              <ApprovedUpdate />
              <Link to="/projects" className="text-button">
                Return to the programme{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </>
          )}
        </form>
      </section>
    </>
  );
}
export function FeedbackPage() {
  const { dispatch } = useDemo();
  const [topic, setTopic] = useState(
    "How can I support the learning programme?",
  );
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <Intro
        label="A conversation starts here"
        title="Ask. Understand. Connect."
      >
        Explore a supporter enquiry without sharing personal information.
      </Intro>
      <section className="section">
        <form
          className="demo-form evidence-card"
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({ type: "enquiry", topic });
            setSubmitted(true);
          }}
        >
          <h2>A supporter question</h2>
          <p>
            Choose a sample question. It enters the local staff queue for
            assignment, response and closure; it is never published
            automatically. No real message is sent.
          </p>
          <label htmlFor="question-topic">Demonstration question</label>
          <select
            id="question-topic"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              setSubmitted(false);
            }}
          >
            {[
              "How can I support the learning programme?",
              "Where can I find approved programme updates?",
              "I have feedback about the giving experience.",
            ].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <button className="button" disabled={submitted}>
            Submit sample question
          </button>
          {submitted && (
            <p role="status">
              Sample enquiry added to the staff queue. Staff can assign it and
              record a response.
            </p>
          )}
        </form>
        <aside className="demo-note">
          <h3>Confidential concerns need a separate route.</h3>
          <p>
            This demonstration does not receive safeguarding reports or
            confidential programme information. Do not enter sensitive details.
            KCH must supply a verified confidential reporting channel before
            launch; no safeguarding submission is stored here.
          </p>
        </aside>
      </section>
    </>
  );
}
export function AboutPage() {
  return (
    <>
      <Intro
        label="Care. Community. Possibility."
        title="A story centred on children."
      >
        The people and communities behind care deserve an accurate story.
      </Intro>
      <section className="section">
        <h2>Make space for the real story.</h2>
        <p>
          This concept does not assert UK leadership, a UK–Kenya operating
          model, nationwide service coverage or staff identities. KCH’s Kenyan
          leadership, governance, programme locations and history need
          confirmation from current official sources before publication.
        </p>
        <div className="evidence-grid">
          <article className="evidence-card">
            <h3>Programme team</h3>
            <p>
              Neutral role placeholder. KCH to supply approved Kenyan leadership
              details and responsibilities. No invented biography or staff
              portrait.
            </p>
          </article>
          <article className="evidence-card">
            <h3>Content source register</h3>
            <p>
              <a
                href="https://www.kenyachildrenshomes.org.uk/"
                target="_blank"
                rel="noreferrer"
              >
                Organisation website supplied in the original repository
              </a>
              . Not independently verified in this implementation; no factual
              organisational claims have been imported from it.
            </p>
            <p>
              All programme records in this concept: fictional scenario v1.
              Photographs: generated concepts, not staff or beneficiaries. Map
              geometry: SVG Maps, CC BY 4.0.
            </p>
          </article>
          <article className="evidence-card">
            <h3>What KCH can add</h3>
            <p>
              Approved programme evidence, source dates, operating geography,
              allocation policy, safeguarding contacts and consented imagery.
              The demonstration remains a discussion tool until these are
              supplied.
            </p>
          </article>
        </div>
        <Link className="button" to="/projects">
          Explore the fictional programme{" "}
          <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </section>
    </>
  );
}
function Enquiry({ q }) {
  const { state, dispatch } = useDemo();
  const [owner, setOwner] = useState(
    q.owner || "Supporter care lead (demo role)",
  );
  const [response, setResponse] = useState(
    q.response ||
      "Share the approved learning programme summary and explain the current funding gap.",
  );
  const linked = state.payments.find((p) => p.linkedEnquiry === q.id);
  return (
    <article className="evidence-card">
      <h3>{q.id}</h3>
      <p>{q.topic}</p>
      <p>
        Status: {q.status} · Assigned to: {q.owner || "Unassigned"}
      </p>
      <label>
        Enquiry owner
        <select value={owner} onChange={(e) => setOwner(e.target.value)}>
          <option>Supporter care lead (demo role)</option>
          <option>Programme coordinator (demo role)</option>
        </select>
      </label>
      <label>
        Recorded response
        <select value={response} onChange={(e) => setResponse(e.target.value)}>
          <option>
            Share the approved learning programme summary and explain the
            current funding gap.
          </option>
          <option>
            Explain where approved updates appear and how optional preferences
            work.
          </option>
          <option>
            Acknowledge giving feedback and explain the simulated payment steps.
          </option>
        </select>
      </label>
      <div className="demo-actions">
        <button
          disabled={q.status === "closed"}
          onClick={() =>
            dispatch({ type: "followUp", id: q.id, owner, response })
          }
        >
          Assign and record follow-up
        </button>
        <button
          disabled={!q.response || q.status === "closed"}
          onClick={() => dispatch({ type: "closeEnquiry", id: q.id })}
        >
          Close enquiry
        </button>
        <button
          disabled={!q.response || !!linked}
          onClick={() => dispatch({ type: "linkedContribution", id: q.id })}
        >
          Record separate KES 30,000 confirmed contribution
        </button>
      </div>
      <p>
        Contribution:{" "}
        {linked
          ? `${money(linked.amount)} · ${linked.id} · confirmed`
          : "None linked. Following up does not create a payment."}
      </p>
      <ul>
        {q.history.map((h, i) => (
          <li key={i}>
            {h.at} · {h.owner}: {h.response}
          </li>
        ))}
      </ul>
    </article>
  );
}
export function StaffDashboard() {
  const { state, dispatch } = useDemo();
  const [owner, setOwner] = useState("Programme coordinator (demo role)");
  const [result, setResult] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const f = funding(state),
    m = campaignMetrics(state);
  return (
    <>
      <Intro
        label="Staff demonstration · Shared workflow"
        title="From a need to a next step."
      >
        A three-minute fictional walkthrough for discussion with KCH.
      </Intro>
      <section className="section staff-demo">
        <aside className="demo-note">
          <strong>
            Local, unsecured demonstration. No authentication or working
            integrations.
          </strong>
          <p>
            All information is fictional and stored only in this browser.
            October review and approval dates simulate a future step. This is
            not a staff system and must never hold real records.
          </p>
          <button
            onClick={() => {
              dispatch({ type: "reset" });
              setResult("");
            }}
          >
            Reset fictional scenario
          </button>
        </aside>
        <Funding />
        <div className="evidence-grid">
          <Metric
            label="Pending programme payments (excluded)"
            value={money(f.pending)}
          />
          <Metric label="Pledges (excluded)" value={money(f.pledged)} />
          <Metric
            label="Confirmed, unmatched (excluded from programme)"
            value={money(
              state.payments
                .filter((p) => p.programme === null && p.status === "confirmed")
                .reduce((n, p) => n + p.amount, 0),
            )}
          />
        </div>
        <section className="workflow evidence-card">
          <Label>01 / Review evidence → identify need → assign action</Label>
          <h2>A practical response to attendance barriers.</h2>
          <p>
            {scenario.periods[0].label}: 24 of 40 learners met the defined
            attendance threshold. Fictional staff notes suggest materials and
            travel barriers; causes are unverified.
          </p>
          <p>
            Source: DEMO-REGISTER-SEP · Updated 30 September 2026. Need:
            learning materials and travel support. Decision budget:{" "}
            {money(scenario.budget)}.
          </p>
          <div className="demo-actions">
            <button
              disabled={state.evidenceReviewed}
              onClick={() => dispatch({ type: "reviewEvidence" })}
            >
              Review programme evidence
            </button>
            <button
              disabled={!state.evidenceReviewed || state.needIdentified}
              onClick={() => dispatch({ type: "identifyNeed" })}
            >
              Identify materials and travel need
            </button>
          </div>
          <label htmlFor="action-owner">Action owner</label>
          <select
            id="action-owner"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          >
            <option>Programme coordinator (demo role)</option>
            <option>Learning lead (demo role)</option>
          </select>
          <p>
            {scenario.action} Due: 23 October 2026. Review:{" "}
            {scenario.reviewDate}.
          </p>
          <button
            disabled={!state.needIdentified || !!state.action}
            onClick={() => dispatch({ type: "assignAction", owner })}
          >
            Assign programme action
          </button>
          <p role="status">
            {state.action
              ? `Assigned to ${state.action.owner} · due ${state.action.due} · ${state.action.status}`
              : state.needIdentified
                ? "Need identified; ready to assign."
                : state.evidenceReviewed
                  ? "Evidence reviewed; identify the need."
                  : "Evidence awaiting review."}
          </p>
        </section>
        <section>
          <Label>
            02 / Supporter enquiry → response → separate contribution
          </Label>
          <h2>Make follow-up visible.</h2>
          <p>
            Each enquiry has an owner and recorded response. A linked payment
            records an association, never proof that the website caused the
            contribution.
          </p>
          <div className="evidence-grid">
            {state.enquiries.map((q) => (
              <Enquiry key={q.id} q={q} />
            ))}
          </div>
          <p>
            Follow-up completion:{" "}
            {state.enquiries.filter((q) => q.status === "closed").length} of{" "}
            {state.enquiries.length} enquiries closed with a recorded response.
            Enquiries addressed:{" "}
            {state.enquiries.filter((q) => q.history.length).length}. Linked
            confirmed contributions:{" "}
            {money(
              state.payments
                .filter((p) => p.status === "confirmed" && p.linkedEnquiry)
                .reduce((n, p) => n + p.amount, 0),
            )}
            .
          </p>
        </section>
        <section className="evidence-card">
          <Label>03 / Reconcile confirmed funds</Label>
          <h2>Money recorded. Results still to review.</h2>
          <p>
            Unmatched payment DEMO-UNMATCHED: {money(5000)}. This confirmed
            receipt is excluded from programme funding until matched. Pledge
            PLEDGE-01: {money(20000)}, unconfirmed commitment only.
          </p>
          <button
            disabled={!state.payments.some((p) => p.programme === null)}
            onClick={() =>
              dispatch({ type: "matchPayment", id: "DEMO-UNMATCHED" })
            }
          >
            Match payment to Room to learn
          </button>
          <p>
            Unmatched queue:{" "}
            {state.payments.filter((p) => p.programme === null).length}.
            Reconciliation duration is not measured in this demo; production
            should measure receipt-to-match time from provider and staff
            timestamps.
          </p>
          <label htmlFor="payment-filter">Payment status filter</label>
          <select
            id="payment-filter"
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
          >
            {["all", "confirmed", "pending", "failed", "cancelled"].map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          <div className="table-scroll">
            <table>
              <caption>
                Simulated payment ledger — pledges are held separately
              </caption>
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Programme match</th>
                  <th>Enquiry</th>
                </tr>
              </thead>
              <tbody>
                {state.payments
                  .filter(
                    (p) =>
                      paymentFilter === "all" || p.status === paymentFilter,
                  )
                  .map((p) => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{money(p.amount)}</td>
                      <td>{p.status}</td>
                      <td>
                        {p.programme === null ? "Unmatched" : "Room to learn"}
                      </td>
                      <td>{p.linkedEnquiry || "None"}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </section>
        <section className="evidence-card">
          <Label>04 / Review operational result → approve public summary</Label>
          <h2>Evidence before an update.</h2>
          <p>
            Funding never automatically completes the programme action. Record
            its operational result separately, then review the aggregate summary
            for public release.
          </p>
          <label htmlFor="review-result">Simulated review result</label>
          <select
            id="review-result"
            value={result}
            onChange={(e) => setResult(e.target.value)}
          >
            <option value="">Select an observed result</option>
            <option value="delivered">
              Materials and travel support delivered; 32 of 40 meet attendance
              threshold
            </option>
            <option value="delayed">
              Delivery delayed; October outcome not yet available
            </option>
          </select>
          <button
            disabled={!state.action || !!state.review || !result}
            onClick={() => dispatch({ type: "reviewAction", result })}
          >
            Record operational review
          </button>
          <p>
            Action status: {state.action?.status || "Not assigned"}. Review
            result:{" "}
            {state.review
              ? `${state.review.result === "delivered" ? "Delivered; 32 of 40 met threshold" : "Delayed; outcome unavailable"} · ${state.review.date}`
              : "Not recorded"}
            .
          </p>
          <h3>Update awaiting review</h3>
          <p>
            {state.review?.result === "delivered"
              ? scenario.reviewedUpdate
              : state.review
                ? "Delivery has been delayed. The October attendance outcome is not yet available. Staff will agree a revised action and review date."
                : "No draft summary until the operational review is recorded."}
          </p>
          <button
            disabled={!state.review || state.approved}
            onClick={() => dispatch({ type: "approve" })}
          >
            Approve public summary
          </button>
          <p role="status">
            {state.approved
              ? "Approved summary is now available on public pages."
              : "Unapproved review data is hidden from public pages."}
          </p>
          <h3>Public display preview</h3>
          <ApprovedUpdate />
          <Link className="text-button" to="/">
            See the public homepage{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </section>
        <section className="evidence-card">
          <Label>Campaign comparison · fictional records only</Label>
          <h2>Understand the costs of support.</h2>
          <div className="evidence-grid">
            <Metric
              label="Learning appeal: confirmed contributions"
              value={money(m.confirmed)}
            />
            <Metric
              label="Campaign costs"
              value={money(scenario.campaignCost)}
            />
            <Metric
              label="Contributions less stated campaign costs"
              value={money(m.net)}
            />
            <Metric
              label="Repeat supporters / identified appeal supporters"
              value={`${m.repeat} / ${m.supporters}`}
            />
          </div>
          <p>
            {scenario.costDefinition} This is a partial net-funds measure, not
            organisational surplus.
          </p>
          <p>
            Repeat supporter: same fictional supporter ID with at least two
            confirmed receipts in this appeal dataset. A monthly selection alone
            does not count as repeat giving. Campaign association does not
            establish causation. Unattributed gifts remain outside campaign
            totals.
          </p>
          <p>
            Completed giving:{" "}
            {state.payments.filter((p) => p.status === "confirmed").length}{" "}
            confirmed receipts, including unmatched receipts. Donation starts:{" "}
            {state.events.filter((e) => e.name === "donation_started").length};
            preloaded and manually recorded payments have no website start event
            and must not be used to infer conversion improvements.
          </p>
        </section>
        <section className="evidence-card">
          <h2>Demonstration event log</h2>
          <p>
            Local event preparation only; no analytics is transmitted. See
            repository documentation for provider-confirmation requirements and
            production measurement definitions.
          </p>
          <ol className="event-log">
            {state.events.map((e, i) => (
              <li key={i}>
                <time>{e.at}</time> · {e.name}
                {e.reference ? ` · ${e.reference}` : ""}
              </li>
            ))}
          </ol>
        </section>
      </section>
    </>
  );
}
