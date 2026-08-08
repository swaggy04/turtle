import {
  createContext,
  useContext,
  type Dispatch,
} from "react";

import type { WorkspaceState } from "./workspace-types";
import { WorkspaceAction } from "./WorkspaceAction";

interface WorkspaceContextValue {
  state: WorkspaceState;
  dispatch: Dispatch<WorkspaceAction>;
}

export const WorkspaceContext =
  createContext<WorkspaceContextValue | null>(null);

export function useWorkspace() {
  const context = useContext(WorkspaceContext);

  if (!context) {
    throw new Error(
      "useWorkspace must be used inside a WorkspaceProvider"
    );
  }

  return context;
}