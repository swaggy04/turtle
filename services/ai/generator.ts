import type { AIProvider } from "./provider";
import { OllamaProvider } from "./ollama";


const provider: AIProvider = new OllamaProvider();

export function generateProject(prompt: string) {
  return provider.generateProject(prompt);
}