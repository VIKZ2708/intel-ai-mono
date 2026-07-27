"use client";

import { motion } from "framer-motion";
import { Check, MessageCircle } from "lucide-react";

const pillars = [
  {
    icon: "🧩",
    title: "DSA Mastery",
    desc: "Basic to advanced — arrays, trees, graphs, DP, competitive programming",
    color: "border-blue-500/30 bg-blue-500/5",
  },
  {
    icon: "🏗️",
    title: "System Design",
    desc: "Design scalable distributed systems like Netflix, Uber, and WhatsApp",
    color: "border-purple-500/30 bg-purple-500/5",
  },
  {
    icon: "🌐",
    title: "Full Stack & Web Dev",
    desc: "React, Next.js, Node.js, databases, APIs, and cloud deployment",
    color: "border-cyan-500/30 bg-cyan-500/5",
  },
  {
    icon: "🤖",
    title: "AI & Machine Learning",
    desc: "ML fundamentals, deep learning, LLMs, and building AI-powered products",
    color: "border-pink-500/30 bg-pink-500/5",
  },
];

const features = [
  "1-on-1 Mentorship Sessions",
  "Live Doubt Clearing Classes",
  "Mock Interviews with Experts",
  "Placement Assistance",
  "Lifetime Course Access",
  "Community of 1,000+ Learners",
  "Project-Based Learning",
  "Industry-Recognised Certificate",
];

export default function YearProgram() {
  return (
    <section className="py-24 bg-[#0d1117] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0071e3]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0071e3] mb-3"
          >
            Flagship Program
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Master Everything in{" "}
            <span className="gradient-text">1 Year</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#8b949e] max-w-2xl mx-auto text-lg"
          >
            Our most comprehensive program — designed to take you from beginner to job-ready in 12 months.
            DSA + System Design + Full Stack + AI, all under one roof.
          </motion.p>
        </div>

        {/* 4 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-2xl border ${p.color} transition-all duration-300`}
            >
              <div className="text-3xl mb-3">{p.icon}</div>
              <h3 className="font-bold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-[#8b949e] leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Features + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="gradient-border rounded-2xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Everything you need to{" "}
                <span className="gradient-text">land your dream job</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm text-[#8b949e]">
                    <Check className="w-4 h-4 text-[#0071e3] flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center md:text-left">
              <div className="inline-block px-3 py-1 bg-[#0071e3]/10 border border-[#0071e3]/30 rounded-full text-sm text-[#3d95f4] mb-4">
                Fee on Inquiry
              </div>
              <div className="text-5xl font-bold text-white mb-2">
                12 <span className="text-2xl text-[#8b949e] font-normal">months</span>
              </div>
              <p className="text-[#8b949e] text-sm mb-8">
                Customised fee structure based on your background and goals. Talk to our advisor to get a personalised plan.
              </p>
              <a
                href="https://wa.me/919871358616?text=Hi%2C%20I%27m%20interested%20in%20the%201-Year%20Mastery%20Program%20at%20Intel%20AI.%20Can%20you%20share%20more%20details%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#0071e3] hover:bg-[#0058b3] text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-[#0071e3]/25"
              >
                <MessageCircle className="w-4 h-4" />
                Talk to an Advisor
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
