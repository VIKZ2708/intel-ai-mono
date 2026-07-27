"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function NavigationProgress() {
  const pathname   = usePathname();
  const prevPath   = useRef(pathname);
  const [pct, setPct]         = useState(0);
  const [visible, setVisible] = useState(false);
  const [done, setDone]       = useState(false);
  const ticker = useRef<ReturnType<typeof setInterval> | null>(null);

  function start() {
    setDone(false);
    setVisible(true);
    setPct(8);
    if (ticker.current) clearInterval(ticker.current);
    ticker.current = setInterval(() => {
      setPct((p) => {
        if (p >= 82) { clearInterval(ticker.current!); return 82; }
        // Decelerate as it approaches 82
        return p + Math.max(0.5, (82 - p) * 0.06);
      });
    }, 120);
  }

  function finish() {
    if (ticker.current) clearInterval(ticker.current);
    setPct(100);
    setDone(true);
    setTimeout(() => { setVisible(false); setPct(0); setDone(false); }, 400);
  }

  // Detect link clicks to start the bar immediately (before route changes)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("mailto") || href === "#" || href.startsWith("#")) return;
      if (anchor.getAttribute("target") === "_blank") return;
      start();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Finish when the route actually changes
  useEffect(() => {
    if (pathname !== prevPath.current) {
      prevPath.current = pathname;
      finish();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
      <div
        className="h-[3px] transition-all ease-out bg-gradient-to-r from-[#0071e3] via-[#3d95f4] to-[#00c9ff]"
        style={{
          width: `${pct}%`,
          transitionDuration: done ? "200ms" : "120ms",
          boxShadow: "0 0 10px rgba(0,113,227,0.8), 0 0 20px rgba(0,201,255,0.4)",
          opacity: done ? 0 : 1,
        }}
      />
    </div>
  );
}
