"use client";

import {
  SandpackProvider,
  SandpackPreview,
  SandpackLayout,
} from "@codesandbox/sandpack-react";
import { useMemo } from "react";
import { useWorkspace } from "./provider/WorkspaceContext";

export function Preview() {
  const { state } = useWorkspace();

const sandpackFiles = useMemo(() => {
  const files: Record<string, { code: string; active?: boolean }> = {};

  Object.values(state.files).forEach((file) => {
    files[`/${file.path}`] = {
      code: file.code,
    };
  });

  if (state.activeFile) {
    const key = `/${state.activeFile}`;
    if (files[key]) {
      files[key].active = true;
    }
  }

  return files;
}, [state.files, state.activeFile]);

  if (Object.keys(sandpackFiles).length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-white/50">
        Waiting for generated files...
      </div>
    );
  }

  return (
    <div className="h-full overflow-hidden rounded-xl border border-white/10">
      <SandpackProvider
        template="nextjs"
        files={sandpackFiles}
         customSetup={{
    dependencies: state.dependencies,
  }}
        theme="dark"
      >
        <SandpackLayout style={{ height: "100%" }}>
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton
            style={{ height: "100%" }}
          />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}