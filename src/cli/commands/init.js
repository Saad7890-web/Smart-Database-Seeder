

import { wrapCommand } from "../utils/command-wrapper.js";

export function registerInitCommand(program) {
  program
    .command("init")
    .description("Initialize config file")
    .action(
      wrapCommand(async () => {
        console.log("init command (not implemented yet)");
      })
    );
}