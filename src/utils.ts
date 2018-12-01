import { CssRule, Variable } from './types';

export function formatCssRule(rule: CssRule): string {
  return `${rule.selector} { ${rule.properties
    .map(prop => `${prop.property}: ${prop.value}`)
    .join('; ')} }`;
}

export function formatVariableDeclaration(variable: Variable) {
  return `${variable.name}: ${variable.value};`;
}
