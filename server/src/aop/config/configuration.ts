import * as env from 'dotenv';

class Configuration {
  /**
   * Server
   */
  readonly #SERVER_HOST = process.env.SERVER_HOST;
  readonly #SERVER_PORT = parseInt(process.env.SERVER_PORT);

  get SERVER_HOST(): string {
    return this.#SERVER_HOST;
  }

  get SERVER_PORT(): number {
    return this.#SERVER_PORT;
  }
  /**
   * DB
   */
  readonly #DB_HOST = process.env.DB_HOST;
  readonly #DB_PORT = process.env.DB_PORT;
  readonly #DB_NAME = process.env.DB_NAME;
  readonly #DB_USERNAME = process.env.DB_USERNAME;
  readonly #DB_PASSWORD = process.env.DB_PASSWORD;
  readonly #DB_AUTHSOURCE = process.env.DB_AUTHSOURCE;
  readonly #DB_CONNECTION_TIMEOUT = parseInt(process.env.DB_CONNECTION_TIMEOUT);

  get DB_HOST(): string {
    return this.#DB_HOST;
  }

  get DB_PORT(): string {
    return this.#DB_PORT;
  }

  get DB_NAME(): string {
    return this.#DB_NAME;
  }

  get DB_USERNAME(): string {
    return this.#DB_USERNAME;
  }

  get DB_PASSWORD(): string {
    return this.#DB_PASSWORD;
  }

  get DB_AUTHSOURCE(): string {
    return this.#DB_AUTHSOURCE;
  }

  get DB_CONNECTION_TIMEOUT(): number {
    return this.#DB_CONNECTION_TIMEOUT;
  }

  /**
   * API
   */
  readonly #API_BASE_URL = process.env.API_BASE_URL;
  readonly #API_VERSION = process.env.API_VERSION;
  readonly #ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS;

  get API_BASE_URL(): string {
    return this.#API_BASE_URL;
  }

  get API_VERSION(): string {
    return this.#API_VERSION;
  }

  get ALLOWED_ORIGINS(): string {
    return this.#ALLOWED_ORIGINS;
  }

  /**
   * GraphQL
   */

  readonly #GRAPHQL_PLAYGROUND = process.env.GRAPHQL_PLAYGROUND === 'true';

  get GRAPHQL_PLAYGROUND(): boolean {
    return this.#GRAPHQL_PLAYGROUND;
  }

  /**
   * Logging
   */
  readonly #LOG_OUTPUT_LEVEL = process.env.LOG_OUTPUT_LEVEL || 'trace';

  get LOG_OUTPUT_LEVEL(): string {
    return this.#LOG_OUTPUT_LEVEL;
  }

  readonly #LOG_CONSOLE_LEVEL = process.env.LOG_CONSOLE_LEVEL || 'none';

  get LOG_CONSOLE_LEVEL(): string {
    return this.#LOG_CONSOLE_LEVEL;
  }

  /**
   * Singleton
   */
  private static configuration: Configuration;
  public static instance(): Configuration {
    if (Configuration.configuration == null) {
      if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test'
      ) {
        env.config();
      }

      Configuration.configuration = new Configuration();
    }

    return Configuration.configuration;
  }
}

export const configuration = Configuration.instance();
