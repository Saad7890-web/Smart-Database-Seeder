export function registerGenerateCommand(program) {
  program
    .command("generate")
    .description("Generate seed data")
    .action(() => {
      console.log("generate command (not implemented yet)");
    });
}