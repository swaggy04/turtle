"use client";

import { useEffect, useRef } from "react";
import { useWorkspace } from "./provider/WorkspaceContext";
import { GenerateWorkspace } from "./generateWorkspace";
import { FileExplorer } from "./FileExplorer";
import { CodeEditor } from "./CodeEditor";
import { WorkspaceViewToggle } from "./WorkspaceViewToggle";

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

        // Convert generated files array into
        // a record indexed by file path.
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
  }, [state.prompt, state.status, dispatch]);

  /*
   * Find currently selected file.
   *
   * state.activeFile
   *      ↓
   * "components/Header.tsx"
   *      ↓
   * state.files[state.activeFile]
   */
  const activeFile = state.activeFile ? state.files[state.activeFile] : null;

  return (
    <div className="flex h-full min-h-0 w-full overflow-hidden">
      {/* ================================================= */}
      {/* CHAT PANEL */}
      {/* ================================================= */}

      <aside className="flex h-full min-h-0 w-[400px] shrink-0 flex-col border-r border-white/10">
        {/* Chat Header */}
        <div className="flex h-16 shrink-0 items-center border-b border-white/10 px-6">
          <div>
            <p className="text-sm font-medium text-white">Turtle</p>

            <p className="mt-1 text-xs text-white/40">AI workspace</p>
          </div>
        </div>

        {/* Chat Content */}
        <div className="min-h-0 flex-1 overflow-y-auto p-6">
          {/* Prompt */}
          <div>
            <p className="text-xs text-white/40">Prompt</p>

            <p className="mt-2 text-sm leading-6 text-white">{state.prompt}</p>
          </div>

          {/* Status */}
          <div className="mt-8">
            <p className="text-xs text-white/40">Status</p>

            <p className="mt-2 text-sm text-white">{state.status}</p>
          </div>

          {/* Generating */}
          {state.status === "generating" && (
            <div className="mt-8">
              <p className="text-sm text-white/50">Turtle is building your application...</p>
            </div>
          )}

          {/* Error */}
          {state.status === "error" && (
            <div className="mt-8">
              <p className="text-sm text-red-400">Something went wrong while generating your application.</p>
            </div>
          )}

          {/* Ready */}
          {state.status === "ready" && (
            <div className="mt-8">
              <p className="text-xs text-white/40">Generation</p>

              <p className="mt-2 text-sm text-emerald-400">Application generated successfully.</p>
            </div>
          )}
        </div>

        {/* Chat Input */}
        <div className="flex h-14 shrink-0 items-center border-t border-white/10 px-4">
          <p className="text-xs text-white/30">Chat input coming next...</p>
        </div>
      </aside>

      {/* ================================================= */}
      {/* MAIN WORKSPACE */}
      {/* ================================================= */}

      <section className="flex h-full min-h-0 min-w-0 flex-1 overflow-hidden">
        {/* ================================================= */}
        {/* FILE EXPLORER */}
        {/* ================================================= */}

        <FileExplorer />

        {/* ================================================= */}
        {/* EDITOR / PREVIEW */}
        {/* ================================================= */}

        <main className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[#0a0a0a]">
          {/* Editor Header */}

          <div className="flex h-12 shrink-0 items-center justify-between border-b border-white/10 px-4">
            {/* Current File */}

            <div className="min-w-0">
              {state.view === "code" && activeFile ? (
                <span className="block truncate font-mono text-xs text-white/60">{activeFile.path}</span>
              ) : (
                <span className="text-sm text-white/40">{state.view === "code" ? "Code Editor" : "Preview"}</span>
              )}
            </div>

            {/* Code / Preview */}

            <WorkspaceViewToggle />
          </div>

          {/* ================================================= */}
          {/* CONTENT */}
          {/* ================================================= */}

          <div className="min-h-0 flex-1 overflow-hidden">
            {/* --------------------------------------------- */}
            {/* GENERATING */}
            {/* --------------------------------------------- */}

            {state.status === "generating" && (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-white/30">Generating application...</p>
              </div>
            )}

            {/* --------------------------------------------- */}
            {/* ERROR */}
            {/* --------------------------------------------- */}

            {state.status === "error" && (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-red-400">Generation failed.</p>
              </div>
            )}

            {/* --------------------------------------------- */}
            {/* IDLE */}
            {/* --------------------------------------------- */}

            {state.status === "idle" && (
              <div className="flex h-full items-center justify-center">
                <p className="text-sm text-white/30">Waiting for generation...</p>
              </div>
            )}

            {/* --------------------------------------------- */}
            {/* READY */}
            {/* --------------------------------------------- */}

            {state.status === "ready" && (
              <>
                {/* ========================= */}
                {/* CODE VIEW */}
                {/* ========================= */}

                {state.view === "code" && (
                  <>
                    {!activeFile ? (
                      <div className="flex h-full items-center justify-center">
                        <div className="text-center">
                          <p className="text-sm text-white/50">Select a file to view its code.</p>

                          <p className="mt-2 text-xs text-white/30">Choose a file from the explorer.</p>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full w-full overflow-hidden">
                        <CodeEditor file={activeFile} />
                      </div>
                    )}
                  </>
                )}

                {/* ========================= */}
                {/* PREVIEW VIEW */}
                {/* ========================= */}

                {state.view === "preview" && (
                  <div className="h-full w-full overflow-hidden bg-white">
                    <div className="flex h-full items-center justify-center">
                      <div className="text-center">
                        <p className="text-sm text-black/60">Preview</p>

                        <p className="mt-2 text-xs text-black/40">Your generated application will appear here.</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </main>
      </section>
    </div>
  );
};

export default WorkspaceClient;
