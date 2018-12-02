#!/usr/bin/env node

import * as path from 'path';
import { build } from './build';
import { version } from '../../package.json';
import { parseArgs } from './parse-args';
import { usage } from './usage';

const validCommands = ['build'].join(', ');

const error = (message: string) => {
  console.error(`${message}\n\nUse '-h' or '--help' to show usage information.`);
  process.exit(1);
};

const { args, command } = parseArgs(process.argv);

if (args['-h'] || args['--help']) {
  console.log(usage);
  process.exit(0);
}

if (args['-v'] || args['--version']) {
  console.log(version);
  process.exit(0);
}

if (command === 'build') {
  const configFile = args['-c'] || args['--config'];

  if (!configFile || typeof configFile !== 'string') {
    error("No config file specified. Use '-c' or '--config' to pass a path to a system config file.");
  }

  let config;
  try {
    config = require(path.resolve(process.cwd(), configFile as string));
  } catch (err) {
    error(`Error loading config file: ${err.message}`);
  }

  try {
    build(config);
    process.exit(0);
  } catch (err) {
    error(err);
  }
}

if (!command) {
  error(`No command specified. Command should be one of: ${validCommands}`);
}

error(`Invalid command specified: ${command}\nCommand should be one of: ${validCommands}`);
