import { generate } from '../src/index';

const output = { format: 'css' };

test('color styles', () => {
  const config = {
    color: {
      primary: '#f00',
      secondary: '#0f0'
    }
  };

  expect(generate(config, output)).toMatchSnapshot();
});

test('spacing styles', () => {
  const config = {
    spacing: {
      small: '8px',
      large: '64px'
    }
  };

  expect(generate(config, output)).toMatchSnapshot();
});
