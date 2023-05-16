import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { defaultAuth } from 'src/config/firebase.config';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import { RoleService } from 'src/role/role.service';
import { AuthService } from 'src/auth/auth.service';
import { RegisterUserDTO } from './dto/register-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
    private readonly authService: AuthService
  ) {

  }
  async create(registerDTO: RegisterUserDTO): Promise<User | any> {

    try {
      const createUserFirebase = await defaultAuth.createUser({
        email: registerDTO.email,
        password: registerDTO.password,
        displayName: registerDTO.displayName
      });

      if (!createUserFirebase) {
        throw new BadRequestException("ERROR: Failed to create user firebase");
      }
      const roles = await this.roleService.findByName("USER");
      const creating = this.userRepository.create({
        id: createUserFirebase.uid,
        email: createUserFirebase.email,
        displayName: createUserFirebase.displayName,
        roles
      })
      const savedUserDB = await this.userRepository.save(creating);
      if (!savedUserDB) {
        throw new BadRequestException("ERROR: Failed to create user in database ");
      }
      return savedUserDB;
    } catch (error) {
      throw new BadRequestException(error.message);
    }


  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['roles']
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id }
    })
    if (!user) throw new NotFoundException("USER NOT FOUND");
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | any> {
    try {
      const userFirebase = await defaultAuth.getUser(id);
    if (!userFirebase) {
      throw new NotFoundException("USER NOT FOUND");

    }
    const user = await this.findOne(id);
    //update with firebase
    var url = updateUserDto.avatar;
    var isURL = /^https?:\/\//i.test(url);
    const updateFirebase = await defaultAuth.updateUser(user.id, {
      displayName: updateUserDto.displayName,
      emailVerified: updateUserDto.email_verified,
      phoneNumber: updateUserDto.phoneNumber,
      disabled: updateUserDto.disabled,
      photoURL: isURL ? url : userFirebase.photoURL || "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg",
    });
    if (!updateFirebase) {
      throw new BadRequestException("UPDATE FAILED IN FIREBASE")
    }
    const merged = this.userRepository.merge(user, updateUserDto);
    const updatedUser = await this.userRepository.update(id, merged);
    if (!updatedUser) {
      throw new BadRequestException("UPDATE FAILED")
    }
    return merged;
    } catch (error) {
        throw new BadRequestException(error.message)
    }

  }

  async remove(id: string) {
    const userDB = await this.findOne(id);
    const userFB = await this.authService.findOneByUID(id);
    if (!userFB) {
      throw new NotFoundException("USER NOT FOUND ! DELETE FAILED")
    }
    await defaultAuth.deleteUser(id);
    await this.userRepository.delete(userDB);
    return {
      status: 200,
      message: "User deleted successfully"
    }

  }
}
