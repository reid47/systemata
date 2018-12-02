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

export function printJsObject(obj: object) {
  const json = JSON.stringify(obj, null, 2);

  return json.replace(/\"([a-z]+)\":/gi, (substr, key) => {
    return `${key}:`;
  });
}
