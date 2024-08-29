import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';
import * as fs from 'fs';

import { UploadResponse } from '../entities/upload-response.entity';

import { S3Provider } from '../../../providers/s3/s3.provider';

import { getDateMonthRangeUtil } from '../../../utils/get-date-month-range.util';
import { getBase64FilePropertiesUtil } from '../../../utils/get-base64-file-properties.util';
import { saveBase64TempFileUtil } from '../../../utils/save-base64-temp-file.util';

import { Measure } from '../../measure/entities/measure.entity';

import { ReadMeasureConsumptionFromImageService } from '../../measure/services/read-measure-consumption-from-image.service';

import { ConflictException } from '../../../exceptions/conflict.exception';

@Injectable()
export class UploadMeasureImageService {
  private logger = new Logger(UploadMeasureImageService.name);

  constructor(
    private s3Provider: S3Provider,
    private readMeasureConsumptionFromImageService: ReadMeasureConsumptionFromImageService,
    @InjectModel(Measure.name) private measureModel: Model<Measure>,
  ) {}

  async handle(
    imageBase64: string,
    customerCode: string,
    measureDate: Date,
    measureType: string,
  ): Promise<UploadResponse> {
    const monthDateRange = getDateMonthRangeUtil(measureDate);

    this.logger.log(
      `Checking if customer (${customerCode}) already have a ${measureType} measure on this month`,
    );

    const existingCustomerMeasure = await this.measureModel.findOne({
      customerCode,
      type: measureType,
      date: {
        $gte: monthDateRange.start,
        $lte: monthDateRange.end,
      },
    });

    if (existingCustomerMeasure) {
      this.logger.warn(
        `Customer (${customerCode}) already have a ${measureType} measure (${existingCustomerMeasure.id}) on this month`,
      );

      throw new ConflictException(
        'Leitura do mês já realizada',
        'DOUBLE_REPORT',
      );
    }

    const measureId = uuidV4();

    this.logger.log(`Getting image properties`, {
      measureId,
    });

    const fileProperties = getBase64FilePropertiesUtil(imageBase64);
    const fileName = `${measureId}.${fileProperties.extension}`;
    const tempFilePath = saveBase64TempFileUtil(
      fileName,
      fileProperties.base64,
    );
    const fileDownloadUrl = `${process.env.PUBLIC_DOWNLOAD_ENDPOINT}/${measureId}`;

    this.logger.log(`Uploading image to s3Provider`, {
      measureId,
    });

    await this.s3Provider.uploadFile(
      process.env.S3_BUCKET_MEASURE_UPLOAD,
      fileName,
      tempFilePath,
      fileProperties.mimeType,
    );

    this.logger.log(`Starting image consumption read`, {
      measureId,
    });

    const consumption =
      await this.readMeasureConsumptionFromImageService.handle(
        fileProperties,
        tempFilePath,
      );

    this.logger.log(`Deleting temporary local image ${tempFilePath}`, {
      measureId,
    });

    fs.rmSync(tempFilePath);

    this.logger.log(`Creating measure database document`, {
      measureId,
    });

    await this.measureModel.create({
      id: measureId,
      customerCode,
      imageFileName: fileName,
      value: consumption,
      date: measureDate,
      type: measureType,
      confirmed: false,
    });

    this.logger.log(`Finished measure consumption read`, {
      measureId,
      customerCode,
      fileName,
      consumption,
      measureDate,
      measureType,
    });

    return {
      image_url: fileDownloadUrl,
      measure_value: consumption,
      measure_uuid: measureId,
    };
  }
}
