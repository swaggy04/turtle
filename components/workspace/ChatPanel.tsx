"use client";

import { useState } from "react";

export function ChatPanel() {
  const [status] = useState<"idle" | "generating" | "ready">("idle");

  return (
    <aside className="flex h-full w-[400px] shrink-0 flex-col border-r border-white/10 bg-[#0a0a0a]">
      {/* Header */}
      <div className="flex h-16 shrink-0 items-center border-b border-white/10 px-6">
        <div>
          <p className="text-sm font-medium text-white">Turtle</p>
          <p className="mt-1 text-xs text-white/40">AI workspace</p>
        </div>
      </div>

      {/* Body */}
      <div className="min-h-0 flex-1 overflow-y-auto p-6">
        <div>
          <p className="text-xs text-white/40">Prompt</p>
          <p className="mt-2 text-sm leading-6 text-white/60 italic">
            No prompt provided
          </p>
        </div>

        <div className="mt-8">
          <p className="text-xs text-white/40">Status</p>
          <p className="mt-2 text-sm text-white capitalize">{status}</p>
        </div>

        {status === "ready" && (
          <div className="mt-8">
            <p className="text-xs text-white/40">Generation</p>
            <p className="mt-2 text-sm text-emerald-400">Application ready.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="shrink-0 border-t border-white/10 p-4">
        <div className="space-y-3">
          {/* Model selector placeholder */}
          <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
            <span className="text-xs text-white/40">Model</span>
            <span className="text-xs text-white/60">qwen2.5-coder:3b</span>
          </div>

          <button
            type="button"
            className="w-full rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Reset
          </button>
        </div>
      </div>
    </aside>
  );
}
