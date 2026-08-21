import { AI_MODELS, AIModel } from "./models";
import { AIProvider } from "./provider";
import { geminiProvider } from "./gemini";
import { ollamaProvider } from "./ollama";

const PROVIDER_REGISTRY: Record<AIModel, AIProvider> = {
  [AI_MODELS.GEMINI_2_5_FLASH]: geminiProvider,
  [AI_MODELS.GEMINI_2_5_PRO]: geminiProvider,
  [AI_MODELS.OLLAMA_LLAMA3]: ollamaProvider,
};

export function getProvider(model: AIModel): AIProvider {
  return PROVIDER_REGISTRY[model];
}