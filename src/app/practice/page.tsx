import { prisma } from "@/lib/prisma";
import PracticeClient from "./PracticeClient";

export default async function PracticePage() {
  const problems = await prisma.intelProblem.findMany({
    select: {
      id: true, title: true, slug: true,
      difficulty: true, category: true, acceptance: true,
    },
    orderBy: { id: "asc" },
  });

  const categories = [...new Set(problems.map((p) => p.category))].sort();

  return <PracticeClient problems={problems} categories={categories} />;
}
