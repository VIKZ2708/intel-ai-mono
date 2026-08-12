import { prisma } from "@/lib/prisma";
import MockInterviewClient from "./MockInterviewClient";

export default async function MockInterviewPage() {
  const problems = await prisma.intelProblem.findMany({
    select: { id: true, title: true, slug: true, difficulty: true, category: true },
    orderBy: { id: "asc" },
  });

  return <MockInterviewClient problems={problems} />;
}
