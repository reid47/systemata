#!/usr/bin/env node
import * as path from 'path';
import * as fs from 'fs';
import { build } from './build';
import { version } from '../../package.json';
import { parseArgs, knownCommands } from './parse-args';
import { usage } from './usage';

const error = (message: string) => {
  console.error(`${message}\n\nUse '-h' or '--help' to show usage information.`);
  process.exit(1);
};

const { args, command } = parseArgs(process.argv.slice(2));

if (args.help) {
  console.log(usage);
  process.exit(0);
}

if (args.version) {
  console.log(version);
  process.exit(0);
}

if (command === 'init') {
  const configFile = args['-c'] || args['--config'];

  if (!configFile || typeof configFile !== 'string') {
    error("No config file specified. Use '-c' or '--config' to pass a path to a system config file.");
  }

  if (fs.existsSync(path.resolve(process.cwd(), configFile as string))) {
    error(`File '${configFile}' already exists. Please specify a file name that doesn't exist.`);
  }
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

const validCommands = Object.keys(knownCommands).join(', ');

if (!command) {
  error(`No command specified. Command should be one of: ${validCommands}`);
}

error(`Invalid command specified: ${command}\nCommand should be one of: ${validCommands}`);
