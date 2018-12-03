import { Config } from '../types';
import { Compiler } from '../compiler';

export class DevServer {
  compiler: Compiler;
  config: Config;

  updateConfig(newConfig: Config) {
    this.config = newConfig;
    this.compiler = new Compiler(this.config);
  }
}
