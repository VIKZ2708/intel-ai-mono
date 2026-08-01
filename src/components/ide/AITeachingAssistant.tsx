"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, Lightbulb, ChevronDown, ChevronUp } from "lucide-react";
import { Problem } from "@/lib/problems";

type Mode = "beginner" | "standard" | "expert";

interface Message { id: number; role: "user" | "assistant"; text: string; }

const MODES: { id: Mode; label: string; emoji: string; desc: string }[] = [
  { id: "beginner", label: "Beginner", emoji: "🐣", desc: "Simple explanations, more encouragement" },
  { id: "standard", label: "Standard", emoji: "⚡", desc: "Balanced guidance" },
  { id: "expert",   label: "Expert",   emoji: "🔥", desc: "Terse, focus on optimality" },
];

function getIDEResponse(input: string, problem: Problem, code: string, hintIdx: number, onHint: () => void, mode: Mode): string {
  const q = input.toLowerCase();

  const wrap = (standard: string, beginner: string, expert: string) =>
    mode === "beginner" ? beginner : mode === "expert" ? expert : standard;

  if (q.includes("hint") || q.includes("help") || q.includes("stuck") || q.includes("nudge")) {
    if (hintIdx >= problem.hints.length) {
      return wrap(
        `You've already seen all ${problem.hints.length} hints for **${problem.title}**! Give the problem a shot — you have everything you need.`,
        `You've unlocked all hints for **${problem.title}**! 🎉 Don't worry — you've got this. Try writing even a brute-force solution first, it's okay!`,
        `All ${problem.hints.length} hints exhausted for **${problem.title}**. Implement now.`,
      );
    }
    onHint();
    const hint = problem.hints[hintIdx];
    const hasMore = hintIdx + 1 < problem.hints.length;
    return wrap(
      `**Hint ${hintIdx + 1}/${problem.hints.length}** — **${problem.title}**:\n\n${hint}${hasMore ? "\n\nWant another hint? Just ask!" : "\n\nThat's all the hints — give it a try!"}`,
      `**Gentle Nudge ${hintIdx + 1}/${problem.hints.length}** 💡\n\n${hint}\n\n${hasMore ? "No rush! Want another small clue? Just say 'hint' again 😊" : "That's the last hint! You're so close — give it a go!"}`,
      `[${hintIdx + 1}/${problem.hints.length}] ${hint}`,
    );
  }

  if (q.includes("approach") || q.includes("how to solve") || q.includes("algorithm")) {
    const approaches: Record<string, string> = {
      Arrays: "Think about sorting, two pointers, or hash maps to reduce time complexity.",
      Stack: "Stack → LIFO. What needs to be remembered and matched later?",
      "Dynamic Programming": "Define your state, write the recurrence, implement top-down or bottom-up.",
      Greedy: "Make the locally optimal choice at each step.",
      "Binary Search": "Works on sorted data. Define your search space and halve it each step.",
      "Sliding Window": "Two pointers, expand right, shrink left when condition breaks.",
      Graphs: "BFS for shortest path, DFS for connectivity. Mark visited.",
      Backtracking: "Build candidates, abandon them when they violate constraints.",
    };
    const core = approaches[problem.category] ?? "Break into smaller subproblems, pick the right data structure.";
    return wrap(
      `For **${problem.title}** (${problem.category}):\n\n${core}\n\nHint: start with a brute force, then optimize.`,
      `Great question! 😊 For **${problem.title}**, the category is **${problem.category}**.\n\n${core}\n\nTip: Don't stress about the optimal solution right away. A working brute-force first is always fine!`,
      `${problem.category}: ${core}`,
    );
  }

  if (q.includes("time complexity") || q.includes("big o") || q.includes("complexity")) {
    return wrap(
      `For **${problem.title}**:\n- Brute force: usually O(n²)\n- Optimal: aim for O(n) or O(n log n) with the right data structure\n\nWhat's your current approach's complexity?`,
      `Time complexity can sound scary at first — but it's just about how your code scales! 📈\n\nFor **${problem.title}**:\n- A slow but simple approach is usually O(n²) — runs the loop twice\n- A smarter approach with a hash map or sort often brings it to O(n) or O(n log n)\n\nWhat does your solution look like so far?`,
      `Brute: O(n²). Target: O(n) or O(n log n). What's your current bound?`,
    );
  }

  if (q.includes("space complexity") || q.includes("memory")) {
    return wrap(
      `Space depends on extra structures. O(1) = only variables. O(n) = hash map / stack. For **${problem.title}**, can you do it in O(1) extra space?`,
      `Space complexity is just "how much extra memory do you use?" 🧠\n\n- O(1): just a few variables — super efficient!\n- O(n): a list, map, or stack that grows with input\n\nFor **${problem.title}**, try to see if you can get away with just a couple of variables. But O(n) is totally fine for now!`,
      `O(1) preferred. O(n) acceptable. Can **${problem.title}** be solved in-place?`,
    );
  }

  if (q.includes("what") && (q.includes("problem") || q.includes("asking"))) {
    return wrap(
      `**${problem.title}** asks you to:\n\n${problem.description.split('\n')[0]}\n\nKey constraint: ${problem.constraints[0]}`,
      `No worries, let me break it down! 😊\n\n**${problem.title}** is asking you to:\n\n${problem.description.split('\n')[0]}\n\nThe tricky part is working within: _${problem.constraints[0]}_\n\nDoes that make more sense now?`,
      `**${problem.title}**: ${problem.description.split('\n')[0]} Constraint: ${problem.constraints[0]}`,
    );
  }

  if (q.includes("example") || q.includes("walkthrough") || q.includes("trace")) {
    const ex = problem.examples[0];
    return wrap(
      `Let's trace Example 1:\n\n**Input:** ${ex.input}\n**Expected:** ${ex.output}\n${ex.explanation ? `\n**Why:** ${ex.explanation}` : ""}\n\nTrace through your code manually with this input.`,
      `Let's go through an example together step by step! 🐾\n\n**Input:** ${ex.input}\n**What we expect:** ${ex.output}\n${ex.explanation ? `\n**Here's why:** ${ex.explanation}` : ""}\n\nNow try to trace your code line by line with this input. What value do you get at each step?`,
      `Ex1: in=${ex.input} → out=${ex.output}. ${ex.explanation ?? ""} Trace manually.`,
    );
  }

  if (q.includes("review") || q.includes("check my code") || q.includes("feedback") || q.includes("wrong")) {
    if (code.includes("Write your solution here") || code.trim().length < 80) {
      return wrap(
        "You haven't started yet! Think about the approach first. Type 'hint' for a nudge.",
        "It looks like you haven't written any code yet — that's totally okay! 😊 Start by typing out even a rough idea. What's the first thing you think should happen? Type 'hint' if you want a little push!",
        "No code detected. Write a draft first.",
      );
    }
    return wrap(
      `I see code! Check:\n1. Edge cases? (empty input, single element, duplicates)\n2. Traced through Example 1 manually?\n3. What's your time complexity?\n\nRun your code against the test cases first.`,
      `Nice work starting! 🎉 Here are a few friendly checks:\n1. **Edge cases** — what happens if the input is empty, or has just one item?\n2. **Example trace** — have you run through Example 1 on paper?\n3. **Correctness first** — don't worry about speed yet, just make it work!\n\nHit "Run" to see what the test cases say!`,
      `Code present. Verify: edge cases covered? Complexity optimal? Run tests.`,
    );
  }

  if (q.includes("brute force") || q.includes("naive")) {
    return wrap(
      `A brute force for **${problem.title}** is usually O(n²). It works but is slow. Think: hash map, sort, or two pointers to get to O(n).`,
      `Brute force is a great starting point — no shame in it! 💪\n\nFor **${problem.title}**, the slow-but-works approach usually runs the loops twice (O(n²)).\n\nOnce you have that working, we can look at making it faster together!`,
      `Brute O(n²). Optimize via hash map or sort to O(n).`,
    );
  }

  if (q.includes("optimiz") || q.includes("faster") || q.includes("efficient")) {
    return wrap(
      `To optimize **${problem.title}**:\n\n${problem.hints[problem.hints.length - 1]}\n\nKey: avoid repeated work. Can you precompute or cache something?`,
      `Love that you're thinking about efficiency! 🚀\n\nThe key insight for **${problem.title}** is:\n\n_${problem.hints[problem.hints.length - 1]}_\n\nA common trick: if you're looping over the same data twice, ask yourself — "can I store something the first time through to avoid the second loop?"`,
      `Optimize **${problem.title}**: ${problem.hints[problem.hints.length - 1]}`,
    );
  }

  if (q.includes("hello") || q.includes("hi") || q.includes("hey")) {
    return wrap(
      `Hey! 👋 I'm your AI teaching assistant. Ask me for:\n- Hints\n- Approach / algorithm\n- Complexity analysis\n- Code review\n- Example walkthrough`,
      `Hey! 👋😊 So glad you're here! I'm your AI tutor for this problem.\n\nI'm here to help you *learn*, not just copy-paste. Here's what I can do:\n- 💡 **Hints** — gentle nudges when you're stuck\n- 🗺️ **Approach** — how to think about the problem\n- 🔍 **Code review** — check if you're on the right track\n- 📊 **Complexity** — time and space analysis\n\nWhat do you need? No question is too basic! 😊`,
      `Ready. Ask for hint / approach / complexity / review.`,
    );
  }

  return wrap(
    `For **${problem.title}** (${problem.category}): "${problem.hints[0]}"\n\nDescribe what you've tried and I'll guide you further.`,
    `Don't give up! 💪 Here's a starting clue for **${problem.title}**:\n\n_"${problem.hints[0]}"_\n\nTell me what you've tried so far — even a rough idea helps! There are no wrong answers when you're learning 😊`,
    `**${problem.title}**: ${problem.hints[0]}`,
  );
}

interface Props {
  problem: Problem;
  code: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function AITeachingAssistant({ problem, code, isOpen, onClose }: Props) {
  const [mode, setMode]         = useState<Mode>("standard");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      role: "assistant",
      text: `Hi! 👋 I'm your AI teaching assistant for **${problem.title}**. Ask me for hints, approach guidance, complexity analysis, or code review. I'm here to help you *learn* — not just give you the answer!`,
    },
  ]);
  const [input, setInput]             = useState("");
  const [hintsExpanded, setHintsExpanded] = useState(false);
  const [hintIndex, setHintIndex]     = useState(0);
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
    const currentMode = mode;
    setTimeout(() => {
      const reply: Message = {
        id: Date.now() + 1,
        role: "assistant",
        text: getIDEResponse(msg, problem, code, currentHintIndex, () => setHintIndex(i => Math.min(i + 1, problem.hints.length)), currentMode),
      };
      setMessages((prev) => [...prev, reply]);
    }, 400);
  }

  if (!isOpen) return null;

  const quickActions: Record<Mode, string[]> = {
    beginner: ["I'm stuck, help!", "Can you explain the problem?", "Show me an example", "What should I try first?"],
    standard: ["Give me a hint", "Explain the approach", "Review my code", "Time complexity?"],
    expert:   ["Optimal approach?", "Complexity bounds", "Edge cases", "Optimize my code"],
  };

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

      {/* Mode selector */}
      <div className="px-3 py-2 border-b border-[#21262d] bg-[#0d1117]">
        <div className="flex gap-1">
          {MODES.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              title={m.desc}
              className={`flex-1 flex items-center justify-center gap-1 text-[10px] py-1.5 rounded-lg font-medium transition-all ${
                mode === m.id
                  ? "bg-[#0071e3]/15 text-[#0071e3] border border-[#0071e3]/30"
                  : "text-[#8b949e] hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <span>{m.emoji}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>
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
        {quickActions[mode].map((q) => (
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
            placeholder={mode === "beginner" ? "Ask anything, no question is too basic!" : mode === "expert" ? "Ask about complexity, edge cases..." : "Ask for help..."}
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
