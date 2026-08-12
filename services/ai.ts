import { GoogleGenAI } from "@google/genai";
import {
  generatedProjectSchema,
  type GeneratedProject,
} from "./ai-schema";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

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
`;

type GenerateRequest = Parameters<
  typeof ai.models.generateContent
>[0];

async function generateWithRetry(
  request: GenerateRequest,
  maxRetries = 2
) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await ai.models.generateContent(request);
    } catch (error: unknown) {
      const status =
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        typeof error.status === "number"
          ? error.status
          : undefined;

      const retryable =
        status === 408 ||
        status === 503 ||
        (status !== undefined && status >= 500);

      if (!retryable || attempt === maxRetries) {
        throw error;
      }

      const baseDelay = 1000 * 2 ** attempt;

      const jitter = Math.floor(Math.random() * 500);

      const delay = baseDelay + jitter;

      await new Promise((resolve) =>
        setTimeout(resolve, delay)
      );
    }
  }

  throw new Error("Gemini generation failed");
}

export async function generateProject(
  prompt: string
): Promise<GeneratedProject> {
  const response = await generateWithRetry({
    model: "gemini-3.6-flash",

    contents: `
${SYSTEM_PROMPT}

User request:
${prompt}
`,

    config: {
      responseMimeType: "application/json",

      responseSchema: {
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

              required: [
                "path",
                "code",
                "language",
              ],
            },
          },

          dependencies: {
            type: "object",

            additionalProperties: {
              type: "string",
            },
          },
        },

        required: [
          "files",
          "dependencies",
        ],
      },
    },
  });

  if (!response.text) {
    throw new Error(
      "Gemini returned an empty response"
    );
  }

  const parsed = JSON.parse(response.text);

  return generatedProjectSchema.parse(parsed);
}