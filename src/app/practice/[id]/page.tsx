import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Problem } from "@/lib/problems";
import IDEClient from "./IDEClient";

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const problemId = parseInt(id, 10);

  if (isNaN(problemId)) notFound();

  const [raw, prev, next, totalCount, solutions] = await Promise.all([
    prisma.intelProblem.findUnique({ where: { id: problemId } }),
    prisma.intelProblem.findFirst({
      where:   { id: { lt: problemId } },
      orderBy: { id: "desc" },
      select:  { id: true, title: true },
    }),
    prisma.intelProblem.findFirst({
      where:   { id: { gt: problemId } },
      orderBy: { id: "asc" },
      select:  { id: true, title: true },
    }),
    prisma.intelProblem.count(),
    prisma.intelSolution.findMany({
      where:   { problemId },
      orderBy: { createdAt: "asc" },
      select: {
        id: true, solutionType: true, language: true, approach: true,
        code: true, explanation: true, timeComplex: true, spaceComplex: true,
        username: true, runtime: true, memory: true, beats: true,
      },
    }),
  ]);

  if (!raw) notFound();

  // Cast Prisma Json fields to the Problem interface shape
  const problem: Problem = {
    id:          raw.id,
    title:       raw.title,
    slug:        raw.slug,
    difficulty:  raw.difficulty as unknown as Problem["difficulty"],
    category:    raw.category as unknown as Problem["category"],
    acceptance:  raw.acceptance,
    description: raw.description,
    examples:    raw.examples    as unknown as Problem["examples"],
    constraints: raw.constraints as unknown as Problem["constraints"],
    hints:       raw.hints       as unknown as Problem["hints"],
    starterCode: raw.starterCode as unknown as Problem["starterCode"],
    jsRunner:    raw.jsRunner,
    pyRunner:    raw.pyRunner,
  };

  return (
    <IDEClient
      problem={problem}
      solutions={solutions}
      prev={prev}
      next={next}
      totalCount={totalCount}
    />
  );
}
