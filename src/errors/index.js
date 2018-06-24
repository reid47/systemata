class MissingArgumentError extends Error {
  constructor(func, arg) {
    super(`Function '${func}' is missing required argument: '${arg}'`);
  }
}

module.exports = { MissingArgumentError };
