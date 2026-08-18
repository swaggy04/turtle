"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

import { mountProject } from "./mountProject";
import { installDependencies } from "./installDependencies";
import { startDevServer } from "./startDevServer";

import type { GeneratedProject } from "@/services/ai-schema";
import type { RuntimeState } from "@/types/runtime";

type RuntimeContextValue = {
  runtime: RuntimeState;
  start: (project: GeneratedProject) => Promise<void>;
};

const RuntimeContext = createContext<RuntimeContextValue | null>(null);

const initialState: RuntimeState = {
  status: "idle",
  previewUrl: null,
  logs: [],
  error: null,
};

export function RuntimeProvider({
  children,
}: {
  children: ReactNode;
}) {
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

  return (
    <RuntimeContext.Provider value={{ runtime, start }}>
      {children}
    </RuntimeContext.Provider>
  );
}

export function useRuntime() {
  const context = useContext(RuntimeContext);

  if (!context) {
    throw new Error("useRuntime must be used inside RuntimeProvider.");
  }

  return context;
}