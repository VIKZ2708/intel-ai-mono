"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";
import TiltCard from "./TiltCard";

function TestimonialCard({ t }: { t: typeof testimonials[number] }) {
  return (
    <TiltCard intensity={6} className="w-[300px] flex-shrink-0 mx-3">
      <div className="bg-[#0d1117] border border-[#21262d] rounded-2xl p-6 h-full hover:border-[#0071e3]/30 transition-colors duration-300">
        <div className="flex gap-0.5 mb-4">
          {Array.from({ length: 5 }).map((_, j) => (
            <Star key={j} className="w-4 h-4 fill-[#0071e3] text-[#0071e3]" />
          ))}
        </div>
        <p className="text-sm text-[#8b949e] leading-relaxed mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#0071e3]/30 flex-shrink-0">
            <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="40px" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">{t.name}</div>
            <div className="text-xs text-[#0071e3]">{t.role}</div>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

// Split into two rows
const ROW_A = testimonials.slice(0, Math.ceil(testimonials.length / 2));
const ROW_B = testimonials.slice(Math.ceil(testimonials.length / 2));

// Pad rows to at least 4 cards each (duplicate if needed)
function pad(arr: typeof testimonials) {
  while (arr.length < 4) arr = [...arr, ...arr];
  return arr;
}
const rowA = pad([...ROW_A]);
const rowB = pad([...ROW_B]);

export default function Testimonials() {
  return (
    <section className="py-24 bg-[#161b22] overflow-hidden relative">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#161b22] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#161b22] to-transparent z-10 pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-14 px-4">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0071e3] mb-3"
        >
          Success Stories
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
        >
          Trusted by <span className="gradient-text">1,000+ Learners</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[#8b949e] max-w-xl mx-auto"
        >
          Real results from real people. Our students get hired at the world&apos;s top tech companies.
        </motion.p>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="mb-4">
        <div className="marquee-l">
          {rowA.map((t, i) => <TestimonialCard key={i} t={t} />)}
          {rowA.map((t, i) => <TestimonialCard key={`b${i}`} t={t} />)}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div>
        <div className="marquee-r">
          {rowB.map((t, i) => <TestimonialCard key={i} t={t} />)}
          {rowB.map((t, i) => <TestimonialCard key={`b${i}`} t={t} />)}
        </div>
      </div>
    </section>
  );
}
