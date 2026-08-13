import { OllamaProvider } from "./ollama";
import { GeminiProvider } from "./gemini";
import { AIProviderName } from "./provider";

const providers = {
  ollama: new OllamaProvider(),
  gemini: new GeminiProvider(),
};

export function getProvider(name: AIProviderName) {
  return providers[name];
}