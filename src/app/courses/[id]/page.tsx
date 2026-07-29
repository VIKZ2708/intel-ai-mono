"use client";

import { use, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { courses } from "@/lib/data";
import {
  Clock, BookOpen, BarChart2, ChevronDown, ChevronRight,
  CheckCircle2, Users, Zap, ArrowRight, Star, MessageCircle,
  Code2, Layers, Brain,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import LoginModal from "@/components/LoginModal";
import AIChat from "@/components/AIChat";
import { apiFetch } from "@/lib/apiClient";

const categoryColor: Record<string, string> = {
  DSA: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "System Design": "text-purple-400 bg-purple-400/10 border-purple-400/20",
  "Full Stack": "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  "Web Dev": "text-orange-400 bg-orange-400/10 border-orange-400/20",
  "AI/ML": "text-pink-400 bg-pink-400/10 border-pink-400/20",
};

const levelColor: Record<string, string> = {
  Beginner: "text-green-400 bg-green-400/10 border-green-400/20",
  Intermediate: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Advanced: "text-red-400 bg-red-400/10 border-red-400/20",
};

const categoryIcon: Record<string, React.ReactNode> = {
  DSA: <Code2 className="w-5 h-5" />,
  "System Design": <Layers className="w-5 h-5" />,
  "Full Stack": <Zap className="w-5 h-5" />,
  "Web Dev": <Code2 className="w-5 h-5" />,
  "AI/ML": <Brain className="w-5 h-5" />,
};

const instructors = {
  vikas: {
    name: "Vikas Jakhar",
    role: "CEO & Lead Instructor",
    photo: "/founders/vikas.jpeg",
    bio: "Engineering Lead at TATA AIG General Insurance, with prior experience as Tech Lead at Xarterian and SDE-2 at MediBuddy. 5+ years of teaching DSA and competitive programming at Pepcoding and Scaler.",
    tags: ["DSA Expert", "System Design", "TATA AIG", "Pepcoding", "Scaler"],
  },
  jitender: {
    name: "Jitender Singh Punia",
    role: "CTO & Lead Instructor",
    photo: "/founders/jitender.png",
    bio: "Seasoned technology architect with deep expertise in distributed systems, AI/ML infrastructure, and full-stack engineering. Co-founder of Intel AI with a passion for making complex concepts accessible.",
    tags: ["Distributed Systems", "AI/ML", "Architecture", "Full Stack"],
  },
  both: null,
};

export default function CoursePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const course = courses.find((c) => c.id === Number(id));
  const [openModule, setOpenModule] = useState<number | null>(0);
  const [loginOpen, setLoginOpen] = useState(false);
  const [enrollOpen, setEnrollOpen] = useState(false);
  const [enrollDone, setEnrollDone] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const nameRef  = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const msgRef   = useRef<HTMLTextAreaElement>(null);

  async function handleEnroll(e: React.FormEvent) {
    e.preventDefault();
    setEnrolling(true);
    try {
      await apiFetch("/enrollment", {
        method: "POST",
        body: JSON.stringify({
          name: nameRef.current?.value,
          email: emailRef.current?.value,
          phone: phoneRef.current?.value,
          courseId: String(course?.id),
          courseName: course?.title,
          message: msgRef.current?.value,
        }),
      });
      setEnrollDone(true);
    } finally {
      setEnrolling(false);
    }
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-[#8b949e] mb-4">Course not found.</p>
          <Link href="/#courses" className="text-[#0071e3] hover:underline">← Back to courses</Link>
        </div>
      </div>
    );
  }

  const instructor = course.instructor !== "both"
    ? instructors[course.instructor]
    : null;

  const totalTopics = course.curriculum.reduce((a, m) => a + m.topics.length, 0);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <Navbar onLoginClick={() => setLoginOpen(true)} />

      {/* ── Hero ── */}
      <section className="pt-24 pb-0 bg-[#0d1117] border-b border-[#21262d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#8b949e] mb-6 pt-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/#courses" className="hover:text-white transition-colors">Courses</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#c9d1d9]">{course.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pb-10">
            {/* Left: Text */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryColor[course.category]}`}>
                  {categoryIcon[course.category]} {course.category}
                </span>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${levelColor[course.level]}`}>
                  {course.level}
                </span>
                {course.popular && (
                  <span className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#0071e3]/15 border border-[#0071e3]/30 text-[#0071e3]">
                    <Star className="w-3 h-3 fill-current" /> Popular
                  </span>
                )}
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight"
              >
                {course.title}
              </motion.h1>

              <p className="text-[#8b949e] text-lg leading-relaxed mb-6">{course.description}</p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-6 text-sm text-[#8b949e]">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-[#0071e3]" />{course.duration}</span>
                <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-[#0071e3]" />{course.lessons} lessons</span>
                <span className="flex items-center gap-1.5"><BarChart2 className="w-4 h-4 text-[#0071e3]" />{course.level}</span>
                <span className="flex items-center gap-1.5"><Layers className="w-4 h-4 text-[#0071e3]" />{course.curriculum.length} modules · {totalTopics} topics</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-[#0071e3]" />1,000+ enrolled</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-5">
                {course.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 bg-[#1c2333] border border-[#21262d] text-[#8b949e] rounded-lg">{tag}</span>
                ))}
              </div>
            </div>

            {/* Right: Course Card (sticky CTA) */}
            <div className="lg:col-span-1">
              <div className="bg-[#161b22] border border-[#21262d] rounded-2xl overflow-hidden shadow-2xl sticky top-24">
                <div className="relative h-44">
                  <Image src={course.image} alt={course.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-transparent to-transparent" />
                </div>
                <div className="p-5">
                  <div className="text-xs text-[#8b949e] mb-1.5 text-center">Fee on Inquiry</div>
                  <p className="text-center text-[#c9d1d9] text-sm mb-5">
                    Pricing is customised based on your background and goals. Reach out to know more.
                  </p>
                  <button
                    onClick={() => { setEnrollDone(false); setEnrollOpen(true); }}
                    className="w-full py-3 bg-[#0071e3] hover:bg-[#0058b3] text-white font-semibold rounded-xl transition-colors mb-3 flex items-center justify-center gap-2"
                  >
                    Enroll Now <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setLoginOpen(true)}
                    className="w-full py-2.5 border border-[#30363d] hover:border-[#0071e3]/50 text-[#c9d1d9] hover:text-white rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" /> Talk to an Advisor
                  </button>

                  <div className="mt-5 pt-4 border-t border-[#21262d] space-y-2 text-xs text-[#8b949e]">
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />{course.lessons} video lessons</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />Lifetime access to recordings</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />Certificate of completion</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />Live doubt-clearing sessions</div>
                    <div className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />Private Discord community</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What You'll Learn ── */}
      <section className="py-14 bg-[#161b22] border-b border-[#21262d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-[calc(33.333%+3rem)]">
          <h2 className="text-xl font-bold text-white mb-6">What you'll learn</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {course.whatYouLearn.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-[#0071e3] flex-shrink-0 mt-0.5" />
                <span className="text-sm text-[#c9d1d9]">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Curriculum ── */}
      <section className="py-14 bg-[#0d1117] border-b border-[#21262d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-[calc(33.333%+3rem)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Course Curriculum</h2>
            <span className="text-xs text-[#8b949e]">{course.curriculum.length} modules · {totalTopics} topics · {course.duration}</span>
          </div>
          <div className="space-y-2">
            {course.curriculum.map((mod, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenModule(openModule === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/3 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-[#0071e3]/10 border border-[#0071e3]/20 flex items-center justify-center text-xs font-bold text-[#0071e3] flex-shrink-0">
                      {i + 1}
                    </span>
                    <span className="text-sm font-semibold text-white">{mod.title}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                    <span className="text-xs text-[#8b949e] hidden sm:block">{mod.topics.length} topics</span>
                    <ChevronDown className={`w-4 h-4 text-[#8b949e] transition-transform ${openModule === i ? "rotate-180" : ""}`} />
                  </div>
                </button>
                {openModule === i && (
                  <div className="px-5 pb-4 border-t border-[#21262d]">
                    <ul className="mt-3 space-y-2">
                      {mod.topics.map((topic, j) => (
                        <li key={j} className="flex items-start gap-2.5 text-sm text-[#8b949e]">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#0071e3]/50 flex-shrink-0 mt-1.5" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Prerequisites & Who is this for ── */}
      <section className="py-14 bg-[#161b22] border-b border-[#21262d]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-[calc(33.333%+3rem)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Prerequisites</h2>
              <ul className="space-y-2.5">
                {course.prerequisites.map((p, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#c9d1d9]">
                    <div className="w-5 h-5 rounded-full bg-[#21262d] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0071e3]" />
                    </div>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Who is this for?</h2>
              <ul className="space-y-2.5">
                {course.forWhom.map((f, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#c9d1d9]">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Instructor ── */}
      {instructor && (
        <section className="py-14 bg-[#0d1117] border-b border-[#21262d]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-[calc(33.333%+3rem)]">
            <h2 className="text-xl font-bold text-white mb-6">Your Instructor</h2>
            <div className="flex items-start gap-5 bg-[#161b22] border border-[#21262d] rounded-2xl p-6">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                <Image src={instructor.photo} alt={instructor.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-base font-bold text-white">{instructor.name}</div>
                <div className="text-sm text-[#0071e3] mb-2">{instructor.role}</div>
                <p className="text-sm text-[#8b949e] leading-relaxed mb-3">{instructor.bio}</p>
                <div className="flex flex-wrap gap-1.5">
                  {instructor.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-0.5 bg-[#0071e3]/10 border border-[#0071e3]/20 text-[#0071e3] rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Dual instructor ── */}
      {course.instructor === "both" && (
        <section className="py-14 bg-[#0d1117] border-b border-[#21262d]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:pr-[calc(33.333%+3rem)]">
            <h2 className="text-xl font-bold text-white mb-6">Your Instructors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {([instructors.vikas, instructors.jitender] as NonNullable<typeof instructors.vikas>[]).map((inst) => (
                <div key={inst.name} className="flex items-start gap-4 bg-[#161b22] border border-[#21262d] rounded-2xl p-5">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={inst.photo} alt={inst.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-white">{inst.name}</div>
                    <div className="text-xs text-[#0071e3] mb-2">{inst.role}</div>
                    <p className="text-xs text-[#8b949e] leading-relaxed line-clamp-3">{inst.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Bottom CTA ── */}
      <section className="py-16 bg-[#161b22]">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Ready to get started?</h2>
          <p className="text-[#8b949e] mb-8">
            This course is part of Intel AI's curated curriculum. Pricing is personalised — reach out to know your options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => { setEnrollDone(false); setEnrollOpen(true); }}
              className="px-8 py-3.5 bg-[#0071e3] hover:bg-[#0058b3] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Enroll Now <ArrowRight className="w-4 h-4" />
            </button>
            <Link
              href="/practice"
              className="px-8 py-3.5 border border-[#30363d] hover:border-[#0071e3]/50 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Try Practice Arena
            </Link>
          </div>
        </div>
      </section>

      <LoginModal isOpen={loginOpen} onClose={() => setLoginOpen(false)} />
      <AIChat />

      {/* Enrollment Modal */}
      {enrollOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setEnrollOpen(false)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#161b22] border border-[#21262d] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-[#21262d] flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Enroll in {course?.title}</div>
                <div className="text-xs text-[#8b949e] mt-0.5">We'll get back to you within 24 hours</div>
              </div>
              <button onClick={() => setEnrollOpen(false)} className="p-1.5 text-[#8b949e] hover:text-white hover:bg-white/5 rounded-lg">✕</button>
            </div>

            {enrollDone ? (
              <div className="px-6 py-10 text-center">
                <div className="text-4xl mb-3">🎉</div>
                <h3 className="text-lg font-bold text-white mb-2">You're on the list!</h3>
                <p className="text-[#8b949e] text-sm">We've received your request and will reach out to you at your email within 24 hours.</p>
                <button onClick={() => setEnrollOpen(false)} className="mt-6 px-6 py-2.5 bg-[#0071e3] hover:bg-[#0058b3] text-white font-semibold rounded-xl text-sm transition-colors">Done</button>
              </div>
            ) : (
              <form onSubmit={handleEnroll} className="px-6 py-5 space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#8b949e] mb-1.5">Full Name *</label>
                  <input ref={nameRef} required placeholder="Vikas Jakhar" className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#0071e3] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#8b949e] outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#8b949e] mb-1.5">Email Address *</label>
                  <input ref={emailRef} required type="email" placeholder="you@example.com" className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#0071e3] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#8b949e] outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#8b949e] mb-1.5">Phone Number</label>
                  <input ref={phoneRef} type="tel" placeholder="+91 98713 58616" className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#0071e3] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#8b949e] outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#8b949e] mb-1.5">Message (optional)</label>
                  <textarea ref={msgRef} rows={3} placeholder="Tell us your background or any questions..." className="w-full bg-[#0d1117] border border-[#30363d] focus:border-[#0071e3] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#8b949e] outline-none transition-colors resize-none" />
                </div>
                <button type="submit" disabled={enrolling} className="w-full py-3 bg-[#0071e3] hover:bg-[#0058b3] disabled:opacity-60 text-white font-semibold rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
                  {enrolling ? "Submitting..." : "Submit Enrollment Request"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
