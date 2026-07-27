import { NextRequest, NextResponse } from "next/server";

const JUDGE0_URL =
  "https://ce.judge0.com/submissions?base64_encoded=true&wait=true";

function b64Encode(str: string): string {
  return Buffer.from(str, "utf-8").toString("base64");
}

function b64Decode(str: string | null | undefined): string {
  if (!str) return "";
  try {
    return Buffer.from(str, "base64").toString("utf-8");
  } catch {
    return str;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    let res: Response;
    try {
      res = await fetch(JUDGE0_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_code: b64Encode(body.source_code ?? ""),
          language_id: body.language_id,
          stdin: b64Encode(body.stdin ?? ""),
        }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeout);
    }

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        { error: `Execution service error (${res.status}): ${text.slice(0, 200)}` },
        { status: 502 }
      );
    }

    const data = await res.json();

    // Decode all base64 fields before sending back to the client
    return NextResponse.json({
      ...data,
      stdout:         b64Decode(data.stdout),
      stderr:         b64Decode(data.stderr),
      compile_output: b64Decode(data.compile_output),
      message:        b64Decode(data.message),
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    const isTimeout = msg.includes("abort") || msg.includes("timeout");
    return NextResponse.json(
      { error: isTimeout ? "Code execution timed out (20s limit)." : "Execution service unavailable." },
      { status: 500 }
    );
  }
}
