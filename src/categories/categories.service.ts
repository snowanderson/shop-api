import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

type Visibility = 'public' | 'authenticated';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  /**
   * Find all categories filtered by their visibility
   */
  categories(visibility: Visibility) {
    return this.prisma.categories.findMany({
      where: {
        products: {
          some: this.getVisibilityFilter(visibility),
        },
      },
    });
  }

  /**
   * Find a unique category and its products
   */
  category(
    categoryWhereUniqueInput: Prisma.categoriesWhereUniqueInput,
    visibility: Visibility,
  ) {
    return this.prisma.categories.findFirst({
      where: {
        ...categoryWhereUniqueInput,
        products: {
          some: this.getVisibilityFilter(visibility),
        },
      },
      select: {
        products: {
          where: this.getVisibilityFilter(visibility),
        },
      },
    });
  }

  /**
   * get visibility filter for request.
   * Used to filter products by visibility
   */
  private getVisibilityFilter(visibility: Visibility) {
    return visibility === 'authenticated'
      ? {
          visible_authenticated: 1,
        }
      : { visible_public: 1 };
  }
}
