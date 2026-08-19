export type MessageRole = "user" | "assistant";

export interface Message {
  role: MessageRole;
  content: string;
  imageUrl?: string;
}

// files + dependencies always travel together as one unit
// this is what gets saved to Prisma as a single Json column
export interface FileData {
  files: Record<string, { code: string }>;
  dependencies: Record<string, string>;
  title: string;
}

export interface StatusStep {
  label: string;
  status: "running" | "done";
}

export interface WorkspaceData {
  id: string;
  title: string | null;
  messages: unknown; // Prisma returns Json — we parse it
  fileData: unknown;
}

export interface WorkspaceUser {
  id: string;
}

export type WorkspaceStatus = "idle" | "planning" | "generating" | "ready" | "patching" | "error";
export type WorkspaceView = "code" | "preview";

export interface WorkspaceFile {
  path: string;
  code: string;
  language?: string;
}

export interface WorkspaceRuntime {
  compiling: boolean;
  error: string | null;
}

export interface WorkspaceState {
  prompt: string;
  status: WorkspaceStatus;
  files: Record<string, WorkspaceFile>;
  dependencies: Record<string, string>;
  activeFile: string | null;
  messages: Message[];
  provider: "ollama" | "gemini";
  model: string;
  runtime: WorkspaceRuntime;
  view: WorkspaceView;
}