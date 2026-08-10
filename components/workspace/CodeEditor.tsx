"use client";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { css } from "@codemirror/lang-css";
import { markdown } from "@codemirror/lang-markdown";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

import type { WorkspaceFile } from "./provider/workspace-types";

interface CodeEditorProps {
  file: WorkspaceFile | null;
}

function getLanguageExtension(path: string) {
  if (path.endsWith(".tsx")) {
    return javascript({
      jsx: true,
      typescript: true,
    });
  }

  if (path.endsWith(".ts")) {
    return javascript({
      typescript: true,
    });
  }

  if (path.endsWith(".jsx")) {
    return javascript({
      jsx: true,
    });
  }

  if (path.endsWith(".js")) {
    return javascript();
  }

  if (path.endsWith(".json")) {
    return json();
  }

  if (path.endsWith(".css")) {
    return css();
  }

  if (path.endsWith(".md")) {
    return markdown();
  }

  return null;
}

export function CodeEditor({ file }: CodeEditorProps) {
  if (!file) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-white/30">Select a file to start editing</p>
      </div>
    );
  }

  const language = getLanguageExtension(file.path);

  return (
    <div className="h-full w-full">
      <CodeMirror
        value={file.code}
        height="100%"
        theme={vscodeDark}
        extensions={language ? [language] : []}
        basicSetup={{
          lineNumbers: true,
          foldGutter: true,
          highlightActiveLine: true,
          autocompletion: true,
        }}
      />
    </div>
  );
}
