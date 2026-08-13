import { GeneratedProject, generatedProjectSchema } from "../ai-schema";
import { SYSTEM_PROMPT } from "./prompt";
import type { AIProvider, GenerateProjectOptions } from "./provider";

const OLLAMA_URL = "http://localhost:11434/api/generate";

const generatedProjectFormat = {
  type: "object",
  properties: {
    files: {
      type: "array",
      items: {
        type: "object",
        properties: {
          path: { type: "string" },
          code: { type: "string" },
          language: { type: "string" },
        },
        required: ["path", "code", "language"],
      },
    },
    dependencies: {
      type: "object",
      additionalProperties: {
        type: "string",
      },
    },
  },
  required: ["files", "dependencies"],
};

export class OllamaProvider implements AIProvider {
  async generateProject(options: GenerateProjectOptions): Promise<GeneratedProject> {
    const response = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: options.model,
        system: SYSTEM_PROMPT,
        prompt: `
Build a complete production-ready Next.js App Router project.

User request:
${options.prompt}

Requirements:
- Generate all required files.
- Split the UI into reusable components whenever appropriate.
- Return valid JSON only.
`,
        format: generatedProjectFormat,
        stream: false,
        options: {
          temperature: 0.2,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama request failed (${response.status}): ${await response.text()}`);
    }

    const data = await response.json();

    if (!data.response) {
      throw new Error("Ollama returned an empty response");
    }

    let parsed: unknown;

    try {
      parsed = JSON.parse(data.response);
    } catch {
      console.error("Invalid JSON returned by Ollama:");
      console.error(data.response);
      throw new Error("Ollama returned invalid JSON");
    }

    return generatedProjectSchema.parse(parsed);
  }
}
