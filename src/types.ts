export interface Config {
  settings: {
    namespace: NamespaceConfig | false;
    propertyMapping: PropertyMappingConfig;
  };

  color: ColorConfig;
  spacing: SpacingConfig;
}

export interface ColorConfig {
  [name: string]: string;
}

export interface SpacingConfig {
  [name: string]: string;
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

export interface OutputOptions {
  format: 'css' | 'sass';
}
