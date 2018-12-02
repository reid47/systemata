import { RuleMap, VariableMap } from '../types';
import { formatCssRule, formatVariableDeclaration } from '../utils';

export function generateSass(variableMap: VariableMap, ruleMap: RuleMap): string {
  const output: string[] = [];

  for (const variable of variableMap.values()) {
    output.push(formatVariableDeclaration(variable, 'sass'));
  }

  for (const rule of ruleMap.values()) {
    output.push(formatCssRule(rule, 'sass'));
  }

  return output.join('\n');
}
