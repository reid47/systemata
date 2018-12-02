import { name, version, description } from '../../package.json';

export const usage = `${name} (version ${version})
  ${description}

Usage:
  ${name} [options]
  ${name} init [init options]
  ${name} develop [develop options]
  ${name} build [build options]

Options:
  -h, --help              print this usage info
  -v, --version           print ${name} version

'init' options:
  -c, --config            path where config file will be created
  -y, --yes               skip questions, use default initial settings

'develop' options:
  -c, --config            path to config file

'build' options:
  -c, --config            path to config file
`.trim();
