import { RuntimeState } from "@/types/runtime";
import { useState } from "react";

const initialState: RuntimeState = {
  status: "idle",
  previewUrl: null,
  logs: [],
  error: null,
};


export function useRuntime(){
    const [runtime, setRuntime] = useState(initialState)
}