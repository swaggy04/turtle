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

  // Convert workspace files into Sandpack's virtual filesystem.
  const sandpackFiles = useMemo(() => {
    const files: Record<string, { code: string; active?: boolean }> = {};

    Object.values(state.files).forEach((file) => {
      files[`/${file.path}`] = {
        code: file.code,
      };
    });

    if (state.activeFile) {
      const activeKey = `/${state.activeFile}`;
      if (files[activeKey]) {
        files[activeKey].active = true;
      }
    }

    return files;
  }, [state.files, state.activeFile]);

  // Force Sandpack to recreate the project whenever the generated files change.
  const sandpackKey = useMemo(() => {
    return Object.values(state.files)
      .map((file) => `${file.path}:${file.code.length}`)
      .sort()
      .join("|");
  }, [state.files]);

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
        key={sandpackKey}
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