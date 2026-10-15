import React, { useState, useEffect, useRef, useReducer } from "react";
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
  countyProgrammes,
  programmesForCounty,
  followUps,
  exampleBudget,
  cashRequired,
  exampleLabel,
  exampleUpdate,
} from "./data";
import { initialPayment, paymentReducer } from "./payment";
const images = {
  editorial: "/images/editorial-children.png",
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
          if (location.hash)
            requestAnimationFrame(() =>
              document.getElementById(location.hash.slice(1))?.scrollIntoView(),
            );
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
        DESIGN 03 · PRESENTATION CONCEPT · PUBLISHED DESCRIPTIONS / ILLUSTRATIVE
        IMAGERY & EXAMPLES / PAYMENTS NOT LIVE
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
  scene = "editorial",
  compact = false,
  children,
}) {
  const image = scene === "journey" ? "editorial" : scene;
  return (
    <section className={`e-hero ${compact ? "e-hero-compact" : ""}`}>
      <div className="e-hero-copy">
        <Label>{label}</Label>
        <h1>
          {title}
          <br />
          <span>{accent}</span>
        </h1>
        <p>{description}</p>
        {children}
      </div>
      <div className="e-hero-art">
        <span className="e-brush e-brush-one" />
        <span className="e-brush e-brush-two" />
        {compact ? (
          <svg
            className="e-kenya-cutout"
            viewBox="0 0 458 580"
            role="img"
            aria-label="Kenyan care imagery framed within the outline of Kenya"
          >
            <defs>
              <clipPath id="kenya-photo-mask">
                {countyMap.locations.map((c) => (
                  <path d={c.path} key={c.id} />
                ))}
              </clipPath>
            </defs>
            <image
              href={images[image]}
              width="458"
              height="580"
              preserveAspectRatio="xMidYMid slice"
              clipPath="url(#kenya-photo-mask)"
            />
          </svg>
        ) : (
          <div
            className="e-photo-stripes"
            role="img"
            aria-label="Created portrait of joyful Kenyan children with an educator, composed in diagonal photographic strips"
          >
            {[0, 1, 2].map((i) => (
              <div
                className={`e-photo-stripe stripe-${i}`}
                key={i}
                style={{ backgroundImage: `url(${images.editorial})` }}
              />
            ))}
          </div>
        )}
        <span className="e-spark">✦</span>
        <div
          className={`e-hero-stamp ${compact ? "e-kenyan-stamp" : "e-established-stamp"}`}
        >
          <strong>{compact ? "KE" : "1961"}</strong>
          <span>{compact ? "KENYAN-LED" : "ESTABLISHED"}</span>
        </div>
        <span className="e-photo-note d-label">
          BIG DREAMS / LITTLE BEGINNINGS
        </span>
      </div>
    </section>
  );
}
function EditorialNumbers() {
  return (
    <section className="e-numbers">
      <div>
        <Label>01 / BELONGING</Label>
        <strong>Care.</strong>
        <p>Family-based care and continuing Butterfly support.</p>
      </div>
      <div>
        <Label>02 / OPPORTUNITY</Label>
        <strong>Learn.</strong>
        <p>Education through Kibera Sponsorship and Jonathan Gloag Academy.</p>
      </div>
      <div>
        <Label>03 / TOMORROW</Label>
        <strong>Grow.</strong>
        <p>Protection at Soila. Follow-up that keeps family needs in view.</p>
      </div>
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
          <Link to="/impact#reports">
            Reports &amp; financials <ArrowUpRight size={14} />
          </Link>
          {Object.entries(routes).map(([p, t]) => (
            <Link key={p} to={p}>
              {t}
              <ArrowUpRight size={14} />
            </Link>
          ))}
        </div>
        <div className="e-footer-contact">
          <a href="https://kch.co.ke/" target="_blank" rel="noreferrer">
            The organisation’s current website <ArrowUpRight size={15} />
          </a>
          <a href="mailto:fundraising@kch.co.ke">
            Giving help &amp; enquiries <ArrowUpRight size={15} />
          </a>
        </div>
      </div>
      <div className="d-footer-bottom">
        <span>
          © {new Date().getFullYear()} Kenya Children’s Homes · Design concept
        </span>
        <span>KENYAN LEADERSHIP / A HISTORY OF CARE</span>
      </div>
    </footer>
  );
}
function FundingExample() {
  return (
    <div className="d-funding-example">
      <p className="d-example-label">{exampleLabel}</p>
      <p>
        One support period:{" "}
        <strong>KES {exampleBudget.required.toLocaleString()}</strong> budget;{" "}
        <strong>KES {exampleBudget.confirmed.toLocaleString()}</strong>{" "}
        confirmed contributions.
      </p>
      <div
        className="d-funding-bar"
        role="img"
        aria-label="KES 80,000 confirmed of KES 120,000 example budget"
      >
        <span
          style={{
            width: `${(exampleBudget.confirmed / exampleBudget.required) * 100}%`,
          }}
        />
      </div>
      <p>
        <strong>
          KES {cashRequired(exampleBudget).toLocaleString()} cash still required
        </strong>
        , of which KES {exampleBudget.pledged.toLocaleString()} is pledged.
        Pledges are not received funds.
      </p>
    </div>
  );
}
function ProjectDialog({ project: p, onClose }) {
  const close = useRef(null);
  useEffect(() => {
    if (!p) return;
    const previous = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    close.current?.focus();
    const fn = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", fn);
    return () => {
      document.removeEventListener("keydown", fn);
      document.body.style.overflow = oldOverflow;
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
            const nodes = [
              ...e.currentTarget.querySelectorAll("button,a,summary"),
            ];
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
        <p className="d-programme-measure">{p.measure}</p>
        <Label>
          {p.id === "butterfly"
            ? "AUGUST 2025 / BUTTERFLY CAMP"
            : "SOURCE NOTE / 15 OCTOBER 2026"}
        </Label>
        <p>
          {p.update}{" "}
          {p.updateSource && (
            <a className="d-inline-link" href={p.updateSource}>
              Read KCH’s dated account ↗
            </a>
          )}
        </p>
        {p.id === "butterfly" && (
          <>
            <p className="d-example-label">{exampleLabel}</p>
            <p>{exampleUpdate}</p>
            <FundingExample />
          </>
        )}
        <details className="d-evidence-note">
          <summary>Sources, periods &amp; example method</summary>
          <p>
            Based on the supplied source brief reviewed 15 October 2026. Live
            retrieval was unavailable; the review date is not a reporting
            period. Claims await KCH clarification and republication approval.
            Counts with different scope and periods are not added.{" "}
            <a href={p.source}>KCH programme description ↗</a>.
          </p>
          {p.id === "butterfly" && (
            <p>
              Fictional support periods A/B/C: 21/30, 24/30 and 27/30
              completed/scheduled follow-ups. Both academic-progress and welfare
              checks must be recorded and reviewed by a coordinator to count as
              completed. These are delivery observations, not wellbeing results.
              Budget minus confirmed contributions gives remaining cash need;
              pledges stay inside that need.
            </p>
          )}
        </details>
        <CTA to={`/donate?programme=${p.id}`}>Help the next chapter unfold</CTA>
        <p className="d-input-hint">
          Programme interest is carried forward, without promising restricted
          allocation.
        </p>
      </section>
    </div>
  );
}

function Atlas({ mode = "discovery" }) {
  const [countyId, setCountyId] = useState("nairobi");
  const [hover, setHover] = useState(null);
  const [programmeId, setProgrammeId] = useState("kibera");
  const [centres, setCentres] = useState({});
  const [detail, setDetail] = useState(null);
  const svg = useRef(null);
  const county = countyMap.locations.find((c) => c.id === (hover || countyId));
  const records = programmesForCounty(county.id);
  const p = records.find((p) => p.id === programmeId) || records[0];
  const publishedCounties = countyMap.locations.filter(
    (c) => countyProgrammes[c.id].length > 0,
  );
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
  const isImpact = mode === "impact";
  function select(id) {
    setCountyId(id);
    setHover(null);
    setProgrammeId(programmesForCounty(id)[0]?.id || "");
  }
  return (
    <section className={`d-atlas d-atlas-${mode}`} id="discover-kenya">
      <div className="d-atlas-heading">
        <div>
          <Label>
            {isImpact
              ? "THE PLACES BEHIND THE WORK"
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
          Explore published programme locations in Nairobi and Narok. County
          outlines show geography, not nationwide coverage; other programme
          locations still need clarification.
        </p>
      </div>
      <div className="d-atlas-toolbar">
        <div className="d-pills" aria-label="Published county locations">
          {publishedCounties.map((c) => (
            <button
              key={c.id}
              className={countyId === c.id ? "selected" : ""}
              aria-pressed={countyId === c.id}
              onClick={() => select(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>
        <span className="d-label">PUBLISHED LOCATIONS / COUNTY LEVEL</span>
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
            aria-label="Kenya county programme atlas"
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
              {countyMap.locations.map((c) => {
                const known = countyProgrammes[c.id].length > 0;
                return (
                  <path
                    key={c.id}
                    data-county={c.id}
                    d={c.path}
                    role="button"
                    tabIndex="0"
                    aria-label={`${c.name}, ${known ? "published programme locations" : "no published programme record"}`}
                    aria-pressed={countyId === c.id}
                    className={`${known ? "published" : "neutral"} ${county.id === c.id && known ? "selected" : ""}`}
                    fill={
                      county.id === c.id && known
                        ? "#b9392d"
                        : known
                          ? `url(#atlas-hatch-${mode})`
                          : "#dde1d1"
                    }
                    onMouseEnter={() => setHover(c.id)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(c.id)}
                    onBlur={() => setHover(null)}
                    onClick={() => select(c.id)}
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter") {
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
            </g>
            <g className="d-atlas-connections" aria-hidden="true">
              {publishedCounties.map(
                (c) =>
                  centres[c.id] && (
                    <circle
                      key={c.id}
                      data-location={c.id}
                      cx={centres[c.id].x}
                      cy={centres[c.id].y}
                      r={c.id === county.id ? 8 : 4}
                      className={c.id === county.id ? "selected" : ""}
                    />
                  ),
              )}
            </g>
            {centres[county.id] && (
              <g
                className="d-atlas-pin"
                aria-hidden="true"
                transform={`translate(${centres[county.id].x} ${centres[county.id].y})`}
              >
                <circle r="14" />
                <path d="M0 -32V-14" />
                <rect x="-58" y="-54" width="116" height="24" rx="12" />
                <text textAnchor="middle" y="-38">
                  {county.name.toUpperCase()}
                </text>
              </g>
            )}
          </svg>
          <div className="d-atlas-key">
            <span>
              <i />
              Published location
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
              onChange={(e) => select(e.target.value)}
            >
              {countyMap.locations.map((c) => (
                <option value={c.id} key={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <ChevronDown size={18} />
          </div>
          {records.length > 1 && (
            <>
              <label htmlFor={`programme-${mode}`} className="d-label">
                CHOOSE A PROGRAMME
              </label>
              <div className="d-select">
                <select
                  id={`programme-${mode}`}
                  aria-label="Choose a programme"
                  value={p.id}
                  onChange={(e) => setProgrammeId(e.target.value)}
                >
                  {records.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.title}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} />
              </div>
            </>
          )}
          <Photo
            scene={p?.id === "soila" ? "play" : p ? "together" : "journey"}
            className="d-atlas-photo"
          />
          <Label>
            <MapPin size={13} />
            {county.name.toUpperCase()} /{" "}
            {p ? "ONGOING PROGRAMME" : "LOCATION CONTEXT"}
          </Label>
          <h3>{p ? p.title : "No programme information published here"}</h3>
          <p>
            {p
              ? p.description
              : "This does not mean there is no need, or that KCH does not operate here."}
          </p>
          {p && (
            <>
              <div className="d-next">
                <Label>REPORTING CONTEXT</Label>
                <p>{p.measure}</p>
              </div>
              <button className="d-text-link" onClick={() => setDetail(p)}>
                Read the programme story <ArrowUpRight size={18} />
              </button>
            </>
          )}
          <p className="d-art-note">
            Illustrative artwork, not a photograph of this programme.
          </p>
        </aside>
      </div>
      <p className="d-map-credit">
        County geometry: SVG Maps / Mihai Ro · CC BY 4.0. Markers locate
        published counties, not individual sites or addresses. The pin marks
        county selection; contours are decorative.
      </p>
      <ProjectDialog project={detail} onClose={() => setDetail(null)} />
    </section>
  );
}

function ChapterStories({ example = false }) {
  const [chapter, setChapter] = useState(0);
  const stories = [
    [
      "A place to belong.",
      "KCH’s August 2025 Butterfly camp account describes academic-progress and welfare checks. It offers a moment to ask what follow-up support families need, without claiming measured outcomes.",
      "care",
    ],
    [
      "A world to discover.",
      "Jonathan Gloag Academy opened in Nairobi in 2002, serving KCH-connected children and local fee-paying pupils. Enrolment is not a count of charity beneficiaries.",
      "together",
    ],
    [
      "A future to shape.",
      "Soila, established in Suswa, Narok in 2005, supports protection and education for girls at risk of FGM and early marriage, including support beyond the centre.",
      "play",
    ],
  ];
  return (
    <section className="d-chapters d-section">
      <div className="d-chapter-image">
        <div className="e-collage-main">
          <Photo scene={stories[chapter][2]} />
        </div>
        <div className="e-collage-small">
          <Photo scene="play" />
        </div>
        <div className="e-collage-round">
          <Photo scene="together" />
        </div>
        <span className="d-image-caption d-label">
          CHAPTER 0{chapter + 1} / ILLUSTRATIVE ARTWORK
        </span>
      </div>
      <div className="d-chapter-copy">
        <Label>EVERY CHILD HAS A STORY</Label>
        <h2>{stories[chapter][0]}</h2>
        <p>{example && chapter === 0 ? exampleUpdate : stories[chapter][1]}</p>
        {chapter === 0 &&
          (example ? (
            <>
              <p className="d-example-label">{exampleLabel}</p>
              <details className="d-evidence-note">
                <summary>A funding need in this example</summary>
                <FundingExample />
              </details>
            </>
          ) : (
            <>
              <Label>AUGUST 2025 / PUBLISHED ACTIVITY</Label>
              <p className="d-source-line">
                <a href="https://kch.co.ke/news/butterfly-childrens-camp/">
                  Read KCH’s camp account ↗
                </a>
              </p>
            </>
          ))}
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
        <CTA to={`/donate?programme=${["butterfly", "jga", "soila"][chapter]}`}>
          Support the next chapter
        </CTA>
      </div>
    </section>
  );
}
function Home() {
  return (
    <>
      <Hero
        label="KENYA CHILDREN’S HOMES / EVERY CHILD. EVERY POSSIBILITY."
        title="Little lives."
        accent="Limitless futures."
        description="A childhood full of care. A world full of opportunity. Help write a brighter next chapter."
      >
        <div className="d-hero-actions">
          <CTA to="/donate">Make a little good happen</CTA>
          <Link to="/projects" className="d-text-link">
            Discover our work <ArrowUpRight size={20} />
          </Link>
        </div>
      </Hero>
      <EditorialNumbers />
      <section className="e-manifesto d-section">
        <Label>A HOME IS MORE THAN FOUR WALLS</Label>
        <h2>
          It’s a feeling.
          <br />A beginning.
          <br />
          <em>A world opening up.</em>
        </h2>
        <p>
          KCH connects education, sponsorship, reintegration and family support.
          Its published account describes Kenyan Board leadership following
          handover at the end of 2025.
        </p>
      </section>
      <ChapterStories />
      <Atlas />
      <section className="e-action d-section">
        <Label>THERE IS A PLACE FOR YOU IN THIS STORY</Label>
        <h2>
          Small acts.
          <br />
          <span>Extraordinary possibilities.</span>
        </h2>
        <CTA to="/donate" light>
          Help the next chapter unfold
        </CTA>
        <Photo scene="together" />
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
            Founded in 1961 as Thomas Barnardo House, KCH now emphasises
            education, sponsorship, reintegration and family support. Its
            published account describes Kenyan Board leadership after handover
            at the end of 2025.{" "}
            <a className="d-inline-link" href="https://kch.co.ke/about/">
              Read KCH’s history ↗
            </a>
            .
          </p>
        </div>
      </section>
      <section className="d-bridge d-section">
        <div>
          <Label>HISTORICAL CONNECTIONS</Label>
          <h2>
            Across borders.
            <br />
            <em>Close to the heart.</em>
          </h2>
          <p>
            A symbolic historical UK–Kenya partnership story, not a verified
            current support structure.
          </p>
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
                : "A historical partnership."}
            </h3>
            <p>
              {step === "Kenya"
                ? "Local relationships connect children and families with care, learning, and everyday support."
                : "UK connections form part of KCH’s history. This illustration does not establish current partners, funding routes or a UK operating base."}
            </p>
          </div>
        </div>
        <div className="d-route-illustration">
          <svg
            viewBox="0 0 600 440"
            role="img"
            aria-label="Symbolic historical partnership between the UK and Kenya"
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
          <Label>HISTORICAL PARTNERSHIP / SYMBOLIC ILLUSTRATION</Label>
        </div>
      </section>
      <section className="d-team d-section">
        <div className="d-section-heading">
          <div>
            <Label>THE ROLES BEHIND THE WORK</Label>
            <h2>
              Open hearts.
              <br />
              Different perspectives.
            </h2>
          </div>
          <p>
            Role explanations, not current staff profiles.
            <br />
            One commitment to childhood.
          </p>
        </div>
        <div className="d-team-grid">
          {[
            ["educator", "Community & care", "Illustrative role"],
            ["coordinator", "Programme coordination", "Illustrative role"],
            ["support", "Supporter relations", "Illustrative role"],
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
          Illustrative role portraits, not KCH staff. Approved profiles were not
          supplied.
        </p>
      </section>
      <ChapterStories />
    </>
  );
}
function DeliveryChart() {
  const [stage, setStage] = useState("Completed");
  const record = followUps.find((r) => r.period === "C");
  const outstanding = record.scheduled - record.completed;
  const count = stage === "Completed" ? record.completed : outstanding;
  return (
    <section className="d-delivery-chart e-waffle-chart">
      <div>
        <Label>THE FOLLOW-UP BOARD / EXAMPLE PERIOD C</Label>
        <h2>
          Big plans.
          <br />
          Visible progress.
        </h2>
        <p className="e-example-label">{exampleLabel}</p>
        <p>
          Each square is one of {record.scheduled} scheduled follow-ups:{" "}
          {record.completed} completed and {outstanding} outstanding. This is
          fictional delivery, not KCH programmes or programme completion.
        </p>
        <div className="d-pills">
          {["Completed", "Outstanding"].map((t) => (
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
      <div className="e-delivery-board">
        <div
          className="e-waffle"
          role="img"
          aria-label={`Illustrative example, not KCH results: period C, ${record.scheduled} scheduled follow-ups, ${record.completed} completed and ${outstanding} outstanding. Each tile represents one scheduled follow-up.`}
        >
          {Array.from({ length: record.scheduled }, (_, i) => {
            const kind = i < record.completed ? "completed" : "outstanding";
            return (
              <span
                key={i}
                data-kind={kind}
                className={`${kind} ${kind === stage.toLowerCase() ? "chosen" : ""}`}
                title={`Example follow-up ${i + 1}: ${kind}`}
              />
            );
          })}
        </div>
        <p className="e-waffle-legend">
          <span>
            <i className="completed" />
            {record.completed} completed
          </span>
          <span>
            <i className="outstanding" />
            {outstanding} outstanding
          </span>
        </p>
      </div>
      <div className="d-stage-story" aria-live="polite">
        <strong className="d-stage-count">{count}</strong>
        <Label>{stage.toUpperCase()} FOLLOW-UPS / C</Label>
        <h3>A check, then a response.</h3>
        <p>
          {stage === "Completed"
            ? "Completed means both academic-progress and welfare checks have been recorded and reviewed by a coordinator."
            : "Outstanding means a scheduled follow-up has not met the example completion definition. It does not describe a planned KCH project."}
        </p>
        <p>
          These are fictional counts, not evidence of improved child wellbeing.
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
        description="Discover KCH’s published programmes in education, family support, protection and mission sustainability, with reporting context and honest information gaps."
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
          <span className="d-label">{filtered.length} PROGRAMME RECORDS</span>
        </div>
        <div className="d-journal-filters">
          <div className="d-pills">
            {["All", "Ongoing"].map((s) => (
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
              <span className="d-row-descriptor">
                {p.since ? `Since ${p.since}` : "Continuing support"}
              </span>
              <ArrowUpRight size={22} />
            </button>
          ))}
        </div>
        {!filtered.length && (
          <div className="d-empty">
            <h3>No programmes match.</h3>
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
  const [metric, setMetric] = useState("completed");
  const [period, setPeriod] = useState("C");
  const current = followUps.find((r) => r.period === period);
  const measures = {
    completed: {
      label: "Completed",
      unit: `of ${current.scheduled} scheduled follow-ups`,
      Icon: BookOpen,
    },
    scheduled: {
      label: "Scheduled",
      unit: "follow-ups due in the period",
      Icon: Heart,
    },
    rate: {
      label: "Completion",
      unit: "of scheduled follow-ups",
      Icon: Sprout,
    },
  };
  const value =
    metric === "rate"
      ? Math.round((current.completed / current.scheduled) * 100)
      : current[metric];
  const scaleMax = 30;
  return (
    <section className="d-outcome-river d-section">
      <div className="d-section-heading">
        <div>
          <Label>WHAT A BRIGHTER TOMORROW LOOKS LIKE</Label>
          <h2>
            Count the moments.
            <br />
            <em>See the possibility.</em>
          </h2>
        </div>
        <label className="d-year-label">
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
      <p className="e-example-label">
        {exampleLabel} · Education &amp; family follow-up
      </p>
      <div className="d-river-layout e-impact-chart">
        <div className="d-river-controls">
          <div className="d-outcome-tabs">
            {Object.entries(measures).map(([key, { label, Icon }]) => (
              <button
                key={key}
                className={metric === key ? "selected" : ""}
                aria-pressed={metric === key}
                onClick={() => setMetric(key)}
              >
                <Icon size={24} />
                {label}
                <ArrowUpRight size={18} />
              </button>
            ))}
          </div>
          <strong className="d-river-total">
            {value}
            {metric === "rate" ? "%" : ""}
          </strong>
          <p>
            {measures[metric].unit} · example period {period}
          </p>
        </div>
        <div className="d-river-visual">
          <p className="e-bar-caption">
            Completed follow-ups · fixed scale 0–30
          </p>
          <svg
            viewBox="0 0 600 330"
            role="img"
            aria-label="Illustrative example, not KCH results. Completed follow-ups on a fixed zero-to-30 scale: period A, 21 of 30 scheduled; B, 24 of 30; C, 27 of 30. Hatched bars are earlier example periods A and B, not a verification status."
          >
            <defs>
              <pattern
                id="editorial-bar"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
              >
                <path d="M0 8L8 0" stroke="#ed252a" strokeWidth="2" />
              </pattern>
            </defs>
            {[0, 10, 20, 30].map((n) => (
              <g key={n} aria-hidden="true">
                <line
                  x1="25"
                  x2="585"
                  y1={280 - (n / scaleMax) * 230}
                  y2={280 - (n / scaleMax) * 230}
                  stroke="#62534b"
                />
                <text
                  x="17"
                  y={284 - (n / scaleMax) * 230}
                  textAnchor="end"
                  className="e-scale-label"
                >
                  {n}
                </text>
              </g>
            ))}
            {followUps.map((r, i) => (
              <g key={r.period}>
                <rect
                  data-period={r.period}
                  x={45 + i * 190}
                  y={280 - (r.completed / scaleMax) * 230}
                  width="115"
                  height={(r.completed / scaleMax) * 230}
                  rx="12"
                  fill={r.period === "C" ? "#ed252a" : "url(#editorial-bar)"}
                  stroke={period === r.period ? "#ffb4a9" : "none"}
                  strokeWidth="2"
                />
                <text
                  x={102 + i * 190}
                  y={260 - (r.completed / scaleMax) * 230}
                  textAnchor="middle"
                >
                  {r.completed}
                </text>
                <text x={102 + i * 190} y="314" textAnchor="middle">
                  {r.period}
                </text>
              </g>
            ))}
          </svg>
          <div className="d-river-years">
            {followUps.map((r) => (
              <button
                key={r.period}
                aria-pressed={period === r.period}
                className={period === r.period ? "selected" : ""}
                onClick={() => setPeriod(r.period)}
              >
                Period {r.period}
                <span>
                  {r.completed} / {r.scheduled}
                </span>
              </button>
            ))}
          </div>
          <p className="e-bar-caption">
            Hatching: earlier example periods A/B. Solid red: period C. Neither
            denotes audited or provisional status.
          </p>
          <details className="e-evidence-note">
            <summary>Definitions &amp; source context</summary>
            <p>
              Completed: both academic-progress and welfare checks recorded and
              reviewed by a coordinator. Scheduled: due in that fictional
              support period. A/B/C are comparable example periods, not calendar
              reporting years. All three bars use the same zero baseline and
              maximum of 30 scheduled follow-ups. These observations do not
              establish improved child wellbeing.
            </p>
            <p>
              Inspired by KCH’s{" "}
              <a href="https://kch.co.ke/news/butterfly-childrens-camp/">
                August 2025 Butterfly camp account
              </a>
              ; no comparable KCH series was supplied.
            </p>
          </details>
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
      <ChapterStories example />
      <section className="d-reports d-section" id="reports">
        <Label>EVIDENCE &amp; QUESTIONS</Label>
        <h2>Look a little closer.</h2>
        <p>
          No KCH annual report or audited financial document was supplied or
          retrieved for this preview.
        </p>
        <a
          className="d-text-link"
          href="mailto:info@kch.co.ke?subject=Reports%20and%20financial%20information"
        >
          Request reports <ArrowUpRight size={18} />
        </a>
        <details className="d-evidence-note">
          <summary>A question about the work?</summary>
          <p>
            <a href="mailto:info@kch.co.ke">Contact KCH by email</a> for
            programme questions. Keep personal case details and confidential
            feedback out of public channels. This prototype does not submit
            enquiries.
          </p>
        </details>
      </section>
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
  const [focus, setFocus] = useState("Learning");
  const [payment, dispatch] = useReducer(paymentReducer, initialPayment);
  const [updates, setUpdates] = useState(false);
  const interest = projects.find(
    (p) => p.id === new URLSearchParams(location.search).get("programme"),
  );
  const pending = payment.status === "pending";
  const confirmed = payment.status === "confirmed";
  useEffect(() => {
    if (!pending) return;
    const attempt = payment.attempt;
    const timer = setTimeout(
      () => dispatch({ type: "result", status: "timed-out", attempt }),
      30000,
    );
    return () => clearTimeout(timer);
  }, [pending, payment.attempt]);
  const result = (status) =>
    dispatch({ type: "result", status, attempt: payment.attempt });
  const messages = {
    idle: "Ready to explore. No payment will be taken.",
    pending:
      "Waiting for a simulated confirmation event. No STK prompt was sent and no payment was taken.",
    confirmed: `Local simulation confirmed for KES ${Number(amount).toLocaleString()}. No payment was taken. This is not a receipt.`,
    cancelled:
      "Simulation cancelled. No payment was taken. Your amount and intention are kept; you can retry.",
    failed:
      "Simulation failed. No payment was taken. Retry here or use Giving help to contact KCH.",
    "timed-out":
      "Simulation timed out without confirmation. No payment was taken. In a live service, check the result before retrying; this local preview can be retried safely.",
  };
  const [stage, setStage] = useState(0);
  const journey = [
    ["Your decision", "A gift begins with a choice to care."],
    [
      "Payment confirmation",
      "A verified provider would need to confirm the gift before it is recorded. Here, confirmation is a local simulation; no payment is taken.",
    ],
    [
      "Programme planning",
      "Local priorities would guide available resources. Programme interest is distinct from restricted allocation, and pledges are not received cash.",
    ],
    [
      "Care, review and update",
      "Teams would deliver support, review follow-up records and prepare an approved supporter update. One input could inform the programme summary and supporter communication. A clearly labelled sample appears after mock confirmation; no email is sent.",
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
      >
        <div className="d-hero-actions">
          <a
            className="d-cta"
            href="#giving-form"
            onClick={() =>
              requestAnimationFrame(() =>
                document
                  .getElementById("giving-form")
                  ?.focus({ preventScroll: true }),
              )
            }
          >
            Go to giving form <ArrowDown size={20} />
          </a>
        </div>
      </Hero>
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
              disabled={pending || confirmed}
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
            id="giving-form"
            tabIndex="-1"
            className="d-giving-form"
            data-payment-state={payment.status}
            onSubmit={(e) => {
              e.preventDefault();
              dispatch({ type: "start" });
            }}
          >
            <div className="d-form-heading">
              <Label>YOUR ACT OF CARE</Label>
              <Heart size={24} />
            </div>
            <h2>Begin with a gift.</h2>
            {interest && (
              <p className="d-interest-note">
                Programme interest: <strong>{interest.title}</strong>. This
                expresses interest, without promising restricted allocation.
              </p>
            )}
            <fieldset
              className="d-gift-controls"
              disabled={pending || confirmed}
            >
              <legend className="d-visually-hidden">Gift intention</legend>
              <div className="d-pills d-gift-frequency">
                {["Once", "Monthly"].map((f) => (
                  <button
                    type="button"
                    key={f}
                    aria-pressed={frequency === f}
                    className={frequency === f ? "selected" : ""}
                    onClick={() => {
                      setFrequency(f);
                    }}
                  >
                    {f === "Once" ? "Give once" : "Give monthly"}
                  </button>
                ))}
              </div>
              {frequency === "Monthly" && (
                <p className="d-monthly-note">
                  Monthly giving is an intention/setup request. No recurring
                  mechanism has been verified; this toggle does not set up
                  billing.{" "}
                  <a href="mailto:fundraising@kch.co.ke?subject=Monthly%20giving%20enquiry">
                    Ask KCH about monthly support ↗
                  </a>
                  .
                </p>
              )}
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
                }}
              />
              <fieldset>
                <legend>How would you like to give?</legend>
                <div className="d-payment-options">
                  <button
                    type="button"
                    className="selected"
                    aria-pressed="true"
                  >
                    <Smartphone size={18} />
                    <span>M-Pesa preview</span>
                    <Check size={16} />
                  </button>
                </div>
              </fieldset>
              <p className="d-input-hint">
                Local mock only. Live M-Pesa, card and PayPal availability are
                not confirmed.
              </p>
              <label htmlFor="d-email">Example email (optional)</label>
              <input
                id="d-email"
                type="email"
                autoComplete="off"
                placeholder="supporter@example.com"
              />
            </fieldset>
            <button
              type="submit"
              className="d-cta d-submit"
              disabled={pending || confirmed}
            >
              {confirmed
                ? "Simulation confirmed"
                : pending
                  ? "Awaiting simulated result…"
                  : `${payment.status === "idle" ? "Preview" : "Retry"} KES ${Number(amount || 0).toLocaleString()} gift`}
              <ArrowUpRight size={20} />
            </button>
            <p className="d-payment-note">
              <ShieldCheck size={15} />
              Local preview · No payment is taken
            </p>
            <p className="d-gift-message" role="status" aria-live="polite">
              {messages[payment.status]}
            </p>
            {pending && (
              <fieldset className="d-simulation-controls">
                <legend>Local simulation controls</legend>
                <p className="d-input-hint">
                  Choose the next event. Pending also times out after 30
                  seconds.
                </p>
                {[
                  ["confirmed", "Confirm simulation"],
                  ["cancelled", "Cancel simulation"],
                  ["failed", "Simulate failure"],
                  ["timed-out", "Simulate timeout"],
                ].map(([status, label]) => (
                  <button
                    type="button"
                    className="d-text-link"
                    key={status}
                    onClick={() => result(status)}
                  >
                    {label}
                  </button>
                ))}
              </fieldset>
            )}
            {confirmed && (
              <div className="d-sample-confirmation">
                <Label>SAMPLE CONFIRMATION · NO PAYMENT TAKEN</Label>
                <p>
                  Thank you for exploring support
                  {interest ? ` with an interest in ${interest.title}` : ""}.
                  {frequency === "Monthly"
                    ? " Your monthly intention has not created recurring billing."
                    : ""}
                </p>
                <label className="d-update-choice">
                  <input
                    type="checkbox"
                    checked={updates}
                    onChange={(e) => setUpdates(e.target.checked)}
                  />
                  <span>Show a sample programme update (optional).</span>
                </label>
                <p className="d-input-hint">
                  This separate choice does not create a subscription or send
                  email.
                </p>
                {updates && (
                  <details className="d-sample-update d-evidence-note" open>
                    <summary>Sample programme update</summary>
                    <p className="d-example-label">{exampleLabel}</p>
                    <p>{exampleUpdate}</p>
                    <p>
                      This demonstrates how an approved update could appear
                      after support. It is not actual KCH reporting or email
                      delivery.
                    </p>
                  </details>
                )}
              </div>
            )}
            <a
              className="d-text-link d-giving-help"
              href="mailto:fundraising@kch.co.ke"
            >
              Giving help · contact KCH <ArrowUpRight size={18} />
            </a>
            <details className="d-evidence-note">
              <summary>What a funding need can look like</summary>
              <FundingExample />
            </details>
            <p className="d-form-privacy">
              Use fictional details only. This prototype does not store or send
              your details. Official payment instructions need KCH confirmation
              before live use.
            </p>
          </form>
        </div>
      </section>
      <p className="d-other-support d-section">
        More ways to help:{" "}
        <a href="mailto:fundraising@kch.co.ke?subject=In-kind%20support">
          in-kind support
        </a>
        ,{" "}
        <a href="mailto:fundraising@kch.co.ke?subject=Volunteering">
          volunteering
        </a>{" "}
        or{" "}
        <a href="mailto:fundraising@kch.co.ke?subject=Partnership">
          partnership
        </a>
        . Ask KCH what is currently needed.
      </p>
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
          This proposed process is separate from the local form states. No live
          provider, recurring billing, allocation or update delivery is
          implemented.
        </p>
      </section>
    </>
  );
}
export default function EditorialApp() {
  const [path, setPath] = useState(location.pathname.replace(/\/$/, "") || "/");
  useEffect(() => {
    const fn = () => setPath(location.pathname.replace(/\/$/, "") || "/");
    window.addEventListener("popstate", fn);
    return () => window.removeEventListener("popstate", fn);
  }, []);
  useEffect(() => {
    document.title = `${routes[path] || "Not found"} — Kenya Children’s Homes / Editorial`;
    document.querySelector("main")?.focus({ preventScroll: true });
    if (location.hash)
      requestAnimationFrame(() =>
        document.getElementById(location.hash.slice(1))?.scrollIntoView(),
      );
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
