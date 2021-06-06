import { Injectable } from '@nestjs/common';
import { IHealthCheck } from './health-check.interface';
import { PinoLogger } from 'nestjs-pino';
import { S3Service } from '../../providers/aws/s3.service';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { ServerError } from '../../errors/server-error';
import { ServerMessages } from '../../constants/server-messages';

@Injectable()
export class HealthCheckService {
  constructor(
    @InjectConnection() private mongooseConnection: Connection,
    private readonly logger: PinoLogger,
    private readonly s3Client: S3Service,
  ) {
    logger.setContext(HealthCheckService.name);
  }
  getHealthCheck(): IHealthCheck {
    // throw new ServerError(ServerMessages.E10001, 'Sample error message');
    return { success: true };
  }

  async getS3HealthCheck(): Promise<IHealthCheck> {
    try {
      const bucketList = await this.s3Client.getS3BucketsList();
      this.logger.debug(bucketList);
      return { success: true };
    } catch (e) {
      this.logger.error(e);
      throw new ServerError(ServerMessages.AWS_CONN_FAILURE, e.message, 400);
    }
  }

  async getMongoDBHealthCheck(): Promise<IHealthCheck> {
    return { success: this.mongooseConnection.readyState === 1 };
  }
}
