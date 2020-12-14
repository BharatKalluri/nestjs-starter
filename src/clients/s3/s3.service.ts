import { Injectable } from '@nestjs/common';
import * as aws from 'aws-sdk';

@Injectable()
export class S3Service {
  private readonly s3 = new aws.S3();

  async getS3BucketsList(): Promise<Array<string>> {
    const bucketList = await this.s3.listBuckets().promise();
    return bucketList.Buckets.map((bucketInfo) => bucketInfo.Name);
  }
}
