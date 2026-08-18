import WebContainerManager from "./webcontainermanager";
import { stripAnsi } from "@/lib/stripAnsi";

export async function startDevServer(
  onLog?: (log: string) => void
): Promise<string> {
  const webcontainer = await WebContainerManager.getInstance();

  const devProcess = await webcontainer.spawn("npm", [
    "run",
    "dev",
    "--",
    "--webpack",
  ]);

  let logs = "";

  const decoder = new TextDecoder();

  devProcess.output.pipeTo(
    new WritableStream({
      write(chunk) {
        const text =
          typeof chunk === "string"
            ? stripAnsi(chunk)
            : stripAnsi(decoder.decode(chunk, { stream: true }));

        logs += text;
        onLog?.(text);
      },
    })
  );

  return new Promise((resolve, reject) => {
    let resolved = false;

    webcontainer.on("server-ready", (_port, url) => {
      resolved = true;
      resolve(url);
    });

    devProcess.exit.then((exitCode) => {
      if (!resolved) {
        reject(
          new Error(`Dev server exited with code ${exitCode}\n\n${logs}`)
        );
      }
    });
  });
}