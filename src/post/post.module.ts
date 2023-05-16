import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { UsersService } from 'src/users/users.service';
import { CategoryService } from 'src/category/category.service';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { Role } from 'src/role/entities/role.entity';
import { RoleService } from 'src/role/role.service';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User, Category, Role])],
  controllers: [PostController],
  providers: [PostService, UsersService, CategoryService, RoleService, AuthService],
  exports: [TypeOrmModule, PostService]
})
export class PostModule { }
