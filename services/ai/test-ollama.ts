import { OllamaProvider } from "./ollama";

const provider = new OllamaProvider();

provider
  .generateProject("Create a simple todo app")
  .catch(console.error);