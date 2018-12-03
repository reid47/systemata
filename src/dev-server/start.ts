import * as http from 'http';
import { Config } from '../types';
import * as webpack from 'webpack';
import MemoryFs = require('memory-fs');
import { DevServer } from './dev-server';
import { resolveConfig } from '../config';

const devServer = new DevServer();
const fs = new MemoryFs();

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('Hello World!');
  res.end();
});

function createWebpackConfig(config: Config): webpack.Configuration {
  return {
    mode: 'development',
    entry: config.__configFilePath,
    output: {
      path: config.output.buildDirectory
    }
  };
}

export function startServer(initialConfig: Config) {
  devServer.updateConfig(initialConfig);

  const { development, __configFilePath } = initialConfig;
  const { serverPort } = development;

  const webpackCompiler = webpack(createWebpackConfig(initialConfig));
  webpackCompiler.outputFileSystem = fs;

  webpackCompiler.watch({}, (err, stats) => {
    if (err || stats.hasErrors()) {
      return console.error(err || stats.toJson().errors);
    }

    const { modules } = stats.toJson();
    for (const file of modules) {
      delete require.cache[file.identifier];
    }

    const newConfig = resolveConfig(require(__configFilePath), __configFilePath);
    devServer.updateConfig(newConfig);
  });

  server.listen(serverPort);

  console.log(`Development server running at http://localhost:${serverPort}`);
}
