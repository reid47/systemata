import { Compiler } from './compiler';
import { OutputOptions } from './types';

export function generate(config: any, output: any): string {
  return new Compiler(config, output).toString();
}
