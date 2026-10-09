import React, { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Heart,
  Menu,
  X,
  MapPin,
  BookOpen,
  Users,
  Sprout,
  Check,
  Smartphone,
  CreditCard,
  ShieldCheck,
  Compass,
  ChevronDown,
} from "lucide-react";
import {
  countyMap,
  projects,
  outcomes,
  outcomeTypes,
  totals,
  assessment,
  nextAction,
  programmeNames,
} from "./data";
const images = {
  journey: "/images/discovery-journey.png",
  together: "/images/discovery-together.png",
  play: "/images/community-care.png",
  care: "/images/children-care.png",
};
const routes = {
  "/": "Home",
  "/about": "Our story",
  "/projects": "Projects",
  "/impact": "Impact",
  "/donate": "Give",
};
function Link({ to, children, className = "", ...props }) {
  return (
    <a
      href={to}
      className={className}
      {...props}
      onClick={(e) => {
        if (e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
          e.preventDefault();
          history.pushState({}, "", to);
          window.dispatchEvent(new PopStateEvent("popstate"));
          window.scrollTo({ top: 0, behavior: "instant" });
        }
      }}
    >
      {children}
    </a>
  );
}
function Label({ children }) {
  return <span className="d-label">{children}</span>;
}
function CTA({ to, children, light = false }) {
  return (
    <Link to={to} className={`d-cta ${light ? "d-cta-light" : ""}`}>
      {children}
      <ArrowUpRight size={20} />
    </Link>
  );
}
function Logo() {
  return (
    <Link to="/" className="d-logo" aria-label="Kenya Children’s Homes home">
      <span className="d-roof" />
      <span>
        KENYA<span>CHILDREN’S HOMES</span>
      </span>
    </Link>
  );
}
function Header({ path }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  return (
    <>
      <div className="d-concept">
        DESIGN 02 · PRESENTATION CONCEPT · UNVERIFIED FIGURES / CREATED IMAGERY
        / PAYMENTS NOT LIVE
      </div>
      <header className="d-header">
        <Logo />
        <nav aria-label="Main navigation" className={open ? "is-open" : ""}>
          {Object.entries(routes)
            .filter(([p]) => p != "/donate")
            .map(([p, label]) => (
              <Link
                key={p}
                to={p}
                aria-current={p === path ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          <CTA to="/donate" light>
            Give a little good
          </CTA>
        </nav>
        <button
          className="d-mobile-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
    </>
  );
}
function Photo({ scene = "together", alt = "", className = "" }) {
  return (
    <img
      src={images[scene]}
      alt={
        alt ||
        `Created editorial scene of ${scene === "journey" ? "a Kenyan landscape and a caring community" : "Kenyan children and caring adults"}`
      }
      className={className}
    />
  );
}
function Wave() {
  return (
    <svg
      className="d-wave"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d="M0 50C120 95 255 0 400 40S660 100 790 50 1100 25 1230 50 1370 70 1440 25V100H0Z" />
    </svg>
  );
}
function Hero({
  label,
  title,
  accent,
  description,
  scene = "journey",
  compact = false,
  children,
}) {
  return (
    <section className={`d-hero ${compact ? "d-hero-compact" : ""}`}>
      <Photo scene={scene} />
      <div className="d-hero-shade" />
      <div className="d-hero-content">
        <Label>{label}</Label>
        <h1>
          {title}
          <br />
          <span>{accent}</span>
        </h1>
        <p>{description}</p>
        {children}
      </div>
      <div className="d-hero-coordinate">
        <Label>01°17′S / 36°49′E</Label>
        <span>
          Rooted in Kenya.
          <br />
          Connected by care.
        </span>
      </div>
      <Wave />
    </section>
  );
}
function Footer() {
  return (
    <footer className="d-footer">
      <div className="d-footer-top">
        <div>
          <Label>THE NEXT CHAPTER STARTS WITH YOU</Label>
          <h2>
            A little good.
            <br />A world of possibility.
          </h2>
        </div>
        <CTA to="/donate" light>
          Be part of their tomorrow
        </CTA>
      </div>
      <div className="d-footer-links">
        <Logo />
        <div>
          {Object.entries(routes).map(([p, t]) => (
            <Link key={p} to={p}>
              {t}
              <ArrowUpRight size={14} />
            </Link>
          ))}
        </div>
        <a
          href="https://www.kenyachildrenshomes.org.uk/"
          target="_blank"
          rel="noreferrer"
        >
          The organisation’s current website <ArrowUpRight size={15} />
        </a>
      </div>
      <div className="d-footer-bottom">
        <span>
          © {new Date().getFullYear()} Kenya Children’s Homes · Design concept
        </span>
        <span>UK BASE / KENYAN HEART</span>
      </div>
    </footer>
  );
}
function ProjectDialog({ project: p, onClose }) {
  const close = useRef(null);
  useEffect(() => {
    if (!p) return;
    const previous = document.activeElement;
    close.current?.focus();
    const fn = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", fn);
    return () => {
      document.removeEventListener("keydown", fn);
      previous?.focus();
    };
  }, [p]);
  if (!p) return null;
  return (
    <div className="d-modal-backdrop" onClick={onClose}>
      <section
        className="d-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="d-project-title"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            const nodes = [...e.currentTarget.querySelectorAll("button,a")];
            if (e.shiftKey && document.activeElement === nodes[0]) {
              e.preventDefault();
              nodes.at(-1).focus();
            } else if (!e.shiftKey && document.activeElement === nodes.at(-1)) {
              e.preventDefault();
              nodes[0].focus();
            }
          }
        }}
      >
        <button
          className="d-close"
          ref={close}
          aria-label="Close project"
          onClick={onClose}
        >
          <X />
        </button>
        <Label>
          {p.county} / {p.status}
        </Label>
        <h2 id="d-project-title">{p.title}</h2>
        <p>{p.description}</p>
        <div className="d-dialog-metrics">
          <div>
            <strong>{p.progress}%</strong>
            <span>Delivery progress</span>
          </div>
          <div>
            <strong>{p.children}</strong>
            <span>Programme places</span>
          </div>
        </div>
        <Label>CURRENT ASSESSMENT</Label>
        <p>{assessment(p)}</p>
        <Label>NEXT STEP</Label>
        <p>{nextAction(p)}</p>
        <CTA to="/donate">Help the next chapter unfold</CTA>
      </section>
    </div>
  );
}
function Atlas({ mode = "discovery" }) {
  const [countyId, setCountyId] = useState("nairobi");
  const [hover, setHover] = useState(null);
  const [layer, setLayer] = useState(mode === "impact" ? "Learning" : "All");
  const [centres, setCentres] = useState({});
  const [detail, setDetail] = useState(null);
  const svg = useRef(null);
  const p = projects.find((x) => x.id === (hover || countyId)) || projects[0];
  const outcome = outcomes.find((x) => x.id === p.id);
  useEffect(() => {
    const points = {};
    svg.current?.querySelectorAll("[data-county]").forEach((path) => {
      const b = path.getBBox();
      points[path.dataset.county] = {
        x: b.x + b.width / 2,
        y: b.y + b.height / 2,
      };
    });
    setCentres(points);
  }, []);
  const hub = centres.nairobi;
  const isImpact = mode === "impact";
  const options = isImpact
    ? ["Learning", "Belonging", "Wellbeing"]
    : ["All", "Active", "Completed", "Planned"];
  const chosenMetric =
    {
      All: "learning",
      Learning: "learning",
      Belonging: "families",
      Wellbeing: "meals",
    }[layer] || "learning";
  const activeCount = isImpact
    ? outcomes.reduce((n, o) => n + o[chosenMetric], 0)
    : projects.filter((x) => layer === "All" || x.status === layer).length;
  const locations = projects.filter(
    (x) => layer === "All" || x.status === layer,
  );
  return (
    <section className={`d-atlas d-atlas-${mode}`} id="discover-kenya">
      <div className="d-atlas-heading">
        <div>
          <Label>
            {isImpact
              ? "AN ATLAS OF EVERYDAY CHANGE"
              : "THE PLACES BEHIND THE STORIES"}
          </Label>
          <h2>
            {isImpact ? "Different places." : "Follow the threads."}
            <br />
            <em>
              {isImpact ? "One human story." : "Discover the possibilities."}
            </em>
          </h2>
        </div>
        <p>
          {isImpact
            ? "Follow the connections between learning, belonging, and wellbeing. Every dot represents a place; every place has people at its heart."
            : "Travel through the map, one county at a time. Discover the work underway, the local priorities, and the next chapters waiting to unfold."}
        </p>
      </div>
      <div className="d-atlas-toolbar">
        <div className="d-pills" aria-label="Map layer">
          {options.map((t) => (
            <button
              key={t}
              className={layer === t ? "selected" : ""}
              aria-pressed={layer === t}
              onClick={() => setLayer(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <span className="d-label">
          {activeCount.toLocaleString()}{" "}
          {isImpact
            ? outcomeTypes[chosenMetric].unit.toUpperCase()
            : "PROJECTS IN VIEW"}
        </span>
      </div>
      <div className="d-atlas-layout">
        <div className="d-atlas-chart">
          <div className="d-atlas-compass">
            <Compass size={34} />
            <Label>N</Label>
          </div>
          <span className="d-atlas-west d-label">KENYA / COUNTY EXPLORER</span>
          <svg
            ref={svg}
            viewBox="-55 -25 565 640"
            role="group"
            aria-label="Kenya county story atlas"
          >
            <defs>
              <pattern
                id={`atlas-hatch-${mode}`}
                width="6"
                height="6"
                patternUnits="userSpaceOnUse"
              >
                <path d="M0 6L6 0" stroke="#e7b6a0" strokeWidth=".8" />
              </pattern>
            </defs>
            <g className="d-atlas-orbits" aria-hidden="true">
              <ellipse cx="220" cy="285" rx="245" ry="170" />
              <ellipse cx="220" cy="285" rx="175" ry="260" />
              <path d="M-20 285H490M220 0V580" />
            </g>
            <g className="d-atlas-county-paths">
              {countyMap.locations.map((c, i) => (
                <path
                  key={c.id}
                  data-county={c.id}
                  d={c.path}
                  role="button"
                  tabIndex="0"
                  aria-label={`${c.name}, ${projects[i].status} project`}
                  aria-pressed={countyId === c.id}
                  className={`${p.id === c.id ? "selected" : ""} ${!isImpact && layer !== "All" && projects[i].status !== layer ? "faded" : ""}`}
                  fill={p.id === c.id ? "#b9392d" : `url(#atlas-hatch-${mode})`}
                  onMouseEnter={() => setHover(c.id)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(c.id)}
                  onBlur={() => setHover(null)}
                  onClick={() => {
                    setCountyId(c.id);
                    setHover(null);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      setCountyId(c.id);
                      setHover(null);
                    }
                  }}
                >
                  <title>{c.name}</title>
                </path>
              ))}
            </g>
            {hub && (
              <g className="d-atlas-connections" aria-hidden="true">
                {[
                  "turkana",
                  "kisumu",
                  "mombasa",
                  "garissa",
                  "nakuru",
                  "marsabit",
                ].map(
                  (id) =>
                    centres[id] && (
                      <path
                        key={id}
                        d={`M${hub.x} ${hub.y} Q${(hub.x + centres[id].x) / 2 + 70} ${(hub.y + centres[id].y) / 2 - 55} ${centres[id].x} ${centres[id].y}`}
                      />
                    ),
                )}
                {projects.map(
                  (x, i) =>
                    centres[x.id] && (
                      <circle
                        key={x.id}
                        cx={centres[x.id].x}
                        cy={centres[x.id].y}
                        r={
                          x.id === p.id
                            ? 8
                            : isImpact
                              ? 2 +
                                (outcomes[i][chosenMetric] /
                                  Math.max(
                                    ...outcomes.map((o) => o[chosenMetric]),
                                  )) *
                                  6
                              : layer === "All" || x.status === layer
                                ? 4
                                : 1.5
                        }
                        className={x.id === p.id ? "selected" : ""}
                      />
                    ),
                )}
              </g>
            )}
            {centres[p.id] && (
              <g
                className="d-atlas-pin"
                aria-hidden="true"
                transform={`translate(${centres[p.id].x} ${centres[p.id].y})`}
              >
                <circle r="14" />
                <path d="M0 -32V-14" />
                <rect x="-58" y="-54" width="116" height="24" rx="12" />
                <text textAnchor="middle" y="-38">
                  {p.county.toUpperCase()}
                </text>
              </g>
            )}
          </svg>
          <div className="d-atlas-key">
            <span>
              <i />
              Community connections
            </span>
            <span>
              <i />
              Selected county
            </span>
          </div>
        </div>
        <aside className="d-atlas-story" aria-live="polite">
          <label htmlFor={`atlas-${mode}`} className="d-label">
            CHOOSE YOUR NEXT STOP
          </label>
          <div className="d-select">
            <select
              id={`atlas-${mode}`}
              aria-label="Find a county"
              value={countyId}
              onChange={(e) => {
                setCountyId(e.target.value);
                setHover(null);
              }}
            >
              {projects.map((x) => (
                <option value={x.id} key={x.id}>
                  {x.county}
                </option>
              ))}
            </select>
            <ChevronDown size={18} />
          </div>
          <Photo
            scene={p.programme === programmeNames[0] ? "together" : "play"}
            className="d-atlas-photo"
          />
          <Label>
            <MapPin size={13} /> {p.county.toUpperCase()} /{" "}
            {isImpact ? "A PLACE TO GROW" : p.status.toUpperCase()}
          </Label>
          <h3>
            {isImpact
              ? {
                  learning: "The freedom to discover.",
                  families: "The comfort of belonging.",
                  meals: "The foundation of wellbeing.",
                }[chosenMetric]
              : p.title}
          </h3>
          {isImpact ? (
            <>
              <strong className="d-atlas-stat">
                {outcome[chosenMetric].toLocaleString()}
              </strong>
              <p>{outcomeTypes[chosenMetric].unit}</p>
            </>
          ) : (
            <>
              <p>{assessment(p)}</p>
              <div className="d-next">
                <Label>THE NEXT CHAPTER</Label>
                <p>{nextAction(p)}</p>
              </div>
              <div className="d-atlas-progress">
                <span style={{ width: `${p.progress}%` }} />
              </div>
              <div className="d-atlas-meta">
                <span>{p.progress}% delivery progress</span>
                <span>{p.children} places</span>
              </div>
              <button className="d-text-link" onClick={() => setDetail(p)}>
                Read the project story <ArrowUpRight size={18} />
              </button>
            </>
          )}
        </aside>
      </div>
      <p className="d-map-credit">
        County geometry: SVG Maps / Mihai Ro · CC BY 4.0. Connections are a
        visual storytelling device.
      </p>
      <ProjectDialog project={detail} onClose={() => setDetail(null)} />
    </section>
  );
}
function ChapterStories() {
  const [chapter, setChapter] = useState(0);
  const stories = [
    [
      "A place to belong.",
      "Care starts with the everyday moments that tell a child: you matter. A listening ear. A welcoming space. Someone who keeps showing up.",
      "care",
    ],
    [
      "A world to discover.",
      "One question can open a door. Learning gives children room to explore, find their voice, and imagine what comes next.",
      "together",
    ],
    [
      "A future to shape.",
      "Opportunity grows through connection. Families, caregivers, and communities help turn a small beginning into lasting possibility.",
      "play",
    ],
  ];
  return (
    <section className="d-chapters d-section">
      <div className="d-chapter-image">
        <Photo scene={stories[chapter][2]} />
        <span className="d-image-caption d-label">
          CHAPTER 0{chapter + 1} / EVERYDAY POSSIBILITIES
        </span>
      </div>
      <div className="d-chapter-copy">
        <Label>EVERY CHILD HAS A STORY</Label>
        <h2>{stories[chapter][0]}</h2>
        <p>{stories[chapter][1]}</p>
        <div className="d-chapter-tabs">
          {stories.map((s, i) => (
            <button
              key={s[0]}
              className={chapter === i ? "selected" : ""}
              aria-pressed={chapter === i}
              aria-label={`Discover ${s[0]}`}
              onClick={() => setChapter(i)}
            >
              0{i + 1}
              <span>{["Belong", "Discover", "Grow"][i]}</span>
            </button>
          ))}
        </div>
        <CTA to="/impact">Discover the difference</CTA>
      </div>
    </section>
  );
}
function Home() {
  return (
    <>
      <Hero
        label="KENYA CHILDREN’S HOMES / A JOURNEY OF CARE"
        title="A world to discover."
        accent="A childhood to cherish."
        description="Every child deserves the space to belong, the freedom to dream, and someone to walk beside them."
      >
        <div className="d-hero-actions">
          <CTA to="/projects" light>
            Follow the story
          </CTA>
          <a className="d-scroll" href="#discover-kenya">
            Explore Kenya
            <ArrowDown size={18} />
          </a>
        </div>
      </Hero>
      <section className="d-intro d-section">
        <Label>GOOD THINGS BEGIN WITH CONNECTION</Label>
        <h2>
          Somewhere between
          <br />a little care and a big dream,
          <br />
          <em>a whole world opens up.</em>
        </h2>
        <div className="d-intro-footer">
          <span className="d-intro-coordinate">UK ↗ KENYA</span>
          <p>
            Based in the United Kingdom, with a heart rooted in Kenya.
            Connecting people, communities, and everyday acts of care with a
            brighter tomorrow.
          </p>
          <Link to="/about" className="d-text-link">
            Meet the people behind the purpose <ArrowUpRight size={20} />
          </Link>
        </div>
      </section>
      <ChapterStories />
      <Atlas />
      <section className="d-photo-invitation">
        <Photo scene="play" />
        <div>
          <Label>BE PART OF SOMETHING THAT GROWS</Label>
          <h2>
            Not just a gift.
            <br />A new beginning.
          </h2>
          <CTA to="/donate" light>
            Help the next chapter unfold
          </CTA>
        </div>
        <Wave />
      </section>
    </>
  );
}
function About() {
  const [step, setStep] = useState("Kenya");
  return (
    <>
      <Hero
        compact
        scene="together"
        label="THE PEOPLE. THE PLACES. THE PURPOSE."
        title="A shared journey."
        accent="A Kenyan heart."
        description="Care connects us across borders. The story begins with people, and the places they call home."
      />
      <section className="d-about-letter d-section">
        <Label>OUR STORY</Label>
        <h2>
          A childhood is made
          <br />
          of a thousand little things.
        </h2>
        <div>
          <p>
            A place to feel safe. A chance to learn. The comfort of being known.
            A future that feels possible. These are the everyday foundations of
            belonging.
          </p>
          <p>
            Kenya Children’s Homes is based in the UK, with its work centred in
            Kenya. The vision behind this website is a connection between
            generous supporters and care that happens close to home.
          </p>
        </div>
      </section>
      <section className="d-bridge d-section">
        <div>
          <Label>CONNECTED BY CARE</Label>
          <h2>
            Across borders.
            <br />
            <em>Close to the heart.</em>
          </h2>
          <p>Explore the two sides of a shared purpose.</p>
          <div className="d-pills">
            {["United Kingdom", "Kenya"].map((t) => (
              <button
                key={t}
                className={step === t ? "selected" : ""}
                aria-pressed={step === t}
                onClick={() => setStep(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="d-bridge-copy" aria-live="polite">
            <h3>
              {step === "Kenya"
                ? "Local care. Lasting connections."
                : "A community of possibility."}
            </h3>
            <p>
              {step === "Kenya"
                ? "Local relationships connect children and families with care, learning, and everyday support."
                : "Supporters, partnerships, and fundraising bring people together around a purpose that crosses borders."}
            </p>
          </div>
        </div>
        <div className="d-route-illustration">
          <svg
            viewBox="0 0 600 440"
            role="img"
            aria-label="Story route between the UK and Kenya"
          >
            <circle cx="300" cy="220" r="180" />
            <ellipse cx="300" cy="220" rx="105" ry="180" />
            <path d="M120 220H480M160 110H440M160 330H440" />
            <path className="d-route-line" d="M200 145Q420 40 390 315" />
            <circle className="d-route-dot" cx="200" cy="145" r="9" />
            <circle className="d-route-dot" cx="390" cy="315" r="9" />
            <text x="125" y="120">
              UNITED KINGDOM
            </text>
            <text x="390" y="350">
              KENYA
            </text>
            <text x="250" y="235" className="d-route-heart">
              ♡
            </text>
          </svg>
          <Label>A SHARED PURPOSE / A WORLD APART</Label>
        </div>
      </section>
      <section className="d-team d-section">
        <div className="d-section-heading">
          <div>
            <Label>THE PEOPLE BEHIND THE CONNECTION</Label>
            <h2>
              Open hearts.
              <br />
              Different perspectives.
            </h2>
          </div>
          <p>
            Local knowledge and support across borders.
            <br />
            One commitment to childhood.
          </p>
        </div>
        <div className="d-team-grid">
          {[
            ["educator", "Community & care", "Kenya"],
            ["coordinator", "Programme coordination", "Kenya"],
            ["support", "Supporter relations", "United Kingdom"],
          ].map(([s, t, p]) => (
            <article key={s}>
              <div
                className={`d-team-portrait ${s}`}
                role="img"
                aria-label={`Editorial role portrait: ${t}`}
              />
              <Label>{p}</Label>
              <h3>{t}</h3>
              <p>
                {s === "educator"
                  ? "Relationships built through listening, everyday care, and family connections."
                  : s === "coordinator"
                    ? "Local knowledge connecting programme plans with community priorities."
                    : "Partnerships, fundraising, and clear communication connecting people with purpose."}
              </p>
            </article>
          ))}
        </div>
        <p className="d-map-credit">
          Editorial role portraits; staff profiles remain to be confirmed.
        </p>
      </section>
      <ChapterStories />
    </>
  );
}
function DeliveryChart() {
  const [stage, setStage] = useState("Active");
  const count = projects.filter((p) => p.status === stage).length;
  const colors = ["#b9392d", "#243b32", "#d9c8b4"];
  let offset = 0;
  return (
    <section className="d-delivery-chart">
      <div>
        <Label>FOLLOW THE DELIVERY JOURNEY</Label>
        <h2>
          From a first step
          <br />
          to a finished chapter.
        </h2>
        <p>
          Projects pass through different stages. Choose a stage to explore what
          each one means.
        </p>
        <div className="d-pills">
          {["Active", "Completed", "Planned"].map((t) => (
            <button
              key={t}
              aria-pressed={stage === t}
              className={stage === t ? "selected" : ""}
              onClick={() => setStage(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="d-donut-wrap">
        <svg
          viewBox="0 0 260 260"
          role="img"
          aria-label={`${totals.active} active, ${totals.completed} completed, ${totals.planned} planned projects`}
        >
          {["Active", "Completed", "Planned"].map((s, i) => {
            const n = projects.filter((p) => p.status === s).length;
            const portion = (n / 47) * 100;
            const current = offset;
            offset += portion;
            return (
              <circle
                key={s}
                cx="130"
                cy="130"
                r="100"
                pathLength="100"
                fill="none"
                stroke={colors[i]}
                strokeWidth={stage === s ? 21 : 12}
                strokeDasharray={`${portion - 1.5} ${100 - portion + 1.5}`}
                strokeDashoffset={-current}
                transform="rotate(-90 130 130)"
              />
            );
          })}
        </svg>
        <div>
          <strong>{count}</strong>
          <span>{stage} projects</span>
        </div>
      </div>
      <div className="d-stage-story" aria-live="polite">
        <Label>{stage.toUpperCase()} / THE CURRENT CHAPTER</Label>
        <h3>
          {stage === "Active"
            ? "Care in motion."
            : stage === "Completed"
              ? "A milestone, not an ending."
              : "Possibilities taking shape."}
        </h3>
        <p>
          {stage === "Active"
            ? "Local delivery is underway. Teams review participation, resources, and the next milestone."
            : stage === "Completed"
              ? "Delivery milestones are complete. Follow-up visits and community feedback guide what comes next."
              : "Community priorities are identified. Partners, funding, and delivery dates need to be confirmed."}
        </p>
      </div>
    </section>
  );
}
function Projects() {
  const [status, setStatus] = useState("All");
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState(null);
  const filtered = projects.filter(
    (p) =>
      (status === "All" || status === p.status) &&
      `${p.county} ${p.title}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <Hero
        compact
        scene="journey"
        label="EXPLORE THE PLACES / FOLLOW THE PROGRESS"
        title="Every place."
        accent="A new chapter."
        description="Discover the programmes taking shape, the milestones already reached, and the possibilities still ahead."
      />
      <div className="d-section">
        <DeliveryChart />
      </div>
      <Atlas mode="projects" />
      <section className="d-project-directory d-section">
        <div className="d-section-heading">
          <div>
            <Label>THE PROJECT JOURNAL</Label>
            <h2>Stories in the making.</h2>
          </div>
          <span className="d-label">{filtered.length} PROJECTS</span>
        </div>
        <div className="d-journal-filters">
          <div className="d-pills">
            {["All", "Active", "Completed", "Planned"].map((s) => (
              <button
                className={status === s ? "selected" : ""}
                aria-pressed={status === s}
                onClick={() => setStatus(s)}
                key={s}
              >
                {s}
              </button>
            ))}
          </div>
          <input
            aria-label="Search projects or counties"
            placeholder="Search a place or project"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="d-project-journal">
          {filtered.map((p, i) => (
            <button
              className="d-journal-row"
              key={p.id}
              onClick={() => setDetail(p)}
            >
              <span className="d-label">{String(i + 1).padStart(2, "0")}</span>
              <span className="d-journal-title">
                <strong>{p.title}</strong>
                <span>
                  <MapPin size={13} />
                  {p.county}
                </span>
              </span>
              <span className={`d-stage ${p.status.toLowerCase()}`}>
                {p.status}
              </span>
              <span className="d-row-progress">
                <i style={{ width: `${p.progress}%` }} />
              </span>
              <span className="d-row-percent">{p.progress}%</span>
              <ArrowUpRight size={22} />
            </button>
          ))}
        </div>
        {!filtered.length && (
          <div className="d-empty">
            <h3>No projects match.</h3>
            <button
              className="d-text-link"
              onClick={() => {
                setQuery("");
                setStatus("All");
              }}
            >
              Reset your search <ArrowRight size={18} />
            </button>
          </div>
        )}
      </section>
      <ProjectDialog project={detail} onClose={() => setDetail(null)} />
    </>
  );
}
function OutcomeRiver() {
  const [metric, setMetric] = useState("learning");
  const [year, setYear] = useState("2026");
  const keys = Object.keys(outcomeTypes);
  const factor = { 2024: 0.62, 2025: 0.81, 2026: 1 }[year];
  const total = Math.round(
    outcomes.reduce((n, o) => n + o[metric], 0) * factor,
  );
  return (
    <section className="d-outcome-river d-section">
      <div className="d-section-heading">
        <div>
          <Label>THE DIFFERENCE IN EVERYDAY LIFE</Label>
          <h2>
            Change has
            <br />
            <em>a human shape.</em>
          </h2>
        </div>
        <label className="d-year-label">
          Reporting year
          <select
            aria-label="Impact reporting year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {["2024", "2025", "2026"].map((y) => (
              <option key={y}>{y}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="d-river-layout">
        <div className="d-river-controls">
          <div className="d-outcome-tabs">
            {keys.map((k, i) => {
              const Icon = [BookOpen, Heart, Sprout][i];
              return (
                <button
                  key={k}
                  className={metric === k ? "selected" : ""}
                  aria-pressed={metric === k}
                  onClick={() => setMetric(k)}
                >
                  <Icon size={24} />
                  {outcomeTypes[k].label}
                  <ArrowUpRight size={18} />
                </button>
              );
            })}
          </div>
          <strong className="d-river-total">{total.toLocaleString()}</strong>
          <p>{outcomeTypes[metric].unit}</p>
        </div>
        <div className="d-river-visual">
          <svg
            viewBox="0 0 700 260"
            role="img"
            aria-label={`${outcomeTypes[metric].label} growth from 2024 to 2026`}
          >
            <defs>
              <linearGradient id="riverFill" x1="0" x2="1">
                <stop stopColor="#f1d2bf" />
                <stop offset="1" stopColor="#b9392d" />
              </linearGradient>
            </defs>
            {[0, 1, 2].map((i) => (
              <path
                key={i}
                d={`M20 ${215 - i * 40} C180 ${215 - i * 30} 220 ${160 - i * 30} 360 ${165 - i * 35} S520 ${115 - i * 30} 680 ${80 - i * 30} L680 ${115 - i * 25} C540 ${150 - i * 25} 500 ${195 - i * 25} 360 ${195 - i * 25} S180 ${255 - i * 25} 20 ${245 - i * 25}Z`}
                fill="url(#riverFill)"
                opacity={0.35 + i * 0.25}
              />
            ))}
            {[
              [20, 202],
              [350, 138],
              [680, 65],
            ].map(([x, y], i) => (
              <g key={i}>
                <line
                  x1={x}
                  x2={x}
                  y1="0"
                  y2="260"
                  stroke="#e2d6c7"
                  strokeDasharray="3 5"
                />
                <circle
                  cx={x}
                  cy={y}
                  r={Number(year) === 2024 + i ? 8 : 4}
                  fill="#b9392d"
                />
              </g>
            ))}
          </svg>
          <div className="d-river-years">
            {["2024", "2025", "2026"].map((y, i) => (
              <button
                key={y}
                onClick={() => setYear(y)}
                aria-pressed={year === y}
                className={year === y ? "selected" : ""}
              >
                {y}
                <span>
                  {Math.round(
                    outcomes.reduce((n, o) => n + o[metric], 0) *
                      [0.62, 0.81, 1][i],
                  ).toLocaleString()}
                </span>
              </button>
            ))}
          </div>
          <p className="d-river-caption">
            Learning, belonging, and wellbeing are connected threads—not
            isolated numbers.
          </p>
        </div>
      </div>
    </section>
  );
}
function Impact() {
  return (
    <>
      <Hero
        compact
        scene="together"
        label="BEHIND THE NUMBERS / A WORLD OF SMALL MOMENTS"
        title="The little things."
        accent="The lasting difference."
        description="A question asked with confidence. A shared meal. A place to belong. Discover the everyday shape of a brighter tomorrow."
      />
      <OutcomeRiver />
      <ChapterStories />
      <Atlas mode="impact" />
      <section className="d-impact-reflection d-section">
        <Label>WHAT WE HOPE TO SEE</Label>
        <h2>
          More curiosity.
          <br />
          Stronger connections.
          <br />
          <em>A childhood full of possibility.</em>
        </h2>
        <p>
          Progress is worth counting. The lives, relationships, and moments
          behind it are worth understanding.
        </p>
        <CTA to="/donate">Help create the next moment</CTA>
      </section>
    </>
  );
}
function Donate() {
  const [amount, setAmount] = useState(1500);
  const [frequency, setFrequency] = useState("Once");
  const [method, setMethod] = useState("M-Pesa");
  const [focus, setFocus] = useState("Learning");
  const [message, setMessage] = useState("");
  const [stage, setStage] = useState(0);
  const journey = [
    ["Your decision", "A gift begins with a choice to care."],
    [
      "Payment confirmation",
      "A future payment provider confirms the gift through M-Pesa or card.",
    ],
    [
      "Programme planning",
      "Local priorities guide how available programme resources are assigned.",
    ],
    [
      "Everyday care",
      "Teams turn resources into learning, family connections, and wellbeing support.",
    ],
  ];
  return (
    <>
      <Hero
        compact
        scene="play"
        label="GIVE A LITTLE GOOD / START A NEW CHAPTER"
        title="A gift is a beginning."
        accent="See where it can go."
        description="Choose the possibility you want to help create. Follow the journey from a generous decision to everyday care."
      />
      <section className="d-giving d-section">
        <div className="d-giving-intro">
          <Label>WHAT DOES POSSIBILITY LOOK LIKE TO YOU?</Label>
          <h2>
            Choose a thread.
            <br />
            <em>Help the story grow.</em>
          </h2>
          <p>
            Discover the kinds of care a gift can help make possible. This
            choice explores a giving theme; it does not earmark funds or
            guarantee an outcome.
          </p>
        </div>
        <div className="d-giving-themes">
          {[
            ["Learning", "together", "A world to discover.", BookOpen],
            ["Belonging", "care", "Someone by their side.", Heart],
            ["Wellbeing", "play", "Room to play and grow.", Sprout],
          ].map(([t, s, d, Icon]) => (
            <button
              key={t}
              className={focus === t ? "selected" : ""}
              onClick={() => setFocus(t)}
              aria-pressed={focus === t}
            >
              <Photo scene={s} />
              <span>
                <Icon size={22} />
                <span>
                  <strong>{t}</strong>
                  {d}
                </span>
                <span className="d-theme-check">
                  {focus === t ? (
                    <Check size={16} />
                  ) : (
                    <ArrowUpRight size={16} />
                  )}
                </span>
              </span>
            </button>
          ))}
        </div>
        <div className="d-giving-station">
          <div className="d-giving-photo">
            <Photo
              scene={
                focus === "Learning"
                  ? "together"
                  : focus === "Belonging"
                    ? "care"
                    : "play"
              }
            />
            <div>
              <Label>YOUR CHOSEN THREAD / {focus.toUpperCase()}</Label>
              <h3>
                {focus === "Learning"
                  ? "A question today. A possibility tomorrow."
                  : focus === "Belonging"
                    ? "A little care. A place to belong."
                    : "Healthy beginnings. Happier days."}
              </h3>
              <p>One act of generosity can be part of a much bigger story.</p>
            </div>
          </div>
          <form
            className="d-giving-form"
            onSubmit={(e) => {
              e.preventDefault();
              setMessage(
                "Thank you for exploring this giving journey. No payment was taken. M-Pesa and card checkout will be connected before launch.",
              );
            }}
          >
            <div className="d-form-heading">
              <Label>YOUR ACT OF CARE</Label>
              <Heart size={24} />
            </div>
            <h2>Begin with a gift.</h2>
            <div className="d-pills d-gift-frequency">
              {["Once", "Monthly"].map((f) => (
                <button
                  type="button"
                  key={f}
                  aria-pressed={frequency === f}
                  className={frequency === f ? "selected" : ""}
                  onClick={() => {
                    setFrequency(f);
                    setMessage("");
                  }}
                >
                  {f === "Once" ? "Give once" : "Give monthly"}
                </button>
              ))}
            </div>
            <label>
              Choose an amount <span>KES</span>
            </label>
            <div className="d-gift-amounts">
              {[500, 1500, 3000, 5000].map((a) => (
                <button
                  type="button"
                  key={a}
                  aria-pressed={Number(amount) === a}
                  className={Number(amount) === a ? "selected" : ""}
                  onClick={() => {
                    setAmount(a);
                    setMessage("");
                  }}
                >
                  {a.toLocaleString()}
                </button>
              ))}
            </div>
            <label htmlFor="d-amount">Or choose your own amount</label>
            <input
              id="d-amount"
              aria-label="Custom donation amount in Kenyan shillings"
              type="number"
              min="100"
              max="1000000"
              required
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setMessage("");
              }}
            />
            <fieldset>
              <legend>How would you like to give?</legend>
              <div className="d-payment-options">
                {["M-Pesa", "Card"].map((m) => (
                  <button
                    type="button"
                    key={m}
                    aria-pressed={method === m}
                    className={method === m ? "selected" : ""}
                    onClick={() => {
                      setMethod(m);
                      setMessage("");
                    }}
                  >
                    {m === "M-Pesa" ? (
                      <Smartphone size={18} />
                    ) : (
                      <CreditCard size={18} />
                    )}{" "}
                    {m}
                    {method === m && <Check size={16} />}
                  </button>
                ))}
              </div>
            </fieldset>
            <label htmlFor="d-email">Email address</label>
            <input
              id="d-email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
            {method === "M-Pesa" && (
              <>
                <label htmlFor="d-phone">M-Pesa phone number</label>
                <input
                  id="d-phone"
                  type="tel"
                  required
                  pattern="(\+?254|0)[17][0-9]{8}"
                  autoComplete="tel"
                  placeholder="0712345678"
                />
                <span className="d-input-hint">
                  Use 07…, 01…, or +254… without spaces.
                </span>
              </>
            )}
            <button type="submit" className="d-cta d-submit">
              Preview KES {Number(amount || 0).toLocaleString()}{" "}
              {frequency === "Monthly" ? "monthly gift" : "gift"}
              <ArrowUpRight size={20} />
            </button>
            <p className="d-payment-note">
              <ShieldCheck size={15} />
              Payment gateway not connected
            </p>
            {message && (
              <p role="status" className="d-gift-message">
                {message}
              </p>
            )}
            <p className="d-form-privacy">
              This concept does not store or submit your details. Use example
              details to explore.
            </p>
          </form>
        </div>
      </section>
      <section className="d-gift-route d-section">
        <div className="d-section-heading">
          <div>
            <Label>FOLLOW THE GIFT</Label>
            <h2>
              A journey of care.
              <br />
              <em>One step at a time.</em>
            </h2>
          </div>
          <p>
            A proposed giving process,
            <br />
            rather than a live payment tracker.
          </p>
        </div>
        <div className="d-gift-steps">
          {journey.map(([t, d], i) => (
            <button
              key={t}
              aria-pressed={stage === i}
              className={stage === i ? "selected" : ""}
              onClick={() => setStage(i)}
            >
              <span>0{i + 1}</span>
              <strong>{t}</strong>
              <ArrowRight size={20} />
            </button>
          ))}
        </div>
        <div className="d-gift-route-detail" aria-live="polite">
          <span className="d-route-number">0{stage + 1}</span>
          <div>
            <h3>{journey[stage][0]}</h3>
            <p>{journey[stage][1]}</p>
            <button
              className="d-text-link"
              onClick={() => setStage((stage + 1) % 4)}
            >
              {stage === 3 ? "Back to the beginning" : "Follow the next step"}
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
        <p className="d-map-credit">
          Provider fees and allocation arrangements will be confirmed before
          launch.
        </p>
      </section>
    </>
  );
}
export default function DiscoveryApp() {
  const [path, setPath] = useState(location.pathname.replace(/\/$/, "") || "/");
  useEffect(() => {
    const fn = () => setPath(location.pathname.replace(/\/$/, "") || "/");
    window.addEventListener("popstate", fn);
    return () => window.removeEventListener("popstate", fn);
  }, []);
  useEffect(() => {
    document.title = `${routes[path] || "Not found"} — Kenya Children’s Homes / Discovery`;
    document.querySelector("main")?.focus({ preventScroll: true });
  }, [path]);
  return (
    <>
      <a href="#main" className="d-skip">
        Skip to content
      </a>
      <Header path={path} />
      <main id="main" tabIndex="-1">
        {path === "/" ? (
          <Home />
        ) : path === "/about" ? (
          <About />
        ) : path === "/projects" ? (
          <Projects />
        ) : path === "/impact" ? (
          <Impact />
        ) : path === "/donate" ? (
          <Donate />
        ) : (
          <section className="d-section">
            <h1>A different path.</h1>
            <CTA to="/">Return home</CTA>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
