import { Command } from "commander";

export function createProgram() {
  const program = new Command();

  program
    .name("seed")
    .description("Smart database seeder CLI")
    .version("0.1.0");

  return program;
}