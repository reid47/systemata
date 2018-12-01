import { resolveConfig } from './config';
import { Config } from './types';
import { generateCss } from './generate-css';
import { generateSass } from './generate-sass';
import { generateLess } from './generate-less';
import { buildRuleMap, buildVariableMap } from './rule-map';

export class Compiler {
  config: Config;

  constructor(config: any) {
    this.config = resolveConfig(config);
  }

  toString() {
    const { output } = this.config;

    const variableMap = buildVariableMap(this.config);
    const ruleMap = buildRuleMap(this.config, variableMap);

    switch (output.format) {
      case 'css':
        return generateCss(ruleMap);
      case 'sass':
        return generateSass(variableMap, ruleMap);
      case 'less':
        return generateLess(variableMap, ruleMap);
    }

    throw new Error('Unsupported output configuration');
  }
}
