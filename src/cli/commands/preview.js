export function registerPreviewCommand(program) {
  program
    .command("preview")
    .description("Preview generated data")
    .action(() => {
      console.log("preview command (not implemented yet)");
    });
}