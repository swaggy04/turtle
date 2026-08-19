import { type GeneratedProject } from "./ai-schema";

export async function generateProject(
  prompt: string
): Promise<GeneratedProject> {
  return {
    files: [
      {
        path: "app/page.tsx",
        language: "tsx",
        code: `export default function Page() {\n  return <div>${prompt}</div>;\n}`,
      },
    ],
    dependencies: {},
  };
}