"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { apiFetch } from "@/lib/apiClient";
import { generateRunner } from "@/lib/runner-gen";
import type { Problem } from "@/lib/problems";
import {
  Zap, Timer, Send, Loader2, CheckCircle2, XCircle,
  ChevronRight, RotateCcw, Trophy, AlertTriangle,
} from "lucide-react";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full bg-[#1e1e1e]"><Loader2 className="w-5 h-5 text-[#0071e3] animate-spin" /></div>,
});

const LANGUAGES = [
  { id: "javascript", label: "JavaScript", judge0Id: 93 },
  { id: "python",     label: "Python",     judge0Id: 92 },
];

const DIFF_COLOR: Record<string, string> = {
  Easy: "text-green-400 bg-green-400/10 border-green-400/20",
  Medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Hard: "text-red-400 bg-red-400/10 border-red-400/20",
};

type Difficulty = "Easy" | "Medium" | "Hard" | "Any";
type Phase = "setup" | "loading" | "solving" | "results";

interface ProblemRow { id: number; title: string; slug: string; difficulty: string; category: string; }
type FullProblem = Problem;
interface Result { status: "accepted" | "wrong" | "error" | "timeout"; passed: number; total: number; runtime: number | null; }

function fmt(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

export default function MockInterviewClient({ problems }: { problems: ProblemRow[] }) {
  const { data: session } = useSession();

  const [phase, setPhase]           = useState<Phase>("setup");
  const [difficulty, setDifficulty] = useState<Difficulty>("Medium");
  const [timeLimit, setTimeLimit]   = useState(30);
  const [problem, setProblem]       = useState<FullProblem | null>(null);
  const [lang, setLang]             = useState("javascript");
  const [code, setCode]             = useState("");
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [result, setResult]         = useState<Result | null>(null);
  const [runStatus, setRunStatus]   = useState<"idle" | "running" | "submitting">("idle");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }, []);

  const handleTimeUp = useCallback(() => {
    stopTimer();
    setResult({ status: "timeout", passed: 0, total: 0, runtime: null });
    setPhase("results");
  }, [stopTimer]);

  useEffect(() => {
    if (phase !== "solving") return;
    timerRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) { handleTimeUp(); return 0; }
        return s - 1;
      });
    }, 1000);
    return stopTimer;
  }, [phase, handleTimeUp, stopTimer]);

  async function startInterview() {
    setPhase("loading");
    const pool = difficulty === "Any" ? problems : problems.filter((p) => p.difficulty === difficulty);
    if (!pool.length) { setPhase("setup"); return; }
    const picked = pool[Math.floor(Math.random() * pool.length)];
    try {
      const res  = await apiFetch(`/problems/${picked.id}`);
      const data = await res.json();
      setProblem(data as FullProblem);
      setCode(data.starterCode?.[lang] ?? data.starterCode?.javascript ?? "");
      setSecondsLeft(timeLimit * 60);
      setResult(null);
      setRunStatus("idle");
      setPhase("solving");
    } catch { setPhase("setup"); }
  }

  async function submitSolution() {
    if (!problem) return;
    setRunStatus("submitting");
    stopTimer();

    const langDef = LANGUAGES.find((l) => l.id === lang)!;
    let fullCode = code;
    try {
      const meta  = (problem as unknown as { functionMeta?: Parameters<typeof generateRunner>[1] }).functionMeta;
      const cases = (problem as unknown as { testCases?: Parameters<typeof generateRunner>[2] }).testCases ?? [];
      if (meta) {
        const runner = generateRunner(lang as "javascript" | "python" | "java" | "cpp", meta, cases);
        if (lang === "javascript") fullCode = code + runner;
        else if (lang === "python") fullCode = code + "\n" + runner;
        else fullCode = runner + "\n" + code;
      }
    } catch { /* no runner */ }

    try {
      const execRes  = await apiFetch("/execute", {
        method: "POST",
        body: JSON.stringify({ source_code: fullCode, language_id: langDef.judge0Id }),
      });
      const data = await execRes.json();
      const combined = [data.compile_output, data.stdout, data.stderr].filter(Boolean).join("\n").trim();
      const runtime  = data.time ? Math.round(parseFloat(data.time) * 1000) : null;
      const m = combined.match(/(\d+)\/(\d+) test cases passed/);

      if (m) {
        const passed = parseInt(m[1]), total = parseInt(m[2]);
        const status = passed === total ? "accepted" : "wrong";
        setResult({ status, passed, total, runtime });
        if (session?.user && status === "accepted") {
          apiFetch("/submissions", {
            method: "POST",
            body: JSON.stringify({ problemId: problem.id, language: lang, code, status: "accepted", runtime, memory: null }),
          }).catch(() => {});
        }
      } else {
        setResult({ status: "error", passed: 0, total: 0, runtime });
      }
    } catch { setResult({ status: "error", passed: 0, total: 0, runtime: null }); }

    setRunStatus("idle");
    setPhase("results");
  }

  const urgentTime = secondsLeft <= 300;

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Top bar */}
      <div className="border-b border-[#21262d] bg-[#161b22] px-5 h-12 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gradient-to-br from-[#0071e3] to-[#00c9ff] rounded-md flex items-center justify-center">
            <Zap className="w-3 h-3 text-white" fill="white" />
          </div>
          <span className="font-bold text-sm"><span className="text-white">Intel</span><span className="text-[#00c9ff]"> AI</span></span>
        </Link>
        <div className="flex items-center gap-3">
          {phase === "solving" && (
            <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border font-mono font-bold text-sm ${urgentTime ? "border-red-500/30 bg-red-500/10 text-red-400" : "border-[#21262d] bg-[#0d1117] text-white"}`}>
              <Timer className={`w-4 h-4 ${urgentTime ? "text-red-400" : "text-[#8b949e]"}`} />
              {fmt(secondsLeft)}
            </div>
          )}
          <Link href="/practice" className="text-xs text-[#8b949e] hover:text-white transition-colors">Practice Arena</Link>
        </div>
      </div>

      <AnimatePresence mode="wait">

        {/* ── SETUP PHASE ── */}
        {phase === "setup" && (
          <motion.div key="setup" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="max-w-lg mx-auto px-4 pt-20 pb-10"
          >
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-gradient-to-br from-[#0071e3] to-[#00c9ff] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Timer className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Mock Interview</h1>
              <p className="text-[#8b949e] text-sm">Simulate a real coding interview. Timer runs, no hints.</p>
            </div>

            <div className="bg-[#161b22] border border-[#21262d] rounded-2xl p-6 space-y-6">
              {/* Difficulty */}
              <div>
                <p className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-3">Difficulty</p>
                <div className="grid grid-cols-4 gap-2">
                  {(["Easy", "Medium", "Hard", "Any"] as Difficulty[]).map((d) => (
                    <button key={d} onClick={() => setDifficulty(d)}
                      className={`py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        difficulty === d
                          ? d === "Easy"   ? "bg-green-500/15 border-green-500/40 text-green-400"
                          : d === "Medium" ? "bg-yellow-500/15 border-yellow-500/40 text-yellow-400"
                          : d === "Hard"   ? "bg-red-500/15 border-red-500/40 text-red-400"
                          : "bg-[#0071e3]/15 border-[#0071e3]/40 text-[#3d95f4]"
                          : "border-[#21262d] text-[#8b949e] hover:text-white hover:border-[#30363d]"
                      }`}
                    >{d}</button>
                  ))}
                </div>
              </div>

              {/* Time limit */}
              <div>
                <p className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-3">Time Limit</p>
                <div className="grid grid-cols-3 gap-2">
                  {[20, 30, 45].map((t) => (
                    <button key={t} onClick={() => setTimeLimit(t)}
                      className={`py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        timeLimit === t
                          ? "bg-[#0071e3]/15 border-[#0071e3]/40 text-[#3d95f4]"
                          : "border-[#21262d] text-[#8b949e] hover:text-white hover:border-[#30363d]"
                      }`}
                    >{t} min</button>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div>
                <p className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-3">Language</p>
                <div className="grid grid-cols-2 gap-2">
                  {LANGUAGES.map((l) => (
                    <button key={l.id} onClick={() => setLang(l.id)}
                      className={`py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        lang === l.id
                          ? "bg-[#0071e3]/15 border-[#0071e3]/40 text-[#3d95f4]"
                          : "border-[#21262d] text-[#8b949e] hover:text-white hover:border-[#30363d]"
                      }`}
                    >{l.label}</button>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="flex items-start gap-2 px-3 py-2.5 rounded-xl bg-[#0d1117] border border-[#21262d]">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-[#8b949e]">No hints or AI assistance. A random problem will be selected based on your difficulty setting.</p>
              </div>

              <button onClick={startInterview}
                className="w-full py-3 bg-[#0071e3] hover:bg-[#0058b3] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                Start Interview <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ── LOADING ── */}
        {phase === "loading" && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex items-center justify-center min-h-[calc(100vh-48px)]"
          >
            <div className="text-center">
              <Loader2 className="w-10 h-10 text-[#0071e3] animate-spin mx-auto mb-4" />
              <p className="text-[#8b949e] text-sm">Selecting your problem…</p>
            </div>
          </motion.div>
        )}

        {/* ── SOLVING PHASE ── */}
        {phase === "solving" && problem && (
          <motion.div key="solving" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex h-[calc(100vh-48px)]"
          >
            {/* Left: Problem */}
            <div className="w-[42%] flex flex-col border-r border-[#21262d] overflow-y-auto">
              <div className="p-5 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${DIFF_COLOR[problem.difficulty] ?? ""}`}>
                    {problem.difficulty}
                  </span>
                  <span className="text-xs text-[#0071e3]">{problem.category}</span>
                </div>
                <h1 className="text-base font-bold text-white mb-4">{problem.id}. {problem.title}</h1>
                <p className="text-sm text-[#c9d1d9] leading-relaxed mb-6 whitespace-pre-line">{problem.description}</p>
                {(problem.examples ?? []).map((ex, i) => (
                  <div key={i} className="mb-4">
                    <p className="text-xs font-semibold text-[#8b949e] mb-1.5">Example {i + 1}:</p>
                    <div className="bg-[#0d1117] border border-[#21262d] rounded-lg p-3 font-mono text-xs space-y-1">
                      <div><span className="text-[#8b949e]">Input: </span><span className="text-white">{ex.input}</span></div>
                      <div><span className="text-[#8b949e]">Output: </span><span className="text-white">{ex.output}</span></div>
                      {ex.explanation && <div><span className="text-[#8b949e]">Explanation: </span><span className="text-[#c9d1d9]">{ex.explanation}</span></div>}
                    </div>
                  </div>
                ))}
                {(problem.constraints ?? []).length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-[#8b949e] mb-2">Constraints:</p>
                    <ul className="space-y-1">
                      {(problem.constraints as string[]).map((c, i) => (
                        <li key={i} className="text-xs text-[#8b949e] font-mono">· {c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Editor */}
            <div className="flex-1 flex flex-col">
              {/* Editor toolbar */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-[#21262d] bg-[#161b22]">
                <div className="flex gap-1">
                  {LANGUAGES.map((l) => (
                    <button key={l.id} onClick={() => { setLang(l.id); setCode(problem.starterCode?.[l.id] ?? ""); }}
                      className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                        lang === l.id ? "bg-[#0071e3]/15 border-[#0071e3]/30 text-[#3d95f4]" : "border-[#21262d] text-[#8b949e] hover:text-white"
                      }`}
                    >{l.label}</button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setCode(problem.starterCode?.[lang] ?? "")}
                    className="p-1.5 text-[#6e7681] hover:text-white border border-[#21262d] rounded-lg transition-colors"
                    title="Reset code"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={submitSolution} disabled={runStatus === "submitting"}
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-[#0071e3] hover:bg-[#0058b3] text-white rounded-lg text-xs font-semibold disabled:opacity-50 transition-colors"
                  >
                    {runStatus === "submitting" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                    Submit
                  </button>
                </div>
              </div>

              <div className="flex-1">
                <MonacoEditor
                  height="100%"
                  language={lang === "cpp" ? "cpp" : lang}
                  value={code}
                  onChange={(v) => setCode(v ?? "")}
                  theme="vs-dark"
                  options={{ fontSize: 13, minimap: { enabled: false }, lineNumbers: "on", wordWrap: "on", scrollBeyondLastLine: false, padding: { top: 12 } }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* ── RESULTS PHASE ── */}
        {phase === "results" && problem && result && (
          <motion.div key="results" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="max-w-lg mx-auto px-4 pt-16 pb-10"
          >
            <div className="bg-[#161b22] border border-[#21262d] rounded-2xl overflow-hidden">
              {/* Result header */}
              <div className={`px-6 py-8 text-center ${
                result.status === "accepted" ? "bg-green-500/8 border-b border-green-500/15"
                : result.status === "timeout" ? "bg-amber-500/8 border-b border-amber-500/15"
                : "bg-red-500/8 border-b border-red-500/15"
              }`}>
                <div className="flex justify-center mb-3">
                  {result.status === "accepted"
                    ? <CheckCircle2 className="w-12 h-12 text-green-400" />
                    : result.status === "timeout"
                    ? <Timer className="w-12 h-12 text-amber-400" />
                    : <XCircle className="w-12 h-12 text-red-400" />
                  }
                </div>
                <div className={`text-2xl font-bold mb-1 ${
                  result.status === "accepted" ? "text-green-400"
                  : result.status === "timeout" ? "text-amber-400" : "text-red-400"
                }`}>
                  {result.status === "accepted" ? "Accepted!" : result.status === "timeout" ? "Time's Up!" : result.status === "wrong" ? "Wrong Answer" : "Error"}
                </div>
                <p className="text-sm text-[#8b949e]">
                  {result.status === "timeout"
                    ? "You ran out of time — keep practicing!"
                    : result.total > 0 ? `${result.passed}/${result.total} test cases passed` : "Submission processed"}
                </p>
              </div>

              <div className="p-6 space-y-4">
                {/* Problem info */}
                <div className="flex items-center justify-between py-3 border-b border-[#21262d]">
                  <span className="text-sm font-medium text-white">{problem.id}. {problem.title}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${DIFF_COLOR[problem.difficulty] ?? ""}`}>
                    {problem.difficulty}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#0d1117] rounded-xl p-3 border border-[#21262d]">
                    <p className="text-[10px] text-[#6e7681] uppercase tracking-wider mb-1">Result</p>
                    <p className={`text-lg font-bold ${result.status === "accepted" ? "text-green-400" : "text-red-400"}`}>
                      {result.total > 0 ? `${result.passed}/${result.total}` : "—"}
                    </p>
                  </div>
                  <div className="bg-[#0d1117] rounded-xl p-3 border border-[#21262d]">
                    <p className="text-[10px] text-[#6e7681] uppercase tracking-wider mb-1">Runtime</p>
                    <p className="text-lg font-bold text-white">
                      {result.runtime != null ? `${result.runtime}ms` : "—"}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-2">
                  <Link href={`/practice/${problem.id}`}
                    className="flex-1 py-2.5 text-center text-xs font-semibold border border-[#21262d] text-[#8b949e] hover:text-white rounded-xl transition-colors"
                  >
                    View Problem
                  </Link>
                  <button onClick={() => { setProblem(null); setPhase("setup"); }}
                    className="flex-1 py-2.5 text-xs font-bold bg-[#0071e3] hover:bg-[#0058b3] text-white rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    <Trophy className="w-3.5 h-3.5" /> Try Another
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
