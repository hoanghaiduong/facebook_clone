import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';
import { UsersService } from 'src/users/users.service';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postService: Repository<Post>,
    private userService: UsersService,
    private categoryService: CategoryService,
  ) {

  }
  async create(createPostDto: CreatePostDto): Promise<Post> {
    const category = await this.categoryService.findOne("651590bd-0fc2-4971-b084-434798620309");
    const user = await this.userService.findOne(createPostDto.userId);
    const creating = this.postService.create({
      ...createPostDto,
      category,
      user,
      comments: null,
    })

    return await this.postService.save(creating);
  }

  async findAll(): Promise<Post[]> {
    return await this.postService.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
