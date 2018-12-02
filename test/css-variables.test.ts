import { generate } from '../src/index';

const output = { format: 'css-variables' };

test('color styles', () => {
  const config = {
    output,
    color: {
      primary: { value: '#f00' },
      secondary: { value: '#0f0' }
    }
  };

  expect(generate(config)).toMatchSnapshot();
});

test('spacing styles', () => {
  const config = {
    output,
    spacing: {
      small: { value: '8px' },
      large: { value: '64px' }
    }
  };

  expect(generate(config)).toMatchSnapshot();
});
