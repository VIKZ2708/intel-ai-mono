export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-[#0d1117] animate-pulse">
      {/* Nav */}
      <div className="border-b border-[#21262d] bg-[#161b22]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="h-7 w-24 bg-[#21262d] rounded-lg" />
          <div className="h-8 w-8 bg-[#21262d] rounded-full" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        {/* Profile header */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-2xl p-6 flex items-center gap-5">
          <div className="w-16 h-16 bg-[#21262d] rounded-full flex-shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-5 w-40 bg-[#21262d] rounded" />
            <div className="h-3 w-52 bg-[#21262d] rounded" />
            <div className="h-3 w-28 bg-[#21262d] rounded" />
          </div>
          <div className="w-24 h-24 bg-[#21262d] rounded-full flex-shrink-0" />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-[#161b22] border border-[#21262d] rounded-xl p-4 space-y-2">
              <div className="h-4 w-4 bg-[#21262d] rounded" />
              <div className="h-7 w-12 bg-[#21262d] rounded" />
              <div className="h-3 w-20 bg-[#21262d] rounded" />
            </div>
          ))}
        </div>

        {/* Progress breakdown */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-2xl p-5 space-y-4">
          <div className="h-5 w-36 bg-[#21262d] rounded" />
          {["Easy", "Medium", "Hard"].map((d) => (
            <div key={d} className="space-y-1">
              <div className="flex justify-between">
                <div className="h-3 w-12 bg-[#21262d] rounded" />
                <div className="h-3 w-8 bg-[#21262d] rounded" />
              </div>
              <div className="h-2 bg-[#21262d] rounded-full" />
            </div>
          ))}
        </div>

        {/* Submission history */}
        <div className="bg-[#161b22] border border-[#21262d] rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-[#21262d]">
            <div className="h-5 w-40 bg-[#21262d] rounded" />
          </div>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-5 py-3.5 border-b border-[#21262d] last:border-0">
              <div className="h-4 w-4 bg-[#21262d] rounded" />
              <div className="h-4 w-32 bg-[#21262d] rounded flex-1" />
              <div className="h-5 w-14 bg-[#21262d] rounded-full" />
              <div className="h-4 w-20 bg-[#21262d] rounded" />
              <div className="h-4 w-16 bg-[#21262d] rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
