
import { GeneratedProject, generatedProjectSchema } from "../ai-schema";
import type { AIProvider } from "./provider";

const OLLAMA_URL = "http://localhost:11434/api/generate";


const MODEL = "qwen2.5-coder:3b";

const SYSTEM_PROMPT = `
You are Turtle, an AI full-stack application builder.

Generate a complete, small, runnable web application from the user's request.

TECHNOLOGY REQUIREMENTS:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS

NEXT.JS REQUIREMENTS:

1. ALWAYS use the Next.js App Router.
2. NEVER use the Pages Router.
3. NEVER create pages/index.tsx.
4. The main page MUST be:
   app/page.tsx
5. If the application needs a root layout, create:
   app/layout.tsx
6. Global styles MUST be:
   app/globals.css
7. Use TypeScript files (.ts / .tsx).
8. Do not generate JavaScript versions of TypeScript files.
9. Do not generate unnecessary configuration files.

GENERATED FILE REQUIREMENTS:

Every file must contain:

- path
- code
- language

The file paths must represent a valid Next.js App Router project.

DEPENDENCIES:

- Include only packages actually imported by the generated code.
- Do not include unnecessary packages.
- Do not include @types/tailwindcss.
- React and Next.js dependencies must use modern compatible versions.
- Do not invent packages.

CODE REQUIREMENTS:

- Code must be complete.
- Code must be internally consistent.
- Imports must point to files that actually exist.
- Components must be correctly exported and imported.
- Do not use undefined components.
- Do not use undefined variables.
- Avoid unnecessary complexity.
- Keep the application reasonably small.

OUTPUT REQUIREMENTS:

Return ONLY valid JSON matching the provided schema.

Do NOT return:
- Markdown
- Code fences
- Explanations
- Comments outside the generated code
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