const { schema } = require('../../src/schema');

describe('schema definition', () => {
  it('is an object', () => {
    expect(typeof schema).toBe('object');
  });
});
