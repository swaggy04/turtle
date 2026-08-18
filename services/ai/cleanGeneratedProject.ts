import type { GeneratedProject } from "../ai-schema";

function cleanCode(code: string) {
  return code
    .replace(/^```[a-zA-Z0-9-]*\n?/, "")
    .replace(/\n?```$/, "")
    .replace(/^\.\.\.\s*/, "")
    .replace(/\s*\.\.\.$/, "")
    .trim();
}

function normalizePackageJson(code: string) {
  const pkg = JSON.parse(cleanCode(code));

  pkg.name ??= "turtle-app";
  pkg.private ??= true;
  pkg.version ??= "0.1.0";

  pkg.scripts = {
    dev: "next dev --webpack",
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
    autoprefixer: "latest",
    ...(pkg.devDependencies ?? {}),
  };

  // Remove broken packages frequently hallucinated by LLMs
  const badPackages = [
    "tailwindcss-cli",
    "@types/next",
    "@types/tailwindcss",
    "@tailwindcss/postcss7-compat",
    "@sentry/nextjs",
  ];

  for (const name of badPackages) {
    delete pkg.dependencies?.[name];
    delete pkg.devDependencies?.[name];
  }

  return JSON.stringify(pkg, null, 2);
}

function normalizeNextConfig() {
  return `import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

export default nextConfig;
`;
}

function normalizePostcssConfig() {
  return `const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
`;
}

function normalizeLayout(code: string) {
  return cleanCode(code)
    .replace(/@next\/font\/google/g, "next/font/google")
    .replace(/@next\/font/g, "next/font");
}

export function cleanGeneratedProject(
  project: GeneratedProject
): GeneratedProject {
  const cleanedProject: GeneratedProject = {
    ...project,
    files: project.files.map((file) => {
      let code = cleanCode(file.code);

      switch (file.path) {
        case "package.json":
          code = normalizePackageJson(code);
          break;

        case "next.config.ts":
          code = normalizeNextConfig();
          break;

        case "postcss.config.mjs":
          code = normalizePostcssConfig();
          break;

        case "app/layout.tsx":
          code = normalizeLayout(code);
          break;
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