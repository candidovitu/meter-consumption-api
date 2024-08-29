import { NotFoundException as NestNotFoundException } from '@nestjs/common';

export class NotFoundException extends NestNotFoundException {
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
