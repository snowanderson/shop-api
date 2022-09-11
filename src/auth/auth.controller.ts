import { Controller, UseGuards, Request, Post } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService, PasswordLessUser } from './auth.service';
import { Public } from './decorators/public.decorator';
import { LoginResponse } from './dto/login.response';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { LoginBody } from './dto/login.body';
import { ApiInvalidCredentials } from './decorators/api-invalid-credentials.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({
    summary: 'Login a user',
    description: 'Login a user with its credentials and return a JWT token.',
  })
  @ApiOkResponse({ description: 'The access token', type: LoginResponse })
  @ApiInvalidCredentials()
  @ApiBody({ type: LoginBody })
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: PasswordLessUser): Promise<LoginResponse> {
    return this.authService.login(req);
  }
}
