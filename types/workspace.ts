export type MessageRole = "user" | "assistant";

export interface Message {
  role: MessageRole;
  content: string;
  imageUrl?: string;
}

/**
 * This is the single source of truth for a generated app.
 * It gets saved in Prisma and passed directly to Sandpack.
 */
export interface Project {
  title: string;
  prompt: string;
  framework: "react";
  files: Record<string, string>;
}

export interface StatusStep {
  label: string;
  status: "running" | "done";
}

export interface WorkspaceData {
  id: string;
  title: string | null;
  messages: unknown; // Parsed into Message[]
  fileData: unknown; // Parsed into Project
}

export interface WorkspaceUser {
  id: string;
  credits: number;
  plan: string;
}
