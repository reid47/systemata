export interface Config {
  system: SystemConfig;
  namespace: NamespaceConfig;
  propertyMapping: PropertyMappingConfig;
  output: OutputConfig;
  color: ColorConfig;
  spacing: SpacingConfig;
}

export interface SystemConfig {
  [key: string]: string | undefined;
  name: string;
  version: string;
  description?: string;
}

export interface OutputConfig {
  format: 'css' | 'sass' | 'less' | 'css-variables' | 'docs';
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

export type RuleMap = Map<string, CssRule>;

export type VariableMap = Map<string, Variable>;

export type CssPropertyType = 'color' | 'spacing';

export interface CssProperty {
  property: string;
  value: string;
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
  command?: 'init' | 'develop' | 'build';
  args: {
    help?: boolean;
    version?: boolean;
    configFile?: string;
    skipQuestions?: boolean;
  };
}
