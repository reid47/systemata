import * as http from 'http';
import { Config } from '../types';
import * as webpack from 'webpack';
import MemoryFs = require('memory-fs');

const port = 5555;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('Hello World!');
  res.end();
});

function createWebpackConfig(config: Config): webpack.Configuration {
  return {};
}

export function startServer(config: Config) {
  const fs = new MemoryFs();
  const webpackCompiler = webpack(createWebpackConfig(config));
  webpackCompiler.outputFileSystem = fs;

  server.listen(4747);
  console.log(`Development server running at http://localhost:${port}`);
}
