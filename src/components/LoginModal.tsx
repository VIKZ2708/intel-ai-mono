"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { X, Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
import { apiFetch } from "@/lib/apiClient";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [tab, setTab]           = useState<"signin" | "signup">("signin");
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [oauthLoading, setOauthLoading] = useState<"google" | "linkedin" | null>(null);
  const [error, setError]       = useState("");

  function reset() {
    setName(""); setEmail(""); setPassword(""); setError(""); setLoading(false);
  }

  function switchTab(t: "signin" | "signup") {
    setTab(t); reset();
  }

  async function handleOAuth(provider: "google" | "linkedin") {
    setOauthLoading(provider);
    await signIn(provider, { callbackUrl: "/" });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);

    if (tab === "signup") {
      const res = await apiFetch("/auth/register", {
        method: "POST",
        body:   JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); setLoading(false); return; }
      const result = await signIn("credentials", { email, password, redirect: false });
      setLoading(false);
      if (result?.error) { setError("Account created! Please sign in."); setTab("signin"); }
      else onClose();
    } else {
      const result = await signIn("credentials", { email, password, redirect: false });
      setLoading(false);
      if (result?.error) setError("Invalid email or password.");
      else onClose();
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.93, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="w-full max-w-md bg-[#161b22] border border-[#21262d] rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 pt-6 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 bg-gradient-to-br from-[#0071e3] to-[#00c9ff] rounded-lg flex items-center justify-center text-white font-bold text-xs">I</div>
                  <span className="font-bold text-white">Intel <span className="text-[#00c9ff]">AI</span></span>
                </div>
                <p className="text-[#8b949e] text-sm">{tab === "signin" ? "Welcome back" : "Create your free account"}</p>
              </div>
              <button onClick={onClose} className="p-2 text-[#8b949e] hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Tab switcher */}
            <div className="flex mx-6 mb-5 bg-[#0d1117] rounded-xl p-1">
              {(["signin", "signup"] as const).map((t) => (
                <button key={t} onClick={() => switchTab(t)} className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${tab === t ? "bg-[#0071e3] text-white" : "text-[#8b949e] hover:text-white"}`}>
                  {t === "signin" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>

            <div className="px-6 pb-6 space-y-4">
              {/* OAuth buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => handleOAuth("google")}
                  disabled={!!oauthLoading}
                  className="w-full flex items-center justify-center gap-3 py-2.5 bg-white hover:bg-gray-50 text-gray-800 font-semibold rounded-xl text-sm transition-colors disabled:opacity-50"
                >
                  {oauthLoading === "google" ? <Loader2 className="w-4 h-4 animate-spin text-gray-600" /> : <GoogleIcon />}
                  Continue with Google
                </button>
                <button
                  onClick={() => handleOAuth("linkedin")}
                  disabled={!!oauthLoading}
                  className="w-full flex items-center justify-center gap-3 py-2.5 bg-[#0077B5] hover:bg-[#006399] text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-50"
                >
                  {oauthLoading === "linkedin" ? <Loader2 className="w-4 h-4 animate-spin" /> : <LinkedInIcon />}
                  Continue with LinkedIn
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-[#21262d]" />
                <span className="text-xs text-[#8b949e]">or continue with email</span>
                <div className="flex-1 h-px bg-[#21262d]" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {tab === "signup" && (
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e]" />
                    <input
                      type="text" value={name} onChange={(e) => setName(e.target.value)}
                      placeholder="Full name" required
                      className="w-full pl-9 pr-4 py-2.5 bg-[#0d1117] border border-[#21262d] rounded-xl text-sm text-white placeholder-[#8b949e] focus:outline-none focus:border-[#0071e3] transition-colors"
                    />
                  </div>
                )}
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e]" />
                  <input
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address" required
                    className="w-full pl-9 pr-4 py-2.5 bg-[#0d1117] border border-[#21262d] rounded-xl text-sm text-white placeholder-[#8b949e] focus:outline-none focus:border-[#0071e3] transition-colors"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e]" />
                  <input
                    type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                    placeholder={tab === "signup" ? "Create password (min 6 chars)" : "Password"} required
                    className="w-full pl-9 pr-10 py-2.5 bg-[#0d1117] border border-[#21262d] rounded-xl text-sm text-white placeholder-[#8b949e] focus:outline-none focus:border-[#0071e3] transition-colors"
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b949e] hover:text-white">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {error && <p className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">{error}</p>}

                <button type="submit" disabled={loading} className="w-full py-2.5 bg-[#0071e3] hover:bg-[#0058b3] text-white font-semibold rounded-xl text-sm transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {tab === "signin" ? "Sign In" : "Create Account"}
                </button>
              </form>

              <p className="text-center text-xs text-[#8b949e]">
                {tab === "signin" ? "Don't have an account? " : "Already have an account? "}
                <button onClick={() => switchTab(tab === "signin" ? "signup" : "signin")} className="text-[#0071e3] hover:underline font-medium">
                  {tab === "signin" ? "Sign Up" : "Sign In"}
                </button>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
