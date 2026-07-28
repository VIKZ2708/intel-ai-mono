"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Lightbulb, ChevronDown, ChevronUp } from "lucide-react";
import { Problem } from "@/lib/problems";

interface Message { id: number; role: "user" | "assistant"; text: string; }

function getIDEResponse(input: string, problem: Problem, code: string, hintIdx: number, onHint: () => void): string {
  const q = input.toLowerCase();

  // Hint requests — check specific variants BEFORE the generic "hint" check
  if (q.includes("hint") || q.includes("help") || q.includes("stuck")) {
    onHint();
    const idx = Math.min(hintIdx, problem.hints.length - 1);
    const hint = problem.hints[idx];
    const hasMore = hintIdx + 1 < problem.hints.length;
    return `Here's hint ${idx + 1} for **${problem.title}**:\n\n${hint}${hasMore ? "\n\nWant another hint? Just ask!" : "\n\nThat's all the hints — give it a try!"}`;
  }

  if (q.includes("approach") || q.includes("how to solve") || q.includes("algorithm")) {
    const approaches: Record<string, string> = {
      Arrays: "For array problems, think about sorting, two pointers, or hash maps to reduce time complexity.",
      Stack: "Stack problems follow LIFO order. Think about what needs to be 'remembered' and 'matched' later.",
      "Dynamic Programming": "DP problems have optimal substructure. Define your state, write the recurrence relation, then implement top-down (memoization) or bottom-up.",
      Greedy: "Greedy algorithms make the locally optimal choice at each step. Think: what's the best decision I can make right now?",
      "Binary Search": "Binary search works on sorted data. Define your search space and shrink it by half each iteration.",
      "Sliding Window": "Use two pointers to maintain a window. Expand right, shrink left when a condition is violated.",
      Graphs: "Graph problems: think BFS for shortest path, DFS for connectivity, and mark visited nodes to avoid cycles.",
      Backtracking: "Backtracking explores all possibilities by building candidates and abandoning them when they fail constraints.",
    };
    return approaches[problem.category] ?? "Break the problem into smaller subproblems and think about what data structure fits best.";
  }
  if (q.includes("time complexity") || q.includes("big o") || q.includes("complexity")) {
    return `For **${problem.title}**, think about:\n- A brute force solution is usually O(n²) or worse.\n- An optimal solution uses the right data structure (hash map, stack, etc.) to bring it to O(n) or O(n log n).\n\nWhat complexity is your current approach?`;
  }
  if (q.includes("space complexity") || q.includes("memory")) {
    return `Space complexity depends on your extra data structures. An O(1) space solution would use only pointers/variables. An O(n) solution might use a hash map or stack. For **${problem.title}**, try to think if you can solve it in O(1) extra space.`;
  }
  if (q.includes("what") && (q.includes("problem") || q.includes("asking"))) {
    return `**${problem.title}** asks you to:\n\n${problem.description.split('\n')[0]}\n\nThe key constraint is: ${problem.constraints[0]}`;
  }
  if (q.includes("example") || q.includes("walkthrough") || q.includes("trace")) {
    const ex = problem.examples[0];
    return `Let's walk through Example 1:\n\n**Input:** ${ex.input}\n**Expected Output:** ${ex.output}\n${ex.explanation ? `\n**Why:** ${ex.explanation}` : ""}\n\nCan you trace through your code with this example manually?`;
  }
  if (q.includes("review") || q.includes("check my code") || q.includes("feedback")) {
    if (code.includes("Write your solution here") || code.trim().length < 80) {
      return "It looks like you haven't started coding yet! Start by thinking about the approach. What data structure would help here? Type 'hint' for a nudge in the right direction.";
    }
    return `I can see you've written some code. A few things to check:\n1. Does your code handle edge cases? (empty input, single element, all same values)\n2. Have you traced through the examples manually?\n3. What is the time complexity of your solution?\n\nType 'run' in the console to test against the examples!`;
  }
  if (q.includes("brute force") || q.includes("naive")) {
    return `A brute force approach for **${problem.title}** would work but might be slow. The naive solution is usually O(n²). Think about how to optimize it — often a hash map, sorting, or a two-pointer technique can bring it to O(n) or O(n log n).`;
  }
  if (q.includes("optimiz") || q.includes("faster") || q.includes("efficient")) {
    return `To optimize **${problem.title}**:\n\n${problem.hints[problem.hints.length - 1]}\n\nThe key insight is usually about avoiding repeated work. Can you precompute or cache something?`;
  }
  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
    return `Hey! 👋 I'm your AI teaching assistant for this problem. I can help you with:\n- Hints (type "hint")\n- Approach and algorithm\n- Complexity analysis\n- Walkthrough of examples\n- Code review\n\nWhat do you need help with?`;
  }
  return `Good question! For **${problem.title}** (${problem.category}), I'd suggest thinking about the hints:\n\n"${problem.hints[0]}"\n\nIf you're stuck on something specific, describe what you've tried and I'll guide you further!`;
}

interface Props {
  problem: Problem;
  code: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function AITeachingAssistant({ problem, code, isOpen, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      text: `Hi! 👋 I'm your AI teaching assistant for **${problem.title}**. Ask me for hints, approach guidance, complexity analysis, or code review. I'm here to help you learn — not just give you the answer!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [hintsExpanded, setHintsExpanded] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg) return;
    const userMsg: Message = { id: Date.now(), role: "user", text: msg };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    const currentHintIndex = hintIndex;
    setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: getIDEResponse(msg, problem, code, currentHintIndex, () => setHintIndex(i => Math.min(i + 1, problem.hints.length - 1))),
      };
      setMessages((prev) => [...prev, reply]);
    }, 500);
  }

  if (!isOpen) return null;

  return (
    <div className="flex flex-col h-full bg-[#0d1117] border-l border-[#21262d]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#21262d] bg-[#161b22]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-gradient-to-br from-[#0071e3] to-[#00c9ff] rounded-lg flex items-center justify-center">
            <Bot className="w-3.5 h-3.5 text-white" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">AI Teaching Assistant</div>
            <div className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Online
            </div>
          </div>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-md text-[#8b949e] hover:text-white hover:bg-white/5">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Quick hints toggle */}
      <button
        onClick={() => setHintsExpanded(!hintsExpanded)}
        className="flex items-center justify-between px-4 py-2 bg-[#0071e3]/5 border-b border-[#21262d] text-xs text-[#0071e3] hover:bg-[#0071e3]/10 transition-colors"
      >
        <span className="flex items-center gap-1.5"><Lightbulb className="w-3.5 h-3.5" /> Quick Hints ({problem.hints.length})</span>
        {hintsExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>
      {hintsExpanded && (
        <div className="px-4 py-3 bg-[#0071e3]/5 border-b border-[#21262d] space-y-2">
          {problem.hints.map((h, i) => (
            <div key={i} className="text-xs text-[#8b949e] flex gap-2">
              <span className="text-[#0071e3] font-semibold flex-shrink-0">{i + 1}.</span>
              <span>{h}</span>
            </div>
          ))}
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`flex gap-2 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${m.role === "assistant" ? "bg-[#0071e3]/20" : "bg-[#21262d]"}`}>
              {m.role === "assistant" ? <Bot className="w-3 h-3 text-[#0071e3]" /> : <span className="text-xs text-[#8b949e]">U</span>}
            </div>
            <div className={`max-w-[80%] px-3 py-2 rounded-xl text-xs leading-relaxed whitespace-pre-line ${
              m.role === "assistant" ? "bg-[#1c2333] text-[#e6edf3]" : "bg-[#0071e3] text-white"
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick actions */}
      <div className="px-3 pb-2 flex flex-wrap gap-1.5">
        {["Give me a hint", "Explain the approach", "Review my code", "Time complexity?"].map((q) => (
          <button
            key={q}
            onClick={() => send(q)}
            className="text-xs px-2 py-1 bg-[#1c2333] border border-[#21262d] text-[#8b949e] hover:text-[#0071e3] hover:border-[#0071e3]/30 rounded-full transition-all"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="px-3 pb-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask for help..."
            className="flex-1 px-3 py-2 bg-[#161b22] border border-[#21262d] rounded-lg text-xs text-white placeholder-[#8b949e] focus:outline-none focus:border-[#0071e3]"
          />
          <button
            onClick={() => send()}
            disabled={!input.trim()}
            className="w-8 h-8 bg-[#0071e3] hover:bg-[#0058b3] disabled:opacity-40 text-white rounded-lg flex items-center justify-center flex-shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
