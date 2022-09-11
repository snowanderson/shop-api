import { ApiNotFoundResponse } from '@nestjs/swagger';

export const ApiInvalidCredentials = () =>
  ApiNotFoundResponse({
    description: 'INVALID_CREDENTIALS: User is not authenticated',
  });
