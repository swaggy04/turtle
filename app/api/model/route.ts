import { NextResponse } from "next/server";

const GEMINI_MODELS = [
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    provider: "gemini",
  },
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    provider: "gemini",
  },
];

export async function GET() {
  let ollamaModels = [];

  try {
    const res = await fetch("http://localhost:11434/api/tags");

    if (res.ok) {
      const data = await res.json();

      ollamaModels = data.models.map((m: { name: string }) => ({
        id: m.name,
        name: m.name,
        provider: "ollama",
      }));
    }
  } catch {
    console.log("Ollama not running.");
  }

  return NextResponse.json([
    ...ollamaModels,
    ...GEMINI_MODELS,
  ]);
}