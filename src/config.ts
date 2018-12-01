import { NamespaceConfig, Config, ColorConfig, PropertyMappingConfig } from './types';

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
    fill: 'fill'
  };

  return { ...defaultMappings, ...mappingsConfig };
}

function resolveColors(colorConfig: any): ColorConfig {
  if (!colorConfig) return {};
  return colorConfig as ColorConfig;
}

export function resolveConfig(config: any): Config {
  config.settings = config.settings || {};

  return {
    settings: {
      namespace: resolveNamespace(config.settings.namespace),
      propertyMapping: resolvePropertyMapping(config.settings.propertyMapping)
    },
    colors: resolveColors(config.colors)
  };
}
