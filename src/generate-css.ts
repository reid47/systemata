import { RuleMap, CssRule } from './types';

function formatCssRule(rule: CssRule): string {
  return `${rule.selector} { ${rule.properties
    .map(prop => `${prop.property}: ${prop.value}`)
    .join('; ')} }`;
}

export function generateCss(ruleMap: RuleMap): string {
  const output: string[] = [];

  for (const rule of ruleMap.values()) {
    output.push(formatCssRule(rule));
  }

  return output.join('\n');
}
