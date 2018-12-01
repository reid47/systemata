import { generate } from '../src/index';

const output = { format: 'css' };

describe('namespace', () => {
  test('namespace (string)', () => {
    const config = {
      output,
      settings: {
        namespace: 'rm-'
      },
      color: {
        primary: '#f00',
        secondary: '#0f0'
      }
    };

    expect(generate(config)).toMatchSnapshot();
  });

  test('namespace (boolean)', () => {
    const config = {
      output,
      settings: {
        namespace: true
      },
      color: {
        primary: '#f00',
        secondary: '#0f0'
      }
    };

    expect(generate(config)).toMatchSnapshot();
  });

  test('namespace (object with prefix)', () => {
    const config = {
      output,
      settings: {
        namespace: { prefix: 'wow-' }
      },
      color: {
        primary: '#f00',
        secondary: '#0f0'
      }
    };

    expect(generate(config)).toMatchSnapshot();
  });

  test('namespace (object with parentClass)', () => {
    const config = {
      output,
      settings: {
        namespace: { parentClass: 'parent' }
      },
      color: {
        primary: '#f00',
        secondary: '#0f0'
      }
    };

    expect(generate(config)).toMatchSnapshot();
  });

  test('namespace (object with peerClass)', () => {
    const config = {
      output,
      settings: {
        namespace: { peerClass: 'peer' }
      },
      color: {
        primary: '#f00',
        secondary: '#0f0'
      }
    };

    expect(generate(config)).toMatchSnapshot();
  });

  test('namespace (object with multiple namespace types)', () => {
    const config = {
      output,
      settings: {
        namespace: {
          prefix: 'pfx-',
          parentClass: 'parent',
          peerClass: 'peer'
        }
      },
      color: {
        primary: '#f00',
        secondary: '#0f0'
      }
    };

    expect(generate(config)).toMatchSnapshot();
  });
});

describe('propertyMapping', () => {
  test('renaming properties', () => {
    const config = {
      output,
      settings: {
        propertyMapping: {
          color: 'my-name-for-color'
        }
      },
      color: {
        primary: '#f00',
        secondary: '#0f0'
      }
    };

    expect(generate(config)).toMatchSnapshot();
  });

  test('excluding properties', () => {
    const config = {
      output,
      settings: {
        propertyMapping: {
          fill: false
        }
      },
      color: {
        primary: '#f00',
        secondary: '#0f0'
      }
    };

    expect(generate(config)).toMatchSnapshot();
  });
});
