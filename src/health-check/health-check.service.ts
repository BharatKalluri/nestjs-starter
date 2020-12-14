import { Injectable } from '@nestjs/common';
import { IHealthCheck } from './health-check.interface';
import { PinoLogger } from 'nestjs-pino';
import { S3Service } from '../clients/s3/s3.service';

@Injectable()
export class HealthCheckService {
  constructor(
    private readonly logger: PinoLogger,
    private readonly s3Client: S3Service,
  ) {
    logger.setContext(HealthCheckService.name);
  }
  getHealthCheck(): IHealthCheck {
    return { success: true };
  }
  async getS3HealthCheck(): Promise<IHealthCheck> {
    try {
      const bucketList = await this.s3Client.getS3BucketsList();
      this.logger.info(bucketList);
      return { success: true };
    } catch (e) {
      this.logger.error(e);
      return { success: false };
    }
  }
}