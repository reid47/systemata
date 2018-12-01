import { generate } from '../src/index';

const output = { format: 'css' };

describe('namespace', () => {
  test('namespace (string)', () => {
    const config = {
      settings: {
        namespace: 'rm-'
      },
      colors: {
        primary: '#f00',
        secondary: '#0f0'
      }
    };

    expect(generate(config, output)).toMatchSnapshot();
  });

  test('namespace (boolean)', () => {
    const config = {
      settings: {
        namespace: true
      },
      colors: {
        primary: '#f00',
        secondary: '#0f0'
      }
    };

    expect(generate(config, output)).toMatchSnapshot();
  });

  test('namespace (object with prefix)', () => {
    const config = {
      settings: {
        namespace: { prefix: 'wow-' }
      },
      colors: {
        primary: '#f00',
        secondary: '#0f0'
      }
    };

    expect(generate(config, output)).toMatchSnapshot();
  });

  test('namespace (object with parentClass)', () => {
    const config = {
      settings: {
        namespace: { parentClass: 'parent' }
      },
      colors: {
        primary: '#f00',
        secondary: '#0f0'
      }
    };

    expect(generate(config, output)).toMatchSnapshot();
  });

  test('namespace (object with peerClass)', () => {
    const config = {
      settings: {
        namespace: { peerClass: 'peer' }
      },
      colors: {
        primary: '#f00',
        secondary: '#0f0'
      }
    };

    expect(generate(config, output)).toMatchSnapshot();
  });

  test('namespace (object with multiple namespace types)', () => {
    const config = {
      settings: {
        namespace: {
          prefix: 'pfx-',
          parentClass: 'parent',
          peerClass: 'peer'
        }
      },
      colors: {
        primary: '#f00',
        secondary: '#0f0'
      }
    };

    expect(generate(config, output)).toMatchSnapshot();
  });
});

describe('propertyMapping', () => {
  test('renaming properties', () => {
    const config = {
      settings: {
        propertyMapping: {
          color: 'my-name-for-color'
        }
      },
      colors: {
        primary: '#f00',
        secondary: '#0f0'
      }
    };

    expect(generate(config, output)).toMatchSnapshot();
  });

  test('excluding properties', () => {
    const config = {
      settings: {
        propertyMapping: {
          fill: false
        }
      },
      colors: {
        primary: '#f00',
        secondary: '#0f0'
      }
    };

    expect(generate(config, output)).toMatchSnapshot();
  });
});
