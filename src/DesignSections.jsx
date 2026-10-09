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
  projects,
  outcomes,
  outcomeTypes,
  assessment,
  nextAction,
} from "./data";
const artwork = "/images/kenya-stories.png";
export function Art({ scene = "children", className = "", label }) {
  return (
    <div
      role="img"
      aria-label={label || `Editorial artwork: ${scene}`}
      className={`editorial-art art-${scene} ${className}`}
      style={{ backgroundImage: `url(${artwork})` }}
    />
  );
}
export function PhotoNumber({ number, scene = "children" }) {
  return (
    <span
      className={`photo-number art-${scene}`}
      style={{ backgroundImage: `url(${artwork})` }}
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
          "Understand the child, the family, and the place they call home. Let local voices shape the next step.",
          "landscape",
        ],
        [
          "Make room to grow.",
          "Bring learning, wellbeing, and everyday care together. Create space for children to discover their own possibilities.",
          "learning",
        ],
        [
          "Keep showing up.",
          "Build lasting connections. Review what is working, support families, and keep moving forward together.",
          "children",
        ],
      ].map(([t, d, s], i) => (
        <article className="process-row" key={t}>
          <PhotoNumber number={`0${i + 1}`} scene={s} />
          <div>
            <span className="mono">THE CARE JOURNEY / 0{i + 1}</span>
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
  const [metric, setMetric] = useState("learning");
  const [tip, setTip] = useState({ x: 50, y: 40 });
  const county =
    projects.find((p) => p.id === (hovered || selected)) || projects[0];
  const outcome = outcomes.find((o) => o.id === county.id);
  const impact = mode === "impact";
  const progress = mode === "projects";
  const maximum = Math.max(...outcomes.map((o) => o[metric]));
  const intensity = (p) =>
    impact
      ? outcomes.find((o) => o.id === p.id)[metric] / maximum
      : p.progress / 100;
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
  return (
    <section className={`map-section map-${mode}`} id="county-map">
      <div className="map-intro">
        <Eyebrow>
          {impact
            ? "A GEOGRAPHY OF POSSIBILITY"
            : progress
              ? "DELIVERY / COUNTY BY COUNTY"
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
              See the plan.
              <br />
              <span>Follow the progress.</span>
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
          {impact
            ? "Explore where learning, family support, and wellbeing come together. Choose an outcome to see the reach across Kenya."
            : progress
              ? "From the first community conversation to the final delivery milestone. Explore current progress, local needs, and the next step in each county."
              : "Every county has a story. Explore the places, the work underway, and the possibilities still ahead."}
        </p>
        {impact && (
          <div className="outcome-toggle" aria-label="Map outcome">
            {Object.entries(outcomeTypes).map(([k, v]) => (
              <button
                key={k}
                aria-pressed={metric === k}
                className={metric === k ? "selected" : ""}
                onClick={() => setMetric(k)}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}
        <label className="select-label" htmlFor={`county-${mode}`}>
          Find a county
        </label>
        <div className="select-wrap">
          <select
            id={`county-${mode}`}
            value={selected}
            onChange={(e) => {
              setSelected(e.target.value);
              setHovered(null);
            }}
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>
                {p.county}
              </option>
            ))}
          </select>
          <ChevronDown size={18} />
        </div>
        <div className="county-detail" aria-live="polite">
          <div className="county-heading">
            <MapPin size={18} />
            <span className="mono">{county.county.toUpperCase()}</span>
            {!impact && (
              <span className={`status ${county.status.toLowerCase()}`}>
                {county.status}
              </span>
            )}
          </div>
          {impact ? (
            <>
              <strong className="outcome-value">
                {outcome[metric].toLocaleString()}
              </strong>
              <p>{outcomeTypes[metric].unit}</p>
              <div className="outcome-mini">
                <BookOpen size={19} />
                <span>{outcome.attendance}% learning participation</span>
              </div>
              <p>
                More chances to learn, stronger family connections, and everyday
                wellbeing.
              </p>
            </>
          ) : (
            <>
              <h3>{county.title}</h3>
              <div className="assessment">
                <span className="mono">CURRENT ASSESSMENT</span>
                <p>{assessment(county)}</p>
                <span className="mono">WHAT COMES NEXT</span>
                <p>{nextAction(county)}</p>
              </div>
              <div className="county-numbers">
                <div>
                  <strong>{county.progress}%</strong>
                  <span>delivery progress</span>
                </div>
                <div>
                  <strong>{county.children}</strong>
                  <span>programme places</span>
                </div>
              </div>
              <div className="progress">
                <span style={{ width: `${county.progress}%` }} />
              </div>
              <button className="text-button" onClick={() => onProject(county)}>
                View project <ArrowUpRight size={18} />
              </button>
            </>
          )}
        </div>
      </div>
      <div className="map-canvas">
        <div className="map-topline mono">
          <span>KENYA / 47 COUNTIES</span>
          <span>
            {impact
              ? outcomeTypes[metric].label.toUpperCase()
              : "HOVER TO EXPLORE"}
          </span>
        </div>
        <div className="map-drawing">
          <svg
            viewBox={countyMap.viewBox}
            role="group"
            aria-label={
              impact
                ? "County impact intensity map"
                : "County project progress map"
            }
            style={{ transform: `scale(${zoom})` }}
          >
            {countyMap.locations.map((c, i) => (
              <path
                key={c.id}
                d={c.path}
                tabIndex="0"
                role="button"
                aria-label={`${c.name}, ${projects[i].status} project`}
                aria-pressed={selected === c.id}
                className={`${projects[i].status.toLowerCase()} ${county.id === c.id ? "selected" : ""}`}
                style={
                  impact || progress
                    ? {
                        fill: impact
                          ? `rgb(${Math.round(250 - intensity(projects[i]) * 215)},${Math.round(236 - intensity(projects[i]) * 201)},${Math.round(219 - intensity(projects[i]) * 184)})`
                          : `rgb(${Math.round(254 - intensity(projects[i]) * 79)},${Math.round(224 - intensity(projects[i]) * 200)},${Math.round(210 - intensity(projects[i]) * 180)})`,
                      }
                    : undefined
                }
                onMouseEnter={(e) => enter(e, c)}
                onMouseLeave={() => setHovered(null)}
                onFocus={(e) => enter(e, c)}
                onBlur={() => setHovered(null)}
                onClick={() => {
                  setSelected(c.id);
                  setHovered(null);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelected(c.id);
                    setHovered(null);
                  }
                }}
              >
                <title>
                  {c.name} · {projects[i].status}
                </title>
              </path>
            ))}
          </svg>
          {hovered && (
            <div
              className="map-tooltip"
              role="tooltip"
              style={{ left: `${tip.x}%`, top: `${tip.y}%` }}
            >
              <span className="mono">{county.county.toUpperCase()}</span>
              <strong>
                {impact
                  ? `${outcome[metric].toLocaleString()} ${outcomeTypes[metric].unit}`
                  : county.title}
              </strong>
              <p>
                {impact
                  ? `${outcome.attendance}% learning participation · family-led support`
                  : assessment(county)}
              </p>
              {!impact && (
                <p>
                  <b>Next:</b> {nextAction(county)}
                </p>
              )}
            </div>
          )}
          <span className="map-watermark">KENYA</span>
        </div>
        <div className="map-bottom">
          {impact || progress ? (
            <div className="heat-legend">
              <span>{impact ? "Lower reach" : "Getting started"}</span>
              <i />
              <span>{impact ? "Higher reach" : "Delivered"}</span>
            </div>
          ) : (
            <div className="map-legend mono">
              <span>
                <i className="active-dot" />
                Active
              </span>
              <span>
                <i className="complete-dot" />
                Completed
              </span>
              <span>
                <i className="planned-dot" />
                Planned
              </span>
            </div>
          )}
          <div className="map-controls">
            <button
              disabled={zoom === 1}
              aria-label="Zoom out map"
              onClick={() => setZoom(Math.max(1, zoom - 0.2))}
            >
              <Minus size={16} />
            </button>
            <button
              aria-label="Zoom in map"
              disabled={zoom >= 1.4}
              onClick={() => setZoom(Math.min(1.4, zoom + 0.2))}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
        <p className="map-credit">Map: SVG Maps / Mihai Ro · CC BY 4.0</p>
      </div>
    </section>
  );
}
export function ConnectionMap() {
  const [focus, setFocus] = useState("kenya");
  return (
    <section className="connection-section section">
      <div>
        <Eyebrow>CONNECTED BY CARE</Eyebrow>
        <h2>
          Two places.
          <br />
          <span className="red">One shared purpose.</span>
        </h2>
        <p>
          A UK base. A Kenyan heart. Connecting supporters with the communities
          where care happens.
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
              ? "A community of supporters."
              : "Care, close to home."}
          </h3>
          <p>
            {focus === "uk"
              ? "Fundraising, communication, and partnerships connect people who want to help with a shared purpose."
              : "Local relationships bring care, learning, and family support into the places children know best."}
          </p>
        </div>
      </div>
      <div className="connection-map">
        <svg
          viewBox="0 0 700 460"
          role="img"
          aria-label="A symbolic connection from the United Kingdom to Kenya"
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
        <span className="mono">SUPPORT WITHOUT BORDERS</span>
      </div>
    </section>
  );
}
export function TeamSection() {
  return (
    <section className="team-section section">
      <Eyebrow>THE PEOPLE BEHIND THE PURPOSE</Eyebrow>
      <div className="section-heading">
        <h2>
          Different backgrounds.
          <br />A shared commitment.
        </h2>
        <p>
          Local knowledge. Open hearts.
          <br />
          Connections that cross borders.
        </p>
      </div>
      <div className="team-grid">
        {[
          [
            "educator",
            "Community & care",
            "Kenya",
            "Care teams work alongside children and families, listening to everyday needs and building relationships that last.",
          ],
          [
            "coordinator",
            "Programmes & partnerships",
            "Kenya",
            "Local coordination connects education, wellbeing, and practical support with community knowledge.",
          ],
          [
            "support",
            "Supporter relations",
            "United Kingdom",
            "The UK support function brings together fundraising, partnerships, and clear communication with donors.",
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
        ROLE PORTRAITS · EDITORIAL ARTWORK · STAFF PROFILES TO BE CONFIRMED
      </p>
    </section>
  );
}
export function ImpactDashboard() {
  const [metric, setMetric] = useState("learning");
  const [year, setYear] = useState("2026");
  const factor = { 2024: 0.62, 2025: 0.81, 2026: 1 }[year];
  const values = Object.keys(outcomeTypes).map((k) =>
    Math.round(outcomes.reduce((n, o) => n + o[k], 0) * factor),
  );
  const total = values[Object.keys(outcomeTypes).indexOf(metric)];
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
          Reporting year
          <select
            aria-label="Impact reporting year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option>2024</option>
            <option>2025</option>
            <option>2026</option>
          </select>
        </label>
      </div>
      <div className="impact-outcomes">
        {Object.entries(outcomeTypes).map(([k, v], i) => {
          const Icon = [BookOpen, Heart, Sprout][i];
          return (
            <button
              key={k}
              className={`outcome-card ${metric === k ? "selected" : ""}`}
              aria-pressed={metric === k}
              onClick={() => setMetric(k)}
            >
              <Icon size={31} />
              <span className="mono">{v.label.toUpperCase()}</span>
              <strong>{values[i].toLocaleString()}</strong>
              <span>{v.unit}</span>
              <ArrowUpRight size={22} />
            </button>
          );
        })}
      </div>
      <div className="impact-growth">
        <Art
          scene={
            metric === "learning"
              ? "learning"
              : metric === "families"
                ? "children"
                : "landscape"
          }
        />
        <div>
          <Eyebrow>
            {outcomeTypes[metric].label.toUpperCase()} / {year}
          </Eyebrow>
          <h3>
            {metric === "learning"
              ? "More room for curiosity."
              : metric === "families"
                ? "Stronger roots. Greater belonging."
                : "Everyday wellbeing. A stronger start."}
          </h3>
          <p>
            {metric === "learning"
              ? "Learning is more than a classroom. It is the confidence to ask a question, the joy of understanding, and the freedom to imagine a different future."
              : metric === "families"
                ? "A stable family connection can change the rhythm of a child’s life. Practical guidance and consistent care help turn support into belonging."
                : "Good food and healthy routines make room for growing, playing, and discovering. Wellbeing is part of the everyday foundation of childhood."}
          </p>
          <div
            className="impact-sparkline"
            role="img"
            aria-label={`${outcomeTypes[metric].label} reach for 2024, 2025, 2026: ${[0.62, 0.81, 1].map((f) => Math.round((total / factor) * f).toLocaleString()).join(", ")}`}
          >
            <svg viewBox="0 0 460 120">
              <path
                d="M10 100 C100 90 135 76 230 58 S355 35 445 12"
                fill="none"
                stroke="#ed252a"
                strokeWidth="4"
              />
              {[
                [10, 100],
                [230, 58],
                [445, 12],
              ].map(([x, y], i) => (
                <circle
                  cx={x}
                  cy={y}
                  r={Number(year) === 2024 + i ? 7 : 4}
                  fill="#ed252a"
                  key={i}
                />
              ))}
            </svg>
            <div>
              <span>2024</span>
              <span>2025</span>
              <span>2026</span>
            </div>
          </div>
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
      "A payment provider processes the gift and confirms receipt. The future checkout will support M-Pesa and cards.",
      "support",
      ShieldCheck,
    ],
    [
      "Support takes shape.",
      "The charity assigns available funds to programme priorities, with local needs guiding the plan.",
      "coordinator",
      Users,
    ],
    [
      "Care reaches everyday life.",
      "Local teams turn programme resources into learning materials, family support, nutrition, and moments of belonging.",
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
                  "Care delivered",
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
        This describes a proposed giving process, not a tracked payment.
        Programme allocation and provider fees will be confirmed before launch.
      </p>
    </section>
  );
}
