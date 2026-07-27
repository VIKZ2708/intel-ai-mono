"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Star } from "lucide-react";

const stats = [
  { value: "1,000+", label: "Students Enrolled" },
  { value: "100+", label: "Expert Courses" },
  { value: "95%", label: "Placement Rate" },
  { value: "4.9★", label: "Average Rating" },
];

interface HeroProps {
  onLoginClick: () => void;
}

export default function Hero({ onLoginClick }: HeroProps) {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden hero-grid">
      {/* Background Glows — animated orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="orb-drift absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0071e3]/10 rounded-full blur-3xl" />
        <div className="orb-drift-rev absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-[#00c9ff]/8 rounded-full blur-3xl" />
        <div className="orb-drift absolute top-3/4 left-1/2 w-72 h-72 bg-[#3d95f4]/6 rounded-full blur-2xl" style={{ animationDelay: "-6s" }} />
        {/* Rotating accent ring */}
        <div className="spin-slow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#0071e3]/5" />
        <div className="spin-slow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-[#0071e3]/3" style={{ animationDuration: "30s", animationDirection: "reverse" }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
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
          className="text-center text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
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
          className="text-center text-lg sm:text-xl text-[#8b949e] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Master <strong className="text-white">DSA</strong>, <strong className="text-white">System Design</strong>,{" "}
          <strong className="text-white">Full Stack Development</strong>, and{" "}
          <strong className="text-white">Artificial Intelligence</strong> with structured paths built for the next
          generation of engineers.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <a
            href="#courses"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0071e3] hover:bg-[#0058b3] text-white font-semibold rounded-xl text-base transition-all duration-200 shadow-lg shadow-[#0071e3]/25 hover:shadow-[#0071e3]/40"
          >
            Explore Courses
            <ArrowRight className="w-4 h-4" />
          </a>
          <button
            onClick={onLoginClick}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-[#30363d] hover:border-[#0071e3]/50 text-white font-semibold rounded-xl text-base transition-all duration-200"
          >
            <Play className="w-4 h-4 fill-current text-[#0071e3]" />
            Watch Demo
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 rounded-xl bg-[#161b22]/60 border border-[#21262d] backdrop-blur-sm"
            >
              <div className="text-2xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-xs text-[#8b949e]">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent pointer-events-none" />
    </section>
  );
}
