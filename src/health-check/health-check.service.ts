import { Injectable } from '@nestjs/common';
import { IHealthCheck } from './health-check.interface';
import { PinoLogger } from 'nestjs-pino';

@Injectable()
export class HealthCheckService {
  constructor(private readonly logger: PinoLogger) {
    logger.setContext(HealthCheckService.name);
  }
  getHealthCheck(): IHealthCheck {
    this.logger.info('Service hit');
    return { success: true };
  }
}
