import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private roleRepository: Repository<Role>) { }


  async initRole() {
    const rolesToCreate = [
      {
        name: 'ADMIN',
      },
      {
        name: 'POSTER',
      },
      {
        name: 'USER',
      },
    ];

    const existingRoles = await Promise.all(
      rolesToCreate.map(async role => {
        const existingRole = await this.roleRepository.findOne({
          where: {
            name: role.name,
          },
        });
        return existingRole;
      })
    );

    const rolesToAdd = rolesToCreate.filter((role, index) => !existingRoles[index]);

    if (rolesToAdd.length === 0) {
      // Nếu không có vai trò mới cần tạo, bạn có thể trả về một giá trị tùy ý hoặc không làm gì cả
      return;
    }

    const creating = this.roleRepository.create(rolesToAdd);
    return this.roleRepository.save(creating);
  }

  create(createRoleDto: CreateRoleDto) {
    const createRole = this.roleRepository.create(createRoleDto);
    return this.roleRepository.save(createRole);
  }

  findAll() {
    return this.roleRepository.find();
  }

  async findByName(names: string | string[]): Promise<Role[]> {
    let nameList = Array.isArray(names) ? names : [names];

    const roles = await this.roleRepository.find({
      where: { name: In(nameList) }
    });

    if (roles.length === 0) {
      throw new NotFoundException("ROLE DOES NOT exist");
    }

    return roles;
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: {
        id
      }
    });
    if (!role) {
      throw new NotFoundException("Role Not Found");
    }
    return role
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);
    const merged = this.roleRepository.merge(role, updateRoleDto);
    const updated = await this.roleRepository.update(id, merged);
    return merged;
  }

  async remove(id: string) {
    const role = await this.findOne(id);
    const deleted = await this.roleRepository.delete(role);
    if (!deleted) throw new BadRequestException("ERROR DELETING ROLE " + role);
    return {
      status: 200,
      message: "DELETED ROLE SUCCESSFUL",
    }
  }
}
