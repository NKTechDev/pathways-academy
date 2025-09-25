// src/components/home/StatsAndTestimonials.jsx
import { Beaker, Quote } from "lucide-react";

/** --- THEME (tuned to your sky-blue site) --- */
const theme = {
  bg: "bg-sky-50",
  ink: "text-slate-800",
  subInk: "text-slate-600",
  primary: "text-blue-700",
  ring: "focus:outline-none focus:ring-2 focus:ring-blue-500",
};

const STATS = [
  {
    value: "101",
    label: "Countries Reached",
    grad: "from-indigo-200 to-violet-200",
    text: "text-indigo-900",
    border: "border-indigo-200",
  },
  {
    value: "94%",
    label: "Student Success Rate",
    grad: "from-amber-200 to-orange-200",
    text: "text-amber-900",
    border: "border-amber-200",
  },
  {
    value: "29M",
    label: "Learning Minutes Watched",
    grad: "from-pink-200 to-rose-200",
    text: "text-rose-900",
    border: "border-pink-200",
  },
  {
    value: "20+",
    label: "Years of Experience",
    grad: "from-emerald-200 to-green-200",
    text: "text-emerald-900",
    border: "border-emerald-200",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Love the platform! Thank you for my A. Would 100% recommend.",
    name: "Meesum",
    card: "bg-sky-100/80",
    quoteDot: "bg-sky-500",
    corner: "text-sky-600",
  },
  {
    quote:
      "From Ds to an A*! I finally understand Organic Chemistry!",
    name: "Ali K",
    card: "bg-indigo-100/70",
    quoteDot: "bg-indigo-500",
    corner: "text-indigo-600",
  },
];

/** WhatsApp-like chip (tiny SVG so no extra deps) */
const WhatsAppChip = ({ name }) => (
  <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">
    <svg viewBox="0 0 32 32" className="w-4 h-4" aria-hidden>
      <path
        fill="#22c55e"
        d="M27 5a13 13 0 0 0-20.7 15L4 27.9a1 1 0 0 0 1.2 1.2L12 27.7A13 13 0 1 0 27 5Z"
      />
      <path
        fill="#fff"
        d="M24.3 18.7c-.3-.2-1.8-.9-2-1s-.5-.2-.7 0-.8 1-1 1.2-.4.3-.7.1a9.2 9.2 0 0 1-2.7-1.7 10.3 10.3 0 0 1-1.9-2.4c-.2-.4 0-.6.1-.8l.5-.6c.1-.1.3-.4.1-.7s-1-2.1-1.2-2.5-.4-.4-.7-.4h-.6c-.2 0-.6.1-.9.4s-1.2 1.1-1.2 2.7 1.2 3 1.4 3.2a12.9 12.9 0 0 0 4 3.6c1.5.8 2.5 1 3.3 1.2a3 3 0 0 0 1.3 0c.4-.1 1.8-.7 2-1.3s.2-1.2.1-1.3 0-.2-.3-.3Z"
      />
    </svg>
    {name}
  </span>
);

const StatCard = ({ v }) => (
  <div
    className={`rounded-3xl border ${v.border} bg-gradient-to-b ${v.grad} px-6 py-6 shadow-sm transition hover:shadow-md`}
  >
    <div className={`text-4xl md:text-5xl font-extrabold ${v.text} text-center`}>
      {v.value}
    </div>
    <div className="mt-2 text-center font-medium text-slate-700">{v.label}</div>
  </div>
);

const TestimonialCard = ({ t }) => (
  <figure
    className={`relative rounded-3xl ${t.card} border border-slate-200 px-6 py-6 md:px-8 md:py-8 shadow-sm`}
  >
    {/* quote badge */}
    <div className="absolute left-5 top-5">
      <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${t.quoteDot}`}>
        <Quote className="h-4 w-4 text-white" />
      </span>
    </div>

    {/* “lab” corner icon */}
    <div className="absolute right-5 top-5">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-300 bg-white">
        <Beaker className={`h-5 w-5 ${t.corner}`} />
      </span>
    </div>

    <blockquote className="mt-10 text-xl md:text-2xl font-semibold leading-snug text-blue-800">
      {t.quote}
    </blockquote>

    <figcaption className="mt-6">
      <WhatsAppChip name={t.name} />
    </figcaption>
  </figure>
);

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

        {/* TESTIMONIALS */}
        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
