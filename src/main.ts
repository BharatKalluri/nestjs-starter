import { NestFactory } from '@nestjs/core';
import * as rateLimit from 'express-rate-limit';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ErrorsInterceptor } from './shared/interceptors/errors.interceptor';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';
import { firebaseToken } from './shared/constants/bearer-auth-token-names';

const APP_NAME = 'Core ' + process.env.NODE_ENV;

// Open API/Swagger setup, visit /swagger for Swagger UI
async function swaggerModule(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle(APP_NAME + ' server')
    .setDescription(APP_NAME + ' API description')
    .setVersion('0.1')
    .addBearerAuth({ type: 'http' }, firebaseToken)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);
}

async function startServer() {
  const app = await NestFactory.create(AppModule);
  const configService: ConfigService = app.get(ConfigService);
  const logger: PinoLogger = await app.resolve(PinoLogger);

  logger.debug('Loading middleware');
  // Middleware
  // TODO: Change these as per project and scale Rate limiting: limit each IP to 100 requests per 15 minutes
  // TODO: Need to plan something else here, as it will not work properly with multiple processes.
  app.use(
    rateLimit({
      windowMs: configService.get<number>('RATE_LIMIT_WINDOW_MS'),
      max: configService.get<number>('RATE_LIMIT_COUNT'),
      message: `Too many accounts created from this IP, please try again after ${
        (configService.get<number>('RATE_LIMIT_WINDOW_MS') as number) / 60000
      } minutes`,
    }),
  );

  //Swagger setup
  swaggerModule(app)
    .then(() => {
      console.log('Swagger module started');
    })
    .catch((err) => {
      console.error(err);
    });

  // Global validation pipe based on DTO class, also transforms payload to DTO object
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  //Global Error Interceptor
  app.useGlobalInterceptors(new ErrorsInterceptor());

  logger.debug('Started Listening for Server Port');
  await app.listen(8080);
}

startServer();
