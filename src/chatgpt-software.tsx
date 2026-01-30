import { showHUD, Clipboard } from "@raycast/api";
import { execSync } from "child_process";

export default async function Command() {
  // Get frontmost app name
  const frontApp = execSync(
    `osascript -e 'tell application "System Events" to get name of first process whose frontmost is true'`,
    { encoding: "utf-8" }
  ).trim();

  // Launch ChatGPT
  execSync(`open -a "ChatGPT"`);

  // Set clipboard with question prefix
  await Clipboard.copy(`The following is a question about ${frontApp}: `);

  // Wait for ChatGPT to activate, then trigger Alt+Space and paste
  await new Promise((r) => setTimeout(r, 500));
  execSync(`osascript -e '
    tell application "System Events"
      key code 49 using {option down}
      delay 0.5
      keystroke "v" using {command down}
    end tell
  '`);

  await showHUD(`ChatGPT: asking about ${frontApp}`);
}
