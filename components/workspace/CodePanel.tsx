"use client";

import { useState } from "react";

export function CodePanel() {
  const [view, setView] = useState<"code" | "preview">("code");

  return (
    <section className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[#0a0a0a]">
      {/* Top bar */}
      <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/10 px-4">
        <span className="text-sm text-white/40">
          {view === "code" ? "Code Editor" : "Preview"}
        </span>

        {/* View toggle */}
        <div className="flex items-center gap-1 rounded-lg bg-white/5 p-1">
          <button
            onClick={() => setView("code")}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              view === "code"
                ? "bg-white/10 text-white"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            Code
          </button>
          <button
            onClick={() => setView("preview")}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
              view === "preview"
                ? "bg-white/10 text-white"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="min-h-0 flex-1 overflow-hidden">
        {view === "code" ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-white/30">Code editor will appear here.</p>
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-white/30">Preview will appear here.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
