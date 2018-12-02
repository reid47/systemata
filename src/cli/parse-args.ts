const isFlag = (arg: string) => arg && /^-[-]?[a-z\-]+/i.test(arg);

export function parseArgs(args: string[]) {
  const argsObject: { [key: string]: string | boolean } = {};

  let command: string = '';
  let lastArg: string;

  process.argv.slice(2).forEach((arg, index) => {
    if (index === 0 && !isFlag(arg)) {
      command = arg;
    } else if (isFlag(lastArg)) {
      argsObject[lastArg] = arg;
    } else {
      argsObject[arg] = true;
    }

    lastArg = arg;
  });

  return { args: argsObject, command };
}
