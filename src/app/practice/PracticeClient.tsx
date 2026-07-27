"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, CheckCircle2, ChevronRight, Zap, Search } from "lucide-react";

const difficultyBg: Record<string, string> = {
  Easy:   "bg-green-400/10 border-green-400/20 text-green-400",
  Medium: "bg-yellow-400/10 border-yellow-400/20 text-yellow-400",
  Hard:   "bg-red-400/10 border-red-400/20 text-red-400",
};

const categoryColor: Record<string, string> = {
  Arrays:                "text-blue-400",
  Stack:                 "text-orange-400",
  "Linked List":         "text-purple-400",
  "Dynamic Programming": "text-pink-400",
  Greedy:                "text-cyan-400",
  "Binary Search":       "text-indigo-400",
  "Sliding Window":      "text-teal-400",
  Graphs:                "text-red-400",
  Backtracking:          "text-amber-400",
  Trees:                 "text-green-400",
  Heap:                  "text-rose-400",
  "Bit Manipulation":    "text-violet-400",
  Intervals:             "text-sky-400",
  "Two Pointers":        "text-lime-400",
  Math:                  "text-fuchsia-400",
};

interface ProblemRow {
  id: number; title: string; slug: string;
  difficulty: string; category: string; acceptance: string;
}

export default function PracticeClient({
  problems,
  categories,
}: {
  problems: ProblemRow[];
  categories: string[];
}) {
  const [search, setSearch]       = useState("");
  const [diffFilter, setDiffFilter] = useState("All");
  const [catFilter, setCatFilter]   = useState("All");

  const filtered = problems.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    const matchDiff   = diffFilter === "All" || p.difficulty === diffFilter;
    const matchCat    = catFilter  === "All" || p.category   === catFilter;
    return matchSearch && matchDiff && matchCat;
  });

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Header */}
      <div className="border-b border-[#21262d] bg-[#161b22]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-[#0071e3] to-[#00c9ff] rounded-lg flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" fill="white" />
            </div>
            <span className="font-bold text-lg">
              <span className="text-white">Intel</span>
              <span className="gradient-text"> AI</span>
            </span>
          </Link>
          <div className="flex items-center gap-2 text-sm text-[#8b949e]">
            <Code2 className="w-4 h-4 text-[#0071e3]" />
            DSA Practice
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            DSA <span className="gradient-text">Practice Arena</span>
          </h1>
          <p className="text-[#8b949e]">
            {problems.length} curated problems across {categories.length} core DSA topics. Solve, run, and get AI hints instantly.
          </p>
        </motion.div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Problems", value: String(problems.length), icon: Code2,        color: "text-[#0071e3]" },
            { label: "Topics Covered", value: String(categories.length), icon: CheckCircle2, color: "text-green-400" },
            { label: "Showing",        value: String(filtered.length),   icon: Search,       color: "text-yellow-400" },
          ].map((s) => (
            <div key={s.label} className="bg-[#161b22] border border-[#21262d] rounded-xl p-4 text-center">
              <s.icon className={`w-5 h-5 ${s.color} mx-auto mb-1`} />
              <div className="text-xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-[#8b949e]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e]" />
            <input
              type="text"
              placeholder="Search problems or topics..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-[#161b22] border border-[#21262d] rounded-lg text-sm text-white placeholder-[#8b949e] focus:outline-none focus:border-[#0071e3]"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["All", "Easy", "Medium", "Hard"].map((d) => (
              <button
                key={d}
                onClick={() => setDiffFilter(d)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  diffFilter === d
                    ? "bg-[#0071e3] text-white"
                    : "bg-[#161b22] border border-[#21262d] text-[#8b949e] hover:text-white"
                }`}
              >
                {d}
              </button>
            ))}
            <select
              value={catFilter}
              onChange={(e) => setCatFilter(e.target.value)}
              className="px-3 py-2 bg-[#161b22] border border-[#21262d] rounded-lg text-sm text-[#8b949e] focus:outline-none focus:border-[#0071e3] cursor-pointer"
            >
              <option value="All">All Topics</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Problem Table */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#21262d] text-xs text-[#8b949e] uppercase tracking-wider">
                <th className="text-left px-5 py-3 w-10">#</th>
                <th className="text-left px-5 py-3">Title</th>
                <th className="text-left px-5 py-3 hidden sm:table-cell">Category</th>
                <th className="text-left px-5 py-3">Difficulty</th>
                <th className="text-left px-5 py-3 hidden md:table-cell">Acceptance</th>
                <th className="px-5 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-[#8b949e]">
                    No problems match your filters.
                  </td>
                </tr>
              )}
              {filtered.map((p, i) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: Math.min(i * 0.03, 0.6), duration: 0.25, ease: "easeOut" }}
                  className="border-b border-[#21262d] last:border-0 hover:bg-[#1c2333] transition-colors group cursor-pointer"
                >
                  <td className="px-5 py-4 text-[#8b949e] font-mono text-xs">{String(p.id).padStart(2, "0")}</td>
                  <td className="px-5 py-4">
                    <Link href={`/practice/${p.id}`} className="font-medium text-white group-hover:text-[#3d95f4] transition-colors">
                      {p.title}
                    </Link>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className={`text-xs font-medium ${categoryColor[p.category] ?? "text-[#8b949e]"}`}>
                      {p.category}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${difficultyBg[p.difficulty] ?? "bg-gray-400/10 border-gray-400/20 text-gray-400"}`}>
                      {p.difficulty}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[#8b949e] text-xs hidden md:table-cell">{p.acceptance}</td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/practice/${p.id}`}
                      className="flex items-center gap-1 text-xs text-[#0071e3] hover:text-[#00c9ff] font-medium transition-colors group/btn"
                    >
                      Solve
                      <ChevronRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
