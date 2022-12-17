import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthConstant } from 'src/auth/auth.constant';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private readonly userService: UserService,
    ) {

    }
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const accessToken = request.headers.authorization;
        try {
            const user = this.jwtService.verify(accessToken, { secret: AuthConstant.secret })

            const admin = await this.userService.findById(user.id)

            if (!admin.isAdmin) {
                throw new HttpException('Permission denied', HttpStatus.FORBIDDEN)
            }

            request.user = user;

            return true;
        } catch (error) {
            throw new UnauthorizedException();
        }
    }
}