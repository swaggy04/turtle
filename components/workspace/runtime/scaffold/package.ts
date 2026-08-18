export function createPackageJson(
  dependencies: Record<string, string> = {}
) {
  return JSON.stringify(
    {
      name: "turtle-app",
      private: true,
      version: "0.1.0",
      scripts: {
        dev: "next dev --webpack",
        build: "next build",
        start: "next start",
      },
      dependencies: {
        next: "latest",
        react: "latest",
        "react-dom": "latest",
        ...dependencies,
      },
      devDependencies: {
        typescript: "latest",
        "@types/react": "latest",
        "@types/node": "latest",
        tailwindcss: "latest",
        "@tailwindcss/postcss": "latest",
        postcss: "latest",
        autoprefixer: "latest",
      },
    },
    null,
    2
  );
}