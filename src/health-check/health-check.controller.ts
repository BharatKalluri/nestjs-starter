import { Controller, Get } from '@nestjs/common';
import { HealthCheckService } from './health-check.service';
import { IHealthCheck } from './health-check.interface';
import { PinoLogger } from 'nestjs-pino';

@Controller('health-check')
export class HealthCheckController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(HealthCheckController.name);
  }

  @Get()
  getHealthCheck(): IHealthCheck {
    return this.healthCheckService.getHealthCheck();
  }
  @Get('/s3')
  getS3HealthCheck(): Promise<IHealthCheck> {
    return this.healthCheckService.getS3HealthCheck();
  }
  // @Get('/mongo')
  // getMongoHealthCheck(): Promise<IHealthCheck> {
  //   return this.healthCheckService.getMongoDBHealthCheck();
  // }
}
