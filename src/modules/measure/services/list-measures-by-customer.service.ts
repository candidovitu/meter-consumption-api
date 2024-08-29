import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

import { measuresListItemsMapper } from '../mappers/measures-list-items.mapper';

import { Measure, MeasureType } from '../entities/measure.entity';
import { MeasuresListResponse } from '../entities/measures-list-response.entity';

import { BadRequestException } from '../../../exceptions/bad-request.exception';
import { NotFoundException } from '../../../exceptions/not-found.exception';

@Injectable()
export class ListMeasuresByCustomerService {
  private logger = new Logger(ListMeasuresByCustomerService.name);

  constructor(
    @InjectModel(Measure.name) private measureModel: Model<Measure>,
  ) {}

  async handle(
    customerCode: string,
    measureType?: MeasureType,
  ): Promise<MeasuresListResponse> {
    const measuresFilter: FilterQuery<Measure> = { customerCode };

    if (measureType) {
      if (!['WATER', 'GAS'].includes(measureType))
        throw new BadRequestException(
          'Tipo de medição não permitida',
          'INVALID_TYPE',
        );

      measuresFilter['type'] = measureType;
    }

    const measures = await this.measureModel.find(measuresFilter);

    if (!measures.length)
      throw new NotFoundException(
        'Nenhuma leitura encontrada',
        'MEASURES_NOT_FOUND',
      );

    return {
      customer_code: customerCode,
      measures: measuresListItemsMapper(measures),
    };
  }
}
