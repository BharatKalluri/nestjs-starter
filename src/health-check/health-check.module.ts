import { Module } from '@nestjs/common';
import { HealthCheckController } from './health-check.controller';
import { HealthCheckService } from './health-check.service';
import { S3Service } from '../clients/s3/s3.service';
import { FirebaseModule } from '../clients/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [HealthCheckController],
  providers: [HealthCheckService, S3Service],
})
export class HealthCheckModule {}
