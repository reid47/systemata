import {
  formatCssRule,
  formatVariableDeclaration,
  capitalizeWord,
  toTitleCase,
  parseSemVer,
  pathGet,
  pathSet
} from '../src/utils';

describe('formatCssRule', () => {
  test('format: css', () => {
    expect(
      formatCssRule(
        {
          type: 'color',
          selector: '.my-class',
          properties: [
            {
              property: 'color',
              value: { type: 'color', name: 'my-variable', value: 'red' }
            }
          ]
        },
        'css'
      )
    ).toEqual('.my-class { color: red }');

    expect(
      formatCssRule(
        {
          type: 'color',
          selector: '.my-class',
          properties: [
            {
              property: 'color',
              value: { type: 'color', name: 'my-variable', value: 'red' }
            },
            {
              property: 'fill',
              value: { type: 'color', name: 'my-variable2', value: 'blue' }
            }
          ]
        },
        'css'
      )
    ).toEqual('.my-class { color: red; fill: blue }');
  });

  test('format: sass', () => {
    expect(
      formatCssRule(
        {
          type: 'color',
          selector: '.my-class',
          properties: [
            {
              property: 'color',
              value: { type: 'color', name: 'my-variable', value: 'red' }
            }
          ]
        },
        'sass'
      )
    ).toEqual('.my-class { color: $my-variable }');

    expect(
      formatCssRule(
        {
          type: 'color',
          selector: '.my-class',
          properties: [
            {
              property: 'color',
              value: { type: 'color', name: 'my-variable', value: 'red' }
            },
            {
              property: 'fill',
              value: { type: 'color', name: 'my-variable2', value: 'blue' }
            }
          ]
        },
        'sass'
      )
    ).toEqual('.my-class { color: $my-variable; fill: $my-variable2 }');
  });

  test('format: less', () => {
    expect(
      formatCssRule(
        {
          type: 'color',
          selector: '.my-class',
          properties: [
            {
              property: 'color',
              value: { type: 'color', name: 'my-variable', value: 'red' }
            }
          ]
        },
        'less'
      )
    ).toEqual('.my-class { color: @my-variable }');

    expect(
      formatCssRule(
        {
          type: 'color',
          selector: '.my-class',
          properties: [
            {
              property: 'color',
              value: { type: 'color', name: 'my-variable', value: 'red' }
            },
            {
              property: 'fill',
              value: { type: 'color', name: 'my-variable2', value: 'blue' }
            }
          ]
        },
        'less'
      )
    ).toEqual('.my-class { color: @my-variable; fill: @my-variable2 }');
  });
});

describe('formatVariableDeclaration', () => {
  test('format: sass', () => {
    expect(
      formatVariableDeclaration(
        {
          type: 'color',
          name: 'my-color',
          value: 'purple'
        },
        'sass'
      )
    ).toEqual('$my-color: purple;');
  });

  test('format: less', () => {
    expect(
      formatVariableDeclaration(
        {
          type: 'color',
          name: 'my-color',
          value: 'purple'
        },
        'less'
      )
    ).toEqual('@my-color: purple;');
  });

  test('format: css-variables', () => {
    expect(
      formatVariableDeclaration(
        {
          type: 'color',
          name: 'my-color',
          value: 'purple'
        },
        'css-variables'
      )
    ).toEqual('--my-color: purple;');
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

test('pathGet', () => {
  expect(pathGet({ a: { b: 2 } }, ['a', 'b'])).toBe(2);
  expect(pathGet({ a: { b: { c: 'wow' } } }, ['a', 'b', 'c'])).toBe('wow');
});

test('pathSet', () => {
  const obj1 = { a: { b: 2 } };
  expect(pathSet(obj1, ['a', 'b'], 47)).toBeUndefined();
  expect(obj1.a.b).toBe(47);

  const obj2 = { a: { b: { c: 'wow' } } };
  expect(pathSet(obj2, ['a', 'b', 'c'], 'hello')).toBeUndefined();
  expect(obj2.a.b.c).toBe('hello');
});
