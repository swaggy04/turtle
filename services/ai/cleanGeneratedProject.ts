import type { GeneratedProject } from "../ai-schema";

export function cleanGeneratedProject(project: GeneratedProject): GeneratedProject {
  return {
    files: project.files.map((file) => ({
      ...file,
      path: file.path.replace(/^\/+/, ""),
    })),
    dependencies: project.dependencies ?? {},
  };
}
