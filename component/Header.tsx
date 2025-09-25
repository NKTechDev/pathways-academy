import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router"; // ✅ v7
import {
  Menu,
  X,
  ChevronDown,
  Search,
  // Section icons
  Atom,
  Languages as LanguagesIcon,
  Briefcase,
  // Link icons
  Calculator,
  FlaskConical,
  Microscope,
  BookOpen,
  Globe,
  MessageCircle,
  Banknote,
  LineChart,
} from "lucide-react";

/* ---------- types ---------- */
type MenuAlign = "start" | "center" | "end";
type LinkItem = { label: string; to: string };
type MenuCol = { heading: string; links: LinkItem[] };
type MegaMenu = { label: string; to: string; align?: MenuAlign; columns: MenuCol[] };

/* ---------- data ---------- */
const MENUS: MegaMenu[] = [
  {
    label: "Subjects",
    to: "/programs",
    align: "start",
    columns: [
      {
        heading: "Science",
        links: [
          { label: "Mathematics", to: "/programs/math" },
          { label: "Physics", to: "/programs/physics" },
          { label: "Chemistry", to: "/programs/chemistry" },
          { label: "Biology", to: "/programs/biology" },
        ],
      },
      {
        heading: "Languages",
        links: [
          { label: "English", to: "/programs/english" },
          { label: "Urdu", to: "/programs/urdu" },
          { label: "Arabic", to: "/programs/arabic" },
        ],
      },
      {
        heading: "Commerce",
        links: [
          { label: "Accounting", to: "/programs/accounting" },
          { label: "Economics", to: "/programs/economics" },
          { label: "Business Studies", to: "/programs/business" },
        ],
      },
    ],
  },
  {
    label: "Crash Courses",
    to: "/crash",
    align: "center",
    columns: [
      {
        heading: "IGCSE / O-Levels",
        links: [
          { label: "Math (Fast Track)", to: "/crash/igcse/math" },
          { label: "Physics (Fast Track)", to: "/crash/igcse/physics" },
          { label: "Chemistry (Fast Track)", to: "/crash/igcse/chemistry" },
        ],
      },
      {
        heading: "AS / A-Levels",
        links: [
          { label: "AS Math", to: "/crash/alevels/math" },
          { label: "A2 Physics", to: "/crash/alevels/physics" },
          { label: "A2 Biology", to: "/crash/alevels/biology" },
        ],
      },
      {
        heading: "IELTS",
        links: [
          { label: "IELTS General", to: "/crash/ielts/general" },
          { label: "IELTS Academic", to: "/crash/ielts/academic" },
          { label: "Spoken English", to: "/crash/spoken-english" },
        ],
      },
    ],
  },
];

/* ---------- icon registries ---------- */
// Headings (column titles)
const HEADING_ICON: Record<string, React.ComponentType<any>> = {
  Science: Atom,
  Languages: LanguagesIcon,
  Commerce: Briefcase,
  "IGCSE / O-Levels": BookOpen,
  "AS / A-Levels": GraduationCapLike, // fallback alias below
  IELTS: Globe,
};

// Links (rows)
const LINK_ICON: Record<string, React.ComponentType<any>> = {
  Mathematics: Calculator,
  "Math (Fast Track)": Calculator,
  Physics: Atom,
  "Physics (Fast Track)": Atom,
  Chemistry: FlaskConical,
  "Chemistry (Fast Track)": FlaskConical,
  Biology: Microscope,

  English: BookOpen,
  Urdu: MessageCircle,
  Arabic: MessageCircle,

  Accounting: Banknote,
  Economics: LineChart,
  "Business Studies": Briefcase,

  "AS Math": Calculator,
  "A2 Physics": Atom,
  "A2 Biology": Microscope,

  "IELTS General": Globe,
  "IELTS Academic": Globe,
  "Spoken English": MessageCircle,
};

/* Small fallback icon (since Lucide has GraduationCap, but to be safe) */
function GraduationCapLike(props: any) {
  return <Briefcase {...props} />; // swap to GraduationCap if you have it imported
}

/* ---------- utils ---------- */
function cn(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/* ---------- component ---------- */
export default function MegaNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  // determine if a top-level menu should appear active based on current path
  const isMenuRouteActive = (menu: MegaMenu) => {
    const allPaths = [
      menu.to,
      ...menu.columns.flatMap((c) => c.links.map((l) => l.to)),
    ];
    return allPaths.some((p) =>
      location.pathname === p || location.pathname.startsWith(p + "/")
    );
  };

  // flicker protection delay
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = (ms = 120) => {
    cancelClose();
    closeTimer.current = setTimeout(() => setActiveIdx(null), ms);
  };

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIdx(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // click outside
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) setActiveIdx(null);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // close on focus leaving the wrapper
  const onWrapperBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as Node | null;
    if (navRef.current && next && navRef.current.contains(next)) return;
    setActiveIdx(null);
  };

  // alignment per menu
  const alignClass = (align?: MenuAlign) => {
    if (align === "start") return "left-0";
    if (align === "end") return "right-0";
    return "left-1/2 -translate-x-1/2"; // center by default
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-slate-200">
      <div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        ref={navRef}
        onBlur={onWrapperBlur}
      >
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-blue-600 text-white grid place-items-center font-bold">P</div>
              <span className="text-lg font-semibold text-slate-900">Pathways Academy</span>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-stretch gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60",
                  isActive
                    ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                    : "text-slate-700 hover:bg-slate-100"
                )
              }
            >
              <BookOpen className="h-4 w-4" />
              Home
            </NavLink>

            {MENUS.map((menu, idx) => {
              const menuIsRouteActive = isMenuRouteActive(menu);
              const open = activeIdx === idx;
              return (
                <div
                  key={menu.label}
                  className="relative"
                  onMouseEnter={() => {
                    cancelClose();
                    setActiveIdx(idx);
                  }}
                  onMouseLeave={() => scheduleClose()}
                >
                  <button
                    type="button"
                    className={cn(
                      "group inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 transition",
                      (open || menuIsRouteActive)
                        ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                        : "text-slate-700 hover:bg-slate-100"
                    )}
                    aria-expanded={open}
                    aria-haspopup="true"
                    onFocus={() => setActiveIdx(idx)}
                  >
                    {/* top-level icon per menu (optional: derive from label) */}
                    {menu.label === "Subjects" ? (
                      <Atom className="h-4 w-4 opacity-80" />
                    ) : menu.label === "Crash Courses" ? (
                      <GraduationCapLike className="h-4 w-4 opacity-80" />
                    ) : null}
                    {menu.label}
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        open && "rotate-180"
                      )}
                    />
                  </button>

                  {/* Mega panel */}
                  <div
                    className={cn(
                      "absolute mt-2 w-[60rem] max-w-[96vw] z-[60]",
                      alignClass(menu.align),
                      open ? "block" : "hidden"
                    )}
                    onMouseEnter={cancelClose}
                    onMouseLeave={() => scheduleClose()}
                  >
                    <div className="rounded-2xl border border-slate-200 bg-white shadow-xl">
                      {/* Header row */}
                      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-200">
                        <div className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                            {menu.label === "Subjects" ? (
                              <Atom className="h-4 w-4" />
                            ) : (
                              <GraduationCapLike className="h-4 w-4" />
                            )}
                          </span>
                          Explore {menu.label}
                        </div>
                        <Link
                          to={menu.to}
                          className="text-xs font-medium text-blue-700 hover:underline"
                          onClick={() => setActiveIdx(null)}
                        >
                          View all {menu.label} →
                        </Link>
                      </div>

                      {/* Columns with vertical dividers */}
                      <div className="grid grid-cols-3 gap-0 px-2 py-4">
                        {menu.columns.map((col, i) => {
                          const HeadingIcon =
                            HEADING_ICON[col.heading] ?? Briefcase;
                          return (
                            <div
                              key={col.heading}
                              className={cn(
                                "px-4",
                                i !== 0 && "border-l border-slate-200",
                                "min-w-0"
                              )}
                            >
                              <div className="mb-2 flex items-center justify-between">
                                <span className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                  <HeadingIcon className="h-3.5 w-3.5" />
                                  {col.heading}
                                </span>
                                <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600">
                                  {col.links.length}
                                </span>
                              </div>

                              <ul className="rounded-lg overflow-hidden">
                                {col.links.map((l: LinkItem) => {
                                  const RowIcon = LINK_ICON[l.label] ?? BookOpen;
                                  return (
                                    <li key={l.to}>
                                      <NavLink
                                        to={l.to}
                                        className={({ isActive }) =>
                                          cn(
                                            "flex items-center justify-between gap-3 px-3 py-2 text-sm transition",
                                            "hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50",
                                            isActive
                                              ? "bg-blue-50 text-blue-700"
                                              : "text-slate-700"
                                          )
                                        }
                                        onClick={() => setActiveIdx(null)}
                                      >
                                        <span className="flex items-center gap-2 min-w-0">
                                          <RowIcon className="h-4 w-4 shrink-0 text-slate-400" />
                                          <span className="truncate">{l.label}</span>
                                        </span>
                                        <span className="text-slate-300">›</span>
                                      </NavLink>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          );
                        })}
                      </div>

                      {/* Promo / CTA strip */}
                      <div className="px-6 py-4 border-t border-slate-200">
                        <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-white">
                          <div className="space-y-0.5">
                            <div className="text-xs opacity-90">New Session</div>
                            <div className="text-base font-semibold">
                              Admissions Open — Fall 2025
                            </div>
                          </div>
                          <Link
                            to="/admissions/apply"
                            className="rounded-lg bg-white/10 px-3 py-1.5 text-sm font-medium hover:bg-white/20"
                            onClick={() => setActiveIdx(null)}
                          >
                            Apply Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Simple links */}
            <NavLink
              to="/about"
              className={({ isActive }) =>
                cn(
                  "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60",
                  isActive ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200" : "text-slate-700 hover:bg-slate-100"
                )
              }
            >
              <InfoDotLike className="h-4 w-4" />
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                cn(
                  "inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60",
                  isActive ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200" : "text-slate-700 hover:bg-slate-100"
                )
              }
            >
              <MessageCircle className="h-4 w-4" />
              Contact
            </NavLink>
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search…"
                className="w-56 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            </div>
            <Link
              to="/login"
              className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 text-slate-700"
            aria-label="Open menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        className={cn(
          "lg:hidden border-t border-slate-200 bg-white shadow-sm",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="mb-3">
            <input
              type="text"
              placeholder="Search…"
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <ul className="space-y-2">
            {MENUS.map((menu, idx) => (
              <li key={menu.label} className="rounded-2xl border border-slate-200">
                <button
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-slate-800"
                  onClick={() => setActiveIdx(activeIdx === idx ? null : idx)}
                  aria-expanded={activeIdx === idx}
                >
                  <span className="font-medium flex items-center gap-2">
                    {menu.label === "Subjects" ? (
                      <Atom className="h-4 w-4" />
                    ) : (
                      <GraduationCapLike className="h-4 w-4" />
                    )}
                    {menu.label}
                  </span>
                  <ChevronDown
                    className={cn("h-4 w-4 transition-transform", activeIdx === idx && "rotate-180")}
                  />
                </button>

                <div className={cn("px-2 pb-3", activeIdx === idx ? "block" : "hidden")}>
                  {menu.columns.map((col) => {
                    const HIcon = HEADING_ICON[col.heading] ?? Briefcase;
                    return (
                      <div key={col.heading} className="px-2 pb-2">
                        <div className="px-2 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                          <HIcon className="h-3.5 w-3.5" />
                          {col.heading}
                        </div>
                        <ul className="rounded-lg overflow-hidden border border-slate-200">
                          {col.links.map((l) => {
                            const LIcon = LINK_ICON[l.label] ?? BookOpen;
                            return (
                              <li key={l.to} className="border-b last:border-b-0 border-slate-200">
                                <NavLink
                                  to={l.to}
                                  className={({ isActive }) =>
                                    cn(
                                      "flex items-center gap-2 px-3 py-2 text-sm",
                                      isActive ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50"
                                    )
                                  }
                                  onClick={() => setMobileOpen(false)}
                                >
                                  <LIcon className="h-4 w-4 text-slate-400" />
                                  {l.label}
                                </NavLink>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </li>
            ))}

            {/* simple links */}
            <li className="rounded-2xl border border-slate-200">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  cn("flex items-center gap-2 px-4 py-3 text-slate-800", isActive && "bg-blue-50 text-blue-700")
                }
                onClick={() => setMobileOpen(false)}
              >
                <InfoDotLike className="h-4 w-4" />
                About
              </NavLink>
            </li>
            <li className="rounded-2xl border border-slate-200">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  cn("flex items-center gap-2 px-4 py-3 text-slate-800", isActive && "bg-blue-50 text-blue-700")
                }
                onClick={() => setMobileOpen(false)}
              >
                <MessageCircle className="h-4 w-4" />
                Contact
              </NavLink>
            </li>

            <li className="flex gap-2">
              <Link
                to="/login"
                className="flex-1 rounded-xl border border-slate-300 px-3 py-2 text-center text-sm font-medium text-slate-700"
                onClick={() => setMobileOpen(false)}
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="flex-1 rounded-xl bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white"
                onClick={() => setMobileOpen(false)}
              >
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

/* tiny info icon fallback */
function InfoDotLike(props: any) {
  return <i {...props} className={cn(props.className, "relative inline-block")} />;
}
