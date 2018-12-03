import * as path from 'path';
import { Config, GeneratedFile } from '../types';
import { Compiler } from '../compiler';
import MemoryFs = require('memory-fs');
import * as webpack from 'webpack';
import { resolveConfig } from '../config';

function createWebpackConfig(config: Config): webpack.Configuration {
  return {
    mode: 'development',
    entry: config.__configFilePath,
    output: {
      path: config.output.buildDirectory
    }
  };
}

export class DevServer {
  private fs: MemoryFs;
  private generatedFiles: GeneratedFile[];

  constructor() {
    this.fs = new MemoryFs();
    this.fs.mkdirSync('/files');
    this.generatedFiles = [];
  }

  readFile(filePath: string) {
    return this.fs.readFileSync(filePath);
  }

  start(initialConfig: Config) {
    const { __configFilePath } = initialConfig;

    const webpackCompiler = webpack(createWebpackConfig(initialConfig));

    webpackCompiler.outputFileSystem = this.fs;

    webpackCompiler.watch({}, (err, stats) => {
      if (err || stats.hasErrors()) {
        return console.error(err || stats.toJson().errors);
      }

      const { modules } = stats.toJson();
      for (const file of modules) {
        delete require.cache[file.identifier];
      }

      const newConfig = resolveConfig(require(__configFilePath), __configFilePath);
      this.compile(newConfig);
    });
  }

  compile(newConfig: Config) {
    this.generatedFiles = new Compiler(newConfig).generate();

    this.generatedFiles.forEach(file => {
      this.fs.writeFileSync(path.resolve('/files', file.fileName), file.content);
    });
  }
}
