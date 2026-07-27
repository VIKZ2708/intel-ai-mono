export default function IDELoading() {
  return (
    <div className="h-screen flex flex-col bg-[#0d1117] overflow-hidden animate-pulse">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 h-12 bg-[#161b22] border-b border-[#21262d] flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-[#21262d] rounded-md" />
          <div className="h-4 w-20 bg-[#21262d] rounded" />
          <div className="h-4 w-px bg-[#21262d]" />
          <div className="h-4 w-8 bg-[#21262d] rounded" />
          <div className="h-5 w-32 bg-[#21262d] rounded" />
          <div className="h-4 w-8 bg-[#21262d] rounded" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-20 bg-[#21262d] rounded-lg" />
          <div className="h-8 w-24 bg-[#21262d] rounded-lg" />
          <div className="h-8 w-8 bg-[#21262d] rounded-lg" />
        </div>
      </div>

      {/* Main body */}
      <div className="flex flex-1 min-h-0">
        {/* Left panel */}
        <div className="w-2/5 flex flex-col border-r border-[#21262d]">
          {/* Tabs */}
          <div className="flex gap-1 px-3 py-2 border-b border-[#21262d] bg-[#161b22]">
            {[48, 36, 36, 36].map((w, i) => (
              <div key={i} className={`h-6 w-${w} bg-[#21262d] rounded`} style={{ width: `${w * 2}px` }} />
            ))}
          </div>
          {/* Content area */}
          <div className="flex-1 p-5 space-y-4">
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-[#21262d] rounded-full" />
              <div className="h-6 w-12 bg-[#21262d] rounded-full" />
            </div>
            <div className="h-7 w-3/4 bg-[#21262d] rounded-lg" />
            <div className="space-y-2">
              {[100, 90, 95, 70, 85, 80].map((w, i) => (
                <div key={i} className="h-3 bg-[#21262d] rounded" style={{ width: `${w}%` }} />
              ))}
            </div>
            <div className="h-4 w-24 bg-[#21262d] rounded mt-6" />
            <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-3 space-y-2">
              {[60, 80, 55].map((w, i) => (
                <div key={i} className="h-3 bg-[#21262d] rounded" style={{ width: `${w}%` }} />
              ))}
            </div>
            <div className="bg-[#161b22] border border-[#21262d] rounded-xl p-3 space-y-2">
              {[60, 80, 55].map((w, i) => (
                <div key={i} className="h-3 bg-[#21262d] rounded" style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="flex-1 flex flex-col">
          {/* Language selector */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-[#21262d] bg-[#161b22]">
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-6 w-24 bg-[#21262d] rounded-lg" />
              ))}
            </div>
            <div className="h-6 w-6 bg-[#21262d] rounded" />
          </div>
          {/* Editor area */}
          <div className="flex-1 bg-[#1e1e1e] relative">
            <div className="absolute inset-0 p-4 space-y-2">
              {[
                "w-1/4", "w-1/2", "w-1/3", "", "w-2/5", "w-1/3", "w-1/4",
                "", "w-3/5", "w-1/2", "w-2/5",
              ].map((w, i) =>
                w ? (
                  <div key={i} className={`h-3 ${w} bg-[#21262d]/60 rounded`} style={{ marginLeft: i > 3 ? "2rem" : 0 }} />
                ) : (
                  <div key={i} className="h-3" />
                )
              )}
            </div>
          </div>
          {/* Console */}
          <div className="h-36 border-t border-[#21262d] bg-[#161b22] p-3 space-y-2">
            <div className="h-4 w-24 bg-[#21262d] rounded" />
            <div className="h-3 w-1/2 bg-[#21262d] rounded" />
            <div className="h-3 w-1/3 bg-[#21262d] rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
