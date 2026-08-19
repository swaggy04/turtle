"use client";

import { Monitor, Code2, Play } from "lucide-react";
import { useWorkspace } from "../provider/WorkspaceContext";

export default function Preview() {
  const { state } = useWorkspace();
  const fileCount = Object.keys(state.files).length;

  return (
    <div className="flex h-full flex-col bg-zinc-950 text-zinc-100">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <Monitor className="h-5 w-5 text-emerald-400" />
          <h2 className="text-sm font-semibold tracking-wide">
            Application Live Preview
          </h2>
        </div>
        <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-400 border border-emerald-500/20">
          {fileCount} generated files ready
        </span>
      </div>

      {/* Main Preview Container */}
      <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
        <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <Play className="h-7 w-7 text-emerald-400" />
          </div>

          <h3 className="mb-2 text-xl font-bold text-white">
            Ready to Render
          </h3>

          <p className="mb-6 text-sm text-zinc-400 leading-relaxed">
            Your application code has been generated. Switch between Code Editor and Preview to inspect generated Next.js component structures.
          </p>

          <div className="space-y-3.5 rounded-lg border border-zinc-800/80 bg-zinc-950 p-4 text-left font-mono text-xs">
            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2">
              <span className="text-zinc-500">Status:</span>
              <span className="text-emerald-400 font-semibold">{state.status}</span>
            </div>
            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2">
              <span className="text-zinc-500">Files Built:</span>
              <span className="text-zinc-300">{fileCount} files</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">Selected Provider:</span>
              <span className="text-zinc-300 uppercase">{state.provider}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
