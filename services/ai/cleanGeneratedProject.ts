import type { GeneratedProject } from "../ai-schema";

function cleanCode(code: string) {
  return code
    // Remove opening markdown fence
    .replace(/^```[a-zA-Z0-9-]*\n?/, "")
    // Remove closing markdown fence
    .replace(/\n?```$/, "")
    // Remove leading "..."
    .replace(/^\.\.\.\s*/, "")
    // Remove trailing "..."
    .replace(/\s*\.\.\.$/, "")
    .trim();
}

function normalizePackageJson(code: string) {
  const pkg = JSON.parse(cleanCode(code));

  pkg.name ??= "turtle-app";
  pkg.private ??= true;
  pkg.version ??= "0.1.0";

  pkg.scripts = {
    dev: "next dev",
    build: "next build",
    start: "next start",
    ...(pkg.scripts ?? {}),
  };

  pkg.dependencies = {
    next: "latest",
    react: "latest",
    "react-dom": "latest",
    ...(pkg.dependencies ?? {}),
  };

  pkg.devDependencies = {
    typescript: "latest",
    "@types/react": "latest",
    "@types/node": "latest",
    tailwindcss: "latest",
    "@tailwindcss/postcss": "latest",
    postcss: "latest",
    ...(pkg.devDependencies ?? {}),
  };

  // Remove known bad packages
  delete pkg.dependencies?.["tailwindcss-cli"];
  delete pkg.dependencies?.["@types/next"];
  delete pkg.dependencies?.["@types/tailwindcss"];

  delete pkg.devDependencies?.["tailwindcss-cli"];
  delete pkg.devDependencies?.["@types/next"];
  delete pkg.devDependencies?.["@types/tailwindcss"];

  return JSON.stringify(pkg, null, 2);
}

function normalizeNextConfig() {
  return `import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
`;
}

export function cleanGeneratedProject(
  project: GeneratedProject
): GeneratedProject {
  const cleanedProject: GeneratedProject = {
    ...project,
    files: project.files.map((file) => {
      let code = cleanCode(file.code);

      if (file.path === "package.json") {
        code = normalizePackageJson(code);
      }

      if (file.path === "next.config.ts") {
        code = normalizeNextConfig();
      }

      return {
        ...file,
        code,
      };
    }),
  };

  const packageFile = cleanedProject.files.find(
    (file) => file.path === "package.json"
  );

  if (!packageFile) {
    throw new Error("Generated project is missing package.json.");
  }

  try {
    JSON.parse(packageFile.code);
  } catch {
    throw new Error("Generated package.json is invalid.");
  }

  return cleanedProject;
}