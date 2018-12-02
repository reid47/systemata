import { Config, CssPropertyType, CssRule, RuleMap, VariableMap, Variable } from './types';

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
  const { namespace } = config;
  if (!namespace) return `.${base}`;
  const { prefix, peerClass, parentClass } = namespace;
  return `${parentClass ? `.${parentClass} ` : ''}${peerClass ? `.${peerClass}` : ''}.${prefix ||
    ''}${base}`;
}

function makeVariableName(base: string, config: Config) {
  const { namespace } = config;
  if (!namespace || !namespace.prefix) return base;
  return `${namespace.prefix}-${base}`;
}

function makeCssRule(
  type: CssPropertyType,
  selector: string,
  propertyString: string,
  value: string | Variable
): CssRule {
  const properties = propertyString.split(',').map(property => ({ property, value }));

  return { type, selector, properties };
}

export function buildRuleMap(config: Config, variableMap: VariableMap): RuleMap {
  const ruleMap = new Map<string, CssRule>();

  for (const propertyType in propertiesByType) {
    const properties = propertiesByType[propertyType as CssPropertyType];

    for (const property of properties) {
      const key = config.propertyMapping[property];
      if (!key) continue;

      for (const name in config[propertyType as CssPropertyType]) {
        const className = makeClassName(`${key}-${name}`, config);
        const variableName = makeVariableName(`${propertyType}-${name}`, config);
        const { value } = config[propertyType as CssPropertyType][name];

        const resolvedValue = variableMap.get(variableName) || value;

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
  const variableMap = new Map<string, Variable>();

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
