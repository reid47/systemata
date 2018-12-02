import { RuleMap, VariableMap, CssPropertyType, Variable } from '../types';
import { formatCssRule, toTitleCase } from '../utils';

export function generateDocs(variableMap: VariableMap, ruleMap: RuleMap): string {
  const output: string[] = [];

  output.push('<!doctype html>\n<html>\n<body>\n');

  if (variableMap.size) {
    output.push('<section>');
    output.push('<h2>Variables</h2>');

    const variablesByType = new Map<CssPropertyType, Variable[]>();

    for (const variable of variableMap.values()) {
      if (!variablesByType.has(variable.type)) {
        variablesByType.set(variable.type, []);
      }

      (variablesByType.get(variable.type) as Variable[]).push(variable);
    }

    for (const [type, variables] of variablesByType.entries()) {
      output.push(`<h3>${toTitleCase(type)}</h3>`);

      output.push('<table>');

      output.push('<thead>');
      output.push('<tr>');
      output.push('<th>Name</th>');
      output.push('<th>Value</th>');
      output.push('</tr>');
      output.push('</thead>');

      output.push('<tbody>');

      for (const variable of variables) {
        output.push('<tr>');
        output.push(`<td><code>${variable.name}</code></td>`);
        output.push(`<td><code>${variable.value}</code></td>`);
        output.push('</tr>');
      }

      output.push('</tbody>');

      output.push('</table>');
    }

    output.push('</section>\n');
  }

  output.push('<section>');
  output.push('<h2>Modifier Classes</h2>');

  for (const rule of ruleMap.values()) {
    output.push(formatCssRule(rule, 'css'));
  }

  output.push('</section>\n');

  output.push('</body>\n</html>');

  return output.join('\n');
}
