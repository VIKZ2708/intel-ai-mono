"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { Problem } from "@/lib/problems";
import AITeachingAssistant from "@/components/ide/AITeachingAssistant";

interface DBSolution {
  id: string;
  solutionType: string;
  language: string;
  approach: string;
  code: string;
  explanation: string;
  timeComplex: string;
  spaceComplex: string;
  username: string | null;
  runtime: number | null;
  memory: number | null;
  beats: number | null;
}
import {
  Zap, ChevronLeft, ChevronRight, Play, Send, Bot,
  CheckCircle2, XCircle, Clock, RotateCcw, Loader2,
  Cpu, MemoryStick, BookOpen, Users, Lightbulb,
  AlertCircle, ChevronDown, ChevronUp, ArrowRight, History,
} from "lucide-react";
import { motion } from "framer-motion";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-[#1e1e1e]">
      <Loader2 className="w-5 h-5 text-[#0071e3] animate-spin" />
    </div>
  ),
});

const LANGUAGES = [
  { id: "javascript", label: "JavaScript", judge0Id: 93 },
  { id: "python",     label: "Python",     judge0Id: 92 },
  { id: "java",       label: "Java",       judge0Id: 91 },
  { id: "cpp",        label: "C++",        judge0Id: 54 },
];

const difficultyColor: Record<string, string> = {
  Easy:   "text-green-400 bg-green-400/10 border-green-400/20",
  Medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  Hard:   "text-red-400 bg-red-400/10 border-red-400/20",
};

const langBadgeColor: Record<string, string> = {
  JavaScript: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
  Python:     "bg-blue-400/10 text-blue-400 border-blue-400/20",
  Java:       "bg-orange-400/10 text-orange-400 border-orange-400/20",
  "C++":      "bg-purple-400/10 text-purple-400 border-purple-400/20",
};

type RunStatus    = "idle" | "running" | "submitting" | "passed" | "failed" | "error";
type LeftTab      = "description" | "editorial" | "solutions" | "accepted" | "wrong" | "history";
type ConsoleTab   = "testcase" | "output";

interface PastSubmission {
  id: string; problemId: number; language: string; code: string;
  status: string; runtime: number | null; memory: number | null; createdAt: string;
}

interface TestLine { status: "pass" | "fail" | "error" | "info" | "score" | "compile_ok"; text: string; }

interface SubmitResult {
  status: "accepted" | "wrong" | "error";
  passed: number; total: number;
  runtime: number; memory: number;
  runtimeBeat: number; memoryBeat: number;
  lines: TestLine[];
  submittedCode: string; submittedLang: string;
}

interface HistoBar { ms: number; height: number; isUser: boolean; }

function generateHistogramBars(userRuntime: number): HistoBar[] {
  const count = 30;
  const maxMs  = 100;
  const userBarIdx = Math.max(0, Math.round((userRuntime / maxMs) * count) - 2);
  const peakIdx    = Math.min(count - 1, userBarIdx + Math.floor(Math.random() * 5 + 4));
  return Array.from({ length: count }, (_, i) => {
    const dist = i - peakIdx;
    const base = Math.exp(-0.07 * dist * dist) * 88;
    const noise = (Math.random() - 0.5) * 9;
    return { ms: Math.round((i / count) * maxMs + 1), height: Math.max(3, Math.min(100, base + noise)), isUser: i === userBarIdx };
  });
}

function parseLines(raw: string): TestLine[] {
  return raw.split("\n").filter(Boolean).map((line) => {
    if (line.includes("✔ COMPILE_OK"))    return { status: "compile_ok" as const, text: line };
    if (line.startsWith("✓"))             return { status: "pass"  as const, text: line };
    if (line.startsWith("✗ ERROR"))       return { status: "error" as const, text: line };
    if (line.startsWith("✗"))             return { status: "fail"  as const, text: line };
    if (/\d+\/\d+ test cases/.test(line)) return { status: "score" as const, text: line };
    return { status: "info" as const, text: line };
  });
}

function parseResult(raw: string) {
  const m = raw.match(/(\d+)\/(\d+) test cases passed/);
  return m ? { passed: parseInt(m[1]), total: parseInt(m[2]) } : { passed: 0, total: 0 };
}

function parseTestLine(text: string) {
  // Strip "✓ PASS | " or "✗ FAIL | " or "✗ ERROR | " prefix
  const stripped = text.replace(/^[✓✗]\s(?:PASS|FAIL|ERROR)\s\|\s?/, "").trim();
  const parts = stripped.split(/\s*\|\s*/);
  const inputPart    = parts[0] ?? "";
  const expectedPart = parts.find((p) => /^Expected/i.test(p))?.replace(/^Expected[:\s]*/i, "").trim() ?? "";
  const gotPart      = parts.find((p) => /^Got[:\s]/i.test(p))?.replace(/^Got[:\s]*/i, "").trim() ?? "";
  return { input: inputPart, expected: expectedPart, got: gotPart };
}

function fakeMetrics() {
  return {
    runtime:     Math.floor(Math.random() * 80 + 55),
    memory:      parseFloat((Math.random() * 5 + 40).toFixed(1)),
    runtimeBeat: Math.floor(Math.random() * 22 + 68),
    memoryBeat:  Math.floor(Math.random() * 28 + 46),
  };
}

interface NavItem { id: number; title: string; }

export default function IDEClient({
  problem,
  solutions,
  prev,
  next,
  totalCount,
}: {
  problem: Problem;
  solutions: DBSolution[];
  prev: NavItem | null;
  next: NavItem | null;
  totalCount: number;
}) {
  const { data: session } = useSession();
  const editorialSols  = solutions.filter((s) => s.solutionType === "editorial");
  const communitySols  = solutions.filter((s) => s.solutionType === "community");

  const [lang, setLang]             = useState("javascript");
  const [code, setCode]             = useState(problem.starterCode.javascript ?? "");
  const [consoleTab, setConsoleTab] = useState<ConsoleTab>("testcase");
  const [leftTab, setLeftTab]       = useState<LeftTab>("description");
  const [lines, setLines]           = useState<TestLine[]>([]);
  const [runStatus, setRunStatus]   = useState<RunStatus>("idle");
  const [aiOpen, setAiOpen]         = useState(false);
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);
  const [expandedSol, setExpandedSol]   = useState<number | null>(null);
  const [edLang, setEdLang]             = useState<"javascript" | "python">("javascript");
  const [openHint, setOpenHint]         = useState<number | null>(null);
  const [history, setHistory]           = useState<PastSubmission[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [expandedHistory, setExpandedHistory] = useState<string | null>(null);

  const histoBars = useMemo<HistoBar[]>(() => {
    if (!submitResult || submitResult.status !== "accepted") return [];
    return generateHistogramBars(submitResult.runtime);
  }, [submitResult]);

  // ── Resizable panels ──────────────────────────────────────────────────────
  const [leftPct, setLeftPct]       = useState(40);
  const [consolePct, setConsolePct] = useState(35);
  const containerRef  = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const isDraggingLR  = useRef(false);
  const isDraggingTB  = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (isDraggingLR.current && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setLeftPct(Math.min(Math.max(((e.clientX - rect.left) / rect.width) * 100, 18), 62));
      }
      if (isDraggingTB.current && rightPanelRef.current) {
        const rect = rightPanelRef.current.getBoundingClientRect();
        setConsolePct(Math.min(Math.max(100 - ((e.clientY - rect.top) / rect.height) * 100, 20), 70));
      }
    };
    const onUp = () => {
      if (isDraggingLR.current || isDraggingTB.current) {
        isDraggingLR.current = isDraggingTB.current = false;
        document.body.style.cursor = document.body.style.userSelect = "";
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, []);

  const startDragLR = () => { isDraggingLR.current = true; document.body.style.cursor = "col-resize"; document.body.style.userSelect = "none"; };
  const startDragTB = () => { isDraggingTB.current = true; document.body.style.cursor = "row-resize"; document.body.style.userSelect = "none"; };

  const fetchHistory = useCallback(async () => {
    if (!session?.user) return;
    setHistoryLoading(true);
    try {
      const res  = await fetch(`/api/submissions?problemId=${problem.id}`);
      const data = await res.json();
      setHistory(Array.isArray(data) ? data : []);
    } catch { setHistory([]); } finally { setHistoryLoading(false); }
  }, [session, problem.id]);

  useEffect(() => {
    if (leftTab === "history") fetchHistory();
  }, [leftTab, fetchHistory]);

  // Restore saved code on mount
  useEffect(() => {
    const saved = localStorage.getItem(`intel-ai-code-${problem.id}-${lang}`);
    if (saved) setCode(saved);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-save code to localStorage on every change
  useEffect(() => {
    localStorage.setItem(`intel-ai-code-${problem.id}-${lang}`, code);
  }, [code, problem.id, lang]);

  const handleLangChange = useCallback((newLang: string) => {
    setLang(newLang);
    const saved = localStorage.getItem(`intel-ai-code-${problem.id}-${newLang}`);
    setCode(saved ?? problem.starterCode[newLang] ?? "");
    setLines([]);
    setRunStatus("idle");
    setSubmitResult(null);
    if (leftTab === "accepted" || leftTab === "wrong") setLeftTab("description");
  }, [problem, leftTab]);

  const handleReset = () => {
    localStorage.removeItem(`intel-ai-code-${problem.id}-${lang}`);
    setCode(problem.starterCode[lang] ?? "");
    setLines([]);
    setRunStatus("idle");
    setSubmitResult(null);
    if (leftTab === "accepted" || leftTab === "wrong") setLeftTab("description");
  };

  // ── Execute ───────────────────────────────────────────────────────────────
  async function execute(isSubmit: boolean) {
    setRunStatus(isSubmit ? "submitting" : "running");
    setConsoleTab("output");
    setSubmitResult(null);
    setLines([{ status: "info", text: isSubmit ? "⏳ Submitting your solution..." : "⏳ Running your code..." }]);

    const langDef   = LANGUAGES.find((l) => l.id === lang)!;
    const isJS      = lang === "javascript";
    const isPY      = lang === "python";
    const isJava    = lang === "java";
    const hasRunner = isJS || isPY;

    let fullCode = code;
    if (isJS) fullCode = code + "\n" + problem.jsRunner;
    if (isPY) {
      const shim = `\nimport sys as _sys\nclass _Compat:\n    def __getattr__(self, name):\n        fn = _sys.modules['__main__'].__dict__.get(name)\n        if fn and callable(fn): return fn\n        raise AttributeError(f"'{name}' not found as class method or standalone function")\ntry:\n    _sol_compat = Solution()\nexcept NameError:\n    _sol_compat = _Compat()\nSolution = lambda: _sol_compat\n`;
      fullCode = shim + code + "\n" + problem.pyRunner;
    }
    if (isJava) {
      const JAVA_LIST_NODE =
        "class ListNode {\n  int val;\n  ListNode next;\n  ListNode() {}\n  ListNode(int val) { this.val = val; }\n  ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\n";
      const JAVA_TREE_NODE =
        "class TreeNode {\n  int val;\n  TreeNode left, right;\n  TreeNode() {}\n  TreeNode(int val) { this.val = val; }\n  TreeNode(int val, TreeNode left, TreeNode right) { this.val = val; this.left = left; this.right = right; }\n}\n\n";
      let header = "import java.util.*;\nimport java.util.stream.*;\nimport java.io.*;\n\n";
      if (code.includes("ListNode") && !code.includes("class ListNode")) header += JAVA_LIST_NODE;
      if (code.includes("TreeNode") && !code.includes("class TreeNode")) header += JAVA_TREE_NODE;
      // Strip any leading import lines from user code to avoid duplicates
      const userBody = code.trimStart().replace(/^(import\s+[\w.*]+;\s*\r?\n)*/g, "");
      fullCode = header + userBody;
      if (!fullCode.includes("class Main")) {
        fullCode += "\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println(\"✔ COMPILE_OK\");\n  }\n}";
      }
    }
    if (lang === "cpp") {
      const cppHeader = "#include <bits/stdc++.h>\nusing namespace std;\n\n";
      const withHeader = code.trimStart().startsWith("#include") ? code : cppHeader + code;
      fullCode = withHeader.includes("int main")
        ? withHeader
        : withHeader + "\nint main() {\n  cout << \"✔ COMPILE_OK\" << endl;\n  return 0;\n}";
    }

    try {
      const res  = await fetch("/api/execute", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ source_code: fullCode, language_id: langDef.judge0Id }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      const combined = [data.compile_output, data.stdout, data.stderr].filter(Boolean).join("\n").trim();
      const parsed   = combined ? parseLines(combined) : [{ status: "info" as const, text: "(no output — check your code)" }];
      setLines(parsed);

      if (hasRunner) {
        const { passed, total } = parseResult(combined);
        if (total > 0 && passed === total) {
          setRunStatus("passed");
          if (isSubmit) {
            const metrics = fakeMetrics();
            setSubmitResult({ status: "accepted", passed, total, lines: parsed, submittedCode: code, submittedLang: lang, ...metrics });
            setLeftTab("accepted");
            if (session?.user) {
              fetch("/api/submissions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ problemId: problem.id, language: lang, code, status: "accepted", runtime: metrics.runtime, memory: metrics.memory }),
              }).then(() => fetchHistory()).catch(() => {});
            }
          }
        } else if (total > 0) {
          setRunStatus("failed");
          if (isSubmit) {
            setSubmitResult({ status: "wrong", passed, total, lines: parsed, submittedCode: code, submittedLang: lang, ...fakeMetrics() });
            setLeftTab("wrong");
            if (session?.user) {
              fetch("/api/submissions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ problemId: problem.id, language: lang, code, status: "wrong", runtime: null, memory: null }),
              }).then(() => fetchHistory()).catch(() => {});
            }
          }
        } else {
          setRunStatus("error");
          if (isSubmit) {
            setSubmitResult({ status: "error", passed: 0, total: 0, lines: parsed, submittedCode: code, submittedLang: lang, ...fakeMetrics() });
            setLeftTab("wrong");
          }
        }
      } else {
        // Java / C++ — no test runner; show compilation output only
        const hasErr = combined.toLowerCase().includes("error");
        setRunStatus(hasErr ? "error" : "idle");
        if (isSubmit) {
          setLines(parsed);
          setRunStatus(hasErr ? "error" : "idle");
          if (session?.user && !hasErr) {
            fetch("/api/submissions", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ problemId: problem.id, language: lang, code, status: "no_runner", runtime: null, memory: null }),
            }).then(() => fetchHistory()).catch(() => {});
          }
        }
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setLines([{ status: "error", text: "❌ " + msg }]);
      setRunStatus("error");
    }
  }

  const passCount = lines.filter(l => l.status === "pass").length;
  const failCount = lines.filter(l => l.status === "fail" || l.status === "error").length;
  const totalRun  = passCount + failCount;

  const coreTabs: { key: LeftTab; label: string; icon: React.ReactNode }[] = [
    { key: "description", label: "Description", icon: <BookOpen className="w-3 h-3" /> },
    { key: "editorial",   label: "Editorial",   icon: <Lightbulb className="w-3 h-3" /> },
    { key: "solutions",   label: "Solutions",   icon: <Users className="w-3 h-3" /> },
    { key: "history",     label: "History",     icon: <History className="w-3 h-3" /> },
  ];

  return (
    <div className="h-screen flex flex-col bg-[#0d1117] overflow-hidden select-none">

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 h-12 bg-[#161b22] border-b border-[#21262d] flex-shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5">
            <div className="w-6 h-6 bg-gradient-to-br from-[#0071e3] to-[#00c9ff] rounded-md flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" fill="white" />
            </div>
            <span className="font-bold text-sm hidden sm:block text-white">Intel<span className="text-[#00c9ff]"> AI</span></span>
          </Link>
          <div className="h-4 w-px bg-[#21262d]" />
          <Link href="/practice" className="text-xs text-[#8b949e] hover:text-white">Problems</Link>
          <div className="flex items-center gap-0.5">
            <button
              onClick={() => prev && (window.location.href = `/practice/${prev.id}`)}
              disabled={!prev}
              className="p-1 text-[#8b949e] hover:text-white disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs text-[#8b949e] font-mono">{problem.id}/{totalCount}</span>
            <button
              onClick={() => next && (window.location.href = `/practice/${next.id}`)}
              disabled={!next}
              className="p-1 text-[#8b949e] hover:text-white disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setAiOpen(!aiOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${aiOpen ? "bg-[#0071e3]/20 border-[#0071e3]/40 text-[#0071e3]" : "bg-[#1c2333] border-[#21262d] text-[#8b949e] hover:text-white"}`}
          >
            <Bot className="w-3.5 h-3.5" /> AI Hint
          </button>
          <button
            onClick={() => execute(false)}
            disabled={runStatus === "running" || runStatus === "submitting"}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1c2333] hover:bg-[#21262d] border border-[#21262d] text-white rounded-lg text-xs font-medium disabled:opacity-50"
          >
            {runStatus === "running" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 text-green-400" />} Run
          </button>
          <button
            onClick={() => execute(true)}
            disabled={runStatus === "running" || runStatus === "submitting"}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0071e3] hover:bg-[#0058b3] text-white rounded-lg text-xs font-semibold disabled:opacity-50"
          >
            {runStatus === "submitting" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />} Submit
          </button>
        </div>
      </div>

      {/* ── Main layout ─────────────────────────────────────────────────── */}
      <div ref={containerRef} className="flex flex-1 overflow-hidden">

        {/* ── LEFT PANEL ── */}
        <div style={{ width: `${leftPct}%` }} className="flex flex-col overflow-hidden border-r border-[#21262d]">

          {/* Tab bar */}
          <div className="flex border-b border-[#21262d] bg-[#161b22] flex-shrink-0 overflow-x-auto">
            {(leftTab === "accepted" || leftTab === "wrong") && (
              <button className={`flex items-center gap-1.5 py-2.5 px-3 text-xs font-semibold border-b-2 whitespace-nowrap ${leftTab === "accepted" ? "border-green-500 text-green-400" : "border-red-500 text-red-400"}`}>
                {leftTab === "accepted" ? <><CheckCircle2 className="w-3 h-3" /> Accepted</> : <><XCircle className="w-3 h-3" /> Wrong Answer</>}
              </button>
            )}
            {coreTabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setLeftTab(t.key)}
                className={`flex items-center gap-1.5 py-2.5 px-3 text-xs font-medium border-b-2 whitespace-nowrap transition-colors ${leftTab === t.key ? "border-[#0071e3] text-white" : "border-transparent text-[#8b949e] hover:text-white"}`}
              >
                {t.icon} {t.label}
                {t.key === "solutions" && communitySols.length > 0 && (
                  <span className="ml-0.5 text-[10px] bg-[#21262d] text-[#8b949e] rounded-full px-1.5">{communitySols.length}</span>
                )}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto">

            {/* ── ACCEPTED VIEW ── */}
            {leftTab === "accepted" && submitResult?.status === "accepted" && (
              <div className="p-5 space-y-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-green-500/15 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-400">Accepted</div>
                    <div className="text-xs text-[#8b949e]">{submitResult.passed}/{submitResult.total} testcases passed</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#0d1117] border border-[#21262d] rounded-xl p-4">
                    <div className="flex items-center gap-1.5 text-xs text-[#8b949e] mb-2"><Clock className="w-3 h-3" /> Runtime</div>
                    <div className="text-2xl font-bold text-white">{submitResult.runtime}<span className="text-sm font-normal text-[#8b949e] ml-1">ms</span></div>
                    <div className="text-xs text-green-400 font-semibold mt-0.5">Beats {submitResult.runtimeBeat}%</div>
                  </div>
                  <div className="bg-[#0d1117] border border-[#21262d] rounded-xl p-4">
                    <div className="flex items-center gap-1.5 text-xs text-[#8b949e] mb-2"><MemoryStick className="w-3 h-3" /> Memory</div>
                    <div className="text-2xl font-bold text-white">{submitResult.memory}<span className="text-sm font-normal text-[#8b949e] ml-1">MB</span></div>
                    <div className="text-xs text-green-400 font-semibold mt-0.5">Beats {submitResult.memoryBeat}%</div>
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-3">Runtime Distribution</div>
                  <div className="bg-[#0d1117] border border-[#21262d] rounded-xl p-4">
                    <div className="flex items-end gap-px" style={{ height: 80 }}>
                      {histoBars.map((bar, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${bar.height}%` }}
                          transition={{ delay: i * 0.012, duration: 0.35, ease: "easeOut" }}
                          style={{ flex: 1 }}
                          className={`rounded-sm transition-colors ${bar.isUser ? "bg-[#0071e3] shadow-lg shadow-[#0071e3]/30" : "bg-[#21262d] hover:bg-[#30363d]"}`}
                          title={`${bar.ms}ms`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between mt-2 text-[10px] text-[#8b949e]">
                      <span>1ms</span>
                      <span className="text-[#0071e3] font-semibold">{submitResult.runtime}ms ← you</span>
                      <span>100ms</span>
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-[10px] text-[#8b949e]">
                      <span className="flex items-center gap-1.5"><span className="w-3 h-2 bg-[#0071e3] rounded-sm inline-block" /> Your submission</span>
                      <span className="flex items-center gap-1.5"><span className="w-3 h-2 bg-[#21262d] rounded-sm inline-block" /> All submissions</span>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Your Solution</span>
                    <span className={`text-xs px-2 py-0.5 rounded border font-medium ${langBadgeColor[LANGUAGES.find(l => l.id === submitResult.submittedLang)?.label ?? "JavaScript"] ?? "text-[#8b949e] border-[#21262d]"}`}>
                      {LANGUAGES.find(l => l.id === submitResult.submittedLang)?.label}
                    </span>
                  </div>
                  <pre className="bg-[#0d1117] border border-[#21262d] rounded-lg p-3 text-xs text-[#c9d1d9] overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap max-h-52">
                    {submitResult.submittedCode}
                  </pre>
                </div>
                {next && (
                  <button
                    onClick={() => (window.location.href = `/practice/${next.id}`)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#0071e3] hover:bg-[#0058b3] text-white rounded-xl text-sm font-semibold transition-colors"
                  >
                    Next Problem <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            )}

            {/* ── WRONG ANSWER VIEW ── */}
            {leftTab === "wrong" && submitResult && (
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-red-500/15 flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-red-400">{submitResult.status === "error" ? "Runtime Error" : "Wrong Answer"}</div>
                    {submitResult.total > 0 && <div className="text-xs text-[#8b949e]">{submitResult.passed}/{submitResult.total} testcases passed</div>}
                  </div>
                </div>
                {submitResult.total > 0 && (
                  <div className="bg-[#0d1117] border border-[#21262d] rounded-xl p-4">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-[#8b949e]">Progress</span>
                      <span className="text-red-400 font-semibold">{Math.round((submitResult.passed / submitResult.total) * 100)}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#21262d] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(submitResult.passed / submitResult.total) * 100}%` }}
                        transition={{ duration: 0.6 }}
                        className="h-full rounded-full bg-red-500"
                      />
                    </div>
                    <div className="flex justify-between text-[10px] mt-1.5">
                      <span className="text-green-400">{submitResult.passed} passed</span>
                      <span className="text-red-400">{submitResult.total - submitResult.passed} failed</span>
                    </div>
                  </div>
                )}
                <div>
                  <div className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider mb-2">Test Output</div>
                  <div className="space-y-1 font-mono text-xs max-h-52 overflow-y-auto">
                    {submitResult.lines.filter(l => l.status !== "score").map((l, i) => (
                      <div key={i} className={`flex items-start gap-2 px-2.5 py-1.5 rounded-lg ${l.status === "pass" ? "bg-green-500/8 border border-green-500/15" : l.status === "fail" ? "bg-red-500/8 border border-red-500/15" : l.status === "error" ? "bg-orange-500/8 border border-orange-500/15" : ""}`}>
                        {l.status === "pass"  && <CheckCircle2 className="w-3.5 h-3.5 text-green-400 mt-0.5 flex-shrink-0" />}
                        {l.status === "fail"  && <XCircle className="w-3.5 h-3.5 text-red-400 mt-0.5 flex-shrink-0" />}
                        {l.status === "error" && <AlertCircle className="w-3.5 h-3.5 text-orange-400 mt-0.5 flex-shrink-0" />}
                        {l.status === "info"  && <div className="w-3.5 flex-shrink-0" />}
                        <span className={l.status === "pass" ? "text-green-300" : l.status === "fail" ? "text-red-300" : l.status === "error" ? "text-orange-300" : "text-[#8b949e]"}>
                          {l.text.replace(/^[✓✗] (PASS|FAIL|ERROR) \| /, "")}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={() => setLeftTab("description")} className="w-full py-2.5 text-sm border border-[#21262d] text-[#8b949e] hover:text-white rounded-xl transition-colors">
                  Back to Problem
                </button>
              </div>
            )}

            {/* ── DESCRIPTION ── */}
            {leftTab === "description" && (
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${difficultyColor[problem.difficulty] ?? "text-gray-400 bg-gray-400/10 border-gray-400/20"}`}>
                    {problem.difficulty}
                  </span>
                  <span className="text-xs text-[#0071e3] font-medium">{problem.category}</span>
                  <span className="text-xs text-[#8b949e]">✓ {problem.acceptance}</span>
                </div>
                <h1 className="text-base font-bold text-white mb-4">{problem.id}. {problem.title}</h1>
                <div className="text-sm text-[#c9d1d9] leading-relaxed mb-6 whitespace-pre-line">{problem.description}</div>
                {problem.examples.map((ex, i) => (
                  <div key={i} className="mb-4">
                    <div className="text-xs font-semibold text-[#8b949e] mb-1.5">Example {i + 1}:</div>
                    <div className="bg-[#0d1117] border border-[#21262d] rounded-lg p-3 font-mono text-xs space-y-1">
                      <div><span className="text-[#8b949e]">Input: </span><span className="text-white">{ex.input}</span></div>
                      <div><span className="text-[#8b949e]">Output: </span><span className="text-white">{ex.output}</span></div>
                      {ex.explanation && <div className="text-[#8b949e] pt-1">Explanation: {ex.explanation}</div>}
                    </div>
                  </div>
                ))}
                <div className="mt-4">
                  <div className="text-xs font-semibold text-[#8b949e] mb-2">Constraints:</div>
                  <ul className="space-y-1">
                    {problem.constraints.map((c, i) => (
                      <li key={i} className="text-xs text-[#c9d1d9] flex gap-2">
                        <span className="text-[#0071e3] flex-shrink-0">•</span>{c}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-5 border-t border-[#21262d] pt-4">
                  <div className="text-xs font-semibold text-[#8b949e] mb-2">Hints:</div>
                  <div className="space-y-2">
                    {problem.hints.map((h, i) => (
                      <button key={i} onClick={() => setOpenHint(openHint === i ? null : i)} className="w-full text-left bg-[#0d1117] border border-[#21262d] rounded-lg px-3 py-2">
                        <div className="flex items-center justify-between text-xs font-medium text-[#8b949e]">
                          <span>Hint {i + 1}</span>
                          {openHint === i ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </div>
                        {openHint === i && <div className="mt-1.5 text-xs text-[#c9d1d9]">{h}</div>}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── EDITORIAL ── */}
            {leftTab === "editorial" && editorialSols.length > 0 && (() => {
              const jsEd  = editorialSols.find((s) => s.language === "javascript") ?? editorialSols[0];
              const pyEd  = editorialSols.find((s) => s.language === "python");
              const langs = ["javascript", ...(pyEd ? ["python"] : [])] as const;
              const edCode = edLang === "python" && pyEd ? pyEd.code : jsEd.code;
              return (
                <div className="p-5 space-y-5">
                  <div className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    <span className="text-sm font-bold text-white">{jsEd.approach}</span>
                  </div>
                  <p className="text-sm text-[#c9d1d9] leading-relaxed whitespace-pre-line">{jsEd.explanation}</p>
                  <div className="flex gap-3">
                    <div className="flex-1 bg-[#0d1117] border border-[#21262d] rounded-xl p-3">
                      <div className="text-xs text-[#8b949e] mb-1">Time</div>
                      <div className="text-sm font-mono font-bold text-green-400">{jsEd.timeComplex}</div>
                    </div>
                    <div className="flex-1 bg-[#0d1117] border border-[#21262d] rounded-xl p-3">
                      <div className="text-xs text-[#8b949e] mb-1">Space</div>
                      <div className="text-sm font-mono font-bold text-blue-400">{jsEd.spaceComplex}</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-sm font-bold text-white">Optimal Solution</h2>
                      {langs.length > 1 && (
                        <div className="flex gap-1">
                          {langs.map((l) => (
                            <button key={l} onClick={() => setEdLang(l as "javascript" | "python")} className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${edLang === l ? "bg-[#0071e3]/20 border-[#0071e3]/40 text-[#0071e3]" : "bg-[#1c2333] border-[#21262d] text-[#8b949e]"}`}>
                              {l === "javascript" ? "JS" : "Python"}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <pre className="bg-[#0d1117] border border-[#21262d] rounded-lg p-3 text-xs text-[#c9d1d9] overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap">
                      {edCode}
                    </pre>
                  </div>
                </div>
              );
            })()}
            {leftTab === "editorial" && editorialSols.length === 0 && (
              <div className="p-5 text-center text-[#8b949e] text-sm">Editorial coming soon.</div>
            )}

            {/* ── SOLUTIONS ── */}
            {leftTab === "solutions" && communitySols.length > 0 && (
              <div className="p-4 space-y-2">
                <div className="text-xs text-[#8b949e] mb-3">{communitySols.length} community solutions</div>
                {communitySols.map((sol, i) => (
                  <div key={sol.id} className="bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden">
                    <button onClick={() => setExpandedSol(expandedSol === i ? null : i)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/3 transition-colors">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0071e3] to-[#00c9ff] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {(sol.username ?? "U")[1]?.toUpperCase() ?? "U"}
                        </div>
                        <div className="text-left min-w-0">
                          <div className="text-xs font-semibold text-white truncate">{sol.username ?? "Anonymous"}</div>
                          <div className="text-xs text-[#8b949e] truncate">{sol.approach}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        <span className={`text-xs px-1.5 py-0.5 rounded border font-medium ${langBadgeColor[sol.language] ?? "text-[#8b949e] border-[#21262d]"}`}>{sol.language}</span>
                        {sol.runtime != null && (
                          <div className="text-right hidden sm:block">
                            <div className="text-xs text-green-400 font-semibold">{sol.runtime}ms</div>
                            {sol.beats != null && <div className="text-xs text-[#8b949e]">beats {sol.beats}%</div>}
                          </div>
                        )}
                        {expandedSol === i ? <ChevronUp className="w-3.5 h-3.5 text-[#8b949e]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#8b949e]" />}
                      </div>
                    </button>
                    {expandedSol === i && (
                      <div className="border-t border-[#21262d]">
                        <div className="flex gap-4 px-4 py-2 bg-[#0d1117] text-xs text-[#8b949e]">
                          {sol.runtime != null && <span className="flex items-center gap-1"><Cpu className="w-3 h-3" /> {sol.runtime} ms</span>}
                          {sol.memory != null && <span className="flex items-center gap-1"><MemoryStick className="w-3 h-3" /> {sol.memory} MB</span>}
                          {sol.beats != null && <span className="text-green-400 font-semibold">Beats {sol.beats}%</span>}
                          <span className="flex items-center gap-1 text-blue-400">{sol.timeComplex}</span>
                          <span className="flex items-center gap-1 text-purple-400">{sol.spaceComplex}</span>
                        </div>
                        <pre className="px-4 py-3 text-xs text-[#c9d1d9] overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap bg-[#0d1117] border-t border-[#21262d]">
                          {sol.code}
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {leftTab === "solutions" && communitySols.length === 0 && (
              <div className="p-5 text-center text-[#8b949e] text-sm">Solutions coming soon.</div>
            )}

            {/* ── HISTORY ── */}
            {leftTab === "history" && (
              <div className="p-4">
                {!session?.user && (
                  <div className="text-center text-[#8b949e] text-sm py-8">Sign in to see your submission history.</div>
                )}
                {session?.user && historyLoading && (
                  <div className="flex items-center justify-center py-8"><Loader2 className="w-5 h-5 text-[#0071e3] animate-spin" /></div>
                )}
                {session?.user && !historyLoading && history.length === 0 && (
                  <div className="text-center text-[#8b949e] text-sm py-8">No submissions yet for this problem.</div>
                )}
                {session?.user && !historyLoading && history.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-xs text-[#8b949e] mb-3">{history.length} submission{history.length !== 1 ? "s" : ""}</div>
                    {history.map((sub) => {
                      const isExpanded = expandedHistory === sub.id;
                      const isAcc = sub.status === "accepted";
                      const isSubOnly = sub.status === "submitted";
                      const langLabel = LANGUAGES.find(l => l.id === sub.language)?.label ?? sub.language;
                      const date = new Date(sub.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
                      return (
                        <div key={sub.id} className="bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden">
                          <button onClick={() => setExpandedHistory(isExpanded ? null : sub.id)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/3 transition-colors text-left">
                            <div className="flex items-center gap-2.5 min-w-0">
                              {isAcc
                                ? <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                                : isSubOnly
                                ? <Send className="w-4 h-4 text-blue-400 flex-shrink-0" />
                                : <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
                              <div className="min-w-0">
                                <div className={`text-xs font-semibold ${isAcc ? "text-green-400" : isSubOnly ? "text-blue-400" : "text-red-400"}`}>{isAcc ? "Accepted" : isSubOnly ? "Submitted" : "Wrong Answer"}</div>
                                <div className="text-[10px] text-[#8b949e] truncate">{date}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                              <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${langBadgeColor[langLabel] ?? "text-[#8b949e] border-[#21262d]"}`}>{langLabel}</span>
                              {isAcc && sub.runtime != null && <span className="text-[10px] text-green-400 font-semibold hidden sm:block">{sub.runtime}ms</span>}
                              {isExpanded ? <ChevronUp className="w-3.5 h-3.5 text-[#8b949e]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#8b949e]" />}
                            </div>
                          </button>
                          {isExpanded && (
                            <div className="border-t border-[#21262d]">
                              {isAcc && sub.runtime != null && sub.memory != null && (
                                <div className="flex gap-4 px-4 py-2 bg-[#0d1117] text-xs text-[#8b949e]">
                                  <span className="flex items-center gap-1"><Cpu className="w-3 h-3" /> {sub.runtime} ms</span>
                                  <span className="flex items-center gap-1"><MemoryStick className="w-3 h-3" /> {sub.memory} MB</span>
                                </div>
                              )}
                              <div className="flex items-center justify-between px-4 py-2 bg-[#0d1117] border-t border-[#21262d]">
                                <span className="text-[10px] text-[#8b949e]">Click to load in editor</span>
                                <button
                                  onClick={() => { setLang(sub.language); setCode(sub.code); setExpandedHistory(null); }}
                                  className="text-[10px] px-2 py-1 bg-[#0071e3]/15 border border-[#0071e3]/30 text-[#0071e3] rounded-md hover:bg-[#0071e3]/25 transition-colors"
                                >
                                  Load Code
                                </button>
                              </div>
                              <pre className="px-4 py-3 text-xs text-[#c9d1d9] overflow-x-auto font-mono leading-relaxed whitespace-pre-wrap bg-[#0d1117] border-t border-[#21262d] max-h-48">
                                {sub.code}
                              </pre>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

        {/* L-R drag handle */}
        <div onMouseDown={startDragLR} className="w-1 bg-[#21262d] hover:bg-[#0071e3]/60 cursor-col-resize flex-shrink-0 transition-colors relative">
          <div className="absolute inset-y-0 -left-1 -right-1" />
        </div>

        {/* ── RIGHT PANEL ── */}
        <div ref={rightPanelRef} className="flex-1 flex flex-col overflow-hidden">

          {/* Editor toolbar */}
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#161b22] border-b border-[#21262d] flex-shrink-0">
            <select value={lang} onChange={(e) => handleLangChange(e.target.value)} className="text-xs bg-[#0d1117] border border-[#21262d] text-white rounded-md px-2 py-1 focus:outline-none focus:border-[#0071e3] cursor-pointer">
              {LANGUAGES.map((l) => <option key={l.id} value={l.id}>{l.label}</option>)}
            </select>
            <div className="flex items-center gap-2">
              {(lang === "java" || lang === "cpp") && <span className="text-xs text-yellow-400/70">Scoring: JS &amp; Python only</span>}
              <button onClick={handleReset} title="Reset" className="p-1.5 rounded-md text-[#8b949e] hover:text-white hover:bg-white/5"><RotateCcw className="w-3.5 h-3.5" /></button>
            </div>
          </div>

          {/* Monaco */}
          <div style={{ flex: `1 1 ${100 - consolePct}%` }} className="overflow-hidden min-h-0">
            <MonacoEditor
              height="100%"
              language={lang === "cpp" ? "cpp" : lang}
              value={code}
              onChange={(v) => setCode(v ?? "")}
              theme="vs-dark"
              options={{
                fontSize: 13,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: "on",
                padding: { top: 12 },
                fontFamily: "'JetBrains Mono','Fira Code',monospace",
                fontLigatures: true,
                wordWrap: "on",
                automaticLayout: true,
                // auto-indent + tab completion
                tabSize: 2,
                insertSpaces: true,
                autoIndent: "full",
                formatOnType: true,
                formatOnPaste: true,
                tabCompletion: "on",
                quickSuggestions: { other: true, comments: false, strings: true },
                suggestOnTriggerCharacters: true,
                acceptSuggestionOnEnter: "on",
                snippetSuggestions: "inline",
                wordBasedSuggestions: "allDocuments",
                parameterHints: { enabled: true },
                bracketPairColorization: { enabled: true },
                autoClosingBrackets: "always",
                autoClosingQuotes: "always",
                autoSurround: "languageDefined",
              }}
            />
          </div>

          {/* T-B drag handle */}
          <div onMouseDown={startDragTB} className="h-1 bg-[#21262d] hover:bg-[#0071e3]/60 cursor-row-resize flex-shrink-0 transition-colors relative">
            <div className="absolute inset-x-0 -top-1 -bottom-1" />
          </div>

          {/* Console */}
          <div style={{ flex: `0 0 ${consolePct}%` }} className="flex flex-col overflow-hidden min-h-0">
            <div className="flex items-center justify-between border-b border-[#21262d] px-3 bg-[#161b22] flex-shrink-0">
              <div className="flex">
                {(["testcase", "output"] as ConsoleTab[]).map((tab) => (
                  <button key={tab} onClick={() => setConsoleTab(tab)} className={`py-2 px-3 text-xs font-medium border-b-2 transition-colors ${consoleTab === tab ? "border-[#0071e3] text-white" : "border-transparent text-[#8b949e] hover:text-white"}`}>
                    {tab === "testcase" ? "Test Cases" : "Output"}
                    {tab === "output" && totalRun > 0 && (
                      <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full font-bold ${failCount === 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                        {passCount}/{totalRun}
                      </span>
                    )}
                  </button>
                ))}
              </div>
              <div className="text-xs flex items-center gap-1.5">
                {runStatus === "running"    && <span className="flex items-center gap-1 text-yellow-400"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Running…</span>}
                {runStatus === "submitting" && <span className="flex items-center gap-1 text-blue-400"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Submitting…</span>}
                {runStatus === "passed"     && <span className="flex items-center gap-1 text-green-400 font-semibold"><CheckCircle2 className="w-3.5 h-3.5" /> Accepted</span>}
                {runStatus === "failed"     && <span className="flex items-center gap-1 text-red-400 font-semibold"><XCircle className="w-3.5 h-3.5" /> Wrong Answer</span>}
                {runStatus === "error"      && <span className="flex items-center gap-1 text-orange-400 font-semibold"><AlertCircle className="w-3.5 h-3.5" /> Error</span>}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-3">
              {consoleTab === "testcase" && (
                <div className="space-y-3">
                  {(() => {
                    const resultLines = lines.filter(l => l.status === "pass" || l.status === "fail" || l.status === "error");
                    const hasResults  = resultLines.length > 0;
                    return problem.examples.slice(0, 2).map((ex, i) => {
                      const res    = resultLines[i];
                      const isPass = res?.status === "pass";
                      const isErr  = res?.status === "error";
                      const { got } = res ? parseTestLine(res.text) : { got: "" };
                      return (
                        <div key={i} className={`rounded-xl border font-mono text-xs overflow-hidden transition-colors ${
                          !res ? "border-[#21262d] bg-[#0d1117]" :
                          isPass ? "border-green-500/30 bg-green-500/5" :
                          isErr  ? "border-orange-500/30 bg-orange-500/5" :
                                   "border-red-500/30 bg-red-500/5"
                        }`}>
                          <div className={`flex items-center gap-2 px-3 py-2 border-b ${
                            !res ? "border-[#21262d] bg-[#161b22]" :
                            isPass ? "border-green-500/15 bg-green-500/10" :
                            isErr  ? "border-orange-500/15 bg-orange-500/10" :
                                     "border-red-500/15 bg-red-500/10"
                          }`}>
                            {res && isPass  && <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />}
                            {res && isErr   && <AlertCircle  className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />}
                            {res && !isPass && !isErr && <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />}
                            {!res && <div className="w-3 h-3 rounded-full border-2 border-[#30363d] flex-shrink-0" />}
                            <span className={`font-semibold text-[11px] ${
                              !res ? "text-[#8b949e]" :
                              isPass ? "text-green-300" : isErr ? "text-orange-300" : "text-red-300"
                            }`}>
                              Case {i + 1}{res ? (isPass ? " — Passed ✓" : isErr ? " — Error" : " — Failed ✗") : ""}
                            </span>
                          </div>
                          <div className="px-3 py-2 space-y-1">
                            <div className="flex gap-2">
                              <span className="text-[#8b949e] w-20 flex-shrink-0">Input:</span>
                              <span className="text-white break-all">{ex.input}</span>
                            </div>
                            <div className="flex gap-2">
                              <span className="text-[#8b949e] w-20 flex-shrink-0">Expected:</span>
                              <span className="text-green-300 break-all">{ex.output}</span>
                            </div>
                            {res && got && (
                              <div className="flex gap-2">
                                <span className="text-[#8b949e] w-20 flex-shrink-0">Got:</span>
                                <span className={`break-all ${isPass ? "text-green-300" : isErr ? "text-orange-300" : "text-red-300"}`}>{got}</span>
                              </div>
                            )}
                            {res && isErr && (
                              <div className="flex gap-2">
                                <span className="text-[#8b949e] w-20 flex-shrink-0">Error:</span>
                                <span className="text-orange-300 break-all text-[10px]">{res.text.replace(/^✗ ERROR \|\s?/, "")}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    });
                  })()}
                  {lines.filter(l => l.status === "pass" || l.status === "fail" || l.status === "error").length === 0 && (
                    <p className="text-xs text-[#8b949e] pt-1">
                      Press <kbd className="px-1.5 py-0.5 bg-[#161b22] border border-[#21262d] rounded text-white text-[10px]">Run</kbd> to test ·{" "}
                      <kbd className="px-1.5 py-0.5 bg-[#0071e3]/20 border border-[#0071e3]/30 rounded text-[#0071e3] text-[10px]">Submit</kbd> to score all
                    </p>
                  )}
                </div>
              )}

              {consoleTab === "output" && (
                <div className="space-y-2">
                  {lines.length === 0 ? (
                    <span className="text-[#8b949e] text-xs">No output yet. Press Run or Submit.</span>
                  ) : (
                    <>
                      {/* ── Summary bar ─────────────────────────────────────── */}
                      {totalRun > 0 && (
                        <div className="bg-[#0d1117] border border-[#21262d] rounded-xl p-3 mb-2">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-[#8b949e]">Test Results</span>
                            <span className={`text-sm font-bold ${failCount === 0 ? "text-green-400" : "text-red-400"}`}>{passCount}/{totalRun} passed</span>
                          </div>
                          <div className="w-full h-2 bg-[#21262d] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${(passCount / totalRun) * 100}%` }}
                              transition={{ duration: 0.6 }}
                              className={`h-full rounded-full ${failCount === 0 ? "bg-green-500" : passCount > 0 ? "bg-yellow-500" : "bg-red-500"}`}
                            />
                          </div>
                          <div className="flex justify-between mt-1.5 text-[10px]">
                            <span className="text-green-400">{passCount} passed</span>
                            {failCount > 0 && <span className="text-red-400">{failCount} failed</span>}
                            <span className="text-[#8b949e]">{Math.round((passCount / totalRun) * 100)}% accuracy</span>
                          </div>
                        </div>
                      )}

                      {/* ── Per-case cards ──────────────────────────────────── */}
                      <div className="space-y-2">
                        {(() => {
                          let caseNum = 0;
                          return lines.map((line, i) => {
                            if (line.status === "score") return null;

                            if (line.status === "pass" || line.status === "fail" || line.status === "error") {
                              caseNum++;
                              const { input, expected, got } = parseTestLine(line.text);
                              const isPass = line.status === "pass";
                              const isErr  = line.status === "error";
                              return (
                                <div key={i} className={`rounded-xl border font-mono text-xs overflow-hidden ${isPass ? "border-green-500/25 bg-green-500/5" : isErr ? "border-orange-500/25 bg-orange-500/5" : "border-red-500/25 bg-red-500/5"}`}>
                                  {/* header row */}
                                  <div className={`flex items-center gap-2 px-3 py-2 border-b ${isPass ? "border-green-500/15 bg-green-500/10" : isErr ? "border-orange-500/15 bg-orange-500/10" : "border-red-500/15 bg-red-500/10"}`}>
                                    {isPass  && <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />}
                                    {isErr   && <AlertCircle  className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />}
                                    {!isPass && !isErr && <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />}
                                    <span className={`font-semibold text-[11px] ${isPass ? "text-green-300" : isErr ? "text-orange-300" : "text-red-300"}`}>
                                      Case {caseNum} — {isPass ? "Passed" : isErr ? "Error" : "Failed"}
                                    </span>
                                  </div>
                                  {/* detail rows */}
                                  <div className="px-3 py-2 space-y-1">
                                    {input && (
                                      <div className="flex gap-2">
                                        <span className="text-[#8b949e] w-20 flex-shrink-0">Input:</span>
                                        <span className="text-white break-all">{input}</span>
                                      </div>
                                    )}
                                    {isErr ? (
                                      <div className="flex gap-2">
                                        <span className="text-[#8b949e] w-20 flex-shrink-0">Message:</span>
                                        <span className="text-orange-300 break-all">{line.text.replace(/^✗ ERROR \| /, "")}</span>
                                      </div>
                                    ) : (
                                      <>
                                        {expected && (
                                          <div className="flex gap-2">
                                            <span className="text-[#8b949e] w-20 flex-shrink-0">Expected:</span>
                                            <span className="text-green-300 break-all">{expected}</span>
                                          </div>
                                        )}
                                        {got && (
                                          <div className="flex gap-2">
                                            <span className="text-[#8b949e] w-20 flex-shrink-0">Got:</span>
                                            <span className={`break-all ${isPass ? "text-green-300" : "text-red-300"}`}>{got}</span>
                                          </div>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                              );
                            }

                            // compile_ok — styled success banner + reference test cases
                            if (line.status === "compile_ok") {
                              return (
                                <div key={i} className="space-y-3">
                                  <div className="rounded-xl border border-green-500/30 bg-green-500/8 p-4 flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-semibold text-green-300">Compilation Successful</p>
                                      <p className="text-[11px] text-[#8b949e] mt-0.5">Your code compiled without errors.</p>
                                      <p className="text-[10px] text-[#6e7681] mt-1">
                                        Switch to{" "}
                                        <span className="text-yellow-400 font-medium">JavaScript</span> or{" "}
                                        <span className="text-blue-400 font-medium">Python</span>{" "}
                                        for automated test-case scoring with pass/fail results.
                                      </p>
                                    </div>
                                  </div>
                                  <p className="text-[11px] text-[#8b949e] px-1 font-medium">Reference Test Cases</p>
                                  {problem.examples.slice(0, 2).map((ex, idx) => (
                                    <div key={idx} className="rounded-xl border border-[#21262d] bg-[#0d1117] font-mono text-xs overflow-hidden">
                                      <div className="flex items-center gap-2 px-3 py-2 border-b border-[#21262d] bg-[#161b22]">
                                        <div className="w-3 h-3 rounded-full border-2 border-[#30363d] flex-shrink-0" />
                                        <span className="text-[11px] text-[#8b949e] font-semibold">Case {idx + 1} — Unverified</span>
                                      </div>
                                      <div className="px-3 py-2 space-y-1">
                                        <div className="flex gap-2">
                                          <span className="text-[#8b949e] w-20 flex-shrink-0">Input:</span>
                                          <span className="text-white break-all">{ex.input}</span>
                                        </div>
                                        <div className="flex gap-2">
                                          <span className="text-[#8b949e] w-20 flex-shrink-0">Expected:</span>
                                          <span className="text-green-300 break-all">{ex.output}</span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              );
                            }

                            // info / score lines
                            return (
                              <div key={i} className="flex items-start gap-2 px-2 py-1 text-xs font-mono">
                                <span className="text-[#8b949e] break-all">{line.text}</span>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* AI panel */}
        {aiOpen && (
          <div className="w-72 flex-shrink-0 border-l border-[#21262d] overflow-hidden">
            <AITeachingAssistant problem={problem} code={code} isOpen={aiOpen} onClose={() => setAiOpen(false)} />
          </div>
        )}
      </div>
    </div>
  );
}
