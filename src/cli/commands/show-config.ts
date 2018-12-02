import { CliInput } from '../../types';
import { error } from '../error';
import { getConfig } from '../get-config';
import { resolveConfig } from '../../config';

export function showConfig(input: CliInput) {
  const config = getConfig(input);

  try {
    const resolvedConfig = resolveConfig(config || {});

    console.log(JSON.stringify(resolvedConfig, null, 2));

    process.exit(0);
  } catch (err) {
    error(err);
  }
}
