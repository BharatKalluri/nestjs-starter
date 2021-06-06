import { Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import configuration from '../config/configuration';
import { v4 as uuidv4 } from 'uuid';
import { ClientsModule } from './clients/clients.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { EnvironmentsEnum } from './shared/constants/environments.enum';

export const nodeEnv = process.env.NODE_ENV
  ? (process.env.NODE_ENV.toLowerCase() as EnvironmentsEnum)
  : EnvironmentsEnum.DEV;

const configModule = ConfigModule.forRoot({
  isGlobal: true,
  load: [configuration],
  ignoreEnvFile: true,
});

const loggerModule = LoggerModule.forRoot({
  pinoHttp: {
    genReqId: () => {
      return uuidv4();
    },
    prettyPrint: nodeEnv !== EnvironmentsEnum.PROD,
    level: nodeEnv !== EnvironmentsEnum.PROD ? 'debug' : 'info',
  },
});

const mongooseModule = MongooseModule.forRootAsync({
  imports: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    uri: configService.get<string>('MONGODB_URI'),
  }),
  inject: [ConfigService],
});

@Module({
  imports: [
    configModule,
    loggerModule,
    mongooseModule,
    HealthCheckModule,
    ClientsModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
