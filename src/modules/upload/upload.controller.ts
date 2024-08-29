import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UploadMeasureImageService } from './services/upload-measure-image.service';

import { UploadMeasureImageDto } from './dto/upload-measure-image.dto';

@Controller('/upload')
@ApiTags('Upload')
export class UploadController {
  constructor(private uploadMeasureImageService: UploadMeasureImageService) {}

  @Post()
  uploadMeasureImage(@Body() body: UploadMeasureImageDto) {
    const { image, customer_code, measure_datetime, measure_type } = body;
    return this.uploadMeasureImageService.handle(
      image,
      customer_code,
      new Date(measure_datetime),
      measure_type,
    );
  }
}
