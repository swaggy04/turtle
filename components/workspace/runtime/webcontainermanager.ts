import { WebContainer } from "@webcontainer/api";

class WebContainerManager {
  private static instance: WebContainer | null = null;

  static async getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = await WebContainer.boot();

    return this.instance;
  }

  static async destroy() {
    if (!this.instance) return;

    this.instance.teardown();

    this.instance = null;
  }
}

export default WebContainerManager;
