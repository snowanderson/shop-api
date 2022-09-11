import { Injectable } from '@nestjs/common';
import { users } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { omit } from 'lodash';
import * as md5 from 'md5';
import { JwtService } from '@nestjs/jwt';

export type PasswordLessUser = Omit<users, 'password_hash'>;

export type JwtPayload = {
  email: string;
  sub: number;
  iat?: number;
  exp?: number;
};

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Find a user by email and check password
   */
  async validateUser(
    email: string,
    password: string,
  ): Promise<PasswordLessUser> {
    const user = await this.usersService.user({ email });
    if (user && this.comparePasswords(user.id, password, user.password_hash)) {
      return omit(user, 'password_hash');
    }
    return null;
  }

  /**
   * Return a signed JWT token for given user info
   */
  login(user: PasswordLessUser) {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
    };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  /**
   * Hash given user id and password and compare it to the given hash
   */
  private comparePasswords(
    id: number,
    password: string,
    hash: string,
  ): boolean {
    return md5(`${id}${password}`) === hash;
  }
}
