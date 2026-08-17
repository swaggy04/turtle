"use client";

import { Monitor } from "lucide-react";
import { useRuntime } from "../runtime/useRuntime";

export default function Preview() {
  const runtime = useRuntime();

  return (
    <div className="flex h-full flex-col bg-zinc-950 text-zinc-100">
      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
        <Monitor className="h-5 w-5 text-emerald-400" />
        <h2 className="text-sm font-semibold tracking-wide">Turtle Runtime Preview</h2>
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center shadow-lg">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800">
            <Monitor className="h-7 w-7 text-emerald-400" />
          </div>

          <h1 className="mb-2 text-xl font-semibold">
            {runtime.status === "booting"
              ? "Booting WebContainer..."
              : runtime.status === "error"
                ? "Boot Failed"
                : "Runtime Ready"}
          </h1>

          <p className="mb-6 text-sm text-zinc-400">
            The preview panel is connected to Turtle. The runtime status below is now driven by the actual WebContainer
            lifecycle.
          </p>

          <div className="space-y-3 rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-left">
            <StatusRow
              label="Runtime"
              value={runtime.status}
              color={
                runtime.status === "booting"
                  ? "text-yellow-400"
                  : runtime.status === "error"
                    ? "text-red-400"
                    : "text-green-400"
              }
            />
            <StatusRow label="Filesystem" value="Not Mounted" color="text-zinc-400" />
            <StatusRow label="Dependencies" value="Not Installed" color="text-zinc-400" />
            <StatusRow label="Dev Server" value="Not Running" color="text-zinc-400" />
            <StatusRow label="Preview URL" value={runtime.previewUrl ?? "—"} color="text-zinc-500" />
          </div>

          {runtime.error && (
            <div className="mt-4 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
              {runtime.error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-800 pb-2 last:border-none last:pb-0">
      <span className="text-sm text-zinc-400">{label}</span>
      <span className={`text-sm font-medium ${color}`}>{value}</span>
    </div>
  );
}
