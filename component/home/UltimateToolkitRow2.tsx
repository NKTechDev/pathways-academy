// src/components/home/UltimateToolkitRow2.jsx
import { Play, MessageCircle, Timer } from "lucide-react";

const Frame = ({ children, className = "" }) => (
  <div
    className={
      "rounded-[28px] border shadow-sm backdrop-blur px-5 py-6 sm:px-7 sm:py-7 " +
      className
    }
  >
    {children}
  </div>
);

const VideoShell = ({ ariaLabel = "Play preview" }) => (
  <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-3">
    <div className="rounded-xl border border-slate-200 overflow-hidden">
      <div className="relative aspect-[16/9] bg-slate-900/90">
        {/* Replace this whole block with your <video> or YouTube player later */}
        <button
          type="button"
          aria-label={ariaLabel}
          className="absolute inset-0 m-auto grid h-14 w-14 place-items-center rounded-full bg-sky-600 text-white shadow-lg transition hover:bg-sky-700"
          onClick={() => {}}
        >
          <Play className="h-6 w-6" />
        </button>
      </div>
    </div>
  </div>
);

export default function UltimateToolkitRow2() {
  return (
    <section className="relative w-full bg-sky-50/70 py-12 sm:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 lg:gap-6 md:grid-cols-2">
          {/* Left card — Expert Support */}
          <Frame className="bg-white/80 border-slate-200">
            <header className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                <MessageCircle className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-3xl font-extrabold tracking-tight text-slate-800">
                  Expert Support
                </h3>
                <p className="mt-1.5 text-slate-600">
                  Stuck on a question? Get help anytime, anywhere — on your
                  phone, laptop, or tablet.
                </p>
              </div>
            </header>

            <VideoShell ariaLabel="Play support preview" />
          </Frame>

          {/* Right card — Timed Crash Courses */}
          <Frame className="bg-amber-50/80 border-amber-200">
            <header className="flex items-start gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <Timer className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-3xl font-extrabold tracking-tight text-amber-800">
                  Timed Crash Courses
                </h3>
                <p className="mt-1.5 text-amber-900/80">
                  Turn months of revision into a clear, manageable plan with our
                  90- & 60-day crash courses. Perfect for busy students aiming
                  for top grades.
                </p>
              </div>
            </header>

            <VideoShell ariaLabel="Play crash course preview" />
          </Frame>
        </div>
      </div>
    </section>
  );
}
