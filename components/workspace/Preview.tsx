"use client";

import { useWorkspace } from "./provider/WorkspaceContext";

export function Preview() {
  const { state } = useWorkspace();

  return (
    <div className="h-full w-full overflow-hidden bg-white">
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Preview
          </p>

          <p className="mt-2 text-xs text-gray-400">
            {Object.keys(state.files).length} files generated
          </p>
        </div>
      </div>
    </div>
  );
}