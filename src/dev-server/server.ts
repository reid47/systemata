import * as http from 'http';
import { Config } from '../types';
import * as webpack from 'webpack';
import MemoryFs = require('memory-fs');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('Hello World!');
  res.end();
});

function createWebpackConfig(config: Config): webpack.Configuration {
  return {};
}

export function startServer(config: Config) {
  const { serverPort } = config.development;

  const fs = new MemoryFs();
  const webpackCompiler = webpack(createWebpackConfig(config));
  webpackCompiler.outputFileSystem = fs;

  server.listen(serverPort);
  console.log(`Development server running at http://localhost:${serverPort}`);
}
