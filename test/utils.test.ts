import { printJsObject } from '../src/utils';

describe('printJsObject', () => {
  it('works', () => {
    expect(printJsObject({ abcDef: 1, wow: 'cool' })).toBe(`{
  abcDef: 1,
  wow: "cool"
}`);

    expect(printJsObject({ arr: [], obj: {} })).toBe(`{
  arr: [],
  obj: {}
}`);

    expect(printJsObject({ 'margin-left': '8px' })).toBe(`{
  "margin-left": "8px"
}`);
  });
});
