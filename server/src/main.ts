import 'reflect-metadata';

import { logger } from './aop/logger/logger';
import { configuration } from './aop/config/configuration';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

async function main(): Promise<INestApplication> {
  const { SERVER_PORT, SERVER_HOST, API_BASE_URL, API_VERSION } = configuration;
  const server = await NestFactory.create(AppModule);
  server.setGlobalPrefix(`${API_BASE_URL}/${API_VERSION}`);

  server.listen(SERVER_PORT, SERVER_HOST, () => {
    logger.info(`Server listening on port: ${SERVER_PORT}`);
  });

  return server;
}

export default main();
