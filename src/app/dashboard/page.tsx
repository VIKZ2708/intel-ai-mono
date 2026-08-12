"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Zap, CheckCircle2, XCircle, Code2, Trophy,
  Calendar, TrendingUp, Target, ArrowRight, Loader2, Flame, Star,
} from "lucide-react";
import { apiFetch } from "@/lib/apiClient";
import ActivityCalendar from "@/components/ActivityCalendar";

interface Stats {
  user:             { name: string; email: string; image: string | null; createdAt: string };
  totalSolved:      number;
  totalProblems:    number;
  breakdown:        { Easy: number; Medium: number; Hard: number };
  languages:        Record<string, number>;
  totalSubmissions: number;
  acceptanceRate:   number;
  xp:              number;
  currentStreak:   number;
  maxStreak:       number;
  activityCalendar: { date: string; count: number }[];
  totalActiveDays: number;
  categoryProgress: { category: string; solved: number; total: number }[];
  badges: { slug: string; name: string; icon: string; desc: string; awardedAt: string }[];
  submissions: {
    id: string; problemId: number; problemTitle: string;
    difficulty: string; language: string; status: string;
    runtime: number | null; createdAt: string;
  }[];
}

const diffColor: Record<string, string> = {
  Easy:   "text-green-400 bg-green-400/10 border-green-400/20",
  Medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Hard:   "text-red-400 bg-red-400/10 border-red-400/20",
};

const langColor: Record<string, string> = {
  javascript: "bg-yellow-400/10 text-yellow-400",
  python:     "bg-blue-400/10 text-blue-400",
  java:       "bg-orange-400/10 text-orange-400",
  cpp:        "bg-purple-400/10 text-purple-400",
};

function xpToLevel(xp: number) {
  if (xp < 100)  return { level: 1, title: "Novice",      next: 100 };
  if (xp < 300)  return { level: 2, title: "Apprentice",  next: 300 };
  if (xp < 600)  return { level: 3, title: "Practitioner", next: 600 };
  if (xp < 1000) return { level: 4, title: "Proficient",  next: 1000 };
  if (xp < 2000) return { level: 5, title: "Expert",      next: 2000 };
  if (xp < 4000) return { level: 6, title: "Master",      next: 4000 };
  return { level: 7, title: "Legend", next: xp };
}

function ProgressRing({ value, max, size = 100, stroke = 8, color = "#0071e3" }: { value: number; max: number; size?: number; stroke?: number; color?: string }) {
  const r    = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct  = max > 0 ? Math.min(value / max, 1) : 0;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#21262d" strokeWidth={stroke} fill="none" />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r}
        stroke={color} strokeWidth={stroke} fill="none" strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ * (1 - pct) }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </svg>
  );
}

interface DailyChallenge {
  problem: { id: number; title: string; slug: string; difficulty: string; category: string } | null;
  completedToday: boolean;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router  = useRouter();
  const [stats, setStats]     = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [daily, setDaily]     = useState<DailyChallenge | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    setLoading(true);
    apiFetch("/user/stats", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => { setStats(d); setLoading(false); })
      .catch(() => setLoading(false));
    apiFetch("/daily")
      .then((r) => r.json())
      .then((d) => setDaily(d))
      .catch(() => {});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, router]);

  if (status === "loading" || loading) return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-[#0071e3] animate-spin" />
    </div>
  );

  if (!session) return null;

  const user     = stats?.user;
  const initials = user?.name ? user.name.trim()[0].toUpperCase() : "?";
  const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN", { month: "long", year: "numeric" }) : "";
  const pct      = stats ? Math.round((stats.totalSolved / stats.totalProblems) * 100) : 0;
  const lvl      = xpToLevel(stats?.xp ?? 0);
  const xpPct    = lvl.level < 7 ? Math.min(((stats?.xp ?? 0) / lvl.next) * 100, 100) : 100;

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
          <Link href="/leaderboard" className="text-sm text-[#8b949e] hover:text-white transition-colors">Leaderboard</Link>
          <Link href="/practice" className="text-sm text-[#8b949e] hover:text-white transition-colors">Practice Arena</Link>
          <Link href="/" className="text-sm text-[#8b949e] hover:text-white transition-colors">Home</Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">

        {/* Profile + Solved ring */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Profile card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="md:col-span-2 bg-[#161b22] border border-[#21262d] rounded-2xl p-6 flex items-center gap-5">
            {user?.image ? (
              <Image src={user.image} alt={user.name} width={72} height={72} className="rounded-full ring-2 ring-[#0071e3]/40" />
            ) : (
              <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#0071e3] to-[#00c9ff] flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                {initials}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
              <p className="text-[#8b949e] text-sm">{user?.email}</p>
              <div className="flex items-center gap-1.5 mt-1.5 text-xs text-[#8b949e]">
                <Calendar className="w-3.5 h-3.5" />
                Member since {joinDate}
              </div>
              {/* XP Level bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-[#0071e3] flex items-center gap-1">
                    <Star className="w-3 h-3" /> Lv.{lvl.level} {lvl.title}
                  </span>
                  <span className="text-xs text-[#8b949e]">{stats?.xp ?? 0} XP</span>
                </div>
                <div className="h-1.5 bg-[#21262d] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${xpPct}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    className="h-full rounded-full bg-gradient-to-r from-[#0071e3] to-[#00c9ff]"
                  />
                </div>
                {lvl.level < 7 && (
                  <div className="text-[10px] text-[#8b949e] mt-0.5">{lvl.next - (stats?.xp ?? 0)} XP to next level</div>
                )}
              </div>
            </div>
            <div className="hidden sm:flex flex-col items-center gap-1">
              <div className="relative">
                <ProgressRing value={stats?.totalSolved ?? 0} max={stats?.totalProblems ?? 10} size={80} stroke={7} />
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-lg font-bold text-white">{stats?.totalSolved ?? 0}</span>
                </div>
              </div>
              <span className="text-xs text-[#8b949e]">solved</span>
            </div>
          </motion.div>

          {/* Progress card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-[#161b22] border border-[#21262d] rounded-2xl p-6 flex flex-col justify-between">
            <div className="text-sm font-semibold text-[#8b949e] uppercase tracking-wider mb-3">Progress</div>
            <div className="flex items-center gap-3 mb-4">
              <ProgressRing value={stats?.totalSolved ?? 0} max={stats?.totalProblems ?? 1} size={72} stroke={6} />
              <div>
                <div className="text-2xl font-bold text-white">{pct}%</div>
                <div className="text-xs text-[#8b949e]">{stats?.totalSolved ?? 0} / {stats?.totalProblems ?? 0} problems</div>
              </div>
            </div>
            <div className="space-y-2">
              {([ { d: "Easy", bg: "bg-green-500" }, { d: "Medium", bg: "bg-yellow-500" }, { d: "Hard", bg: "bg-red-500" } ] as { d: "Easy"|"Medium"|"Hard"; bg: string }[]).map(({ d, bg }) => (
                <div key={d} className="flex items-center gap-2">
                  <span className="text-xs text-[#8b949e] w-14">{d}</span>
                  <div className="flex-1 h-1.5 bg-[#21262d] rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${stats ? (stats.breakdown[d] / (stats.totalProblems || 1)) * 100 : 0}%` }} transition={{ duration: 0.8, delay: 0.3 }} className={`h-full rounded-full ${bg}`} />
                  </div>
                  <span className="text-xs text-white font-semibold w-4 text-right">{stats?.breakdown[d] ?? 0}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { icon: <Trophy className="w-5 h-5 text-yellow-400" />, label: "Solved",       value: stats?.totalSolved ?? 0,       sub: "problems" },
            { icon: <Target className="w-5 h-5 text-[#0071e3]" />,  label: "Submissions",  value: stats?.totalSubmissions ?? 0,   sub: "total" },
            { icon: <TrendingUp className="w-5 h-5 text-green-400" />, label: "Acceptance", value: `${stats?.acceptanceRate ?? 0}%`, sub: "rate" },
            { icon: <Code2 className="w-5 h-5 text-purple-400" />,  label: "Languages",    value: Object.keys(stats?.languages ?? {}).length, sub: "used" },
            { icon: <Star className="w-5 h-5 text-yellow-300" />,   label: "XP",           value: stats?.xp ?? 0,                sub: `Lv.${lvl.level} ${lvl.title}` },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
              className="bg-[#161b22] border border-[#21262d] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">{s.icon}<span className="text-xs text-[#8b949e]">{s.label}</span></div>
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-[#8b949e]">{s.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* Today's Challenge card */}
        {daily?.problem && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="bg-[#161b22] border border-amber-500/20 rounded-2xl px-5 py-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-bold text-amber-400">Today&apos;s Challenge</span>
              {daily.completedToday && (
                <span className="ml-auto flex items-center gap-1 text-xs text-green-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                </span>
              )}
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-base font-semibold text-white truncate">
                  {daily.problem.id}. {daily.problem.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs font-semibold ${diffColor[daily.problem.difficulty]?.split(" ")[0] ?? "text-[#8b949e]"}`}>
                    {daily.problem.difficulty}
                  </span>
                  <span className="text-xs text-[#8b949e]">· {daily.problem.category}</span>
                  {!daily.completedToday && (
                    <span className="text-xs text-amber-400/80 font-medium">· Bonus XP on solve</span>
                  )}
                </div>
              </div>
              {!daily.completedToday && (
                <Link
                  href={`/practice/${daily.problem.id}`}
                  className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/25 text-amber-400 text-xs font-semibold rounded-xl transition-colors"
                >
                  Solve now <ArrowRight className="w-3 h-3" />
                </Link>
              )}
            </div>
          </motion.div>
        )}

        {/* Streak banner (only shown when active) */}
        {(stats?.currentStreak ?? 0) > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-orange-500/10 to-red-500/5 border border-orange-500/20 rounded-2xl px-5 py-4 flex items-center gap-4"
          >
            <div className="flex items-center gap-2">
              <span className="text-3xl">🔥</span>
              <div>
                <div className="text-lg font-bold text-orange-400">{stats?.currentStreak}-Day Streak!</div>
                <div className="text-xs text-[#8b949e]">Keep going — solve a problem today to extend it. Personal best: {stats?.maxStreak} days</div>
              </div>
            </div>
            <Link href="/practice" className="ml-auto flex-shrink-0 px-4 py-2 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 text-orange-400 text-xs font-semibold rounded-xl transition-colors">
              Solve now →
            </Link>
          </motion.div>
        )}

        {/* Activity Calendar */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <ActivityCalendar
            activityCalendar={stats?.activityCalendar ?? []}
            totalActiveDays={stats?.totalActiveDays ?? 0}
            currentStreak={stats?.currentStreak ?? 0}
            maxStreak={stats?.maxStreak ?? 0}
          />
        </motion.div>

        {/* Progress by Topic */}
        {stats && stats.categoryProgress.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="bg-[#161b22] border border-[#21262d] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold text-[#8b949e] uppercase tracking-wider">Progress by Topic</div>
              <div className="text-xs text-[#8b949e]">{stats.totalSolved}/{stats.totalProblems} total</div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {stats.categoryProgress.map(({ category, solved, total }) => {
                const pct = total > 0 ? (solved / total) * 100 : 0;
                const done = solved === total && total > 0;
                return (
                  <div key={category} className="bg-[#0d1117] border border-[#21262d] rounded-xl p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-[#c9d1d9] truncate pr-2">{category}</span>
                      <span className={`text-xs font-semibold flex-shrink-0 ${done ? "text-green-400" : solved > 0 ? "text-[#0071e3]" : "text-[#6e7681]"}`}>
                        {solved}/{total}
                      </span>
                    </div>
                    <div className="h-1.5 bg-[#21262d] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
                        className={`h-full rounded-full ${done ? "bg-green-400" : "bg-[#0071e3]"}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Badges */}
        {stats && stats.badges.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }} className="bg-[#161b22] border border-[#21262d] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-semibold text-[#8b949e] uppercase tracking-wider">Badges</div>
              <div className="text-xs text-[#8b949e]">{stats.badges.length} earned</div>
            </div>
            <div className="flex flex-wrap gap-3">
              {stats.badges.map((b) => (
                <div key={b.slug} title={b.desc} className="flex items-center gap-2 px-3 py-2 bg-[#0d1117] border border-yellow-500/15 rounded-xl hover:border-yellow-500/30 transition-colors group">
                  <span className="text-xl">{b.icon}</span>
                  <div>
                    <div className="text-xs font-semibold text-yellow-400 group-hover:text-yellow-300 transition-colors">{b.name}</div>
                    <div className="text-[10px] text-[#6e7681]">{new Date(b.awardedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Languages used */}
        {stats && Object.keys(stats.languages).length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-[#161b22] border border-[#21262d] rounded-2xl p-5">
            <div className="text-sm font-semibold text-[#8b949e] uppercase tracking-wider mb-4">Languages Used</div>
            <div className="flex flex-wrap gap-3">
              {Object.entries(stats.languages).map(([lang, count]) => (
                <div key={lang} className={`flex items-center gap-2 px-3 py-2 rounded-xl border border-[#21262d] ${langColor[lang] ?? "bg-[#21262d] text-white"}`}>
                  <span className="text-sm font-semibold capitalize">{lang}</span>
                  <span className="text-xs opacity-70">{count} solved</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Recent submissions */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="bg-[#161b22] border border-[#21262d] rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#21262d]">
            <div className="text-sm font-semibold text-[#8b949e] uppercase tracking-wider">Recent Submissions</div>
            <Link href="/practice" className="text-xs text-[#0071e3] hover:underline flex items-center gap-1">
              Practice more <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {!stats || stats.submissions.length === 0 ? (
            <div className="py-16 text-center">
              <Code2 className="w-10 h-10 text-[#21262d] mx-auto mb-3" />
              <p className="text-[#8b949e] text-sm">No submissions yet.</p>
              <Link href="/practice" className="mt-3 inline-block text-xs text-[#0071e3] hover:underline">Start solving problems →</Link>
            </div>
          ) : (
            <div className="divide-y divide-[#21262d]">
              {stats.submissions.map((s) => (
                <Link key={s.id} href={`/practice/${s.problemId}`} className="flex items-center justify-between px-5 py-3.5 hover:bg-white/3 transition-colors group">
                  <div className="flex items-center gap-3 min-w-0">
                    {s.status === "accepted"
                      ? <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                      : <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                    }
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-white group-hover:text-[#0071e3] transition-colors truncate">{s.problemTitle}</div>
                      <div className="text-xs text-[#8b949e]">{new Date(s.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${diffColor[s.difficulty]}`}>{s.difficulty}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-lg font-medium capitalize ${langColor[s.language] ?? "bg-[#21262d] text-[#8b949e]"}`}>{s.language}</span>
                    {s.runtime && <span className="text-xs text-[#8b949e]">{s.runtime}ms</span>}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </motion.div>

        {/* CTA if nothing solved */}
        {stats?.totalSolved === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-[#0071e3]/10 to-[#00c9ff]/5 border border-[#0071e3]/20 rounded-2xl p-6 text-center">
            <Trophy className="w-10 h-10 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">Start your journey</h3>
            <p className="text-sm text-[#8b949e] mb-1">Solve your first problem to earn XP and start your streak.</p>
            <p className="text-xs text-[#8b949e] mb-4">Easy = +10 XP · Medium = +25 XP · Hard = +50 XP</p>
            <Link href="/practice" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0071e3] hover:bg-[#0058b3] text-white font-semibold rounded-xl text-sm transition-colors">
              Go to Practice Arena <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}
