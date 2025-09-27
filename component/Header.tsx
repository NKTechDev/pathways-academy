import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import {
  Menu,
  X,
  ChevronDown,
  Atom,
  Languages as LanguagesIcon,
  Briefcase,
  Calculator,
  FlaskConical,
  Microscope,
  BookOpen,
  Globe,
  MessageCircle,
  Banknote,
  LineChart,
  GraduationCap,
  Info,
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
          { label: "Computer Science", to: "/programs/cs" },
          { label: "ICT", to: "/programs/ict" },
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
          { label: "Pakistan Studies", to: "/programs/pakstudies" },
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

/* ---------- icons ---------- */
const HEADING_ICON: Record<string, React.ComponentType<any>> = {
  Science: Atom,
  Languages: LanguagesIcon,
  Commerce: Briefcase,
  "IGCSE / O-Levels": BookOpen,
  "AS / A-Levels": GraduationCap,
  IELTS: Globe,
};
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

/* ---------- utils ---------- */
const cn = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");
const useIsCoarsePointer = () => {
  const [coarse, setCoarse] = useState(false);
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setCoarse(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);
  return coarse;
};

/* ---------- component ---------- */
export default function MegaNavbar() {
  const location = useLocation();
  const isCoarse = useIsCoarsePointer();
  const navRef = useRef<HTMLDivElement | null>(null);

  // Desktop hover/click state
  const [desktopOpenIdx, setDesktopOpenIdx] = useState<number | null>(null);

  // Mobile sheet + accordion
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileAccordionIdx, setMobileAccordionIdx] = useState<number | null>(null);

  // hover controls
  const closeTimer = useRef<number | null>(null);
  const switchTimer = useRef<number | null>(null);
  const hoverEnabled = useMemo(() => !isCoarse, [isCoarse]);
  const HOVER_SWITCH_DELAY = 160;

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = (ms = 120) => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setDesktopOpenIdx(null), ms);
  };

  const scheduleSwitchTo = (idx: number) => {
    if (!hoverEnabled) return;
    if (switchTimer.current) window.clearTimeout(switchTimer.current);
    switchTimer.current = window.setTimeout(() => {
      setDesktopOpenIdx(idx);
      switchTimer.current = null;
    }, HOVER_SWITCH_DELAY);
  };
  const cancelSwitch = () => {
    if (switchTimer.current) {
      window.clearTimeout(switchTimer.current);
      switchTimer.current = null;
    }
  };

  const isMenuRouteActive = (menu: MegaMenu) => {
    const all = [menu.to, ...menu.columns.flatMap((c) => c.links.map((l) => l.to))];
    return all.some((p) => location.pathname === p || location.pathname.startsWith(p + "/"));
  };

  // ESC / outside click
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDesktopOpenIdx(null);
        setMobileOpen(false);
        setMobileAccordionIdx(null);
      }
    };
    const onDown = (e: MouseEvent) => {
      if (!navRef.current) return;
      if (!navRef.current.contains(e.target as Node)) setDesktopOpenIdx(null);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, []);

  // cleanup timers
  useEffect(() => () => { cancelSwitch(); clearCloseTimer(); }, []);

  // reset on route change
  useEffect(() => {
    setDesktopOpenIdx(null);
    setMobileOpen(false);
    setMobileAccordionIdx(null);
  }, [location.pathname]);

  // lock scroll for mobile sheet
  useEffect(() => {
    const cls = ["overflow-hidden", "touch-none"];
    if (mobileOpen) document.body.classList.add(...cls);
    else document.body.classList.remove(...cls);
    return () => document.body.classList.remove(...cls);
  }, [mobileOpen]);

  // avoid horizontal scroll wiggle
  useEffect(() => {
    document.documentElement.classList.add("overflow-x-clip");
    document.body.classList.add("overflow-x-clip");
    return () => {
      document.documentElement.classList.remove("overflow-x-clip");
      document.body.classList.remove("overflow-x-clip");
    };
  }, []);

  const onWrapperBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const next = e.relatedTarget as Node | null;
    if (navRef.current && next && navRef.current.contains(next)) return;
    setDesktopOpenIdx(null);
  };

  const alignClass = (align?: MenuAlign) =>
    align === "start" ? "left-0" : align === "end" ? "right-0" : "left-1/2 -translate-x-1/2";

  return (
    <header className="sticky shadow-lg top-0 z-50 bg-white/80 backdrop-blur border-b border-slate-200 overflow-x-clip">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8" ref={navRef} onBlur={onWrapperBlur}>
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Brand */}
          <Link to="/" aria-label="Pathways Academy" className="block">
            <img
              src="/pathways.png"
              alt="Pathways Academy"
              className="h-9 sm:h-10 w-auto object-contain rounded-md"
              loading="lazy"
              height={40}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-stretch gap-1.5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60",
                  isActive ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200" : "text-slate-700 hover:bg-slate-100"
                )
              }
            >
              <BookOpen className="h-4 w-4" />
              Home
            </NavLink>

            {MENUS.map((menu, idx) => {
              const routeActive = isMenuRouteActive(menu);
              const open = desktopOpenIdx === idx;

              return (
                <div
                  key={menu.label}
                  className="relative"
                  onMouseEnter={
                    hoverEnabled
                      ? () => {
                          clearCloseTimer();
                          scheduleSwitchTo(idx);
                        }
                      : undefined
                  }
                  onMouseLeave={hoverEnabled ? () => { cancelSwitch(); scheduleClose(); } : undefined}
                >
                  {/* Split trigger: label navigates, caret toggles */}
                  <div className="inline-flex items-stretch">
                    <NavLink
                      to={menu.to}
                      className={({ isActive }) =>
                        cn(
                          "inline-flex items-center rounded-l-lg px-3 py-2 text-sm font-medium border border-slate-200",
                          (isActive || routeActive || open)
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : "text-slate-700 hover:bg-slate-100"
                        )
                      }
                      onFocus={() => setDesktopOpenIdx(idx)}
                      onClick={() => setDesktopOpenIdx(null)}
                    >
                      {menu.label === "Subjects" ? (
                        <Atom className="h-4 w-4 mr-1 opacity-80" />
                      ) : (
                        <GraduationCap className="h-4 w-4 mr-1 opacity-80" />
                      )}
                      {menu.label}
                    </NavLink>

                    <button
                      type="button"
                      aria-label={`Toggle ${menu.label} menu`}
                      aria-expanded={open}
                      aria-haspopup="true"
                      onClick={() => setDesktopOpenIdx((p) => (p === idx ? null : idx))}
                      onFocus={() => setDesktopOpenIdx(idx)}
                      className={cn(
                        "inline-flex items-center rounded-r-lg px-2.5 py-2 border border-l-0 border-slate-200 transition",
                        (routeActive || open) ? "bg-blue-50 text-blue-700 border-blue-200" : "text-slate-700 hover:bg-slate-100"
                      )}
                    >
                      <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
                    </button>
                  </div>

                  {/* Mega panel (desktop) — pointer events ONLY when open */}
                  <div
                    className={cn(
                      "absolute mt-1 z-[60] transition",
                      "w-[52rem] max-w-[min(96vw,56rem)]",
                      alignClass(menu.align),
                      open ? "pointer-events-auto" : "pointer-events-none"
                    )}
                    onMouseEnter={hoverEnabled ? clearCloseTimer : undefined}
                    onMouseLeave={hoverEnabled ? () => scheduleClose() : undefined}
                  >
                    <div
                      className={cn(
                        "rounded-xl border border-slate-200 bg-white shadow-xl ring-1 ring-black/5 overflow-hidden",
                        "transition-all duration-150 ease-out origin-top",
                        open ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-1 scale-[0.998]"
                      )}
                      role="dialog"
                      aria-label={`Explore ${menu.label}`}
                    >
                      {/* Header row (compact) */}
                      <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200">
                        <div className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-blue-600">
                            {menu.label === "Subjects" ? <Atom className="h-4 w-4" /> : <GraduationCap className="h-4 w-4" />}
                          </span>
                          Explore {menu.label}
                        </div>
                        <Link
                          to={menu.to}
                          className="text-xs font-medium text-blue-700 hover:underline"
                          onClick={() => setDesktopOpenIdx(null)}
                        >
                          View all →
                        </Link>
                      </div>

                      {/* Columns */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 px-1.5 py-3">
                        {menu.columns.map((col, i) => {
                          const HeadingIcon = HEADING_ICON[col.heading] ?? Briefcase;
                          return (
                            <div key={col.heading} className={cn("px-3", i !== 0 && "md:border-l border-slate-200", "min-w-0")}>
                              <div className="mb-1.5 flex items-center justify-between">
                                <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                                  <HeadingIcon className="h-3.5 w-3.5" />
                                  {col.heading}
                                </span>
                                <span className="rounded bg-slate-100 px-1 py-0.5 text-[10px] text-slate-600">
                                  {col.links.length}
                                </span>
                              </div>

                              <ul className="rounded-lg overflow-hidden">
                                {col.links.map((l) => {
                                  const RowIcon = LINK_ICON[l.label] ?? BookOpen;
                                  return (
                                    <li key={l.to}>
                                      <NavLink
                                        to={l.to}
                                        className={({ isActive }) =>
                                          cn(
                                            "group flex items-center justify-between gap-3 px-2.5 py-2 text-[13px] transition",
                                            "hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50",
                                            isActive ? "bg-blue-50 text-blue-700" : "text-slate-700"
                                          )
                                        }
                                        onClick={() => setDesktopOpenIdx(null)}
                                      >
                                        <span className="flex items-center gap-2 min-w-0">
                                          <RowIcon className="h-4 w-4 shrink-0 text-slate-400 group-hover:text-slate-500" />
                                          <span className="truncate">{l.label}</span>
                                        </span>
                                        <span className="text-slate-300 group-hover:text-slate-400">›</span>
                                      </NavLink>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          );
                        })}
                      </div>

                      {/* CTA (short) */}
                      <div className="px-4 py-3 border-t border-slate-200">
                        <div className="flex items-center justify-between rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-3 py-2 text-white">
                          <div className="space-y-0">
                            <div className="text-[11px] opacity-90 leading-4">New Session</div>
                            <div className="text-sm font-semibold leading-5">Admissions Open — Fall 2025</div>
                          </div>
                          <Link
                            to="/admissions/apply"
                            className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium hover:bg-white/20"
                            onClick={() => setDesktopOpenIdx(null)}
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
                  "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60",
                  isActive ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200" : "text-slate-700 hover:bg-slate-100"
                )
              }
            >
              <Info className="h-4 w-4" />
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                cn(
                  "inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60",
                  isActive ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200" : "text-slate-700 hover:bg-slate-100"
                )
              }
            >
              <MessageCircle className="h-4 w-4" />
              Contact
            </NavLink>
          </nav>

          {/* Right actions (desktop) */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link
              to="/login"
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
            >
              Sign up
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 text-slate-700"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ========= Mobile Overlay & Sheet ========= */}
      <div className={cn("lg:hidden", mobileOpen ? "fixed inset-0 z-50" : "hidden")}>
        <button
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
          className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"
        />
        <div
          role="dialog"
          aria-modal="true"
          className={cn(
            "absolute inset-x-0 top-14 sm:top-16 bg-white shadow-xl border-t border-slate-200 h-[calc(100dvh-3.5rem)] sm:h-[calc(100dvh-4rem)]",
            "transition-transform duration-200 ease-out translate-y-0 will-change-transform overflow-x-clip"
          )}
        >
          <div className="mx-auto h-full max-w-7xl px-3 sm:px-6 lg:px-8">
            <ul className="space-y-2 h-full overflow-y-auto pr-1">
              {MENUS.map((menu, idx) => {
                const expanded = mobileAccordionIdx === idx;
                return (
                  <li key={menu.label} className="rounded-xl border border-slate-200 overflow-hidden">
                    <button
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-slate-900"
                      onClick={() => setMobileAccordionIdx(expanded ? null : idx)}
                      aria-expanded={expanded}
                      aria-controls={`mobile-panel-${idx}`}
                    >
                      <span className="font-medium flex items-center gap-2">
                        {menu.label === "Subjects" ? <Atom className="h-5 w-5" /> : <GraduationCap className="h-5 w-5" />}
                        {menu.label}
                      </span>
                      <ChevronDown className={cn("h-5 w-5 transition-transform", expanded && "rotate-180")} />
                    </button>

                    <div
                      id={`mobile-panel-${idx}`}
                      className={cn(
                        "grid grid-rows-[0fr] transition-[grid-template-rows] duration-200 ease-in-out",
                        expanded && "grid-rows-[1fr]"
                      )}
                    >
                      <div className="overflow-hidden">
                        <div className="px-2 pb-2 grid grid-cols-1 gap-2">
                          {menu.columns.map((col) => {
                            const HIcon = HEADING_ICON[col.heading] ?? Briefcase;
                            return (
                              <div key={col.heading} className="px-2 pb-2">
                                <div className="px-2 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                                  <HIcon className="h-4 w-4" />
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
                                              "flex items-center gap-3 px-3 py-3 text-[15px]",
                                              isActive ? "bg-blue-50 text-blue-700" : "text-slate-700 hover:bg-slate-50"
                                            )
                                          }
                                          onClick={() => {
                                            setMobileOpen(false);
                                            setMobileAccordionIdx(null);
                                          }}
                                        >
                                          <LIcon className="h-5 w-5 text-slate-400 shrink-0" />
                                          <span className="truncate">{l.label}</span>
                                        </NavLink>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}

              <li className="rounded-xl border border-slate-200">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    cn("flex items-center gap-3 px-4 py-3 text-slate-900", isActive && "bg-blue-50 text-blue-700")
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  <Info className="h-5 w-5" />
                  About
                </NavLink>
              </li>
              <li className="rounded-xl border border-slate-200">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    cn("flex items-center gap-3 px-4 py-3 text-slate-900", isActive && "bg-blue-50 text-blue-700")
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  <MessageCircle className="h-5 w-5" />
                  Contact
                </NavLink>
              </li>

              <li className="flex gap-2 sticky bottom-0 bg-white pt-2 pb-[max(env(safe-area-inset-bottom),0.75rem)]">
                <Link
                  to="/login"
                  className="flex-1 rounded-lg border border-slate-300 px-3 py-3 text-center text-sm font-medium text-slate-700"
                  onClick={() => setMobileOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="flex-1 rounded-lg bg-blue-600 px-3 py-3 text-center text-sm font-semibold text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign up
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* ========= /Mobile Overlay & Sheet ========= */}
    </header>
  );
}
