import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ListMeasuresByCustomerService } from './services/list-measures-by-customer.service';
import { ConfirmMeasureService } from './services/confirm-measure.service';

import { MeasureType } from './entities/measure.entity';
import { ConfirmMeasureDto } from './dto/confirm-measure.dto';

@Controller('/')
@ApiTags('Measure')
export class MeasureController {
  constructor(
    private listMeasuresByCustomerService: ListMeasuresByCustomerService,
    private confirmMeasureService: ConfirmMeasureService,
  ) {}

  @Get('/:customerCode/list')
  listMeasuresByCustomer(
    @Param('customerCode') customerCode: string,
    @Query('measure_type') measureType?: MeasureType,
  ) {
    return this.listMeasuresByCustomerService.handle(customerCode, measureType);
  }

  @Patch('/confirm')
  confirmMeasure(@Body() confirmMeasureDto: ConfirmMeasureDto) {
    const { measure_uuid, confirmed_value } = confirmMeasureDto;
    return this.confirmMeasureService.handle(measure_uuid, confirmed_value);
  }
}
