// src/components/home/RealStories.jsx
import { Quote, Beaker } from "lucide-react";

/* ------- small WhatsApp-like name chip ------- */
const NameChip = ({ name }) => (
  <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
    <svg viewBox="0 0 32 32" className="w-4 h-4" aria-hidden>
      <path fill="#22c55e" d="M27 5a13 13 0 0 0-20.7 15L4 27.9a1 1 0 0 0 1.2 1.2L12 27.7A13 13 0 1 0 27 5Z"/>
      <path fill="#fff" d="M24.3 18.7c-.3-.2-1.8-.9-2-1s-.5-.2-.7 0-.8 1-1 1.2-.4.3-.7.1a9.2 9.2 0 0 1-2.7-1.7 10.3 10.3 0 0 1-1.9-2.4c-.2-.4 0-.6.1-.8l.5-.6c.1-.1.3-.4.1-.7s-1-2.1-1.2-2.5-.4-.4-.7-.4h-.6c-.2 0-.6.1-.9.4s-1.2 1.1-1.2 2.7 1.2 3 1.4 3.2a12.9 12.9 0 0 0 4 3.6c1.5.8 2.5 1 3.3 1.2a3 3 0 0 0 1.3 0c.4-.1 1.8-.7 2-1.3s.2-1.2.1-1.3 0-.2-.3-.3Z"/>
    </svg>
    {name}
  </span>
);

/* ------- card component ------- */
const TestimonialCard = ({ t }) => (
  <figure
    className={`relative rounded-2xl border px-5 py-5 md:px-6 md:py-6 shadow-sm ${t.bg} ${t.border}`}
  >
    {/* quote badge */}
    <span className="absolute left-4 top-4 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/80 ring-1 ring-black/5">
      <Quote className={`h-4 w-4 ${t.accent}`} />
    </span>

    {/* corner lab icon */}
    <span className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/90 ring-1 ring-black/5">
      <Beaker className={`h-4 w-4 ${t.accent}`} />
    </span>

    <blockquote className={`mt-6 whitespace-pre-line ${t.text}`}>
      {t.quote}
    </blockquote>

    <figcaption className="mt-5 flex items-center gap-2">
      <NameChip name={t.author} />
      {t.initials && (
        <span className="ml-auto inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-[10px] font-bold text-slate-600 ring-1 ring-black/5">
          {t.initials}
        </span>
      )}
    </figcaption>
  </figure>
);

/* ------- data (edit freely) ------- */
const TESTIMONIALS = [
  {
    quote: "This platform is the only way to change that U to an A*!",
    author: "RI",
    initials: "RI",
    bg: "bg-amber-50",
    border: "border-amber-200",
    accent: "text-amber-600",
    text: "text-slate-800",
  },
  {
    quote:
      "Sir I feel like I owe you an appreciation message... In only 1.5 months, I've completed Physical Chemistry and am halfway done with Organic Chemistry. Your way of teaching is sublime.",
    author: "Miron",
    initials: "MI",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    accent: "text-indigo-600",
    text: "text-indigo-900",
  },
  {
    quote: "From Ds to an A*! I finally understand Organic Chemistry!",
    author: "Ali K",
    initials: "AK",
    bg: "bg-violet-50",
    border: "border-violet-200",
    accent: "text-violet-600",
    text: "text-violet-900",
  },
  {
    quote:
      "Hello sir, this message is to thank you for your efforts and resources that helped me achieve an A in my AS results... All credits go to you Economics king ❤️",
    author: "Abdullah Shaikh",
    initials: "AS",
    bg: "bg-teal-50",
    border: "border-teal-200",
    accent: "text-teal-600",
    text: "text-slate-800",
  },
  {
    quote:
      "You guys helped me with my academic comeback! It’s insane. I’m too happy!",
    author: "JK",
    initials: "JK",
    bg: "bg-pink-50",
    border: "border-pink-200",
    accent: "text-pink-600",
    text: "text-pink-900",
  },
  {
    quote:
      "Team Alt is doing a great job by making A Levels feel like a walk in the park. I owe my A to you!",
    author: "RA",
    initials: "RA",
    bg: "bg-rose-50",
    border: "border-rose-200",
    accent: "text-rose-600",
    text: "text-rose-900",
  },
  {
    quote:
      "Love the platform! Thank you for my A. Would 100% recommend.",
    author: "Meesum",
    initials: "MS",
    bg: "bg-sky-50",
    border: "border-sky-200",
    accent: "text-sky-600",
    text: "text-sky-900",
  },
];

/* ------- section ------- */
export default function RealStories() {
  return (
    <section className="w-full bg-sky-50 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <header className="text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Real Stories, Real{" "}
            <span className="inline-block rounded-md bg-purple-200 px-2 py-1 align-baseline text-slate-900 shadow-[inset_0_-2px_0_rgba(0,0,0,0.06)]">
              Success
            </span>
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-slate-600">
            Thousands of students have achieved their dream grades with Alt Academy. It’s your turn now.
          </p>
        </header>

        {/* Grid (masonry-like heights via variable content) */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
