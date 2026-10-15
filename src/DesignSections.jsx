import React, { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Heart,
  BookOpen,
  Users,
  Sprout,
  ShieldCheck,
  Smartphone,
  Check,
  MapPin,
  Plus,
  Minus,
  ChevronDown,
} from "lucide-react";
import {
  countyMap,
  programmesForCounty,
  followUps,
  exampleLabel,
} from "./data";
const artwork = "/images/kenya-stories.png";
const careScenes = {
  children: {
    src: "/images/children-care.png",
    position: "50% 42%",
    label: "Kenyan child and a caring adult sharing a joyful moment",
  },
  learning: {
    src: "/images/learning-care.png",
    position: "50% 45%",
    label: "Kenyan children reading with a caring educator",
  },
  landscape: {
    src: "/images/community-care.png",
    position: "50% 48%",
    label: "Children and caregivers enjoying a Kenyan community courtyard",
  },
};
export function Art({ scene = "children", className = "", label }) {
  const image = careScenes[scene];
  return (
    <div
      role="img"
      aria-label={
        label ||
        (image
          ? `Editorial artwork: ${image.label}`
          : `Editorial artwork: ${scene}`)
      }
      className={`editorial-art art-${scene} ${image ? "single-scene" : ""} ${className}`}
      style={image ? undefined : { backgroundImage: `url(${artwork})` }}
    >
      {image && (
        <img
          src={image.src}
          alt=""
          aria-hidden="true"
          style={{ objectPosition: image.position }}
        />
      )}
    </div>
  );
}
export function PhotoNumber({ number, scene = "children" }) {
  const image = careScenes[scene];
  return (
    <span
      className={`photo-number art-${scene} ${image ? "single-scene-number" : ""}`}
      style={{
        backgroundImage: `url(${image?.src || artwork})`,
        ...(image ? { backgroundPosition: image.position } : {}),
      }}
      aria-hidden="true"
    >
      {number}
    </span>
  );
}
const Eyebrow = ({ children }) => (
  <div className="eyebrow">
    <span />
    {children}
  </div>
);
export function CareProcess() {
  return (
    <section className="care-process section">
      <Eyebrow>HOW POSSIBILITY BECOMES PROGRESS</Eyebrow>
      <div className="section-heading">
        <h2>
          A little care.
          <br />A whole new chapter.
        </h2>
        <p>
          It starts by listening.
          <br />
          It grows through care.
        </p>
      </div>
      {[
        [
          "Listen first.",
          "Listen to children and families about education and practical needs, as in Kibera Sponsorship and Butterfly family support.",
          "landscape",
        ],
        [
          "Make room to grow.",
          "Connect education and protection through programmes such as Soila, alongside practical support for family life.",
          "learning",
        ],
        [
          "Review and follow up.",
          "Use academic and welfare checks, as described at Butterfly camp, to ask what support and follow-up are needed next.",
          "children",
        ],
      ].map(([t, d, s], i) => (
        <article className="process-row" key={t}>
          <PhotoNumber number={`0${i + 1}`} scene={s} />
          <div>
            <span className="mono">PROPOSED CARE APPROACH / 0{i + 1}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </div>
          <ArrowUpRight size={34} />
        </article>
      ))}
    </section>
  );
}
export function EnhancedMap({ mode = "overview", onProject }) {
  const [selected, setSelected] = useState("nairobi");
  const [hovered, setHovered] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [programmeId, setProgrammeId] = useState("kibera");
  const [tip, setTip] = useState({ x: 50, y: 40 });
  const county = countyMap.locations.find(
    (c) => c.id === (hovered || selected),
  );
  const records = programmesForCounty(county.id);
  const programme = records.find((p) => p.id === programmeId) || records[0];
  const impact = mode === "impact";
  const progress = mode === "projects";
  function enter(event, c) {
    setHovered(c.id);
    const bounds = event.currentTarget
      .closest(".map-drawing")
      .getBoundingClientRect();
    const path = event.currentTarget.getBoundingClientRect();
    setTip({
      x: Math.max(
        30,
        Math.min(
          70,
          ((path.left + path.width / 2 - bounds.left) / bounds.width) * 100,
        ),
      ),
      y: Math.max(
        5,
        Math.min(65, ((path.top - bounds.top) / bounds.height) * 100),
      ),
    });
  }
  function select(id) {
    setSelected(id);
    setHovered(null);
    setProgrammeId(programmesForCounty(id)[0]?.id || "");
  }
  return (
    <section className={`map-section map-${mode}`} id="county-map">
      <div className="map-intro">
        <Eyebrow>
          {impact
            ? "THE PLACES BEHIND THE WORK"
            : progress
              ? "PROGRAMMES / PUBLISHED LOCATIONS"
              : "OUR WORK, ON THE MAP"}
        </Eyebrow>
        <h2>
          {impact ? (
            <>
              Different places.
              <br />
              <span>A shared tomorrow.</span>
            </>
          ) : progress ? (
            <>
              See the work.
              <br />
              <span>Find a connection.</span>
            </>
          ) : (
            <>
              Small beginnings.
              <br />
              <span className="red">Far-reaching change.</span>
            </>
          )}
        </h2>
        <p>
          Discover published programme locations: Kibera Sponsorship and
          Jonathan Gloag Academy in Nairobi; Soila in Suswa, Narok.
        </p>
        <p className="map-context">
          County outlines show geography, not nationwide coverage. Other
          programme locations still need clarification.
        </p>
        <label className="select-label" htmlFor={`county-${mode}`}>
          Find a county
        </label>
        <div className="select-wrap">
          <select
            id={`county-${mode}`}
            value={selected}
            onChange={(e) => select(e.target.value)}
          >
            {countyMap.locations.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <ChevronDown size={18} />
        </div>
        <div className="county-detail" aria-live="polite">
          <div className="county-heading">
            <MapPin size={18} />
            <span className="mono">{county.name.toUpperCase()}</span>
            {programme && <span className="status ongoing">Ongoing</span>}
          </div>
          {programme ? (
            <>
              {records.length > 1 && (
                <>
                  <label className="select-label" htmlFor={`programme-${mode}`}>
                    Choose a programme
                  </label>
                  <div className="select-wrap">
                    <select
                      id={`programme-${mode}`}
                      value={programme.id}
                      onChange={(e) => setProgrammeId(e.target.value)}
                    >
                      {records.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={18} />
                  </div>
                </>
              )}
              <h3>{programme.title}</h3>
              <div className="assessment">
                <span className="mono">PUBLISHED DESCRIPTION</span>
                <p>{programme.description}</p>
                <span className="mono">REPORTING CONTEXT</span>
                <p>{programme.measure}</p>
              </div>
              <button
                className="text-button"
                onClick={() => onProject(programme)}
              >
                View programme <ArrowUpRight size={18} />
              </button>
            </>
          ) : (
            <>
              <h3>No programme information published here</h3>
              <p>
                This does not mean there is no need, or that KCH does not
                operate here.
              </p>
            </>
          )}
        </div>
      </div>
      <div className="map-canvas">
        <div className="map-topline mono">
          <span>KENYA / 47 COUNTIES</span>
          <span>PUBLISHED LOCATIONS</span>
        </div>
        <div className="map-drawing">
          <svg
            viewBox={countyMap.viewBox}
            role="group"
            aria-label="County programme location map"
            style={{ transform: `scale(${zoom})` }}
          >
            {countyMap.locations.map((c) => {
              const known = programmesForCounty(c.id).length > 0;
              return (
                <path
                  key={c.id}
                  d={c.path}
                  tabIndex="0"
                  role="button"
                  aria-label={`${c.name}, ${known ? "published programme locations" : "no published programme record"}`}
                  aria-describedby={
                    hovered === c.id ? `tooltip-${mode}` : undefined
                  }
                  aria-pressed={selected === c.id}
                  className={`${known ? "active" : "neutral"} ${selected === c.id && known ? "selected" : ""}`}
                  onMouseEnter={(e) => enter(e, c)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={(e) => enter(e, c)}
                  onBlur={() => setHovered(null)}
                  onClick={() => select(c.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      select(c.id);
                    }
                  }}
                >
                  <title>
                    {c.name} ·{" "}
                    {known
                      ? "Published programme locations"
                      : "No programme information published here"}
                  </title>
                </path>
              );
            })}
          </svg>
          {hovered && (
            <div
              id={`tooltip-${mode}`}
              className="map-tooltip"
              role="tooltip"
              style={{ left: `${tip.x}%`, top: `${tip.y}%` }}
            >
              <span className="mono">{county.name.toUpperCase()}</span>
              <strong>
                {records.length
                  ? records.map((p) => p.title).join(" · ")
                  : "No programme information published here"}
              </strong>
              <p>
                {records.length
                  ? "Published county-level locations; coverage and reporting periods need clarification."
                  : "This is an information gap, not a statement about need or KCH activity."}
              </p>
            </div>
          )}
          <span className="map-watermark">KENYA</span>
        </div>
        <div className="map-bottom">
          <div className="map-legend mono">
            <span>
              <i className="active-dot" />
              Published location
            </span>
            <span>
              <i className="planned-dot" />
              No published record
            </span>
          </div>
          <div className="map-controls">
            <button
              disabled={zoom === 1}
              aria-label="Zoom out map"
              onClick={() => setZoom(Math.max(1, zoom - 0.2))}
            >
              <Minus size={16} />
            </button>
            <button
              disabled={zoom >= 1.4}
              aria-label="Zoom in map"
              onClick={() => setZoom(Math.min(1.4, zoom + 0.2))}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        <p className="map-credit">
          Map: SVG Maps / Mihai Ro · CC BY 4.0. County locations, never
          individual addresses.
        </p>
      </div>
    </section>
  );
}

export function ConnectionMap() {
  const [focus, setFocus] = useState("kenya");
  return (
    <section className="connection-section section">
      <div>
        <Eyebrow>HISTORICAL CONNECTIONS</Eyebrow>
        <h2>
          Two places.
          <br />
          <span className="red">One shared purpose.</span>
        </h2>
        <p>
          KCH’s story includes historical UK partnerships. Its published account
          now describes Kenyan Board leadership following handover at the end of
          2025.
        </p>
        <div className="connection-tabs">
          {[
            ["uk", "United Kingdom"],
            ["kenya", "Kenya"],
          ].map(([id, t]) => (
            <button
              key={id}
              className={focus === id ? "selected" : ""}
              aria-pressed={focus === id}
              onClick={() => setFocus(id)}
            >
              {t}
              <ArrowUpRight size={17} />
            </button>
          ))}
        </div>
        <div className="connection-detail" aria-live="polite">
          <h3>
            {focus === "uk"
              ? "A historical partnership."
              : "Care, close to home."}
          </h3>
          <p>
            {focus === "uk"
              ? "This symbolic illustration recalls UK connections in KCH’s history. It does not show a verified current support structure or funding route."
              : "Founded in 1961 as Thomas Barnardo House, KCH now emphasises education, sponsorship, reintegration and family support under Kenyan leadership."}
          </p>
        </div>
      </div>
      <div className="connection-map">
        <svg
          viewBox="0 0 700 460"
          role="img"
          aria-label="A symbolic historical UK–Kenya partnership, not a current operating structure"
        >
          <defs>
            <pattern
              id="mapDots"
              width="14"
              height="14"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="#d7cec4" />
            </pattern>
          </defs>
          <rect width="700" height="460" fill="url(#mapDots)" rx="80" />
          <path
            className="connection-route"
            d="M170 155 C360 -15 585 60 505 340"
          />
          <g
            className={
              focus === "uk" ? "route-country selected" : "route-country"
            }
            transform="translate(115 70)"
          >
            <path d="M44 0 60 12 58 35 72 44 65 61 78 79 66 93 78 116 67 126 75 139 58 146 37 140 27 124 9 127 0 111 20 95 17 77 35 69 29 56 39 44 28 29Z" />
            <circle cx="48" cy="92" r="7" />
          </g>
          <g
            className={
              focus === "kenya" ? "route-country selected" : "route-country"
            }
            transform="translate(430 200) scale(.33)"
          >
            {countyMap.locations.map((c) => (
              <path key={c.id} d={c.path} />
            ))}
            <circle cx="205" cy="375" r="20" />
          </g>
          <text x="92" y="250">
            UNITED KINGDOM
          </text>
          <text x="465" y="425">
            KENYA
          </text>
          <circle className="route-traveller" r="5" fill="#ed252a">
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              path="M170 155 C360 -15 585 60 505 340"
            />
          </circle>
        </svg>
        <span className="mono">
          HISTORICAL PARTNERSHIP · SYMBOLIC ILLUSTRATION
        </span>
      </div>
    </section>
  );
}
export function TeamSection() {
  return (
    <section className="team-section section">
      <Eyebrow>THE ROLES BEHIND THE WORK</Eyebrow>
      <div className="section-heading">
        <h2>
          Different backgrounds.
          <br />A shared commitment.
        </h2>
        <p>
          Local knowledge. Open hearts.
          <br />
          Role illustrations, not staff profiles.
        </p>
      </div>
      <div className="team-grid">
        {[
          [
            "educator",
            "Community & care",
            "Illustrative role",
            "Care teams work alongside children and families, listening to everyday needs and building relationships that last.",
          ],
          [
            "coordinator",
            "Programmes & partnerships",
            "Illustrative role",
            "Local coordination connects education, wellbeing, and practical support with community knowledge.",
          ],
          [
            "support",
            "Supporter relations",
            "Illustrative role",
            "Supporter communication can turn approved programme information into clear updates. This is a role explanation, not a verified current post.",
          ],
        ].map(([scene, t, place, d]) => (
          <article key={scene}>
            <Art
              scene={scene}
              label={`Editorial portrait representing ${t.toLowerCase()}, not an employee photograph`}
            />
            <span className="mono">{place.toUpperCase()}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </article>
        ))}
      </div>
      <p className="team-note mono">
        ILLUSTRATIVE ROLES · EDITORIAL ARTWORK, NOT KCH STAFF · APPROVED
        PROFILES NOT SUPPLIED
      </p>
    </section>
  );
}
export function ImpactDashboard() {
  const [period, setPeriod] = useState("C");
  const [metric, setMetric] = useState("completed");
  const observation = followUps.find((r) => r.period === period);
  const definitions = {
    scheduled: { label: "Scheduled", unit: "follow-ups due", icon: BookOpen },
    completed: { label: "Completed", unit: "follow-ups reviewed", icon: Heart },
    rate: {
      label: "Completion",
      unit: "of scheduled follow-ups",
      icon: Sprout,
    },
  };
  const value = (record, key) =>
    key === "rate"
      ? Math.round((record.completed / record.scheduled) * 100)
      : record[key];
  // A common zero baseline keeps the 21/24/27 observations in proportion.
  const scaleMax = Math.max(...followUps.map((r) => r.scheduled));
  const points = followUps.map((r, i) => ({
    x: 10 + i * (435 / (followUps.length - 1)),
    y: 100 - (r.completed / scaleMax) * 88,
    record: r,
  }));
  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x} ${p.y}`)
    .join(" ");
  return (
    <section className="impact-dashboard section">
      <div className="section-heading">
        <div>
          <Eyebrow>LOOK BEYOND THE NUMBERS</Eyebrow>
          <h2>
            What a brighter
            <br />
            tomorrow looks like.
          </h2>
        </div>
        <label className="year-picker">
          Example period
          <select
            aria-label="Example follow-up period"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          >
            {followUps.map((r) => (
              <option key={r.period}>{r.period}</option>
            ))}
          </select>
        </label>
      </div>
      <p className="example-label">
        {exampleLabel} · Education &amp; family follow-up
      </p>
      <div className="impact-outcomes">
        {Object.entries(definitions).map(
          ([key, { label, unit, icon: Icon }]) => (
            <button
              key={key}
              className={`outcome-card ${metric === key ? "selected" : ""}`}
              aria-pressed={metric === key}
              onClick={() => setMetric(key)}
            >
              <Icon size={31} />
              <span className="mono">
                {label.toUpperCase()} / {period}
              </span>
              <strong>
                {value(observation, key)}
                {key === "rate" ? "%" : ""}
              </strong>
              <span>{unit}</span>
              <ArrowUpRight size={22} />
            </button>
          ),
        )}
      </div>
      <div className="impact-growth">
        <Art
          scene={
            metric === "scheduled"
              ? "landscape"
              : metric === "rate"
                ? "children"
                : "learning"
          }
        />
        <div>
          <Eyebrow>EDUCATION &amp; FAMILY FOLLOW-UP / {period}</Eyebrow>
          <h3>
            Review, respond,
            <br />
            check again.
          </h3>
          <p>
            {metric === "scheduled"
              ? `${observation.scheduled} follow-ups were scheduled in example period ${period}. Scheduled means a visit was due during that support period.`
              : metric === "completed"
                ? `${observation.completed} of ${observation.scheduled} scheduled follow-ups were completed in example period ${period}. A completed follow-up has both academic-progress and welfare checks recorded and reviewed by a coordinator.`
                : `${value(observation, "rate")}% completion in example period ${period}: ${observation.completed} completed divided by ${observation.scheduled} scheduled follow-ups.`}{" "}
            These fictional records show follow-up delivery, not improved child
            wellbeing.
          </p>
          <div
            className="impact-sparkline"
            role="img"
            aria-label={`Illustrative follow-up delivery, not KCH results: ${followUps.map((r) => `period ${r.period}, ${r.completed} completed of ${r.scheduled} scheduled follow-ups`).join("; ")}. Zero to ${scaleMax} follow-up scale.`}
          >
            <svg viewBox="0 0 460 120" aria-hidden="true">
              <path d={path} fill="none" stroke="#ed252a" strokeWidth="2" />
              {points.map(({ x, y, record: r }) => (
                <g key={r.period}>
                  <circle
                    cx={x}
                    cy={y}
                    r={period === r.period ? 5 : 3}
                    fill="#ed252a"
                  />
                  <text
                    x={x}
                    y={y - 10}
                    textAnchor={
                      r.period === "A"
                        ? "start"
                        : r.period === "C"
                          ? "end"
                          : "middle"
                    }
                  >
                    {r.completed} / {r.scheduled}
                  </text>
                </g>
              ))}
            </svg>
            <div>
              {followUps.map((r) => (
                <span key={r.period}>Period {r.period}</span>
              ))}
            </div>
          </div>
          <details className="evidence-note">
            <summary>Example definitions &amp; source context</summary>
            <p>
              {exampleLabel}. Periods A, B and C are comparable fictional
              support periods, not KCH reporting years. Completion requires both
              academic-progress and welfare checks to be recorded and reviewed
              by a coordinator. The line shows explicit completed counts against
              30 scheduled per period; its vertical scale begins at zero. No
              historical multiplier is used.
            </p>
            <p>
              Inspired by KCH’s{" "}
              <a href="https://kch.co.ke/news/butterfly-childrens-camp/">
                August 2025 Butterfly camp account
              </a>
              , which describes checks but provides no comparable outcome series
              here.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
}

export function DonationJourney() {
  const [step, setStep] = useState(0);
  const steps = [
    [
      "Your act of care.",
      "Choose an amount and a way to give. One generous decision starts the journey.",
      "children",
      Heart,
    ],
    [
      "A confirmed payment.",
      "A verified provider would need to confirm a payment before it is recorded. Here, confirmation is a local simulation; no payment is taken.",
      "support",
      ShieldCheck,
    ],
    [
      "Support takes shape.",
      "KCH would review available funds against programme priorities. Programme interest is distinct from restricted allocation; pledges are not received cash.",
      "coordinator",
      Users,
    ],
    [
      "Care, review and update.",
      "Support would be delivered, then reviewed through programme follow-up. One approved input could inform both the programme summary and an optional supporter update. See the clearly labelled sample after mock confirmation.",
      "learning",
      BookOpen,
    ],
  ];
  return (
    <section className="donation-journey section">
      <Eyebrow>FOLLOW THE GOOD</Eyebrow>
      <div className="section-heading">
        <h2>
          From your hands.
          <br />
          <span className="red">To a world of possibility.</span>
        </h2>
        <p>
          See the intended journey of a gift,
          <br />
          from a decision to the care it can help create.
        </p>
      </div>
      <div className="journey-track" aria-label="Donation journey stages">
        {steps.map(([t, d, s, Icon], i) => (
          <button
            key={t}
            className={step === i ? "selected" : ""}
            aria-pressed={step === i}
            onClick={() => setStep(i)}
          >
            <span className="journey-dot">
              <Icon size={24} />
            </span>
            <span className="mono">0{i + 1}</span>
            <span>
              {
                [
                  "You give",
                  "Payment confirmed",
                  "Resources assigned",
                  "Care & review",
                ][i]
              }
            </span>
            {i < 3 && <ArrowRight size={20} />}
          </button>
        ))}
      </div>
      <div className="journey-feature" aria-live="polite">
        <PhotoNumber number={`0${step + 1}`} scene={steps[step][2]} />
        <div>
          <span className="mono">THE GIFT JOURNEY / 0{step + 1}</span>
          <h3>{steps[step][0]}</h3>
          <p>{steps[step][1]}</p>
          <button
            className="text-button"
            onClick={() => setStep((step + 1) % 4)}
          >
            {step === 3 ? "Back to the beginning" : "Follow the next step"}
            <ArrowRight size={18} />
          </button>
        </div>
        <Art scene={steps[step][2]} />
      </div>
      <p className="journey-note">
        This describes a proposed giving process, not a tracked payment. No live
        provider, recurring billing, allocation or update delivery is
        implemented. The track illustrates a proposed process, not actual
        payment progress.
      </p>
    </section>
  );
}
