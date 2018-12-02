import * as path from 'path';
import { CliInput, Config } from '../types';
import { error } from './error';
import { resolveConfig } from '../config';

export function getConfig(input: CliInput): Config | undefined {
  const { configFile } = input.args;
  const cwd = process.cwd();

  const possibleConfigFiles: string[] = [
    path.resolve(cwd, 'systemata.config.js'),
    path.resolve(cwd, 'systemata.config.json')
  ];

  if (typeof configFile === 'string') {
    possibleConfigFiles.unshift(path.resolve(cwd, configFile));
  }

  let config: Config | undefined;
  let configFilePath = '<unknown>';

  const errorMessages = [];

  for (let i = 0; i < possibleConfigFiles.length; i++) {
    try {
      config = require(possibleConfigFiles[i]);
      configFilePath = possibleConfigFiles[i];
      break;
    } catch (err) {
      errorMessages.push(err.message);
    }
  }

  if (!config) {
    error(`Could not load config file: ${errorMessages.join(' ')}`);
    return;
  }

  return resolveConfig(config, configFilePath);
}
