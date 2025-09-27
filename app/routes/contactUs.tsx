// src/pages/contact/ContactUs.jsx
import React, { useState } from "react";
import axios from "axios";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Contact Pathways Academy — Get in Touch" },
    {
      name: "description",
      content:
        "Contact Pathways Academy to learn more about admissions, courses, and academic support. Reach out via phone, email, or visit our campus — our team is ready to guide you.",
    },
    // Open Graph
    { property: "og:title", content: "Contact Pathways Academy — Get in Touch" },
    {
      property: "og:description",
      content:
        "Have questions about admissions, courses, or IELTS/O-A Levels preparation? Contact Pathways Academy today and let our expert team assist you.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://pathwaysacademy.com/contact" }, // 🔄 update with your actual contact page URL
    { property: "og:image", content: "https://pathwaysacademy.com/og-logo.png" }, // 🔄 update with your actual OG logo/banner
    // Twitter card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Contact Pathways Academy — Get in Touch" },
    {
      name: "twitter:description",
      content:
        "Connect with Pathways Academy for admissions, course details, or student support. We’re here to help you succeed.",
    },
    { name: "twitter:image", content: "https://pathwaysacademy.com/og-logo.png" },
  ];
}


import {
  AlertCircle,
  CheckCircle2,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Loader2,
} from "lucide-react";

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).toLowerCase());

export default function ContactUs() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [banner, setBanner] = useState({ show: false, error: false, text: "" });
  const [errors, setErrors] = useState({});

  const BASE_URL = "https://api.cooeemobile.com"

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));

    // live validation
    if (name === "email") {
      setErrors((s) => ({ ...s, email: emailOk(value) ? "" : "Please enter a valid email." }));
    }
    if (name === "name") {
      setErrors((s) => ({ ...s, name: value.trim() ? "" : "Your name is required." }));
    }
    if (name === "message") {
      setErrors((s) => ({ ...s, message: value.trim() ? "" : "Please add a short message." }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const vErr = {
      name: formData.name.trim() ? "" : "Your name is required.",
      email: emailOk(formData.email) ? "" : "Please enter a valid email.",
      message: formData.message.trim() ? "" : "Please add a short message.",
    };
    setErrors(vErr);
    if (Object.values(vErr).some(Boolean)) return;

    setSending(true);
    setBanner({ show: false, error: false, text: "" });

    try {
      const res = await axios.post(`${BASE_URL}/send-email`, formData);
      setBanner({
        show: true,
        error: false,
        text: res?.data?.message || "Thanks! Your message has been sent.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setBanner({
        show: true,
        error: true,
        text:
          err.response?.data?.message ||
          "Something went wrong while sending your message. Please try again.",
      });
    } finally {
      setSending(false);
    }
  };

  const inputBase =
    "w-full rounded-xl border bg-white/80 px-4 py-3 shadow-sm backdrop-blur placeholder-slate-400 " +
    "focus:outline-none focus:ring-2 focus:ring-purple-400/70 focus:border-purple-300";

  return (
    <div className="relative min-h-[60vh] bg-sky-50">
      {/* soft brand gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_0%,rgba(168,85,247,0.18),rgba(2,132,199,0.10)_55%,transparent_80%)]" />

      <div className="relative mx-auto max-w-5xl px-4 py-12">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Got <span className="rounded-md bg-purple-200 px-2 py-1">Questions</span>?
          </h2>
          <p className="mt-3 text-slate-700">
            We’re here to help. Reach out and our Pathways Academy team will get back to you
            promptly.
          </p>
        </div>

        {/* Info strip */}
        <div className="mx-auto mt-8 grid gap-4 sm:grid-cols-3">
          <InfoPill
            icon={<Mail className="h-4 w-4" />}
            label="Email"
            value="support@pathways.academy"
          />
          <InfoPill icon={<Phone className="h-4 w-4" />} label="Phone" value="+61 418 682 309" />
          <InfoPill
            icon={<MapPin className="h-4 w-4" />}
            label="Hours"
            value="Mon–Fri · 9:00–17:00 (ACST)"
          />
        </div>

        {/* Banner */}
        {banner.show && (
          <div
            className={`mx-auto mt-6 flex max-w-3xl items-center gap-2 rounded-2xl px-4 py-3 ring-1 ${
              banner.error
                ? "bg-rose-50 text-rose-700 ring-rose-200"
                : "bg-emerald-50 text-emerald-700 ring-emerald-200"
            }`}
          >
            {banner.error ? <AlertCircle className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
            <p className="text-sm font-semibold">{banner.text}</p>
          </div>
        )}

        {/* Card */}
        <div className="mx-auto mt-6 grid max-w-5xl gap-6 md:grid-cols-[1.1fr_.9fr]">
          {/* Form */}
          <div className="rounded-3xl bg-white/85 p-6 shadow-xl ring-1 ring-purple-200/60 backdrop-blur">
            <h3 className="mb-2 flex items-center gap-2 text-xl font-extrabold text-slate-900">
              <MessageSquare className="h-5 w-5 text-purple-700" />
              Send us a message
            </h3>
            <p className="mb-5 text-sm text-slate-600">
              Fill out the form and we’ll get back to you shortly.
            </p>

            <form onSubmit={onSubmit} noValidate className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-800">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  className={inputBase}
                  aria-invalid={!!errors.name}
                  required
                />
                {errors.name && <p className="mt-1 text-xs text-rose-600">{errors.name}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-800">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={onChange}
                  className={inputBase}
                  aria-invalid={!!errors.email}
                  required
                />
                {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-800">Your Message</label>
                <textarea
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={onChange}
                  className={inputBase}
                  aria-invalid={!!errors.message}
                  required
                />
                {errors.message && <p className="mt-1 text-xs text-rose-600">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={sending}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-80"
              >
                {sending && <Loader2 className="h-4 w-4 animate-spin" />}
                {sending ? "Sending…" : "Send Message"}
              </button>
            </form>
          </div>

          {/* Help panel */}
          <aside className="rounded-3xl bg-white/85 p-6 shadow-xl ring-1 ring-purple-200/60 backdrop-blur">
            <h4 className="text-lg font-extrabold text-slate-900">Prefer direct contact?</h4>
            <p className="mt-2 text-sm text-slate-600">
              You can also reach us via email or phone during office hours. We’re happy to help with
              course plans, billing, and general questions.
            </p>

            <div className="mt-5 space-y-3 text-sm">
              <ContactRow icon={<Mail className="h-4 w-4" />} text="support@pathways.academy" />
              <ContactRow icon={<Phone className="h-4 w-4" />} text="+61 418 682 309" />
              <ContactRow icon={<MapPin className="h-4 w-4" />} text="Mon–Fri · 9:00–17:00 (ACST)" />
            </div>

            <div className="mt-6 rounded-2xl bg-purple-50 p-3 text-sm text-slate-800 ring-1 ring-purple-200/60">
              Quick tip: Check our FAQs for instant answers to common questions.
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ---------- small sub-components ---------- */

function InfoPill({ icon, label, value }) {
  return (
    <div className="flex items-center justify-center gap-2 rounded-2xl bg-white/85 px-4 py-3 text-slate-800 shadow-sm ring-1 ring-purple-200/60 backdrop-blur">
      <span className="text-purple-700">{icon}</span>
      <span className="text-sm font-semibold">{label}:</span>
      <span className="text-sm">{value}</span>
    </div>
  );
}

function ContactRow({ icon, text }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 ring-1 ring-slate-200">
      <span className="text-purple-700">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
