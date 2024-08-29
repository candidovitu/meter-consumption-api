import { ConflictException as NestConflictException } from '@nestjs/common';

export class ConflictException extends NestConflictException {
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
