import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('role')
@ApiTags('Role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }
  @Post('init-role')
  initRole() {
    return this.roleService.initRole();
  }
  @Post('create')
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get('get-all-role')
  findAll() {
    return this.roleService.findAll();
  }

  @Get('get-roles')
  findOne(@Query('name') name: string[]) {
    return this.roleService.findByName(name);
  }

  @Patch('update')
  update(@Query('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete('delete')
  remove(@Query('id') id: string) {
    return this.roleService.remove(id);
  }
}
