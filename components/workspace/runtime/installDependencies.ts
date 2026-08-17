import WebContainerManager from "./webcontainermanager";

export async function installDependencies() {
  const webcontainer = await WebContainerManager.getInstance();
  const installProcess = await webcontainer.spawn("npm", ["install"]);
  const exitCode = await installProcess.exit;
  if (exitCode !== 0) {
    throw new Error(`npm install failed with exit code ${exitCode}`);
  }
}
