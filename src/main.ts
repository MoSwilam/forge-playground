import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT;

  app.setGlobalPrefix('api/forge');

  const config = new DocumentBuilder()
    .setTitle('Constrol API')
    .setDescription('Constrol API swagger documentation')
    .setVersion('1.0')
    .addTag('default')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  await app.listen(port);
  Logger.debug(`Nest app started on port ${port}`, `MAIN.TS`);
}
bootstrap();
