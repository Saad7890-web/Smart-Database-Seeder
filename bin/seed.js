#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

program
  .name("seed")
  .description("Smart database seeder CLI")
  .version("0.1.0");

program
  .command("init")
  .description("Initialize config file")
  .action(() => {
    console.log("init command (not implemented yet)");
  });

program
  .command("inspect")
  .description("Inspect database schema")
  .action(() => {
    console.log("inspect command (not implemented yet)");
  });

program
  .command("generate")
  .description("Generate seed data")
  .action(() => {
    console.log("generate command (not implemented yet)");
  });

program
  .command("preview")
  .description("Preview generated data")
  .action(() => {
    console.log("preview command (not implemented yet)");
  });

program
  .command("run")
  .description("Insert generated data into database")
  .action(() => {
    console.log("run command (not implemented yet)");
  });

program.parse(process.argv);