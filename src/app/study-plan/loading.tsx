export default function StudyPlanLoading() {
  return (
    <div className="min-h-screen bg-[#0d1117] animate-pulse">
      {/* Header */}
      <div className="border-b border-[#21262d] bg-[#161b22]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="h-7 w-24 bg-[#21262d] rounded-lg" />
          <div className="h-5 w-32 bg-[#21262d] rounded" />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-12 space-y-4">
          <div className="h-10 w-72 bg-[#21262d] rounded-xl mx-auto" />
          <div className="h-4 w-80 bg-[#21262d] rounded-lg mx-auto" />
        </div>

        {/* Featured 2-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {[1, 2].map((i) => (
            <div key={i} className="bg-[#161b22] border border-[#21262d] rounded-2xl p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="h-10 w-10 bg-[#21262d] rounded-xl" />
                <div className="h-6 w-20 bg-[#21262d] rounded-full" />
              </div>
              <div className="space-y-2">
                <div className="h-6 w-48 bg-[#21262d] rounded-lg" />
                <div className="h-4 w-full bg-[#21262d] rounded" />
                <div className="h-4 w-3/4 bg-[#21262d] rounded" />
              </div>
              <div className="h-2 bg-[#21262d] rounded-full" />
              <div className="flex justify-between">
                <div className="h-4 w-20 bg-[#21262d] rounded" />
                <div className="h-4 w-16 bg-[#21262d] rounded" />
              </div>
            </div>
          ))}
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#161b22] border border-[#21262d] rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-[#21262d] rounded-lg" />
                <div className="h-5 w-32 bg-[#21262d] rounded" />
              </div>
              <div className="h-3 w-full bg-[#21262d] rounded" />
              <div className="h-3 w-4/5 bg-[#21262d] rounded" />
              <div className="h-1.5 bg-[#21262d] rounded-full" />
              <div className="flex justify-between">
                <div className="h-3 w-16 bg-[#21262d] rounded" />
                <div className="h-3 w-12 bg-[#21262d] rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
