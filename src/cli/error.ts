export const error = (message: string) => {
  console.error(`${message}\n\nUse '-h' or '--help' to show usage information.`);
  process.exit(1);
};
