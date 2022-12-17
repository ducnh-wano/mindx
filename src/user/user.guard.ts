import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { AuthConstant } from 'src/auth/auth.constant';

@Injectable()
export class UserGuard implements CanActivate {
    constructor(
        private jwtService: JwtService
    ) {

    }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const accessToken = request.headers.authorization;
        try {
            const user = this.jwtService.verify(accessToken, { secret: AuthConstant.secret })

            request.user = user;

            return true;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}