import WebContainerManager from "./webcontainermanager";

export async function clearWorkspace() {
  const webcontainer = await WebContainerManager.getInstance();

  const entries = await webcontainer.fs.readdir("/");

  for (const entry of entries) {
    await webcontainer.fs.rm(`/${entry}`, {
      recursive: true,
      force: true,
    });
  }
}