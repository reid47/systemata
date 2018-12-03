import * as path from 'path';
import {
  NamespaceConfig,
  Config,
  ColorConfig,
  PropertyMappingConfig,
  SpacingConfig,
  OutputConfig,
  SystemConfig,
  OutputFileConfig,
  DevelopmentConfig
} from './types';
import { version as systemataVersion } from '../package.json';
import { parseSemVer } from './utils';
import { ConfigurationError } from './config-error';

function resolveSystem(systemConfig: any): SystemConfig {
  systemConfig = systemConfig || {};

  const version = systemConfig.version || '0.0.1';
  if (!parseSemVer(version).valid) {
    throw new ConfigurationError(
      'system.version',
      `'${version}' is not a three-part version string (e.g. '0.1.2').`
    );
  }

  return {
    name: systemConfig.name || 'untitled-system',
    version,
    description: systemConfig.description || ''
  };
}

function resolveDevelopment(devConfig: any): DevelopmentConfig {
  devConfig = devConfig || {};

  return {
    serverPort: devConfig.serverPort || 4700
  };
}

function resolveOutput(outputConfig: any, configFileDir: string): OutputConfig {
  outputConfig = outputConfig || {};

  const files: OutputFileConfig[] = [];

  (outputConfig.files || []).forEach((file: any, index: number) => {
    file = file || {};

    const fileName = file.fileName || '';
    if (!fileName) {
      throw new ConfigurationError(`output.files[${index}].fileName`, 'File name must be specified.');
    }

    files.push({
      format: file.format || 'css',
      fileName
    });
  });

  return {
    buildDirectory: path.resolve(configFileDir, outputConfig.buildDirectory || './systemata-build'),
    archiveDirectory: path.resolve(configFileDir, outputConfig.archiveDirectory || './systemata-archive'),
    files
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

export function resolveConfig(config: any, configFilePath: string): Config {
  config = config || {};

  const configFileDir = path.dirname(configFilePath);

  return {
    __configFilePath: configFilePath,
    __systemataVersion: systemataVersion,
    system: resolveSystem(config.system),
    development: resolveDevelopment(config.development),
    namespace: resolveNamespace(config.namespace),
    propertyMapping: resolvePropertyMapping(config.propertyMapping),
    output: resolveOutput(config.output, configFileDir),
    color: resolveColors(config.color),
    spacing: resolveSpacing(config.spacing)
  };
}
