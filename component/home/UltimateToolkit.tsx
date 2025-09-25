// src/components/home/UltimateToolkit.jsx
import { Play } from "lucide-react";

const Card = ({ title, blurb, tint, border }) => {
  return (
    <article
      className={`rounded-[22px] border ${border} bg-white/70 shadow-sm backdrop-blur px-5 py-6 sm:px-7 sm:py-7`}
    >
      <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${tint}`}>
        {title}
      </h3>
      <p className="mt-2 text-slate-600">
        {blurb}
      </p>

      {/* “Video area” – swap with your player later */}
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-3">
        {/* Fake course header image block */}
        <div className="rounded-xl border border-slate-200 overflow-hidden">
          <div className="aspect-[16/9] relative bg-slate-900/90">
            {/* Poster placeholder – replace with <img src="..." /> if you have one */}
            {/* Play button */}
            <button
              type="button"
              aria-label="Play preview"
              className="absolute inset-0 m-auto grid h-14 w-14 place-items-center rounded-full bg-sky-600 text-white shadow-lg transition hover:bg-sky-700"
              onClick={() => {}}
            >
              <Play className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default function UltimateToolkit() {
  return (
    <section className="relative w-full bg-sky-50/80">
      {/* soft frame line like your reference */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-300/60 via-sky-300/60 to-purple-300/60" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        {/* Heading */}
        <header className="text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            The{" "}
            <span className="inline-flex -mx-1 rounded-xl bg-purple-200 px-2 py-1 align-baseline text-slate-900 shadow-[inset_0_-2px_0_rgba(0,0,0,0.06)]">
              <span className="mx-1">Ultimate</span>
            </span>{" "}
            A Level Toolkit
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-slate-600">
            Our platform has helped students across <span className="font-semibold">100+ countries</span> achieve their dream grades.
            It’s not just a promise — it’s our guarantee.
          </p>
        </header>

        {/* Cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 lg:gap-6 md:grid-cols-2">
          <Card
            title="Epic Courses Made by The Best"
            blurb="Learn from teachers who've helped students score A*s for 26+ years. Our video lessons break down complex topics into digestible chunks that stick."
            tint="text-rose-700"
            border="border-rose-200"
          />
          <Card
            title="Past Paper Mastery"
            blurb="Watch top teachers solve exam questions step-by-step so you see exactly what examiners want — and how to score every mark."
            tint="text-violet-700"
            border="border-violet-200"
          />
        </div>
      </div>

      {/* rounded border like screenshot */}
      <div className="pointer-events-none absolute inset-3 rounded-3xl border border-purple-200/70"></div>
    </section>
  );
}
