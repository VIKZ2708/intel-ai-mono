"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface DayData { date: string; count: number; }

interface Props {
  activityCalendar: DayData[];
  totalActiveDays:  number;
  currentStreak:    number;
  maxStreak:        number;
}

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

function cellColor(count: number): string {
  if (count === 0) return "#21262d";
  if (count === 1) return "#0d3b66";
  if (count <= 3)  return "#0058b3";
  return "#0071e3";
}

function toLocalDate(isoStr: string): Date {
  const [y, m, d] = isoStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function toDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2,"0")}-${String(date.getDate()).padStart(2,"0")}`;
}

export default function ActivityCalendar({ activityCalendar, totalActiveDays, currentStreak, maxStreak }: Props) {
  const [tooltip, setTooltip] = useState<{ date: string; count: number; x: number; y: number } | null>(null);

  const { weeks, monthLabels, totalSubmissions } = useMemo(() => {
    const countMap: Record<string, number> = {};
    let total = 0;
    for (const d of activityCalendar) {
      countMap[d.date] = d.count;
      total += d.count;
    }

    const today    = new Date();
    today.setHours(0, 0, 0, 0);
    const startDay = new Date(today);
    startDay.setDate(today.getDate() - 364); // 365 days total including today
    // rewind to start of week (Sunday)
    startDay.setDate(startDay.getDate() - startDay.getDay());

    const weeksArr: { date: Date; key: string; count: number }[][] = [];
    const cursor = new Date(startDay);

    const labels: { month: string; col: number }[] = [];
    let lastMonth = -1;

    while (cursor <= today || weeksArr.length < 53) {
      const week: { date: Date; key: string; count: number }[] = [];
      for (let d = 0; d < 7; d++) {
        const c = new Date(cursor);
        const key = toDateKey(c);
        week.push({ date: c, key, count: countMap[key] ?? 0 });
        cursor.setDate(cursor.getDate() + 1);
      }
      if (week[0].date.getMonth() !== lastMonth) {
        lastMonth = week[0].date.getMonth();
        labels.push({ month: MONTHS[lastMonth], col: weeksArr.length });
      }
      weeksArr.push(week);
      if (cursor > today && weeksArr.length >= 52) break;
    }

    return { weeks: weeksArr, monthLabels: labels, totalSubmissions: total };
  }, [activityCalendar]);

  return (
    <div className="bg-[#161b22] border border-[#21262d] rounded-2xl p-5">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="text-sm text-[#8b949e]">
          <span className="text-white font-semibold">{totalSubmissions}</span> submissions in the past one year
        </div>
        <div className="flex items-center gap-4 text-xs text-[#8b949e]">
          <span>Total active days: <span className="text-white font-semibold">{totalActiveDays}</span></span>
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            Max streak: <span className="text-white font-semibold ml-1">{maxStreak}</span>
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-orange-500" />
            Current: <span className={`font-semibold ml-1 ${currentStreak > 0 ? "text-orange-400" : "text-white"}`}>{currentStreak}</span>
          </span>
        </div>
      </div>

      {/* Calendar grid */}
      <div className="relative overflow-x-auto">
        {/* Month labels */}
        <div className="flex mb-1 ml-8" style={{ gap: "2px" }}>
          {weeks.map((week, wi) => {
            const label = monthLabels.find(l => l.col === wi);
            return (
              <div key={wi} className="flex-shrink-0" style={{ width: 11 }}>
                {label ? <span className="text-[10px] text-[#8b949e] whitespace-nowrap">{label.month}</span> : null}
              </div>
            );
          })}
        </div>

        {/* Day labels + grid */}
        <div className="flex">
          {/* Day-of-week labels */}
          <div className="flex flex-col mr-1.5" style={{ gap: "2px" }}>
            {DAYS.map((d, i) => (
              <div key={d} className="text-[10px] text-[#8b949e] leading-none" style={{ height: 11, lineHeight: "11px" }}>
                {i % 2 === 1 ? d.slice(0, 3) : ""}
              </div>
            ))}
          </div>

          {/* Weeks grid */}
          <div className="flex" style={{ gap: "2px" }}>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col" style={{ gap: "2px" }}>
                {week.map((day) => {
                  const isFuture = day.date > new Date();
                  return (
                    <motion.div
                      key={day.key}
                      className="rounded-[2px] cursor-pointer flex-shrink-0 relative"
                      style={{
                        width: 11, height: 11,
                        backgroundColor: isFuture ? "transparent" : cellColor(day.count),
                        opacity: isFuture ? 0 : 1,
                      }}
                      whileHover={{ scale: 1.4 }}
                      onMouseEnter={(e) => {
                        if (!isFuture) {
                          setTooltip({
                            date:  day.date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
                            count: day.count,
                            x:     (e.target as HTMLElement).getBoundingClientRect().left,
                            y:     (e.target as HTMLElement).getBoundingClientRect().top,
                          });
                        }
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 px-2.5 py-1.5 bg-[#1c2333] border border-[#21262d] rounded-lg text-xs text-white pointer-events-none shadow-xl"
          style={{ left: tooltip.x - 40, top: tooltip.y - 44 }}
        >
          <span className="font-semibold">{tooltip.count} submission{tooltip.count !== 1 ? "s" : ""}</span>
          <span className="text-[#8b949e] ml-1">on {tooltip.date}</span>
        </div>
      )}

      {/* Legend */}
      <div className="flex items-center justify-end gap-1.5 mt-3">
        <span className="text-[10px] text-[#8b949e]">Less</span>
        {[0, 1, 2, 4].map((n) => (
          <div key={n} className="rounded-[2px]" style={{ width: 11, height: 11, backgroundColor: cellColor(n) }} />
        ))}
        <span className="text-[10px] text-[#8b949e]">More</span>
      </div>
    </div>
  );
}
