const { assertValidConfig } = require('./schema');

const capitalize = str => (str.length < 1 ? str : str[0].toUpperCase() + str.substr(1));

const kebabCaseVariableName = ({ tokenType, namespace, id }) => {
  return (namespace ? namespace + '-' : '') + tokenType + '-' + id;
};

const camelCaseVariableName = ({ tokenType, namespace, id }) => {
  return kebabCaseVariableName({ tokenType, namespace, id })
    .split('-')
    .map((part, i) => (i === 0 ? part : capitalize(part)))
    .join('');
};

const withValidConfig = func => (config, options) => {
  assertValidConfig(config);
  return func(config, options);
};

const mapTokens = ({ tokens = {} }, func) => {
  const result = [];

  Object.keys(tokens).forEach(tokenType => {
    (tokens[tokenType] || []).forEach(token => {
      result.push(func({ tokenType, token }));
    });
  });

  return result;
};

const toDoubleSlashComment = (text, indentLevel = 0) => {
  return text
    .split('\n')
    .map(s => `${' '.repeat(indentLevel)}// ${s.trim()}`)
    .join('\n');
};

const toSlashStarComment = (text, indentLevel = 0) => {
  const indent = ' '.repeat(indentLevel);
  return (
    `${indent}/**\n` +
    text
      .split('\n')
      .map(s => `${indent} * ${s.trim()}`)
      .join('\n') +
    `\n${indent} */`
  );
};

module.exports = {
  withValidConfig,
  mapTokens,
  kebabCaseVariableName,
  camelCaseVariableName,
  toDoubleSlashComment,
  toSlashStarComment
};
