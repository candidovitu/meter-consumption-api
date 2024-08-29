import { BadRequestException as NestBadRequestException } from '@nestjs/common';

export class BadRequestException extends NestBadRequestException {
  private errorCode: string;

  constructor(message: string, errorCode: string) {
    super(message);
    this.errorCode = errorCode;
  }

  getResponse() {
    return {
      error_code: this.errorCode,
      error_description: this.message,
    };
  }
}
