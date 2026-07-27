"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Code2, ChevronRight, BookOpen, Trophy, BarChart3 } from "lucide-react";

interface PlaylistCard {
  id: string; name: string; slug: string;
  description: string; icon: string; tag: string;
  order: number; totalCount: number; solvedCount: number;
}

const tagStyle: Record<string, string> = {
  "Must Do":      "bg-amber-400/15 text-amber-400 border-amber-400/30",
  "Complete Set": "bg-blue-400/15 text-blue-400 border-blue-400/30",
  "Topic":        "bg-violet-400/15 text-violet-400 border-violet-400/30",
  "Difficulty":   "bg-[#21262d] text-[#8b949e] border-[#30363d]",
};

const difficultyStyle: Record<string, string> = {
  Easy:   "bg-green-400/15 text-green-400 border-green-400/30",
  Medium: "bg-yellow-400/15 text-yellow-400 border-yellow-400/30",
  Hard:   "bg-red-400/15 text-red-400 border-red-400/30",
};

function ProgressBar({ solved, total, size = "md" }: { solved: number; total: number; size?: "sm" | "md" }) {
  const pct = total > 0 ? Math.round((solved / total) * 100) : 0;
  const h   = size === "sm" ? "h-1" : "h-1.5";
  return (
    <div className="w-full">
      <div className={`w-full ${h} bg-[#21262d] rounded-full overflow-hidden`}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#0071e3] to-[#00c9ff] transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function FeaturedCard({ pl, isLoggedIn }: { pl: PlaylistCard; isLoggedIn: boolean }) {
  const pct = pl.totalCount > 0 ? Math.round((pl.solvedCount / pl.totalCount) * 100) : 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="relative bg-gradient-to-br from-[#161b22] to-[#1c2333] border border-[#21262d] rounded-2xl p-6 flex flex-col gap-4 group hover:border-[#0071e3]/40 transition-all"
    >
      <div className="flex items-start justify-between">
        <div className="text-4xl">{pl.icon}</div>
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${tagStyle[pl.tag] ?? tagStyle["Topic"]}`}>
          {pl.tag}
        </span>
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-1.5">{pl.name}</h3>
        <p className="text-sm text-[#8b949e] leading-relaxed">{pl.description}</p>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <Code2 className="w-4 h-4 text-[#0071e3]" />
        <span className="text-white font-semibold">{pl.totalCount}</span>
        <span className="text-[#8b949e]">problems</span>
      </div>

      {isLoggedIn && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-[#8b949e]">{pl.solvedCount}/{pl.totalCount} solved</span>
            <span className="text-[#0071e3] font-semibold">{pct}%</span>
          </div>
          <ProgressBar solved={pl.solvedCount} total={pl.totalCount} />
        </div>
      )}

      <Link
        href={`/study-plan/${pl.slug}`}
        className="mt-auto flex items-center justify-center gap-2 py-2.5 bg-[#0071e3] hover:bg-[#0058b3] text-white rounded-xl text-sm font-semibold transition-colors"
      >
        {pl.solvedCount > 0 ? "Continue" : "Start"} <ChevronRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}

function TopicCard({ pl, idx, isLoggedIn }: { pl: PlaylistCard; idx: number; isLoggedIn: boolean }) {
  const pct = pl.totalCount > 0 ? Math.round((pl.solvedCount / pl.totalCount) * 100) : 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.04 }}
      className="bg-[#161b22] border border-[#21262d] rounded-xl p-4 hover:border-[#30363d] hover:bg-[#1c2333] transition-all group"
    >
      <Link href={`/study-plan/${pl.slug}`} className="flex flex-col gap-3 h-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{pl.icon}</span>
            <div>
              <div className="text-sm font-semibold text-white group-hover:text-[#3d95f4] transition-colors">{pl.name}</div>
              <div className="text-xs text-[#8b949e]">{pl.totalCount} problems</div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-[#8b949e] group-hover:text-[#0071e3] transition-colors" />
        </div>

        {isLoggedIn && pl.totalCount > 0 && (
          <div className="space-y-1">
            <ProgressBar solved={pl.solvedCount} total={pl.totalCount} size="sm" />
            <div className="text-[10px] text-[#8b949e]">{pl.solvedCount}/{pl.totalCount} · {pct}%</div>
          </div>
        )}
      </Link>
    </motion.div>
  );
}

function DifficultyCard({ pl, isLoggedIn }: { pl: PlaylistCard; isLoggedIn: boolean }) {
  const pct     = pl.totalCount > 0 ? Math.round((pl.solvedCount / pl.totalCount) * 100) : 0;
  const style   = difficultyStyle[pl.name] ?? "bg-[#21262d] text-[#8b949e] border-[#30363d]";
  return (
    <Link href={`/study-plan/${pl.slug}`} className="block">
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.15 }}
        className="bg-[#161b22] border border-[#21262d] rounded-xl p-5 text-center hover:border-[#30363d] transition-all"
      >
        <div className="text-3xl mb-2">{pl.icon}</div>
        <div className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full border mb-2 ${style}`}>{pl.name}</div>
        <div className="text-2xl font-bold text-white mb-0.5">{pl.totalCount}</div>
        <div className="text-xs text-[#8b949e] mb-3">problems</div>
        {isLoggedIn && <ProgressBar solved={pl.solvedCount} total={pl.totalCount} size="sm" />}
        {isLoggedIn && <div className="text-[10px] text-[#8b949e] mt-1">{pl.solvedCount} solved · {pct}%</div>}
      </motion.div>
    </Link>
  );
}

export default function StudyPlanClient({
  playlists,
  isLoggedIn,
}: {
  playlists: PlaylistCard[];
  isLoggedIn: boolean;
}) {
  const featured   = playlists.filter((p) => p.tag === "Must Do" || p.tag === "Complete Set");
  const topics     = playlists.filter((p) => p.tag === "Topic");
  const difficulty = playlists.filter((p) => p.tag === "Difficulty");

  const totalSolved = featured.find((p) => p.slug === "top-75")?.solvedCount ?? 0;
  const totalAll    = 75;

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
            <Link href="/practice" className="text-sm text-[#8b949e] hover:text-white transition-colors">All Problems</Link>
            <div className="flex items-center gap-2 text-sm text-[#8b949e]">
              <Trophy className="w-4 h-4 text-amber-400" />
              Study Plans
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Study <span className="gradient-text">Plans</span>
          </h1>
          <p className="text-[#8b949e] max-w-xl mx-auto">
            Curated problem sets to master DSA systematically. Follow a plan or browse by topic.
          </p>
          {isLoggedIn && totalAll > 0 && (
            <div className="mt-6 inline-flex items-center gap-3 bg-[#161b22] border border-[#21262d] rounded-full px-5 py-2.5">
              <BarChart3 className="w-4 h-4 text-[#0071e3]" />
              <span className="text-sm text-white font-semibold">{totalSolved}/{totalAll} problems solved</span>
              <div className="w-24 h-1.5 bg-[#21262d] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#0071e3] to-[#00c9ff]"
                  style={{ width: `${Math.round((totalSolved / totalAll) * 100)}%` }}
                />
              </div>
              <span className="text-xs text-[#8b949e]">{Math.round((totalSolved / totalAll) * 100)}%</span>
            </div>
          )}
        </motion.div>

        {/* Featured */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <Trophy className="w-4 h-4 text-amber-400" />
            <h2 className="text-lg font-bold text-white">Featured</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {featured.map((pl) => (
              <FeaturedCard key={pl.id} pl={pl} isLoggedIn={isLoggedIn} />
            ))}
          </div>
        </section>

        {/* Topics */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-5">
            <BookOpen className="w-4 h-4 text-violet-400" />
            <h2 className="text-lg font-bold text-white">By Topic</h2>
            <span className="text-xs text-[#8b949e] bg-[#21262d] rounded-full px-2 py-0.5">{topics.length}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {topics.map((pl, i) => (
              <TopicCard key={pl.id} pl={pl} idx={i} isLoggedIn={isLoggedIn} />
            ))}
          </div>
        </section>

        {/* Difficulty */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <BarChart3 className="w-4 h-4 text-[#0071e3]" />
            <h2 className="text-lg font-bold text-white">By Difficulty</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {difficulty.map((pl) => (
              <DifficultyCard key={pl.id} pl={pl} isLoggedIn={isLoggedIn} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
