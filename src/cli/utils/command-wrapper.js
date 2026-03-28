export function wrapCommand(handler) {
  return async (...args) => {
    try {
      await handler(...args);
    } catch (error) {
      console.error(error.message || "Unknown error");
      process.exitCode = 1;
    }
  };
}