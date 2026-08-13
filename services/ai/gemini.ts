import { GeneratedProject } from "../ai-schema";
import { AIProvider, GenerateProjectOptions } from "./provider";


export class GeminiProvider implements AIProvider {
  async generateProject(
    options: GenerateProjectOptions
  ): Promise<GeneratedProject> {
    throw new Error("Gemini provider not implemented yet.");
  }
}