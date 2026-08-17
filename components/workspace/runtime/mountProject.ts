import { GeneratedProject } from "@/services/ai-schema";
import WebContainerManager from "./webcontainermanager";
import { createRuntimeProject } from "./createRuntimeproject";

export async function mountProject(Project: GeneratedProject) {
  await WebContainerManager.destroy();
  const webcontainer = await WebContainerManager.getInstance();
  const tree = createRuntimeProject(Project);
  await webcontainer.mount(tree);
  const packageJson = await webcontainer.fs.readFile("/package.json", "utf-8");

  console.log("Mounted package.json:", packageJson);
}
