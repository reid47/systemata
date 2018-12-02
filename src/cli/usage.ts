import { version, description } from '../../package.json';

export const usage = `systematic (version ${version})
  ${description}

Usage:
  systematic [options]
  systematic init [init options]
  systematic build [build options]

Options:
  -v, --version           print systematic version
  -h, --help              print this usage info

'init' options:
  -c, --config            path where config file will be created
  -y, --yes               skip init questions, use defaults

'build' options:
  -c, --config            path to config file
`.trim();
