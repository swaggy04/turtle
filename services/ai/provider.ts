import { GeneratedProject } from "../ai-schema";


export type AIProviderName = "ollama" | "gemini";

export interface GenerateProjectOptions {
  prompt: string;
  provider: AIProviderName;
  model: string;
}

export interface AIProvider {
  generateProject(options: GenerateProjectOptions): Promise<GeneratedProject>;
}