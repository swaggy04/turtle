"use client";

import { useEffect } from "react";
import type { GeneratedProject } from "@/services/ai-schema";
import { useWebContainer } from "./useWebContainer";

interface PreviewProps {
  project: GeneratedProject | null;
}

export default function Preview({ project }: PreviewProps) {
  const { status, previewUrl, logs, error, run } = useWebContainer();

  useEffect(() => {
    if (project) {
      run(project);
    }
  }, [project, run]);

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="flex items-center justify-between border-b px-4 py-2">
        <div className="font-medium">Live Preview</div>
        <span className="text-sm text-muted-foreground capitalize">
          {status}
        </span>
      </div>

      {/* Preview Area */}
      <div className="flex-1 overflow-hidden">
        {previewUrl ? (
          <iframe
            src={previewUrl}
            className="h-full w-full border-0"
            sandbox="allow-scripts allow-same-origin"
            title="WebContainer Preview"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            {status === "idle" && "Generate a project to start the preview."}
            {status === "booting" && "Booting WebContainer..."}
            {status === "mounting" && "Mounting project files..."}
            {status === "installing" && "Installing dependencies..."}
            {status === "starting" && "Starting development server..."}
            {status === "error" && (
              <span className="text-red-500">{error}</span>
            )}
          </div>
        )}
      </div>

      {/* Terminal Logs */}
      <div className="h-48 border-t bg-black p-3 font-mono text-xs text-green-400 overflow-auto whitespace-pre-wrap">
        {logs || "Waiting for logs..."}
      </div>
    </div>
  );
}