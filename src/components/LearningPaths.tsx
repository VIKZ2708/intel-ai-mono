"use client";

import { motion } from "framer-motion";
import { learningPaths } from "@/lib/data";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

export default function LearningPaths() {
  return (
    <section id="paths" className="py-24 bg-[#161b22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0071e3] mb-3"
          >
            Structured Paths
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Your Career.{" "}
            <span className="gradient-text">Your Path.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#8b949e] max-w-xl mx-auto"
          >
            Curated sequences of courses designed to take you from where you are to where you want to be.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {learningPaths.map((path, i) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative flex flex-col bg-[#0d1117] border border-[#21262d] rounded-2xl p-6 hover:border-[#0071e3]/50 transition-all duration-300 card-glow cursor-pointer"
            >
              {/* Gradient top bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${path.color}`} />

              <div className="text-4xl mb-4">{path.icon}</div>

              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#3d95f4] transition-colors">
                {path.title}
              </h3>
              <p className="text-sm text-[#8b949e] mb-6 leading-relaxed flex-1">{path.description}</p>

              <div className="flex items-center justify-between text-xs text-[#8b949e] mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {path.weeks} weeks
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" /> {path.courses} courses
                </span>
              </div>

              <button className="flex items-center gap-1 text-sm font-semibold text-[#0071e3] hover:text-[#00c9ff] transition-colors">
                Explore Path <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
