const ajv = require('ajv')({ allErrors: true, jsonPointers: true });
const schema = require('./schema');
const formatError = require('./format-error');
const validate = ajv.compile(schema);

class SchemaValidationError extends Error {
  constructor(errors) {
    super('Invalid configuration schema:' + errors.map(e => `\n  - ${e}`).join(''));
  }
}

const validateConfig = config => {
  const valid = validate(config);
  if (valid) return;
  return [...validate.errors].map(error => formatError(config, error));
};

const assertValidConfig = config => {
  const errors = validateConfig(config);
  if (errors) throw new SchemaValidationError(errors);
};

module.exports = { validateConfig, assertValidConfig, schema };
