"use client";

import { useCallback, useRef, useState } from "react";
import type { GeneratedProject } from "@/services/ai-schema";
import { createRuntimeProject } from "./createRuntimeProject";
import { getWebContainer } from "./WebcontainerManager";


export type RuntimeStatus =
  | "idle"
  | "booting"
  | "mounting"
  | "installing"
  | "starting"
  | "ready"
  | "error";

export function useWebContainer() {
  const [status, setStatus] = useState<RuntimeStatus>("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [logs, setLogs] = useState("");
  const [error, setError] = useState<string | null>(null);

  const initializedRef = useRef(false);

  const appendLog = useCallback((message: string) => {
    setLogs((prev) => prev + message);
  }, []);

  const run = useCallback(
    async (project: GeneratedProject) => {
      try {
        setError(null);
        setLogs("");
        setPreviewUrl(null);

        // ----------------------------------------
        // Step 1 — Boot (or reuse) Linux
        // ----------------------------------------
        setStatus("booting");

        const container = await getWebContainer();

        // Listen once for preview URL
        if (!initializedRef.current) {
          initializedRef.current = true;

          container.on("server-ready", (_port, url) => {
            setPreviewUrl(url);
            setStatus("ready");
          });
        }

        // ----------------------------------------
        // Step 2 — Build runtime filesystem
        // ----------------------------------------
        setStatus("mounting");

        const runtimeProject = createRuntimeProject(project);

        await container.mount(runtimeProject);

        // ----------------------------------------
        // Step 3 — npm install
        // ----------------------------------------
        setStatus("installing");
        appendLog("$ npm install\n");

        const installProcess = await container.spawn("npm", ["install"]);

        installProcess.output.pipeTo(
          new WritableStream({
            write(chunk) {
              appendLog(chunk);
            },
          })
        );

        const installExitCode = await installProcess.exit;

        if (installExitCode !== 0) {
          throw new Error("npm install failed");
        }

        // ----------------------------------------
        // Step 4 — npm run dev
        // ----------------------------------------
        setStatus("starting");
        appendLog("\n$ npm run dev\n");

        const devProcess = await container.spawn("npm", ["run", "dev"]);

        devProcess.output.pipeTo(
          new WritableStream({
            write(chunk) {
              appendLog(chunk);
            },
          })
        );

        // We intentionally DO NOT await devProcess.exit.
        // The process keeps running while the preview is open.
      } catch (err) {
        console.error(err);

        setStatus("error");

        setError(err instanceof Error ? err.message : "Unknown runtime error");
      }
    },
    [appendLog]
  );

  return {
    status,
    previewUrl,
    logs,
    error,
    run,
  };
}