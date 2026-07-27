import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as { id: string }).id;

  const [user, submissions, totalProblems] = await Promise.all([
    prisma.intelUser.findUnique({
      where: { id: userId },
      select: { id: true, name: true, email: true, image: true, createdAt: true },
    }),
    prisma.intelSubmission.findMany({
      where:   { userId },
      orderBy: { createdAt: "desc" },
    }),
    prisma.intelProblem.count(),
  ]);

  // Unique accepted problem IDs
  const acceptedSet = new Set<number>();
  for (const s of submissions) {
    if (s.status === "accepted") acceptedSet.add(s.problemId);
  }

  // Difficulty breakdown of solved problems — fetch from DB
  const breakdown = { Easy: 0, Medium: 0, Hard: 0 };
  if (acceptedSet.size > 0) {
    const solved = await prisma.intelProblem.findMany({
      where:  { id: { in: [...acceptedSet] } },
      select: { id: true, difficulty: true },
    });
    for (const p of solved) {
      breakdown[p.difficulty as keyof typeof breakdown]++;
    }
  }

  // Language usage across accepted submissions
  const langMap: Record<string, number> = {};
  for (const s of submissions) {
    if (s.status === "accepted") {
      langMap[s.language] = (langMap[s.language] ?? 0) + 1;
    }
  }

  // Recent 10 submissions enriched with problem title from DB
  const recentIds = [...new Set(submissions.slice(0, 10).map((s) => s.problemId))];
  const problemMeta = await prisma.intelProblem.findMany({
    where:  { id: { in: recentIds } },
    select: { id: true, title: true, difficulty: true },
  });
  const metaMap = Object.fromEntries(problemMeta.map((p) => [p.id, p]));

  const recent = submissions.slice(0, 10).map((s) => ({
    ...s,
    problemTitle: metaMap[s.problemId]?.title ?? `Problem ${s.problemId}`,
    difficulty:   metaMap[s.problemId]?.difficulty ?? "Medium",
  }));

  return NextResponse.json({
    user,
    totalSolved:      acceptedSet.size,
    totalProblems,
    breakdown,
    languages:        langMap,
    submissions:      recent,
    totalSubmissions: submissions.length,
    acceptanceRate:   submissions.length > 0
      ? Math.round((acceptedSet.size / new Set(submissions.map(s => s.problemId)).size) * 100) || 0
      : 0,
  }, { headers: { "Cache-Control": "no-store" } });
}
