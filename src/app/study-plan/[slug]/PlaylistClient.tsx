"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Zap, ChevronLeft, ChevronRight, CheckCircle2, Search,
  Code2, Trophy,
} from "lucide-react";

interface PlaylistInfo {
  id: string; name: string; slug: string;
  description: string; icon: string; tag: string;
}

interface ProblemRow {
  order: number; id: number; title: string; slug: string;
  difficulty: string; category: string; acceptance: string; solved: boolean;
}

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

const tagStyle: Record<string, string> = {
  "Must Do":      "bg-amber-400/15 text-amber-400 border-amber-400/30",
  "Complete Set": "bg-blue-400/15 text-blue-400 border-blue-400/30",
  "Topic":        "bg-violet-400/15 text-violet-400 border-violet-400/30",
  "Difficulty":   "bg-[#21262d] text-[#8b949e] border-[#30363d]",
};

export default function PlaylistClient({
  playlist,
  problems,
  isLoggedIn,
}: {
  playlist: PlaylistInfo;
  problems: ProblemRow[];
  isLoggedIn: boolean;
}) {
  const [search, setSearch]         = useState("");
  const [diffFilter, setDiffFilter] = useState("All");
  const [showSolved, setShowSolved] = useState(false);

  const solvedCount = problems.filter((p) => p.solved).length;
  const pct         = problems.length > 0 ? Math.round((solvedCount / problems.length) * 100) : 0;

  const filtered = problems.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    const matchDiff   = diffFilter === "All" || p.difficulty === diffFilter;
    const matchSolved = !showSolved || !p.solved;
    return matchSearch && matchDiff && matchSolved;
  });

  const firstUnsolved = problems.find((p) => !p.solved);

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
          <div className="flex items-center gap-4">
            <Link href="/study-plan" className="flex items-center gap-1.5 text-sm text-[#8b949e] hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" /> Study Plans
            </Link>
            <Link href="/practice" className="text-sm text-[#8b949e] hover:text-white transition-colors">
              All Problems
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Playlist hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-start gap-5">
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-[#161b22] border border-[#21262d] flex items-center justify-center text-4xl">
              {playlist.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${tagStyle[playlist.tag] ?? tagStyle["Topic"]}`}>
                  {playlist.tag}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{playlist.name}</h1>
              <p className="text-[#8b949e] text-sm leading-relaxed mb-4">{playlist.description}</p>

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-[#0071e3]" />
                  <span className="text-white font-semibold">{problems.length}</span>
                  <span className="text-[#8b949e]">problems</span>
                </div>
                {isLoggedIn && (
                  <>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-white font-semibold">{solvedCount}</span>
                      <span className="text-[#8b949e]">solved</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-amber-400" />
                      <span className="text-white font-semibold">{pct}%</span>
                      <span className="text-[#8b949e]">complete</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* CTA */}
            {firstUnsolved && (
              <Link
                href={`/practice/${firstUnsolved.id}`}
                className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-[#0071e3] hover:bg-[#0058b3] text-white rounded-xl text-sm font-semibold transition-colors"
              >
                {solvedCount > 0 ? "Continue" : "Start"} <ChevronRight className="w-4 h-4" />
              </Link>
            )}
            {!firstUnsolved && solvedCount > 0 && (
              <div className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-green-500/15 border border-green-500/30 text-green-400 rounded-xl text-sm font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Completed!
              </div>
            )}
          </div>

          {/* Progress bar */}
          {isLoggedIn && problems.length > 0 && (
            <div className="mt-6 bg-[#161b22] border border-[#21262d] rounded-xl p-4">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-[#8b949e]">Progress</span>
                <span className="text-[#0071e3] font-semibold">{solvedCount}/{problems.length} solved</span>
              </div>
              <div className="w-full h-2 bg-[#21262d] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-[#0071e3] to-[#00c9ff]"
                />
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-[#8b949e]">
                <span>{solvedCount} solved</span>
                <span>{problems.length - solvedCount} remaining</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e]" />
            <input
              type="text"
              placeholder="Search problems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-[#161b22] border border-[#21262d] rounded-lg text-sm text-white placeholder-[#8b949e] focus:outline-none focus:border-[#0071e3]"
            />
          </div>
          <div className="flex gap-2">
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
            {isLoggedIn && (
              <button
                onClick={() => setShowSolved(!showSolved)}
                className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all flex items-center gap-1.5 ${
                  showSolved
                    ? "bg-green-500/15 border-green-500/30 text-green-400"
                    : "bg-[#161b22] border-[#21262d] text-[#8b949e] hover:text-white"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                {showSolved ? "Unsolved" : "Unsolved"}
              </button>
            )}
          </div>
        </div>

        {/* Problem table */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#21262d] text-xs text-[#8b949e] uppercase tracking-wider">
                {isLoggedIn && <th className="text-left px-4 py-3 w-8"></th>}
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
                  <td colSpan={isLoggedIn ? 7 : 6} className="px-5 py-10 text-center text-[#8b949e]">
                    No problems match your filters.
                  </td>
                </tr>
              )}
              {filtered.map((p, i) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: Math.min(i * 0.015, 0.5) }}
                  className={`border-b border-[#21262d] last:border-0 transition-colors group ${p.solved ? "hover:bg-green-500/3" : "hover:bg-[#1c2333]"}`}
                >
                  {isLoggedIn && (
                    <td className="px-4 py-4 w-8">
                      {p.solved
                        ? <CheckCircle2 className="w-4 h-4 text-green-400" />
                        : <div className="w-4 h-4 rounded-full border border-[#30363d]" />
                      }
                    </td>
                  )}
                  <td className="px-5 py-4 text-[#8b949e] font-mono text-xs">{String(p.order).padStart(2, "0")}</td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/practice/${p.id}`}
                      className={`font-medium transition-colors group-hover:text-[#3d95f4] ${p.solved ? "text-[#8b949e]" : "text-white"}`}
                    >
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
                      className="flex items-center gap-1 text-xs text-[#0071e3] hover:text-[#00c9ff] font-medium transition-colors"
                    >
                      {p.solved ? "Review" : "Solve"} <ChevronRight className="w-3 h-3" />
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer count */}
        <div className="mt-4 text-center text-xs text-[#8b949e]">
          Showing {filtered.length} of {problems.length} problems
          {isLoggedIn && solvedCount > 0 && ` · ${solvedCount} solved`}
        </div>
      </div>
    </div>
  );
}
