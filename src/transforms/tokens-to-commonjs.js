const {
  withValidConfig,
  camelCaseVariableName,
  mapTokens,
  toDoubleSlashComment
} = require('../utils');

module.exports = withValidConfig(config => {
  const { settings: { namespace } = {} } = config;
  return (
    'module.exports = {\n' +
    mapTokens(config, ({ tokenType, token: { id, value, description } }) => {
      const varName = camelCaseVariableName({ tokenType, namespace, id });
      const comment = !description ? '' : toDoubleSlashComment(description, 2) + '\n';
      return comment + `  ${varName}: '${value}'`;
    }).join(',\n\n') +
    '\n};'
  );
});
