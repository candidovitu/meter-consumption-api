import { Injectable } from '@nestjs/common';
import {
  FileMetadataResponse,
  GoogleAIFileManager,
} from '@google/generative-ai/server';

@Injectable()
export class GoogleAiFileManagerProvider {
  private fileManager: GoogleAIFileManager;

  constructor() {
    this.fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);
  }

  public uploadFile = async (
    fileMimeType: string,
    filePath: string,
  ): Promise<FileMetadataResponse> => {
    const { file } = await this.fileManager.uploadFile(filePath, {
      mimeType: fileMimeType,
    });

    return file;
  };
}
