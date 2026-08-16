"use client";

import { useCallback, useRef, useState } from "react";
import type { WebContainerProcess } from "@webcontainer/api";
import type { GeneratedProject } from "@/services/ai-schema";
import { createRuntimeProject } from "./createRuntimeProject";
import { getWebContainer } from "./WebcontainerManager";

export type RuntimeStatus = "idle" | "booting" | "mounting" | "installing" | "starting" | "ready" | "error";

export function useWebContainer() {
  const [status, setStatus] = useState<RuntimeStatus>("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [logs, setLogs] = useState("");
  const [error, setError] = useState<string | null>(null);

  const initializedRef = useRef(false);
  const mountedRef = useRef(false);
  const installedRef = useRef(false);
  const devProcessRef = useRef<WebContainerProcess | null>(null);

  const appendLog = useCallback((message: string) => {
    setLogs((prev) => prev + message);
  }, []);

  const run = useCallback(
    async (project: GeneratedProject) => {
      try {
        setError(null);

        const container = await getWebContainer();

        // Listen only once for preview URL
        if (!initializedRef.current) {
          initializedRef.current = true;

          container.on("server-ready", (_port, url) => {
            setPreviewUrl(url);
            setStatus("ready");
          });
        }

        // Mount only once
        if (!mountedRef.current) {
          setStatus("mounting");

          const runtimeProject = createRuntimeProject(project);
          await container.mount(runtimeProject);

          mountedRef.current = true;
        }

        // Install only once
        if (!installedRef.current) {
          setStatus("installing");
          appendLog("$ npm install\n");

          const installProcess = await container.spawn("npm", ["install"]);

          installProcess.output.pipeTo(
            new WritableStream({
              write(chunk) {
                appendLog(chunk);
              },
            }),
          );

          const exitCode = await installProcess.exit;

          if (exitCode !== 0) {
            throw new Error("npm install failed");
          }

          installedRef.current = true;
        }

        // Start dev server only once
        if (!devProcessRef.current) {
          setStatus("starting");
          appendLog("\n$ npm run dev\n");

          const devProcess = await container.spawn("npm", ["run", "dev"]);

          devProcess.output.pipeTo(
            new WritableStream({
              write(chunk) {
                appendLog(chunk);
              },
            }),
          );

          devProcessRef.current = devProcess;
        } else {
          // Server already running
          setStatus("ready");
        }
      } catch (err) {
        console.error(err);

        setStatus("error");
        setError(err instanceof Error ? err.message : "Unknown runtime error");
      }
    },
    [appendLog],
  );

  return {
    status,
    previewUrl,
    logs,
    error,
    run,
  };
}
