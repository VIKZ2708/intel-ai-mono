"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, CheckCircle2, Circle, ChevronDown, ChevronUp,
  Zap, SlidersHorizontal, BookOpen, LayoutDashboard,
  Trophy, Map, GraduationCap, ChevronRight, ChevronLeft, Flame,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface ProblemRow {
  id: number; title: string; slug: string;
  difficulty: string; category: string; acceptance: string;
}
interface Company { name: string; slug: string; icon: string; count: number; }
interface FeaturedPlaylist { name: string; slug: string; icon: string; description: string; count: number; }

// ── Constants ─────────────────────────────────────────────────────────────────
const DIFF_COLOR: Record<string, string> = {
  Easy: "text-green-400", Medium: "text-yellow-400", Hard: "text-red-400",
};
const DIFF_BG: Record<string, string> = {
  Easy:   "bg-green-400/10 border-green-400/20 text-green-400",
  Medium: "bg-yellow-400/10 border-yellow-400/20 text-yellow-400",
  Hard:   "bg-red-400/10 border-red-400/20 text-red-400",
};
const CAT_COLOR: Record<string, string> = {
  "Arrays": "#3d95f4", "Arrays & Hashing": "#3d95f4",
  "Stack": "#fb923c", "Linked List": "#c084fc",
  "Dynamic Programming": "#f472b6", "Greedy": "#22d3ee",
  "Binary Search": "#818cf8", "Sliding Window": "#2dd4bf",
  "Graphs": "#f87171", "Backtracking": "#fbbf24",
  "Trees": "#4ade80", "Heap": "#fb7185",
  "Bit Manipulation": "#a78bfa", "Intervals": "#38bdf8",
  "Two Pointers": "#a3e635", "Math": "#e879f9",
  "Design": "#94a3b8", "Trie": "#34d399",
};

// Card art themes keyed by index
const CARD_THEMES = [
  { border: "#0071e3", bg: "from-[#0a1628] to-[#0d1f3c]", accent: "#3d95f4", label_bg: "#0071e3" },
  { border: "#7c3aed", bg: "from-[#130d2a] to-[#1a0f38]", accent: "#c084fc", label_bg: "#7c3aed" },
  { border: "#059669", bg: "from-[#0a1f18] to-[#0d2a1e]", accent: "#34d399", label_bg: "#059669" },
  { border: "#d97706", bg: "from-[#1f150a] to-[#2a1b0d]", accent: "#fbbf24", label_bg: "#d97706" },
];

// SVG art for each card slot
function CardArt0() {
  // Binary tree nodes — blue
  return (
    <svg viewBox="0 0 280 120" className="w-full h-full" fill="none">
      <rect width="280" height="120" fill="url(#g0)" />
      <defs>
        <radialGradient id="g0" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#0a1f3c" />
          <stop offset="100%" stopColor="#060d1a" />
        </radialGradient>
      </defs>
      {/* grid lines */}
      {[0,1,2,3,4,5,6].map(i => (
        <line key={`h${i}`} x1="0" y1={i*20} x2="280" y2={i*20} stroke="#0071e3" strokeOpacity="0.06" />
      ))}
      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13].map(i => (
        <line key={`v${i}`} x1={i*22} y1="0" x2={i*22} y2="120" stroke="#0071e3" strokeOpacity="0.06" />
      ))}
      {/* tree edges */}
      <line x1="140" y1="25" x2="88" y2="65" stroke="#0071e3" strokeOpacity="0.5" strokeWidth="1.5" />
      <line x1="140" y1="25" x2="192" y2="65" stroke="#0071e3" strokeOpacity="0.5" strokeWidth="1.5" />
      <line x1="88" y1="65" x2="60" y2="100" stroke="#0071e3" strokeOpacity="0.3" strokeWidth="1.5" />
      <line x1="88" y1="65" x2="116" y2="100" stroke="#0071e3" strokeOpacity="0.3" strokeWidth="1.5" />
      <line x1="192" y1="65" x2="168" y2="100" stroke="#0071e3" strokeOpacity="0.3" strokeWidth="1.5" />
      <line x1="192" y1="65" x2="220" y2="100" stroke="#0071e3" strokeOpacity="0.3" strokeWidth="1.5" />
      {/* root */}
      <circle cx="140" cy="25" r="14" fill="#0071e3" fillOpacity="0.15" stroke="#0071e3" strokeWidth="1.5" />
      <circle cx="140" cy="25" r="8" fill="#0071e3" fillOpacity="0.6" />
      <text x="140" y="29" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">6</text>
      {/* level 2 */}
      {[[88,65,"3"],[192,65,"8"]].map(([cx,cy,t]) => (
        <g key={String(t)}>
          <circle cx={Number(cx)} cy={Number(cy)} r="12" fill="#0071e3" fillOpacity="0.12" stroke="#3d95f4" strokeWidth="1.2" />
          <circle cx={Number(cx)} cy={Number(cy)} r="7" fill="#3d95f4" fillOpacity="0.5" />
          <text x={Number(cx)} y={Number(cy)+3} textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">{String(t)}</text>
        </g>
      ))}
      {/* level 3 */}
      {[[60,100,"1"],[116,100,"4"],[168,100,"7"],[220,100,"9"]].map(([cx,cy,t]) => (
        <g key={String(t)}>
          <circle cx={Number(cx)} cy={Number(cy)} r="9" fill="#00c9ff" fillOpacity="0.08" stroke="#00c9ff" strokeWidth="1" />
          <text x={Number(cx)} y={Number(cy)+3} textAnchor="middle" fill="#3d95f4" fontSize="8">{String(t)}</text>
        </g>
      ))}
      {/* glow */}
      <ellipse cx="140" cy="60" rx="80" ry="40" fill="#0071e3" fillOpacity="0.04" />
    </svg>
  );
}

function CardArt1() {
  // Hash table — purple
  const cells = Array.from({length: 8}, (_,i) => i);
  const filled: Record<number, string> = {1:"0x3f", 3:"0xa1", 5:"0x7c", 6:"0x2b"};
  return (
    <svg viewBox="0 0 280 120" className="w-full h-full" fill="none">
      <rect width="280" height="120" fill="url(#g1)" />
      <defs>
        <radialGradient id="g1" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#160d30" />
          <stop offset="100%" stopColor="#0c0818" />
        </radialGradient>
      </defs>
      {/* Label */}
      <text x="14" y="20" fill="#7c3aed" fillOpacity="0.5" fontSize="9" fontFamily="monospace">HashMap&lt;K,V&gt;</text>
      {/* Hash table slots */}
      {cells.map(i => (
        <g key={i} transform={`translate(14, ${28 + i * 11})`}>
          <rect width="18" height="9" rx="2" fill="#7c3aed" fillOpacity="0.15" stroke="#7c3aed" strokeOpacity="0.2" strokeWidth="0.8" />
          <text x="9" y="7" textAnchor="middle" fill="#a78bfa" fontSize="7" fontFamily="monospace">{i}</text>
          {filled[i] && (
            <>
              <line x1="18" y1="4.5" x2="38" y2="4.5" stroke="#7c3aed" strokeOpacity="0.4" strokeWidth="0.8" markerEnd="url(#arr1)" />
              <rect x="38" width="38" height="9" rx="2" fill="#7c3aed" fillOpacity="0.2" stroke="#c084fc" strokeOpacity="0.4" strokeWidth="0.8" />
              <text x="57" y="7" textAnchor="middle" fill="#c084fc" fontSize="7" fontFamily="monospace">{filled[i]}</text>
            </>
          )}
        </g>
      ))}
      <defs>
        <marker id="arr1" markerWidth="4" markerHeight="4" refX="2" refY="2" orient="auto">
          <path d="M0,0 L0,4 L4,2 z" fill="#7c3aed" fillOpacity="0.5" />
        </marker>
      </defs>
      {/* key visualization right side */}
      <text x="120" y="20" fill="#7c3aed" fillOpacity="0.4" fontSize="9" fontFamily="monospace">hash(key) % 8</text>
      <text x="164" y="52" fill="#c084fc" fillOpacity="0.7" fontSize="28" fontFamily="monospace" fontWeight="bold">#</text>
      <ellipse cx="190" cy="70" rx="60" ry="35" fill="#7c3aed" fillOpacity="0.05" />
      <circle cx="200" cy="55" r="18" fill="none" stroke="#7c3aed" strokeOpacity="0.12" strokeWidth="12" />
    </svg>
  );
}

function CardArt2() {
  // Sorted bars — green DP/algorithms
  const bars = [18, 42, 28, 65, 35, 80, 52, 70, 45, 90, 58, 76];
  const maxH = 80;
  return (
    <svg viewBox="0 0 280 120" className="w-full h-full" fill="none">
      <rect width="280" height="120" fill="url(#g2)" />
      <defs>
        <radialGradient id="g2" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#0a1f18" />
          <stop offset="100%" stopColor="#060f0c" />
        </radialGradient>
      </defs>
      {/* horizontal baseline */}
      <line x1="20" y1="108" x2="260" y2="108" stroke="#059669" strokeOpacity="0.2" strokeWidth="0.8" />
      {/* bars */}
      {bars.map((h, i) => {
        const x = 22 + i * 20;
        const barH = (h / 100) * maxH;
        const isSorted = i <= 4;
        const isActive = i === 5;
        return (
          <g key={i}>
            <rect
              x={x} y={108 - barH} width="14" height={barH} rx="2"
              fill={isActive ? "#34d399" : isSorted ? "#059669" : "#059669"}
              fillOpacity={isActive ? 0.9 : isSorted ? 0.6 : 0.25}
              stroke={isActive ? "#34d399" : isSorted ? "#34d399" : "#059669"}
              strokeOpacity={isActive ? 0.8 : 0.3}
              strokeWidth="0.8"
            />
            {isActive && <text x={x+7} y={108-barH-4} textAnchor="middle" fill="#34d399" fontSize="7">↑</text>}
          </g>
        );
      })}
      {/* label */}
      <text x="14" y="15" fill="#34d399" fillOpacity="0.5" fontSize="9" fontFamily="monospace">quicksort( arr )</text>
      <rect x="14" y="4" width="2" height="8" rx="1" fill="#34d399" />
      {/* glow */}
      <ellipse cx="140" cy="100" rx="100" ry="20" fill="#059669" fillOpacity="0.06" />
    </svg>
  );
}

function CardArt3() {
  // Graph traversal — orange/amber BFS
  const nodes = [{x:140,y:30,l:"A"},{x:80,y:65,l:"B"},{x:200,y:65,l:"C"},{x:50,y:100,l:"D"},{x:110,y:100,l:"E"},{x:170,y:100,l:"F"},{x:230,y:100,l:"G"}];
  const edges = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6]];
  const visited = new Set([0,1,2]);
  const queued  = new Set([3,4,5]);
  return (
    <svg viewBox="0 0 280 120" className="w-full h-full" fill="none">
      <rect width="280" height="120" fill="url(#g3)" />
      <defs>
        <radialGradient id="g3" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#1f140a" />
          <stop offset="100%" stopColor="#0f0a05" />
        </radialGradient>
      </defs>
      {/* grid dots */}
      {Array.from({length:6},(_,r)=>Array.from({length:10},(_,c)=>(
        <circle key={`${r},${c}`} cx={14+c*28} cy={10+r*22} r="0.8" fill="#d97706" fillOpacity="0.08" />
      )))}
      {/* edges */}
      {edges.map(([a,b])=>(
        <line key={`${a}-${b}`}
          x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke={visited.has(a)&&visited.has(b)?"#d97706":"#d97706"}
          strokeOpacity={visited.has(a)&&visited.has(b)?0.5:0.15}
          strokeWidth={visited.has(a)&&visited.has(b)?1.5:1}
        />
      ))}
      {/* nodes */}
      {nodes.map((n,i)=>(
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={visited.has(i)?12:queued.has(i)?10:8}
            fill={visited.has(i)?"#d97706":queued.has(i)?"#d97706":"#d97706"}
            fillOpacity={visited.has(i)?0.3:queued.has(i)?0.12:0.05}
            stroke={visited.has(i)?"#fbbf24":queued.has(i)?"#d97706":"#92400e"}
            strokeWidth={visited.has(i)?1.5:1}
            strokeOpacity={visited.has(i)?0.8:0.4}
          />
          <text x={n.x} y={n.y+3} textAnchor="middle"
            fill={visited.has(i)?"#fbbf24":queued.has(i)?"#d97706":"#92400e"}
            fontSize={visited.has(i)?9:8} fontWeight="bold"
          >{n.l}</text>
        </g>
      ))}
      <text x="14" y="14" fill="#d97706" fillOpacity="0.5" fontSize="9" fontFamily="monospace">BFS Queue: [D,E,F,G]</text>
      <ellipse cx="140" cy="60" rx="90" ry="50" fill="#d97706" fillOpacity="0.03" />
    </svg>
  );
}

const CARD_ART_COMPONENTS = [CardArt0, CardArt1, CardArt2, CardArt3];

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS   = ["S","M","T","W","T","F","S"];

// ── Mini Calendar ─────────────────────────────────────────────────────────────
function MiniCalendar({ month, year, today, activeDays }: {
  month: number; year: number; today: number; activeDays: number[];
}) {
  const activeSet = new Set(activeDays);
  const firstDay  = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to full weeks
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-white">{MONTHS[month]} {year}</span>
        <div className="flex items-center gap-1 text-[10px] text-[#8b949e]">
          <Flame className="w-3 h-3 text-orange-400" />
          {activeDays.length} active
        </div>
      </div>
      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {DAYS.map((d, i) => (
          <div key={i} className="text-[10px] text-[#6e7681] text-center font-medium py-0.5">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => (
          <div key={i} className="aspect-square flex items-center justify-center">
            {day === null ? null : (
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-medium transition-all ${
                day === today
                  ? "bg-[#0071e3] text-white font-bold"
                  : activeSet.has(day)
                    ? "bg-green-400/20 text-green-400 border border-green-400/30"
                    : "text-[#8b949e] hover:bg-[#21262d] cursor-default"
              }`}>
                {day}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function PracticeClient({
  problems, companies, solvedIds, calendarDates,
  currentMonth, currentYear, todayDate, featuredPlaylists,
}: {
  problems: ProblemRow[];
  companies: Company[];
  solvedIds: number[];
  calendarDates: number[];
  currentMonth: number;
  currentYear: number;
  todayDate: number;
  featuredPlaylists: FeaturedPlaylist[];
}) {
  const solvedSet    = useMemo(() => new Set(solvedIds), [solvedIds]);
  const sliderRef    = useRef<HTMLDivElement>(null);

  const scrollSlider = (dir: "left" | "right") => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: dir === "left" ? -440 : 440, behavior: "smooth" });
  };

  const [search, setSearch]           = useState("");
  const [diffFilter, setDiffFilter]   = useState("All");
  const [catFilter, setCatFilter]     = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortKey, setSortKey]         = useState<"id" | "acceptance" | "difficulty">("id");
  const [sortAsc, setSortAsc]         = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage]               = useState(1);
  const PAGE_SIZE                     = 50;

  const catCounts = useMemo(() => {
    const m: Record<string, number> = {};
    for (const p of problems) m[p.category] = (m[p.category] ?? 0) + 1;
    return m;
  }, [problems]);

  const categories = useMemo(() =>
    [...new Set(problems.map((p) => p.category))].sort(), [problems]);

  const diffCounts = useMemo(() => {
    const m: Record<string, number> = { Easy: 0, Medium: 0, Hard: 0 };
    for (const p of problems) m[p.difficulty] = (m[p.difficulty] ?? 0) + 1;
    return m;
  }, [problems]);

  const diffOrder: Record<string, number> = { Easy: 0, Medium: 1, Hard: 2 };

  const filtered = useMemo(() => {
    let rows = problems.filter((p) => {
      const q = search.toLowerCase();
      const matchSearch = !q || p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      const matchDiff   = diffFilter === "All" || p.difficulty === diffFilter;
      const matchCat    = catFilter  === "All" || p.category   === catFilter;
      const matchStatus = statusFilter === "All" ? true
        : statusFilter === "Solved" ? solvedSet.has(p.id)
        : !solvedSet.has(p.id);
      return matchSearch && matchDiff && matchCat && matchStatus;
    });

    rows = [...rows].sort((a, b) => {
      let cmp = 0;
      if (sortKey === "id")         cmp = a.id - b.id;
      if (sortKey === "acceptance") cmp = parseFloat(a.acceptance) - parseFloat(b.acceptance);
      if (sortKey === "difficulty") cmp = diffOrder[a.difficulty] - diffOrder[b.difficulty];
      return sortAsc ? cmp : -cmp;
    });
    return rows;
  }, [problems, search, diffFilter, catFilter, statusFilter, sortKey, sortAsc, solvedSet]);

  const totalPages  = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated   = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const solvedCount = solvedIds.length;

  function toggleSort(key: typeof sortKey) {
    if (sortKey === key) setSortAsc((a) => !a);
    else { setSortKey(key); setSortAsc(true); }
  }

  function SortIcon({ col }: { col: typeof sortKey }) {
    if (sortKey !== col) return <ChevronDown className="w-3 h-3 opacity-30 ml-0.5 inline" />;
    return sortAsc
      ? <ChevronUp className="w-3 h-3 ml-0.5 inline text-[#0071e3]" />
      : <ChevronDown className="w-3 h-3 ml-0.5 inline text-[#0071e3]" />;
  }

  const clearFilters = () => {
    setSearch(""); setDiffFilter("All"); setCatFilter("All"); setStatusFilter("All"); setPage(1);
  };
  const hasActiveFilters = search || diffFilter !== "All" || catFilter !== "All" || statusFilter !== "All";

  // Reset to page 1 whenever filters/sort change
  const filterKey = `${search}-${diffFilter}-${catFilter}-${statusFilter}-${sortKey}-${sortAsc}`;
  useEffect(() => { setPage(1); }, [filterKey]);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white">

      {/* ── Top bar ── */}
      <div className="border-b border-[#21262d] bg-[#0d1117] sticky top-0 z-30 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-6 h-6 bg-gradient-to-br from-[#0071e3] to-[#00c9ff] rounded-md flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" fill="white" />
            </div>
            <span className="font-bold text-sm hidden sm:block">
              <span className="text-white">Intel</span><span className="gradient-text"> AI</span>
            </span>
          </Link>

          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8b949e]" />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#161b22] border border-[#21262d] rounded-lg text-sm text-white placeholder-[#8b949e] focus:outline-none focus:border-[#0071e3] transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* Solved pill */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#161b22] border border-[#21262d] rounded-lg">
              <div className="relative w-6 h-6">
                <svg className="w-6 h-6 -rotate-90" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" fill="none" stroke="#21262d" strokeWidth="2.5" />
                  <circle cx="12" cy="12" r="9" fill="none" stroke="#0071e3" strokeWidth="2.5"
                    strokeDasharray={`${2 * Math.PI * 9}`}
                    strokeDashoffset={`${2 * Math.PI * 9 * (1 - solvedCount / Math.max(problems.length, 1))}`}
                    strokeLinecap="round" className="transition-all duration-700"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[7px] font-bold">{solvedCount}</span>
              </div>
              <span className="text-xs text-[#8b949e]">
                <span className="text-white font-semibold">{solvedCount}</span>/{problems.length} Solved
              </span>
            </div>

            <button
              onClick={() => setShowFilters((f) => !f)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm border transition-all ${showFilters ? "bg-[#0071e3]/10 border-[#0071e3]/30 text-[#3d95f4]" : "bg-[#161b22] border-[#21262d] text-[#8b949e] hover:text-white"}`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:block text-xs">Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">

        {/* ── Study Plan Slider ── */}
        {(() => {
          const cards: { name: string; slug: string; desc: string; count: number; tag?: string }[] = [
            ...featuredPlaylists.map(pl => ({
              name: pl.name, slug: pl.slug,
              desc: pl.description || "Curated problem set",
              count: pl.count, tag: pl.icon,
            })),
            ...companies.map(co => ({
              name: `${co.name} Interview Prep`, slug: co.slug,
              desc: `Top ${co.name} interview questions`,
              count: co.count, tag: co.icon,
            })),
          ];
          return (
            <div className="py-5 relative">
              {/* Section header */}
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-sm font-semibold text-white">Study Plans</h2>
                  <p className="text-[11px] text-[#6e7681] mt-0.5">{cards.length} curated paths to master DSA</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => scrollSlider("left")}
                    className="w-7 h-7 rounded-full border border-[#30363d] bg-[#161b22] flex items-center justify-center text-[#8b949e] hover:text-white hover:border-[#0071e3]/50 hover:bg-[#0071e3]/10 transition-all"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => scrollSlider("right")}
                    className="w-7 h-7 rounded-full border border-[#30363d] bg-[#161b22] flex items-center justify-center text-[#8b949e] hover:text-white hover:border-[#0071e3]/50 hover:bg-[#0071e3]/10 transition-all"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Slider track */}
              <div ref={sliderRef}
                className="flex gap-3 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1"
                style={{ scrollSnapType: "x mandatory" }}
              >
                {cards.map((card, i) => {
                  const theme = CARD_THEMES[i % 4];
                  const ArtComponent = CARD_ART_COMPONENTS[i % 4];
                  return (
                    <Link key={card.slug} href={`/study-plan/${card.slug}`}
                      className="group rounded-xl border overflow-hidden flex flex-col shrink-0 hover:scale-[1.015] hover:-translate-y-0.5 transition-all duration-200"
                      style={{
                        width: "196px",
                        scrollSnapAlign: "start",
                        borderColor: `${theme.border}30`,
                        background: `linear-gradient(160deg, #0d1117 0%, #0d1117 100%)`,
                      }}
                    >
                      {/* Illustrated image area */}
                      <div className="relative overflow-hidden" style={{ height: "108px", borderBottom: `1px solid ${theme.border}20` }}>
                        <ArtComponent />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{ background: `radial-gradient(ellipse at 50% 50%, ${theme.accent}0a 0%, transparent 70%)` }}
                        />
                        {card.tag && (
                          <div className="absolute top-2 right-2 text-sm leading-none drop-shadow">{card.tag}</div>
                        )}
                      </div>

                      {/* Card content */}
                      <div className="p-3 flex flex-col gap-1 flex-1" style={{ background: `linear-gradient(180deg, ${theme.border}08 0%, transparent 100%)` }}>
                        <p className="text-[11px] font-semibold text-white leading-snug line-clamp-2">{card.name}</p>
                        <p className="text-[10px] text-[#6e7681] line-clamp-1 mt-0.5">{card.desc}</p>
                        <div className="flex items-center justify-between mt-auto pt-2">
                          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded"
                            style={{ background: `${theme.border}18`, color: theme.accent }}>
                            {card.count} problems
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                            style={{ color: theme.accent, opacity: 0.5 }} />
                        </div>
                      </div>
                    </Link>
                  );
                })}

                {/* Trailing spacer so last card doesn't hug the edge */}
                <div className="shrink-0 w-1" />
              </div>

              {/* Fade edges */}
              <div className="absolute left-0 top-[52px] bottom-[6px] w-6 pointer-events-none"
                style={{ background: "linear-gradient(90deg, #0d1117 0%, transparent 100%)" }} />
              <div className="absolute right-0 top-[52px] bottom-[6px] w-10 pointer-events-none"
                style={{ background: "linear-gradient(270deg, #0d1117 0%, transparent 100%)" }} />
            </div>
          );
        })()}

        {/* ── 3-column layout ── */}
        <div className="flex gap-6 pb-10">

          {/* ── Left sidebar ── */}
          <aside className="hidden lg:flex flex-col gap-1 w-44 shrink-0">
            <p className="text-[10px] text-[#6e7681] uppercase tracking-wider font-medium px-3 mb-1">Navigate</p>
            {[
              { href: "/dashboard",  icon: LayoutDashboard, label: "Dashboard" },
              { href: "/practice",   icon: BookOpen,        label: "Problems",  active: true },
              { href: "/study-plan", icon: Map,             label: "Study Plan" },
              { href: "/leaderboard",icon: Trophy,          label: "Leaderboard" },
              { href: "/courses",    icon: GraduationCap,   label: "Courses" },
            ].map(({ href, icon: Icon, label, active }) => (
              <Link key={href} href={href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
                  active
                    ? "bg-[#0071e3]/10 text-[#3d95f4] border border-[#0071e3]/20"
                    : "text-[#8b949e] hover:bg-[#161b22] hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}

            {/* Difficulty breakdown */}
            <div className="mt-4 bg-[#161b22] border border-[#21262d] rounded-xl p-3">
              <p className="text-[10px] text-[#6e7681] uppercase tracking-wider mb-3">Progress</p>
              {(["Easy", "Medium", "Hard"] as const).map((d) => {
                const total  = diffCounts[d] ?? 0;
                const solved = solvedIds.filter(id => problems.find(p => p.id === id)?.difficulty === d).length;
                return (
                  <div key={d} className="mb-2.5 last:mb-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[11px] font-medium ${DIFF_COLOR[d]}`}>{d}</span>
                      <span className="text-[10px] text-[#6e7681]">{solved}/{total}</span>
                    </div>
                    <div className="h-1.5 bg-[#21262d] rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${d === "Easy" ? "bg-green-400" : d === "Medium" ? "bg-yellow-400" : "bg-red-400"}`}
                        style={{ width: total ? `${(solved / total) * 100}%` : "0%" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0">

            {/* Topic pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
              <button onClick={() => setCatFilter("All")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all shrink-0 ${
                  catFilter === "All"
                    ? "bg-[#0071e3]/15 border-[#0071e3]/40 text-[#3d95f4]"
                    : "bg-[#161b22] border-[#21262d] text-[#8b949e] hover:text-white hover:border-[#30363d]"
                }`}
              >
                All Topics <span className="opacity-60">{problems.length}</span>
              </button>
              {categories.map((cat) => (
                <button key={cat} onClick={() => setCatFilter(catFilter === cat ? "All" : cat)}
                  style={catFilter === cat ? { borderColor: `${CAT_COLOR[cat] ?? "#8b949e"}50`, backgroundColor: `${CAT_COLOR[cat] ?? "#8b949e"}18`, color: CAT_COLOR[cat] ?? "#8b949e" } : {}}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-all shrink-0 ${
                    catFilter === cat ? "" : "bg-[#161b22] border-[#21262d] text-[#8b949e] hover:text-white hover:border-[#30363d]"
                  }`}
                >
                  {cat} <span className="opacity-60">{catCounts[cat] ?? 0}</span>
                </button>
              ))}
            </div>

            {/* Filters bar */}
            <AnimatePresence>
              {showFilters && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                  className="overflow-hidden mb-3"
                >
                  <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4 flex flex-wrap gap-6">
                    <div>
                      <p className="text-[10px] text-[#6e7681] uppercase tracking-wider mb-2">Status</p>
                      <div className="flex gap-1.5">
                        {["All", "Todo", "Solved"].map((s) => (
                          <button key={s} onClick={() => setStatusFilter(s)}
                            className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                              statusFilter === s ? "bg-[#0071e3]/10 border-[#0071e3]/30 text-[#3d95f4]" : "border-[#21262d] text-[#8b949e] hover:text-white"
                            }`}
                          >
                            {s === "Solved" ? `✓ Solved (${solvedCount})` : s === "Todo" ? `○ Todo (${problems.length - solvedCount})` : s}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] text-[#6e7681] uppercase tracking-wider mb-2">Difficulty</p>
                      <div className="flex gap-1.5">
                        {["All", "Easy", "Medium", "Hard"].map((d) => (
                          <button key={d} onClick={() => setDiffFilter(d)}
                            className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                              diffFilter === d ? (d === "All" ? "bg-[#0071e3]/10 border-[#0071e3]/30 text-[#3d95f4]" : DIFF_BG[d]) : "border-[#21262d] text-[#8b949e] hover:text-white"
                            }`}
                          >
                            {d === "All" ? "All" : `${d} (${diffCounts[d] ?? 0})`}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Result info row */}
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-[#6e7681]">
                <span className="text-white font-medium">{filtered.length}</span> problems
                {filtered.length > 0 && (
                  <span className="ml-1 opacity-60">
                    ({(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)})
                  </span>
                )}
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="ml-2 text-[#0071e3] hover:underline">Clear</button>
                )}
              </p>
              <div className="flex gap-1.5">
                {(["Easy", "Medium", "Hard"] as const).map((d) => (
                  <button key={d} onClick={() => setDiffFilter(diffFilter === d ? "All" : d)}
                    className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] border transition-all ${
                      diffFilter === d ? DIFF_BG[d] : "border-[#21262d] text-[#6e7681] hover:border-[#30363d]"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${d === "Easy" ? "bg-green-400" : d === "Medium" ? "bg-yellow-400" : "bg-red-400"}`} />
                    {d} {diffCounts[d]}
                  </button>
                ))}
              </div>
            </div>

            {/* Problem table */}
            <div className="bg-[#161b22] border border-[#21262d] rounded-xl overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-[28px_44px_1fr_90px_72px] items-center px-4 py-2.5 border-b border-[#21262d] text-[10px] text-[#6e7681] uppercase tracking-wider font-medium">
                <div />
                <button onClick={() => toggleSort("id")} className="text-left hover:text-white flex items-center gap-0.5">
                  # <SortIcon col="id" />
                </button>
                <div>Title</div>
                <button onClick={() => toggleSort("acceptance")} className="flex items-center gap-0.5 hover:text-white">
                  Accept. <SortIcon col="acceptance" />
                </button>
                <button onClick={() => toggleSort("difficulty")} className="flex items-center gap-0.5 hover:text-white">
                  Diff. <SortIcon col="difficulty" />
                </button>
              </div>

              {/* Body */}
              <AnimatePresence mode="wait">
                <motion.div key={`${filterKey}-${page}`}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}
                >
                  {filtered.length === 0 ? (
                    <div className="py-14 text-center text-[#6e7681]">
                      <Search className="w-7 h-7 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">No problems match your filters.</p>
                      <button onClick={clearFilters} className="mt-1.5 text-[#0071e3] text-xs hover:underline">Clear all</button>
                    </div>
                  ) : (
                    paginated.map((p, i) => {
                      const solved = solvedSet.has(p.id);
                      return (
                        <Link key={p.id} href={`/practice/${p.id}`}
                          className={`grid grid-cols-[28px_44px_1fr_90px_72px] items-center px-4 py-3 border-b border-[#21262d] last:border-0 transition-colors group ${i % 2 === 0 ? "" : "bg-[#0d1117]/30"} hover:bg-[#1c2333]`}
                        >
                          <div className="flex items-center justify-center">
                            {solved
                              ? <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                              : <Circle className="w-3.5 h-3.5 text-[#30363d]" />
                            }
                          </div>
                          <div className="text-xs text-[#6e7681] font-mono">{p.id}.</div>
                          <div className="pr-2 min-w-0">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="text-sm font-medium text-[#e6edf3] group-hover:text-[#3d95f4] transition-colors truncate">
                                {p.title}
                              </span>
                              <span className="hidden sm:inline-flex shrink-0 items-center px-1.5 py-0.5 rounded text-[10px] font-medium border"
                                style={{
                                  color: CAT_COLOR[p.category] ?? "#6e7681",
                                  borderColor: (CAT_COLOR[p.category] ?? "#6e7681") + "40",
                                  backgroundColor: (CAT_COLOR[p.category] ?? "#6e7681") + "12",
                                }}>
                                {p.category}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="flex-1 h-1 bg-[#21262d] rounded-full overflow-hidden max-w-[36px]">
                              <div className="h-full bg-[#0071e3]/50 rounded-full" style={{ width: p.acceptance }} />
                            </div>
                            <span className="text-[11px] text-[#6e7681]">{p.acceptance}</span>
                          </div>
                          <div>
                            <span className={`text-xs font-semibold ${DIFF_COLOR[p.difficulty] ?? "text-[#8b949e]"}`}>
                              {p.difficulty === "Medium" ? "Med." : p.difficulty}
                            </span>
                          </div>
                        </Link>
                      );
                    })
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1 mt-4">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-[#6e7681] border border-[#21262d] hover:border-[#30363d] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft className="w-3 h-3" /> Prev
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((n) => n === 1 || n === totalPages || Math.abs(n - page) <= 2)
                    .reduce<(number | "…")[]>((acc, n, idx, arr) => {
                      if (idx > 0 && n - (arr[idx - 1] as number) > 1) acc.push("…");
                      acc.push(n);
                      return acc;
                    }, [])
                    .map((n, i) =>
                      n === "…" ? (
                        <span key={`ellipsis-${i}`} className="px-2 py-1.5 text-xs text-[#6e7681]">…</span>
                      ) : (
                        <button
                          key={n}
                          onClick={() => setPage(n as number)}
                          className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                            page === n
                              ? "bg-[#0071e3] text-white border border-[#0071e3]"
                              : "text-[#6e7681] border border-[#21262d] hover:border-[#30363d] hover:text-white"
                          }`}
                        >
                          {n}
                        </button>
                      )
                    )}
                </div>

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs text-[#6e7681] border border-[#21262d] hover:border-[#30363d] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Next <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* ── Right sidebar ── */}
          <aside className="hidden xl:flex flex-col gap-4 w-64 shrink-0">

            {/* Mini calendar */}
            <MiniCalendar
              month={currentMonth}
              year={currentYear}
              today={todayDate}
              activeDays={calendarDates}
            />

            {/* Trending companies */}
            <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4">
              <p className="text-sm font-semibold text-white mb-3">Trending Companies</p>

              {/* Search bar (decorative style) */}
              <div className="relative mb-3">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-[#6e7681]" />
                <input
                  readOnly
                  placeholder="Search for a company..."
                  className="w-full pl-7 pr-3 py-1.5 bg-[#0d1117] border border-[#21262d] rounded-lg text-xs text-[#6e7681] cursor-default focus:outline-none"
                />
              </div>

              {/* Company tags */}
              <div className="flex flex-wrap gap-2">
                {companies.map((co) => (
                  <Link key={co.slug} href={`/study-plan/${co.slug}`}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-[#0d1117] border border-[#21262d] rounded-lg text-xs text-[#e6edf3] hover:border-[#0071e3]/50 hover:text-[#3d95f4] transition-all group"
                  >
                    <span>{co.icon}</span>
                    <span className="font-medium">{co.name}</span>
                    <span className="text-[10px] text-[#6e7681] group-hover:text-[#3d95f4] bg-[#21262d] px-1.5 py-0.5 rounded-full">
                      {co.count}
                    </span>
                  </Link>
                ))}

                {/* Coming soon companies */}
                {[
                  { name: "Netflix" },
                  { name: "Flipkart" },
                  { name: "Uber" },
                  { name: "LinkedIn" },
                ].map((co) => (
                  <div key={co.name}
                    className="flex items-center gap-1.5 px-2.5 py-1 bg-[#0d1117] border border-[#21262d] rounded-lg text-xs text-[#6e7681] opacity-50 cursor-not-allowed"
                  >
                    <span className="font-medium">{co.name}</span>
                    <span className="text-[10px] bg-[#21262d] px-1.5 py-0.5 rounded-full">soon</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-4">
              <p className="text-sm font-semibold text-white mb-3">Your Stats</p>
              <div className="space-y-3">
                {(["Easy", "Medium", "Hard"] as const).map((d) => {
                  const total  = diffCounts[d] ?? 0;
                  const solved = solvedIds.filter(id => problems.find(p => p.id === id)?.difficulty === d).length;
                  return (
                    <div key={d}>
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-semibold ${DIFF_COLOR[d]}`}>{d}</span>
                        <span className="text-xs text-[#6e7681]">
                          <span className="text-white font-medium">{solved}</span>/{total}
                        </span>
                      </div>
                      <div className="h-1.5 bg-[#0d1117] rounded-full overflow-hidden border border-[#21262d]">
                        <motion.div
                          className={`h-full rounded-full ${d === "Easy" ? "bg-green-400" : d === "Medium" ? "bg-yellow-400" : "bg-red-400"}`}
                          initial={{ width: 0 }}
                          animate={{ width: total ? `${(solved / total) * 100}%` : "0%" }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  );
                })}
                <div className="pt-1 border-t border-[#21262d] flex items-center justify-between">
                  <span className="text-xs text-[#8b949e]">Total Solved</span>
                  <span className="text-sm font-bold text-white">{solvedCount}<span className="text-xs text-[#6e7681] font-normal">/{problems.length}</span></span>
                </div>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
