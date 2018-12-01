import { NamespaceConfig, Config, ColorConfig } from './types';

function resolveNamespace(namespaceConfig: any): NamespaceConfig | false {
  if (!namespaceConfig) return false;

  if (typeof namespaceConfig === 'string') {
    return {
      prefix: namespaceConfig,
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

function resolveColors(colorConfig: any): ColorConfig {
  if (!colorConfig) return {};
  return colorConfig as ColorConfig;
}

export function resolveConfig(config: any): Config {
  return {
    settings: {
      namespace: resolveNamespace(config.namespace)
    },
    colors: resolveColors(config.colors)
  };
}
