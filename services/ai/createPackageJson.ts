import { GeneratedProject } from "../ai-schema";



export function createPackageJson(project: GeneratedProject) {
  return {
    name: "turtle-generated-app",
    private: true,
    version: "0.1.0",

    scripts: {
      dev: "next dev",
      build: "next build",
      start: "next start",
    },

    dependencies: {
      next: "latest",
      react: "latest",
      "react-dom": "latest",
      ...project.dependencies,
    },
  };
}