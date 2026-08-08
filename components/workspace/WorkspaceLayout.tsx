"use client";

import { useEffect, useRef } from "react";
import { useWorkspace } from "./provider/WorkspaceContext";
import { GenerateWorkspace } from "./generateWorkspace";

const WorkspaceClient = () => {
  const { state, dispatch } = useWorkspace();

  // Prevent the same prompt from triggering
  // Gemini more than once during the client lifecycle.
  const generationStartedRef = useRef<string | null>(null);

  useEffect(() => {
    const prompt = state.prompt.trim();

    // No prompt → nothing to generate
    if (!prompt) {
      return;
    }

    // Don't generate if generation has already started
    if (state.status !== "idle") {
      return;
    }

    // Prevent duplicate generation for the same prompt
    if (generationStartedRef.current === prompt) {
      return;
    }

    // Mark this prompt as being generated
    generationStartedRef.current = prompt;

    async function generate() {
      dispatch({
        type: "START_GENERATION",
      });

      try {
        const project = await GenerateWorkspace(prompt);

        // Convert the generated files array into
        // a record indexed by file path.
        const files = Object.fromEntries(
          project.files.map((file) => [
            file.path,
            file,
          ])
        );

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
        console.error(
          "Workspace generation failed:",
          error
        );

        dispatch({
          type: "SET_STATUS",
          payload: "error",
        });
      }
    }

    generate();
  }, [state.prompt, state.status, dispatch]);

  return (
    <div className="flex h-full overflow-hidden">
      {/* ========================= */}
      {/* Chat Panel */}
      {/* ========================= */}

      <aside className="flex w-[400px] shrink-0 flex-col border-r border-white/10">
        {/* Chat Header */}
        <div className="border-b border-white/10 px-6 py-4">
          <p className="text-sm font-medium text-white">
            Turtle
          </p>

          <p className="mt-1 text-xs text-white/40">
            AI workspace
          </p>
        </div>

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Prompt */}
          <div>
            <p className="text-xs text-white/40">
              Prompt
            </p>

            <p className="mt-2 text-sm leading-6 text-white">
              {state.prompt}
            </p>
          </div>

          {/* Status */}
          <div className="mt-8">
            <p className="text-xs text-white/40">
              Status
            </p>

            <p className="mt-2 text-sm text-white">
              {state.status}
            </p>
          </div>

          {/* Generating */}
          {state.status === "generating" && (
            <div className="mt-8">
              <p className="text-sm text-white/50">
                Turtle is building your application...
              </p>
            </div>
          )}

          {/* Error */}
          {state.status === "error" && (
            <div className="mt-8">
              <p className="text-sm text-red-400">
                Something went wrong while generating
                your application.
              </p>
            </div>
          )}

          {/* Ready */}
          {state.status === "ready" && (
            <div className="mt-8">
              <p className="text-xs text-white/40">
                Generation
              </p>

              <p className="mt-2 text-sm text-emerald-400">
                Application generated successfully.
              </p>
            </div>
          )}
        </div>

        {/* Chat Input Placeholder */}
        <div className="border-t border-white/10 p-4">
          <p className="text-xs text-white/30">
            Chat input coming next...
          </p>
        </div>
      </aside>

      {/* ========================= */}
      {/* Code Panel */}
      {/* ========================= */}

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden bg-[#0a0a0a]">
        {/* Code Header */}
        <div className="flex h-12 shrink-0 items-center border-b border-white/10 px-4">
          <span className="text-sm text-white/60">
            Generated Files
          </span>
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Generating */}
          {state.status === "generating" && (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-white/30">
                Generating application...
              </p>
            </div>
          )}

          {/* Error */}
          {state.status === "error" && (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-red-400">
                Generation failed.
              </p>
            </div>
          )}

          {/* Ready */}
          {state.status === "ready" && (
            <div>
              <div className="mb-6">
                <p className="text-sm text-white">
                  {Object.keys(state.files).length} files
                  generated
                </p>

                <p className="mt-1 text-xs text-white/30">
                  These files were generated by Gemini.
                </p>
              </div>

              {/* File List */}
              <div className="space-y-2">
                {Object.keys(state.files).map(
                  (path) => (
                    <div
                      key={path}
                      className="rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 transition-colors hover:bg-white/[0.05]"
                    >
                      <p className="font-mono text-xs text-white/60">
                        {path}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Idle */}
          {state.status === "idle" && (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-white/30">
                Waiting for generation...
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default WorkspaceClient;