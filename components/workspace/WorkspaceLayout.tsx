"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";

import { useWorkspace } from "./provider/WorkspaceContext";
import { GenerateWorkspace } from "./generateWorkspace";

import { FileExplorer } from "./FileExplorer";
import { CodeEditor } from "./CodeEditor";
import { WorkspaceViewToggle } from "./WorkspaceViewToggle";
import { ModelSelector } from "./ModelSelector";
import Preview from "./preview/Preview";
import type { AIProviderName } from "@/services/ai/types";

export default function WorkspaceClient() {
  return <WorkspaceContent />;
}

function WorkspaceContent() {
  const { state, dispatch } = useWorkspace();
  const searchParams = useSearchParams();

  const generationStartedRef = useRef<string | null>(null);

  useEffect(() => {
    const prompt = searchParams.get("prompt") ?? "";
    const provider = (searchParams.get("provider") as AIProviderName | null) ?? "ollama";
    const model = searchParams.get("model") ?? "qwen2.5-coder:3b";

    dispatch({
      type: "UPDATE_PROMPT",
      payload: prompt,
    });

    dispatch({
      type: "SET_MODEL",
      payload: {
        provider,
        model,
      },
    });
  }, [dispatch, searchParams]);

  useEffect(() => {
    const prompt = state.prompt.trim();

    if (!prompt) return;
    if (state.status !== "idle") return;
    if (generationStartedRef.current === prompt) return;

    generationStartedRef.current = prompt;

    async function generate() {
      dispatch({ type: "START_GENERATION" });

      try {
        const project = await GenerateWorkspace({
          prompt,
          provider: state.provider,
          model: state.model,
        });

        const files = Object.fromEntries(project.files.map((file) => [file.path, file]));

        dispatch({
          type: "REPLACE_FILES",
          payload: files,
        });

        dispatch({
          type: "SET_DEPENDENCIES",
          payload: project.dependencies,
        });

        dispatch({
          type: "SET_STATUS",
          payload: "ready",
        });
      } catch (error) {
        console.error("Workspace generation failed:", error);

        dispatch({
          type: "SET_STATUS",
          payload: "error",
        });
      }
    }

    generate();
  }, [state.prompt, state.provider, state.model, state.status, dispatch]);


  const activeFile = state.activeFile ? state.files[state.activeFile] : null;


  return (
    <div className="flex h-full min-h-0 w-full overflow-hidden">
      {/* Chat Panel */}
      <aside className="flex h-full w-[400px] shrink-0 flex-col border-r border-white/10">
        <div className="flex h-16 shrink-0 items-center border-b border-white/10 px-6">
          <div>
            <p className="text-sm font-medium text-white">Turtle</p>
            <p className="mt-1 text-xs text-white/40">AI workspace</p>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          <div>
            <p className="text-xs text-white/40">Prompt</p>
            <p className="mt-2 text-sm leading-6 text-white">{state.prompt}</p>
          </div>

          <div className="mt-8">
            <p className="text-xs text-white/40">Status</p>
            <p className="mt-2 text-sm text-white">{state.status}</p>
          </div>

          {state.status === "generating" && (
            <div className="mt-8">
              <p className="text-sm text-white/50">Turtle is building your application...</p>
            </div>
          )}

          {state.status === "error" && (
            <div className="mt-8">
              <p className="text-sm text-red-400">Something went wrong while generating your application.</p>
            </div>
          )}

          {state.status === "ready" && (
            <div className="mt-8">
              <p className="text-xs text-white/40">Generation</p>
              <p className="mt-2 text-sm text-emerald-400">Application generated successfully.</p>
            </div>
          )}
        </div>

        <div className="shrink-0 border-t border-white/10 p-4">
          <div className="space-y-3">
            <ModelSelector />

            <button
              className="w-full rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90"
              onClick={() => {
                generationStartedRef.current = null;

                dispatch({
                  type: "SET_STATUS",
                  payload: "idle",
                });
              }}
            >
              Regenerate
            </button>
          </div>
        </div>
      </aside>

      {/* Main Workspace */}
      <section className="flex min-w-0 flex-1 overflow-hidden">
        <FileExplorer />

        <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[#0a0a0a]">
          <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/10 px-4">
            <div className="min-w-0">
              {state.view === "code" && activeFile ? (
                <span className="block truncate font-mono text-xs text-white/60">{activeFile.path}</span>
              ) : (
                <span className="text-sm text-white/40">{state.view === "code" ? "Code Editor" : "Preview"}</span>
              )}
            </div>

            <WorkspaceViewToggle />
          </div>

          <div className="min-h-0 flex-1 overflow-hidden">
            {state.status === "generating" && (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-white/30">Generating application...</p>
              </div>
            )}

            {state.status === "error" && (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-red-400">Generation failed.</p>
              </div>
            )}

            {state.status === "idle" && (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-white/30">Waiting for generation...</p>
              </div>
            )}

            {state.status === "ready" && (
              <>
                {state.view === "code" ? (
                  activeFile ? (
                    <CodeEditor file={activeFile} />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center">
                        <p className="text-sm text-white/50">Select a file to view its code.</p>
                        <p className="mt-2 text-xs text-white/30">Choose a file from the explorer.</p>
                      </div>
                    </div>
                  )
                ) : (
                  <Preview />
                )}
              </>
            )}
          </div>
        </main>
      </section>
    </div>
  );
}
