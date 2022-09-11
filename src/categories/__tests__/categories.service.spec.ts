import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from '../categories.service';
import { PrismaModule } from '../../prisma/prisma.module';

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService],
      imports: [PrismaModule], // Instead of doing pure unit testing, we're testing the database and prisma functions
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('categories', () => {
    it('finds only categories with public products', async () => {
      expect(await service.categories('public')).toMatchInlineSnapshot(`
        [
          {
            "description": "Correspondances illimitées dans l'heure suivant la première validation.",
            "id": 1,
            "index": 1,
            "label": "Titres Unitaires",
          },
          {
            "description": "Validations illimité dans la periode de l'abonnement.
        Attention, la validation reste obligatoire à chaque montée.",
            "id": 2,
            "index": 3,
            "label": "Abonnements",
          },
        ]
      `);
    });

    it('finds only categories with private products', async () => {
      expect(await service.categories('authenticated')).toMatchInlineSnapshot(`
        [
          {
            "description": "Correspondances illimitées dans l'heure suivant la première validation.",
            "id": 1,
            "index": 1,
            "label": "Titres Unitaires",
          },
          {
            "description": "Validations illimité dans la periode de l'abonnement.
        Attention, la validation reste obligatoire à chaque montée.",
            "id": 2,
            "index": 3,
            "label": "Abonnements",
          },
          {
            "description": "Titre Éco+
        Afin de limiter la quantité de voitures dans le centre-ville, nous proposont un ensemble de 48 parkings dans la périphérie.
        Chaque ticket vous permetra d'accéder au parking ainsi que faire un voyage aller et retourn sur notre réseau.
        Ces tickets sont également en vente à l'entrée des parking.",
            "id": 3,
            "index": 2,
            "label": "Parking+Transport",
          },
        ]
      `);
    });
  });

  describe('category', () => {
    it('finds only public products', async () => {
      const category = await service.category({ id: 2 }, 'public');
      expect(category.products.length).toBe(1);
      expect(category.products.every((p) => p.visible_public)).toBeTruthy();
    });

    it('finds only private products', async () => {
      const category = await service.category({ id: 1 }, 'authenticated');
      expect(category.products.length).toBe(2);
      expect(
        category.products.every((p) => p.visible_authenticated),
      ).toBeTruthy();
    });

    it('does not return category when no products are found', async () => {
      expect(await service.category({ id: 3 }, 'public')).toBeNull();
    });
  });
});
