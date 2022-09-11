import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import * as md5 from 'md5';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      .overrideProvider(JwtService)
      .useValue({
        sign: jest.fn().mockReturnValue('token'),
      })
      .compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('validates the user', async () => {
      expect(await service.validateUser('john.doe@email.test', 'password'))
        .toMatchInlineSnapshot(`
        {
          "email": "john.doe@email.test",
          "id": 1,
          "name": "John Doe",
        }
      `);
    });

    it('returns null when password is incorrect', async () => {
      expect(
        await service.validateUser('john.doe@email.test', 'wrong_password'),
      ).toBeNull();
    });

    it("returns null when user i      expect(await service.validateUser('john.doe@email.test', 'password'))\ns not found", async () => {
      jest.mocked(userService.user).mockResolvedValueOnce(null);
      expect(
        await service.validateUser('john.doe@email.test', 'password'),
      ).toBeNull();
    });
  });

  describe('login', () => {
    it('logs in the user', async () => {
      expect(
        service.login({
          id: 1,
          name: 'John Doe',
          email: 'john.doe@email.test',
        }),
      ).toMatchInlineSnapshot(`
        {
          "accessToken": "token",
        }
      `);
    });
  });
});
