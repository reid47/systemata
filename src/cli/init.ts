import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';
import { Config } from '../types';
import { resolveConfig } from '../config';

const configFileTemplate = (config: Config) => `module.exports = {
  system: {
    name: ${JSON.stringify(config.system.name)},
    version: ${JSON.stringify(config.system.version)},
    description: ${JSON.stringify(config.system.description)}
  },
  colors: {},
  spacing: {}
};`;

const prompts = [{ text: 'System name', key: 'name' }, { text: 'Initial version', key: 'version' }];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(config: Config, done: (config: Config) => void, promptIndex = 0) {
  const prompt = prompts[promptIndex];

  rl.question(`${prompt.text} (default: '${config.system[prompt.key]}'): `, answer => {
    if (answer) config.system[prompt.key] = answer;

    if (promptIndex === prompts.length - 1) {
      rl.close();
      done(config);
    } else {
      ask(config, done, promptIndex + 1);
    }
  });
}

function writeFile(configFile: string, contents: string) {
  const filePath = path.resolve(process.cwd(), configFile);

  try {
    fs.writeFileSync(filePath, contents);
    console.log(`Config file written: ${filePath}`);
  } catch (err) {
    console.error(`Error creating config file: ${err.message}`);
    process.exit(1);
  }
}

export function init(configFile: string, skipQuestions: boolean) {
  const defaultConfig = resolveConfig({});

  if (skipQuestions) {
    const output = configFileTemplate(defaultConfig);
    return writeFile(configFile, output);
  }

  ask(defaultConfig, userConfig => {
    const output = configFileTemplate(userConfig);
    writeFile(configFile, output);
  });
}
