import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { problemId, language, code, status, runtime, memory } = await req.json();
  const userId = (session.user as { id: string }).id;

  const submission = await prisma.intelSubmission.create({
    data: { userId, problemId, language, code, status, runtime, memory },
  });

  return NextResponse.json(submission, { status: 201 });
}

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId    = (session.user as { id: string }).id;
  const problemId = req.nextUrl.searchParams.get("problemId");

  const submissions = await prisma.intelSubmission.findMany({
    where:   { userId, ...(problemId ? { problemId: parseInt(problemId, 10) } : {}) },
    orderBy: { createdAt: "desc" },
    take:    50,
    select:  { id: true, problemId: true, language: true, code: true, status: true, runtime: true, memory: true, createdAt: true },
  });

  return NextResponse.json(submissions);
}
