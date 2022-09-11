import { ApiProperty } from '@nestjs/swagger';
import { categories } from '@prisma/client';
import { ProductResponse } from './product.response';

export class CategoryResponse implements categories {
  @ApiProperty({
    description: 'The category id',
  })
  id: number;

  @ApiProperty({
    description: 'The category id',
  })
  index: number;

  @ApiProperty({
    description: 'The category label',
  })
  label: string;

  @ApiProperty({
    description: 'The category description',
  })
  description: string;

  @ApiProperty({
    description: 'Category products',
  })
  products: ProductResponse[];
}
