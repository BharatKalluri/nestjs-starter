import { Module } from '@nestjs/common';
import { S3Service } from './s3/s3.service';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  providers: [S3Service],
  exports: [S3Service],
  imports: [FirebaseModule],
})
export class ClientsModule {}
