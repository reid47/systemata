import { parseArgs } from '../../src/cli/parse-args';

describe('parseArgs', () => {
  test('-h', () => {
    const { args, command } = parseArgs(['-h']);
    expect(command).toBeNull();
    expect(args.help).toBeTruthy();
  });

  test('--help', () => {
    const { args, command } = parseArgs(['--help']);
    expect(command).toBeNull();
    expect(args.help).toBeTruthy();
  });

  test('-v', () => {
    const { args, command } = parseArgs(['-v']);
    expect(command).toBeNull();
    expect(args.version).toBeTruthy();
  });

  test('--version', () => {
    const { args, command } = parseArgs(['--version']);
    expect(command).toBeNull();
    expect(args.version).toBeTruthy();
  });

  test('init', () => {
    const { args, command } = parseArgs(['init']);
    expect(command).toBe('init');
    expect(args).toEqual({});
  });

  test('init -c config.js', () => {
    const { args, command } = parseArgs(['init', '-c', 'config.js']);
    expect(command).toBe('init');
    expect(args).toEqual({
      configFile: 'config.js'
    });
  });

  test('init --config ./path/to/config.js', () => {
    const { args, command } = parseArgs(['init', '--config', './path/to/config.js']);
    expect(command).toBe('init');
    expect(args).toEqual({
      configFile: './path/to/config.js'
    });
  });

  test('init -c config.js -y', () => {
    const { args, command } = parseArgs(['init', '-c', 'config.js', '-y']);
    expect(command).toBe('init');
    expect(args).toEqual({
      configFile: 'config.js',
      skipQuestions: true
    });
  });

  test('init -c config.js --yes', () => {
    const { args, command } = parseArgs(['init', '-c', 'config.js', '--yes']);
    expect(command).toBe('init');
    expect(args).toEqual({
      configFile: 'config.js',
      skipQuestions: true
    });
  });

  test('develop', () => {
    const { args, command } = parseArgs(['develop']);
    expect(command).toBe('develop');
    expect(args).toEqual({});
  });

  test('build', () => {
    const { args, command } = parseArgs(['build']);
    expect(command).toBe('build');
    expect(args).toEqual({});
  });

  test('build -c config.js', () => {
    const { args, command } = parseArgs(['build', '-c', 'config.js']);
    expect(command).toBe('build');
    expect(args).toEqual({
      configFile: 'config.js'
    });
  });

  test('build --config ./path/to/config.js', () => {
    const { args, command } = parseArgs(['build', '--config', './path/to/config.js']);
    expect(command).toBe('build');
    expect(args).toEqual({
      configFile: './path/to/config.js'
    });
  });
});
