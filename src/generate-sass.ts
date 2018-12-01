import { RuleMap, CssRule, VariableMap, Variable } from './types';

function formatVariableDeclaration(variable: Variable) {
  return `${variable.name}: ${variable.value};`;
}

function formatCssRule(rule: CssRule): string {
  return `${rule.selector} { ${rule.properties
    .map(prop => `${prop.property}: ${prop.value}`)
    .join('; ')} }`;
}

export function generateSass(variableMap: VariableMap, ruleMap: RuleMap): string {
  const output: string[] = [];

  for (const variable of variableMap.values()) {
    output.push(formatVariableDeclaration(variable));
  }

  for (const rule of ruleMap.values()) {
    output.push(formatCssRule(rule));
  }

  return output.join('\n');
}
