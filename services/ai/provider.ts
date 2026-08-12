import type { GeneratedProject } from "../ai-schema";

export interface AIProvider {
  generateProject(prompt: string): Promise<GeneratedProject>;
}