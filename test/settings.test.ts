import { getContent } from './test-utils';

const output = {
  files: [{ format: 'css', fileName: 'test.css' }]
};

describe('namespace', () => {
  test('namespace (object with prefix)', () => {
    const config = {
      output,
      namespace: {
        prefix: 'wow-'
      },
      color: {
        primary: { value: '#f00' },
        secondary: { value: '#0f0' }
      }
    };

    expect(getContent(config)).toMatchSnapshot();
  });

  test('namespace (object with parentClass)', () => {
    const config = {
      output,
      namespace: {
        parentClass: 'parent'
      },
      color: {
        primary: { value: '#f00' },
        secondary: { value: '#0f0' }
      }
    };

    expect(getContent(config)).toMatchSnapshot();
  });

  test('namespace (object with peerClass)', () => {
    const config = {
      output,
      namespace: { peerClass: 'peer' },
      color: {
        primary: { value: '#f00' },
        secondary: { value: '#0f0' }
      }
    };

    expect(getContent(config)).toMatchSnapshot();
  });

  test('namespace (object with multiple namespace types)', () => {
    const config = {
      output,
      namespace: {
        prefix: 'pfx-',
        parentClass: 'parent',
        peerClass: 'peer'
      },
      color: {
        primary: { value: '#f00' },
        secondary: { value: '#0f0' }
      }
    };

    expect(getContent(config)).toMatchSnapshot();
  });
});

describe('propertyMapping', () => {
  test('renaming properties', () => {
    const config = {
      output,
      propertyMapping: {
        color: 'my-name-for-color'
      },
      color: {
        primary: { value: '#f00' },
        secondary: { value: '#0f0' }
      }
    };

    expect(getContent(config)).toMatchSnapshot();
  });

  test('excluding properties', () => {
    const config = {
      output,
      propertyMapping: {
        fill: false
      },
      color: {
        primary: { value: '#f00' },
        secondary: { value: '#0f0' }
      }
    };

    expect(getContent(config)).toMatchSnapshot();
  });
});
