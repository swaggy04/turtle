"use client";

import { FileCode2, FileJson, FileText } from "lucide-react";
import { useWorkspace } from "./provider/WorkspaceContext";

function getFileIcon(path: string) {
  if (path.endsWith(".json")) {
    return <FileJson className="h-4 w-4" />;
  }

  if (
    path.endsWith(".tsx") ||
    path.endsWith(".ts") ||
    path.endsWith(".jsx") ||
    path.endsWith(".js")
  ) {
    return <FileCode2 className="h-4 w-4" />;
  }

  return <FileText className="h-4 w-4" />;
}

export function FileExplorer() {
  const { state, dispatch } = useWorkspace();

  const files = Object.values(state.files);

  const handleFileSelect = (path: string) => {
    dispatch({
      type: "SELECT_FILE",
      payload: path,
    });
  };

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-white/10 bg-[#0a0a0a]">
      {/* Header */}
      <div className="flex h-12 items-center border-b border-white/10 px-4">
        <span className="text-xs font-medium uppercase tracking-wider text-white/50">
          Explorer
        </span>
      </div>

      {/* Files */}
      <div className="flex-1 overflow-y-auto p-2">
        {files.length === 0 ? (
          <div className="px-2 py-4">
            <p className="text-xs text-white/30">
              No files generated yet.
            </p>
          </div>
        ) : (
          <div className="space-y-0.5">
            {files.map((file) => {
              const isActive =
                state.activeFile === file.path;

              return (
                <button
                  key={file.path}
                  type="button"
                  onClick={() =>
                    handleFileSelect(file.path)
                  }
                  className={`flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left transition-colors ${
                    isActive
                      ? "bg-white/10 text-white"
                      : "text-white/50 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {getFileIcon(file.path)}

                  <span className="truncate font-mono text-xs">
                    {file.path}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}