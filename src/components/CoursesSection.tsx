"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { courses, Course } from "@/lib/data";
import CourseCard from "./CourseCard";
import TiltCard from "./TiltCard";

type Filter = "All" | Course["category"];

const filters: Filter[] = ["All", "DSA", "System Design", "Full Stack", "Web Dev", "AI/ML"];

export default function CoursesSection() {
  const [active, setActive] = useState<Filter>("All");

  const filtered = active === "All" ? courses : courses.filter((c) => c.category === active);

  return (
    <section id="courses" className="py-24 bg-[#0d1117]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0071e3] mb-3"
          >
            Course Catalog
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Learn from the Best.{" "}
            <span className="gradient-text">Build the Future.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#8b949e] max-w-xl mx-auto"
          >
            Curated courses from industry practitioners at top tech companies. Structured for real outcomes.
          </motion.p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                active === f
                  ? "bg-[#0071e3] text-white shadow-lg shadow-[#0071e3]/25"
                  : "bg-[#161b22] border border-[#21262d] text-[#8b949e] hover:text-white hover:border-[#30363d]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <TiltCard intensity={8}>
                  <CourseCard course={course} />
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
