import { resolveConfig } from './config';
import { Config, OutputOptions } from './types';
import { generateCss } from './generate-css';
import { buildRuleMap } from './rule-map';

export class Compiler {
  config: Config;
  output: OutputOptions;

  constructor(config: any, output: OutputOptions) {
    this.config = resolveConfig(config);
    this.output = output;
  }

  toString() {
    const ruleMap = buildRuleMap(this.config);

    if (this.output.format === 'css') return generateCss(ruleMap);

    throw new Error('Unsupported output configuration');
  }
}
