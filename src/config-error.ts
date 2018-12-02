export class ConfigurationError extends Error {
  constructor(configPath: string, message: string) {
    const fullMessage = `Invalid configuration at "${configPath}": ${message}`;
    super(fullMessage);
  }
}
