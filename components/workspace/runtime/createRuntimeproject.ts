
import type { FileSystemTree } from "@webcontainer/api";
import type { GeneratedProject } from "@/services/ai-schema";
import { getScaffoldFiles } from "./scaffold";

const SCAFFOLD_PATHS = new Set([
  "package.json",
  "tsconfig.json",
  "next.config.ts",
  "postcss.config.mjs",
  "tailwind.config.ts",
  "next-env.d.ts",
  "app/globals.css",
  "app/layout.tsx",
]);

export function createRuntimeProject(
  project: GeneratedProject
): FileSystemTree {
  const tree: FileSystemTree = {};

  // Keep only AI-generated application files
  const appFiles = project.files.filter(
    (file) => !SCAFFOLD_PATHS.has(file.path)
  );

  // Turtle-owned scaffold + AI files
  const finalFiles = [
    ...getScaffoldFiles(project.dependencies ?? {}),
    ...appFiles,
  ];

  for (const file of finalFiles) {
    const parts = file.path.split("/");
    let current = tree;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isLast = i === parts.length - 1;

      if (isLast) {
        current[part] = {
          file: {
            contents: file.code,
          },
        };
      } else {
        if (!(part in current)) {
          current[part] = {
            directory: {},
          };
        }

        const node = current[part];

        if (!("directory" in node)) {
          throw new Error(`Expected "${part}" to be a directory.`);
        }

        current = node.directory;
      }
    }
  }

  return tree;
}