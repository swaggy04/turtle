import type { WorkspaceFile } from "@/types/workspace";

interface GeneratedProject {
  files: WorkspaceFile[];
  dependencies: Record<string, string>;
}

interface GenerateWorkspaceOptions {
  prompt: string;
  provider: "ollama" | "gemini";
  model: string;
}

export async function GenerateWorkspace({
  prompt,
  provider,
  model,
}: GenerateWorkspaceOptions): Promise<GeneratedProject> {
  const response = await fetch("/api/workspace/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt,
      provider,
      model,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();

    console.error("Generate workspace failed:", response.status, errorBody);

    throw new Error(`Failed to generate workspace (${response.status}): ${errorBody}`);
  }

  return response.json();
}
