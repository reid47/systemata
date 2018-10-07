import { toBlockComment, joinLines, toLineComment } from '../utils';

export default class FileBuilder {
  constructor(config) {
    this.config = config || {};
    this.settings = this.config.settings || {};
    this.sections = {};
    this.orderedSections = [];

    this.addSection('headerComment');
    this.pushToSection('headerComment', toBlockComment('Auto-generated file. Do not edit directly.'));
  }

  addSection(sectionName, description) {
    this.orderedSections.push(sectionName);
    this.sections[sectionName] = { description, content: [] };
  }

  pushToSection(section, lines) {
    if (!this.sections[section]) {
      throw new Error(`Cannot push to unknown section: '${section}'`);
    }

    if (Array.isArray(lines)) {
      this.sections[section].content.push(...lines.filter(Boolean));
    } else {
      this.sections[section].content.push(lines);
    }
  }

  addHeaderComment() {
    const { name, version, description } = this.settings;
    this.pushToSection('headerComment', toBlockComment(`${name}\nversion ${version}\n${description}`));
  }

  toString() {
    return this.orderedSections
      .map(sectionName => {
        const { description, content } = this.sections[sectionName];
        return joinLines([description && toLineComment(description), ...content].filter(Boolean));
      })
      .join('\n\n');
  }
}
