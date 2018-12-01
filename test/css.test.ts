import { generate } from '../src/index';

const output = { format: 'css' };

test('color styles', () => {
  const config = {
    colors: {
      primary: '#f00',
      secondary: '#0f0'
    }
  };

  expect(generate(config, output)).toMatchSnapshot();
});
