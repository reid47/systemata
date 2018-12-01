import { Config } from './types';

function makeClassName(base: string, config: Config) {
  const { settings } = config;
  if (!settings || !settings.namespace) return `.${base}`;
  const { prefix, peerClass, parentClass } = settings.namespace;
  return `${parentClass ? `.${parentClass} ` : ''}${peerClass ? `.${peerClass}` : ''}.${prefix ||
    ''}${base}`;
}

function makeCssRule(selector: string, property: string, value: string) {
  return `${selector} { ${property}: ${value} }`;
}

export function generateCss(config: Config): string {
  const output: string[] = [];

  if (config.colors) {
    for (const colorName in config.colors) {
      const className = makeClassName(`color-${colorName}`, config);
      output.push(makeCssRule(className, 'color', config.colors[colorName]));
    }
  }

  return output.join('\n');
}
