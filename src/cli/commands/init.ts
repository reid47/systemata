import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';
import { Config, CliInput } from '../../types';
import { resolveConfig } from '../../config';
import { error } from '../error';

const configFileTemplate = (config: Config) => `module.exports = {
  system: {
    name: ${JSON.stringify(config.system.name)},
    version: ${JSON.stringify(config.system.version)},
    description: ${JSON.stringify(config.system.description)}
  },
  output: {
    archiveDirectory: ${JSON.stringify(config.output.archiveDirectory)},
    format: "css"
  },
  color: {},
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

export function init(input: CliInput) {
  const { configFile, skipQuestions } = input.args;

  if (!configFile || typeof configFile !== 'string') {
    error(
      "No config file specified. Use '-c' or '--config' to pass a path where a system config file should be created."
    );
  }

  if (fs.existsSync(path.resolve(process.cwd(), configFile as string))) {
    error(`File '${configFile}' already exists. Please specify a file name that doesn't exist.`);
  }

  const defaultConfig = resolveConfig({});

  if (skipQuestions) {
    const output = configFileTemplate(defaultConfig);
    return writeFile(configFile as string, output);
  }

  ask(defaultConfig, userConfig => {
    const output = configFileTemplate(userConfig);
    writeFile(configFile as string, output);
  });
}
