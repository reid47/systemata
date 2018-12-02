import { version, description } from '../../package.json';

export const usage = `systematic (version ${version})
  ${description}

Usage:
  systematic [options]
  systematic build [build options]

Options:
  -v, --version           print systematic version
  -h, --help              print this usage info

'build' options:
  -c, --config            path to config file
`.trim();
