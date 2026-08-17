"use client";
import { useEffect, useState } from "react";
import type { RuntimeState } from "@/types/runtime";
import WebContainerManager from "./webcontainermanager";

const initialState: RuntimeState = {
  status: "idle",
  previewUrl: null,
  logs: [],
  error: null,
};

export function useRuntime() {
  const [runtime, setRuntime] = useState(initialState);

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      try {
        setRuntime((prev) => ({ ...prev, status: "booting" }));

        await WebContainerManager.getInstance();

        if (!cancelled) {
          setRuntime((prev) => ({ ...prev, status: "idle" }));
        }
      } catch (err) {
        if (!cancelled) {
          setRuntime((prev) => ({
            ...prev,
            status: "error",
            error: err instanceof Error ? err.message : "Boot failed",
          }));
        }
      }
    }

    boot();

    return () => {
      cancelled = true;
    };
  }, []);

  return runtime;
}
