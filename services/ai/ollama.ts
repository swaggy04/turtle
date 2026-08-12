
import { GeneratedProject, generatedProjectSchema } from "../ai-schema";
import type { AIProvider } from "./provider";

const OLLAMA_URL = "http://localhost:11434/api/generate";


const MODEL = "qwen2.5-coder:3b";

const SYSTEM_PROMPT = `
You are Turtle, an AI full-stack application builder.

Your job is to generate a complete small web application
from a user's natural-language request.

Technology:
- Next.js App Router
- React
- TypeScript
- Tailwind CSS

Rules:
1. Generate complete runnable code.
2. Every generated file must contain:
   - path
   - code
   - language
3. dependencies must contain only packages actually used.
4. Do not return markdown.
5. Do not return explanations.
6. Do not use code fences.
7. Keep the generated application reasonably small.
8. Make sure imports between generated files use the correct paths.
9. The project must be internally consistent and runnable.
`;

const generatedProjectFormat = {
  type: "object",
  properties: {
    files: {
      type: "array",
      items: {
        type: "object",
        properties: {
          path: {
            type: "string",
          },
          code: {
            type: "string",
          },
          language: {
            type: "string",
          },
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
  async generateProject(prompt: string): Promise<GeneratedProject> {
    const response = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        model: MODEL,

        system: SYSTEM_PROMPT,

        prompt: `
User request:

${prompt}
`,

        format: generatedProjectFormat,

        stream: false,

        options: {
          temperature: 0,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Ollama request failed (${response.status}): ${errorText}`,
      );
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

    // Final safety boundary:
    // AI output must match our application schema.
    return generatedProjectSchema.parse(parsed);
  }
}