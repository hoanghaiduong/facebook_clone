import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { UsersService } from 'src/users/users.service';
import { AuthService } from '../auth.service';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly authService: AuthService,
        private readonly reflector: Reflector,

    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new BadRequestException("Missing token");
        }
        try {

            const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
                context.getHandler(),
                context.getClass(),
            ]);
            if (!requiredRoles) {
                return true;
            }
            const decodedToken = await this.authService.verifyIdToken(token);
            const uid = decodedToken.uid;
            request.user = decodedToken;
            request.uid = uid;
            // const role = (await this.userService.findOne(uid)).role;

            // if (!requiredRoles.includes(role.name)) {
            //     throw new ForbiddenException('METHOD NOT ALLOWED')
            // }
            // if (role.name !== requiredRoles[0]) {
            //     throw new ForbiddenException('METHOD NOT ALLOWED')
            // }

        } catch (error) {
            throw new HttpException(error.message, HttpStatus.UNAUTHORIZED)
        }
        return true;
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
