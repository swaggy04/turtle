"use client";

import { Monitor } from "lucide-react";

export default function Preview() {
  return (
    <div className="flex h-full flex-col bg-zinc-950 text-zinc-100">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
        <Monitor className="h-5 w-5 text-emerald-400" />
        <h2 className="text-sm font-semibold tracking-wide">Turtle Runtime Preview</h2>
      </div>

      {/* Placeholder */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-lg rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-center shadow-lg">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-zinc-800">
            <Monitor className="h-7 w-7 text-emerald-400" />
          </div>

          <h1 className="mb-2 text-xl font-semibold">Runtime Foundation Ready</h1>

          <p className="mb-6 text-sm text-zinc-400">
            The preview panel is connected to Turtle, but the WebContainer runtime hasnt been booted yet. In Phase 2,
            this panel will start showing the live Next.js preview.
          </p>

          {/* Future runtime status */}
          <div className="space-y-3 rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-left">
            <StatusRow label="Runtime" value="Not Booted" color="text-yellow-400" />
            <StatusRow label="Filesystem" value="Not Mounted" color="text-zinc-400" />
            <StatusRow label="Dependencies" value="Not Installed" color="text-zinc-400" />
            <StatusRow label="Dev Server" value="Not Running" color="text-zinc-400" />
            <StatusRow label="Preview URL" value="—" color="text-zinc-500" />
          </div>
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
