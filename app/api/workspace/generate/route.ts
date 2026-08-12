import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { generateProject } from "@/services/ai";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const prompt = body.prompt;

    if (typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const project = await generateProject(prompt.trim());

    return NextResponse.json(project);
  } catch (error) {
    console.error("Project generation failed:", error);
    const message = error instanceof Error ? error.message : String(error);

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
