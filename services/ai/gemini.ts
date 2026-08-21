import { GoogleGenAI } from "@google/genai";

import { AIProvider } from "./provider";

import { generatedProjectSchema } from "../ai-schema";
import { buildGenerateProjectPrompt } from "./prompt";


const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing.");
}

const client = new GoogleGenAI({ apiKey });

export const geminiProvider: AIProvider = {
  async generateProject({ prompt, model }) {
    const response = await client.models.generateContent({
      model,
      contents: buildGenerateProjectPrompt(prompt),
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;

    if (!text) {
      throw new Error("Gemini returned an empty response.");
    }

    const parsed = JSON.parse(text);

    return generatedProjectSchema.parse(parsed);
  },
};
