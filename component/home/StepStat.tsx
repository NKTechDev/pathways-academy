// src/components/home/ThreeSteps.jsx
import React from "react";

/* small badge used for 1/2/3 */
const StepBadge = ({ n }) => (
  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-purple-700 text-white text-xl font-extrabold shadow-sm">
    {n}
  </span>
);

/* minimalist SVGs (replace with your own images if you like) */
const MoneySVG = () => (
  <svg viewBox="0 0 128 96" className="w-32 h-24" aria-hidden>
    <rect x="6" y="14" width="116" height="68" rx="12" fill="#e0f2fe" />
    <rect x="18" y="26" width="92" height="44" rx="10" fill="#fff" />
    <circle cx="64" cy="48" r="14" fill="#0ea5e9" />
    <path d="M64 58c5 0 7-6 0-6s-5-8 0-8" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M64 36v4m0 24v-4" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

const PhoneSVG = () => (
  <svg viewBox="0 0 84 120" className="w-24 h-28" aria-hidden>
    <rect x="14" y="6" width="56" height="108" rx="12" fill="#f1f5f9" />
    <rect x="20" y="20" width="44" height="70" rx="8" fill="#fff" />
    <circle cx="42" cy="72" r="9" fill="#0ea5e9" />
    <rect x="28" y="30" width="28" height="8" rx="4" fill="#cbd5e1" />
    <rect x="30" y="96" width="24" height="6" rx="3" fill="#cbd5e1" />
  </svg>
);

const GradeSVG = () => (
  <svg viewBox="0 0 128 96" className="w-32 h-24" aria-hidden>
    <rect x="16" y="10" width="96" height="76" rx="10" fill="#fff" stroke="#e9d5ff" strokeWidth="3" />
    <path d="M42 58l10 10 24-30" stroke="#22c55e" strokeWidth="6" fill="none" strokeLinecap="round" />
    <rect x="26" y="20" width="60" height="8" rx="4" fill="#c4b5fd" />
    <text x="94" y="34" fontSize="22" fontWeight="700" fill="#7c3aed">A+</text>
  </svg>
);

export default function ThreeSteps() {
  return (
    <section className="w-full bg-sky-50 py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <header className="text-center">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Three Steps to{" "}
            <span className="inline-block rounded-md bg-purple-200 px-2 py-1 align-baseline text-slate-900 shadow-[inset_0_-2px_0_rgba(0,0,0,0.06)]">
              A Level Success
            </span>
          </h2>
        </header>

        {/* subtle dashed divider */}
        <div className="mx-auto mt-6 h-px max-w-4xl border-t border-dashed border-slate-300" />

        {/* Steps */}
        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <StepBadge n={1} />
            <h3 className="mt-4 text-xl font-extrabold text-slate-900">Choose Your Plan</h3>
            <p className="mt-2 max-w-xs text-slate-600">
              Pick the subjects you need help with, along with the pricing plan that works best for you.
            </p>
            <div className="mt-6">
              <MoneySVG />
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <StepBadge n={2} />
            <h3 className="mt-4 text-xl font-extrabold text-slate-900">Quick Sign-up</h3>
            <p className="mt-2 max-w-xs text-slate-600">
              Takes just 2 minutes—no complicated forms, just quick access to top-tier learning.
            </p>
            <div className="mt-6">
              <PhoneSVG />
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <StepBadge n={3} />
            <h3 className="mt-4 text-xl font-extrabold text-slate-900">Start Excelling</h3>
            <p className="mt-2 max-w-xs text-slate-600">
              Dive into comprehensive, engaging courses that help make your A/A* dream come true.
            </p>
            <div className="mt-6">
              <GradeSVG />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
