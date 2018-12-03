import { resolveConfig } from './config';
import { Config, OutputFileConfig, VariableMap, RuleMap, GeneratedFile } from './types';
import { buildRuleMap, buildVariableMap } from './build-maps';
import * as generators from './generators';

export class Compiler {
  config: Config;

  constructor(config: any) {
    this.config = resolveConfig(config, '<unknown>');
  }

  generateFile(file: OutputFileConfig, variableMap: VariableMap, ruleMap: RuleMap): GeneratedFile {
    const { fileName, format } = file;

    let content = '';
    switch (format) {
      case 'css':
        content = generators.generateCss(ruleMap);
        break;

      case 'sass':
        content = generators.generateSass(variableMap, ruleMap);
        break;

      case 'less':
        content = generators.generateLess(variableMap, ruleMap);
        break;

      case 'css-variables':
        content = generators.generateCssVariables(variableMap, ruleMap);
        break;

      case 'docs':
        content = generators.generateDocs(variableMap, ruleMap);
        break;
    }

    return { fileName, format, content };
  }

  generate(): GeneratedFile[] {
    const { output } = this.config;

    const variableMap = buildVariableMap(this.config);
    const ruleMap = buildRuleMap(this.config, variableMap);

    return output.files.map(file => this.generateFile(file, variableMap, ruleMap));
  }
}
