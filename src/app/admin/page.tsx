"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Code2, BookOpen, Loader2, Zap, TrendingUp, Mail, Phone } from "lucide-react";
import { apiFetch } from "@/lib/apiClient";

interface AdminData {
  users: { id: string; name: string | null; email: string | null; messageCount: number; createdAt: string; _count: { submissions: number } }[];
  enrollments: { id: string; name: string; email: string; phone: string | null; courseName: string; message: string | null; createdAt: string }[];
  totalSubmissions: number;
}

const diffColor: Record<string, string> = {
  Easy: "text-green-400",
  Medium: "text-yellow-400",
  Hard: "text-red-400",
};

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"users" | "enrollments">("enrollments");

  useEffect(() => {
    if (status === "unauthenticated") { router.push("/"); return; }
    if (status === "authenticated" && session?.user?.email !== "vikz2708@gmail.com") {
      router.push("/"); return;
    }
  }, [status, session, router]);

  useEffect(() => {
    if (status !== "authenticated" || session?.user?.email !== "vikz2708@gmail.com") return;

    Promise.all([
      apiFetch("/admin/users").then(r => r.json()),
      apiFetch("/enrollment").then(r => r.json()),
      apiFetch("/admin/stats").then(r => r.json()),
    ]).then(([users, enrollments, stats]) => {
      setData({ users: Array.isArray(users) ? users : [], enrollments: Array.isArray(enrollments) ? enrollments : [], totalSubmissions: stats?.totalSubmissions ?? 0 });
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [status, session]);

  if (status === "loading" || loading) return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-[#0071e3] animate-spin" />
    </div>
  );

  if (!data) return null;

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      <header className="bg-[#161b22] border-b border-[#21262d] px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-[#0071e3] to-[#00c9ff] rounded-lg flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" fill="white" />
          </div>
          <span className="font-bold">Intel<span className="text-[#00c9ff]"> AI</span></span>
          <span className="ml-2 text-xs px-2 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full">Admin</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-sm text-[#8b949e] hover:text-white transition-colors">Dashboard</Link>
          <Link href="/" className="text-sm text-[#8b949e] hover:text-white transition-colors">Home</Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-[#8b949e] text-sm mt-1">Manage users, enrollments and submissions</p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Users className="w-5 h-5 text-[#0071e3]" />, label: "Total Users", value: data.users.length },
            { icon: <BookOpen className="w-5 h-5 text-green-400" />, label: "Enrollments", value: data.enrollments.length },
            { icon: <Code2 className="w-5 h-5 text-purple-400" />, label: "Submissions", value: data.totalSubmissions },
            { icon: <TrendingUp className="w-5 h-5 text-yellow-400" />, label: "Avg Messages", value: data.users.length ? Math.round(data.users.reduce((s, u) => s + u.messageCount, 0) / data.users.length) : 0 },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
              className="bg-[#161b22] border border-[#21262d] rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">{s.icon}<span className="text-xs text-[#8b949e]">{s.label}</span></div>
              <div className="text-2xl font-bold text-white">{s.value}</div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#161b22] border border-[#21262d] rounded-xl p-1 w-fit">
          {(["enrollments", "users"] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm rounded-lg capitalize transition-all ${tab === t ? "bg-[#0071e3] text-white font-semibold" : "text-[#8b949e] hover:text-white"}`}>
              {t}
            </button>
          ))}
        </div>

        {/* Enrollments tab */}
        {tab === "enrollments" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#161b22] border border-[#21262d] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#21262d] text-sm font-semibold text-[#8b949e] uppercase tracking-wider">
              Enrollment Requests ({data.enrollments.length})
            </div>
            {data.enrollments.length === 0 ? (
              <div className="py-16 text-center text-[#8b949e] text-sm">No enrollments yet.</div>
            ) : (
              <div className="divide-y divide-[#21262d]">
                {data.enrollments.map((e) => (
                  <div key={e.id} className="px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white">{e.name}</div>
                      <div className="text-xs text-[#8b949e] flex flex-wrap gap-3 mt-1">
                        <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{e.email}</span>
                        {e.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{e.phone}</span>}
                      </div>
                      {e.message && <div className="text-xs text-[#c9d1d9] mt-1 italic">"{e.message}"</div>}
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-xs px-2.5 py-1 bg-[#0071e3]/10 text-[#0071e3] border border-[#0071e3]/20 rounded-full">{e.courseName}</span>
                      <span className="text-xs text-[#8b949e]">{new Date(e.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Users tab */}
        {tab === "users" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-[#161b22] border border-[#21262d] rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-[#21262d] text-sm font-semibold text-[#8b949e] uppercase tracking-wider">
              Users ({data.users.length})
            </div>
            {data.users.length === 0 ? (
              <div className="py-16 text-center text-[#8b949e] text-sm">No users yet.</div>
            ) : (
              <div className="divide-y divide-[#21262d]">
                {data.users.map((u) => (
                  <div key={u.id} className="px-5 py-4 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="font-semibold text-white">{u.name ?? "—"}</div>
                      <div className="text-xs text-[#8b949e]">{u.email}</div>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-[#8b949e] flex-shrink-0">
                      <span><span className="text-white font-semibold">{u._count.submissions}</span> submissions</span>
                      <span><span className="text-white font-semibold">{u.messageCount}</span> AI msgs</span>
                      <span>{new Date(u.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" })}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
