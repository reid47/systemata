#!/usr/bin/env node

import { build } from './build';
import { version } from '../../package.json';
import { parseArgs, knownCommands } from './parse-args';
import { usage } from './usage';
import { init } from './init';
import { error } from './error';

const input = parseArgs(process.argv.slice(2));

if (input.args.help) {
  console.log(usage);
  process.exit(0);
}

if (input.args.version) {
  console.log(version);
  process.exit(0);
}

switch (input.command) {
  case 'init':
    init(input);
    break;

  case 'build':
    build(input);
    break;

  case 'develop':
    // todo :)
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
