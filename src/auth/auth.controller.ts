import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthCustomGuard } from './guard/AuthCustom.guard';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';


@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  @UseGuards(AuthCustomGuard)
  async signup(@Req() req): Promise<User> {
    return await this.authService.SignUp(req.user);
  }
}
