import { CliInput } from '../../types';
import { error } from '../error';
import { getConfig } from '../get-config';

export function build(input: CliInput) {
  const config = getConfig(input);
  if (!config) return;

  try {
    // todo :)

    process.exit(0);
  } catch (err) {
    error(err);
  }
}
