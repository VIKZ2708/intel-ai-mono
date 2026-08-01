"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, Trophy, Flame, Star, Code2, Crown,
  ArrowRight, Loader2, ChevronUp, ChevronDown,
} from "lucide-react";
import { apiFetch } from "@/lib/apiClient";

interface LeaderboardRow {
  rank:          number;
  id:            string;
  name:          string;
  image:         string | null;
  xp:            number;
  currentStreak: number;
  maxStreak:     number;
  solved:        number;
  isYou:         boolean;
}

type SortKey = "xp" | "currentStreak" | "solved";

function xpLevel(xp: number) {
  if (xp < 100)  return { level: 1, title: "Novice" };
  if (xp < 300)  return { level: 2, title: "Apprentice" };
  if (xp < 600)  return { level: 3, title: "Practitioner" };
  if (xp < 1000) return { level: 4, title: "Proficient" };
  if (xp < 2000) return { level: 5, title: "Expert" };
  if (xp < 4000) return { level: 6, title: "Master" };
  return { level: 7, title: "Legend" };
}

const MEDAL: Record<number, { emoji: string; ring: string; glow: string; bg: string }> = {
  1: { emoji: "🥇", ring: "ring-yellow-400/60",  glow: "shadow-yellow-400/20", bg: "from-yellow-400/10 to-yellow-500/5 border-yellow-400/20" },
  2: { emoji: "🥈", ring: "ring-slate-300/60",   glow: "shadow-slate-300/20",  bg: "from-slate-300/10 to-slate-400/5 border-slate-300/20" },
  3: { emoji: "🥉", ring: "ring-orange-400/60",  glow: "shadow-orange-400/20", bg: "from-orange-400/10 to-orange-500/5 border-orange-400/20" },
};

const SORT_OPTS: { key: SortKey; label: string; icon: React.ReactNode }[] = [
  { key: "xp",            label: "XP",            icon: <Star className="w-3.5 h-3.5" /> },
  { key: "currentStreak", label: "Streak",         icon: <Flame className="w-3.5 h-3.5" /> },
  { key: "solved",        label: "Problems",       icon: <Code2 className="w-3.5 h-3.5" /> },
];

function Avatar({ row, size = 40 }: { row: LeaderboardRow; size?: number }) {
  const initials = row.name.trim()[0]?.toUpperCase() ?? "?";
  if (row.image) {
    return (
      <Image
        src={row.image} alt={row.name}
        width={size} height={size}
        className="rounded-full object-cover"
      />
    );
  }
  return (
    <div
      className="rounded-full bg-gradient-to-br from-[#0071e3] to-[#00c9ff] flex items-center justify-center font-bold text-white flex-shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials}
    </div>
  );
}

function PodiumCard({ row, position }: { row: LeaderboardRow; position: "left" | "center" | "right" }) {
  const m   = MEDAL[row.rank];
  const lvl = xpLevel(row.xp);
  const heights = { left: "h-28", center: "h-36", right: "h-24" };
  const delays  = { left: 0.15, center: 0, right: 0.25 };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delays[position], duration: 0.5, ease: "easeOut" }}
      className={`flex flex-col items-center gap-3 ${position === "center" ? "-mt-6" : "mt-4"}`}
    >
      {/* Crown for #1 */}
      {row.rank === 1 && (
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
        >
          <Crown className="w-7 h-7 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]" />
        </motion.div>
      )}

      {/* Avatar */}
      <div className={`ring-2 ${m.ring} rounded-full shadow-xl ${m.glow} p-0.5`}>
        <Avatar row={row} size={position === "center" ? 64 : 52} />
      </div>

      {/* Name + level */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-1">
          <span className={`font-bold text-white ${position === "center" ? "text-base" : "text-sm"}`}>
            {row.name}
          </span>
          {row.isYou && <span className="text-[10px] bg-[#0071e3]/20 text-[#0071e3] border border-[#0071e3]/30 rounded-full px-1.5 py-0.5 font-semibold">YOU</span>}
        </div>
        <div className="text-[10px] text-[#8b949e]">Lv.{lvl.level} {lvl.title}</div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 text-xs text-[#8b949e]">
        <span className="flex items-center gap-0.5 text-yellow-300 font-semibold">
          <Star className="w-3 h-3" /> {row.xp.toLocaleString()}
        </span>
        {row.currentStreak > 0 && (
          <span className="flex items-center gap-0.5 text-orange-400">
            <Flame className="w-3 h-3" /> {row.currentStreak}d
          </span>
        )}
      </div>

      {/* Podium block */}
      <div className={`w-28 md:w-36 ${heights[position]} bg-gradient-to-t ${m.bg} border rounded-t-2xl flex items-center justify-center`}>
        <span className="text-4xl">{m.emoji}</span>
      </div>
    </motion.div>
  );
}

export default function LeaderboardPage() {
  const { status } = useSession();
  const [rows, setRows]     = useState<LeaderboardRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState<SortKey>("xp");
  const [sortAsc, setSortAsc] = useState(false);

  useEffect(() => {
    apiFetch("/leaderboard", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => { setRows(d.leaderboard ?? []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const sorted = [...rows].sort((a, b) => {
    const diff = b[sortKey] - a[sortKey];
    return sortAsc ? -diff : diff;
  });

  const top3    = sorted.slice(0, 3);
  const rest    = sorted.slice(3);
  const youRow  = sorted.find((r) => r.isYou);
  const youRank = youRow ? sorted.indexOf(youRow) + 1 : null;

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(false); }
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">

      {/* Navbar */}
      <header className="bg-[#161b22] border-b border-[#21262d] px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-[#0071e3] to-[#00c9ff] rounded-lg flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" fill="white" />
          </div>
          <span className="font-bold text-white">Intel<span className="text-[#00c9ff]"> AI</span></span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-sm text-[#8b949e] hover:text-white transition-colors">Dashboard</Link>
          <Link href="/practice" className="text-sm text-[#8b949e] hover:text-white transition-colors">Practice</Link>
          {status === "unauthenticated" && (
            <Link href="/" className="text-sm px-3 py-1.5 bg-[#0071e3] hover:bg-[#0058b3] text-white rounded-lg transition-colors">Sign In</Link>
          )}
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">

        {/* Page header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Trophy className="w-7 h-7 text-yellow-400" />
            <h1 className="text-3xl font-bold text-white">Leaderboard</h1>
          </div>
          <p className="text-[#8b949e] text-sm">
            {rows.length > 0 ? `Top ${rows.length} coders ranked by XP` : "Earn XP by solving problems. Easy +10 · Medium +25 · Hard +50"}
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-8 h-8 text-[#0071e3] animate-spin" />
          </div>
        ) : rows.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <Trophy className="w-16 h-16 text-[#21262d] mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No rankings yet</h3>
            <p className="text-sm text-[#8b949e] mb-5">Be the first to solve a problem and claim the top spot.</p>
            <Link href="/practice" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0071e3] hover:bg-[#0058b3] text-white font-semibold rounded-xl text-sm transition-colors">
              Start solving <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Podium — top 3 */}
            {top3.length >= 2 && (
              <div className="flex items-end justify-center gap-3 md:gap-6 mt-4">
                {top3[1] && <PodiumCard row={top3[1]} position="left" />}
                {top3[0] && <PodiumCard row={top3[0]} position="center" />}
                {top3[2] && <PodiumCard row={top3[2]} position="right" />}
              </div>
            )}

            {/* Sort controls */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#8b949e]">Ranks 4 – {rows.length}</span>
              <div className="flex items-center gap-2">
                {SORT_OPTS.map((o) => (
                  <button
                    key={o.key}
                    onClick={() => toggleSort(o.key)}
                    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-all ${
                      sortKey === o.key
                        ? "bg-[#0071e3]/15 text-[#0071e3] border-[#0071e3]/30"
                        : "text-[#8b949e] border-[#21262d] hover:text-white hover:border-[#8b949e]/30"
                    }`}
                  >
                    {o.icon}
                    {o.label}
                    {sortKey === o.key && (
                      sortAsc
                        ? <ChevronUp className="w-3 h-3" />
                        : <ChevronDown className="w-3 h-3" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Rest of the table */}
            <div className="bg-[#161b22] border border-[#21262d] rounded-2xl overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-[3rem_1fr_6rem_6rem_5rem] gap-2 px-5 py-3 border-b border-[#21262d] text-[10px] text-[#8b949e] uppercase tracking-wider">
                <span className="text-center">#</span>
                <span>Coder</span>
                <span className="text-right">XP</span>
                <span className="text-right">Streak</span>
                <span className="text-right">Solved</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={sortKey + sortAsc}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {rest.map((row, i) => {
                    const lvl = xpLevel(row.xp);
                    return (
                      <motion.div
                        key={row.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className={`grid grid-cols-[3rem_1fr_6rem_6rem_5rem] gap-2 items-center px-5 py-3.5 border-b border-[#21262d] last:border-b-0 transition-colors ${
                          row.isYou
                            ? "bg-[#0071e3]/5 hover:bg-[#0071e3]/8"
                            : "hover:bg-white/3"
                        }`}
                      >
                        {/* Rank */}
                        <div className="text-center">
                          <span className={`text-sm font-bold ${row.isYou ? "text-[#0071e3]" : "text-[#8b949e]"}`}>
                            {sorted.indexOf(row) + 1}
                          </span>
                        </div>

                        {/* Name + avatar */}
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Avatar row={row} size={32} />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-medium text-white truncate">{row.name}</span>
                              {row.isYou && (
                                <span className="text-[9px] bg-[#0071e3]/20 text-[#0071e3] border border-[#0071e3]/30 rounded-full px-1.5 py-0.5 font-semibold flex-shrink-0">YOU</span>
                              )}
                            </div>
                            <span className="text-[10px] text-[#8b949e]">Lv.{lvl.level} {lvl.title}</span>
                          </div>
                        </div>

                        {/* XP */}
                        <div className="text-right">
                          <span className="text-sm font-semibold text-yellow-300">{row.xp.toLocaleString()}</span>
                          <div className="text-[10px] text-[#8b949e]">XP</div>
                        </div>

                        {/* Streak */}
                        <div className="text-right">
                          {row.currentStreak > 0 ? (
                            <>
                              <span className="text-sm font-semibold text-orange-400 flex items-center justify-end gap-0.5">
                                <Flame className="w-3.5 h-3.5" /> {row.currentStreak}
                              </span>
                              <div className="text-[10px] text-[#8b949e]">best {row.maxStreak}</div>
                            </>
                          ) : (
                            <span className="text-sm text-[#8b949e]">—</span>
                          )}
                        </div>

                        {/* Solved */}
                        <div className="text-right">
                          <span className="text-sm font-semibold text-white">{row.solved}</span>
                          <div className="text-[10px] text-[#8b949e]">solved</div>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* "You are not in top 20" note */}
            {youRank && youRank > 20 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="bg-[#0071e3]/5 border border-[#0071e3]/20 rounded-xl px-5 py-4 flex items-center justify-between">
                <div>
                  <span className="text-sm font-semibold text-white">Your rank: #{youRank}</span>
                  <div className="text-xs text-[#8b949e] mt-0.5">Keep solving to climb into the top 20</div>
                </div>
                <Link href="/practice" className="text-xs flex items-center gap-1 text-[#0071e3] hover:underline">
                  Solve now <ArrowRight className="w-3 h-3" />
                </Link>
              </motion.div>
            )}

            {/* CTA for guests */}
            {status === "unauthenticated" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-[#0071e3]/10 to-[#00c9ff]/5 border border-[#0071e3]/20 rounded-2xl p-6 text-center">
                <Trophy className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-white mb-1">Join the competition</h3>
                <p className="text-sm text-[#8b949e] mb-4">Sign in to start earning XP and climb the leaderboard.</p>
                <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0071e3] hover:bg-[#0058b3] text-white font-semibold rounded-xl text-sm transition-colors">
                  Get started <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
