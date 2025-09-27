// src/components/home/Hero.jsx
import { Link } from "react-router";
import {
  BookOpen,
  Calculator,
  FlaskConical,
  Microscope,
  Briefcase,
  LineChart,
  Cpu,
  BookText,
  Landmark,
  MessageCircle,
  FileText,
  Atom,
  PenTool,
  GraduationCap,

} from "lucide-react";
import { Sparkles } from "lucide-react";
import { Info } from "lucide-react";
import { Globe2 } from "lucide-react";

/** Subjects with icons + gradients */
export const SUBJECTS = [
  { label: "English", to: "/subjects/english", bg: "bg-indigo-100", Icon: BookOpen },
  { label: "Mathematics", to: "/subjects/mathematics", bg: "bg-sky-100", Icon: Calculator },
  { label: "Physics", to: "/subjects/physics", bg: "bg-rose-100", Icon: Atom },
  { label: "Biology", to: "/subjects/biology", bg: "bg-green-100", Icon: Microscope },
  { label: "Chemistry", to: "/subjects/chemistry", bg: "bg-cyan-100", Icon: FlaskConical },

  { label: "ICT", to: "/subjects/ict", bg: "bg-teal-100", Icon: LineChart },
  { label: "Computer Science", to: "/subjects/computer-science", bg: "bg-fuchsia-100", Icon: Cpu },
  { label: "Islamic Studies", to: "/subjects/islamiyat", bg: "bg-amber-100", Icon: BookText },
  { label: "Pakistan Studies", to: "/subjects/pakistan-studies", bg: "bg-cyan-100", Icon: Landmark },
  { label: "Urdu", to: "/subjects/urdu", bg: "bg-pink-100", Icon: MessageCircle },

  { label: "Business", to: "/subjects/business", bg: "bg-lime-100", Icon: Briefcase },
  { label: "Accounting", to: "/subjects/accounting", bg: "bg-purple-100", Icon: PenTool },
  { label: "Economics", to: "/subjects/economics", bg: "bg-orange-100", Icon: GraduationCap },

  { label: "A-Levels", to: "/subjects/a-levels", bg: "bg-slate-100", Icon: Sparkles },
];

const Avatar = ({ initials, className = "" }) => (
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

      <div className="relative mx-auto max-w-6xl px-4  sm:py-4 ">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-800 text-center">  <span className="text-slate-900">Pathways International School</span> </h1>
        <p className="mt-4 text-xl sm:text-2xl text-slate-700 text-center font-semibold">
          The Leading Online Platform for IGCSE and&nbsp; A-Level Success.
        </p>
        <p className="mt-4 max-w-3xl mx-auto text-slate-600 text-center">
          Supporting <span className="font-semibold text-slate-800">across 40+ countries</span> with expertly crafted IGCSE and A-Level courses
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
            Enroll Now
          </Link>

          <div className="flex items-center gap-3 pl-4">
            {/* avatars stack */}
            <div className="flex -space-x-3">
              <Avatar initials="AN" className="h-9 w-9 z-30" />
              <Avatar initials="JS" className="h-9 w-9 z-20" />
              <Avatar initials="RM" className="h-9 w-9 z-10" />
            </div>
          </div>
        </div>

        <div className="mt-10 border-t-4 border-sky-500 bg-slate-50 rounded-xl px-6 py-8 text-center shadow-sm">
          <Globe2 className="mx-auto mb-4 h-10 w-10 text-sky-600" aria-hidden="true" />
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-snug">
            Study <span className="px-2 py-0.5 bg-sky-100 rounded-md">anywhere</span>,
            test <span className="px-2 py-0.5 bg-emerald-100 rounded-md">everywhere</span>
          </h2>
          <p className="mt-2 text-lg font-medium text-slate-700">
            Your pathway to British Council exams <span className="px-2 py-0.5 bg-sky-100 rounded-md">as reguler candidate</span> in Pakistan.
          </p>
        </div>


        <h1 className="text-4xl mt-5 sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-800 text-center">
          IGCSE & O-level <span className="text-slate-900">Subjects</span>
        </h1>
        {/* Subjects row */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 items-stretch">
          {SUBJECTS.map((s) => (
            <Link
              key={s.label}
              to={s.to}
              className={`flex flex-col items-center justify-center text-center 
          p-4 rounded-lg ${s.bg} 
          hover:shadow-md hover:-translate-y-0.5 transition
          w-full h-28`}
            >
              <s.Icon className="h-7 w-7 text-slate-800 mb-2" />
              <span className="text-slate-800 font-medium">{s.label}</span>
            </Link>
          ))}
        </div>



        <div
          role="note"
          className="mx-auto mt-4 max-w-3xl rounded-xl border border-blue-200 bg-[linear-gradient(135deg,#eff6ff,#e0f2fe)] p-4 shadow-sm"
        >
          <div className="flex gap-3">
            <Info className="h-5 w-5 mt-0.5 text-blue-600" aria-hidden />
            <div className="text-sm text-slate-700">
              <p className="font-semibold">Please note</p>
              <ul className="mt-1 list-disc pl-5 space-y-1">
                <li>
                  Independent learners are usually registered with the British Council as
                  <span className="font-medium"> private candidates</span>.
                </li>
                <li>Have a valid CNIC/passport and ensure your name matches your ID.</li>
                <li>
                  Registration windows, fees, and test centre availability vary—always check the latest
                  British Council Pakistan guidance before applying.
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
