import type { WorkspaceState } from "./workspace-types";

export const initialWorkspaceState: WorkspaceState = {
  prompt: "",

  status: "idle",

  files: {},

  dependencies: {},

  activeFile: null,

  messages: [],
  provider: "ollama",
  model: "qwen2.5-coder:3b",
  runtime: {
    compiling: false,
    error: null,
  },
  view: "code",
};
