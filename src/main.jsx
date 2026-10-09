import React, { useState, useEffect } from "react";
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
import { countyMap, projects, programmeNames, totals } from "./data";
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
        PRESENTATION CONCEPT <span>·</span> Figures are unverified. Artwork is
        created for this design. Payments are not live.
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
        </div>
        <div>
          <span className="mono">BE PART OF THE STORY</span>
          <Link to="/donate">
            Give a little. Change a lot. <ArrowUpRight size={16} />
          </Link>
          <a
            href="https://www.kenyachildrenshomes.org.uk/"
            target="_blank"
            rel="noreferrer"
          >
            Visit the organisation’s current website <ArrowUpRight size={14} />
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
    <section className="stats-strip" aria-label="Project overview">
      <div>
        <strong>
          47<span> counties</span>
        </strong>
        <p>A whole country of possibility</p>
      </div>
      <div>
        <strong>
          {totals.children.toLocaleString()}
          <span> children</span>
        </strong>
        <p>Programme places across the portfolio</p>
      </div>
      <div>
        <strong>
          {totals.completed}
          <span> projects</span>
        </strong>
        <p>Projects at the delivery milestone</p>
      </div>
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
          Explore project <ArrowUpRight size={17} />
        </button>
      </div>
    </article>
  );
}
function ProjectDialog({ project: p, onClose }) {
  useEffect(() => {
    if (!p) return;
    const listener = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", listener);
    const previous = document.activeElement;
    document.getElementById("close-project")?.focus();
    return () => {
      document.removeEventListener("keydown", listener);
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
          id="close-project"
          className="icon-button close"
          onClick={onClose}
          aria-label="Close project"
        >
          <X />
        </button>
        <Eyebrow>Project · {p.county}</Eyebrow>
        <h2 id="project-title">{p.title}</h2>
        <p>{p.description}</p>
        <div className="modal-stats">
          <div>
            <strong>{p.children}</strong>
            <span>Programme places</span>
          </div>
          <div>
            <strong>{p.progress}%</strong>
            <span>Delivery progress</span>
          </div>
        </div>
        <div className="progress">
          <span style={{ width: `${p.progress}%` }} />
        </div>
        <p className="mono">
          {p.status.toUpperCase()} · {p.programme.toUpperCase()}
        </p>
        <Button to="/donate">Support a brighter future</Button>
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
            <span className="mono">A UK BASE. A KENYAN HEART.</span>
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
          <Button to="/projects">Explore all projects</Button>
        </div>
        <div className="project-grid">
          {[
            projects.find((p) => p.id === "nairobi") || projects[0],
            projects.find((p) => p.id === "kisumu") || projects[1],
            projects.find((p) => p.id === "mombasa") || projects[2],
          ].map((p) => (
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
        description="Based in the United Kingdom, with work centred in Kenya. Bringing care, community, and opportunity closer to the children who need them."
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
            A UK base connects supporters with a purpose rooted in Kenya:
            helping children have the care, relationships, and opportunities
            they need to grow.
          </p>
          <p>
            Our vision is grounded in nurturing care, access to education,
            healthy childhoods, and stronger family connections. A childhood
            full of possibility begins with everyday support.
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
              "Learn from outcomes and expand support where it is needed.",
            ],
          ].map(([t, d], i) => (
            <article key={t}>
              <span className="roadmap-number">0{i + 1}</span>
              <h3>{t}</h3>
              <p>{d}</p>
              <span className="mono">A COMMUNITY-LED APPROACH</span>
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
  const [metric, setMetric] = useState("Projects");
  const [focus, setFocus] = useState(null);
  const groups = ["Active", "Completed", "Planned"];
  const values = groups.map((s) => {
    const items = projects.filter((p) => p.status === s);
    return metric === "Projects"
      ? items.length
      : Math.round(items.reduce((n, p) => n + p.progress, 0) / items.length);
  });
  const max = Math.max(...values);
  return (
    <section className="charts-grid">
      <article className="chart-card">
        <div className="chart-heading">
          <div>
            <span className="mono">PROJECT DELIVERY / PORTFOLIO</span>
            <h3>{impact ? "Support, across stages" : "The bigger picture"}</h3>
          </div>
          <select
            aria-label="Chart metric"
            value={metric}
            onChange={(e) => {
              setMetric(e.target.value);
              setFocus(null);
            }}
          >
            <option>Projects</option>
            <option>Completion</option>
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
              aria-label={`${g}: ${values[i]} ${metric.toLowerCase()}`}
            >
              <strong>{values[i].toLocaleString()}</strong>
              <span
                className={`bar ${g.toLowerCase()}`}
                style={{ height: `${(values[i] / max) * 145}px` }}
              />
              <span>{g}</span>
            </button>
          ))}
        </div>
        <p className="chart-footnote mono" aria-live="polite">
          {focus !== null
            ? `${groups[focus]}: ${values[focus].toLocaleString()} ${metric.toLowerCase()}`
            : "SELECT A BAR TO EXPLORE"}
        </p>
      </article>
      <article className="chart-card">
        <span className="mono">PROGRAMME DISTRIBUTION</span>
        <h3>Many ways to make a difference.</h3>
        <div className="programme-chart">
          {programmeNames.map((p, i) => {
            const count = projects.filter((x) => x.programme === p).length;
            return (
              <div key={p}>
                <div>
                  <span>{p}</span>
                  <strong>{count} projects</strong>
                </div>
                <div className="progress">
                  <span
                    style={{
                      width: `${(count / projects.length) * 100}%`,
                      background: ["#ed252a", "#171717", "#f18b8d", "#b4aaa3"][
                        i
                      ],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <p className="chart-footnote mono">
          47 COUNTY PROJECTS / ONE CONNECTED PORTFOLIO
        </p>
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
        description="Explore care, learning, and community projects across Kenya. Follow the delivery stages, understand local priorities, and see what comes next."
      />
      <div className="section project-dashboard">
        <Charts />
      </div>
      <CountyMap mode="projects" />
      <section className="section project-directory">
        <div className="section-heading">
          <div>
            <Eyebrow>EXPLORE THE POSSIBILITIES</Eyebrow>
            <h2>Every project. A new chapter.</h2>
          </div>
          <span className="mono">{filtered.length} PROJECTS</span>
        </div>
        <div className="project-filters">
          <div className="filter-tabs" aria-label="Filter project status">
            {["All", "Active", "Completed", "Planned"].map((s) => (
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
            <h3>No projects match.</h3>
            <p>Try another county, programme, or status.</p>
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
    [
      "The joy of discovering",
      "A book. A question. A moment of understanding. Learning opens a world of possibilities.",
      "learning",
    ],
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
        description="The projects tell us what is being built. The impact asks a different question: what changes in a child’s everyday life?"
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
      <CountyMap mode="impact" />
      <GivingBanner />
    </>
  );
}
function Donate() {
  const [amount, setAmount] = useState(1500);
  const [frequency, setFrequency] = useState("Once");
  const [method, setMethod] = useState("M-Pesa");
  const [moment, setMoment] = useState(0);
  const [message, setMessage] = useState("");
  const moments = [
    [
      "A moment to learn.",
      "Books, curiosity, and the confidence to try something new.",
      "learning",
    ],
    [
      "A moment to belong.",
      "The everyday comfort of care, connection, and a welcoming space.",
      "children",
    ],
    [
      "A moment to grow.",
      "Healthy routines and opportunities to discover what comes next.",
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
        </div>
        <form
          className="donation-form"
          onSubmit={(e) => {
            e.preventDefault();
            setMessage(
              "Thank you for exploring this giving experience. This is a preview: no payment was taken. M-Pesa and card checkout will be connected before launch.",
            );
          }}
        >
          <div className="donation-form-heading">
            <span className="mono">A BRIGHTER FUTURE STARTS WITH YOU</span>
            <Heart size={23} />
          </div>
          <h2>Make a difference.</h2>
          <p>Choose how you’d like to give.</p>
          <div className="frequency" aria-label="Giving frequency">
            {["Once", "Monthly"].map((f) => (
              <button
                type="button"
                key={f}
                className={frequency === f ? "selected" : ""}
                aria-pressed={frequency === f}
                onClick={() => {
                  setFrequency(f);
                  setMessage("");
                }}
              >
                {f === "Once" ? "Give once" : "Give monthly"}
                {f === "Monthly" && <Heart size={14} />}
              </button>
            ))}
          </div>
          <label>
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
                  setMessage("");
                }}
              >
                KES {a.toLocaleString()}
              </button>
            ))}
          </div>
          <label className="custom-amount">
            <span>KES</span>
            <input
              type="number"
              min="100"
              max="1000000"
              required
              aria-label="Custom donation amount in Kenyan shillings"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setMessage("");
              }}
            />
            <span className="mono">CUSTOM AMOUNT</span>
          </label>
          <fieldset>
            <legend>How would you like to give?</legend>
            <div className="payment-methods">
              {["M-Pesa", "Card"].map((m) => (
                <button
                  type="button"
                  key={m}
                  className={method === m ? "selected" : ""}
                  aria-pressed={method === m}
                  onClick={() => {
                    setMethod(m);
                    setMessage("");
                  }}
                >
                  {m === "M-Pesa" ? (
                    <Smartphone size={19} />
                  ) : (
                    <CreditCard size={19} />
                  )}
                  <span>{m}</span>
                  {method === m && <Check size={16} />}
                </button>
              ))}
            </div>
          </fieldset>
          <label htmlFor="donor-name">
            Your name <span className="optional">(optional)</span>
          </label>
          <input id="donor-name" autoComplete="name" placeholder="Your name" />
          <label htmlFor="donor-email">Email address</label>
          <input
            id="donor-email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
          {method === "M-Pesa" && (
            <>
              <label htmlFor="donor-phone">M-Pesa phone number</label>
              <input
                id="donor-phone"
                type="tel"
                required
                pattern="(\+?254|0)[17][0-9]{8}"
                placeholder="0712 345 678 (without spaces)"
                autoComplete="tel"
              />
              <span className="input-help">
                Use 07…, 01…, or +254… with no spaces.
              </span>
            </>
          )}
          <button className="button donation-submit" type="submit">
            Preview KES {Number(amount || 0).toLocaleString()}{" "}
            {frequency === "Monthly" ? "monthly gift" : "gift"}
            <ArrowUpRight size={18} />
          </button>
          <p className="payment-note">
            <ShieldCheck size={15} />
            Preview only · Payment gateway not connected
          </p>
          {message && (
            <div className="donation-message" role="status">
              <Check size={20} />
              <p>{message}</p>
            </div>
          )}
          <p className="form-privacy">
            This prototype does not store or send your details. Use example
            details to explore the form.
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
              "Verified impact reporting and payment information will be added before launch.",
            ],
            [
              Users,
              "A shared tomorrow",
              "One gift or ongoing support: every act of care is part of a bigger story.",
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
