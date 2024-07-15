import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';

(async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const configService = await app.get<ConfigService>(ConfigService);

  await app.listen(configService.get<number>('PORT'));
  await Logger.log(
    `Application started at ${configService.get<number>('PORT')} port`,
    'Application',
  );
})();
