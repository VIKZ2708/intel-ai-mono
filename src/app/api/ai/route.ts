import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const MSG_LIMIT = 10;

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ count: 0, limit: MSG_LIMIT });

  const userId = (session.user as { id: string }).id;
  const user = await prisma.intelUser.findUnique({
    where: { id: userId },
    select: { messageCount: true },
  });

  return NextResponse.json({ count: user?.messageCount ?? 0, limit: MSG_LIMIT });
}

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as { id: string }).id;
  const user = await prisma.intelUser.update({
    where: { id: userId },
    data: { messageCount: { increment: 1 } },
    select: { messageCount: true },
  });

  return NextResponse.json({ count: user.messageCount, limit: MSG_LIMIT });
}

export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = (session.user as { id: string }).id;
  await prisma.intelUser.update({
    where: { id: userId },
    data: { messageCount: 0 },
  });

  return NextResponse.json({ count: 0, limit: MSG_LIMIT });
}
