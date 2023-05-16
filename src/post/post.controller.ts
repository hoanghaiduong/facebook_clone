import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthCustomGuard } from 'src/auth/guard/AuthCustom.guard';
import { Post as PostEntity } from './entities/post.entity';
import { POST_TYPE } from './enum/post_type.enum';


@Controller('post')
@ApiTags('POST')

export class PostController {
  constructor(private readonly postService: PostService) { }
  @ApiBearerAuth()
  @UseGuards(AuthCustomGuard)
  @Post('create')
  @ApiQuery({
    name: 'type',
    enum: POST_TYPE,
    example: POST_TYPE.NEWS
  })
  @ApiQuery({
    name: 'categoryId',
    example: "651590bd-0fc2-4971-b084-434798620309"
  })
  async create(@Req() req, @Query('categoryId') categoryId: string, @Query('type') type: POST_TYPE, @Body() createPostDto: CreatePostDto): Promise<PostEntity | any> {
    return await this.postService.create({
      ...createPostDto,
      userId: req.uid,
      categoryId,
      type
    });
  }

  @Get('gets')
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
