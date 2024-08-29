import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json } from 'express';

import { AppModule } from './app.module';

import { getValidationErrorMessageUtil } from './utils/get-validation-error-message.util';

import { BadRequestException } from './exceptions/bad-request.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(json({ limit: '10mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) =>
        new BadRequestException(
          getValidationErrorMessageUtil(errors),
          'INVALID_DATA',
        ),
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('meter-consumption-api')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, swaggerDocument);

  await app.listen(process.env.APP_PORT);
}

bootstrap();
