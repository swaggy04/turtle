
export type RuntimeStatus =
  | "idle"
  | "mounting"
  | "installing"
  | "running"
  | "error";

export interface RuntimeState {
  status: RuntimeStatus;
  previewUrl: string | null;
  logs: string[];
  error: string | null;
}