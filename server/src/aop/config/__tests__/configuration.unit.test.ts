import * as env from 'dotenv';
import { configuration } from '../configuration';

describe('Configuration', () => {
  describe('Common', () => {
    test('instance exists', () => {
      configuration;
    });
  });

  describe('Configuration environment properties', () => {
    test('Server configuration properties exist', () => {
      expect(configuration.SERVER_HOST).toBe('http://0.0.0.0');
      expect(configuration.SERVER_PORT).toBe(8080);
    });

    test('DB configuration properties exist', () => {
      expect(configuration.DB_HOST).toBe('mongodb://localhost');
      expect(configuration.DB_PORT).toBe('27017');
      expect(configuration.DB_NAME).toBe('domain');
      expect(configuration.DB_USERNAME).toBe('root');
      expect(configuration.DB_PASSWORD).toBe('root');
      expect(configuration.DB_AUTHSOURCE).toBe('admin');
      expect(configuration.DB_CONNECTION_TIMEOUT).toBe(5000);
    });

    test('API configuration properties exist', () => {
      expect(configuration.API_BASE_URL).toBe('/api');
      expect(configuration.API_VERSION).toBe('v1');
    });

    test('Logging configuration properties exist', () => {
      expect(configuration.LOG_OUTPUT_LEVEL).toBe('trace');
      expect(configuration.LOG_CONSOLE_LEVEL).toBe('none');
    });

    test('Logging configuration properties default to proper values', () => {
      process.env.LOG_OUTPUT_LEVEL = null;
      process.env.LOG_CONSOLE_LEVEL = null;

      expect(configuration.LOG_OUTPUT_LEVEL).toBe('trace');
      expect(configuration.LOG_CONSOLE_LEVEL).toBe('none');
    });
  });

  describe('ENV pickup', () => {
    test('.env file is not picked up in test environment', () => {
      const envConfigSpy = jest.spyOn(env, 'config');

      expect(envConfigSpy).toHaveBeenCalledTimes(0);
    });
  });
});
