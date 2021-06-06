import { NestFactory } from '@nestjs/core';
import * as rateLimit from 'express-rate-limit';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule, nodeEnv } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ErrorsInterceptor } from './shared/interceptors/errors.interceptor';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';
import { firebaseToken } from './shared/constants/bearer-auth-token-names';

// TODO: change this to your application name
const APP_NAME = `${nodeEnv} server`;

const swaggerConfig = new DocumentBuilder()
  .setTitle(APP_NAME)
  .addBearerAuth({ type: 'http' }, firebaseToken)
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
  const logger: PinoLogger = await app.resolve(PinoLogger);

  logger.debug('Loading middleware');

  app.use(rateLimit(rateLimitingConfiguration(configService)));

  // visit /swagger for Swagger UI
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ErrorsInterceptor());

  logger.debug('Started Listening for Server Port');
  await app.listen(8080);
}

startServer();
