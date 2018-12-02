import { RuleMap } from './types';
import { formatCssRule } from './utils';

export function generateCss(ruleMap: RuleMap): string {
  const output: string[] = [];

  for (const rule of ruleMap.values()) {
    output.push(formatCssRule(rule, 'css'));
  }

  return output.join('\n');
}
