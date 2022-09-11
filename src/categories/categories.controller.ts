import { Controller, Get, Param, Request } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiExtraModels, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CategoryResponse } from './dto/category.response';
import { ProductResponse } from './dto/product.response';
import { CategoriesResponse } from './dto/categories.response';

@Controller('categories')
@ApiExtraModels(ProductResponse)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieve all category',
    description:
      'Retrieve all categories where at least a product inside are visible for the user.',
  })
  @ApiOkResponse({
    description: 'valid categories',
    type: CategoriesResponse,
  })
  async findAll(@Request() request) {
    const categories = await this.categoriesService.categories(
      request.user ? 'authenticated' : 'public',
    );
    return { items: categories, count: categories.length };
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve a category',
    description:
      'Retrieve a category if at least a product inside is visible for the user.',
  })
  @ApiOkResponse({
    description: 'category with valid products',
    type: CategoryResponse,
  })
  findOne(@Param('id') id: number, @Request() request) {
    return this.categoriesService.category(
      { id },
      request.user ? 'authenticated' : 'public',
    );
  }
}
