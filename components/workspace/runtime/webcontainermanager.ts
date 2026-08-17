import { WebContainer } from "@webcontainer/api";

class WebContainerManager {
  private static instance: WebContainer | null = null;
  private static bootPromise: Promise<WebContainer> | null = null;

  static async getInstance() {
    if (this.instance) {
      return this.instance;
    }
    if (this.bootPromise) {
      return this.bootPromise;
    }

    this.bootPromise = WebContainer.boot();

    this.instance = await this.bootPromise;
    this.bootPromise = null;
    return this.instance;
  }

  static async destroy() {
    if (!this.instance) return;

    this.instance.teardown();

    this.instance = null;
  }
}

export default WebContainerManager;
