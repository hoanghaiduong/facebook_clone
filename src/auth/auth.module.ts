import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { RoleService } from 'src/role/role.service';
import { Role } from 'src/role/entities/role.entity';
import { Repository } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User,Role])],
  controllers: [AuthController],
  providers: [AuthService, UsersService, RoleService],
  exports: [AuthService, TypeOrmModule]
})
export class AuthModule { }
