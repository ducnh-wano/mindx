import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findUsers() {
        const users = await this.usersRepository.find({
            select: {
                id: true,
                username: true,
                email: true,
                age: true,
                name: true
            },
            where: {
                isAdmin: false
            }
        })

        return {
            statusCode: HttpStatus.OK,
            data: users
        }
    }

    async deleteUser(id: number) {
        const user = await this.usersRepository.findOne({
            where: {
                id
            }
        })

        if (!user) {
            throw new NotFoundException('user does not exists')
        }

        if (user.isAdmin) {
            throw new HttpException('Require specific role', HttpStatus.FORBIDDEN)
        }

        await this.usersRepository.delete(id)

        return {
            statusCode: HttpStatus.NO_CONTENT,
            message: 'User deleted!'
        }
    }

    async updateUser(id: number, body) {
        const user = await this.usersRepository.findOne({
            where: {
                id
            }
        })

        if (!user) {
            throw new NotFoundException('user does not exists')
        }

        if (user.isAdmin) {
            throw new HttpException('Require specific role', HttpStatus.FORBIDDEN)
        }

        const { isAdmin, ...rest } = body

        await this.usersRepository.update(id, {
            ...rest
        })

        return {
            statusCode: HttpStatus.NO_CONTENT,
            message: 'User updated!'
        }
    }
}
