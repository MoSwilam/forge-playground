import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;

  app.setGlobalPrefix('api');
  await app.listen(port);
  Logger.debug(`Nest app started on port ${port}`, `MAIN.TS`);
}
bootstrap();
