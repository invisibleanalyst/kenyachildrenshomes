import React, { useState, useEffect, useReducer } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  ArrowRight,
  Heart,
  Menu,
  X,
  MapPin,
  Plus,
  Minus,
  Check,
  BookOpen,
  Users,
  Sprout,
  ShieldCheck,
  CreditCard,
  Smartphone,
  ChevronDown,
} from "lucide-react";
import "@fontsource/figtree/400.css";
import "@fontsource/figtree/500.css";
import "@fontsource/figtree/600.css";
import "@fontsource/figtree/700.css";
import "@fontsource/figtree/800.css";
import "@fontsource/dm-mono/400.css";
import {
  projects,
  programmeNames,
  followUps,
  exampleBudget,
  cashRequired,
  exampleLabel,
  exampleUpdate,
} from "./data";
import "./style.css";
import {
  Art,
  CareProcess,
  EnhancedMap,
  ConnectionMap,
  TeamSection,
  ImpactDashboard,
  DonationJourney,
} from "./DesignSections";
import "./refined.css";
import { initialPayment, paymentReducer } from "./payment";
const pages = {
  "/": "Home",
  "/about": "About us",
  "/projects": "Projects",
  "/impact": "Our impact",
  "/donate": "Donate",
};
function Link({ to, children, className = "", ...props }) {
  return (
    <a
      href={to}
      className={className}
      {...props}
      onClick={(e) => {
        if (!e.ctrlKey && !e.metaKey && !e.shiftKey && e.button === 0) {
          e.preventDefault();
          history.pushState({}, "", to);
          window.dispatchEvent(new PopStateEvent("popstate"));
          window.scrollTo({ top: 0, behavior: "instant" });
          if (window.location.hash)
            requestAnimationFrame(() =>
              document
                .getElementById(window.location.hash.slice(1))
                ?.scrollIntoView(),
            );
        }
      }}
    >
      {children}
    </a>
  );
}
function Button({ to, children, light = false }) {
  return (
    <Link to={to} className={`button ${light ? "light" : ""}`}>
      {children}
      <ArrowUpRight size={18} />
    </Link>
  );
}
function Eyebrow({ children }) {
  return (
    <div className="eyebrow">
      <span />
      {children}
    </div>
  );
}
function Logo() {
  return (
    <Link to="/" className="logo" aria-label="Kenya Children's Homes home">
      <span className="logo-house" />
      <span>
        KENYA<span className="logo-small">CHILDREN’S HOMES</span>
      </span>
    </Link>
  );
}
function Header({ path }) {
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [path]);
  return (
    <>
      <div className="prototype-note">
        PRESENTATION CONCEPT <span>·</span> Published descriptions ·
        Illustrative artwork and examples. Payments are not live.
      </div>
      <header>
        <Logo />
        <nav className={open ? "open" : ""} aria-label="Main navigation">
          {Object.entries(pages)
            .filter(([p]) => p != "/donate")
            .map(([p, label]) => (
              <Link
                key={p}
                to={p}
                aria-current={path === p ? "page" : undefined}
              >
                {label}
              </Link>
            ))}
          <Link to="/donate" className="nav-donate">
            Make a difference <Heart size={15} />
          </Link>
        </nav>
        <button
          className="menu-toggle"
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
function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div>
          <Logo />
          <p>
            A childhood filled with care.
            <br />A future filled with possibility.
          </p>
        </div>
        <div>
          <span className="mono">EXPLORE</span>
          <Link to="/about">Our story</Link>
          <Link to="/projects">Our projects</Link>
          <Link to="/impact">Our impact</Link>
          <Link to="/impact#reports">Reports &amp; financials</Link>
        </div>
        <div>
          <span className="mono">BE PART OF THE STORY</span>
          <Link to="/donate">
            Give a little. Change a lot. <ArrowUpRight size={16} />
          </Link>
          <a href="https://kch.co.ke/" target="_blank" rel="noreferrer">
            Visit the organisation’s current website <ArrowUpRight size={14} />
          </a>
          <a href="mailto:fundraising@kch.co.ke">
            Giving help &amp; supporter enquiries <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} Kenya Children’s Homes · Website concept
        </span>
        <span>Built with care, for a better tomorrow.</span>
      </div>
    </footer>
  );
}
function Stats() {
  return (
    <section className="stats-strip" aria-label="KCH published facts">
      <div>
        <strong>
          1961<span> founded</span>
        </strong>
        <p>Beginning as Thomas Barnardo House</p>
      </div>
      <div>
        <strong>
          6,000+<span> cared for</span>
        </strong>
        <p>KCH’s historical published summary</p>
      </div>
      <div>
        <strong>
          ~400<span> supported/year</span>
        </strong>
        <p>KCH’s published annual estimate</p>
      </div>
      <details className="stats-context">
        <summary>Sources &amp; time basis</summary>
        <p>
          From KCH’s published summary in the supplied 15 October 2026 brief.
          Historical cutoff, annual reporting year, definitions and overlaps
          need clarification. These figures are not added together.{" "}
          <a href="https://kch.co.ke/about/">KCH history ↗</a>.
        </p>
      </details>
    </section>
  );
}

function ProjectCard({ project: p, onSelect }) {
  return (
    <article className="project-card">
      <div className="project-image">
        <Art
          scene={
            p.programme === programmeNames[0]
              ? "learning"
              : p.programme === programmeNames[2]
                ? "landscape"
                : "children"
          }
        />
        <span className={`status ${p.status.toLowerCase()}`}>{p.status}</span>
      </div>
      <div className="project-body">
        <div className="mono muted">
          <MapPin size={12} />
          {p.county.toUpperCase()}
        </div>
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        <button className="text-button" onClick={() => onSelect(p)}>
          Explore programme <ArrowUpRight size={17} />
        </button>
      </div>
    </article>
  );
}
function FundingExample() {
  return (
    <div className="funding-example">
      <p className="example-label">{exampleLabel}</p>
      <p>
        One support period:{" "}
        <strong>KES {exampleBudget.required.toLocaleString()}</strong> budget;{" "}
        <strong>KES {exampleBudget.confirmed.toLocaleString()}</strong>{" "}
        confirmed contributions.
      </p>
      <div
        className="progress"
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
  useEffect(() => {
    if (!p) return;
    const previous = document.activeElement;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const listener = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", listener);
    document.getElementById("close-project")?.focus();
    return () => {
      document.removeEventListener("keydown", listener);
      document.body.style.overflow = oldOverflow;
      previous?.focus();
    };
  }, [p]);
  if (!p) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-title"
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
          id="close-project"
          className="icon-button close"
          onClick={onClose}
          aria-label="Close project"
        >
          <X />
        </button>
        <Eyebrow>Published programme · {p.county}</Eyebrow>
        <h2 id="project-title">{p.title}</h2>
        <p>{p.description}</p>
        <p className="programme-measure">{p.measure}</p>
        <p className="mono">
          {p.status.toUpperCase()} · {p.programme.toUpperCase()}
        </p>
        <h3>
          {p.id === "butterfly"
            ? "August 2025 · Butterfly camp"
            : "Source note · 15 October 2026"}
        </h3>
        <p>
          {p.update}{" "}
          {p.updateSource && (
            <a className="inline-link" href={p.updateSource}>
              Read KCH’s dated account ↗
            </a>
          )}
        </p>
        {p.id === "butterfly" && (
          <>
            <p className="example-label">{exampleLabel}</p>
            <p>{exampleUpdate}</p>
            <FundingExample />
          </>
        )}
        <details className="evidence-note">
          <summary>Sources, periods &amp; example method</summary>
          <p>
            Based on the supplied source brief reviewed 15 October 2026. Live
            retrieval was unavailable; this review date is not a reporting
            period. Published claims await clarification and KCH republication
            approval. Counts with different periods and scope are not added
            together. <a href={p.source}>KCH programme source ↗</a>.
          </p>
          {p.id === "butterfly" && (
            <p>
              Example periods A/B/C:{" "}
              {followUps.map((r) => `${r.completed}/${r.scheduled}`).join(", ")}{" "}
              completed/scheduled follow-ups. Both academic and welfare checks
              must be recorded and reviewed by a coordinator to count as
              completed. These are fictional delivery records, not child
              wellbeing results. Budget minus confirmed contributions is the
              remaining cash need; pledges remain inside that need.
            </p>
          )}
        </details>
        <Button to={`/donate?programme=${p.id}`}>
          Support a brighter future
        </Button>
        <p className="input-help">
          Your programme interest is carried forward, without promising
          restricted allocation.
        </p>
      </section>
    </div>
  );
}

function CountyMap({ mode = "overview" }) {
  const [detail, setDetail] = useState(null);
  return (
    <>
      <EnhancedMap mode={mode} onProject={setDetail} />
      <ProjectDialog project={detail} onClose={() => setDetail(null)} />
    </>
  );
}
function GivingBanner() {
  return (
    <section className="giving-banner">
      <div>
        <Eyebrow>A LITTLE LOVE GOES A LONG WAY</Eyebrow>
        <h2>
          Be someone’s
          <br />
          <span>reason to smile.</span>
        </h2>
        <p>Help create more moments of belonging, discovery, and hope.</p>
        <Button to="/donate" light>
          Make a difference
        </Button>
      </div>
      <div className="banner-art">
        <Heart strokeWidth={0.7} />
        <span className="mono">CARE CHANGES EVERYTHING.</span>
      </div>
    </section>
  );
}
function Home() {
  const [detail, setDetail] = useState(null);
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <Eyebrow>EVERY CHILD DESERVES A CHANCE</Eyebrow>
          <h1>
            A childhood.
            <br />A chance.
            <br />
            <span>A future.</span>
            <svg className="underline" viewBox="0 0 320 20">
              <path d="M3 12 Q150 -2 315 9 M35 18 Q170 4 280 15" />
            </svg>
          </h1>
          <p>
            Because a little care today can change
            <br className="desktop-break" /> the whole story of tomorrow.
          </p>
          <div className="hero-actions">
            <Button to="/donate">Give a brighter tomorrow</Button>
            <Link to="/about" className="simple-link">
              Meet Kenya Children’s Homes <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="hero-footnote">
            <span className="tiny-heart">
              <Heart size={15} />
            </span>
            <span className="mono">ROOTED IN KENYA. BUILT ON BELONGING.</span>
          </div>
        </div>
        <div className="hero-collage">
          <div className="red-disc" />
          <div className="image-cutout main-cutout">
            <Art
              scene="children"
              label="Editorial artwork of a Kenyan child and a caring adult"
            />
          </div>
          <div className="image-cutout small-cutout">
            <Art
              scene="learning"
              label="Editorial artwork of Kenyan children reading with an educator"
            />
          </div>
          <span className="hero-star">✦</span>
          <div className="handwritten">
            Big dreams.
            <br />
            Little beginnings.
          </div>
          <div className="photo-sticker">
            <Heart size={22} />
            <span>
              Every child.
              <br />
              <strong>Every possibility.</strong>
            </span>
          </div>
          <div className="floating-label mono">01 / THE FUTURE STARTS HERE</div>
        </div>
      </section>
      <div className="ticker">
        <span>CARE</span>
        <span>✦</span>
        <span>BELONGING</span>
        <span>✦</span>
        <span>OPPORTUNITY</span>
        <span>✦</span>
        <span>A BRIGHTER TOMORROW</span>
        <ArrowUpRight />
      </div>
      <Stats />
      <section className="intro-section">
        <Eyebrow>A HOME IS MORE THAN A PLACE</Eyebrow>
        <div>
          <h2>
            It’s the feeling that
            <br />
            <span className="serif-detail">you belong.</span>
          </h2>
          <div>
            <p>
              Childhood should be a time to feel safe, to explore, and to dream.
              This is a space to share the people, programmes, and communities
              helping make that possible.
            </p>
            <Link to="/about" className="text-button">
              Discover our story <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <CareProcess />
      <CountyMap />
      <section className="projects-preview section">
        <div className="section-heading">
          <div>
            <Eyebrow>GOOD THINGS START TOGETHER</Eyebrow>
            <h2>Care in action.</h2>
          </div>
          <Button to="/projects">Explore all programmes</Button>
        </div>
        <div className="project-grid">
          {projects.slice(0, 3).map((p) => (
            <ProjectCard key={p.id} project={p} onSelect={setDetail} />
          ))}
        </div>
      </section>
      <GivingBanner />
      <ProjectDialog project={detail} onClose={() => setDetail(null)} />
    </>
  );
}
function PageHero({ eyebrow, title, accent, description }) {
  return (
    <section className="page-hero">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1>
        {title}
        <br />
        <span>{accent}</span>
      </h1>
      <p>{description}</p>
      <span className="page-star">✦</span>
    </section>
  );
}
function About() {
  return (
    <>
      <PageHero
        eyebrow="THE HEART BEHIND THE WORK"
        title="Every child deserves"
        accent="somewhere to belong."
        description="Founded in Kenya in 1961 as Thomas Barnardo House. Today, KCH emphasises education, sponsorship, reintegration and family support."
      />
      <section className="about-story section">
        <div className="about-photo">
          <Art scene="learning" />
        </div>
        <div>
          <Eyebrow>WHO WE ARE</Eyebrow>
          <h2>
            A story centred
            <br />
            on children.
          </h2>
          <p>
            KCH’s published account describes Kenyan Board leadership following
            a handover at the end of 2025, building on a history of care and
            international partnerships.
          </p>
          <p>
            Education, sponsorship, reintegration and family support connect
            today’s work.{" "}
            <a className="inline-link" href="https://kch.co.ke/about/">
              Read KCH’s published history ↗
            </a>
            . This wording uses the supplied source brief and awaits KCH
            approval.
          </p>
        </div>
      </section>
      <section className="values-section section">
        <Eyebrow>WHAT GUIDES THIS VISION</Eyebrow>
        <h2>Care, in every sense.</h2>
        <div className="values-grid">
          {[
            [
              Heart,
              "Belonging",
              "A place to feel safe, supported, and valued.",
            ],
            [
              BookOpen,
              "Opportunity",
              "Space to learn, explore, and grow with confidence.",
            ],
            [
              Users,
              "Community",
              "Stronger connections between children, families, and communities.",
            ],
            [
              Sprout,
              "Possibility",
              "Support today that opens doors for tomorrow.",
            ],
          ].map(([Icon, t, d], i) => (
            <article key={t}>
              <span className="mono">0{i + 1}</span>
              <Icon size={32} />
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="roadmap section">
        <Eyebrow>FROM INTENTION TO ACTION</Eyebrow>
        <h2>A future we build together.</h2>
        <div className="roadmap-grid">
          {[
            ["Listen", "Understand local needs with families and communities."],
            [
              "Support",
              "Build programmes around care, education, and wellbeing.",
            ],
            [
              "Grow",
              "Review follow-up information with staff and families to guide the next response.",
            ],
          ].map(([t, d], i) => (
            <article key={t}>
              <span className="roadmap-number">0{i + 1}</span>
              <h3>{t}</h3>
              <p>{d}</p>
              <span className="mono">PROPOSED APPROACH</span>
            </article>
          ))}
        </div>
      </section>
      <ConnectionMap />
      <TeamSection />
      <GivingBanner />
    </>
  );
}
function Charts({ impact = false }) {
  const [metric, setMetric] = useState("Completed");
  const [focus, setFocus] = useState(null);
  const groups = followUps.map((r) => `Period ${r.period}`);
  const values = followUps.map((r) => r[metric.toLowerCase()]);
  const max = 30;
  return (
    <section className="charts-grid">
      <article className="chart-card">
        <div className="chart-heading">
          <div>
            <span className="mono">ILLUSTRATIVE EXAMPLE — NOT KCH RESULTS</span>
            <h3>Family follow-up</h3>
          </div>
          <select
            aria-label="Chart metric"
            value={metric}
            onChange={(e) => {
              setMetric(e.target.value);
              setFocus(null);
            }}
          >
            <option>Completed</option>
            <option>Scheduled</option>
          </select>
        </div>
        <div className="bars">
          {groups.map((g, i) => (
            <button
              key={g}
              className={`bar-column ${focus === i ? "focused" : ""}`}
              onMouseEnter={() => setFocus(i)}
              onMouseLeave={() => setFocus(null)}
              onFocus={() => setFocus(i)}
              onBlur={() => setFocus(null)}
              onClick={() => setFocus(i)}
              aria-label={`${g}: ${values[i]} ${metric.toLowerCase()} follow-ups of 30 scheduled`}
            >
              <strong>{values[i].toLocaleString()}</strong>
              <span
                className={`bar ${["active", "completed", "planned"][i]}`}
                style={{ height: `${(values[i] / max) * 145}px` }}
              />
              <span>{g}</span>
            </button>
          ))}
        </div>
        <p className="chart-footnote mono" aria-live="polite">
          {focus !== null
            ? `${groups[focus]}: ${values[focus].toLocaleString()} ${metric.toLowerCase()} follow-ups`
            : "30 SCHEDULED FOLLOW-UPS PER EXAMPLE PERIOD"}
        </p>
      </article>
      <article className="chart-card">
        <span className="mono">SAME EXAMPLE / DELIVERY, NOT WELLBEING</span>
        <h3>Review, respond, check again.</h3>
        <div className="programme-chart">
          {followUps.map((r, i) => (
            <div key={r.period}>
              <div>
                <span>Period {r.period}</span>
                <strong>
                  {r.completed} / {r.scheduled} follow-ups
                </strong>
              </div>
              <div
                className="progress"
                role="img"
                aria-label={`Period ${r.period}: ${r.completed} completed of ${r.scheduled} scheduled follow-ups`}
              >
                <span
                  style={{
                    width: `${(r.completed / r.scheduled) * 100}%`,
                    background: ["#ed252a", "#171717", "#f18b8d"][i],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <details className="evidence-note">
          <summary>Example definitions</summary>
          <p>
            {exampleLabel}. A follow-up is completed only when academic-progress
            and welfare checks have both been recorded and reviewed by a
            coordinator. Scheduled means due in that fictional period. These
            explicit observations are not KCH records, reporting years or
            evidence of improved child wellbeing.
          </p>
        </details>
      </article>
    </section>
  );
}
function Projects() {
  const [status, setStatus] = useState("All");
  const [query, setQuery] = useState("");
  const [programme, setProgramme] = useState("All programmes");
  const [detail, setDetail] = useState(null);
  const filtered = projects.filter(
    (p) =>
      (status === "All" || p.status === status) &&
      (programme === "All programmes" || p.programme === programme) &&
      `${p.title} ${p.county}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <>
      <PageHero
        eyebrow="FROM POSSIBILITY TO PROGRESS"
        title="Real care."
        accent="Everywhere it matters."
        description="Explore KCH’s published programmes in education, family support, protection and mission sustainability. Locations and reporting periods still need clarification."
      />
      <div className="section project-dashboard">
        <Charts />
      </div>
      <CountyMap mode="projects" />
      <section className="section project-directory">
        <div className="section-heading">
          <div>
            <Eyebrow>EXPLORE THE POSSIBILITIES</Eyebrow>
            <h2>Every programme. A new chapter.</h2>
          </div>
          <span className="mono">{filtered.length} PROGRAMME RECORDS</span>
        </div>
        <div className="project-filters">
          <div className="filter-tabs" aria-label="Filter project status">
            {["All", "Ongoing"].map((s) => (
              <button
                key={s}
                aria-pressed={status === s}
                className={status === s ? "selected" : ""}
                onClick={() => setStatus(s)}
              >
                {s}
              </button>
            ))}
          </div>
          <input
            aria-label="Search projects or counties"
            placeholder="Search a county or project…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select
            aria-label="Filter programme"
            value={programme}
            onChange={(e) => setProgramme(e.target.value)}
          >
            <option>All programmes</option>
            {programmeNames.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        {filtered.length ? (
          <div className="project-grid">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} onSelect={setDetail} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No programmes match.</h3>
            <p>Try another county or programme.</p>
            <button
              className="text-button"
              onClick={() => {
                setQuery("");
                setStatus("All");
                setProgramme("All programmes");
              }}
            >
              Reset filters <ArrowRight size={16} />
            </button>
          </div>
        )}
      </section>
      <GivingBanner />
      <ProjectDialog project={detail} onClose={() => setDetail(null)} />
    </>
  );
}
function Impact() {
  const [story, setStory] = useState(0);
  const stories = [
    ["From a check to a response", exampleUpdate, "learning"],
    [
      "The comfort of belonging",
      "Everyday moments of care can help a child feel seen, supported, and at home.",
      "children",
    ],
    [
      "The strength of community",
      "When families and communities have support, children have more space to thrive.",
      "landscape",
    ],
  ];
  return (
    <>
      <PageHero
        eyebrow="BEHIND EVERY NUMBER, A CHILD"
        title="More than progress."
        accent="A life of possibility."
        description="Explore published programme context and an illustrative follow-up example. Completed visits describe delivery; child wellbeing needs its own evidence."
      />
      <ImpactDashboard />
      <section className="impact-story section">
        <div className="story-image">
          <Art scene={stories[story][2]} />
        </div>
        <div>
          <Eyebrow>THE MOMENTS THAT MATTER</Eyebrow>
          <h2>{stories[story][0]}.</h2>
          <p>{stories[story][1]}</p>
          <p className="example-label">
            {story === 0
              ? exampleLabel
              : "Illustrative theme, not a beneficiary testimony"}
          </p>
          <div className="story-tabs">
            {stories.map((item, i) => (
              <button
                aria-label={`Read ${item[0]}`}
                aria-pressed={story === i}
                className={story === i ? "selected" : ""}
                onClick={() => setStory(i)}
                key={item[0]}
              >
                0{i + 1}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="reports section" id="reports">
        <Eyebrow>EVIDENCE &amp; QUESTIONS</Eyebrow>
        <h2>Look a little closer.</h2>
        <p>
          No KCH annual report or audited financial document was supplied or
          retrieved for this preview.
        </p>
        <a
          className="text-button"
          href="mailto:info@kch.co.ke?subject=Reports%20and%20financial%20information"
        >
          Request reports <ArrowUpRight size={18} />
        </a>
        <details className="evidence-note">
          <summary>A question about the work?</summary>
          <p>
            <a href="mailto:info@kch.co.ke">Contact KCH by email</a> for
            programme questions. Please keep personal case details and
            confidential feedback out of public channels. This prototype does
            not submit enquiries.
          </p>
        </details>
      </section>
      <CountyMap mode="impact" />
      <GivingBanner />
    </>
  );
}
function Donate() {
  const [amount, setAmount] = useState(1500);
  const [frequency, setFrequency] = useState("Once");
  const [moment, setMoment] = useState(0);
  const [payment, dispatch] = useReducer(paymentReducer, initialPayment);
  const [updates, setUpdates] = useState(false);
  const interest = projects.find(
    (p) =>
      p.id === new URLSearchParams(window.location.search).get("programme"),
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
      "Simulation cancelled. No payment was taken. Your amount and giving intention are kept; you can retry.",
    failed:
      "Simulation failed. No payment was taken. Retry here or use Giving help to contact KCH.",
    "timed-out":
      "Simulation timed out without confirmation. No payment was taken. In a live service, check the result before retrying; this local preview can be retried safely.",
  };
  const moments = [
    [
      "A moment to learn.",
      "Education and practical support, with family connections at the centre.",
      "learning",
    ],
    [
      "A moment to belong.",
      "Family-based care, reintegration and continuing support.",
      "children",
    ],
    [
      "A moment to grow.",
      "Follow-up helps staff understand what to review next.",
      "landscape",
    ],
  ];
  return (
    <>
      <section className="donate-layout section">
        <div className="donate-story">
          <Eyebrow>GIVE A LITTLE. OPEN A WORLD.</Eyebrow>
          <h1>
            You can be part
            <br />
            of their <span>tomorrow.</span>
          </h1>
          <p>
            Help make room for more care, more discovery, and more possibility.
          </p>
          <div className="donation-photo">
            <Art scene={moments[moment][2]} />
            <div>
              <span className="mono">
                THE MOMENTS THAT MATTER / 0{moment + 1}
              </span>
              <h3>{moments[moment][0]}</h3>
              <p>{moments[moment][1]}</p>
            </div>
          </div>
          <div className="moment-tabs">
            {["Learn", "Belong", "Grow"].map((t, i) => (
              <button
                className={moment === i ? "selected" : ""}
                aria-pressed={moment === i}
                onClick={() => setMoment(i)}
                key={t}
              >
                {t} <ArrowUpRight size={14} />
              </button>
            ))}
          </div>
          <p className="art-note">
            Illustrative artwork, not KCH beneficiaries or guaranteed giving
            outcomes.
          </p>
          <details className="evidence-note">
            <summary>What a funding need can look like</summary>
            <FundingExample />
          </details>
          <p className="giving-alternatives">
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
        </div>
        <form
          className="donation-form"
          data-payment-state={payment.status}
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({ type: "start" });
          }}
        >
          <div className="donation-form-heading">
            <span className="mono">A BRIGHTER FUTURE STARTS WITH YOU</span>
            <Heart size={23} />
          </div>
          <h2>Make a difference.</h2>
          <p>Explore giving with a local simulation.</p>
          {interest && (
            <p className="interest-note">
              Programme interest: <strong>{interest.title}</strong>. This
              expresses interest, without promising restricted allocation.
            </p>
          )}
          <fieldset className="gift-controls" disabled={pending || confirmed}>
            <legend className="visually-hidden">Gift intention</legend>
            <div className="frequency" aria-label="Giving frequency">
              {["Once", "Monthly"].map((f) => (
                <button
                  type="button"
                  key={f}
                  className={frequency === f ? "selected" : ""}
                  aria-pressed={frequency === f}
                  onClick={() => {
                    setFrequency(f);
                  }}
                >
                  {f === "Once" ? "Give once" : "Give monthly"}
                  {f === "Monthly" && <Heart size={14} />}
                </button>
              ))}
            </div>
            {frequency === "Monthly" && (
              <p className="monthly-note">
                Monthly giving is an intention/setup request. No recurring
                mechanism has been verified; this toggle does not set up
                billing.{" "}
                <a href="mailto:fundraising@kch.co.ke?subject=Monthly%20giving%20enquiry">
                  Ask KCH about monthly support ↗
                </a>
                .
              </p>
            )}
            <label htmlFor="gift-amount">
              Your gift <span className="mono">KES</span>
            </label>
            <div className="amount-grid">
              {[500, 1500, 3000, 5000].map((a) => (
                <button
                  type="button"
                  key={a}
                  className={Number(amount) === a ? "selected" : ""}
                  aria-pressed={Number(amount) === a}
                  onClick={() => {
                    setAmount(a);
                  }}
                >
                  KES {a.toLocaleString()}
                </button>
              ))}
            </div>
            <label className="custom-amount">
              <span>KES</span>
              <input
                id="gift-amount"
                type="number"
                min="100"
                max="1000000"
                required
                aria-label="Custom donation amount in Kenyan shillings"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
              />
              <span className="mono">CUSTOM AMOUNT</span>
            </label>
            <fieldset>
              <legend>How would you like to give?</legend>
              <div className="payment-methods">
                <button type="button" className="selected" aria-pressed="true">
                  <Smartphone size={19} />
                  <span>M-Pesa preview</span>
                  <Check size={16} />
                </button>
              </div>
            </fieldset>
            <p className="input-help">
              Local mock only. Live M-Pesa, card and PayPal availability are not
              confirmed.
            </p>
            <label htmlFor="donor-name">
              Example name <span className="optional">(optional)</span>
            </label>
            <input
              id="donor-name"
              autoComplete="off"
              placeholder="Sample supporter — fictional details only"
            />
            <label htmlFor="donor-email">
              Example email <span className="optional">(optional)</span>
            </label>
            <input
              id="donor-email"
              type="email"
              autoComplete="off"
              placeholder="supporter@example.com"
            />
          </fieldset>
          <button
            className="button donation-submit"
            type="submit"
            disabled={pending || confirmed}
          >
            {confirmed
              ? "Simulation confirmed"
              : pending
                ? "Awaiting simulated result…"
                : `${payment.status === "idle" ? "Preview" : "Retry"} KES ${Number(amount || 0).toLocaleString()} gift`}
            <ArrowUpRight size={18} />
          </button>
          <p className="payment-note">
            <ShieldCheck size={15} />
            Local preview · No payment is taken
          </p>
          <div className="donation-message" role="status" aria-live="polite">
            <p>{messages[payment.status]}</p>
          </div>
          {pending && (
            <fieldset className="simulation-controls">
              <legend>Local simulation controls</legend>
              <p className="input-help">
                Choose the next event. Pending also times out after 30 seconds.
              </p>
              {[
                ["confirmed", "Confirm simulation"],
                ["cancelled", "Cancel simulation"],
                ["failed", "Simulate failure"],
                ["timed-out", "Simulate timeout"],
              ].map(([status, label]) => (
                <button
                  type="button"
                  className="text-button"
                  key={status}
                  onClick={() => result(status)}
                >
                  {label}
                </button>
              ))}
            </fieldset>
          )}
          {confirmed && (
            <div className="sample-confirmation">
              <span className="mono">
                SAMPLE CONFIRMATION · NO PAYMENT TAKEN
              </span>
              <p>
                Thank you for exploring support
                {interest ? ` with an interest in ${interest.title}` : ""}.
                {frequency === "Monthly"
                  ? " Your monthly intention has not created recurring billing."
                  : ""}
              </p>
              <label className="updates-choice">
                <input
                  type="checkbox"
                  checked={updates}
                  onChange={(e) => setUpdates(e.target.checked)}
                />
                <span>Show a sample programme update (optional).</span>
              </label>
              <p className="input-help">
                This separate choice does not create a subscription or send
                email.
              </p>
              {updates && (
                <details className="sample-update evidence-note" open>
                  <summary>Sample programme update</summary>
                  <p className="example-label">{exampleLabel}</p>
                  <p>{exampleUpdate}</p>
                  <p>
                    This shows how an approved update could appear after
                    support. It is not actual KCH reporting or email delivery.
                  </p>
                </details>
              )}
            </div>
          )}
          <a
            className="text-button giving-help"
            href="mailto:fundraising@kch.co.ke"
          >
            Giving help · contact KCH <ArrowUpRight size={18} />
          </a>
          <p className="form-privacy">
            Use fictional details only. This prototype does not store or send
            your details. Official payment instructions need KCH confirmation
            before live use.
          </p>
        </form>
      </section>
      <DonationJourney />
      <section className="donation-values section">
        <Eyebrow>THOUGHTFUL GIVING</Eyebrow>
        <h2>
          Care you can feel.
          <br />
          Clarity you can trust.
        </h2>
        <div className="values-grid">
          {[
            [
              Heart,
              "A human connection",
              "See the moments and programmes your support can help make possible.",
            ],
            [
              ShieldCheck,
              "Transparent support",
              "Separate confirmed funds from pledges, and ask questions about programme reporting.",
            ],
            [
              Users,
              "A shared tomorrow",
              "Money, practical assistance, volunteering and partnerships can all begin with a conversation.",
            ],
          ].map(([Icon, t, d]) => (
            <article key={t}>
              <Icon size={28} />
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
function App() {
  const [path, setPath] = useState(
    window.location.pathname.replace(/\/$/, "") || "/",
  );
  useEffect(() => {
    const handle = () =>
      setPath(window.location.pathname.replace(/\/$/, "") || "/");
    window.addEventListener("popstate", handle);
    return () => window.removeEventListener("popstate", handle);
  }, []);
  useEffect(() => {
    document.title = `${pages[path] || "Page not found"} — Kenya Children’s Homes`;
    document.querySelector("main")?.focus({ preventScroll: true });
    if (window.location.hash)
      requestAnimationFrame(() =>
        document
          .getElementById(window.location.hash.slice(1))
          ?.scrollIntoView(),
      );
  }, [path]);
  return (
    <>
      <a className="skip-link" href="#main">
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
          <section className="section">
            <h1>Page not found.</h1>
            <Button to="/">Back to home</Button>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
