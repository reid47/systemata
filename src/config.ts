import {
  NamespaceConfig,
  Config,
  ColorConfig,
  PropertyMappingConfig,
  SpacingConfig,
  OutputConfig,
  SystemConfig
} from './types';

function resolveSystem(systemConfig: any): SystemConfig {
  systemConfig = systemConfig || {};

  return {
    name: systemConfig.name || 'untitled-system',
    version: systemConfig.version || 'version',
    description: systemConfig.description || ''
  };
}

function resolveOutput(outputConfig: any): OutputConfig {
  return {
    format: outputConfig.format || 'css'
  };
}

function resolveNamespace(namespaceConfig: any): NamespaceConfig {
  namespaceConfig = namespaceConfig || {};

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
  return {
    system: resolveSystem(config.system),
    namespace: resolveNamespace(config.namespace),
    propertyMapping: resolvePropertyMapping(config.propertyMapping),
    output: resolveOutput(config.output),
    color: resolveColors(config.color),
    spacing: resolveSpacing(config.spacing)
  };
}
