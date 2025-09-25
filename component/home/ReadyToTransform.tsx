// src/components/home/ReadyToTransform.jsx
import { Link } from "react-router";

export default function ReadyToTransform() {
  return (
    <section className="relative overflow-hidden bg-sky-50 py-16 sm:py-20">
      {/* subtle radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(168,85,247,0.15),rgba(2,132,199,0.05)_60%,transparent_80%)]" />

      <div className="relative mx-auto max-w-5xl px-4 text-center">
        {/* Heading */}
        <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight tracking-tight text-slate-900">
          Ready to{" "}
          <span className="inline-block rounded-md bg-purple-200 px-2 py-1 align-baseline text-slate-900 shadow-[inset_0_-2px_0_rgba(0,0,0,0.06)]">
            Transform
          </span>{" "}
          Your
          <br className="hidden sm:block" /> Academic Journey?
        </h2>

        {/* Subheading */}
        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          Get instant access to expert-led courses, timed crash courses, and comprehensive
          resources that make A/A* grades achievable.
        </p>

        {/* CTA */}
        <div className="mt-7">
          <Link
            to="/start"
            className="inline-flex items-center justify-center rounded-xl bg-purple-700 px-6 py-3 text-white
                       font-semibold shadow-md transition hover:bg-purple-600 focus:outline-none focus:ring-2
                       focus:ring-purple-400"
          >
            Start Your A* Journey
          </Link>
        </div>

        {/* Illustration / mockup (replace src with your image) */}
        <div className="mt-10 flex justify-center">
          <img
            src="/assets/cta-phones.png"  // <-- replace with your phone illustration
            alt="Alt Academy mobile experience"
            className="w-[360px] max-w-full drop-shadow-xl"
            loading="lazy"
          />
        </div>
      </div>

      {/* soft top/bottom hairline for section separation */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
    </section>
  );
}
