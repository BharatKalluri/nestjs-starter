import { NestFactory } from '@nestjs/core';
import * as rateLimit from 'express-rate-limit';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorsInterceptor } from './shared/interceptors/errors.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TODO: Change these as per project and scale
  // Rate limiting: limit each IP to 100 requests per 15 minutes
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    }),
  );

  // Open API/Swagger setup, visit /api for Swagger UI
  const options = new DocumentBuilder()
    .setTitle('NestJS server')
    .setDescription('The NestJS server API description')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  // Global validation pipe based on DTO class, also transforms payload to DTO object
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.useGlobalInterceptors(new ErrorsInterceptor());

  await app.listen(3000);
}

bootstrap();
