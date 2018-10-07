export const capitalize = str => {
  if (!str || !str.length) return str;
  return str[0].toUpperCase() + str.substr(1);
};

export const kebabCaseVariableName = ({ tokenType, namespace, id }) => {
  return (namespace ? namespace + '-' : '') + tokenType + '-' + id;
};

export const camelCaseVariableName = ({ tokenType, namespace, id }) => {
  return kebabCaseVariableName({ tokenType, namespace, id })
    .split('-')
    .map((part, i) => (i === 0 ? part : capitalize(part)))
    .join('');
};

export const toLineComment = (text, indentLevel = 0) => {
  return text
    .split('\n')
    .map(s => `${' '.repeat(indentLevel)}// ${s.trim()}`)
    .join('\n');
};

export const toBlockComment = (text, indentLevel = 0) => {
  const indent = ' '.repeat(indentLevel);

  return `${indent}/**\n${text
    .split('\n')
    .filter(line => line.trim())
    .map(line => `${indent} * ${line.trim()}`)
    .join('\n')}\n${indent} */`;
};

export const mapSortedEntries = (obj, func) => {
  return Object.keys(obj)
    .sort()
    .map((key, i) => func(key, obj[key], i));
};

export const filterBlankLines = lines => {
  return lines.filter(line => !!line.trim());
};

export const joinLines = lines => {
  if (!Array.isArray(lines)) return lines;
  return lines.join('\n');
};

export const toSassVariable = (prefix, valueName, settings) => {
  return `$${settings.namespace || ''}${prefix}${valueName}`;
};

export const toCssRule = (className, property, value, settings) => {
  return `.${settings.namespace || ''}${className} { ${property}: ${value}${
    settings.important ? ' !important' : ''
  }; }`;
};
