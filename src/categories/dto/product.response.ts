import { ApiProperty } from '@nestjs/swagger';
import { products } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class ProductResponse implements products {
  @ApiProperty({
    description: 'The product id',
  })
  id: number;

  @ApiProperty({
    description: 'The product label',
  })
  label: string;

  @ApiProperty({
    description: 'The product description',
  })
  description: string;

  @ApiProperty({
    description: 'The product price',
  })
  price: number;

  @ApiProperty({
    description: 'The product image',
  })
  thumbnail_url: string;

  @Exclude()
  category_id: number;

  @Exclude()
  visible_public: number;

  @Exclude()
  visible_authenticated: number;
}
