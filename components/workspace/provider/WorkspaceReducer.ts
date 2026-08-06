
import { WorkspaceState } from "./workspace-types";
import { WorkspaceAction } from "./WorkspaceAction";

export function workspaceReducer(
  state: WorkspaceState,
  action: WorkspaceAction
): WorkspaceState {
  switch (action.type) {
    case "UPDATE_PROMPT":
      return {
        ...state,
        prompt: action.payload,
      };

    case "START_GENERATION":
      return {
        ...state,
        status: "generating",
      };

    case "SET_STATUS":
      return {
        ...state,
        status: action.payload,
      };

    case "REPLACE_FILES":
      return {
        ...state,
        files: action.payload,
      };

    case "UPDATE_FILE":
      return {
        ...state,
        files: {
          ...state.files,
          [action.payload.path]: {
            ...state.files[action.payload.path],
            code: action.payload.code,
          },
        },
      };

    case "SELECT_FILE":
      return {
        ...state,
        activeFile: action.payload,
      };

    case "SET_DEPENDENCIES":
      return {
        ...state,
        dependencies: action.payload,
      };

    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case "SET_RUNTIME_ERROR":
      return {
        ...state,
        runtime: {
          ...state.runtime,
          error: action.payload,
        },
      };

    default:
      return state;
  }
}