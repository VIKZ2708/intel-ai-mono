import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return new Response("Unauthorized", { status: 401 });

  const { code, language, problemTitle, problemDifficulty, problemDescription } = await req.json();

  const prompt = `You are an expert competitive programming coach reviewing a solution.

Problem: **${problemTitle}** (${problemDifficulty})
Language: ${language}

\`\`\`${language}
${code}
\`\`\`

Provide a concise code review with exactly these sections:

## Complexity
**Time:** O(?) — explain in one sentence.
**Space:** O(?) — explain in one sentence.

## Approach
One short paragraph describing the algorithm/pattern used.

## Improvements
Up to 3 bullet points. Each must be a concrete, actionable suggestion (e.g. "Use a hash map instead of nested loops to reduce from O(n²) to O(n)"). Skip this section if the solution is already optimal.

## Verdict
One sentence: excellent / good / needs work — and the primary reason.

Keep the total response under 250 words. Do not repeat the code back.`;

  let stream: AsyncIterable<Anthropic.RawMessageStreamEvent>;
  try {
    stream = anthropic.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 800,
      messages: [{ role: "user", content: prompt }],
    });
  } catch {
    return new Response("Failed to start AI review", { status: 500 });
  }

  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            controller.enqueue(new TextEncoder().encode(chunk.delta.text));
          }
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
