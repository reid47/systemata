export const capitalize = (str: string) => {
  if (!str || !str.length) return str;
  return str[0].toUpperCase() + str.substr(1);
};

export const toLineComment = (text: string, indentLevel = 0) => {
  return text
    .split('\n')
    .map(s => `${' '.repeat(indentLevel)}// ${s.trim()}`)
    .join('\n');
};

export const toBlockComment = (text: string, indentLevel = 0) => {
  const indent = ' '.repeat(indentLevel);

  return `${indent}/**\n${text
    .split('\n')
    .filter(line => line.trim())
    .map(line => `${indent} * ${line.trim()}`)
    .join('\n')}\n${indent} */`;
};

export const mapSortedEntries = (obj: any, func: Function) => {
  return Object.keys(obj)
    .sort()
    .map((key, i) => func(key, obj[key], i));
};

export const filterBlankLines = (lines: string[]) => {
  return lines.filter(line => !!line.trim());
};

export const joinLines = (lines: string[]) => {
  if (!Array.isArray(lines)) return lines;
  return lines.join('\n');
};
