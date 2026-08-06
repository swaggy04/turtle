import type { WorkspaceState } from "./workspace-types";

export const initialWorkspaceState: WorkspaceState = {
  prompt: "",

  status: "idle",

  files: {},

  dependencies: {},

  activeFile: null,

  messages: [],

  runtime: {
    compiling: false,
    error: null,
  },
};