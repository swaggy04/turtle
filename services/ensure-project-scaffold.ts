import type { GeneratedProject } from "@/services/ai-schema";

type GeneratedFile = GeneratedProject["files"][number];

const REQUIRED_FILES: GeneratedFile[] = [
  {
    path: "package.json",
    language: "json",
    code: JSON.stringify(
      {
        name: "turtle-app",
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
        },
        devDependencies: {
          typescript: "latest",
          tailwindcss: "latest",
          postcss: "latest",
          autoprefixer: "latest",
        },
      },
      null,
      2,
    ),
  },
  {
    path: "tsconfig.json",
    language: "json",
    code: JSON.stringify(
      {
        compilerOptions: {
          target: "ES2017",
          lib: ["dom", "dom.iterable", "esnext"],
          allowJs: false,
          skipLibCheck: true,
          strict: true,
          noEmit: true,
          module: "esnext",
          moduleResolution: "bundler",
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: "preserve",
          incremental: true,
        },
        include: ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
        exclude: ["node_modules"],
      },
      null,
      2,
    ),
  },
  {
    path: "next.config.ts",
    language: "ts",
    code: `const nextConfig = {};
export default nextConfig;`,
  },
  {
    path: "postcss.config.mjs",
    language: "javascript",
    code: `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`,
  },
  {
    path: "tailwind.config.ts",
    language: "ts",
    code: `import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;`,
  },
];

export function ensureProjectScaffold(project: GeneratedProject): GeneratedProject {
  const files = [...project.files];

  for (const required of REQUIRED_FILES) {
    const exists = files.some((file) => file.path === required.path);

    if (!exists) {
      files.push(required);
    }
  }

  return {
    ...project,
    files,
  };
}
