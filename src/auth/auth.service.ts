import { HttpStatus, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthConstant } from './auth.constant';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signUp(body) {
        const { isAdmin, ...rest } = body;

        const user = await this.userService.create(rest);

        if (!user) {
            throw new InternalServerErrorException('Create user fail!');
        }

        return this.login({
            username: rest.username,
            pass: rest.password
        })
    }

    async login(body) {
        const { username, pass } = body;

        const user = await this.userService.findByUsername(username);

        // In production should using bcript or hashing in here, but i skip it because time is limited.
        if (!user || user.password !== pass) {
            throw new UnauthorizedException('Username or password is not correct!')
        }

        const { password, ...rest } = user;

        return {
            statusCode: HttpStatus.OK,
            access_token: this.jwtService.sign({ ...rest }, { secret: AuthConstant.secret })
        }
    }
}
