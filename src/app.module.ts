import { Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import configuration from '../config/configuration';
import { v4 as uuidv4 } from 'uuid';

@Module({
  imports: [
    HealthCheckModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        genReqId: () => {
          return uuidv4();
        },
        serializers: {
          req: (r) => {
            return {
              id: r.id,
              method: r.method,
              url: r.url,
            };
          },
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
