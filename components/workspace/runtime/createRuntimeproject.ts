import type { FileSystemTree } from "@webcontainer/api";
import type { GeneratedProject } from "@/services/ai-schema";

export function createRuntimeProject(project: GeneratedProject): FileSystemTree {
  const tree: FileSystemTree = {};

  for (const file of project.files) {
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
