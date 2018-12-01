import { resolveConfig } from './config';
import { Config, OutputOptions } from './types';
import { generateCss } from './generate-css';

export class Compiler {
  config: Config;
  output: OutputOptions;

  constructor(config: any, output: OutputOptions) {
    this.config = resolveConfig(config);
    this.output = output;
  }

  toString() {
    if (this.output.format === 'css') return generateCss(this.config);

    throw new Error('Unsupported output configuration');
  }
}
