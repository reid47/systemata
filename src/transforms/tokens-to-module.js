const {
  withValidConfig,
  camelCaseVariableName,
  mapTokens,
  toDoubleSlashComment
} = require('../utils');

module.exports = withValidConfig(config => {
  const { settings: { namespace } = {} } = config;

  return mapTokens(config, ({ tokenType, token: { id, value, description } }) => {
    const varName = camelCaseVariableName({ tokenType, namespace, id });
    const comment = !description ? '' : toDoubleSlashComment(description) + '\n';
    return comment + `export const ${varName} = '${value}';\n`;
  }).join('\n');
});
