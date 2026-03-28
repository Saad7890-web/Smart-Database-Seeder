export function registerInspectCommand(program) {
  program
    .command("inspect")
    .description("Inspect database schema")
    .action(() => {
      console.log("inspect command (not implemented yet)");
    });
}