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
