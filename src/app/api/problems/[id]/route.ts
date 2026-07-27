import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const problemId = parseInt(id, 10);

  if (isNaN(problemId)) {
    return NextResponse.json({ error: "Invalid problem id" }, { status: 400 });
  }

  try {
    const problem = await prisma.intelProblem.findUnique({
      where: { id: problemId },
      include: {
        solutions: {
          select: {
            id: true, language: true, approach: true,
            code: true, explanation: true,
            timeComplex: true, spaceComplex: true,
          },
        },
        playlistItems: {
          include: {
            playlist: {
              select: { id: true, name: true, slug: true, icon: true },
            },
          },
        },
      },
    });

    if (!problem) {
      return NextResponse.json({ error: "Problem not found" }, { status: 404 });
    }

    // Prev / next problem IDs (by id, not necessarily contiguous)
    const [prev, next] = await Promise.all([
      prisma.intelProblem.findFirst({
        where:   { id: { lt: problemId } },
        orderBy: { id: "desc" },
        select:  { id: true, title: true, slug: true },
      }),
      prisma.intelProblem.findFirst({
        where:   { id: { gt: problemId } },
        orderBy: { id: "asc" },
        select:  { id: true, title: true, slug: true },
      }),
    ]);

    return NextResponse.json({
      ...problem,
      playlists: problem.playlistItems.map((item) => item.playlist),
      prev,
      next,
    });
  } catch (e) {
    console.error("[/api/problems/[id]]", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
