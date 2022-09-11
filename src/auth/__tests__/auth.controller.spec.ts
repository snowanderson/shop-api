import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import * as md5 from 'md5';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService],
      imports: [
        JwtModule.register({
          secret: 'secretKey',
        }),
      ],
    })
      .useMocker((token) => {
        if (token === UsersService) {
          return {
            user: jest.fn().mockResolvedValue({
              id: 1,
              name: 'John Doe',
              email: 'john.doe@email.test',
              password_hash: md5('1password'),
            }),
          };
        }
      })
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
