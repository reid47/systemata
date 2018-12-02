import { CliInput } from '../../types';
import { error } from '../error';
import { getConfig } from '../get-config';

export function showConfig(input: CliInput) {
  const config = getConfig(input);

  try {
    console.log(JSON.stringify(config, null, 2));

    process.exit(0);
  } catch (err) {
    error(err);
  }
}
