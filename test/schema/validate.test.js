const { validateConfig, schema } = require('../../src/schema');
const cssColorPattern = schema.definitions.cssColorValue.pattern;
const cssLengthPattern = schema.definitions.cssLengthValue.pattern;

const expectResult = (config, result) => expect(validateConfig(config)).toEqual(result);

describe('schema validation', () => {
  it('is a function', () => {
    expect(typeof validateConfig).toBe('function');
  });

  it('accepts empty config', () => {
    expectResult({});
  });

  it('returns errors for additional properties', () => {
    expectResult({ somethingUnexpected: 47 }, [
      '/: should not have property "somethingUnexpected"'
    ]);
    expectResult({ somethingUnexpected1: 47, somethingUnexpected2: 'helo' }, [
      '/: should not have property "somethingUnexpected1"',
      '/: should not have property "somethingUnexpected2"'
    ]);
  });

  describe('tokens', () => {
    const base = { id: 'someId', name: 'Token Name' };

    const makeLengthTestCases = tokenType => ({
      valid: [
        [],
        [{ ...base, value: '47px' }],
        [{ ...base, value: '47%' }],
        [{ ...base, value: '47em' }],
        [{ ...base, value: '47rem' }],
        [{ ...base, value: '47px', description: 'This is a color.' }]
      ],
      invalid: [
        {
          in: 'not an array',
          out: [`/tokens/${tokenType}: should be array, but given string: "not an array"`]
        },
        {
          in: [47],
          out: [`/tokens/${tokenType}/0: should be object, but given number: 47`]
        },
        {
          in: [{ name: 'Token Name', value: '100px' }],
          out: [`/tokens/${tokenType}/0: should have required property "id"`]
        },
        {
          in: [{ id: 'tokenId', value: '100px' }],
          out: [`/tokens/${tokenType}/0: should have required property "name"`]
        },
        {
          in: [{ id: 'tokenId', name: 'Token Name' }],
          out: [`/tokens/${tokenType}/0: should have required property "value"`]
        },
        {
          in: [{ id: 'tokenId', name: 'Token Name', value: '100px', wow: 'nice' }],
          out: [`/tokens/${tokenType}/0: should not have property "wow"`]
        },
        {
          in: [{ id: 'tokenId', name: 'Token Name', value: 47 }],
          out: [`/tokens/${tokenType}/0/value: should be string, but given number: 47`]
        },
        {
          in: [{ id: 'tokenId', name: 'Token Name', value: 'badlength' }],
          out: [
            `/tokens/${tokenType}/0/value: should match pattern "${cssLengthPattern}", but given string: "badlength"`
          ]
        }
      ]
    });

    const tokensTestCases = {
      borderRadius: makeLengthTestCases('borderRadius'),
      borderWidth: makeLengthTestCases('borderWidth'),
      fontSize: makeLengthTestCases('fontSize'),
      lineHeight: makeLengthTestCases('lineHeight'),
      spacing: makeLengthTestCases('spacing'),
      color: {
        valid: [
          [],
          [{ ...base, value: 'transparent' }],
          [{ ...base, value: '#ff0000' }],
          [{ ...base, value: '#bed' }],
          [{ ...base, value: 'rgb(0, 200, 0)' }],
          [{ ...base, value: 'rgb(0%, 50%, 0%)' }],
          [{ ...base, value: 'rgb(0,200,0)' }],
          [{ ...base, value: 'hsl(300, 37%, 99%)' }],
          [{ ...base, value: '#aaa', description: 'This is a color.' }]
        ],
        invalid: [
          {
            in: 'not an array',
            out: ['/tokens/color: should be array, but given string: "not an array"']
          },
          {
            in: [47],
            out: ['/tokens/color/0: should be object, but given number: 47']
          },
          {
            in: [{ name: 'red', value: '#f00' }],
            out: ['/tokens/color/0: should have required property "id"']
          },
          {
            in: [{ id: 'myRed', value: '#f00' }],
            out: ['/tokens/color/0: should have required property "name"']
          },
          {
            in: [{ id: 'myRed', name: 'red' }],
            out: ['/tokens/color/0: should have required property "value"']
          },
          {
            in: [{ id: 'myRed', name: 'red', value: '#f00', wow: 'nice' }],
            out: ['/tokens/color/0: should not have property "wow"']
          },
          {
            in: [{ id: 'myColor', name: 'red', value: 'badcolor' }],
            out: [
              `/tokens/color/0/value: should match pattern "${cssColorPattern}", but given string: "badcolor"`
            ]
          },
          {
            in: [{ id: 'myColor', name: 'red', value: '#badd' }],
            out: [
              `/tokens/color/0/value: should match pattern "${cssColorPattern}", but given string: "#badd"`
            ]
          },
          {
            in: [{ id: 'myColor', name: 'red', value: 'rbg(0,0,0)' }],
            out: [
              `/tokens/color/0/value: should match pattern "${cssColorPattern}", but given string: "rbg(0,0,0)"`
            ]
          }
        ]
      }
    };

    Object.keys(tokensTestCases).forEach(tokenType => {
      const { valid, invalid } = tokensTestCases[tokenType];

      describe(`token type: ${tokenType}`, () => {
        valid.forEach(example => {
          it('accepts valid token: ' + JSON.stringify(example), () => {
            expectResult({ tokens: { [tokenType]: example } });
          });
        });

        invalid.forEach(example => {
          it('rejects invalid token: ' + JSON.stringify(example.in), () => {
            expectResult({ tokens: { [tokenType]: example.in } }, example.out);
          });
        });
      });
    });
  });
});
