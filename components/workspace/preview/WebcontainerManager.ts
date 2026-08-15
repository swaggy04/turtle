import { WebContainer } from "@webcontainer/api";

let webcontainer: WebContainer | null = null;

export async function getWebContainer() {
  if (webcontainer) {
    return webcontainer;
  }

  webcontainer = await WebContainer.boot();

  return webcontainer;
}