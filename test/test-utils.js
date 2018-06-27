const { colors1, colorsWithComments, spacingUnits1 } = require('./test-fixtures');
const transforms = require('../src/transforms');

const generateTokenTransformTests = ({ transformName }) => {
  const transform = transforms[transformName];
  if (!transform) throw new Error('No transform found with name: ' + transformName);

  describe(transformName, () => {
    test('simple case', () => {
      expect(
        transform({
          tokens: {
            color: colors1,
            spacing: spacingUnits1
          }
        })
      ).toMatchSnapshot();
    });

    test('with a namespace', () => {
      expect(
        transform({
          settings: { namespace: 'rm' },
          tokens: {
            color: colors1,
            spacing: spacingUnits1
          }
        })
      ).toMatchSnapshot();
    });

    test('with comments', () => {
      expect(
        transform({
          tokens: {
            color: colorsWithComments,
            spacing: spacingUnits1
          }
        })
      ).toMatchSnapshot();
    });
  });
};

module.exports = { generateTokenTransformTests };
