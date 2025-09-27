// src/components/home/StatsAndTestimonials.jsx
import React, { memo } from "react";
import {
  Beaker,
  Quote,
  Globe2,
  Trophy,
  PlayCircle,
  BadgeCheck,
  Star,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";
import {
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

/** --- THEME (sky-blue friendly) --- */
const theme = {
  bg: "bg-sky-50",
  ink: "text-slate-800",
  subInk: "text-slate-600",
  ring:
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-sky-50",
};

/** Stats with linear-gradient cards */
const STATS = [
  {
    value: "40",
    label: "Countries Reached",
    bg: "bg-indigo-100",
    Icon: Globe2,
  },
  {
    value: "93%",
    label: "Student Success Rate",
    bg: "bg-amber-100",
    Icon: Trophy,
  },
  {
    value: "29M",
    label: "Learning Minutes Watched",
    bg: "bg-pink-100",
    Icon: PlayCircle,
  },
  {
    value: "18+",
    label: "Years of Experience",
    bg: "bg-emerald-100",
    Icon: BadgeCheck,
  },
];


/** Testimonials */
const TESTIMONIALS = [
  {
    quote: "Love the platform! Thank you for my A. Would 100% recommend.",
    name: "Meesum",
    card: "bg-sky-100",
  },
  {
    quote: "From Ds to an A*! I finally understand Organic Chemistry!",
    name: "Ali K",
    card: "bg-indigo-100",
  },
];


/** WhatsApp-like chip (tiny SVG; no deps) */
const WhatsAppChip = memo(function WhatsAppChip({ name }) {
  return (
    <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
      <svg viewBox="0 0 32 32" className="w-4 h-4" aria-hidden>
        <path fill="#22c55e" d="M27 5a13 13 0 0 0-20.7 15L4 27.9a1 1 0 0 0 1.2 1.2L12 27.7A13 13 0 1 0 27 5Z" />
        <path fill="#fff" d="M24.3 18.7c-.3-.2-1.8-.9-2-1s-.5-.2-.7 0-.8 1-1 1.2-.4.3-.7.1a9.2 9.2 0 0 1-2.7-1.7 10.3 10.3 0 0 1-1.9-2.4c-.2-.4 0-.6.1-.8l.5-.6c.1-.1.3-.4.1-.7s-1-2.1-1.2-2.5-.4-.4-.7-.4h-.6c-.2 0-.6.1-.9.4s-1.2 1.1-1.2 2.7 1.2 3 1.4 3.2a12.9 12.9 0 0 0 4 3.6c1.5.8 2.5 1 3.3 1.2a3 3 0 0 0 1.3 0c.4-.1 1.8-.7 2-1.3s.2-1.2.1-1.3 0-.2-.3-.3Z" />
      </svg>
      {name}
    </span>
  );
});

/** Reusable stat card (linear gradient background) */
const StatCard = memo(function StatCard({ v }) {
  return (
    <div
      className={`group rounded-3xl ${v.bg} px-6 py-6 shadow-sm border border-slate-200 
                  hover:shadow-md hover:-translate-y-0.5 transition ${theme.ring}`}
      role="figure"
      aria-label={`${v.value} ${v.label}`}
      tabIndex={0}
    >
      <div className="flex items-center justify-center mb-3">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white border border-slate-200 shadow-sm">
          <v.Icon className="h-6 w-6 text-slate-800" aria-hidden />
        </span>
      </div>
      <div className="text-4xl md:text-5xl font-extrabold text-slate-800 text-center">{v.value}</div>
      <div className="mt-2 text-center font-medium text-slate-700">{v.label}</div>
    </div>
  );
});


/** Professional Pie Chart with per-slice linear gradients (Recharts) */
const ChartCard = memo(function ChartCard() {
  const data = [
    { name: "Sciences",      value: 38 },
    { name: "Mathematics",   value: 22 },
    { name: "Business/Econ", value: 18 },
    { name: "Humanities",    value: 12 },
    { name: "Languages",     value: 10 },
  ];

  // Gradient pairs for slices
  const GRADS = [
    ["#3b82f6", "#60a5fa"], // blue
    ["#10b981", "#34d399"], // emerald
    ["#f59e0b", "#fbbf24"], // amber
    ["#a78bfa", "#c4b5fd"], // violet
    ["#64748b", "#94a3b8"], // slate
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800">Learners by Stream (IGCSE)</h3>
      <div className="mt-4 h-[340px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RePieChart>
            {/* Define linear gradients for each slice */}
            <defs>
              {GRADS.map(([from, to], i) => (
                <linearGradient key={i} id={`grad${i}`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={from} />
                  <stop offset="100%" stopColor={to} />
                </linearGradient>
              ))}
            </defs>

            <Tooltip
              formatter={(val, name) => [`${val}%`, name]}
              contentStyle={{ borderRadius: 12 }}
            />
            <Legend verticalAlign="bottom" height={28} />

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="55%"
              outerRadius="90%"
              paddingAngle={2}
              isAnimationActive
            >
              {data.map((_, i) => (
                <Cell key={i} fill={`url(#grad${i % GRADS.length})`} />
              ))}
            </Pie>
          </RePieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

/** Testimonial card with soft linear background */
const TestimonialCard = memo(function TestimonialCard({ t }) {
  return (
    <figure
      className={`relative rounded-3xl ${t.card} border border-slate-200 px-6 py-6 md:px-8 md:py-8 shadow-sm
                  hover:shadow-md hover:-translate-y-0.5 transition ${theme.ring}`}
      tabIndex={0}
    >
      <div className="flex items-center gap-1" aria-label="5 star rating">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
        ))}
      </div>
      <blockquote className="mt-3 text-lg md:text-xl font-semibold leading-snug text-slate-800">
        {t.quote}
      </blockquote>
      <figcaption className="mt-5">
        <WhatsAppChip name={t.name} />
      </figcaption>
    </figure>
  );
});


/** Register CTA */
const RegisterCTA = memo(function RegisterCTA() {
  return (
    <div className="mt-12 rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm bg-[linear-gradient(135deg,#e0f2fe,#dbeafe)]">
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Ready to start? Join thousands learning smarter.
          </h3>
          <p className="mt-1 text-slate-700">Create your free account in minutes. No credit card required.</p>
        </div>
        <div className="flex gap-3">
          <Link
            to="/register"
            className={`inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-white font-semibold shadow-sm hover:bg-slate-800 transition ${theme.ring}`}
          >
            Register Now <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/start"
            className={`inline-flex items-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-slate-800 font-semibold shadow-sm hover:shadow-md transition ${theme.ring}`}
          >
            Try for Free
          </Link>
        </div>
      </div>
    </div>
  );
});

export default function StatsAndTestimonials() {
  return (
    <section className={`${theme.bg} py-14 md:py-16`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {STATS.map((s) => (
            <StatCard key={s.label} v={s} />
          ))}
        </div>

        {/* PIE CHART (Recharts with gradients) */}
        <div className="mt-10 md:mt-12 grid grid-cols-1">
          <ChartCard />
        </div>

        {/* TESTIMONIALS */}
        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>

        {/* REGISTER CTA */}
        <RegisterCTA />
      </div>
    </section>
  );
}
