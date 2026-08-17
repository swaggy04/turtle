import type { GeneratedProject } from "@/services/ai-schema";

import { clearWorkspace } from "./clearWorkspace";
import WebContainerManager from "./webcontainermanager";
import { createRuntimeProject } from "./createRuntimeproject";

export async function mountProject(project: GeneratedProject) {
  const webcontainer = await WebContainerManager.getInstance();

  await clearWorkspace();

  const tree = createRuntimeProject(project);

  await webcontainer.mount(tree);

  const packageJson = await webcontainer.fs.readFile("/package.json", "utf-8");

  console.log("Mounted package.json:", packageJson);
}
