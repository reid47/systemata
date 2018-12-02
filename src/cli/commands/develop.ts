import { CliInput } from '../../types';
import { getConfig } from '../get-config';
import { startServer } from '../../dev-server/server';

export function develop(input: CliInput) {
  const config = getConfig(input);
  if (!config) return;

  startServer(config);
}
