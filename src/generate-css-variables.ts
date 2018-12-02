import { RuleMap, VariableMap } from './types';
import { formatCssRule, formatVariableDeclaration } from './utils';

export function generateCssVariables(variableMap: VariableMap, ruleMap: RuleMap): string {
  const output: string[] = [];

  output.push(':root {');
  for (const variable of variableMap.values()) {
    output.push('  ' + formatVariableDeclaration(variable, 'css-variables'));
  }
  output.push('}');

  for (const rule of ruleMap.values()) {
    output.push(formatCssRule(rule, 'css-variables'));
  }

  return output.join('\n');
}
