import { Injectable } from '@nestjs/common';
import {
  GenerationConfig,
  GenerativeModel,
  GoogleGenerativeAI,
} from '@google/generative-ai';
import { FileMetadataResponse } from '@google/generative-ai/server';

import { MeterConsumption } from './google-ai-generative.interface';

const generativeModelName = 'gemini-1.5-flash';

@Injectable()
export class GoogleAiGenerativeProvider {
  private generativeAi: GoogleGenerativeAI;
  private model: GenerativeModel;
  private generationConfig: GenerationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: 'application/json',
  };

  constructor() {
    this.generativeAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.generativeAi.getGenerativeModel({
      model: generativeModelName,
    });
  }

  public getMeterConsumptionFromImage = async (
    file: FileMetadataResponse,
  ): Promise<number> => {
    const chatSession = this.model.startChat({
      generationConfig: this.generationConfig,
    });

    const { response } = await chatSession.sendMessage([
      {
        fileData: {
          mimeType: file.mimeType,
          fileUri: file.uri,
        },
      },
      {
        text: 'get consumption from image',
      },
    ]);

    const meterConsumption = JSON.parse(response.text()) as MeterConsumption;

    return Number(meterConsumption.consumption);
  };
}
