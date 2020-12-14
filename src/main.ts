import { NestFactory } from '@nestjs/core';
import * as rateLimit from 'express-rate-limit';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // TODO: Change these as per project and scale
  app.use(
    // limit each IP to 100 requests per 15 minutes
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
    }),
  );

  await app.listen(3000);
}

bootstrap();
