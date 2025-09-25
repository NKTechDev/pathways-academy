// src/components/home/Hero.jsx
import { Link } from "react-router";
import { Sparkles } from "lucide-react";

/** Gradient palette per subject */
const SUBJECTS = [
  { label: "Physics",      to: "/subjects/physics",     grad: "from-rose-400 to-pink-500" },
  { label: "Chemistry",    to: "/subjects/chemistry",   grad: "from-indigo-400 to-violet-500" },
  { label: "Mathematics",  to: "/subjects/mathematics", grad: "from-sky-400 to-blue-500" },
  { label: "Biology",      to: "/subjects/biology",     grad: "from-rose-400 to-orange-500" },
  { label: "Economics",    to: "/subjects/economics",   grad: "from-emerald-400 to-teal-500" },
  { label: "Business",     to: "/subjects/business",    grad: "from-blue-700 to-slate-700" },
  { label: "Accounting",   to: "/subjects/accounting",  grad: "from-amber-400 to-orange-400" },
  { label: "Psychology",   to: "/subjects/psychology",  grad: "from-fuchsia-500 to-violet-500" },
];

const Avatar = ({ initials, className="" }) => (
  <div
    className={
      "inline-flex items-center justify-center rounded-full border-2 border-sky-50/80 " +
      "bg-gradient-to-br from-sky-400 to-blue-500 text-white text-xs font-semibold " +
      className
    }
    aria-hidden
  >
    {initials}
  </div>
);

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* sky blue background */}
      <div className="absolute inset-0 bg-sky-50" />
      {/* subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_10%,rgba(2,132,199,0.12),rgba(2,132,199,0)_70%)]" />
      
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:py-20 lg:py-24">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-800 text-center">
          Meet <span className="text-slate-900">Pathways Academy</span>
        </h1>
        <p className="mt-4 text-xl sm:text-2xl text-slate-700 text-center font-semibold">
          The World&apos;s Best A&nbsp;Level Learning Platform
        </p>
        <p className="mt-4 max-w-3xl mx-auto text-slate-600 text-center">
          Empowering <span className="font-semibold text-slate-800">60,000+ A&nbsp;Level students</span> globally
          through expertly crafted courses.
        </p>

        {/* CTAs + social proof */}
        <div className="mt-8 flex items-center justify-center gap-4 flex-wrap">
          <Link
            to="/start"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white 
                       px-5 py-3 text-slate-800 font-semibold shadow-sm hover:shadow-md transition"
          >
            Start for Free
          </Link>
          <Link
            to="/buy"
            className="inline-flex items-center justify-center rounded-xl bg-slate-800 px-5 py-3 
                       text-white font-semibold shadow-sm hover:bg-slate-700 transition"
          >
            Buy Now
          </Link>

          <div className="flex items-center gap-3 pl-4">
            {/* avatars stack */}
            <div className="flex -space-x-3">
              <Avatar initials="AN" className="h-9 w-9 z-30" />
              <Avatar initials="JS" className="h-9 w-9 z-20" />
              <Avatar initials="RM" className="h-9 w-9 z-10" />
            </div>
            <div className="flex items-center gap-2 text-slate-700">
              <span className="font-semibold">5k+</span>
              <Sparkles className="h-4 w-4 text-indigo-500" />
              <span>Active Users</span>
            </div>
          </div>
        </div>

        {/* Subjects row */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
          {SUBJECTS.map(({ label, to, grad }) => (
            <Link
              key={label}
              to={to}
              className={`w-[240px] sm:w-[260px] text-center rounded-2xl px-6 py-4 
                          text-white font-semibold shadow-md hover:shadow-lg transition 
                          bg-gradient-to-br ${grad}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
