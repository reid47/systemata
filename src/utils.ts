import { CssRule, Variable } from './types';

export function formatCssRule(rule: CssRule): string {
  return `${rule.selector} { ${rule.properties
    .map(prop => `${prop.property}: ${prop.value}`)
    .join('; ')} }`;
}

export function formatVariableDeclaration(variable: Variable) {
  return `${variable.name}: ${variable.value};`;
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
