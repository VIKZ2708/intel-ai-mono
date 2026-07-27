import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const category   = searchParams.get("category");
  const difficulty = searchParams.get("difficulty");
  const search     = searchParams.get("search");
  const playlist   = searchParams.get("playlist");   // playlist slug
  const page       = Math.max(1, Number(searchParams.get("page") ?? "1"));
  const limit      = Math.min(100, Number(searchParams.get("limit") ?? "75"));

  try {
    if (playlist) {
      // Fetch problems belonging to a specific playlist (ordered by playlist item order)
      const pl = await prisma.intelPlaylist.findUnique({
        where: { slug: playlist },
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
      });

      if (!pl) return NextResponse.json({ error: "Playlist not found" }, { status: 404 });

      return NextResponse.json({
        playlist: {
          id: pl.id, name: pl.name, slug: pl.slug,
          description: pl.description, icon: pl.icon, tag: pl.tag,
        },
        problems: pl.items.map((item) => item.problem),
        total: pl.items.length,
      });
    }

    // General problem list with filters
    const where: {
      category?: string;
      difficulty?: string;
      OR?: { title?: { contains: string; mode: "insensitive" }; category?: { contains: string; mode: "insensitive" } }[];
    } = {};
    if (category)   where.category   = category;
    if (difficulty) where.difficulty = difficulty;
    if (search) {
      where.OR = [
        { title:    { contains: search, mode: "insensitive" } },
        { category: { contains: search, mode: "insensitive" } },
      ];
    }

    const [problems, total] = await Promise.all([
      prisma.intelProblem.findMany({
        where,
        select: {
          id: true, title: true, slug: true,
          difficulty: true, category: true, acceptance: true,
        },
        orderBy: { id: "asc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.intelProblem.count({ where }),
    ]);

    return NextResponse.json({ problems, total, page, limit });
  } catch (e) {
    console.error("[/api/problems]", e);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
