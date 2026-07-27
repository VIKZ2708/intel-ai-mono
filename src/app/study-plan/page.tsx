import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import StudyPlanClient from "./StudyPlanClient";

export default async function StudyPlanPage() {
  const session = await getServerSession(authOptions);
  const userId  = (session?.user as { id?: string })?.id;

  const [playlists, accepted] = await Promise.all([
    prisma.intelPlaylist.findMany({
      include: {
        _count: { select: { items: true } },
        items:  { select: { problemId: true } },
      },
      orderBy: { order: "asc" },
    }),
    userId
      ? prisma.intelSubmission.findMany({
          where:    { userId, status: "accepted" },
          select:   { problemId: true },
          distinct: ["problemId"],
        })
      : Promise.resolve([]),
  ]);

  const solvedSet = new Set(accepted.map((s) => s.problemId));

  const data = playlists.map((pl) => ({
    id:           pl.id,
    name:         pl.name,
    slug:         pl.slug,
    description:  pl.description,
    icon:         pl.icon,
    tag:          pl.tag ?? "Topic",
    order:        pl.order,
    totalCount:   pl._count.items,
    solvedCount:  pl.items.filter((it) => solvedSet.has(it.problemId)).length,
  }));

  return <StudyPlanClient playlists={data} isLoggedIn={!!userId} />;
}
