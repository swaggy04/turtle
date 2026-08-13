import { GeneratedProject, generatedProjectSchema } from "../ai-schema";
import type { AIProvider, GenerateProjectOptions } from "./provider";

const OLLAMA_URL = "http://localhost:11434/api/generate";

const SYSTEM_PROMPT = `
You are Turtle, an expert AI full-stack application builder.

Your job is to generate COMPLETE, runnable Next.js applications.

TECH STACK

- Next.js App Router
- React
- TypeScript
- Tailwind CSS

APP ROUTER RULES

- Always use App Router.
- Never use Pages Router.
- Main entry: app/page.tsx
- Root layout: app/layout.tsx
- Global styles: app/globals.css
- Use .ts/.tsx files only.

PROJECT STRUCTURE

Every project MUST include:

- app/layout.tsx
- app/page.tsx
- app/globals.css

When the UI contains sections like navbar, hero, footer, cards, forms,
sidebars, or lists, split them into reusable components.

Example:

components/
- Navbar.tsx
- Hero.tsx
- TodoList.tsx
- Footer.tsx

Never put everything inside app/page.tsx unless the user explicitly asks for a single-file example.

FILE FORMAT

Every file MUST contain:

- path
- code
- language

DEPENDENCIES

- Include only packages actually imported.
- Do not invent packages.
- Do not include unnecessary packages.
- Do not include @types/tailwindcss.

CODE QUALITY

- Produce production-ready code.
- Imports must reference existing files.
- Components must be exported correctly.
- Avoid placeholder text like "Hello World" unless explicitly requested.
- Keep the project reasonably small but complete.

OUTPUT

Return ONLY valid JSON matching the schema.

Never return:

- Markdown
- Code fences
- Explanations
`;

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
