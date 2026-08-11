"use client";

import { Code2, Eye } from "lucide-react";
import { useWorkspace } from "./provider/WorkspaceContext";

export function WorkspaceViewToggle() {
  const { state, dispatch } = useWorkspace();

  const isCode = state.view === "code";
  const isPreview = state.view === "preview";

  return (
    <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-white/3 p-1">
      <button
        type="button"
        onClick={() =>
          dispatch({
            type: "SET_VIEW",
            payload: "code",
          })
        }
        className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs transition-colors ${
          isCode
            ? "bg-white/10 text-white"
            : "text-white/40 hover:text-white"
        }`}
      >
        <Code2 className="h-3.5 w-3.5" />
        Code
      </button>

      <button
        type="button"
        onClick={() =>
          dispatch({
            type: "SET_VIEW",
            payload: "preview",
          })
        }
        className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs transition-colors ${
          isPreview
            ? "bg-white/10 text-white"
            : "text-white/40 hover:text-white"
        }`}
      >
        <Eye className="h-3.5 w-3.5" />
        Preview
      </button>
    </div>
  );
}