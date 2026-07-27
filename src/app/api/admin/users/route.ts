import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.email !== "vikz2708@gmail.com") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const users = await prisma.intelUser.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true, name: true, email: true, messageCount: true, createdAt: true,
      _count: { select: { submissions: true } },
    },
  });

  return NextResponse.json(users);
}
