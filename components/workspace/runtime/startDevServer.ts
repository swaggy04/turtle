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

  return new Promise((resolve, reject) => {
    const off = webcontainer.on("server-ready", (_port, url) => {
      off();
      resolve(url);
    });

    devProcess.exit.then((code) => {
      if (code !== 0) {
        off();
        reject(new Error(`Dev server exited with code ${code}`));
      }
    });
  });
}
