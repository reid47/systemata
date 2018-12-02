import { Compiler } from './compiler';
import { GeneratedFile } from './types';

export function generate(config: any): GeneratedFile[] {
  return new Compiler(config).generate();
}
