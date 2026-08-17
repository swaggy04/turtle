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
        // Tell the UI that boot has started
        setRuntime((prev) => ({
          ...prev,
          status: "booting",
        }));

        // Get (or create) the single WebContainer instance
        await WebContainerManager.getInstance();

        // Don't update state if the component has already unmounted
        if (!cancelled) {
          setRuntime((prev) => ({
            ...prev,
            status: "idle", // We'll later change this to "ready"
          }));
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
