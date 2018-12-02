#!/usr/bin/env node

import { develop } from './commands/develop';
import { build } from './commands/build';
import { version } from '../../package.json';
import { parseArgs } from './parse-args';
import { usage, knownCommands } from './usage';
import { init } from './commands/init';
import { error } from './error';
import { archive } from './commands/archive';
import { showConfig } from './commands/show-config';

const input = parseArgs(process.argv.slice(2));

if (input.args.help) {
  if (input.command && usage[input.command]) {
    console.log(usage[input.command]);
  } else {
    console.log(usage.main);
  }
  process.exit(0);
}

if (input.args.version) {
  console.log(version);
  process.exit(0);
}

switch (input.command) {
  case 'archive':
    archive(input);
    break;

  case 'build':
    build(input);
    break;

  case 'develop':
    develop(input);
    break;

  case 'init':
    init(input);
    break;

  case 'show-config':
    showConfig(input);
    break;

  case undefined:
    error(`No command specified. Command should be one of: ${knownCommands.join(', ')}`);
    break;

  default:
    error(
      `Invalid command specified: ${input.command}\nCommand should be one of: ${knownCommands.join(', ')}`
    );
    break;
}
