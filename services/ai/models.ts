export const AI_MODELS = {
  GEMINI_2_5_FLASH: "gemini-2.5-flash",
  GEMINI_2_5_PRO: "gemini-2.5-pro",
  OLLAMA_LLAMA3: "llama3",
} as const;

export type AIModel = (typeof AI_MODELS)[keyof typeof AI_MODELS];