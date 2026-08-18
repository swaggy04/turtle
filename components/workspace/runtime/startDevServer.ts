import WebContainerManager from "./webcontainermanager";

export async function startDevServer(onLog?: (log: string) => void): Promise<string> {
  const webcontainer = await WebContainerManager.getInstance();

  const devProcess = await webcontainer.spawn("npm", ["run", "dev"]);

  devProcess.output.pipeTo(
    new WritableStream({
      write(chunk) {
        onLog?.(chunk);
      },
    }),
  );

  return new Promise((resolve) => {
    webcontainer.on("server-ready", (_port, url) => {
      resolve(url);
    });
  });
}
