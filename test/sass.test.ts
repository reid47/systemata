import { generate } from '../src/index';

const output = { format: 'sass' };

test('color styles', () => {
  const config = {
    output,
    color: {
      primary: '#f00',
      secondary: '#0f0'
    }
  };

  expect(generate(config)).toMatchSnapshot();
});

test('spacing styles', () => {
  const config = {
    output,
    spacing: {
      small: '8px',
      large: '64px'
    }
  };

  expect(generate(config)).toMatchSnapshot();
});
