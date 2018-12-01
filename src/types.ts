export interface Config {
  settings: {
    namespace: NamespaceConfig | false;
  };

  colors: ColorConfig;
}

export interface ColorConfig {
  [name: string]: string;
}

export interface NamespaceConfig {
  prefix: string | boolean;
  parentClass: string | boolean;
  peerClass: string | boolean;
}

export interface OutputOptions {
  format: 'css' | 'sass';
}
