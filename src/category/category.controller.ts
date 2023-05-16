import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('category')
@ApiTags("Category")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  
  @Post('intit')
  init() {
    return this.categoryService.initCategory();
  }

  @Get('gets')
  findAllCategoy() {
    return this.categoryService.findAll();
  }

  @Get('search')
  @ApiQuery({ name: 'search', required: false, example: 'category name' })
  findAll(@Query('search') search?: string) {
    return this.categoryService.Search(search);
  }
  

  @Get('get')
  async findOne(@Query('id') id: string) {
    return await this.categoryService.findOne(id);
  }

  @Post('create')
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Put('update')
  update(@Query('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete('delete')
  remove(@Query('id') id: string) {
    return this.categoryService.remove(id);
  }
}
