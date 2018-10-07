import fs from 'fs';
import path from 'path';
import * as scss from './to-scss';

export default function compile(config) {
  const ext = scss.extension;
  fs.writeFileSync(
    path.resolve(__dirname, '../../ignored/wow' + ext),
    scss.compile(config),
    'utf8'
  );
}
