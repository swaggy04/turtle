import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
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
    const { prompt, provider, model, workspaceId } = body;

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

    // Check user credits
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (user && user.credits <= 0 && user.plan === "free") {
      return NextResponse.json(
        { error: "You have run out of generation credits. Please upgrade your plan." },
        { status: 403 }
      );
    }

    const project = await generateProject({
      prompt: prompt.trim(),
      provider: provider as AIProviderName,
      model: model.trim(),
    });

    // Deduct 1 credit & Save Workspace to Prisma DB
    if (user) {
      const newCredits = Math.max(0, user.credits - 1);
      
      const titleSnippet = prompt.trim().slice(0, 30);
      const title = titleSnippet.length < prompt.trim().length ? `${titleSnippet}...` : titleSnippet;

      await prisma.user.update({
        where: { id: user.id },
        data: { credits: newCredits },
      });

      if (workspaceId) {
        await prisma.workspace.update({
          where: { id: workspaceId },
          data: {
            fileData: project.files as unknown as object,
            messages: [{ role: "user", content: prompt }, { role: "assistant", content: "Project generated" }],
          },
        });
      } else {
        await prisma.workspace.create({
          data: {
            title,
            userId: user.id,
            fileData: project.files as unknown as object,
            messages: [{ role: "user", content: prompt }, { role: "assistant", content: "Project generated" }],
          },
        });
      }

    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Project generation failed:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
