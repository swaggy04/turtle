"use client";

import { AVAILABLE_MODELS } from "@/services/ai/models";
import { useWorkspace } from "./provider/WorkspaceContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export function ModelSelector() {
  const { state, dispatch } = useWorkspace();

  return (
    <Select
      value={state.model}
      onValueChange={(model) => {
        const selected = AVAILABLE_MODELS.find((m) => m.id === model);
        if (!selected) return;

        dispatch({
          type: "SET_MODEL",
          payload: {
            provider: selected.provider,
            model: selected.id,
          },
        });
      }}
    >
      <SelectTrigger className="h-8 w-[210px] border-white/10 bg-[#111] text-white">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {AVAILABLE_MODELS.map((model) => (
          <SelectItem key={model.id} value={model.id}>
            {model.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
