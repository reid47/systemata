import { Compiler } from './compiler';

export function generate(config: any): string {
  return new Compiler(config).toString();
}
