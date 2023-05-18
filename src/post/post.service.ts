import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { UsersService } from 'src/users/users.service';
import { CategoryService } from 'src/category/category.service';
import * as fs from 'fs';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postService: Repository<Post>,
    private userService: UsersService,
    private categoryService: CategoryService,
  ) {

  }
  removeWhitespace(str: string): string {
    return str.trim(); // Sử dụng phương thức trim() để xóa khoảng trắng thừa ở đầu và cuối chuỗi
  }
  async create(createPostDto: CreatePostDto): Promise<Post | any> {
    try {
   
      console.log(this.removeWhitespace(createPostDto.content));
      return this.removeWhitespace(createPostDto.content);
      // const category = await this.categoryService.findOne(createPostDto.categoryId);
      // const user = await this.userService.findOne(createPostDto.userId);
      // const creating = this.postService.create({
      //   ...createPostDto,
      //   category,
      //   user,
      //   comments: null,
      // })

      // return await this.postService.save(creating);
    } catch (error) {
     
      console.log("Create Product failed ! File deleting...");
      fs.unlinkSync(`public/${createPostDto.photo}`);
      createPostDto.images.map(image => {
        fs.unlinkSync(`public/${image}`);
      })
      console.log("Deleted!");

      throw new BadRequestException(error.message)
    }
  }

  async findAll(): Promise<Post[]> {
    return await this.postService.find({
      relations: ['category', 'user']
    });
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postService.findOne({
      where: { id }
    })
    if (!post) throw new NotFoundException("POST NOT FOUND");
    return post;
  }

  async findOneRelation(id: string): Promise<Post> {
    const post = await this.postService.findOne({
      where: { id },
      relations: ['category', 'user']
    })
    if (!post) throw new NotFoundException("POST NOT FOUND");
    return post;
  }
  async update(id: string, updatePostDto: UpdatePostDto) {
    try {
      const user = await this.userService.findOne(updatePostDto.userId);
      const category = await this.categoryService.findOne(updatePostDto.categoryId);

      const post = await this.findOneRelation(id);
      const merged = await this.postService.merge(post, {
        ...updatePostDto,
        user,
        category,
        comments: null
      });
      const updated = await this.postService.update(post.id, merged);
      if (!updated) {
        throw new BadRequestException("Update failed")
      }
      return merged
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
