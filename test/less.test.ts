import { getContent } from './test-utils';

const output = {
  files: [{ format: 'less', fileName: 'test.less' }]
};

test('color styles', () => {
  const config = {
    output,
    color: {
      primary: { value: '#f00' },
      secondary: { value: '#0f0' }
    }
  };

  expect(getContent(config)).toMatchSnapshot();
});

test('spacing styles', () => {
  const config = {
    output,
    spacing: {
      small: { value: '8px' },
      large: { value: '64px' }
    }
  };

  expect(getContent(config)).toMatchSnapshot();
});
