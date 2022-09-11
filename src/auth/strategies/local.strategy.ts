import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService, PasswordLessUser } from '../auth.service';
import { InvalidCredentialsException } from '../../exceptions/invalid-credentials.exception';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<PasswordLessUser> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new InvalidCredentialsException();
    }
    return user;
  }
}
