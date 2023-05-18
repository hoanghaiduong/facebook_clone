import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './role/role.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { database_config } from './config/database.config';
import { CategoryModule } from './category/category.module';
import { TagsModule } from './tags/tags.module';
import { FilesModule } from './files/files.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(database_config),
    ConfigModule.forRoot(), AuthModule, UsersModule, PostModule, CommentModule, RoleModule, CategoryModule, TagsModule, FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
