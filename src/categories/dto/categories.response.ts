import { CategoryResponse } from './category.response';
import { ApiProperty } from '@nestjs/swagger';

export class CategoriesResponse {
  @ApiProperty({
    description: 'The categories',
    type: [CategoryResponse],
  })
  items: CategoryResponse[];

  @ApiProperty({
    description: 'Number of returned categories',
  })
  count: number;
}
