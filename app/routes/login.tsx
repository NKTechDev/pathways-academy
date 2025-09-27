// src/pages/auth/Login.jsx
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../store/slices/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
// import clogo from "../../assets/clogo.png";
import { BASE_URL } from "../constant";

const emailOk = (v) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).toLowerCase());

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({ email: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [modal, setModal] = useState({
    isOpen: false,
    message: "",
    isError: false,
  });

  const onChange = (e) => {
    setErrMsg("");
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!emailOk(form.email)) {
      setErrMsg("Please enter a valid email address.");
      return;
    }
    if (!form.password.trim()) {
      setErrMsg("Password is required.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`${BASE_URL}/login`, form, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      const accessToken = data.accessToken;
      const expiresIn = data.expiresIn || 30 * 24 * 60 * 60; // seconds
      const expirationTime = Date.now() + expiresIn * 1000;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("tokenExpiration", String(expirationTime));

      dispatch(fetchUser());

      setModal({
        isOpen: true,
        message: "Login successful! Redirecting…",
        isError: false,
      });

      setTimeout(() => {
        setModal({ isOpen: false, message: "", isError: false });
        navigate("/home");
      }, 1200);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        "Login failed. Please check your credentials and try again.";
      setModal({ isOpen: true, message: msg, isError: true });
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full rounded-xl border bg-white/80 px-3 py-3 pr-10 shadow-sm backdrop-blur placeholder-slate-400 " +
    "focus:outline-none focus:ring-2 focus:ring-purple-400/70 focus:border-purple-300";

  return (
    <div className="relative min-h-screen overflow-hidden bg-sky-50">
      {/* soft gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_0%,rgba(168,85,247,0.18),rgba(2,132,199,0.10)_55%,transparent_80%)]" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-4 py-8 md:flex-row md:justify-between md:gap-8">
        {/* Left illustration / brand */}
        <div className="hidden w-[42%] md:block">
          <div className="rounded-3xl bg-white/60 p-8 shadow-lg ring-1 ring-sky-200/60 backdrop-blur">
            <img
              src="pathways.png"
              alt="ovs logo"
              className="mx-auto h-16 w-auto"
              draggable="false"
            />
            <h1 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
              Welcome back to{" "}
              <span className="rounded-md bg-purple-200 px-2 py-1">
                Pathways
              </span>
            </h1>
            <p className="mx-auto mt-3 max-w-md text-center text-slate-600">
              Sign in to continue your A/A* journey with expert-led lessons,
              quizzes, and crash courses.
            </p>
          </div>
        </div>

        {/* Login Card */}
        <motion.div
          className="w-full max-w-md rounded-2xl bg-white/80 p-6 shadow-xl ring-1 ring-purple-200/60 backdrop-blur"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45 }}
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <img  alt="Ovs Logo" className="h-10 w-auto" />
            <span className="text-xl font-extrabold text-slate-900">
              Sign in
            </span>
          </div>

          {/* error banner */}
          <AnimatePresence>
            {errMsg && (
              <motion.div
                className="mb-3 flex items-center gap-2 rounded-xl bg-rose-50 px-3 py-2 text-rose-700 ring-1 ring-rose-200"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <AlertTriangle className="h-4 w-4" />
                <p className="text-sm">{errMsg}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={submit} className="space-y-4" noValidate>
            {/* Email */}
            <div className="relative">
              <Mail className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-600" />
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email address"
                value={form.email}
                onChange={onChange}
                className={inputBase}
                aria-invalid={!!errMsg && !emailOk(form.email)}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="pointer-events-none absolute right-10 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-600" />
              <button
                type="button"
                aria-label={showPw ? "Hide password" : "Show password"}
                onClick={() => setShowPw((v) => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 hover:text-slate-700"
              >
                {showPw ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              <input
                type={showPw ? "text" : "password"}
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                value={form.password}
                onChange={onChange}
                className={inputBase}
              />
            </div>

            {/* Security note */}
            <div className="flex items-start gap-2 rounded-xl bg-amber-50 px-3 py-2 text-amber-800 ring-1 ring-amber-200">
              <ShieldCheck className="mt-0.5 h-4 w-4" />
              <p className="text-xs">
                <strong>Security:</strong> You have <span className="font-semibold">4 login attempts</span> per day. Exceeding
                the limit temporarily locks your account until tomorrow.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-purple-700 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-80"
            >
              {loading ? "Signing you in…" : "Login"}
            </button>

            {/* Links */}
            <div className="mt-2 flex items-center justify-between text-sm">
              <Link
                to="/forget-password"
                className="font-medium text-purple-700 hover:underline"
              >
                Forgot password?
              </Link>
              <span className="text-slate-600">
                No account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-purple-700 hover:underline"
                >
                  Sign up
                </Link>
              </span>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal.isOpen && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-[92%] max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl ring-1 ring-black/5"
              initial={{ scale: 0.9, y: 8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0 }}
            >
              <motion.img
                // src={clogo}
                alt="ovs Logo"
                className="mx-auto mb-3 h-14 w-auto"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              />
              <p
                className={`text-base font-semibold ${
                  modal.isError ? "text-rose-600" : "text-emerald-600"
                }`}
              >
                {modal.message}
              </p>
              <button
                onClick={() =>
                  setModal({ isOpen: false, message: "", isError: false })
                }
                className="mt-4 rounded-xl bg-slate-700 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-600"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
