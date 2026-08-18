"use client";

import { Monitor } from "lucide-react";
import { useRuntime } from "../runtime/useRuntime";

export default function Preview() {
  const { runtime } = useRuntime();

  const isRunning = runtime.status === "running" && runtime.previewUrl;

  return (
    <div className="flex h-full flex-col bg-zinc-950 text-zinc-100">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
        <Monitor className="h-5 w-5 text-emerald-400" />
        <h2 className="text-sm font-semibold tracking-wide">Turtle Runtime Preview</h2>
      </div>

      {isRunning ? (
        <div className="flex-1 overflow-hidden">
          <iframe
            src={runtime.previewUrl!}
            title="Turtle Preview"
            className="h-full w-full border-0 bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups allow-downloads"
          />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center shadow-lg">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800">
              <Monitor className="h-7 w-7 text-emerald-400" />
            </div>

            <h1 className="mb-2 text-xl font-semibold">
              {runtime.status === "idle"
                ? "Runtime Ready"
                : runtime.status === "mounting"
                  ? "Mounting Project..."
                  : runtime.status === "installing"
                    ? "Installing Dependencies..."
                    : runtime.status === "error"
                      ? "Runtime Error"
                      : "Starting Live Preview..."}
            </h1>

            <p className="mb-6 text-sm text-zinc-400">
              {runtime.status === "idle"
                ? "Waiting for a project to run."
                : runtime.status === "mounting"
                  ? "Copying files into the WebContainer filesystem."
                  : runtime.status === "installing"
                    ? "Running npm install inside the browser."
                    : runtime.status === "error"
                      ? "Something prevented the runtime from starting."
                      : "Launching the Next.js development server."}
            </p>

            <div className="space-y-3 rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-left">
              <StatusRow
                label="Runtime"
                value={runtime.status}
                color={
                  runtime.status === "mounting"
                    ? "text-blue-400"
                    : runtime.status === "installing"
                      ? "text-yellow-400"
                      : runtime.status === "running"
                        ? "text-green-400"
                        : runtime.status === "error"
                          ? "text-red-400"
                          : "text-zinc-400"
                }
              />

              <StatusRow
                label="Filesystem"
                value={
                  runtime.status === "idle" ? "Waiting" : runtime.status === "mounting" ? "Mounting..." : "Mounted"
                }
                color={
                  runtime.status === "mounting"
                    ? "text-blue-400"
                    : runtime.status === "idle"
                      ? "text-zinc-400"
                      : "text-green-400"
                }
              />

              <StatusRow
                label="Dependencies"
                value={
                  runtime.status === "installing"
                    ? "Installing..."
                    : runtime.status === "running"
                      ? "Installed"
                      : "Pending"
                }
                color={
                  runtime.status === "installing"
                    ? "text-yellow-400"
                    : runtime.status === "running"
                      ? "text-green-400"
                      : "text-zinc-400"
                }
              />

              <StatusRow
                label="Dev Server"
                value={runtime.status === "running" ? "Running" : "Not Running"}
                color={runtime.status === "running" ? "text-green-400" : "text-zinc-400"}
              />

              <StatusRow
                label="Preview URL"
                value={runtime.previewUrl ?? "—"}
                color={runtime.previewUrl ? "text-green-400" : "text-zinc-500"}
              />
            </div>

            {runtime.error && (
              <div className="mt-4 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                {runtime.error}
              </div>
            )}
          </div>
        </div>
      )}
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
