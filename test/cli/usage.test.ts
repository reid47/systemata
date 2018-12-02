import { usage } from '../../src/cli/usage';

test('main', () => {
  expect(usage.main).toMatchSnapshot();
});

test('archive', () => {
  expect(usage.archive).toMatchSnapshot();
});

test('build', () => {
  expect(usage.build).toMatchSnapshot();
});

test('develop', () => {
  expect(usage.develop).toMatchSnapshot();
});

test('init', () => {
  expect(usage.init).toMatchSnapshot();
});

test('show-config', () => {
  expect(usage['show-config']).toMatchSnapshot();
});
