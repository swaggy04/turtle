import { GeneratedProject } from "../ai-schema";
import { AIModel } from "./models";


export interface GenerateProjectOptions {
  prompt: string;
  model: AIModel;
}

export interface AIProvider {
  generateProject(
    options: GenerateProjectOptions
  ): Promise<GeneratedProject>;
}