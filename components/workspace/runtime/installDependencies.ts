import WebContainerManager from "./webcontainermanager";

export async function installDependencies(
  onLog?: (log: string) => void
) {
  const webcontainer = await WebContainerManager.getInstance();

  const installProcess = await webcontainer.spawn("npm", ["install"]);

  let logs = "";

  await installProcess.output.pipeTo(
    new WritableStream({
      write(chunk: string) {
        logs += chunk;
        onLog?.(chunk);
      },
    })
  );

  const exitCode = await installProcess.exit;

  if (exitCode !== 0) {
    throw new Error(`npm install failed\n\n${logs}`);
  }
}