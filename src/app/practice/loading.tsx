export default function PracticeLoading() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white animate-pulse">
      {/* Header */}
      <div className="border-b border-[#21262d] bg-[#161b22]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="h-7 w-24 bg-[#21262d] rounded-lg" />
          <div className="h-5 w-28 bg-[#21262d] rounded-md" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Hero */}
        <div className="text-center mb-10 space-y-3">
          <div className="h-9 w-64 bg-[#21262d] rounded-xl mx-auto" />
          <div className="h-4 w-96 bg-[#21262d] rounded-lg mx-auto" />
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[#161b22] border border-[#21262d] rounded-xl p-4 flex flex-col items-center gap-2">
              <div className="h-5 w-5 bg-[#21262d] rounded" />
              <div className="h-6 w-12 bg-[#21262d] rounded" />
              <div className="h-3 w-20 bg-[#21262d] rounded" />
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 h-10 bg-[#161b22] border border-[#21262d] rounded-lg" />
          <div className="h-10 w-16 bg-[#161b22] border border-[#21262d] rounded-lg" />
          <div className="h-10 w-20 bg-[#161b22] border border-[#21262d] rounded-lg" />
          <div className="h-10 w-20 bg-[#161b22] border border-[#21262d] rounded-lg" />
        </div>

        {/* Table skeleton */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-2xl overflow-hidden">
          <div className="border-b border-[#21262d] px-5 py-3 flex gap-8">
            {["w-6", "w-32", "w-24", "w-16", "w-16"].map((w, i) => (
              <div key={i} className={`h-3 ${w} bg-[#21262d] rounded`} />
            ))}
          </div>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-5 py-4 border-b border-[#21262d] last:border-0">
              <div className="h-4 w-6 bg-[#21262d] rounded" />
              <div
                className="h-4 bg-[#21262d] rounded"
                style={{ width: `${100 + (i % 5) * 40}px` }}
              />
              <div className="h-4 w-20 bg-[#21262d] rounded hidden sm:block" />
              <div className="h-5 w-14 bg-[#21262d] rounded-full" />
              <div className="h-4 w-10 bg-[#21262d] rounded hidden md:block" />
              <div className="h-4 w-12 bg-[#21262d] rounded ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
