const ajv = require('ajv')({ allErrors: true });
const schema = require('./schema');
const validate = ajv.compile(schema);

const validateConfig = config => {
  const valid = validate(config);
  if (valid) return;
  const errors = [...validate.errors];
  console.log({ errors });
};

module.exports = { validateConfig, schema };
