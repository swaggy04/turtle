import { GLOBALS_CSS } from "./globals";
import { ROOT_LAYOUT } from "./layout";
import { NEXT_CONFIG } from "./nextConfig";
import { NEXT_ENV } from "./nextEnv";
import { createPackageJson } from "./package";
import { POSTCSS_CONFIG } from "./postcss";
import { TAILWIND_CONFIG } from "./tailwind";
import { TSCONFIG } from "./tsconfig";


export function getScaffoldFiles(
  dependencies: Record<string, string> = {}
) {
  return [
    {
      path: "package.json",
      language: "json",
      code: createPackageJson(dependencies),
    },
    {
      path: "tsconfig.json",
      language: "json",
      code: TSCONFIG,
    },
    {
      path: "next.config.ts",
      language: "ts",
      code: NEXT_CONFIG,
    },
    {
      path: "postcss.config.mjs",
      language: "js",
      code: POSTCSS_CONFIG,
    },
    {
      path: "tailwind.config.ts",
      language: "ts",
      code: TAILWIND_CONFIG,
    },
    {
      path: "next-env.d.ts",
      language: "ts",
      code: NEXT_ENV,
    },
    {
      path: "app/globals.css",
      language: "css",
      code: GLOBALS_CSS,
    },
    {
      path: "app/layout.tsx",
      language: "tsx",
      code: ROOT_LAYOUT,
    },
  ];
}