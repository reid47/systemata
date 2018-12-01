import { NamespaceConfig, Config, ColorConfig, PropertyMappingConfig, SpacingConfig } from './types';

function resolveNamespace(namespaceConfig: any): NamespaceConfig | false {
  if (!namespaceConfig) return false;

  if (typeof namespaceConfig !== 'object') {
    return {
      prefix: typeof namespaceConfig === 'string' ? namespaceConfig : 'sys-',
      parentClass: false,
      peerClass: false
    };
  }

  return {
    prefix: namespaceConfig.prefix || false,
    parentClass: namespaceConfig.parentClass || false,
    peerClass: namespaceConfig.peerClass || false
  };
}

function resolvePropertyMapping(mappingsConfig: any): PropertyMappingConfig {
  mappingsConfig = (mappingsConfig || {}) as object;

  const defaultMappings: PropertyMappingConfig = {
    'background-color': 'bg',
    'border-color': 'brc',
    color: 'c',
    fill: 'fill',
    margin: 'm',
    'margin-bottom': 'mb',
    'margin-left': 'ml',
    'margin-right': 'mr',
    'margin-top': 'mt',
    'margin-top,margin-bottom': 'mv',
    'margin-left,margin-right': 'mh',
    padding: 'p',
    'padding-bottom': 'pb',
    'padding-left': 'pl',
    'padding-right': 'pr',
    'padding-top': 'pt',
    'padding-top,padding-bottom': 'pv',
    'padding-left,padding-right': 'ph'
  };

  return { ...defaultMappings, ...mappingsConfig };
}

function resolveColors(colorConfig: any): ColorConfig {
  if (!colorConfig) return {};
  return colorConfig as ColorConfig;
}

function resolveSpacing(spacingConfig: any): SpacingConfig {
  if (!spacingConfig) return {};
  return spacingConfig as SpacingConfig;
}

export function resolveConfig(config: any): Config {
  config.settings = config.settings || {};

  return {
    settings: {
      namespace: resolveNamespace(config.settings.namespace),
      propertyMapping: resolvePropertyMapping(config.settings.propertyMapping)
    },
    color: resolveColors(config.color),
    spacing: resolveSpacing(config.spacing)
  };
}
