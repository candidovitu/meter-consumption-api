import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { DownloadMeasureImageService } from './services/download-measure-image.service';

@Controller('/download')
@ApiTags('Download')
export class DownloadController {
  constructor(
    private downloadMeasureImageService: DownloadMeasureImageService,
  ) {}

  @Get('/:measureId')
  downloadMeasureImage(@Param('measureId') measureId: string) {
    return this.downloadMeasureImageService.handle(measureId);
  }
}
