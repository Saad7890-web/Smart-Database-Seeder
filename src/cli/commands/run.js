export function registerRunCommand(program) {
  program
    .command("run")
    .description("Insert generated data into database")
    .action(() => {
      console.log("run command (not implemented yet)");
    });
}