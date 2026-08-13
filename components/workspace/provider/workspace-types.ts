import { AIProviderName } from "@/services/ai/provider";

/**
 * Current generation lifecycle of a workspace.
 */
export type WorkspaceStatus = "idle" | "planning" | "generating" | "ready" | "patching" | "error";

export type WorkspaceView = "code" | "preview";
/**
 * A single source file inside the workspace.
 */
export interface WorkspaceFile {
  path: string;
  code: string;
  language: string;
}

/**
 * A chat message exchanged between the user and AI.
 */
export interface WorkspaceMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: Date;
}

/**
 * Runtime information for the current workspace.
 */
export interface WorkspaceRuntime {
  compiling: boolean;
  error: string | null;
}

/**
 * Complete in-memory representation of a workspace.
 */
export interface WorkspaceState {
  prompt: string;

  status: WorkspaceStatus;

  files: Record<string, WorkspaceFile>;

  dependencies: Record<string, string>;
  provider: AIProviderName;
  model: string;

  activeFile: string | null;

  messages: WorkspaceMessage[];

  runtime: WorkspaceRuntime;

  view: WorkspaceView;
}
