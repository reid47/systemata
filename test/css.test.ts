import { generate } from '../src/index';

describe('CSS generation', () => {
  it('works', () => {
    const config = {
      colors: {
        primary: '#f00',
        secondary: '#0f0'
      }
    };

    const output = {
      format: 'css'
    };

    expect(generate(config, output)).toMatchSnapshot();
  });
});
