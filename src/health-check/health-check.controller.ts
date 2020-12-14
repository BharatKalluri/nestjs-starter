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
    this.logger.info('Controller hit');
    return this.healthCheckService.getHealthCheck();
  }
}
