"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Play, Star } from "lucide-react";
import LiveCodeWindow from "./LiveCodeWindow";

const ACTIVITIES = [
  { msg: "Rahul K. just solved Two Sum",            icon: "🎯" },
  { msg: "Priya completed System Design Week 2",    icon: "🎓" },
  { msg: "Arjun earned the 7-Day Streak badge",     icon: "🔥" },
  { msg: "Neha cracked the LRU Cache problem",      icon: "⚡" },
  { msg: "Vikram submitted a perfect solution",      icon: "✅" },
  { msg: "Sita just started Advanced DSA",           icon: "🚀" },
  { msg: "Mohit hit 50 problems solved!",            icon: "🏆" },
];

function ActivityFeed() {
  const [idx, setIdx]     = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % ACTIVITIES.length);
        setVisible(true);
      }, 400);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const item = ACTIVITIES[idx];
  return (
    <div className="hidden lg:block absolute bottom-10 left-8 z-20">
      <AnimatePresence mode="wait">
        {visible && (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16, scale: 0.94 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: -12, scale: 0.94 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#161b22]/90 border border-[#21262d] backdrop-blur-md shadow-xl max-w-[280px]"
          >
            <span className="text-xl leading-none">{item.icon}</span>
            <div>
              <div className="text-xs text-white font-medium leading-snug">{item.msg}</div>
              <div className="text-[10px] text-[#8b949e] mt-0.5">just now · Intel AI</div>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0 ml-1" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const STATS = [
  { end: 1000, suffix: "+", label: "Students Enrolled", decimal: false },
  { end: 100,  suffix: "+", label: "Expert Courses",    decimal: false },
  { end: 95,   suffix: "%", label: "Placement Rate",    decimal: false },
  { end: 4.9,  suffix: "★", label: "Average Rating",    decimal: true  },
];

function CountUp({ end, suffix, decimal, active }: { end: number; suffix: string; decimal: boolean; active: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const dur = 1600;
    const t0 = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(decimal ? Math.round(eased * end * 10) / 10 : Math.floor(eased * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, end, decimal]);
  const display = decimal ? val.toFixed(1) : end >= 1000 ? val.toLocaleString() : val;
  return <>{display}{suffix}</>;
}

interface HeroProps {
  onLoginClick: () => void;
}

export default function Hero({ onLoginClick }: HeroProps) {
  const statsRef   = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  // Parallax: background moves slower than scroll speed
  const { scrollY } = useScroll();
  const bgY    = useTransform(scrollY, [0, 700], [0, -140]);
  const orbY1  = useTransform(scrollY, [0, 700], [0, -100]);
  const orbY2  = useTransform(scrollY, [0, 700], [0, -60]);
  const ringY  = useTransform(scrollY, [0, 700], [0, -80]);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden hero-grid">
      {/* Background layer — all elements use parallax y offsets */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated orbs with per-layer parallax */}
        <motion.div style={{ y: orbY1 }} className="orb-drift aurora absolute top-1/4 left-1/4 w-[560px] h-[560px] bg-[#0071e3]/12 rounded-full blur-3xl" />
        <motion.div style={{ y: orbY2 }} className="absolute bottom-1/4 right-1/4">
          <div className="orb-drift-rev aurora w-[450px] h-[450px] bg-[#00c9ff]/10 rounded-full blur-3xl" style={{ animationDelay: "-3s" }} />
        </motion.div>
        <motion.div style={{ y: orbY1 }} className="orb-drift aurora absolute top-3/4 left-1/2 w-80 h-80 bg-[#3d95f4]/8 rounded-full blur-2xl" />

        {/* Gradient beams */}
        <div className="beam-1 absolute inset-0">
          <div className="absolute top-1/3 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#0071e3]/30 to-transparent blur-sm" />
        </div>
        <div className="beam-2 absolute inset-0">
          <div className="absolute top-2/3 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00c9ff]/20 to-transparent blur-sm" />
        </div>

        {/* Spinning rings — move at a different parallax rate */}
        <motion.div style={{ y: ringY }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="spin-slow w-[700px] h-[700px] rounded-full border border-[#0071e3]/5" />
        </motion.div>
        <motion.div style={{ y: ringY }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="spin-slow w-[950px] h-[950px] rounded-full border border-[#0071e3]/3" style={{ animationDuration: "30s", animationDirection: "reverse" }} />
        </motion.div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Two-column layout on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ─── LEFT: text ─── */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-7"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/30 text-sm text-[#3d95f4]">
                <Star className="w-3.5 h-3.5 fill-current" />
                India&apos;s Most Structured Tech Learning Platform
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
            >
              <span className="text-white">Learn to Build.</span>
              <br />
              <span className="text-white">Learn to </span>
              <span className="gradient-text">Think.</span>
              <br />
              <span className="text-white">Learn with </span>
              <span className="gradient-text">Intel AI.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-[#8b949e] max-w-lg mb-10 leading-relaxed"
            >
              Master <strong className="text-white">DSA</strong>,{" "}
              <strong className="text-white">System Design</strong>,{" "}
              <strong className="text-white">Full Stack</strong>, and{" "}
              <strong className="text-white">AI</strong> with structured paths built for
              the next generation of engineers.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-14"
            >
              <a
                href="#courses"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0071e3] hover:bg-[#0058b3] text-white font-semibold rounded-xl text-base transition-all duration-200 shadow-lg shadow-[#0071e3]/25 hover:shadow-[#0071e3]/40 hover:-translate-y-0.5"
              >
                Explore Courses
                <ArrowRight className="w-4 h-4" />
              </a>
              <button
                onClick={onLoginClick}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-[#30363d] hover:border-[#0071e3]/50 text-white font-semibold rounded-xl text-base transition-all duration-200 hover:-translate-y-0.5"
              >
                <Play className="w-4 h-4 fill-current text-[#0071e3]" />
                Watch Demo
              </button>
            </motion.div>

            {/* Stats — count-up on scroll */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4 w-full"
            >
              {STATS.map((s) => (
                <div
                  key={s.label}
                  className="text-center lg:text-left p-4 rounded-xl bg-[#161b22]/70 border border-[#21262d] backdrop-blur-sm hover:border-[#0071e3]/30 transition-colors"
                >
                  <div className="text-2xl font-bold gradient-text mb-1">
                    <CountUp end={s.end} suffix={s.suffix} decimal={s.decimal} active={statsInView} />
                  </div>
                  <div className="text-xs text-[#8b949e] leading-tight">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ─── RIGHT: live code window ─── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center lg:justify-end"
          >
            <LiveCodeWindow />
          </motion.div>
        </div>
      </div>

      {/* Live activity feed */}
      <ActivityFeed />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent pointer-events-none" />
    </section>
  );
}
