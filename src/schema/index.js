const ajv = require('ajv')({ allErrors: true, jsonPointers: true });
const schema = require('./schema');
const formatError = require('./format-error');
const validate = ajv.compile(schema);

const validateConfig = config => {
  const valid = validate(config);
  if (valid) return;
  return [...validate.errors].map(error => formatError(config, error));
};

module.exports = { validateConfig, schema };
