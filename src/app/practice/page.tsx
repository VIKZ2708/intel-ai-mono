import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import PracticeClient from "./PracticeClient";

export default async function PracticePage() {
  const session = await getServerSession(authOptions);

  const now   = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end   = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

  const daysSinceEpoch = Math.floor(Date.now() / 86_400_000);

  const [problems, companies, solvedData, calendarDates, featuredPlaylists, bookmarkData] = await Promise.all([
    prisma.intelProblem.findMany({
      select: { id: true, title: true, slug: true, difficulty: true, category: true, acceptance: true },
      orderBy: { id: "asc" },
    }),

    // Company playlists with problem counts
    prisma.intelPlaylist.findMany({
      where: { tag: "Company" },
      select: {
        name: true, slug: true, icon: true,
        _count: { select: { items: true } },
      },
    }),

    // Solved problem IDs for this user
    session?.user?.email
      ? prisma.intelSubmission.findMany({
          where: { user: { email: session.user.email }, status: "accepted" },
          select: { problemId: true },
          distinct: ["problemId"],
        }).then((rows) => rows.map((r) => r.problemId))
      : Promise.resolve([] as number[]),

    // Submission dates this month for the calendar
    session?.user?.email
      ? prisma.intelSubmission.findMany({
          where: {
            user: { email: session.user.email },
            createdAt: { gte: start, lte: end },
          },
          select: { createdAt: true },
        }).then((rows) => [...new Set(rows.map((r) => r.createdAt.getDate()))])
      : Promise.resolve([] as number[]),

    // Featured non-company playlists for the top cards
    prisma.intelPlaylist.findMany({
      where: { tag: { not: "Company" } },
      select: {
        name: true, slug: true, icon: true, description: true,
        _count: { select: { items: true } },
      },
      take: 4,
    }),

    // Bookmarked problem IDs for this user
    session?.user?.email
      ? prisma.intelBookmark.findMany({
          where: { user: { email: session.user.email } },
          select: { problemId: true },
        }).then((rows) => rows.map((r) => r.problemId))
      : Promise.resolve([] as number[]),
  ]);

  const dailyProblemId = problems.length > 0 ? problems[daysSinceEpoch % problems.length].id : -1;

  return (
    <PracticeClient
      problems={problems}
      companies={companies.map((c) => ({ name: c.name, slug: c.slug, icon: c.icon, count: c._count.items }))}
      solvedIds={solvedData}
      calendarDates={calendarDates}
      currentMonth={now.getMonth()}
      currentYear={now.getFullYear()}
      todayDate={now.getDate()}
      featuredPlaylists={featuredPlaylists.map((p) => ({ name: p.name, slug: p.slug, icon: p.icon, description: p.description ?? "", count: p._count.items }))}
      dailyProblemId={dailyProblemId}
      bookmarkedIds={bookmarkData}
    />
  );
}
