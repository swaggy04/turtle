import { GoogleGenAI } from "@google/genai";

import type { AIProvider, GenerateProjectOptions } from "./provider";
import { GeneratedProject, generatedProjectSchema } from "../ai-schema";
import { SYSTEM_PROMPT } from "./prompt";
import { cleanGeneratedProject } from "./cleanGeneratedProject";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export class GeminiProvider implements AIProvider {
  async generateProject(options: GenerateProjectOptions): Promise<GeneratedProject> {
    const response = await ai.models.generateContent({
      model: options.model,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        responseMimeType: "application/json",
      },
      contents: `
Build a complete production-ready Next.js App Router project.

User request:
${options.prompt}

Requirements:
- Generate all required files.
- Split the UI into reusable components whenever appropriate.
- Return valid JSON only.
`,
    });

    const text = response.text;

    if (!text) {
      throw new Error("Gemini returned an empty response");
    }

    let parsed: unknown;

    try {
      parsed = JSON.parse(text);
    } catch {
      console.error("Invalid JSON returned by Gemini:");
      console.error(text);
      throw new Error("Gemini returned invalid JSON");
    }
    const project = generatedProjectSchema.parse(parsed);
    return cleanGeneratedProject(project);
  }
}
