const lookup = (config, pointer) =>
  pointer
    .split('/')
    .filter(Boolean)
    .reduce((acc, part) => acc[part], config);

const formatError = (config, { keyword, params, dataPath, message }) => {
  const given = lookup(config, dataPath);
  const givenStr = JSON.stringify(given);

  if (keyword === 'additionalProperties') {
    const { additionalProperty } = params;
    message = `should not have property "${additionalProperty}"`;
  } else if (keyword === 'required') {
    const { missingProperty } = params;
    message = `should have required property "${missingProperty}"`;
  } else if (keyword === 'type') {
    const { type } = params;
    message = `should be ${type}, but given ${typeof given}: ${givenStr}`;
  } else {
    message = `${message}, but given ${typeof given}: ${givenStr}`;
  }

  return `${dataPath || '/'}: ${message}`;
};

module.exports = formatError;
