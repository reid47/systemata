import { RuleMap, VariableMap } from '../types';
import { formatCssRule, formatVariableDeclaration } from '../utils';

export function generateLess(variableMap: VariableMap, ruleMap: RuleMap): string {
  const output: string[] = [];

  for (const variable of variableMap.values()) {
    output.push(formatVariableDeclaration(variable, 'less'));
  }

  for (const rule of ruleMap.values()) {
    output.push(formatCssRule(rule, 'less'));
  }

  return output.join('\n');
}
