import {
  formatCssRule,
  formatVariableDeclaration,
  capitalizeWord,
  toTitleCase,
  parseSemVer
} from '../src/utils';

describe('formatCssRule', () => {
  test('it works', () => {
    expect(
      formatCssRule({
        type: 'color',
        selector: '.my-class',
        properties: [{ property: 'color', value: 'red' }]
      })
    ).toEqual('.my-class { color: red }');

    expect(
      formatCssRule({
        type: 'color',
        selector: '.my-class',
        properties: [{ property: 'color', value: 'red' }, { property: 'fill', value: 'blue' }]
      })
    ).toEqual('.my-class { color: red; fill: blue }');
  });
});

describe('formatVariableDeclaration', () => {
  test('it works', () => {
    expect(
      formatVariableDeclaration({
        type: 'color',
        name: '$my-color',
        value: 'purple'
      })
    ).toEqual('$my-color: purple;');
  });
});

describe('capitalizeWord', () => {
  test('it works', () => {
    expect(capitalizeWord('wow')).toEqual('Wow');
  });
});

describe('toTitleCase', () => {
  test('it works', () => {
    expect(toTitleCase('hello')).toEqual('Hello');
    expect(toTitleCase('hello-world')).toEqual('Hello World');
    expect(toTitleCase('hello world')).toEqual('Hello World');
  });
});

describe('parseSemVer', () => {
  test('valid versions', () => {
    expect(parseSemVer('0.0.0')).toEqual({
      valid: true,
      major: 0,
      minor: 0,
      patch: 0
    });

    expect(parseSemVer('1.2.300')).toEqual({
      valid: true,
      major: 1,
      minor: 2,
      patch: 300
    });
  });

  test('invalid versions', () => {
    expect(parseSemVer('bad')).toEqual({
      valid: false,
      major: -1,
      minor: -1,
      patch: -1
    });

    expect(parseSemVer('1.2.bad')).toEqual({
      valid: false,
      major: -1,
      minor: -1,
      patch: -1
    });

    expect(parseSemVer('1.2.3.4')).toEqual({
      valid: false,
      major: -1,
      minor: -1,
      patch: -1
    });

    expect(parseSemVer('1')).toEqual({
      valid: false,
      major: -1,
      minor: -1,
      patch: -1
    });

    expect(parseSemVer('1.2')).toEqual({
      valid: false,
      major: -1,
      minor: -1,
      patch: -1
    });
  });
});
