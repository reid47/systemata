import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';
import { Config, CliInput } from '../../types';
import { resolveConfig } from '../../config';
import { error } from '../error';
import { pathGet, pathSet } from '../../utils';

const configFileTemplate = (config: Config) => `module.exports = {
  system: {
    name: ${JSON.stringify(config.system.name)},
    version: ${JSON.stringify(config.system.version)},
    description: ${JSON.stringify(config.system.description)}
  },
  output: {
    buildDirectory: ${JSON.stringify(config.output.buildDirectory)},
    archiveDirectory: ${JSON.stringify(config.output.archiveDirectory)},
    files: [
      {
        format: 'css',
        fileName: ${JSON.stringify(config.system.name + '.css')}
      },
      {
        format: 'docs',
        fileName: ${JSON.stringify(config.system.name + '.html')}
      }
    ]
  },
  color: {},
  spacing: {}
};`;

const prompts = [
  { text: 'System name', key: ['system', 'name'] },
  { text: 'System description', key: ['system', 'description'] },
  { text: 'Initial version', key: ['system', 'version'] },
  { text: 'Build output directory', key: ['output', 'buildDirectory'] }
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(config: Config, done: (config: Config) => void, promptIndex = 0) {
  const prompt = prompts[promptIndex];

  rl.question(`${prompt.text} (default: '${pathGet(config, prompt.key)}'): `, answer => {
    if (answer) pathSet(config, prompt.key, answer);

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

  const defaultConfig = resolveConfig({}, '');

  if (skipQuestions) {
    const output = configFileTemplate(defaultConfig);
    return writeFile(configFile as string, output);
  }

  ask(defaultConfig, userConfig => {
    const output = configFileTemplate(userConfig);
    writeFile(configFile as string, output);
  });
}
