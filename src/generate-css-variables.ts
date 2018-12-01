import { RuleMap, VariableMap } from './types';
import { formatCssRule, formatVariableDeclaration } from './utils';

export function generateCssVariables(variableMap: VariableMap, ruleMap: RuleMap): string {
  const output: string[] = [];

  output.push(':root {');
  for (const variable of variableMap.values()) {
    output.push('  ' + formatVariableDeclaration(variable));
  }
  output.push('}');

  for (const rule of ruleMap.values()) {
    output.push(formatCssRule(rule));
  }

  return output.join('\n');
}
