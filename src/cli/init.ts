import * as readline from 'readline';
import * as fs from 'fs';
import * as path from 'path';
import { printJsObject } from '../utils';

const defaultConfig: { [key: string]: any } = {
  name: 'untitled-system',
  version: '0.0.1',
  colors: {}
};

const prompts = [{ text: 'System name', key: 'name' }, { text: 'Initial version', key: 'version' }];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(config: typeof defaultConfig, done: (config: typeof defaultConfig) => void, promptIndex = 0) {
  const prompt = prompts[promptIndex];

  rl.question(`${prompt.text} (default: '${defaultConfig[prompt.key]}'): `, answer => {
    if (answer) config[prompt.key] = answer;

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

function toJs(config: typeof defaultConfig) {
  return `module.exports = ${printJsObject(config)}`;
}

export function init(configFile: string, skipQuestions: boolean) {
  if (skipQuestions) {
    const output = toJs(defaultConfig);
    return writeFile(configFile, output);
  }

  ask(defaultConfig, userConfig => {
    const output = toJs(userConfig);
    writeFile(configFile, output);
  });
}
