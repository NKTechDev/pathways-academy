// src/components/home/GotQuestions.jsx
import { useState } from "react";
import { ChevronDown, HelpCircle, PhoneCall } from "lucide-react";
import { Link } from "react-router";

/* --- FAQ DATA --- */
const FAQ = [
  {
    q: "Which subjects do you offer?",
    a: "We cover popular A Level subjects—Maths, Physics, Chemistry, Biology, English, Computer Science, Economics, Accounting—and more rolling out each term.",
  },
  {
    q: "Which exam boards do you support?",
    a: "CAIE / Cambridge, Edexcel, AQA, and OCR. Lessons flag board-specific differences and past-paper styles.",
  },
  {
    q: "Do you offer live support?",
    a: "Yes. Ask questions 24/7 and join weekly live support blocks where teachers solve your doubts on the spot.",
  },
  {
    q: "Will I have access to teachers if I have questions?",
    a: "Absolutely—post your question and a verified teacher replies with steps, hints, or worked solutions.",
  },
  {
    q: "Can I try before buying?",
    a: "You can explore free sample lessons and quizzes. Paid plans come with a no-questions-asked 7-day refund window.",
  },
  {
    q: "What if I’ve paid but don’t want to continue with my subscription?",
    a: "You can cancel anytime from your dashboard. Your access remains active until the end of the billing period.",
  },
];

/* --- Accordion Item --- */
function Item({ id, q, a, openId, setOpenId }) {
  const open = openId === id;
  return (
    <div className="rounded-xl border border-white/20 bg-white/90 p-3 shadow-sm backdrop-blur">
      <button
        className="flex w-full items-center justify-between gap-3 text-left"
        aria-expanded={open}
        aria-controls={`faq-panel-${id}`}
        onClick={() => setOpenId(open ? null : id)}
      >
        <span className="text-sm font-semibold text-slate-800">{q}</span>
        <ChevronDown
          className={`h-4 w-4 text-purple-700 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        id={`faq-panel-${id}`}
        role="region"
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function GotQuestions() {
  const [openId, setOpenId] = useState(0);

  return (
    <section className="relative bg-purple-700">
      {/* subtle texture/gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_0%,rgba(255,255,255,0.10),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Left: intro */}
          <div className="text-white">
            <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight">
              Got{" "}
              <span className="inline-block rounded-md bg-white px-2 py-1 text-purple-800 align-baseline">
                Questions?
              </span>
            </h2>
            <p className="mt-4 max-w-md text-purple-100">
              Find answers to common questions here. Still unsure? Book a free
              consultation with our team—We’re here to help you succeed.
            </p>

            <Link
              to="/contact"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/90 px-4 py-2 text-sm font-semibold text-purple-800 shadow-sm transition hover:bg-white"
            >
              <HelpCircle className="h-4 w-4" />
              Contact Us
            </Link>
          </div>

          {/* Right: FAQ grid */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {FAQ.map((f, i) => (
              <Item
                key={i}
                id={i}
                q={f.q}
                a={f.a}
                openId={openId}
                setOpenId={setOpenId}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA card */}
        <div className="mt-12">
          <div className="mx-auto max-w-4xl rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
            <div className="flex flex-col items-center gap-4 p-5 sm:flex-row sm:justify-between">
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-extrabold text-slate-900">
                  Still confused? Get in touch with us.
                </h3>
                <p className="text-sm text-slate-600">
                  Get personalized support and the answers to all your questions.
                </p>
              </div>
              <Link
                to="/book-a-call"
                className="inline-flex items-center gap-2 rounded-xl bg-purple-700 px-4 py-2 text-white font-semibold shadow-sm transition hover:bg-purple-600"
              >
                <PhoneCall className="h-4 w-4" />
                Book a Call
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
