import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { name, email, phone, courseId, courseName, message } = await req.json();

  if (!name?.trim() || !email?.trim() || !courseId?.trim()) {
    return NextResponse.json({ error: "name, email, and courseId are required" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  const userId = session?.user ? (session.user as { id: string }).id : null;

  const enrollment = await prisma.intelEnrollment.create({
    data: { name: name.trim(), email: email.trim(), phone: phone?.trim() ?? null, courseId, courseName, message: message?.trim() ?? null, userId },
  });

  return NextResponse.json(enrollment, { status: 201 });
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userEmail = session.user.email;
  if (userEmail !== "vikz2708@gmail.com") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const enrollments = await prisma.intelEnrollment.findMany({
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(enrollments);
}
