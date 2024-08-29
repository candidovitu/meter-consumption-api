import { Injectable, Logger, StreamableFile } from '@nestjs/common';

import { S3Provider } from '../../../providers/s3/s3.provider';

import { GetMeasureByIdService } from '../../measure/services/get-measure-by-id.service';

@Injectable()
export class DownloadMeasureImageService {
  private logger = new Logger(DownloadMeasureImageService.name);

  constructor(
    private getMeasureByIdService: GetMeasureByIdService,
    private s3Provider: S3Provider,
  ) {}

  async handle(measureId: string): Promise<StreamableFile> {
    const measure = await this.getMeasureByIdService.handle(measureId);

    const fileName = measure.imageFileName;
    const bucketName = process.env.S3_BUCKET_MEASURE_UPLOAD;

    this.logger.log(`Getting image ${fileName} from bucket ${bucketName}`);

    const file = await this.s3Provider.getFile(bucketName, fileName);

    return new StreamableFile(file.buffer, { type: file.mimeType });
  }
}
