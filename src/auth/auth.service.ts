import { Injectable, NotFoundException } from '@nestjs/common';

import { defaultAuth } from 'src/config/firebase.config';
import * as admin from 'firebase-admin';
import { User } from 'src/users/entities/user.entity';
import { UidIdentifier, UserIdentifier } from 'firebase-admin/lib/auth/identifier';
import { UsersService } from 'src/users/users.service';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { RoleService } from 'src/role/role.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersService: Repository<User>,
    private roleService: RoleService
  ) {

  }
  async verifyIdToken(idToken: string): Promise<admin.auth.DecodedIdToken> {
    try {
      const decodedToken = await defaultAuth.verifyIdToken(idToken);
      return decodedToken;
    } catch (error) {
      console.error('Error while verifying Firebase ID token:', error);
      throw error;
    }
  }
  async findOne(user: UserRecord): Promise<UserIdentifier> {
    if (!user) throw new NotFoundException("User not found in firebase");
    return user;
  }
  async findOneByUID(uid: string): Promise<UserRecord> {
    const user=await defaultAuth.getUser(uid);
    if (!user) throw new NotFoundException("User not found in firebase");
    return user;
  }
  async SignUp(user: DecodedIdToken): Promise<User | any> {

    if (!user) throw new NotFoundException("User not found in firebase");
    const roles = await this.roleService.findByName("USER");
    if (!roles) throw new NotFoundException("Role not found");
    const userDTO: CreateUserDto = {
      id: user.uid,
      avatar: user.picture || "https://static.vecteezy.com/system/resources/previews/009/734/564/original/default-avatar-profile-icon-of-social-media-user-vector.jpg",
      auth_time: user.auth_time,
      displayName: user.displayName,
      email: user.email,
      phoneNumber: user.phone_number,
      email_verified: user.email_verified,
      first_name: "",
      last_name: "",
      sign_in_provider: user.firebase.sign_in_provider,
      disabled:false,
      roles
    }

    const userDB = await this.usersService.findOne({
      where: {
        id: user.uid,
      },
      relations:["roles"]
    });
    let savedUser;
    if (user && !userDB) {

      const creatingUser = await this.usersService.create(userDTO);
      savedUser = await this.usersService.save(creatingUser);
    }
    else {
      return userDB;
    }
    return savedUser;

  }
}
