import { ApiProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiProperty({
    description: 'The user access token. Required for authenticated routes',
  })
  accessToken: string;
}
