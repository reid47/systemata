class CssBuilder {
  constructor() {
    this.rules = {};
  }

  addRule(selector, styles) {
    this.rules[selector] = {
      ...this.rules[selector],
      ...styles
    };
  }

  toCss() {
    const lines = [];

    Object.keys(this.rules).forEach(selector => {
      lines.push(`${selector} {`);
      Object.keys(this.rules[selector]).forEach(property => {
        const value = this.rules[selector][property];
        lines.push(`  ${property}: ${value};`);
      });
      lines.push('}\n');
    });

    return lines.join('\n');
  }
}

module.exports = { CssBuilder };
