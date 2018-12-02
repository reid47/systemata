import { CssRule, Variable, OutputFileFormat } from './types';

export function formatCssRule(rule: CssRule, format: OutputFileFormat): string {
  return `${rule.selector} { ${rule.properties
    .map(prop => {
      let value;

      switch (format) {
        case 'sass':
          value = `$${prop.value.name}`;
          break;

        case 'less':
          value = `@${prop.value.name}`;
          break;

        case 'css-variables':
          value = `var(--${prop.value.name})`;
          break;

        default:
          value = prop.value.value;
      }

      return `${prop.property}: ${value}`;
    })
    .join('; ')} }`;
}

export function formatVariableDeclaration(variable: Variable, format: OutputFileFormat) {
  let name;

  switch (format) {
    case 'sass':
      name = `$${variable.name}`;
      break;

    case 'less':
      name = `@${variable.name}`;
      break;

    case 'css-variables':
      name = `--${variable.name}`;
      break;

    default:
      throw new Error('Unexpected format: ' + format);
  }

  return `${name}: ${variable.value};`;
}

export function capitalizeWord(word: string) {
  return word[0].toUpperCase() + word.substr(1);
}

export function toTitleCase(str: string) {
  const words = str
    .split(/[ \-]/)
    .filter(Boolean)
    .map(capitalizeWord);

  return words.join(' ');
}

export function parseSemVer(version: string) {
  const result = { valid: false, major: -1, minor: -1, patch: -1 };

  if (!version) return result;
  const parts = version.split('.');
  if (parts.length !== 3) return result;

  const major = Number(parts[0]);
  const minor = Number(parts[1]);
  const patch = Number(parts[2]);

  if ([major, minor, patch].every(n => !isNaN(n))) {
    result.valid = true;
    result.major = major;
    result.minor = minor;
    result.patch = patch;
  }

  return result;
}

export function pathGet(obj: any, path: string[]): any {
  if (path.length === 1) return obj[path[0]];

  return pathGet(obj[path[0]], path.slice(1));
}

export function pathSet(obj: any, path: string[], value: any): any {
  if (path.length === 1) {
    obj[path[0]] = value;
    return;
  }

  return pathSet(obj[path[0]], path.slice(1), value);
}
