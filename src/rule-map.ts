import { Config, CssPropertyType, CssRule, RuleMap, VariableMap } from './types';

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

const variableNamePrefix: { [key: string]: string } = {
  sass: '$',
  less: '@',
  'css-variables': '--'
};

function makeClassName(base: string, config: Config) {
  const { namespace } = config;
  if (!namespace) return `.${base}`;
  const { prefix, peerClass, parentClass } = namespace;
  return `${parentClass ? `.${parentClass} ` : ''}${peerClass ? `.${peerClass}` : ''}.${prefix ||
    ''}${base}`;
}

function makeVariableName(base: string, config: Config) {
  const { namespace, output } = config;
  const varPrefix = variableNamePrefix[output.format] || '';
  if (!namespace || !namespace.prefix) return `${varPrefix}${base}`;
  return `${varPrefix}${namespace.prefix}-${base}`;
}

function makeVariableUsage(variableName: string, config: Config) {
  if (config.output.format === 'css-variables') return `var(${variableName})`;
  return variableName;
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

export function buildRuleMap(config: Config, variableMap: VariableMap): RuleMap {
  const ruleMap: RuleMap = new Map();

  for (const propertyType in propertiesByType) {
    const properties = propertiesByType[propertyType as CssPropertyType];

    for (const property of properties) {
      const key = config.propertyMapping[property];
      if (!key) continue;

      for (const name in config[propertyType as CssPropertyType]) {
        const className = makeClassName(`${key}-${name}`, config);
        const variableName = makeVariableName(`${propertyType}-${name}`, config);
        const { value } = config[propertyType as CssPropertyType][name];

        const resolvedValue = variableMap.has(variableName)
          ? makeVariableUsage(variableName, config)
          : value;

        ruleMap.set(
          className,
          makeCssRule(propertyType as CssPropertyType, className, property, resolvedValue)
        );
      }
    }
  }

  return ruleMap;
}

export function buildVariableMap(config: Config): VariableMap {
  const variableMap: VariableMap = new Map();

  if (config.output.format === 'css') return variableMap;

  for (const propertyType in propertiesByType) {
    for (const name in config[propertyType as CssPropertyType]) {
      const variableName = makeVariableName(`${propertyType}-${name}`, config);
      const { value } = config[propertyType as CssPropertyType][name];

      variableMap.set(variableName, {
        type: propertyType as CssPropertyType,
        name: variableName,
        value
      });
    }
  }

  return variableMap;
}
