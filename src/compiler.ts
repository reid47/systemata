import { resolveConfig } from './config';
import { Config, OutputFileConfig, VariableMap, RuleMap, GeneratedFile } from './types';
import { generateCss } from './generate-css';
import { generateSass } from './generate-sass';
import { generateLess } from './generate-less';
import { buildRuleMap, buildVariableMap } from './rule-map';
import { generateCssVariables } from './generate-css-variables';
import { generateDocs } from './generate-docs';

export class Compiler {
  config: Config;

  constructor(config: any) {
    this.config = resolveConfig(config);
  }

  generateFile(file: OutputFileConfig, variableMap: VariableMap, ruleMap: RuleMap): GeneratedFile {
    const { fileName, format } = file;

    let content = '';
    switch (format) {
      case 'css':
        content = generateCss(ruleMap);
        break;

      case 'sass':
        content = generateSass(variableMap, ruleMap);
        break;

      case 'less':
        content = generateLess(variableMap, ruleMap);
        break;

      case 'css-variables':
        content = generateCssVariables(variableMap, ruleMap);
        break;

      case 'docs':
        content = generateDocs(variableMap, ruleMap);
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
