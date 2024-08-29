import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UploadController } from './upload.controller';

import { UploadMeasureImageService } from './services/upload-measure-image.service';
import { ReadMeasureConsumptionFromImageService } from '../measure/services/read-measure-consumption-from-image.service';

import { S3Provider } from '../../providers/s3/s3.provider';
import { GoogleAiFileManagerProvider } from '../../providers/google-ai-file-manager/google-ai-file-manager.provider';
import { GoogleAiGenerativeProvider } from '../../providers/google-ai-generative/google-ai-generative.provider';

import { Measure, MeasureSchema } from '../measure/entities/measure.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Measure.name, schema: MeasureSchema }]),
  ],
  controllers: [UploadController],
  providers: [
    UploadMeasureImageService,
    ReadMeasureConsumptionFromImageService,
    S3Provider,
    GoogleAiFileManagerProvider,
    GoogleAiGenerativeProvider,
  ],
})
export class UploadModule {}
