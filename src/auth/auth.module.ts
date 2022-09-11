import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  imports: [
    // For safety reasons, this should be replaced by a registerASync
    // and use ConfigModule to retrieve an environment variable
    JwtModule.register({
      secret: 'secretKey',
    }),
    PassportModule,
    UsersModule,
  ],
})
export class AuthModule {}
