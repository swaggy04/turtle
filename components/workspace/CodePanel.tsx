"use client";

import { FileData, StatusStep } from "@/types/workspace";
import { useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { dracula } from "@codesandbox/sandpack-themes";
const PLACEHOLDER_FILES = {
  "/App.js": {
    code: `export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "system-ui, sans-serif",
    }}>
      <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)" }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>⚡</div>
        <p style={{ fontSize: 14 }}>Your app will appear here</p>
      </div>
    </div>
  );
}`,
  },
};
const BASE_DEPENDENCIES: Record<string, string> = {
  "react-is": "latest",
  "react-router-dom": "latest",
  "lucide-react": "latest",
  recharts: "latest",
  "date-fns": "latest",
  "framer-motion": "latest",
  "react-hook-form": "latest",
  "@hookform/resolvers": "latest",
  zod: "latest",
  "@radix-ui/react-dialog": "latest",
  "@radix-ui/react-dropdown-menu": "latest",
  "@radix-ui/react-tabs": "latest",
  "@radix-ui/react-tooltip": "latest",
  "@radix-ui/react-accordion": "latest",
  "@radix-ui/react-select": "latest",
  axios: "latest",
  clsx: "latest",
  "class-variance-authority": "latest",
  "tailwind-merge": "latest",
};
type activeTab = "code" | "preview";

interface codePanelProps {
  fileData: FileData | null
  isgenerating: boolean
  statusLog: StatusStep[]
  onfilePatch: (patches: FileData) => void
}
export function CodePanel({ fileData, isgenerating, statusLog, onfilePatch: _onfilePatch }: codePanelProps) {

  const [activeTab, setActiveTab] = useState<activeTab>("preview");
  const files = fileData?.files ?? PLACEHOLDER_FILES
  const dependencies = { ...BASE_DEPENDENCIES, ...(fileData?.dependencies ?? {}) }
  const filePathKeys = Object.keys(files).sort().join('|')

  return (
    <div>
      <SandpackProvider key={filePathKeys}
        template="react"
        files={files}
        theme={dracula}
        customSetup={{ dependencies }}
        options={{
          externalResources: ["https://cdn.tailwind.css"],
          recompileMode: "delayed",
          recompileDelay: 500,
        }}
      >

      </SandpackProvider>
    </div>
  )
}