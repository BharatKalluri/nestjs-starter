import { Module } from '@nestjs/common';
import { HealthCheckController } from './health-check.controller';
import { HealthCheckService } from './health-check.service';
import { S3Service } from '../../providers/aws/s3.service';
import { FirebaseModule } from '../../providers/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [HealthCheckController],
  providers: [HealthCheckService, S3Service],
})
export class HealthCheckModule {}
