import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PlaylistClient from "./PlaylistClient";

export default async function PlaylistPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session  = await getServerSession(authOptions);
  const userId   = (session?.user as { id?: string })?.id;

  const [playlist, accepted] = await Promise.all([
    prisma.intelPlaylist.findUnique({
      where:   { slug },
      include: {
        items: {
          orderBy: { order: "asc" },
          include: {
            problem: {
              select: {
                id: true, title: true, slug: true,
                difficulty: true, category: true, acceptance: true,
              },
            },
          },
        },
      },
    }),
    userId
      ? prisma.intelSubmission.findMany({
          where:    { userId, status: "accepted" },
          select:   { problemId: true },
          distinct: ["problemId"],
        })
      : Promise.resolve([]),
  ]);

  if (!playlist) notFound();

  const solvedIds = accepted.map((s) => s.problemId);

  const problems = playlist.items.map((item) => ({
    order:      item.order,
    id:         item.problem.id,
    title:      item.problem.title,
    slug:       item.problem.slug,
    difficulty: item.problem.difficulty,
    category:   item.problem.category,
    acceptance: item.problem.acceptance,
    solved:     solvedIds.includes(item.problem.id),
  }));

  return (
    <PlaylistClient
      playlist={{
        id:          playlist.id,
        name:        playlist.name,
        slug:        playlist.slug,
        description: playlist.description,
        icon:        playlist.icon,
        tag:         playlist.tag ?? "Topic",
      }}
      problems={problems}
      isLoggedIn={!!userId}
    />
  );
}
