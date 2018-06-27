const { withValidConfig, camelCaseVariableName, mapTokens } = require('../utils');

module.exports = withValidConfig(config => {
  const { settings: { namespace } = {} } = config;
  const output = {};

  mapTokens(config, ({ tokenType, token: { id, value } }) => {
    const varName = camelCaseVariableName({ tokenType, namespace, id });
    output[varName] = value;
  });

  return JSON.stringify(output, null, 2);
});
