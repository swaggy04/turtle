import type { AIProvider } from "./provider";
import {
  generatedProjectSchema,
  type GeneratedProject,
} from "../ai-schema";
import { zodToJsonSchema } from "zod-to-json-schema";

const MODEL = "qwen2.5-coder:1.5b";
const OLLAMA_URL = "http://localhost:11434/api/generate";

const SYSTEM_PROMPT = `
You are Turtle, an AI full-stack application builder.

Generate a small complete web application from the user's request.

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
`;

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

        format: zodToJsonSchema(generatedProjectSchema),

        stream: false,

        options: {
          temperature: 0,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Ollama request failed (${response.status}): ${errorText}`
      );
    }

    const data = await response.json();

    if (!data.response) {
      throw new Error("Ollama returned an empty response");
    }

    const parsed = JSON.parse(data.response);

    return generatedProjectSchema.parse(parsed);
  }
}