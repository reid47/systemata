import { generate } from '../src/index';

const output = { format: 'docs' };

test('mixed styles', () => {
  const config = {
    output,
    color: {
      primary: '#f00',
      secondary: '#0f0'
    },
    spacing: {
      small: '8px',
      large: '64px'
    }
  };

  expect(generate(config)).toMatchSnapshot();
});
