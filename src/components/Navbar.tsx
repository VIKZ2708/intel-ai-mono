"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap, LogOut, LayoutDashboard, Trophy } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

interface NavbarProps {
  onLoginClick: () => void;
}

const navLinks = [
  { label: "Courses",         href: "#courses" },
  { label: "Learning Paths",  href: "#paths" },
  { label: "Practice",        href: "/practice" },
  { label: "Mock Interview",  href: "/mock-interview" },
  { label: "Study Plan",      href: "/study-plan" },
  { label: "Leaderboard",     href: "/leaderboard" },
  { label: "Founders",        href: "#founders" },
];

export default function Navbar({ onLoginClick }: NavbarProps) {
  const [scrolled, setScrolled]     = useState(false);
  const [visible, setVisible]       = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdown] = useState(false);
  const { data: session, status }   = useSession();
  const isLoading                   = status === "loading";
  const lastY                       = useRef(0);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      if (y < 60) {
        setVisible(true);
      } else if (y > lastY.current + 5) {
        setVisible(false);
        setMobileOpen(false);
        setDropdown(false);
      } else if (y < lastY.current - 5) {
        setVisible(true);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const user     = session?.user;
  const initials = user?.name ? user.name.trim()[0].toUpperCase() : "?";

  return (
    <motion.header
      animate={{ y: visible ? 0 : "-130%" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
    >
      {/* ── Inner container: morphs full-width → floating pill ── */}
      <div
        className={`pointer-events-auto w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "max-w-5xl mx-4 mt-3 rounded-2xl bg-[#0d1117]/95 backdrop-blur-xl border border-[#30363d] shadow-2xl shadow-black/50 px-5"
            : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        }`}
      >
        <div className="flex items-center justify-between h-[60px]">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-[#0071e3] to-[#00c9ff] rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className={`font-bold text-xl tracking-tight transition-all duration-300 ${scrolled ? "" : ""}`}>
              <span className="text-white">Intel</span>
              <span className="gradient-text"> AI</span>
            </span>
          </Link>

          {/* Desktop Nav links */}
          <nav className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-[#8b949e] hover:text-white rounded-lg transition-colors hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Auth area */}
          <div className="hidden md:flex items-center gap-3">
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-[#21262d] animate-pulse" />
            ) : user ? (
              <div className="relative flex items-center gap-3">
                <Link href="/dashboard" className="text-xs font-semibold uppercase tracking-wider text-[#8b949e] hover:text-white transition-colors">
                  Dashboard
                </Link>
                <button
                  onClick={() => setDropdown(!dropdownOpen)}
                  className="flex items-center gap-1.5 rounded-full ring-2 ring-transparent hover:ring-[#0071e3]/50 transition-all"
                >
                  {user.image ? (
                    <Image src={user.image} alt={user.name ?? ""} width={32} height={32} className="rounded-full block" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0071e3] to-[#00c9ff] flex items-center justify-center text-white text-xs font-bold">
                      {initials}
                    </div>
                  )}
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full mt-3 w-52 bg-[#161b22] border border-[#21262d] rounded-xl shadow-2xl overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-[#21262d]">
                        <div className="text-sm font-semibold text-white truncate">{user.name}</div>
                        <div className="text-xs text-[#8b949e] truncate">{user.email}</div>
                      </div>
                      <Link href="/dashboard" onClick={() => setDropdown(false)} className="flex items-center gap-2.5 px-4 py-3 text-sm text-white hover:bg-white/5 transition-colors">
                        <LayoutDashboard className="w-4 h-4 text-[#0071e3]" /> Dashboard
                      </Link>
                      <Link href="/leaderboard" onClick={() => setDropdown(false)} className="flex items-center gap-2.5 px-4 py-3 text-sm text-white hover:bg-white/5 transition-colors">
                        <Trophy className="w-4 h-4 text-yellow-400" /> Leaderboard
                      </Link>
                      <button onClick={() => { signOut(); setDropdown(false); }} className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={onLoginClick}
                  className="text-xs font-semibold uppercase tracking-wider text-[#8b949e] hover:text-white transition-colors"
                >
                  Sign In
                </button>
                {/* Pill CTA — the Docebo-style button */}
                <button
                  onClick={onLoginClick}
                  className="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gradient-to-r from-[#0071e3] to-[#00c9ff] text-white hover:opacity-90 hover:shadow-lg hover:shadow-[#0071e3]/30 transition-all duration-200"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile: pill CTA + circular hamburger */}
          <div className="md:hidden flex items-center gap-2">
            {!user && (
              <button
                onClick={onLoginClick}
                className="px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest bg-gradient-to-r from-[#0071e3] to-[#00c9ff] text-white"
              >
                Get Started
              </button>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-10 h-10 rounded-full bg-[#161b22] border border-[#21262d] flex items-center justify-center text-[#8b949e] hover:text-white hover:border-[#30363d] transition-all"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className={`pointer-events-auto absolute top-full w-full ${
              scrolled ? "max-w-5xl mx-4" : "left-0 right-0"
            } mt-2 bg-[#0d1117]/98 backdrop-blur-xl border border-[#21262d] rounded-2xl shadow-2xl overflow-hidden`}
          >
            <div className="p-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm font-semibold uppercase tracking-wider text-[#8b949e] hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="px-4 pb-4 pt-2 border-t border-[#21262d]">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0071e3] to-[#00c9ff] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{user.name}</div>
                      <div className="text-xs text-[#8b949e]">{user.email}</div>
                    </div>
                  </div>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-white border border-[#30363d] rounded-xl hover:bg-white/5 transition-colors">
                    <LayoutDashboard className="w-4 h-4 text-[#0071e3]" /> Dashboard
                  </Link>
                  <Link href="/leaderboard" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-white border border-[#30363d] rounded-xl hover:bg-white/5 transition-colors">
                    <Trophy className="w-4 h-4 text-yellow-400" /> Leaderboard
                  </Link>
                  <button onClick={() => { signOut(); setMobileOpen(false); }} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm text-red-400 border border-red-400/20 rounded-xl">
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { onLoginClick(); setMobileOpen(false); }}
                  className="w-full py-3 rounded-full text-sm font-bold uppercase tracking-widest bg-gradient-to-r from-[#0071e3] to-[#00c9ff] text-white"
                >
                  Get Started Free
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
