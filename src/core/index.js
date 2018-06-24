const { CssBuilder } = require('../css-builder');

function generate(config) {
  const { typography } = config;

  const cssBuilder = new CssBuilder();

  Object.keys(typography.sizes).forEach(typeSize => {
    cssBuilder.addRule(typeSize, {
      'font-size': typography.sizes[typeSize]
    });
  });

  console.log(JSON.stringify(config, null, 2));
  console.log(cssBuilder.toCss());
}

module.exports = { generate };
