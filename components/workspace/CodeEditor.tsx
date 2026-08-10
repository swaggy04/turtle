"use client";

import Editor from "@monaco-editor/react";
import { WorkspaceFile } from "./provider/workspace-types";

interface CodeEditorProps {
  file: WorkspaceFile | null;
}

export function CodeEditor({ file }: CodeEditorProps) {
  if (!file) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-white/30">
          Select a file to start editing
        </p>
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <Editor
        height="100%"
        language={file.language}
        value={file.code}
        theme="vs-dark"
        options={{
          minimap: {
            enabled: true,
          },
          fontSize: 14,
          padding: {
            top: 16,
          },
          automaticLayout: true,
        }}
      />
    </div>
  );
}