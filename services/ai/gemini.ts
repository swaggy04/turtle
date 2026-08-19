import type { AIProvider, GenerateProjectOptions } from "./provider";
import { GeneratedProject } from "../ai-schema";

export class GeminiProvider implements AIProvider {
  async generateProject(options: GenerateProjectOptions): Promise<GeneratedProject> {
    return {
      files: [
        {
          path: "app/page.tsx",
          language: "tsx",
          code: `export default function Page() {\n  return <div>${options.prompt}</div>;\n}`,
        },
      ],
      dependencies: {},
    };
  }
}
