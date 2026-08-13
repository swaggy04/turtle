import { getProvider } from "./registry";
import { GenerateProjectOptions } from "./provider";

export function generateProject(options: GenerateProjectOptions) {
  return getProvider(options.provider).generateProject(options);
}