import * as path from 'path';
import { CliInput } from '../types';
import { error } from './error';

export function build(input: CliInput) {
  const { configFile } = input.args;

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
    // todo :)

    process.exit(0);
  } catch (err) {
    error(err);
  }
}
