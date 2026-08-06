import type {
  WorkspaceFile,
  WorkspaceMessage,
  WorkspaceStatus,
} from "./workspace-types";

export type WorkspaceAction =
  | {
      type: "UPDATE_PROMPT";
      payload: string;
    }
  | {
      type: "START_GENERATION";
    }
  | {
      type: "SET_STATUS";
      payload: WorkspaceStatus;
    }
  | {
      type: "REPLACE_FILES";
      payload: Record<string, WorkspaceFile>;
    }
  | {
      type: "UPDATE_FILE";
      payload: {
        path: string;
        code: string;
      };
    }
  | {
      type: "SELECT_FILE";
      payload: string;
    }
  | {
      type: "SET_DEPENDENCIES";
      payload: Record<string, string>;
    }
  | {
      type: "ADD_MESSAGE";
      payload: WorkspaceMessage;
    }
  | {
      type: "SET_RUNTIME_ERROR";
      payload: string | null;
    };