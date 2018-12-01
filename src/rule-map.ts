import { Config, CssPropertyType, CssRule, RuleMap } from './types';

const propertiesByType: { [type in CssPropertyType]: string[] } = {
  color: ['background-color', 'border-color', 'color', 'fill'],
  spacing: [
    'margin',
    'margin-top',
    'margin-bottom',
    'margin-left',
    'margin-right',
    'margin-top,margin-bottom',
    'margin-left,margin-right',
    'padding',
    'padding-top',
    'padding-bottom',
    'padding-left',
    'padding-right',
    'padding-top,padding-bottom',
    'padding-left,padding-right'
  ]
};

function makeClassName(base: string, config: Config) {
  const { settings } = config;
  if (!settings || !settings.namespace) return `.${base}`;
  const { prefix, peerClass, parentClass } = settings.namespace;
  return `${parentClass ? `.${parentClass} ` : ''}${peerClass ? `.${peerClass}` : ''}.${prefix ||
    ''}${base}`;
}

function makeCssRule(
  type: CssPropertyType,
  selector: string,
  propertyString: string,
  value: string
): CssRule {
  const properties = propertyString.split(',').map(property => ({ property, value }));

  return { type, selector, properties };
}

export function buildRuleMap(config: Config): RuleMap {
  const ruleMap: RuleMap = new Map();

  for (const propertyType in propertiesByType) {
    const properties = propertiesByType[propertyType as CssPropertyType];

    for (const property of properties) {
      const key = config.settings.propertyMapping[property];
      if (!key) continue;

      for (const name in config[propertyType as CssPropertyType]) {
        const className = makeClassName(`${key}-${name}`, config);

        ruleMap.set(
          className,
          makeCssRule(
            propertyType as CssPropertyType,
            className,
            property,
            config[propertyType as CssPropertyType][name]
          )
        );
      }
    }
  }

  return ruleMap;
}
