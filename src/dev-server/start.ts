import * as http from 'http';
import { Config } from '../types';
import { DevServer } from './dev-server';

const devServer = new DevServer();

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === 'GET' && url && url.startsWith('/files')) {
    try {
      const fileContents = devServer.readFile(url);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.write(fileContents);
    } catch {
      res.writeHead(404, 'File not found');
    }

    return res.end();
  }

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('wowie');
  res.end();
});

export function startServer(initialConfig: Config) {
  const { serverPort } = initialConfig.development;

  devServer.start(initialConfig);
  server.listen(serverPort);

  console.log(`Development server running at http://localhost:${serverPort}`);
}
