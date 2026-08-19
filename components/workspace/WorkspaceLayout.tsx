"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useWorkspace } from "./provider/WorkspaceContext";
import { ChatPanel } from "./ChatPanel";
import { CodePanel } from "./CodePanel";
import type { AIProviderName } from "@/services/ai/types";

export default function WorkspaceClient() {
  return <WorkspaceContent />;
}

function WorkspaceContent() {
  const { dispatch } = useWorkspace();
  const searchParams = useSearchParams();

  useEffect(() => {
    const prompt = searchParams.get("prompt") ?? "";
    const provider = (searchParams.get("provider") as AIProviderName | null) ?? "ollama";
    const model = searchParams.get("model") ?? "qwen2.5-coder:3b";

    if (prompt) {
      dispatch({
        type: "UPDATE_PROMPT",
        payload: prompt,
      });
    }

    dispatch({
      type: "SET_MODEL",
      payload: {
        provider,
        model,
      },
    });
  }, [dispatch, searchParams]);

  return (
    <div className="flex h-full min-h-0 w-full overflow-hidden bg-[#0a0a0a]">
      <ChatPanel />
      <CodePanel />
    </div>
  );
}
