import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MeasureController } from './measure.controller';

import { GetMeasureByIdService } from './services/get-measure-by-id.service';
import { ListMeasuresByCustomerService } from './services/list-measures-by-customer.service';
import { ConfirmMeasureService } from './services/confirm-measure.service';
import { ReadMeasureConsumptionFromImageService } from './services/read-measure-consumption-from-image.service';

import { GoogleAiFileManagerProvider } from '../../providers/google-ai-file-manager/google-ai-file-manager.provider';
import { GoogleAiGenerativeProvider } from '../../providers/google-ai-generative/google-ai-generative.provider';

import { Measure, MeasureSchema } from './entities/measure.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Measure.name, schema: MeasureSchema }]),
  ],
  controllers: [MeasureController],
  providers: [
    GetMeasureByIdService,
    ListMeasuresByCustomerService,
    ConfirmMeasureService,
    ReadMeasureConsumptionFromImageService,
    GoogleAiFileManagerProvider,
    GoogleAiGenerativeProvider,
  ],
  exports: [ReadMeasureConsumptionFromImageService],
})
export class MeasureModule {}
