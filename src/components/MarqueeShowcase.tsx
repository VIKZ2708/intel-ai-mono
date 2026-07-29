"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Flame, Trophy, BookOpen, Brain, BarChart3, GraduationCap, Code2 } from "lucide-react";

/* ── Mockup card designs ────────────────────────────── */

function IDECard() {
  return (
    <div className="w-[280px] rounded-xl bg-[#0d1117] border border-[#21262d] overflow-hidden flex-shrink-0 shadow-xl">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#161b22] border-b border-[#21262d]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" /><div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" /><div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[10px] text-[#8b949e] font-mono">two_sum.py</span>
        <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded bg-[#0071e3]/20 text-[#3d95f4] border border-[#0071e3]/30">Python</span>
      </div>
      <div className="px-3 py-3 font-mono text-[11px] leading-5 space-y-0.5">
        <div><span className="text-[#c792ea]">def </span><span className="text-[#82aaff]">twoSum</span><span className="text-[#89ddff]">(nums, target):</span></div>
        <div><span className="text-[#e6edf3]">    seen </span><span className="text-[#89ddff]">= </span><span className="text-[#ffcb6b]">{"{}"}</span></div>
        <div><span className="text-[#c792ea]">    for </span><span className="text-[#e6edf3]">i, num </span><span className="text-[#c792ea]">in </span><span className="text-[#82aaff]">enumerate</span><span className="text-[#89ddff]">(nums):</span></div>
        <div><span className="text-[#e6edf3]">        comp </span><span className="text-[#89ddff]">= </span><span className="text-[#e6edf3]">target - num</span></div>
        <div><span className="text-[#c792ea]">        if </span><span className="text-[#e6edf3]">comp </span><span className="text-[#c792ea]">in </span><span className="text-[#e6edf3]">seen:</span></div>
        <div><span className="text-[#c792ea]">            return </span><span className="text-[#ffcb6b]">[seen[comp], i]</span></div>
      </div>
      <div className="mx-3 mb-3 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-between">
        <div className="flex items-center gap-1.5"><CheckCircle2 className="w-3 h-3 text-green-400" /><span className="text-[10px] font-bold text-green-400">Accepted</span></div>
        <div className="text-[9px] text-[#8b949e]">⚡ 52ms · 💾 17.2MB</div>
      </div>
    </div>
  );
}

function DashboardCard() {
  const days = ["M","T","W","T","F","S","S"];
  const active = [true,true,true,true,false,true,false];
  return (
    <div className="w-[260px] rounded-xl bg-[#0d1117] border border-[#21262d] overflow-hidden flex-shrink-0 shadow-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2"><BarChart3 className="w-4 h-4 text-[#0071e3]" /><span className="text-xs font-bold text-white">My Progress</span></div>
        <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#0071e3]/10 text-[#3d95f4] border border-[#0071e3]/20">This Week</span>
      </div>
      {/* Circular progress */}
      <div className="flex items-center gap-4 mb-3">
        <div className="relative w-14 h-14 flex-shrink-0">
          <svg className="w-14 h-14 -rotate-90" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" fill="none" stroke="#21262d" strokeWidth="4" />
            <circle cx="24" cy="24" r="20" fill="none" stroke="#0071e3" strokeWidth="4" strokeDasharray="125.6" strokeDashoffset="40" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">68%</div>
        </div>
        <div>
          <div className="text-[11px] text-white font-semibold mb-1">24 / 50 solved</div>
          <div className="flex items-center gap-1 text-[10px] text-orange-400"><Flame className="w-3 h-3 fill-current" />7-day streak</div>
        </div>
      </div>
      <div className="flex gap-1">
        {days.map((d, i) => (
          <div key={i} className={`flex-1 h-6 rounded text-center text-[9px] leading-6 font-medium ${active[i] ? "bg-[#0071e3] text-white" : "bg-[#161b22] text-[#8b949e]"}`}>{d}</div>
        ))}
      </div>
    </div>
  );
}

function CourseCard() {
  return (
    <div className="w-[250px] rounded-xl bg-[#0d1117] border border-[#21262d] overflow-hidden flex-shrink-0 shadow-xl">
      <div className="h-28 bg-gradient-to-br from-[#0071e3] via-[#3d95f4] to-[#00c9ff] flex items-center justify-center">
        <Code2 className="w-12 h-12 text-white/80" />
      </div>
      <div className="p-3">
        <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-500/15 text-green-400 border border-green-500/20 mb-1.5 inline-block">Bestseller</span>
        <div className="text-xs font-bold text-white mb-1">DSA Fundamentals</div>
        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-yellow-400 text-[10px]">{"★★★★★"}</div>
          <span className="text-[9px] text-[#8b949e]">4.9 (312)</span>
        </div>
        <div className="flex items-center gap-2 text-[9px] text-[#8b949e]"><BookOpen className="w-3 h-3" />40 lessons · 12h</div>
      </div>
    </div>
  );
}

function AICard() {
  return (
    <div className="w-[270px] rounded-xl bg-[#0d1117] border border-[#21262d] overflow-hidden flex-shrink-0 shadow-xl">
      <div className="flex items-center gap-2 px-3 py-2.5 bg-[#161b22] border-b border-[#21262d]">
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#0071e3] to-[#00c9ff] flex items-center justify-center">
          <Brain className="w-3 h-3 text-white" />
        </div>
        <span className="text-[10px] font-semibold text-white">AI Teaching Assistant</span>
        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
      </div>
      <div className="p-3 space-y-2">
        <div className="flex justify-end"><div className="bg-[#0071e3]/20 border border-[#0071e3]/30 rounded-xl rounded-tr-sm px-2.5 py-1.5 text-[10px] text-white max-w-[170px]">What&apos;s the time complexity of this approach?</div></div>
        <div className="flex justify-start"><div className="bg-[#161b22] border border-[#21262d] rounded-xl rounded-tl-sm px-2.5 py-1.5 text-[10px] text-[#e6edf3] max-w-[190px]">It&apos;s <span className="text-[#82aaff] font-mono">O(n)</span> — a single pass through the array using a hash map for O(1) lookups.</div></div>
        <div className="flex justify-end"><div className="bg-[#0071e3]/20 border border-[#0071e3]/30 rounded-xl rounded-tr-sm px-2.5 py-1.5 text-[10px] text-white max-w-[170px]">Can you give me a hint?</div></div>
      </div>
    </div>
  );
}

function ProblemListCard() {
  const problems = [
    { name: "Two Sum",        diff: "Easy",   done: true  },
    { name: "Valid Parens",   diff: "Easy",   done: true  },
    { name: "Merge Lists",    diff: "Easy",   done: false },
    { name: "Max Subarray",   diff: "Medium", done: false },
    { name: "LRU Cache",      diff: "Hard",   done: false },
  ];
  const color: Record<string, string> = { Easy: "text-green-400", Medium: "text-yellow-400", Hard: "text-red-400" };
  return (
    <div className="w-[260px] rounded-xl bg-[#0d1117] border border-[#21262d] overflow-hidden flex-shrink-0 shadow-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Code2 className="w-3.5 h-3.5 text-[#0071e3]" />
        <span className="text-xs font-bold text-white">Practice Problems</span>
        <span className="ml-auto text-[9px] text-[#8b949e]">24/50 done</span>
      </div>
      <div className="space-y-1.5">
        {problems.map((p) => (
          <div key={p.name} className="flex items-center gap-2 text-[10px]">
            <div className={`w-3 h-3 rounded-full border flex-shrink-0 flex items-center justify-center ${p.done ? "bg-green-500/20 border-green-500/40" : "border-[#30363d]"}`}>
              {p.done && <CheckCircle2 className="w-2.5 h-2.5 text-green-400" />}
            </div>
            <span className={`flex-1 ${p.done ? "text-[#8b949e] line-through" : "text-white"}`}>{p.name}</span>
            <span className={`text-[9px] ${color[p.diff]}`}>{p.diff}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function LeaderboardCard() {
  const students = [
    { name: "Rahul K.",  pts: 892, medal: "🥇" },
    { name: "Priya S.",  pts: 847, medal: "🥈" },
    { name: "Arjun M.",  pts: 821, medal: "🥉" },
    { name: "You",       pts: 756, medal: "4️⃣", isYou: true },
  ];
  return (
    <div className="w-[240px] rounded-xl bg-[#0d1117] border border-[#21262d] overflow-hidden flex-shrink-0 shadow-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Trophy className="w-3.5 h-3.5 text-yellow-400" />
        <span className="text-xs font-bold text-white">Leaderboard</span>
        <span className="ml-auto text-[9px] text-[#8b949e]">This Month</span>
      </div>
      <div className="space-y-2">
        {students.map((s) => (
          <div key={s.name} className={`flex items-center gap-2 text-[10px] px-2 py-1.5 rounded-lg ${(s as {isYou?: boolean}).isYou ? "bg-[#0071e3]/10 border border-[#0071e3]/20" : ""}`}>
            <span className="text-base leading-none w-5 text-center">{s.medal}</span>
            <span className={`flex-1 font-medium ${(s as {isYou?: boolean}).isYou ? "text-[#3d95f4]" : "text-white"}`}>{s.name}</span>
            <span className="font-bold text-[#0071e3]">{s.pts}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StudyPlanCard() {
  return (
    <div className="w-[260px] rounded-xl bg-[#0d1117] border border-[#21262d] overflow-hidden flex-shrink-0 shadow-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="w-3.5 h-3.5 text-purple-400" />
        <span className="text-xs font-bold text-white">Study Plan</span>
        <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-400 border border-purple-500/20">Week 3</span>
      </div>
      <div className="text-[10px] text-[#8b949e] mb-2">Arrays &amp; Strings</div>
      <div className="h-1.5 rounded-full bg-[#21262d] mb-3 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-[#0071e3]" style={{ width: "80%" }} />
      </div>
      <div className="grid grid-cols-4 gap-1 mb-3">
        {["Day 1","Day 2","Day 3","Day 4"].map((d, i) => (
          <div key={d} className={`text-center text-[9px] py-1 rounded ${i < 3 ? "bg-green-500/15 text-green-400 border border-green-500/20" : "bg-[#0071e3]/15 text-[#3d95f4] border border-[#0071e3]/30"}`}>
            {i < 3 ? "✓" : "→"}<br />{d.replace("Day ","")}
          </div>
        ))}
      </div>
      <div className="text-[9px] text-[#8b949e]">Next: <span className="text-white">Two Pointers Technique</span></div>
    </div>
  );
}

function CertificateCard() {
  return (
    <div className="w-[250px] rounded-xl bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-[#30363d] overflow-hidden flex-shrink-0 shadow-xl p-5 relative">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0071e3] to-[#00c9ff]" />
      <div className="flex items-center gap-2 mb-3">
        <GraduationCap className="w-5 h-5 text-[#0071e3]" />
        <div>
          <div className="text-[10px] text-[#8b949e]">Certificate of Completion</div>
          <div className="text-[9px] font-bold text-[#0071e3]">Intel AI</div>
        </div>
      </div>
      <div className="text-xs font-bold text-white mb-1">DSA Fundamentals</div>
      <div className="text-[10px] text-[#8b949e] mb-3">Awarded to</div>
      <div className="text-sm font-bold gradient-text mb-3">Vikas Jakhar</div>
      <div className="flex items-center justify-between">
        <div className="text-[9px] text-[#8b949e]">July 2026</div>
        <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <span key={i} className="text-yellow-400 text-[10px]">★</span>)}</div>
      </div>
    </div>
  );
}

function SystemDesignCard() {
  return (
    <div className="w-[270px] rounded-xl bg-[#0d1117] border border-[#21262d] overflow-hidden flex-shrink-0 shadow-xl">
      <div className="h-24 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] flex items-center justify-center relative overflow-hidden">
        {/* Simple system design diagram */}
        <div className="flex items-center gap-2 text-[10px] text-white/70 font-mono">
          <div className="px-2 py-1 rounded border border-white/20 bg-white/5">Client</div>
          <div className="text-white/40">→</div>
          <div className="px-2 py-1 rounded border border-[#0071e3]/40 bg-[#0071e3]/10 text-[#3d95f4]">LB</div>
          <div className="text-white/40">→</div>
          <div className="flex flex-col gap-1">
            <div className="px-1.5 py-0.5 rounded border border-white/20 bg-white/5 text-[8px]">API 1</div>
            <div className="px-1.5 py-0.5 rounded border border-white/20 bg-white/5 text-[8px]">API 2</div>
          </div>
        </div>
      </div>
      <div className="p-3">
        <div className="text-[9px] text-orange-400 font-semibold mb-1">System Design</div>
        <div className="text-xs font-bold text-white mb-1">Design a URL Shortener</div>
        <div className="text-[9px] text-[#8b949e]">Covers: Load Balancing, Hashing, DB sharding</div>
      </div>
    </div>
  );
}

/* ── Two rows of cards ──────────────────────────────── */

const ROW_1 = [<IDECard key="ide1"/>, <DashboardCard key="dash1"/>, <CourseCard key="course1"/>, <AICard key="ai1"/>, <ProblemListCard key="prob1"/>, <LeaderboardCard key="lb1"/>, <StudyPlanCard key="sp1"/>, <SystemDesignCard key="sd1"/>];
const ROW_2 = [<CertificateCard key="cert1"/>, <AICard key="ai2"/>, <ProblemListCard key="prob2"/>, <IDECard key="ide2"/>, <StudyPlanCard key="sp2"/>, <LeaderboardCard key="lb2"/>, <CourseCard key="course2"/>, <DashboardCard key="dash2"/>];

export default function MarqueeShowcase() {
  return (
    <section className="py-24 overflow-hidden bg-[#0d1117] relative">
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0d1117] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0d1117] to-transparent z-10 pointer-events-none" />

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14 px-4"
      >
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#0071e3] mb-3">The Platform</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Everything you need to{" "}
          <span className="gradient-text">crack the interview</span>
        </h2>
        <p className="text-[#8b949e] max-w-lg mx-auto text-sm">
          From your first line of code to your first offer — practice, learn, and ship with Intel AI.
        </p>
      </motion.div>

      {/* Row 1: scrolls left */}
      <div className="mb-4 overflow-hidden">
        <div className="marquee-l gap-4">
          {ROW_1.map((card, i) => <div key={i} className="mx-2">{card}</div>)}
          {ROW_1.map((card, i) => <div key={`r1b-${i}`} className="mx-2">{card}</div>)}
        </div>
      </div>

      {/* Row 2: scrolls right */}
      <div className="overflow-hidden">
        <div className="marquee-r gap-4">
          {ROW_2.map((card, i) => <div key={i} className="mx-2">{card}</div>)}
          {ROW_2.map((card, i) => <div key={`r2b-${i}`} className="mx-2">{card}</div>)}
        </div>
      </div>
    </section>
  );
}
