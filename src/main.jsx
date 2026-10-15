import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { ArrowUpRight, Heart, Menu, X } from "lucide-react";
import "@fontsource/figtree/400.css";
import "@fontsource/figtree/500.css";
import "@fontsource/figtree/600.css";
import "@fontsource/figtree/700.css";
import "@fontsource/figtree/800.css";
import "@fontsource/dm-mono/400.css";
import { DemoProvider } from "./shared/demo";
import {
  ProgrammeSummary,
  ProgrammePage,
  ImpactPage,
  GivingPage,
  StaffDashboard,
  FeedbackPage,
  AboutPage,
} from "./shared/Experience";
import "./style.css";
import "./shared/experience.css";
import { Link } from "./shared/Navigation";
const pages = {
  "/": "Home",
  "/about": "About us",
  "/projects": "Projects",
  "/impact": "Our impact",
  "/donate": "Donate",
  "/feedback": "Questions",
};
const picture = "/images/children-care.png";
const secondPicture = "/images/learning-care.png";
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
        DESIGN PREVIEW <span>·</span> Fictional programme & generated imagery ·
        No real payments or personal details.
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
        <Link to="/staff">Staff demonstration</Link>
      </div>
    </footer>
  );
}

function Home() {
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
            <img
              src={picture}
              alt="Generated illustration of Kenyan children with a caring adult"
            />
          </div>
          <div className="image-cutout small-cutout">
            <img
              src={secondPicture}
              alt="Generated illustration of a learning activity"
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
          <span className="collage-caption mono">
            GENERATED CONCEPT IMAGERY
          </span>
          <div className="floating-label mono">01 / THE FUTURE STARTS HERE</div>
        </div>
      </section>
      <ProgrammeSummary />
      <section className="intro-section">
        <Eyebrow>A HOME IS MORE THAN A PLACE</Eyebrow>
        <div>
          <h2>
            Care today.
            <br />
            <span className="serif-detail">Possibility tomorrow.</span>
          </h2>
          <div>
            <p>
              Explore one fictional learning programme: what we observed, what
              needs attention, and how support could help.
            </p>
            <Button to="/projects">Understand the programme</Button>
          </div>
        </div>
      </section>
    </>
  );
}
function App() {
  const previousPath = useRef(null);
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
    document.title = `${pages[path] || (path === "/staff" ? "Staff demonstration" : "Page not found")} — Kenya Children’s Homes`;
    if (previousPath.current !== null)
      document.querySelector("main")?.focus({ preventScroll: true });
    previousPath.current = path;
  }, [path]);
  return (
    <DemoProvider>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header path={path} />
      <main id="main" tabIndex="-1">
        {path === "/" ? (
          <Home />
        ) : path === "/about" ? (
          <AboutPage />
        ) : path === "/projects" ? (
          <ProgrammePage />
        ) : path === "/impact" ? (
          <ImpactPage />
        ) : path === "/donate" ? (
          <GivingPage />
        ) : path === "/staff" ? (
          <StaffDashboard />
        ) : path === "/feedback" ? (
          <FeedbackPage />
        ) : (
          <section className="section">
            <h1>Page not found.</h1>
            <Button to="/">Back to home</Button>
          </section>
        )}
      </main>
      <Footer />
    </DemoProvider>
  );
}
createRoot(document.getElementById("root")).render(<App />);
