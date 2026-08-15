import type { FileSystemTree } from "@webcontainer/api";
import type { GeneratedProject } from "@/services/ai-schema";

/**
 * Converts the AI-generated project into a complete filesystem
 * that WebContainer can mount and execute.
 *
 * Responsibility:
 * - Preserve every AI-generated file.
 * - Inject the runtime files required for Next.js.
 * - Merge Turtle's core dependencies with AI dependencies.
 */
export function createRuntimeProject(project: GeneratedProject): FileSystemTree {
  const files: FileSystemTree = {};

  // -------------------------------------------------------
  // 1. Copy every AI-generated file into the filesystem.
  // -------------------------------------------------------
  for (const generatedFile of project.files) {
    files[generatedFile.path] = {
      file: {
        contents: generatedFile.code,
      },
    };
  }

  // -------------------------------------------------------
  // 2. Inject package.json
  // WebContainer needs this before npm install can run.
  // -------------------------------------------------------
  files["package.json"] = {
    file: {
      contents: JSON.stringify(
        {
          name: "turtle-preview",
          private: true,
          scripts: {
            dev: "next dev",
          },
          dependencies: {
            next: "16.2.12",
            react: "19.2.4",
            "react-dom": "19.2.4",
            ...project.dependencies,
          },
        },
        null,
        2,
      ),
    },
  };

  // -------------------------------------------------------
  // 3. Inject tsconfig.json
  // Keeps every generated project on a known-good setup.
  // -------------------------------------------------------
  files["tsconfig.json"] = {
    file: {
      contents: JSON.stringify(
        {
          compilerOptions: {
            target: "ES2022",
            lib: ["dom", "dom.iterable", "esnext"],
            jsx: "preserve",
            module: "esnext",
            moduleResolution: "bundler",
            allowJs: true,
            strict: false,
            noEmit: true,
            skipLibCheck: true,
          },
        },
        null,
        2,
      ),
    },
  };

  // -------------------------------------------------------
  // 4. Inject a minimal next.config.ts
  // Future features (images, rewrites, middleware) can live here.
  // -------------------------------------------------------
  files["next.config.ts"] = {
    file: {
      contents: `export default {};`,
    },
  };

  return files;
}
