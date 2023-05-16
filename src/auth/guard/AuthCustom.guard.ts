import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';

import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthCustomGuard implements CanActivate {
    constructor(private readonly authService: AuthService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new BadRequestException("Missing token");
        }

        try {
            const decodedToken = await this.authService.verifyIdToken(token);
            if (!decodedToken) {
                throw new BadRequestException("Invalid token");
            }
            request.uid = decodedToken.uid;
            request.user = decodedToken;
            return true;
        } catch (error) {
            return false;
        }
    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
