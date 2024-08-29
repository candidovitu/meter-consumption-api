import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Measure } from '../entities/measure.entity';
import { MeasureGenericResponse } from '../entities/measure-generic-response.entity';

import { GetMeasureByIdService } from './get-measure-by-id.service';

import { ConflictException } from '../../../exceptions/conflict.exception';

@Injectable()
export class ConfirmMeasureService {
  private logger = new Logger(ConfirmMeasureService.name);

  constructor(
    private getMeasureByIdService: GetMeasureByIdService,
    @InjectModel(Measure.name) private measureModel: Model<Measure>,
  ) {}

  async handle(
    measureId: string,
    value: number,
  ): Promise<MeasureGenericResponse> {
    const measure = await this.getMeasureByIdService.handle(measureId);

    if (measure.confirmed) {
      this.logger.warn(`Measure ${measureId} already confirmed`);
      throw new ConflictException(
        'Leitura do mês já realizada',
        'CONFIRMATION_DUPLICATE',
      );
    }

    this.logger.log(`Confirming measure ${measureId}`, {
      originalValue: measure.value,
      confirmedValue: value,
    });

    await this.measureModel.updateOne(
      { id: measureId },
      {
        confirmed: true,
        value,
      },
    );

    this.logger.log(`Confirmed measure ${measureId}: ${value}`);

    return {
      success: true,
    };
  }
}
