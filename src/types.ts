export interface Config {
  __configFilePath: string;
  system: SystemConfig;
  namespace: NamespaceConfig;
  propertyMapping: PropertyMappingConfig;
  output: OutputConfig;
  color: ColorConfig;
  spacing: SpacingConfig;
}

export interface ArchivedConfig extends Config {
  __archived: {
    archiveDate: string;
    systemataVersion: string;
  };
}

export interface SystemConfig {
  [key: string]: string | undefined;
  name: string;
  version: string;
  description?: string;
}

export type OutputFileFormat = 'css' | 'sass' | 'less' | 'css-variables' | 'docs';

export interface OutputFileConfig {
  format: OutputFileFormat;
  fileName: string;
}

export interface GeneratedFile extends OutputFileConfig {
  content: string;
}

export interface OutputConfig {
  buildDirectory: string;
  archiveDirectory: string;
  files: OutputFileConfig[];
}

export interface ValueDefinition {
  value: string;
  description?: string;
  deprecated?: string | boolean;
}

export interface ColorConfig {
  [name: string]: ValueDefinition;
}

export interface SpacingConfig {
  [name: string]: ValueDefinition;
}

export interface NamespaceConfig {
  prefix: string | boolean;
  parentClass: string | boolean;
  peerClass: string | boolean;
}

export interface PropertyMappingConfig {
  [property: string]: string | boolean;
  'background-color': string | boolean;
  'border-color': string | boolean;
  color: string | boolean;
  fill: string | boolean;
}

export type RuleMap = ReadonlyMap<string, CssRule>;

export type VariableMap = ReadonlyMap<string, Variable>;

export type CssPropertyType = 'color' | 'spacing';

export interface CssProperty {
  property: string;
  value: Variable;
}

export interface CssRule {
  type: CssPropertyType;
  selector: string;
  atRule?: string;
  important?: boolean;
  properties: CssProperty[];
}

export interface Variable {
  type: CssPropertyType;
  name: string;
  value: string;
}

export interface CliInput {
  command?: 'archive' | 'build' | 'develop' | 'init' | 'show-config';
  args: {
    help?: boolean;
    version?: boolean;
    configFile?: string;
    skipQuestions?: boolean;
  };
}
