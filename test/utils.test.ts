import { formatCssRule, formatVariableDeclaration, capitalizeWord, toTitleCase } from '../src/utils';

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
