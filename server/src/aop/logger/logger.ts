import * as winston from 'winston';

import { configuration } from '../config/configuration';

const logLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    debug: 4,
    trace: 5,
  },
  colors: {
    fatal: 'bold red blackBG',
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    debug: 'blue',
    trace: 'gray',
  },
};

type CustomLogger = winston.Logger &
  Record<keyof typeof logLevels.levels, winston.LeveledLogMethod>;

class Logger {
  private static logger: CustomLogger;

  public static instance(): CustomLogger {
    if (Logger.logger == null) {
      Logger.logger = this.createLogger();
    }

    return Logger.logger;
  }

  private static createLogger(): CustomLogger {
    const { combine, colorize, timestamp, json, printf } = winston.format;
    const { Console, File } = winston.transports;

    const logFormat = printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    });

    const logger = winston.createLogger({
      levels: logLevels.levels,
      transports: [
        new Console({
          level: configuration.LOG_CONSOLE_LEVEL,
          format: combine(colorize(), timestamp(), logFormat),
        }),
        new File({
          filename: 'logs/combined.log',
          level: configuration.LOG_OUTPUT_LEVEL,
          format: combine(timestamp(), logFormat),
        }),
        new File({
          filename: 'logs/json/fatal.log',
          level: 'fatal',
          format: combine(timestamp(), json()),
        }),
        new File({
          filename: 'logs/json/error.log',
          level: 'error',
          format: combine(timestamp(), json()),
        }),
      ],
      exceptionHandlers: [new File({ filename: 'logs/exceptions.log' })],
    }) as winston.Logger &
      Record<keyof typeof logLevels.levels, winston.LeveledLogMethod>;

    winston.addColors(logLevels.colors);

    return logger;
  }
}

export const logger = Logger.instance();
