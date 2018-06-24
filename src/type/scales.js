const { px } = require('../util');
const { MissingArgumentError } = require('../errors');

const buildScale = (bases, ratio, sizes) => {
  if (!bases) throw new MissingArgumentError('buildScale', 'bases');
  if (!ratio) throw new MissingArgumentError('buildScale', 'ratio');
  if (!sizes) throw new MissingArgumentError('buildScale', 'sizes');

  bases = Array.isArray(bases) ? bases : [bases];
  const defaultBase = bases[0];
  const minStep = -10;
  const maxStep = 100;
  const baseSteps = {};

  bases.forEach(base => {
    baseSteps[base] = {};
    for (let step = minStep; step <= maxStep; step++) {
      baseSteps[base][step] = base * Math.pow(ratio, step);
    }
  });

  return Object.keys(sizes).reduce((acc, size) => {
    let step, base;

    if (typeof sizes[size] === 'number') {
      step = sizes[size];
      base = defaultBase;
    } else {
      ({ step, base = defaultBase } = sizes[size]);
    }

    return { ...acc, [size]: px(baseSteps[base][step]) };
  }, {});
};

module.exports = { buildScale };
