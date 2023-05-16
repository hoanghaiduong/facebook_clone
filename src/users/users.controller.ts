import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RegisterUserDTO } from './dto/register-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Post('register')
  create(@Body() dto: RegisterUserDTO) {
    return this.usersService.create(dto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('get')
  findOne(@Query('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('update')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return await this.usersService.update(id, updateUserDto);
  }

  @Delete('delete')
  remove(@Query('id') id: string) {
    return this.usersService.remove(id);
  }
}
