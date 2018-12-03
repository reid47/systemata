import { RuleMap, VariableMap, CssPropertyType, Variable } from '../../types';
import { formatCssRule, toTitleCase } from '../../utils';

const tag = (tagName: string) => (...args: string[]) =>
  `<${tagName} class="systemata-dev>${args.join('')}</${tagName}>`;

const t: any = [
  'body',
  'code',
  'h2',
  'h3',
  'html',
  'section',
  'table',
  'tbody',
  'td',
  'th',
  'thead',
  'tr'
].reduce((acc, tagName) => ({ ...acc, [tagName]: tag(tagName) }), {});

export function generate(variableMap: VariableMap, ruleMap: RuleMap): string {
  let output: string = '';

  output += '<!doctype html><html><head>';

  output += '<style>';
  output += `
    body {
      font-family: sans-serif;
    }
  `;
  output += '</style>';

  output += '</head><body>';

  if (variableMap.size) {
    output += '<section>';
    output += t.h2('Variables');

    const variablesByType = new Map<CssPropertyType, Variable[]>();

    for (const variable of variableMap.values()) {
      if (!variablesByType.has(variable.type)) {
        variablesByType.set(variable.type, []);
      }

      (variablesByType.get(variable.type) as Variable[]).push(variable);
    }

    for (const [type, variables] of variablesByType.entries()) {
      output += `<h3>${toTitleCase(type)}</h3>`;

      output += '<table>';

      output += t.thead(t.tr(t.th('Name'), t.th('Value')));

      output += '<tbody>';

      for (const variable of variables) {
        output += '<tr>';
        output += `<td><code>${variable.name}</code></td>`;
        output += `<td><code>${variable.value}</code></td>`;
        output += '</tr>';
      }

      output += '</tbody>';

      output += '</table>';
    }

    output += '</section>\n';
  }

  output += '<section>';
  output += '<h2>Modifier Classes</h2>';

  for (const rule of ruleMap.values()) {
    output += formatCssRule(rule, 'css');
  }

  output += '</section>\n';

  output += '</body>\n</html>';

  return output;
}
