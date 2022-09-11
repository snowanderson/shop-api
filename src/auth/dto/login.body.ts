import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginBody {
  @ApiProperty({
    description: 'Email of the user.',
    example: 'jeanmichel@airweb.fr',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Password of the user.',
    example: 'bonjour',
  })
  @IsString()
  password: string;
}
