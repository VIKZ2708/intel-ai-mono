"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LearningPaths from "@/components/LearningPaths";
import CoursesSection from "@/components/CoursesSection";
import YearProgram from "@/components/YearProgram";
import Testimonials from "@/components/Testimonials";
import FoundersSection from "@/components/FoundersSection";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import AIChat from "@/components/AIChat";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <Navbar onLoginClick={() => setLoginOpen(true)} />
      <Hero onLoginClick={() => setLoginOpen(true)} />
      <LearningPaths />
      <CoursesSection />
      <YearProgram />
      <Testimonials />
      <FoundersSection />

      {/* Final CTA Banner */}
      <section className="py-20 bg-[#161b22] border-t border-[#21262d]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Ready to Transform Your Career?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#8b949e] mb-8 text-lg"
          >
            Join 1,000+ engineers who chose Intel AI to build the career they deserve.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#courses"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0071e3] hover:bg-[#0058b3] text-white font-semibold rounded-xl text-base transition-all duration-200 shadow-lg shadow-[#0071e3]/25"
            >
              Browse Courses <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => setLoginOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#30363d] hover:border-[#0071e3]/50 text-white font-semibold rounded-xl text-base transition-all duration-200 hover:bg-white/5"
            >
              Create Free Account
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
      <AIChat />
    </div>
  );
}
