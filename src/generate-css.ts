import { Config } from './types';

const colorProperties = ['background-color', 'border-color', 'color', 'fill'];

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
    for (const colorProperty of colorProperties) {
      const colorKey = config.settings.propertyMapping[colorProperty];
      if (!colorKey) continue;

      for (const colorName in config.colors) {
        const className = makeClassName(`${colorKey}-${colorName}`, config);
        output.push(makeCssRule(className, colorProperty, config.colors[colorName]));
      }
    }
  }

  return output.join('\n');
}
