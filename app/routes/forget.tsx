// src/pages/auth/ForgotPassword.jsx
import { useState } from "react";
import axios from "axios";
import {
  Mail,
  Lock,
  Key,
  Loader2,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router";
import { BASE_URL } from "../constant";

const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v).toLowerCase());

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!emailOk(email)) {
      setError("Please enter a valid email address.");
      setMessage("");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/forgot-password`, { email });
      setMessage(res.data?.message || "Reset link sent. Please check your inbox.");
      setError("");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-sky-50">
      {/* soft theme gradient */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_0%,rgba(168,85,247,0.18),rgba(2,132,199,0.10)_55%,transparent_80%)]" />
      <div className="relative mx-auto grid min-h-screen max-w-7xl place-items-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl bg-white/85 p-6 shadow-xl ring-1 ring-purple-200/60 backdrop-blur">
          <h2 className="text-center text-3xl font-extrabold text-slate-900">
            Forgot <span className="rounded-md bg-purple-200 px-2 py-1">Password</span>
          </h2>

          {message && (
            <p className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-center text-emerald-700 ring-1 ring-emerald-200">
              {message}
            </p>
          )}
          {error && (
            <p className="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-center text-rose-700 ring-1 ring-rose-200">
              {error}
            </p>
          )}

          {step === 1 && (
            <form onSubmit={handleForgotPassword} className="mt-5 space-y-4" noValidate>
              <div>
                <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Mail className="h-4 w-4 text-purple-700" />
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border bg-white/80 px-3 py-3 shadow-sm backdrop-blur placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/70 focus:border-purple-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-80"
              >
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                Send Reset Link
              </button>

              <div className="rounded-xl bg-amber-50 px-3 py-2 text-amber-800 ring-1 ring-amber-200">
                <p className="flex items-start gap-2 text-xs">
                  <ShieldCheck className="mt-0.5 h-4 w-4" />
                  <span>
                    <strong>Security Notice:</strong> You can request a password reset{" "}
                    <span className="font-semibold">up to 3 times per day</span> to protect your account.
                  </span>
                </p>
              </div>

              <p className="text-center text-xs text-slate-600">
                Already have the token?{" "}
                <button
                  type="button"
                  className="font-semibold text-purple-700 hover:underline"
                  onClick={() => setStep(2)}
                >
                  Reset now
                </button>
              </p>
            </form>
          )}

          {step === 2 && <ResetPassword setStep={setStep} setParentError={setError} setParentMsg={setMessage} />}

          {step === 3 && <SuccessCard />}
        </div>
      </div>
    </div>
  );
}

function ResetPassword({ setStep, setParentError, setParentMsg }) {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!token.trim()) {
      setError("Reset token is required.");
      setMessage("");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      setMessage("");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/reset-password/${token}`, { newPassword });
      setMessage(res.data?.message || "Password reset successful.");
      setError("");
      setParentError("");
      setParentMsg("");
      setStep(3);
    } catch (err) {
      const msg = err.response?.data?.message || "Invalid or expired token";
      setError(msg);
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  const inputBase =
    "w-full rounded-xl border bg-white/80 px-3 py-3 shadow-sm backdrop-blur placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/70 focus:border-purple-300";

  return (
    <div className="mt-5">
      <h3 className="text-center text-2xl font-extrabold text-slate-900">
        Reset <span className="rounded-md bg-purple-200 px-2 py-1">Password</span>
      </h3>

      {message && (
        <p className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-center text-emerald-700 ring-1 ring-emerald-200">
          {message}
        </p>
      )}
      {error && (
        <p className="mt-3 rounded-xl bg-rose-50 px-3 py-2 text-center text-rose-700 ring-1 ring-rose-200">
          {error}
        </p>
      )}

      <form onSubmit={handleResetPassword} className="mt-4 space-y-4" noValidate>
        <div>
          <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Key className="h-4 w-4 text-purple-700" />
            Reset Token
          </label>
          <input
            type="text"
            placeholder="Paste your token here"
            className={inputBase}
            value={token}
            onChange={(e) => setToken(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <label className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-800">
            <Lock className="h-4 w-4 text-purple-700" />
            New Password
          </label>
          <button
            type="button"
            aria-label={showPw ? "Hide password" : "Show password"}
            className="absolute right-2 top-9 rounded-md p-1 text-slate-500 hover:text-slate-700"
            onClick={() => setShowPw((v) => !v)}
          >
            {showPw ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
          <input
            type={showPw ? "text" : "password"}
            placeholder="Enter new password"
            className={inputBase}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <p className="mt-2 text-xs text-slate-600">
            Use at least 8 characters. Avoid common patterns like <em>123456</em>.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-80"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          Reset Password
        </button>

        <p className="text-center text-xs text-slate-600">
          📩 Keep the token email open in a separate tab for quick copy-paste.
        </p>
      </form>
    </div>
  );
}

function SuccessCard() {
  return (
    <div className="mt-6 rounded-2xl bg-emerald-50 p-5 text-center ring-1 ring-emerald-200">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        <CheckCircle2 className="h-6 w-6" />
      </div>
      <h4 className="mt-3 text-xl font-extrabold text-emerald-800">Password Reset Successful</h4>
      <p className="mt-1 text-sm text-emerald-700">
        You can now sign in with your new password.
      </p>
      <Link
        to="/login"
        className="mt-4 inline-flex items-center justify-center rounded-xl bg-purple-700 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-600"
      >
        Go to Login
      </Link>
    </div>
  );
}
