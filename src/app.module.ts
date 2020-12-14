import { Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import configuration from '../config/configuration';
import { v4 as uuidv4 } from 'uuid';
import { ClientsModule } from './clients/clients.module';

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [configuration],
});

const loggerModule = LoggerModule.forRoot({
  pinoHttp: {
    genReqId: () => {
      return uuidv4();
    },
    prettyPrint: process.env.NODE_ENV !== 'production',
  },
});

@Module({
  imports: [configModule, loggerModule, HealthCheckModule, ClientsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
