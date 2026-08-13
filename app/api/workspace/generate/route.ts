import { auth } from "@/lib/auth";
import { generateProject } from "@/services/ai/generator";
import type { AIProviderName } from "@/services/ai/provider";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const { prompt, provider, model } = body;

    if (typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const validProviders: AIProviderName[] = ["ollama", "gemini"];

    if (typeof provider !== "string" || !validProviders.includes(provider as AIProviderName)) {
      return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
    }

    if (typeof model !== "string" || !model.trim()) {
      return NextResponse.json({ error: "Model is required" }, { status: 400 });
    }

    const project = await generateProject({
      prompt: prompt.trim(),
      provider: provider as AIProviderName,
      model: model.trim(),
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Project generation failed:", error);

    const message = error instanceof Error ? error.message : String(error);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
