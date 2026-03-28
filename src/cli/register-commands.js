import { registerGenerateCommand } from "./commands/generate.js";
import { registerInitCommand } from "./commands/init.js";
import { registerInspectCommand } from "./commands/inspect.js";
import { registerPreviewCommand } from "./commands/preview.js";
import { registerRunCommand } from "./commands/run.js";

export function registerCommands(program) {
  registerInitCommand(program);
  registerInspectCommand(program);
  registerGenerateCommand(program);
  registerPreviewCommand(program);
  registerRunCommand(program);
}