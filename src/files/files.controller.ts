import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, UploadedFile, UseInterceptors, UploadedFiles, Res, Query, UseGuards, Req } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';
import { AuthCustomGuard } from 'src/auth/guard/AuthCustom.guard';
@ApiTags("FILE_CONTROLLER")
@Controller('files')
@ApiBearerAuth()
@UseGuards(AuthCustomGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) { }
  @Post('upload')

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })

  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: 'public/uploads/single',
      filename: (req, file, callback) => {
        const uid = req.query.uid;

        let name = `${uid}-unknown`;
        if (file.originalname && typeof file.originalname === 'string') {
          name = `${uid}-${path.parse(file.originalname).name}`;
        }
        const extension = path.parse(file.originalname || '').ext;
        const filePath = path.join(`public/uploads/single`, `${name}${extension}`);
        if (fs.existsSync(filePath)) {
          console.log("file already exists! deleting...")
          fs.unlinkSync(filePath);
          console.log("Deleted!");
        }

        console.log("Uploading...");
        callback(null, `${name}${extension}`);

      },
    }),
  }))

  @ApiResponse({ status: 200, description: 'File uploaded successfully' })
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<string | any> {
    const filePath = `public/uploads/single/${file.filename}`;
    try {
      return { message: 'File uploaded successfully', file: filePath };
    } catch (error) {
      if (fs.existsSync(filePath)) {
        console.log("file already exists! deleting...")
        fs.unlinkSync(filePath);
        console.log("Deleted!");
      }
      throw new BadRequestException(error.message, error)
    }
  }


  //upload mutiple file 
  @Post('upload-multiple')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(FilesInterceptor('files', 5, {
    storage: diskStorage({
      destination: `public/uploads/mutiple/files`,
      filename: async (req, file, callback) => {
        const uid = req.query.uid;

        let name = `${uid}-unknown`;
        if (file.originalname && typeof file.originalname === 'string') {
          name = `${uid}-${path.parse(file.originalname).name}`;
        }
        const extension = path.parse(file.originalname || '').ext;
        const filePath = path.join(`public/uploads/mutiple/files`, `${name}${extension}`);
        if (fs.existsSync(filePath)) {
          console.log("file already exists! deleting...")
          fs.unlinkSync(filePath);
          console.log("Deleted!");
        }

        console.log("Uploading...");
        callback(null, `${name}${extension}`);
      },
    })
  }))
  @ApiResponse({ status: 200, description: 'Files uploaded successfully' })
  async uploadMultipleFiles(@UploadedFiles() files?: Array<Express.Multer.File>): Promise<any> {
    const filesPath = files.map(file => `uploads/mutiple/files/${file.filename}`);

    try {
      return { message: 'Files uploaded successfully', files: filesPath };
    } catch (error) {
      console.log('Deleting uploaded files...');
      filesPath.forEach(image => {
        fs.unlinkSync(`public/${image}`);
      });
      console.log('Files deleted!');
      throw new BadRequestException("Error uploading files" + error.message)
    }
  }

  ///
  @Get('file-name')
  getFile(@Query('filename') filename: string, @Res() res: Response) {
    const directory = 'public'; // Thư mục gốc
    const filePath = this.findFile(directory, filename); // Tìm kiếm tệp tin

    if (filePath) {
      const fileContent = fs.readFileSync(filePath); // Đọc nội dung của tệp
      const contentType = this.getContentType(filename); // Xác định loại nội dung của tệp

      res.header('Content-Type', contentType); // Thiết lập header Content-Type cho tệp
      res.send(fileContent); // Trả về nội dung của tệp
    } else {
      res.status(404).send('File not found');
    }
  }

  private findFile(directory: string, filename: string): string | null {
    const files = fs.readdirSync(directory);

    for (const file of files) {
      const filePath = path.join(directory, file);
      const stats = fs.statSync(filePath);

      if (stats.isDirectory()) {
        const foundFilePath = this.findFile(filePath, filename);

        if (foundFilePath) {
          return foundFilePath;
        }
      } else if (file === filename) {
        return filePath;
      }
    }

    return null;
  }

  private getContentType(filename: string): string {
    const extname = path.extname(filename).toLowerCase();

    switch (extname) {
      case '.jpeg':
      case '.jpg':
        return 'image/jpeg';
      case '.png':
        return 'image/png';
      case '.gif':
        return 'image/gif';
      // Thêm các loại nội dung khác tùy theo yêu cầu
      default:
        return 'application/octet-stream'; // Mặc định trả về loại nội dung không xác định
    }
  }
  @Get()
  getAllFiles() {
    const directoryPath = 'public/uploads';
    const files = fs.readdirSync(directoryPath);
    const imageFiles = files.filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png'));
    const result = imageFiles.map(filename => ({
      filename,
      path: `${directoryPath}/${filename}`
    }));
    return result;
  }
}
