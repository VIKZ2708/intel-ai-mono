import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// Meta: known for arrays, trees, graphs, DP, linked list, sliding window, design
const META_IDS = [
  1, 2, 3, 4, 6, 7, 8, 10, 11, 13, 14, 16, 17, 18, 21, 24, 25, 29,
  31, 32, 33, 45, 49, 62, 69, 75, 78, 79, 86, 88, 89, 94, 95, 96,
];

// Apple: known for arrays, binary search, trees, DP, linked list, design
const APPLE_IDS = [
  1, 2, 3, 5, 6, 7, 11, 12, 13, 14, 15, 16, 18, 19, 20, 24, 27, 29,
  32, 33, 34, 47, 48, 49, 50, 55, 56, 60, 63, 64, 69, 76, 86, 89, 93,
];

async function main() {
  console.log("⏳ Creating Meta and Apple company playlists...");

  const companies = [
    {
      name: "Meta",
      slug: "meta",
      description: "Problems frequently asked in Meta (Facebook) technical interviews, covering arrays, trees, graphs, DP, and system design.",
      icon: "🔷",
      tag: "Company",
      ids: META_IDS,
    },
    {
      name: "Apple",
      slug: "apple",
      description: "Problems frequently asked in Apple technical interviews, focusing on arrays, binary search, trees, DP, and clean code.",
      icon: "🍎",
      tag: "Company",
      ids: APPLE_IDS,
    },
  ];

  for (const co of companies) {
    const playlist = await prisma.intelPlaylist.upsert({
      where: { slug: co.slug },
      update: { name: co.name, description: co.description, icon: co.icon, tag: co.tag },
      create: { name: co.name, slug: co.slug, description: co.description, icon: co.icon, tag: co.tag },
    });

    await prisma.intelPlaylistItem.deleteMany({ where: { playlistId: playlist.id } });

    const existing = await prisma.intelProblem.findMany({
      where: { id: { in: co.ids } },
      select: { id: true },
    });
    const existingIds = new Set(existing.map((p) => p.id));

    for (let i = 0; i < co.ids.length; i++) {
      const pid = co.ids[i];
      if (!existingIds.has(pid)) continue;
      await prisma.intelPlaylistItem.create({
        data: { playlistId: playlist.id, problemId: pid, order: i },
      });
    }
    console.log(`  ✓ ${co.name} playlist — ${existingIds.size} problems`);
  }

  console.log("\n✅ Done! Meta and Apple playlists created.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
