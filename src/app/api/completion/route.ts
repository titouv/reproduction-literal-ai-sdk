import { createOpenAI } from "@ai-sdk/openai";

const groq = createOpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

import { generateText as baseGenerateText } from "ai";
import { LiteralClient } from "@literalai/client";

const literalClient = new LiteralClient(process.env["LITERAL_API_KEY"]);

const generateText =
  literalClient.instrumentation.vercel.instrument(baseGenerateText);

export async function POST(req: Request) {
  const { prompt }: { prompt: string } = await req.json();

  const { text } = await generateText({
    model: groq("llama3-8b-8192"),
    system: "You are a helpful assistant.",
    prompt,
  });

  return Response.json({ text });
}
