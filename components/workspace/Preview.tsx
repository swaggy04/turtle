"use client";

import {
  SandpackProvider,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

import { useWorkspace } from "./provider/WorkspaceContext";

export function Preview() {
  const { state } = useWorkspace();

  const files = Object.fromEntries(
    Object.values(state.files).map((file) => [
      `/${file.path}`,
      {
        code: file.code,
      },
    ])
  );

  return (
    <div className="h-full w-full overflow-hidden bg-white">
      <SandpackProvider
        template="react"
        files={files}
        customSetup={{
          dependencies: state.dependencies,
        }}
      >
        <SandpackPreview
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </SandpackProvider>
    </div>
  );
}