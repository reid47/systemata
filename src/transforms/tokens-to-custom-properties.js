const {
  withValidConfig,
  kebabCaseVariableName,
  mapTokens,
  toSlashStarComment
} = require('../utils');

module.exports = withValidConfig(config => {
  const { settings: { namespace } = {} } = config;
  return (
    ':root {\n' +
    mapTokens(config, ({ tokenType, token: { id, value, description } }) => {
      const varName = kebabCaseVariableName({ tokenType, namespace, id });
      const comment = !description ? '' : toSlashStarComment(description, 2) + '\n';
      return comment + `  --${varName}: '${value}'`;
    }).join(';\n\n') +
    '\n};'
  );
});
