import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const raw = await getToken({ req, secret: process.env.NEXTAUTH_SECRET!, raw: true });
  if (!raw) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  return NextResponse.json({ token: raw });
}
