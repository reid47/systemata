import { generate } from '../src/index';

const output = { format: 'docs' };

test('mixed styles', () => {
  const config = {
    output,
    color: {
      primary: { value: '#f00' },
      secondary: { value: '#0f0' }
    },
    spacing: {
      small: { value: '8px' },
      large: { value: '64px' }
    }
  };

  expect(generate(config)).toMatchSnapshot();
});
