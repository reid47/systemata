import * as path from 'path';
import * as fs from 'fs';
import { CliInput, Config } from '../types';
import { resolveConfig } from '../config';
import { name } from '../../package.json';

export function getConfig(input: CliInput): Config | undefined {
  const { configFile } = input.args;
  const cwd = process.cwd();

  let configFilePath = '';

  if (typeof configFile === 'string') {
    configFilePath = path.resolve(cwd, configFile);

    if (!fs.existsSync(configFilePath)) {
      throw new Error(`File not found: '${configFilePath}'`);
    }
  } else {
    const possibleConfigFiles: string[] = [
      path.resolve(cwd, `${name}.config.js`),
      path.resolve(cwd, `${name}.config.json`)
    ];

    for (const filePath of possibleConfigFiles) {
      if (fs.existsSync(filePath)) {
        configFilePath = filePath;
        break;
      }
    }

    if (!configFilePath) {
      throw new Error(
        `No config file found. Looked for: ${possibleConfigFiles.map(f => `'${f}'`).join(' or ')}`
      );
    }
  }

  try {
    const config = require(configFilePath) as Config;
    return resolveConfig(config, configFilePath);
  } catch (err) {
    console.error(`Failed to load config file: '${configFilePath}'`);
    throw err;
  }
}
