import { OllamaProvider } from "./ollama";

async function main() {
  console.log("Starting Ollama test...");

  const provider = new OllamaProvider();

  const project = await provider.generateProject(
    "Create a simple todo app",
  );

  console.log("Generation successful!");
  console.log("Files generated:");

  for (const file of project.files) {
    console.log(`- ${file.path}`);
  }

  console.log("\nDependencies:");
  console.log(project.dependencies);

  console.log("\nTotal files:", project.files.length);
}

main().catch((error) => {
  console.error("Ollama test failed:");
  console.error(error);

  process.exit(1);
});