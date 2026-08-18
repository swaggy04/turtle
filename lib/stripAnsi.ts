export function stripAnsi(text: string) {
  return text
    // Remove ANSI color codes
    .replace(/\x1B\[[0-9;?]*[ -/]*[@-~]/g, "")
    // Remove carriage returns
    .replace(/\r/g, "");
}