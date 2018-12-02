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
});
