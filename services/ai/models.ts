import { AIProviderName } from "./types";

export interface ModelOption {
  id: string;
  name: string;
  provider: AIProviderName;
}

export const AVAILABLE_MODELS: ModelOption[] = [
  {
    id: "qwen2.5-coder:3b",
    name: "Qwen 2.5 Coder 3B",
    provider: "ollama",
  },
  
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    provider: "gemini",
  },
 
];