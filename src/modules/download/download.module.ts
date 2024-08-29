import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { DownloadController } from './download.controller';

import { DownloadMeasureImageService } from './services/download-measure-image.service';
import { GetMeasureByIdService } from '../measure/services/get-measure-by-id.service';

import { S3Provider } from '../../providers/s3/s3.provider';

import { Measure, MeasureSchema } from '../measure/entities/measure.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Measure.name, schema: MeasureSchema }]),
  ],
  controllers: [DownloadController],
  providers: [DownloadMeasureImageService, GetMeasureByIdService, S3Provider],
})
export class DownloadModule {}
