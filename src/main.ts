import { NestFactory } from '@nestjs/core';
import * as rateLimit from 'express-rate-limit';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule, nodeEnv } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { ConfigService } from '@nestjs/config';
import { firebaseToken } from './constants/bearer-auth-token-names';
import * as helmet from 'helmet';

// TODO: change this to your application name
const APP_NAME = `${nodeEnv} server`;

const swaggerConfig = new DocumentBuilder()
  .setTitle(APP_NAME)
  .addBearerAuth({ type: 'http' }, firebaseToken)
  .setBasePath('v1')
  .build();

const rateLimitingConfiguration = (configService: ConfigService) => ({
  windowMs: configService.get<number>('RATE_LIMIT_WINDOW_MS'),
  max: configService.get<number>('RATE_LIMIT_COUNT'),
  message: `Too many accounts created from this IP, please try again after ${
    (configService.get<number>('RATE_LIMIT_WINDOW_MS') as number) / 60000
  } minutes`,
});

async function startServer() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);

  app.use(rateLimit(rateLimitingConfiguration(configService)));
  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ErrorsInterceptor());
  app.setGlobalPrefix('v1');

  // visit /swagger for Swagger UI
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(8080);
}

startServer();
