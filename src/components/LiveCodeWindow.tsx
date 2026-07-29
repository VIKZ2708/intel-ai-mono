"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Play } from "lucide-react";

type Token = { t: string; c: string };

const LINES: Token[][] = [
  [{ t: "def ", c: "#c792ea" }, { t: "twoSum", c: "#82aaff" }, { t: "(nums, target):", c: "#89ddff" }],
  [{ t: "    seen ", c: "#e6edf3" }, { t: "= ", c: "#89ddff" }, { t: "{}", c: "#ffcb6b" }],
  [
    { t: "    ", c: "#e6edf3" }, { t: "for ", c: "#c792ea" }, { t: "i, num ", c: "#e6edf3" },
    { t: "in ", c: "#c792ea" }, { t: "enumerate", c: "#82aaff" }, { t: "(nums):", c: "#89ddff" },
  ],
  [
    { t: "        comp ", c: "#e6edf3" }, { t: "= ", c: "#89ddff" },
    { t: "target ", c: "#e6edf3" }, { t: "- ", c: "#89ddff" }, { t: "num", c: "#e6edf3" },
  ],
  [{ t: "        ", c: "#e6edf3" }, { t: "if ", c: "#c792ea" }, { t: "comp ", c: "#e6edf3" }, { t: "in ", c: "#c792ea" }, { t: "seen:", c: "#e6edf3" }],
  [{ t: "            ", c: "#e6edf3" }, { t: "return ", c: "#c792ea" }, { t: "[seen[comp], i]", c: "#ffcb6b" }],
  [{ t: "        seen[num] ", c: "#e6edf3" }, { t: "= ", c: "#89ddff" }, { t: "i", c: "#e6edf3" }],
];

// Flatten to per-character array
const CHARS: { ch: string; color: string; isNewline: boolean }[] = [];
for (const line of LINES) {
  for (const tok of line) {
    for (const ch of tok.t) CHARS.push({ ch, color: tok.c, isNewline: false });
  }
  CHARS.push({ ch: "\n", color: "", isNewline: true });
}
const TOTAL = CHARS.length;

const TEST_CASES = [
  { input: "nums=[2,7,11,15], target=9", output: "[0,1]", pass: true },
  { input: "nums=[3,2,4], target=6",     output: "[1,2]", pass: true },
  { input: "nums=[3,3], target=6",       output: "[0,1]", pass: true },
];

export default function LiveCodeWindow() {
  const [pos, setPos]       = useState(0);
  const [phase, setPhase]   = useState<"typing" | "running" | "done" | "resetting">("typing");
  const [testIdx, setTestIdx] = useState(0);

  // Typing phase
  useEffect(() => {
    if (phase !== "typing") return;
    if (pos >= TOTAL) { setTimeout(() => setPhase("running"), 400); return; }
    const ch = CHARS[pos];
    const delay = ch.isNewline ? 60 : 18;
    const t = setTimeout(() => setPos(p => p + 1), delay);
    return () => clearTimeout(t);
  }, [pos, phase]);

  // Running test cases one by one
  useEffect(() => {
    if (phase !== "running") return;
    if (testIdx < TEST_CASES.length) {
      const t = setTimeout(() => setTestIdx(i => i + 1), 500);
      return () => clearTimeout(t);
    }
    setTimeout(() => setPhase("done"), 300);
  }, [phase, testIdx]);

  // Reset loop
  useEffect(() => {
    if (phase !== "done") return;
    const t = setTimeout(() => {
      setPhase("resetting");
      setTimeout(() => { setPos(0); setTestIdx(0); setPhase("typing"); }, 600);
    }, 3500);
    return () => clearTimeout(t);
  }, [phase]);

  // Build rendered lines from CHARS[0..pos]
  const renderedLines: { nodes: { text: string; color: string }[] }[] = [];
  let currentLine: { text: string; color: string }[] = [];
  let currentColor = "";
  let currentText = "";

  for (let i = 0; i < pos && i < TOTAL; i++) {
    const { ch, color, isNewline } = CHARS[i];
    if (isNewline) {
      if (currentText) currentLine.push({ text: currentText, color: currentColor });
      renderedLines.push({ nodes: currentLine });
      currentLine = []; currentText = ""; currentColor = "";
    } else {
      if (color !== currentColor && currentText) {
        currentLine.push({ text: currentText, color: currentColor });
        currentText = "";
      }
      currentColor = color;
      currentText += ch;
    }
  }
  if (currentText) currentLine.push({ text: currentText, color: currentColor });
  if (currentLine.length) renderedLines.push({ nodes: currentLine });

  const showCursor = phase === "typing";

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Glow behind window */}
      <div className="absolute -inset-4 bg-[#0071e3]/10 rounded-3xl blur-2xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="relative rounded-2xl overflow-hidden border border-[#30363d] bg-[#0d1117] shadow-2xl shadow-black/60"
      >
        {/* Title bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#161b22] border-b border-[#21262d]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex-1 flex items-center gap-2">
            <span className="text-xs text-[#8b949e] font-medium">two_sum.py</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#0071e3]/20 text-[#3d95f4] border border-[#0071e3]/30">Python</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-[#8b949e]">
            <div className={`w-1.5 h-1.5 rounded-full ${phase === "running" ? "bg-yellow-400 animate-pulse" : phase === "done" ? "bg-green-400" : "bg-[#30363d]"}`} />
            {phase === "running" ? "Running..." : phase === "done" ? "Accepted" : "Ready"}
          </div>
        </div>

        {/* Problem header */}
        <div className="px-4 py-2.5 border-b border-[#21262d] bg-[#0d1117]/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white">#1 · Two Sum</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-500/15 text-green-400 border border-green-500/20">Easy</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-md bg-[#0071e3] text-white font-semibold"
          >
            <Play className="w-2.5 h-2.5 fill-current" /> Run
          </motion.button>
        </div>

        {/* Code editor */}
        <div className="px-4 py-4 font-mono text-sm leading-6 min-h-[196px] relative">
          {/* Line numbers */}
          <div className="absolute left-0 top-4 bottom-4 w-8 flex flex-col items-end pr-2">
            {Array.from({ length: Math.max(renderedLines.length, 7) }, (_, i) => (
              <div key={i} className="text-[#30363d] text-xs leading-6 select-none">{i + 1}</div>
            ))}
          </div>

          <div className="ml-8">
            {renderedLines.map((line, li) => (
              <div key={li} className="h-6">
                {line.nodes.map((n, ni) => (
                  <span key={ni} style={{ color: n.color }}>{n.text}</span>
                ))}
                {/* Blinking cursor on last line */}
                {showCursor && li === renderedLines.length - 1 && (
                  <span className="inline-block w-0.5 h-4 bg-[#0071e3] ml-px animate-pulse align-middle" />
                )}
              </div>
            ))}
            {/* Fill empty lines */}
            {Array.from({ length: Math.max(0, 7 - renderedLines.length) }, (_, i) => (
              <div key={`empty-${i}`} className="h-6" />
            ))}
          </div>
        </div>

        {/* Test results */}
        <AnimatePresence>
          {phase !== "typing" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-[#21262d] overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1.5">
                <div className="text-[10px] text-[#8b949e] uppercase tracking-wider mb-2">Test Cases</div>
                {TEST_CASES.slice(0, testIdx).map((tc, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center justify-between text-[11px]"
                  >
                    <span className="text-[#8b949e] font-mono truncate max-w-[200px]">{tc.input}</span>
                    <span className={`font-mono font-semibold ${tc.pass ? "text-green-400" : "text-red-400"}`}>
                      → {tc.output} {tc.pass ? "✓" : "✗"}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Accepted banner */}
              <AnimatePresence>
                {phase === "done" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mx-4 mb-3 px-3 py-2.5 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-bold text-green-400">Accepted</span>
                      <span className="text-[10px] text-[#8b949e]">3/3 test cases passed</span>
                    </div>
                    <div className="flex gap-3 text-[10px] text-[#8b949e]">
                      <span>⚡ 52ms</span>
                      <span>💾 17.2MB</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating badges */}
      {[
        { label: "Python",     color: "from-blue-500 to-blue-600",   x: "-left-6",  y: "top-12",    delay: 0.8 },
        { label: "Java",       color: "from-orange-500 to-red-500",  x: "-right-4", y: "top-24",    delay: 1.0 },
        { label: "JavaScript", color: "from-yellow-400 to-yellow-500", x: "-left-4", y: "bottom-20", delay: 1.2 },
        { label: "C++",        color: "from-purple-500 to-purple-600", x: "-right-6", y: "bottom-12", delay: 1.4 },
      ].map((b) => (
        <motion.div
          key={b.label}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
          transition={{ delay: b.delay, duration: 0.4, y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: b.delay } }}
          className={`absolute ${b.x} ${b.y} px-2.5 py-1 rounded-lg bg-gradient-to-r ${b.color} text-white text-[10px] font-bold shadow-lg pointer-events-none`}
        >
          {b.label}
        </motion.div>
      ))}
    </div>
  );
}
