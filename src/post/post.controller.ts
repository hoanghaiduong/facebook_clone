import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthCustomGuard } from 'src/auth/guard/AuthCustom.guard';
import { Post as PostEntity } from './entities/post.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Request } from 'express';
import * as path from 'path';


@Controller('post')
@ApiTags('POST')

export class PostController {
  constructor(private readonly postService: PostService) { }
  @ApiBearerAuth()
  @UseGuards(AuthCustomGuard)
  @Post('create')
  @ApiConsumes('multipart/form-data', 'application/json')
  @ApiQuery({
    name: 'categoryId',
    example: '651590bd-0fc2-4971-b084-434798620309'
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'Product title'
        },
        content: {
          type: 'text',
          example: `<p>&nbsp;</p>
          <table style="border-collapse: collapse; width: 100.022%; height: 145.275px;" border="1"><colgroup><col style="width: 16.699%;"><col style="width: 16.699%;"><col style="width: 16.699%;"><col style="width: 16.699%;"><col style="width: 16.699%;"><col style="width: 16.5913%;"></colgroup>
          <tbody>
          <tr style="height: 24.2125px;">
          <td style="height: 24.2125px;"><em><strong>3313</strong></em></td>
          <td style="height: 24.2125px;"><em><strong>123</strong></em></td>
          <td style="height: 24.2125px;"><em><strong>123</strong></em></td>
          <td style="height: 24.2125px;"><em><strong>123</strong></em></td>
          <td style="height: 24.2125px;"><em><strong>4124</strong></em></td>
          <td style="height: 24.2125px;">&nbsp;</td>
          </tr>
          <tr style="height: 24.2125px;">
          <td style="height: 24.2125px;">123</td>
          <td style="height: 24.2125px;">44567<img src="https://www.shutterstock.com/image-photo/smiling-girl-student-wear-wireless-260nw-1492613150.jpg" alt="7,324,280 Online Images, Stock Photos &amp; Vectors | Shutterstock">&nbsp;</td>
          <td style="height: 24.2125px;">&nbsp;</td>
          <td style="height: 24.2125px;">&nbsp;</td>
          <td style="height: 24.2125px;">&nbsp;</td>
          <td style="height: 24.2125px;">&nbsp;</td>
          </tr>
          <tr style="height: 24.2125px;">
          <td style="height: 24.2125px;">&nbsp;</td>
          <td style="height: 24.2125px;">&nbsp;</td>
          <td style="height: 24.2125px;">&nbsp;</td>
          <td style="height: 24.2125px;"><em><strong>12</strong></em></td>
          <td style="height: 24.2125px;">&nbsp;</td>
          <td style="height: 24.2125px;">&nbsp;</td>
          </tr>
          <tr style="height: 24.2125px;">
          <td style="height: 24.2125px;">&nbsp;</td>
          <td style="height: 24.2125px;">&nbsp;</td>
          <td style="height: 24.2125px;">&nbsp;</td>
          <td style="height: 24.2125px;">&nbsp;</td>
          <td style="height: 24.2125px;">&nbsp;</td>
          <td style="height: 24.2125px;">&nbsp;</td>
          </tr>
          <tr style="height: 24.2125px;">
          <td style="height: 24.2125px;">&nbsp;</td>
          <td style="height: 24.2125px;">&nbsp;</td>
          <td style="height: 24.2125px;">&nbsp;</td>
          <td style="height: 24.2125px;">&nbsp;</td>
          <td style="height: 24.2125px;">&nbsp;</td>
          <td style="height: 24.2125px;">&nbsp;</td>
          </tr>
          <tr style="height: 24.2125px;">
          <td style="height: 24.2125px;">&nbsp;</td>
          <td style="height: 24.2125px;">&nbsp;</td>
          <td style="height: 24.2125px;">&nbsp;</td>
          <td style="height: 24.2125px;">&nbsp;</td>
          <td style="height: 24.2125px;">&nbsp;</td>
          <td style="height: 24.2125px;">&nbsp;</td>
          </tr>
          </tbody>
          </table>`
        },
        favorites: {
          type: 'integer',
          example: 430
        },
        views: {
          type: 'integer',
          example: 7899
        },
        isTrending: {
          type: 'boolean',
          example: true
        },
        isHot: {
          type: 'boolean',
          example: true
        },
        isNews: {
          type: 'boolean',
          example: true
        },
        isFavourite: {
          type: 'boolean',
          example: true
        },
        isPopular: {
          type: 'boolean',
          example: true
        },
        isFeatured: {
          type: 'boolean',
          example: true
        },
        photo: {
          type: 'string',
          format: 'binary',
        },
        images: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'photo', maxCount: 1 },
    { name: 'images', maxCount: 5 },
  ],
    {
      storage: diskStorage({
        destination: 'public/uploads/post',
        filename: (req: Request, file, callback) => {

          let name = `${Date.now()}-unknown`;
          if (file.originalname && typeof file.originalname === 'string') {
            name = `${Date.now()}-${path.parse(file.originalname).name}`;
          }
          const extension = path.parse(file.originalname || '').ext;
          const fileName = `${name}${extension}`;
          console.log("Uploading...");
          callback(null, fileName);
        },
      }),
    },
  ))

  async create(@Req() req, @Query('categoryId') categoryId: string, @Body() createPostDto: CreatePostDto, @UploadedFiles() files?: {
    photo?: Express.Multer.File[],
    images?: Express.Multer.File[]
  }): Promise<PostEntity | any> {
    const { photo, images } = files;
    const filePath = photo?.[0]?.filename ? `uploads/post/${photo[0].filename}` : null;
    const filesPath = images?.map(p => `uploads/post/${p.filename}`) || [];

    return await this.postService.create({
      ...createPostDto,
      userId: req.uid,
      categoryId,
      photo: filePath,
      images: filesPath,
    });
  }

  @Get('gets')
  findAll() {
    return this.postService.findAll();
  }

  @Get('get')
  async findOne(@Query('id') id: string) {
    return await this.postService.findOneRelation(id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthCustomGuard)

  @Patch('update')
  async update(@Req() req, @Query('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postService.update(id, {
      ...updatePostDto,
      userId: req.uid
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postService.remove(+id);
  }
}
