import { name, version, description } from '../../package.json';

const globalOptions = `
Global options:
  -h, --help       Print usage information
  -v, --version    Print ${name} version
`.trim();

function commandUsage(commandName: string, commandDescription: string, commandOptions: string) {
  return `${name} ${commandName}, version ${version}
  ${commandDescription}

Usage:
  ${name} ${commandName} [options]

${globalOptions}

'${commandName}' options:
  ${commandOptions.trim()}
`.trim();
}

const usage: any = {};

usage.main = `${name}, version ${version}
  ${description}

Usage:
  ${name} <command> [options]

${globalOptions}

Commands:
  archive          Archive a static copy of current design system
  build            Build all design system files
  develop          Start a build server & re-build on change
  init             Create a new design system

For help with a command, use '${name} <command> -h'.
`.trim();

usage.archive = commandUsage(
  'archive',
  'Create a static, versioned copy of the current design system.',
  `
  -c, --config <configFile>   Path to config file
`
);

usage.build = commandUsage(
  'build',
  'Build all design system files',
  `
  -c, --config <configFile>   Path to config file
`
);

usage.develop = commandUsage(
  'develop',
  'Start a server that watches files for changes & rebuilds on change.',
  `
  -c, --config <configFile>   Path to config file
`
);

usage.init = commandUsage(
  'init',
  'Creates a new system config file.',
  `
  -c, --config <configFile>   Path to config file
  -y, --yes                   Skip questions, use defaults
`
);

usage['show-config'] = commandUsage(
  'show-config',
  `Prints resolved system config as ${name} sees it. ` +
    `Useful for making sure configuration looks as you expect.`,
  `
  -c, --config <configFile>   Path to config file
`
);

export { usage };

export const knownCommands = Object.keys(usage);
