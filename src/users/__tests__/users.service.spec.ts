import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { PrismaService } from '../../prisma/prisma.service';
import * as md5 from 'md5';

describe('UsersService', () => {
  let service: UsersService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    })
      .useMocker((token) => {
        if (token === PrismaService) {
          return {
            users: {
              findUnique: jest.fn().mockResolvedValue({
                id: 1,
                name: 'John Doe',
                email: 'john.doe@email.test',
                password_hash: md5('1password'),
              }),
            },
          };
        }
      })
      .compile();

    service = module.get<UsersService>(UsersService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('user', () => {
    it('finds the user', async () => {
      expect(await service.user({ id: 1 })).toMatchInlineSnapshot(`
        {
          "email": "john.doe@email.test",
          "id": 1,
          "name": "John Doe",
          "password_hash": "01ee9547a3f708f8fd986216bffd1eb7",
        }
      `);
    });

    it('returns null when user is not found', async () => {
      jest.mocked(prismaService.users.findUnique).mockResolvedValueOnce(null);
      expect(await service.user({ id: 1 })).toBeNull();
    });
  });
});
