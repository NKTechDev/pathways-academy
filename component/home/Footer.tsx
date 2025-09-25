// src/components/layout/Footer.jsx
import { Link } from "react-router";
import {
  Youtube,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
// import logo from "@/assets/clogo.png"; // swap to your logo (or keep)

const LINKS = [
  { label: "Home", to: "/" },
  { label: "Login", to: "/login" },
  { label: "Sign up", to: "/register" },
  { label: "Blogs", to: "/blog" },
];

const SUBJECTS = [
  { label: "Chemistry", to: "/subjects/chemistry" },
  { label: "Physics", to: "/subjects/physics" },
  { label: "Biology", to: "/subjects/biology" },
  { label: "Mathematics", to: "/subjects/mathematics" },
  { label: "Business", to: "/subjects/business" },
  { label: "Economics", to: "/subjects/economics" },
  { label: "Accounting", to: "/subjects/accounting" },
  { label: "Psychology", to: "/subjects/psychology" },
];

const SOCIAL = [
  { icon: Youtube, label: "YouTube", href: "https://youtube.com" },
  // { icon: Tiktok, label: "TikTok", href: "https://tiktok.com" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

export default function Footer() {
  return (
    <footer className="relative bg-sky-50">
      {/* subtle section edge */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-3">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                // src={logo}
                alt="Pathways Academy"
                className="h-12 w-auto rounded-xl bg-white p-2 shadow-sm ring-1 ring-black/5"
              />
            </Link>
          </div>

          {/* Links */}
          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <nav aria-label="Site links" className="space-y-3">
              <h3 className="text-sm font-extrabold text-slate-800 tracking-wide">Links</h3>
              <ul className="space-y-2">
                {LINKS.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="text-sm text-slate-600 hover:text-purple-700 transition"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Subjects" className="space-y-3 col-span-1 sm:col-span-2">
              <h3 className="text-sm font-extrabold text-slate-800 tracking-wide">Subjects</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                {SUBJECTS.map((s) => (
                  <Link
                    key={s.label}
                    to={s.to}
                    className="text-sm text-slate-600 hover:text-purple-700 transition"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>

          {/* Social */}
          <div className="md:col-span-3 md:justify-self-end">
            <div className="flex items-center gap-3">
              {SOCIAL.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-slate-800
                             ring-1 ring-purple-200 hover:bg-white hover:text-purple-700 shadow-sm transition"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-purple-200/60 pt-4 sm:flex-row">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Pathways Academy. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs font-medium text-slate-700 hover:text-purple-700 transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs font-medium text-slate-700 hover:text-purple-700 transition">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
