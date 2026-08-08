import { WorkspaceFile } from "./provider/workspace-types";

interface GeneratedProject {
  files: WorkspaceFile[];
  dependencies: Record<string, string>;
}

export async function GenerateWorkspace(prompt: string): Promise<GeneratedProject> {
  const response = await fetch("/api/workspace/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
    }),
  });
  if (!response.ok) {
 const errorBody = await response.text();

  console.error(
    "Generate workspace failed:",
    response.status,
    errorBody
  );

  throw new Error(
    `Failed to generate workspace (${response.status}): ${errorBody}`
  );
  }

  return response.json();
}
