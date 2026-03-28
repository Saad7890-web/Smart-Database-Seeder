import path from "node:path";
import { writeStarterConfig } from "../../config/config-writer.js";
import { wrapCommand } from "../utils/command-wrapper.js";

export function registerInitCommand(program) {
  program
    .command("init")
    .description("Initialize config file")
    .option("-p, --path <path>", "Path to config file", "seed.config.yaml")
    .option("-f, --force", "Overwrite existing config file")
    .action(
      wrapCommand(async (options) => {
        const configPath = await writeStarterConfig(options.path, {
          force: options.force,
        });

        console.log(`Config file created at: ${path.resolve(configPath)}`);
      })
    );
}