import { generate } from '../src/index';

const output = { format: 'css' };

describe('namespace', () => {
  test('namespace (string)', () => {
    const config = {
      settings: {
        namespace: 'rm-'
      },
      color: {
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
      color: {
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
      color: {
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
      color: {
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
      color: {
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
      color: {
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
      color: {
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
      color: {
        primary: '#f00',
        secondary: '#0f0'
      }
    };

    expect(generate(config, output)).toMatchSnapshot();
  });
});
