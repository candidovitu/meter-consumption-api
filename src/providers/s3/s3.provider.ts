import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import * as fs from 'fs';

import { S3File } from './s3.interface';

@Injectable()
export class S3Provider {
  private s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      endpoint: process.env.S3_ENDPOINT,
      region: process.env.S3_REGION,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
      },
      forcePathStyle: true,
    });
  }

  public uploadFile = async (
    bucketName: string,
    fileName: string,
    filePath: string,
    fileMimeType: string,
  ): Promise<void> => {
    const fileStream = fs.readFileSync(filePath);

    await this.s3.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Body: fileStream,
        Key: fileName,
        ContentType: fileMimeType,
        ACL: 'authenticated-read',
      }),
    );
  };

  public getFile = async (
    bucketName: string,
    fileName: string,
  ): Promise<S3File> => {
    const file = await this.s3.send(
      new GetObjectCommand({
        Bucket: bucketName,
        Key: fileName,
      }),
    );

    const fileBuffer = await file.Body.transformToByteArray();
    const fileMimeType = file.ContentType;

    return {
      buffer: fileBuffer,
      mimeType: fileMimeType,
    };
  };
}
