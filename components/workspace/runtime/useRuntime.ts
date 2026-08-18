"use client";

import { useState, useCallback } from "react";

import { mountProject } from "./mountProject";
import { installDependencies } from "./installDependencies";
import { startDevServer } from "./startDevServer";

import type { GeneratedProject } from "@/services/ai-schema";
import type { RuntimeState } from "@/types/runtime";

const initialState: RuntimeState = {
  status: "idle",
  previewUrl: null,
  logs: [],
  error: null,
};

export function useRuntime() {
  const [runtime, setRuntime] = useState(initialState);

  const start = useCallback(async (project: GeneratedProject) => {
    try {
      setRuntime({
        status: "mounting",
        previewUrl: null,
        logs: [],
        error: null,
      });

      await mountProject(project);

      setRuntime((prev) => ({
        ...prev,
        status: "installing",
      }));

      await installDependencies();

      const previewUrl = await startDevServer((log) => {
        setRuntime((prev) => ({
          ...prev,
          logs: [...prev.logs, log],
        }));
      });

      setRuntime((prev) => ({
        ...prev,
        status: "running",
        previewUrl,
      }));
    } catch (err) {
      setRuntime((prev) => ({
        ...prev,
        status: "error",
        error: err instanceof Error ? err.message : "Runtime failed",
      }));
    }
  }, []);

  return {
    runtime,
    start,
  };
}
