"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoginModal from "@/components/LoginModal";
import {
  ArrowRight, Check, MessageCircle, Building2,
  FileText, Users, Trophy, BookOpen, Zap, ChevronDown, Star,
  MapPin, Phone, Mail, BadgeCheck
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const collegePerks = [
  {
    icon: FileText,
    title: "Official MOU + Certification",
    desc: "Formal Memorandum of Understanding between your institution and Intel AI. Students receive an industry-recognised Intel AI certificate on completion.",
    color: "border-blue-500/30 bg-blue-500/5",
    iconColor: "text-blue-400",
  },
  {
    icon: BookOpen,
    title: "Structured DSA & Placement Curriculum",
    desc: "A complete 1-year programme covering DSA, System Design, Full Stack, and AI — delivered on-campus or hybrid by Intel AI instructors.",
    color: "border-cyan-500/30 bg-cyan-500/5",
    iconColor: "text-cyan-400",
  },
  {
    icon: Trophy,
    title: "Mock Interviews & Placement Support",
    desc: "Intel AI conducts mock interview drives, coding contests, and connects your students directly to our hiring partners.",
    color: "border-purple-500/30 bg-purple-500/5",
    iconColor: "text-purple-400",
  },
  {
    icon: Star,
    title: "Guest Lectures by Founders",
    desc: "Vikas Jakhar and Jitender Singh Punia personally conduct workshops and sessions at partner campuses every semester.",
    color: "border-orange-500/30 bg-orange-500/5",
    iconColor: "text-orange-400",
  },
];

const studentPerks = [
  "Industry-validated DSA + System Design curriculum",
  "Access to Intel AI's full online platform",
  "Mock interviews with real industry experts",
  "Dedicated placement assistance",
  "Intel AI Certificate on completion",
  "Direct access to 100+ hiring partners",
  "Live doubt-clearing sessions",
  "Hands-on project-based learning",
];

const curriculum = [
  {
    quarter: "Q1",
    title: "DSA Foundations",
    duration: "Months 1–3",
    color: "from-blue-600 to-cyan-500",
    topics: ["Arrays, Strings, Hashing", "Linked Lists, Stacks, Queues", "Recursion & Backtracking", "Trees & Binary Search Trees", "Big-O & Complexity Analysis"],
  },
  {
    quarter: "Q2",
    title: "Advanced DSA & Problem Solving",
    duration: "Months 4–6",
    color: "from-purple-600 to-blue-500",
    topics: ["Graphs — BFS, DFS, Topological Sort", "Dynamic Programming", "Greedy Algorithms", "Segment Trees & Advanced Structures", "150+ Curated Practice Problems"],
  },
  {
    quarter: "Q3",
    title: "System Design & Full Stack",
    duration: "Months 7–9",
    color: "from-cyan-500 to-teal-500",
    topics: ["Scalable System Design Principles", "Databases — SQL & NoSQL", "REST APIs, Caching, Load Balancers", "React + Node.js Project", "Real-World Architecture Case Studies"],
  },
  {
    quarter: "Q4",
    title: "Placement Prep & AI Basics",
    duration: "Months 10–12",
    color: "from-orange-500 to-pink-500",
    topics: ["Mock Interview Drives", "Resume & LinkedIn Optimisation", "HR + Technical Round Preparation", "AI/ML Fundamentals", "Final Project & Certification"],
  },
];

const steps = [
  { step: "01", title: "College Registers", desc: "Submit your institution's details. Our team contacts you within 48 hours." },
  { step: "02", title: "MOU Signed", desc: "We formalise the partnership with a signed Memorandum of Understanding." },
  { step: "03", title: "Programme Kicks Off", desc: "Intel AI instructors begin sessions on-campus or hybrid — your schedule, our content." },
  { step: "04", title: "Students Get Certified", desc: "On completion, students receive the Intel AI certificate and placement support." },
];

const faqs = [
  { q: "What does the college need to provide?", a: "A venue and students. Intel AI brings the curriculum, instructors, study material, and placement support. No special infrastructure is required from the college." },
  { q: "How are sessions conducted — online or offline?", a: "We offer both. Colleges can choose fully on-campus, fully online, or a hybrid model based on their infrastructure and schedule." },
  { q: "What is the fee for the programme?", a: "The fee is customised based on the college's student strength, batch size, and selected modules. Contact us for a personalised quote." },
  { q: "Does Intel AI provide study material and LMS access?", a: "Yes. All enrolled students get full access to Intel AI's online platform including video lessons, practice problems, and AI-assisted learning tools." },
  { q: "How many students per batch?", a: "We support batches from 30 to 300+ students. Larger batches may have multiple instructors assigned." },
  { q: "How long does the MOU process take?", a: "Typically 5–7 working days from the initial call. Our team handles all documentation and onboarding to make it seamless for your institution." },
];

// ─── College Registration Form ────────────────────────────────────────────────

function CollegeForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({ institution: "", contact: "", email: "", phone: "", city: "", students: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); onSuccess(); }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="text-xs font-medium text-[#8b949e] mb-1.5 block">Institution Name *</label>
          <input required value={form.institution} onChange={e => setForm(f => ({ ...f, institution: e.target.value }))}
            placeholder="Delhi Technological University"
            className="w-full px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-xl text-white placeholder:text-[#484f58] text-sm focus:outline-none focus:border-[#0071e3] transition-colors" />
        </div>
        <div>
          <label className="text-xs font-medium text-[#8b949e] mb-1.5 block">Contact Person *</label>
          <input required value={form.contact} onChange={e => setForm(f => ({ ...f, contact: e.target.value }))}
            placeholder="Prof. Anita Singh"
            className="w-full px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-xl text-white placeholder:text-[#484f58] text-sm focus:outline-none focus:border-[#0071e3] transition-colors" />
        </div>
        <div>
          <label className="text-xs font-medium text-[#8b949e] mb-1.5 block">Official Email *</label>
          <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="placement@dtu.ac.in"
            className="w-full px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-xl text-white placeholder:text-[#484f58] text-sm focus:outline-none focus:border-[#0071e3] transition-colors" />
        </div>
        <div>
          <label className="text-xs font-medium text-[#8b949e] mb-1.5 block">Phone Number *</label>
          <input required value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            placeholder="+91 98765 43210"
            className="w-full px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-xl text-white placeholder:text-[#484f58] text-sm focus:outline-none focus:border-[#0071e3] transition-colors" />
        </div>
        <div>
          <label className="text-xs font-medium text-[#8b949e] mb-1.5 block">City *</label>
          <input required value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
            placeholder="New Delhi"
            className="w-full px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-xl text-white placeholder:text-[#484f58] text-sm focus:outline-none focus:border-[#0071e3] transition-colors" />
        </div>
        <div>
          <label className="text-xs font-medium text-[#8b949e] mb-1.5 block">Approx. Student Count</label>
          <select value={form.students} onChange={e => setForm(f => ({ ...f, students: e.target.value }))}
            className="w-full px-4 py-3 bg-[#0d1117] border border-[#30363d] rounded-xl text-white text-sm focus:outline-none focus:border-[#0071e3] transition-colors appearance-none">
            <option value="">Select range</option>
            <option>Under 100</option>
            <option>100 – 300</option>
            <option>300 – 600</option>
            <option>600+</option>
          </select>
        </div>
      </div>
      <button type="submit" disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-purple-600 to-[#0071e3] hover:opacity-90 disabled:opacity-60 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg flex items-center justify-center gap-2">
        {loading
          ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Submitting...</>
          : <><Building2 className="w-4 h-4" /> Partner with Intel AI</>}
      </button>
    </form>
  );
}

function SuccessState() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="py-12 text-center"
    >
      <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-5">
        <BadgeCheck className="w-8 h-8 text-green-400" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">Partnership request received!</h3>
      <p className="text-[#8b949e] max-w-sm mx-auto text-sm">
        Our team will contact you within 48 hours to discuss the partnership and schedule a call.
      </p>
      <p className="text-xs text-[#8b949e]/60 mt-4">
        Questions? Email us at{" "}
        <a href="mailto:vikz2708@gmail.com" className="text-[#0071e3] hover:underline">vikz2708@gmail.com</a>
      </p>
    </motion.div>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#21262d] rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/3 transition-colors">
        <span className="text-sm font-semibold text-white pr-4">{q}</span>
        <ChevronDown className={`w-4 h-4 text-[#8b949e] flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-6 pb-4 text-sm text-[#8b949e] leading-relaxed border-t border-[#21262d] pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CampusPage() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [collegeDone, setCollegeDone] = useState(false);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <Navbar onLoginClick={() => setLoginOpen(true)} />

      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex flex-col justify-center overflow-hidden hero-grid pt-24 pb-16">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="orb-drift aurora absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#0071e3]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/8 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/30 text-sm text-[#3d95f4] mb-7"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            Intel AI College Programme
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            <span className="text-white">Bring</span>{" "}
            <span className="gradient-text">World-Class</span>
            <br />
            <span className="text-white">Tech Education</span>
            <br />
            <span className="text-white">to Your Campus.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg sm:text-xl text-[#8b949e] max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            A structured 1-year programme — covering <strong className="text-white">DSA</strong>,{" "}
            <strong className="text-white">System Design</strong>,{" "}
            <strong className="text-white">Full Stack</strong>, and{" "}
            <strong className="text-white">Placement Prep</strong> — delivered on your campus, backed by Intel AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a href="#partner"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0071e3] hover:bg-[#0058b3] text-white font-semibold rounded-xl text-base transition-all duration-200 shadow-lg shadow-[#0071e3]/25 hover:-translate-y-0.5">
              <Building2 className="w-4 h-4" /> Partner Your College
            </a>
            <a href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 hover:bg-white/10 border border-[#30363d] hover:border-[#0071e3]/50 text-white font-semibold rounded-xl text-base transition-all duration-200 hover:-translate-y-0.5">
              How It Works <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-12 bg-[#161b22] border-y border-[#21262d]">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { val: "1 Year",    label: "Structured Programme" },
            { val: "4",         label: "Core Subjects" },
            { val: "100+",      label: "Hiring Partners" },
            { val: "On-Campus", label: "Delivery Mode" },
          ].map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}>
              <div className="text-2xl sm:text-3xl font-bold gradient-text mb-1">{s.val}</div>
              <div className="text-xs text-[#8b949e]">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-24 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0071e3] mb-3">
              Simple Process
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-white">
              How the Partnership <span className="gradient-text">Works</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#0071e3]/30 to-transparent" />
            {steps.map((s, i) => (
              <motion.div key={s.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex flex-col items-center text-center p-6 bg-[#161b22] border border-[#21262d] rounded-2xl hover:border-[#0071e3]/40 transition-colors">
                <div className="w-10 h-10 rounded-full bg-[#0071e3]/10 border border-[#0071e3]/30 flex items-center justify-center text-sm font-bold text-[#0071e3] mb-4 z-10 relative">
                  {s.step}
                </div>
                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-[#8b949e] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Colleges Get ── */}
      <section className="py-24 bg-[#161b22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0071e3] mb-3">
              For Colleges
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything Your College <span className="gradient-text">Gets</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-[#8b949e] max-w-xl mx-auto">
              A complete, ready-to-deploy programme. No infrastructure needed — we bring the content, instructors, and placement support.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collegePerks.map((p, i) => (
              <motion.div key={p.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-2xl border ${p.color} transition-all duration-300 hover:scale-[1.02]`}>
                <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${p.iconColor}`}>
                  <p.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white mb-2">{p.title}</h3>
                <p className="text-sm text-[#8b949e] leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What Students Get (informational — for colleges to see the value) ── */}
      <section className="py-24 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0071e3] mb-3">Student Outcomes</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                What Your Students{" "}
                <span className="gradient-text">Walk Away With</span>
              </h2>
              <p className="text-[#8b949e] mb-8 leading-relaxed">
                Every student enrolled through your institution gets a complete learning ecosystem — not just lectures, but a full placement-ready journey.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {studentPerks.map((perk) => (
                  <div key={perk} className="flex items-start gap-2.5 text-sm text-[#8b949e]">
                    <Check className="w-4 h-4 text-[#0071e3] flex-shrink-0 mt-0.5" />
                    {perk}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="gradient-border rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#0071e3]/10 border border-[#0071e3]/30 flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#0071e3]" />
                </div>
                <div>
                  <div className="font-bold text-white">Intel AI Certificate</div>
                  <div className="text-xs text-[#8b949e]">Issued on successful completion</div>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                {["DSA & Problem Solving", "System Design", "Full Stack Development", "AI Fundamentals", "Mock Interviews Cleared"].map((item) => (
                  <div key={item} className="flex items-center gap-3 py-2.5 px-4 bg-[#0d1117] border border-[#21262d] rounded-xl text-sm text-[#8b949e]">
                    <BadgeCheck className="w-4 h-4 text-green-400 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-[#8b949e] border-t border-[#21262d] pt-4">
                <MapPin className="w-3.5 h-3.5 text-[#0071e3]" />
                Delivered on your campus · Recognised by 100+ hiring partners
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Curriculum ── */}
      <section className="py-24 bg-[#161b22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0071e3] mb-3">
              1-Year Roadmap
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What We Teach, <span className="gradient-text">Quarter by Quarter</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {curriculum.map((q, i) => (
              <motion.div key={q.quarter}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-[#0d1117] border border-[#21262d] rounded-2xl p-6 hover:border-[#0071e3]/40 transition-colors">
                <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${q.color}`} />
                <div className={`inline-block px-2.5 py-1 rounded-lg bg-gradient-to-r ${q.color} text-white text-xs font-bold mb-3`}>
                  {q.quarter}
                </div>
                <h3 className="font-bold text-white mb-1">{q.title}</h3>
                <p className="text-xs text-[#8b949e] mb-4">{q.duration}</p>
                <ul className="space-y-2">
                  {q.topics.map((t) => (
                    <li key={t} className="flex items-start gap-2 text-xs text-[#8b949e]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0071e3]/60 mt-1.5 flex-shrink-0" />
                      {t}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partner Form ── */}
      <section id="partner" className="py-24 bg-[#0d1117] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0071e3]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0071e3] mb-3">
              Partner with Us
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Bring Intel AI to <span className="gradient-text">Your Campus</span>
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-[#8b949e]">
              Fill in your institution&apos;s details and our team will get back to you within 48 hours.
            </motion.p>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-[#161b22] border border-[#21262d] rounded-2xl p-8">
            {collegeDone ? <SuccessState /> : <CollegeForm onSuccess={() => setCollegeDone(true)} />}
          </motion.div>

          <div className="text-center mt-6">
            <p className="text-xs text-[#8b949e] mb-3">Prefer to talk directly?</p>
            <a href="https://wa.me/919871358616?text=Hi%2C%20I%27m%20interested%20in%20partnering%20with%20Intel%20AI%20for%20the%20College%20Programme.%20Can%20you%20share%20more%20details%3F"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#21262d] hover:border-green-500/40 text-[#8b949e] hover:text-green-400 rounded-xl text-sm transition-all">
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact Strip ── */}
      <section className="py-12 bg-[#161b22] border-y border-[#21262d]">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          {[
            { icon: Mail,    label: "Email Us",  val: "vikz2708@gmail.com",                href: "mailto:vikz2708@gmail.com" },
            { icon: Phone,   label: "WhatsApp",  val: "+91 98713 58616",                   href: "https://wa.me/919871358616" },
            { icon: MapPin,  label: "Based In",  val: "India · On-campus across cities",   href: null },
          ].map((c) => (
            <div key={c.label} className="flex flex-col items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#0071e3]/10 border border-[#0071e3]/20 flex items-center justify-center">
                <c.icon className="w-4 h-4 text-[#0071e3]" />
              </div>
              <div className="text-xs text-[#8b949e] uppercase tracking-widest">{c.label}</div>
              {c.href ? (
                <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="text-sm text-white hover:text-[#0071e3] transition-colors">{c.val}</a>
              ) : (
                <span className="text-sm text-white">{c.val}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-24 bg-[#0d1117]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0071e3] mb-3">
              FAQ
            </motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-white">
              Common <span className="gradient-text">Questions</span>
            </motion.h2>
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <motion.div key={f.q}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}>
                <FAQItem q={f.q} a={f.a} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-20 bg-[#161b22] border-t border-[#21262d]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Bring Intel AI to Your Campus?
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#8b949e] mb-8 text-lg">
            Partner with us and give your students a structured, industry-backed path to their first tech job.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#partner"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0071e3] hover:bg-[#0058b3] text-white font-semibold rounded-xl text-base transition-all duration-200 shadow-lg shadow-[#0071e3]/25">
              <Building2 className="w-4 h-4" /> Partner Your College <ArrowRight className="w-4 h-4" />
            </a>
            <a href="https://wa.me/919871358616?text=Hi%2C%20I%27m%20interested%20in%20partnering%20with%20Intel%20AI%20for%20the%20College%20Programme."
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#30363d] hover:border-green-500/40 text-white hover:text-green-400 font-semibold rounded-xl text-base transition-all duration-200 hover:bg-white/5">
              <MessageCircle className="w-4 h-4" /> Talk on WhatsApp
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  );
}
