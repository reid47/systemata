const {
  withValidConfig,
  kebabCaseVariableName,
  mapTokens,
  toDoubleSlashComment
} = require('../utils');

module.exports = withValidConfig(config => {
  const { settings: { namespace } = {} } = config;

  return mapTokens(config, ({ tokenType, token: { id, value, description } }) => {
    const varName = kebabCaseVariableName({ tokenType, namespace, id });
    const comment = !description ? '' : toDoubleSlashComment(description) + '\n';
    return comment + `@${varName}: ${value};\n`;
  }).join('\n');
});
