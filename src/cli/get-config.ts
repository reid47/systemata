import * as path from 'path';
import { CliInput, Config } from '../types';
import { error } from './error';

export function getConfig(input: CliInput): Config | undefined {
  const { configFile } = input.args;

  if (!configFile || typeof configFile !== 'string') {
    error("No config file specified. Use '-c' or '--config' to pass a path to a system config file.");
  }

  let config: Config;
  try {
    config = require(path.resolve(process.cwd(), configFile as string));
  } catch (err) {
    error(`Error loading config file: ${err.message}`);
    return;
  }

  return config;
}
