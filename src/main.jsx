import React, { useMemo, useRef, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Code2,
  Compass,
  Download,
  ExternalLink,
  FileText,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Mic2,
  Music2,
  Orbit,
  Search,
  Sparkles,
  Telescope,
  X,
} from "lucide-react";
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import {
  funSections,
  links,
  profile,
  projects,
  publications,
  talks,
  websites,
} from "./data/content.js";
import { legacyMarkdown } from "./data/legacyContent.js";
import "./styles.css";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Papers", href: "/publications" },
  { label: "Talks", href: "/talks" },
  { label: "Projects", href: "/projects" },
  { label: "Websites", href: "/websites" },
  { label: "Fun", href: "/fun" },
  { label: "USAAAO", href: "/usaaao" },
];

const focusModes = [
  { id: "research", label: "Research", icon: Telescope },
  { id: "software", label: "Software", icon: Code2 },
  { id: "personal", label: "Personal", icon: Sparkles },
];

function App() {
  return (
    <BrowserRouter>
      <ScrollReset />
      <Frame>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/publications/:slug" element={<PublicationDetail />} />
          <Route path="/talks" element={<TalksPage />} />
          <Route path="/talks/:slug" element={<TalkDetail />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/websites" element={<WebsitesPage />} />
          <Route path="/fun" element={<FunPage />} />
          <Route path="/usaaao" element={<UsaaaoPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Frame>
    </BrowserRouter>
  );
}

function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Frame({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-stone-50 text-zinc-950">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/35 bg-stone-50/80 backdrop-blur-2xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="group flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-zinc-950 text-sm font-semibold text-white shadow-lg shadow-zinc-950/15">
              BB
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-semibold tracking-[0.16em] uppercase">Bryan Brzycki</span>
              <span className="block text-xs text-zinc-500">signal / science / software</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive ? "bg-zinc-950 text-white" : "text-zinc-600 hover:bg-white hover:text-zinc-950"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <a href={links.primary[0].href} className="ml-2 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-950 shadow-sm transition hover:border-zinc-950">
              <Download size={16} />
              Resume
            </a>
          </nav>
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-zinc-200 bg-white text-zinc-950 lg:hidden"
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-zinc-200 bg-stone-50 p-4 lg:hidden">
            <nav className="grid gap-2" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-3 text-sm font-semibold ${
                      isActive ? "bg-zinc-950 text-white" : "bg-white text-zinc-700"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>
      <main className="pt-16">{children}</main>
      <Footer />
    </div>
  );
}

function HomePage() {
  const [mode, setMode] = useState("research");
  const spotlight = {
    research: {
      kicker: "Radio SETI, signal processing, and astrophysical inference",
      title: "Searching for faint structure inside noisy data.",
      body: "My PhD work sat at the intersection of astrophysics, statistics, and software: synthetic signal generation, convolutional models, scintillation theory, and large radio surveys.",
      href: "/publications",
      image: "/images/flashy_synthetic.png",
    },
    software: {
      kicker: "Python packages, research tools, and experiments",
      title: "I build tools when a problem needs new handles.",
      body: "From setigen to jort to simulation dashboards, I like software that makes complex work easier to inspect, repeat, and extend.",
      href: "/projects",
      image: "/images/blossom-dashboard.png",
    },
    personal: {
      kicker: "Music, sports, making, prediction, taste",
      title: "The side quests are part of the system.",
      body: "I care about film, sports narratives, music, perfume, cocktails, crafts, and the weird feedback loop between taste and prediction.",
      href: "/fun",
      image: "/images/2019-09-27.jpg",
    },
  }[mode];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-zinc-950 text-white">
        <SignalCanvas />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(20,184,166,0.28),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(244,114,182,0.22),transparent_32%),linear-gradient(180deg,rgba(9,9,11,0.12),rgba(9,9,11,0.92))]" />
        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-end gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-16">
          <div className="max-w-4xl pb-6">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm text-white/80 backdrop-blur">
              <Orbit size={16} />
              PhD astrophysics, Berkeley 2024 / Harvard 2018
            </div>
            <h1 className="text-balance text-5xl font-semibold leading-[0.95] sm:text-7xl lg:text-8xl">
              Bryan Brzycki
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-zinc-200 sm:text-xl">
              I like solving interesting problems with math, statistics, machine learning, and software. Sometimes that means searching for narrowband radio signals. Sometimes it means building small tools, watching too much sports, or making something just because the idea is stuck in my head.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PrimaryLink to="/about">Open the full story</PrimaryLink>
              <SecondaryLink to="/publications">Explore papers</SecondaryLink>
              <a href="mailto:bryan@bryanbrzycki.com" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white hover:text-zinc-950">
                <Mail size={17} />
                Contact
              </a>
            </div>
          </div>
          <div className="pb-8">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
              <img className="aspect-[4/5] w-full rounded-[1.45rem] object-cover" src="/images/bbrzycki_profile_3024x3024.jpg" alt="Bryan Brzycki" />
              <div className="absolute inset-x-6 bottom-6 rounded-3xl border border-white/15 bg-zinc-950/75 p-4 backdrop-blur-xl">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <Metric value="230TB+" label="survey data" />
                  <Metric value="7" label="papers" />
                  <Metric value="3" label="live sites" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8 xl:grid-cols-8">
          {[
            { label: "About", href: "/about", icon: Compass },
            { label: "Papers", href: "/publications", icon: BookOpen },
            { label: "Talks", href: "/talks", icon: Mic2 },
            { label: "Code", href: "/projects", icon: Code2 },
            { label: "Sites", href: "/websites", icon: ExternalLink },
            { label: "Fun", href: "/fun", icon: Music2 },
            { label: "USAAAO", href: "/usaaao", icon: Telescope },
            { label: "CV", href: "/files/bryanbrzycki-cv-24.pdf", icon: FileText },
          ].map((item) => (
            <QuickLink key={item.label} {...item} />
          ))}
        </div>
      </section>

      <section className="bg-stone-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Start here"
            title="A few ways in."
            body="Most of the material fits into a few buckets. Pick the one that matches what you came here for."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-[0.45fr_0.55fr]">
            <div className="rounded-[2rem] border border-zinc-200 bg-white p-3 shadow-sm">
              <div className="grid gap-2">
                {focusModes.map((item) => {
                  const Icon = item.icon;
                  const active = mode === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setMode(item.id)}
                      className={`flex items-center justify-between rounded-[1.4rem] p-5 text-left transition ${
                        active ? "bg-zinc-950 text-white" : "bg-stone-50 text-zinc-700 hover:bg-zinc-100"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`grid h-11 w-11 place-items-center rounded-full ${active ? "bg-white/15" : "bg-white"}`}>
                          <Icon size={20} />
                        </span>
                        <span>
                          <span className="block text-base font-semibold">{item.label}</span>
                          <span className={`block text-sm ${active ? "text-zinc-300" : "text-zinc-500"}`}>
                            {item.id === "research" && "SETI, ML, astrophysics"}
                            {item.id === "software" && "packages, CLIs, dashboards"}
                            {item.id === "personal" && "sports, music, making"}
                          </span>
                        </span>
                      </span>
                      <ArrowRight size={18} />
                    </button>
                  );
                })}
              </div>
            </div>
            <article className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm">
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="p-7 sm:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">{spotlight.kicker}</p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">{spotlight.title}</h2>
                  <p className="mt-4 leading-7 text-zinc-600">{spotlight.body}</p>
                  <Link to={spotlight.href} className="mt-6 inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white">
                    Go deeper <ArrowRight size={17} />
                  </Link>
                </div>
                <img className="h-full min-h-80 w-full object-cover" src={spotlight.image} alt="" />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Live sites"
            title="Standalone things with their own domains."
            body="A few web apps that got big enough, or strange enough, to deserve their own little corner of the internet."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {websites.map((item) => (
              <WebsiteMiniCard key={item.slug} item={item} />
            ))}
          </div>
          <Link to="/websites" className="mt-8 inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white">
            See the full site list <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <section className="bg-zinc-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-300">Threads</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight">The themes that keep showing up.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <DarkStat label="Publication arc" value="CNN localization -> setigen -> scintillation search" />
            <DarkStat label="Talk footprint" value="Berkeley, AAS, Penn State, UCSD, McGill, BL" />
            <DarkStat label="Tools" value="Synthetic data, simulation dashboards, profilers, bots" />
          </div>
        </div>
      </section>
    </>
  );
}

function SignalCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const context = canvas.getContext("2d");
    let frame = 0;
    let animation;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.floor(canvas.offsetWidth * ratio);
      canvas.height = Math.floor(canvas.offsetHeight * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const draw = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      context.clearRect(0, 0, width, height);
      context.fillStyle = "#09090b";
      context.fillRect(0, 0, width, height);

      for (let row = 0; row < 80; row += 1) {
        const y = (row / 80) * height;
        const alpha = 0.04 + 0.12 * Math.sin(row * 0.7 + frame * 0.012);
        context.strokeStyle = `rgba(255,255,255,${Math.max(0.02, alpha)})`;
        context.beginPath();
        context.moveTo(0, y);
        for (let x = 0; x < width; x += 24) {
          const wave = Math.sin(x * 0.008 + row * 0.31 + frame * 0.018) * 12;
          context.lineTo(x, y + wave);
        }
        context.stroke();
      }

      for (let i = 0; i < 18; i += 1) {
        const drift = ((frame * (0.4 + i * 0.02) + i * 137) % (width + 260)) - 130;
        const y = ((i * 71 + Math.sin(frame * 0.01 + i) * 40) % height + height) % height;
        const gradient = context.createLinearGradient(drift - 80, y, drift + 140, y + 36);
        gradient.addColorStop(0, "rgba(20,184,166,0)");
        gradient.addColorStop(0.5, "rgba(20,184,166,0.6)");
        gradient.addColorStop(1, "rgba(244,114,182,0)");
        context.strokeStyle = gradient;
        context.lineWidth = 2;
        context.beginPath();
        context.moveTo(drift - 80, y);
        context.lineTo(drift + 140, y + 36);
        context.stroke();
      }

      frame += 1;
      animation = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full opacity-85" aria-hidden="true" />;
}

function AboutPage() {
  const aboutCards = splitAboutMarkdown(legacyMarkdown.about);

  return (
    <PageShell
      eyebrow="About"
      title="About me"
      intro="A bit about my background and what I'm interested in."
    >
      <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr]">
        <aside className="space-y-5">
          <img className="aspect-square w-full rounded-[2rem] object-cover shadow-sm" src="/images/bbrzycki_profile_3024x3024.jpg" alt="Bryan Brzycki" />
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold">Coordinates</h2>
            <dl className="mt-4 space-y-4 text-sm">
              <InfoRow label="Location" value={profile.location} />
              <InfoRow label="Education" value="UC Berkeley PhD 2024 / Harvard AB 2018" />
              <InfoRow label="Focus" value="SETI, ML, signal processing, software" />
              <InfoRow label="Email" value={profile.email} />
            </dl>
          </div>
        </aside>
        <div className="space-y-5">
          {aboutCards.map((card) => (
            <article key={card.title} className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
              {card.title !== "Intro" && <h2 className="mb-5 text-2xl font-semibold tracking-tight text-zinc-950">{card.title}</h2>}
              <MarkdownContent markdown={card.markdown} />
            </article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

function PublicationsPage() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState("all");
  const topics = ["all", ...Array.from(new Set(publications.flatMap((item) => item.tags)))];
  const filtered = useMemo(() => {
    const needle = query.toLowerCase();
    return publications.filter((item) => {
      const topicMatch = topic === "all" || item.tags.includes(topic);
      const queryMatch = [item.title, item.venue, item.summary, item.citation].join(" ").toLowerCase().includes(needle);
      return topicMatch && queryMatch;
    });
  }, [query, topic]);

  return (
    <PageShell
      eyebrow="Publications"
      title="Publications"
      intro="Here is a selection of my first-author refereed publications. I've also co-authored a number of publications, which you can find on my Google Scholar profile."
    >
      <FilterBar query={query} setQuery={setQuery} tabs={topics} active={topic} setActive={setTopic} placeholder="Search papers, venues, methods..." />
      <div className="mt-8 grid gap-5">
        {filtered.map((item) => (
          <PublicationCard key={item.slug} item={item} />
        ))}
      </div>
    </PageShell>
  );
}

function PublicationCard({ item }) {
  return (
    <article className="group rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-950/5 sm:p-8">
      <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500">
        <span className="rounded-full bg-teal-50 px-3 py-1 font-semibold text-teal-800">{item.year}</span>
        <span>{item.venue}</span>
      </div>
      <div className="mt-4 grid gap-6 lg:grid-cols-[1fr_auto]">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">
            <Link to={`/publications/${item.slug}`} className="hover:text-teal-700">{item.title}</Link>
          </h2>
          <p className="mt-3 leading-7 text-zinc-600">{item.summary}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">{tag}</span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-start gap-2 lg:justify-end">
          <Link to={`/publications/${item.slug}`} className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white">
            Read <ArrowRight size={16} />
          </Link>
          <a href={item.url} className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-800 hover:border-zinc-950">
            Paper <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </article>
  );
}

function PublicationDetail() {
  const { slug } = useParams();
  const item = publications.find((publication) => publication.slug === slug);
  if (!item) return <NotFound />;
  return (
    <DetailShell back="/publications" backLabel="Papers">
      <article className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">{item.year} / {item.venue}</p>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">{item.title}</h1>
        <p className="mt-6 text-lg leading-8 text-zinc-600">{item.summary}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={item.url} className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white">
            Open paper <ExternalLink size={17} />
          </a>
          {item.localPdf && (
            <a href={item.localPdf} className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-900">
              Local PDF <Download size={17} />
            </a>
          )}
        </div>
        <div className="mt-10 rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold">Abstract / note</h2>
          <div className="mt-5">
            <MarkdownContent markdown={legacyMarkdown.publications[item.slug]} />
          </div>
        </div>
        <CitationBox citation={item.citation} />
      </article>
    </DetailShell>
  );
}

function TalksPage() {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("all");
  const years = ["all", ...Array.from(new Set(talks.map((item) => String(item.year))))];
  const filtered = useMemo(() => {
    const needle = query.toLowerCase();
    return talks.filter((item) => {
      const yearMatch = year === "all" || String(item.year) === year;
      const queryMatch = [item.title, item.venue, item.location, item.type].join(" ").toLowerCase().includes(needle);
      return yearMatch && queryMatch;
    });
  }, [query, year]);

  return (
    <PageShell
      eyebrow="Talks"
      title="Talks and presentations"
      intro="Slides, posters, venues, and notes from presentations I've given."
    >
      <FilterBar query={query} setQuery={setQuery} tabs={years} active={year} setActive={setYear} placeholder="Search talks, venues, locations..." />
      <div className="mt-10 grid gap-4">
        {filtered.map((item) => (
          <TalkRow key={item.slug} item={item} />
        ))}
      </div>
    </PageShell>
  );
}

function TalkRow({ item }) {
  return (
    <article className="grid gap-5 rounded-[2rem] border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 sm:grid-cols-[8rem_1fr_auto] sm:items-center">
      <div className="rounded-[1.3rem] bg-zinc-950 px-4 py-3 text-white">
        <span className="block text-2xl font-semibold">{item.year}</span>
        <span className="text-sm text-zinc-300">{item.type}</span>
      </div>
      <div>
        <h2 className="text-xl font-semibold tracking-tight">
          <Link to={`/talks/${item.slug}`} className="hover:text-teal-700">{item.title}</Link>
        </h2>
        <p className="mt-2 text-sm text-zinc-500">{item.venue}</p>
        <p className="mt-1 flex items-center gap-2 text-sm text-zinc-500">
          <MapPin size={15} />
          {item.location}
        </p>
      </div>
      <div className="flex flex-wrap gap-2 sm:justify-end">
        <Link to={`/talks/${item.slug}`} className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-900 hover:border-zinc-950">
          Details <ArrowRight size={16} />
        </Link>
        {item.slides && (
          <a href={item.slides} className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white">
            Slides <Download size={16} />
          </a>
        )}
      </div>
    </article>
  );
}

function TalkDetail() {
  const { slug } = useParams();
  const item = talks.find((talk) => talk.slug === slug);
  if (!item) return <NotFound />;
  return (
    <DetailShell back="/talks" backLabel="Talks">
      <article className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">{item.type} / {formatDate(item.date)}</p>
        <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">{item.title}</h1>
        <div className="mt-6 grid gap-3 text-zinc-600 sm:grid-cols-2">
          <InfoPill icon={Mic2} text={item.venue} />
          <InfoPill icon={MapPin} text={item.location} />
          <InfoPill icon={CalendarDays} text={formatDate(item.date)} />
          <InfoPill icon={Compass} text={item.address || "Virtual"} />
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {item.slides && (
            <a href={item.slides} className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white">
              Download slides <Download size={17} />
            </a>
          )}
        </div>
        <div className="mt-10 rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-xl font-semibold">Notes</h2>
          <div className="mt-5">
            <MarkdownContent markdown={legacyMarkdown.talks[item.slug]} />
          </div>
        </div>
      </article>
    </DetailShell>
  );
}

function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("all");
  const tags = ["all", ...Array.from(new Set(projects.flatMap((item) => item.tags)))];
  const filtered = useMemo(() => {
    const needle = query.toLowerCase();
    return projects.filter((item) => {
      const tagMatch = tag === "all" || item.tags.includes(tag);
      const queryMatch = [item.title, item.summary, item.stack.join(" ")].join(" ").toLowerCase().includes(needle);
      return tagMatch && queryMatch;
    });
  }, [query, tag]);

  return (
    <PageShell
      eyebrow="Projects"
      title="Code"
      intro="Some projects are research tools; some are experiments I built because I wanted to see what would happen."
    >
      <FilterBar query={query} setQuery={setQuery} tabs={tags} active={tag} setActive={setTag} placeholder="Search projects, libraries, ideas..." />
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        {filtered.map((item) => (
          <ProjectCard key={item.slug} item={item} />
        ))}
      </div>
    </PageShell>
  );
}

function ProjectCard({ item }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-950/5">
      {item.image && <img className="h-64 w-full object-cover" src={item.image} alt="" />}
      <div className="p-6 sm:p-7">
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">{tag}</span>
          ))}
        </div>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight">
          <Link to={`/projects/${item.slug}`} className="hover:text-teal-700">{item.title}</Link>
        </h2>
        <p className="mt-3 leading-7 text-zinc-600">{item.summary}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link to={`/projects/${item.slug}`} className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white">
            Open <ArrowRight size={16} />
          </Link>
          {item.github && (
            <a href={item.github} className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-900 hover:border-zinc-950">
              <Code2 size={16} />
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

function ProjectDetail() {
  const { slug } = useParams();
  const item = projects.find((project) => project.slug === slug);
  if (!item) return <NotFound />;
  return (
    <DetailShell back="/projects" backLabel="Projects">
      <article className="mx-auto max-w-5xl">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">Project</p>
            <h1 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-6xl">{item.title}</h1>
            <p className="mt-6 text-lg leading-8 text-zinc-600">{item.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {item.github && (
                <a href={item.github} className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-semibold text-white">
                  <Code2 size={17} />
                  GitHub
                </a>
              )}
              {item.docs && (
                <a href={item.docs} className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-900">
                  Docs <ExternalLink size={17} />
                </a>
              )}
            </div>
          </div>
          {item.image && <img className="rounded-[2rem] border border-zinc-200 bg-white object-cover shadow-sm" src={item.image} alt="" />}
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_18rem]">
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-semibold">Project notes</h2>
            <div className="mt-5">
              <MarkdownContent markdown={legacyMarkdown.projects[item.slug]} />
            </div>
          </div>
          <aside className="rounded-[2rem] border border-zinc-200 bg-zinc-950 p-6 text-white shadow-sm">
            <h2 className="text-lg font-semibold">Stack / shape</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {item.stack.map((entry) => (
                <span key={entry} className="rounded-full bg-white/10 px-3 py-1 text-sm text-zinc-200">{entry}</span>
              ))}
            </div>
          </aside>
        </div>
      </article>
    </DetailShell>
  );
}

function WebsitesPage() {
  return (
    <PageShell
      eyebrow="Websites"
      title="Live web apps"
      intro="Small self-contained websites I built and let live on their own subdomains."
    >
      <div className="grid gap-6">
        {websites.map((item) => (
          <WebsiteShowcase key={item.slug} item={item} />
        ))}
      </div>
    </PageShell>
  );
}

function WebsiteShowcase({ item }) {
  return (
    <article className="grid items-start gap-6 rounded-[2rem] border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-950/5 lg:grid-cols-[0.48fr_0.52fr] lg:p-5">
      <a href={item.url} target="_blank" rel="noreferrer" className="block rounded-[1.55rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2">
        <WebsiteVisual item={item} />
      </a>
      <div className="min-w-0 p-2 sm:p-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">{item.kind}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950">
            <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-teal-700">
              {item.title}
              <ExternalLink size={18} className="text-zinc-400" />
            </a>
          </h2>
          <p className="mt-3 text-sm font-semibold text-zinc-500">{item.domain}</p>
          <p className="mt-5 text-lg leading-8 text-zinc-650">{item.summary}</p>
          <div className="mt-5 space-y-3">
            {item.details.map((detail) => (
              <p key={detail} className="leading-7 text-zinc-600">{detail}</p>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function WebsiteMiniCard({ item }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-950/5">
      <a href={item.url} target="_blank" rel="noreferrer" className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2">
        <WebsiteVisual item={item} compact />
      </a>
      <div className="p-6">
        <p className="text-sm font-semibold text-teal-700">{item.kind}</p>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
          <a href={item.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-teal-700">
            {item.title}
            <ExternalLink size={16} className="text-zinc-400" />
          </a>
        </h3>
        <p className="mt-3 leading-7 text-zinc-600">{item.summary}</p>
      </div>
    </article>
  );
}

function WebsiteVisual({ item, compact = false }) {
  return (
    <div className={`min-w-0 max-w-full overflow-hidden rounded-[1.55rem] border border-zinc-200 bg-zinc-950 shadow-sm ${compact ? "aspect-[36/25]" : "aspect-[36/25]"}`}>
      <img
        src={item.image}
        alt={`Screenshot of ${item.title}`}
        className="h-full w-full object-cover object-top"
        loading="lazy"
      />
    </div>
  );
}

function FunPage() {
  const [active, setActive] = useState(funSections[0].title);
  const current = funSections.find((item) => item.title === active) || funSections[0];
  return (
    <PageShell
      eyebrow="Fun"
      title="Projects and interests"
      intro="A few things I like outside the straight academic/research lane."
    >
      <div className="grid gap-6 lg:grid-cols-[0.42fr_0.58fr]">
        <div className="grid gap-3">
          {funSections.map((section) => (
            <button
              key={section.title}
              type="button"
              onClick={() => setActive(section.title)}
              className={`rounded-[1.5rem] border p-5 text-left transition ${
                active === section.title ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white text-zinc-800 hover:border-zinc-400"
              }`}
            >
              <span className="text-lg font-semibold">{section.title}</span>
              <span className={`mt-1 block text-sm ${active === section.title ? "text-zinc-300" : "text-zinc-500"}`}>
                {section.short}
              </span>
            </button>
          ))}
        </div>
        <article className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-teal-700">{current.short}</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight">{current.title}</h2>
          <div className="mt-5 space-y-4 leading-7 text-zinc-650">
            {current.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {current.links && (
            <div className="mt-7 flex flex-wrap gap-2">
              {current.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-sm font-semibold text-zinc-800 hover:border-zinc-950 hover:text-zinc-950"
                >
                  {link.label} <ExternalLink size={15} />
                </a>
              ))}
            </div>
          )}
        </article>
      </div>
    </PageShell>
  );
}

function UsaaaoPage() {
  return (
    <PageShell
      eyebrow="USAAAO"
      title="USA Astronomy and Astrophysics Competition Foundation"
      intro="A short note about the organization and where to learn more."
    >
      <article className="max-w-4xl rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <MarkdownContent markdown={legacyMarkdown.usaaao} />
      </article>
    </PageShell>
  );
}

function NotFound() {
  return (
    <PageShell eyebrow="404" title="Page not found" intro="The page may have moved during the redesign. The main sections below are the current structure.">
      <div className="flex flex-wrap gap-3">
        {navItems.map((item) => (
          <PrimaryLink key={item.href} to={item.href}>{item.label}</PrimaryLink>
        ))}
      </div>
    </PageShell>
  );
}

function MarkdownContent({ markdown }) {
  if (!markdown) return null;
  const blocks = markdown.trim().split(/\n{2,}/);

  return (
    <div className="space-y-5 leading-7 text-zinc-650">
      {blocks.map((block, index) => {
        const trimmed = block.trim();
        const key = `${trimmed.slice(0, 24)}-${index}`;

        if (!trimmed) return null;
        if (/^-{3,}$/.test(trimmed)) return <hr key={key} className="border-zinc-200" />;
        if (trimmed.startsWith("### ")) {
          return <h3 key={key} className="pt-4 text-2xl font-semibold tracking-tight text-zinc-950">{renderInline(trimmed.slice(4))}</h3>;
        }
        if (trimmed.startsWith("## ")) {
          return <h2 key={key} className="pt-5 text-3xl font-semibold tracking-tight text-zinc-950">{renderInline(trimmed.slice(3))}</h2>;
        }

        const htmlImage = trimmed.match(/<img\s+[^>]*src="([^"]+)"[^>]*(?:width="([^"]+)")?[^>]*>/i);
        if (htmlImage) {
          return (
            <div key={key} className="flex justify-center">
              <img
                src={htmlImage[1]}
                alt=""
                style={htmlImage[2] ? { maxWidth: `${htmlImage[2]}px` } : undefined}
                className="w-full rounded-2xl border border-zinc-200 object-cover shadow-sm"
              />
            </div>
          );
        }

        const markdownImage = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (markdownImage) {
          return (
            <img
              key={key}
              src={markdownImage[2]}
              alt={markdownImage[1]}
              className="w-full rounded-2xl border border-zinc-200 object-cover shadow-sm"
            />
          );
        }

        const lines = trimmed.split("\n");
        if (lines.every((line) => line.startsWith("* "))) {
          return (
            <ul key={key} className="list-disc space-y-2 pl-6">
              {lines.map((line) => (
                <li key={line}>{renderInline(line.slice(2))}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={key} className="text-base leading-7">
            {renderInline(trimmed.replace(/\n/g, " "))}
          </p>
        );
      })}
    </div>
  );
}

function splitAboutMarkdown(markdown) {
  const sections = [];
  const lines = markdown.split("\n");
  let currentTitle = "Intro";
  let currentLines = [];

  for (const line of lines) {
    if (line.startsWith("### ")) {
      if (currentLines.join("\n").trim()) {
        sections.push({ title: currentTitle, markdown: currentLines.join("\n").trim() });
      }
      currentTitle = line.slice(4).trim();
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }

  if (currentLines.join("\n").trim()) {
    sections.push({ title: currentTitle, markdown: currentLines.join("\n").trim() });
  }

  return sections;
}

function renderInline(text) {
  const normalized = text.replace(/``([^`]+)``/g, "`$1`");
  const pattern = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
  const nodes = [];
  let cursor = 0;
  let match;

  while ((match = pattern.exec(normalized)) !== null) {
    if (match.index > cursor) nodes.push(normalized.slice(cursor, match.index));
    const token = match[0];
    const key = `${token}-${match.index}`;

    if (token.startsWith("[")) {
      const link = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (link) {
        const external = /^https?:/.test(link[2]);
        nodes.push(
          <a
            key={key}
            href={link[2]}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
            className="font-semibold text-teal-700 underline decoration-teal-200 underline-offset-4 hover:text-teal-900"
          >
            {link[1]}
          </a>,
        );
      } else {
        nodes.push(token);
      }
    } else if (token.startsWith("**")) {
      nodes.push(<strong key={key} className="font-semibold text-zinc-900">{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`")) {
      nodes.push(<code key={key} className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-zinc-900">{token.slice(1, -1)}</code>);
    } else if (token.startsWith("*")) {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>);
    }

    cursor = pattern.lastIndex;
  }

  if (cursor < normalized.length) nodes.push(normalized.slice(cursor));
  return nodes;
}

function FilterBar({ query, setQuery, tabs, active, setActive, placeholder }) {
  return (
    <div className="rounded-[2rem] border border-zinc-200 bg-white p-4 shadow-sm">
      <label className="relative block">
        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="h-12 w-full rounded-full border border-zinc-200 bg-stone-50 pl-11 pr-4 text-sm outline-none transition focus:border-zinc-950 focus:bg-white"
        />
      </label>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive(tab)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
              active === tab ? "bg-zinc-950 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}

function PageShell({ eyebrow, title, intro, children }) {
  return (
    <div className="bg-stone-50">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">{eyebrow}</p>
          <h1 className="mt-4 max-w-5xl text-balance text-4xl font-semibold tracking-tight text-zinc-950 sm:text-6xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">{intro}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">{children}</section>
    </div>
  );
}

function DetailShell({ back, backLabel, children }) {
  return (
    <div className="bg-stone-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link to={back} className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-900 shadow-sm hover:border-zinc-950">
          <ArrowLeft size={16} />
          Back to {backLabel}
        </Link>
      </div>
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">{children}</section>
    </div>
  );
}

function SectionHeading({ eyebrow, title, body }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-teal-700">{eyebrow}</p>
      <h2 className="mt-3 text-4xl font-semibold tracking-tight text-zinc-950">{title}</h2>
      <p className="mt-4 leading-7 text-zinc-600">{body}</p>
    </div>
  );
}

function QuickLink({ label, href, icon: Icon }) {
  const content = (
    <span className="flex items-center justify-between rounded-[1.3rem] border border-zinc-200 bg-stone-50 p-4 text-sm font-semibold text-zinc-900 transition hover:border-zinc-950 hover:bg-white">
      <span className="flex items-center gap-3">
        <Icon size={18} />
        {label}
      </span>
      <ArrowRight size={16} />
    </span>
  );
  return href.startsWith("http") || href.endsWith(".pdf") ? <a href={href}>{content}</a> : <Link to={href}>{content}</Link>;
}

function PrimaryLink({ to, children }) {
  return (
    <Link to={to} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-950 shadow-xl shadow-black/15 transition hover:-translate-y-0.5">
      {children}
      <ArrowRight size={17} />
    </Link>
  );
}

function SecondaryLink({ to, children }) {
  return (
    <Link to={to} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10">
      {children}
      <ArrowRight size={17} />
    </Link>
  );
}

function Metric({ value, label }) {
  return (
    <div>
      <span className="block text-lg font-semibold text-white">{value}</span>
      <span className="text-xs text-zinc-300">{label}</span>
    </div>
  );
}

function DarkStat({ label, value }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
      <p className="text-sm text-teal-200">{label}</p>
      <p className="mt-3 text-lg font-semibold leading-7">{value}</p>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">{label}</dt>
      <dd className="mt-1 text-zinc-800">{value}</dd>
    </div>
  );
}

function InfoPill({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-3 rounded-[1.4rem] border border-zinc-200 bg-white p-4">
      <Icon size={18} className="text-teal-700" />
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}

function CitationBox({ citation }) {
  return (
    <div className="mt-6 rounded-[2rem] border border-zinc-200 bg-zinc-950 p-6 text-white">
      <h2 className="text-lg font-semibold">Citation</h2>
      <p className="mt-3 leading-7 text-zinc-300" dangerouslySetInnerHTML={{ __html: citation }} />
    </div>
  );
}

function Footer() {
  const quietLinks = links.social.filter((link) => ["Letterboxd", "YouTube", "SoundCloud"].includes(link.label));

  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <p className="text-lg font-semibold">Bryan Brzycki</p>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            Astrophysics, SETI, software, talks, projects, and a few other things I keep coming back to.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-zinc-500">
            {quietLinks.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer" className="hover:text-zinc-950">
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap content-start items-start justify-start gap-2 lg:justify-end">
          <FooterLink href="mailto:bryan@bryanbrzycki.com" icon={Mail} label="Email" />
          <FooterLink href="https://github.com/bbrzycki" icon={Code2} label="GitHub" />
          <FooterLink href="https://www.linkedin.com/in/bryan-brzycki-2871507a" icon={Compass} label="LinkedIn" />
          <FooterLink href="https://scholar.google.com/citations?user=aRVm-UsAAAAJ" icon={GraduationCap} label="Scholar" />
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, icon: Icon, label }) {
  return (
    <a href={href} className="inline-flex h-9 shrink-0 items-center gap-2 rounded-full border border-zinc-200 px-3 text-sm font-semibold leading-none text-zinc-700 hover:border-zinc-950 hover:text-zinc-950">
      <Icon size={16} />
      {label}
    </a>
  );
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(dateString));
}

createRoot(document.getElementById("root")).render(<App />);
