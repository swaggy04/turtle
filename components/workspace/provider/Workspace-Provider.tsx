"use client";

import { useReducer, type ReactNode } from "react";
import { initialWorkspaceState } from "./initial";
import { workspaceReducer } from "./WorkspaceReducer";
import { WorkspaceContext } from "./WorkspaceContext";

interface WorkspaceProviderProps {
  children: ReactNode;
  initialPrompt?: string;
}

export function WorkspaceProvider({
  children,
}: WorkspaceProviderProps) {
  const [state, dispatch] = useReducer(
    workspaceReducer,
    initialWorkspaceState
  );

  return (
    <WorkspaceContext.Provider value={{ state, dispatch }}>
      {children}
    </WorkspaceContext.Provider>
  );
}