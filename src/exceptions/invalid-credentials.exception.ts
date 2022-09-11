import { NotFoundException } from '@nestjs/common';

export class InvalidCredentialsException extends NotFoundException {
  constructor() {
    super('Invalid credentials', 'INVALID_CREDENTIALS');
  }
}
