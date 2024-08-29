import { Injectable, Logger } from '@nestjs/common';

import { GoogleAiFileManagerProvider } from '../../../providers/google-ai-file-manager/google-ai-file-manager.provider';
import { GoogleAiGenerativeProvider } from '../../../providers/google-ai-generative/google-ai-generative.provider';

import { FileProperties } from '../../../interfaces/file-type.interface';

@Injectable()
export class ReadMeasureConsumptionFromImageService {
  private logger = new Logger(ReadMeasureConsumptionFromImageService.name);

  constructor(
    private googleAiFileManagerProvider: GoogleAiFileManagerProvider,
    private googleAiGenerativeProvider: GoogleAiGenerativeProvider,
  ) {}

  async handle(
    fileProperties: FileProperties,
    filePath: string,
  ): Promise<number> {
    this.logger.log(
      `Uploading measure image (${filePath}) to GoogleAiFileManager`,
    );
    const googleAiUploadedFile =
      await this.googleAiFileManagerProvider.uploadFile(
        fileProperties.mimeType,
        filePath,
      );

    this.logger.log(
      `Reading measure consumption from image ${googleAiUploadedFile.name} (${googleAiUploadedFile.sha256Hash})`,
    );
    const consumption =
      await this.googleAiGenerativeProvider.getMeterConsumptionFromImage(
        googleAiUploadedFile,
      );

    this.logger.log(
      `Successfully read measure consumption from image ${googleAiUploadedFile.name} (${googleAiUploadedFile.sha256Hash}). Consumption: ${consumption}`,
    );

    return consumption;
  }
}
