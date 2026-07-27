"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Zap, LogOut, ChevronDown, LayoutDashboard } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

interface NavbarProps {
  onLoginClick: () => void;
}

const navLinks = [
  { label: "Courses",        href: "#courses" },
  { label: "Learning Paths", href: "#paths" },
  { label: "Practice",       href: "/practice" },
  { label: "Study Plan",     href: "/study-plan" },
  { label: "Founders",       href: "#founders" },
];

export default function Navbar({ onLoginClick }: NavbarProps) {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [dropdownOpen, setDropdown]   = useState(false);
  const { data: session, status }     = useSession();
  const isLoading                     = status === "loading";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const user = session?.user;
  const initials = user?.name ? user.name.trim()[0].toUpperCase() : "?";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0d1117]/95 backdrop-blur-md border-b border-[#21262d] shadow-lg" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-[#0071e3] to-[#00c9ff] rounded-lg flex items-center justify-center pulse-glow">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="font-bold text-xl tracking-tight">
              <span className="text-white">Intel</span><span className="gradient-text"> AI</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="px-4 py-2 text-sm text-[#8b949e] hover:text-white rounded-md transition-colors hover:bg-white/5">
                {link.label}
              </a>
            ))}
          </nav>

          {/* Auth area */}
          <div className="hidden md:flex items-center gap-3">
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-[#21262d] animate-pulse" />
            ) : user ? (
              <div className="relative">
                <button onClick={() => setDropdown(!dropdownOpen)} className="flex items-center gap-1.5 rounded-full ring-2 ring-transparent hover:ring-[#0071e3]/50 transition-all">
                  {user.image ? (
                    <Image src={user.image} alt={user.name ?? ""} width={32} height={32} className="rounded-full block" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0071e3] to-[#00c9ff] flex items-center justify-center text-white text-xs font-bold">
                      {initials}
                    </div>
                  )}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-3 w-52 bg-[#161b22] border border-[#21262d] rounded-xl shadow-2xl overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-[#21262d]">
                      <div className="text-sm font-semibold text-white truncate">{user.name}</div>
                      <div className="text-xs text-[#8b949e] truncate">{user.email}</div>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setDropdown(false)}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-white hover:bg-white/5 transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4 text-[#0071e3]" /> Dashboard
                    </Link>
                    <button
                      onClick={() => { signOut(); setDropdown(false); }}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button onClick={onLoginClick} className="px-4 py-2 text-sm text-[#8b949e] hover:text-white transition-colors">
                  Sign In
                </button>
                <button onClick={onLoginClick} className="px-4 py-2 text-sm font-semibold bg-[#0071e3] hover:bg-[#0058b3] text-white rounded-lg transition-colors">
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 text-[#8b949e] hover:text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0d1117] border-t border-[#21262d] px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="block px-3 py-2 text-sm text-[#8b949e] hover:text-white hover:bg-white/5 rounded-md">
              {link.label}
            </a>
          ))}
          <div className="pt-3">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 px-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0071e3] to-[#00c9ff] flex items-center justify-center text-white text-xs font-bold">{initials}</div>
                  <div>
                    <div className="text-sm font-semibold text-white">{user.name}</div>
                    <div className="text-xs text-[#8b949e]">{user.email}</div>
                  </div>
                </div>
                <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-white border border-[#30363d] rounded-lg hover:bg-white/5">
                  <LayoutDashboard className="w-4 h-4 text-[#0071e3]" /> Dashboard
                </Link>
                <button onClick={() => signOut()} className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-400 border border-red-400/20 rounded-lg">
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <button onClick={() => { onLoginClick(); setMobileOpen(false); }} className="w-full px-4 py-2 text-sm border border-[#30363d] text-white rounded-lg hover:bg-white/5">
                  Sign In
                </button>
                <button onClick={() => { onLoginClick(); setMobileOpen(false); }} className="w-full px-4 py-2 text-sm font-semibold bg-[#0071e3] hover:bg-[#0058b3] text-white rounded-lg">
                  Get Started
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
