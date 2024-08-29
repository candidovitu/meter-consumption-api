import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Measure } from '../entities/measure.entity';

import { NotFoundException } from '../../../exceptions/not-found.exception';

@Injectable()
export class GetMeasureByIdService {
  private logger = new Logger(GetMeasureByIdService.name);

  constructor(
    @InjectModel(Measure.name) private measureModel: Model<Measure>,
  ) {}

  async handle(measureId: string): Promise<Measure> {
    this.logger.log(`Getting measure ${measureId}`);

    const measure = await this.measureModel.findOne({ id: measureId });

    if (!measure) {
      this.logger.warn(`Measure ${measureId} not found`);

      throw new NotFoundException(
        'Leitura não encontrada',
        'MEASURE_NOT_FOUND',
      );
    }

    return measure;
  }
}
