import { Injectable } from '@nestjs/common';
import * as aws from 'aws-sdk';

@Injectable()
export class S3Service {
  private readonly s3 = new aws.S3();

  async getS3BucketsList(): Promise<Array<string>> {
    const { Buckets } = await this.s3.listBuckets().promise();
    if (Buckets) {
      return Buckets.map((bucketInfo) => bucketInfo.Name as string);
    } else {
      return [];
    }
  }
}
