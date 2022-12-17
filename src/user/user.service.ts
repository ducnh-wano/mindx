import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findById(id) {
        return this.usersRepository.findOne({
            where: {
                id
            }
        })
    }

    async findByUsername(username) {
        return this.usersRepository.findOne({
            select: {
                username: true,
                password: true,
                id: true
            },
            where: {
                username
            }
        })
    }

    async create(params) {
        return this.usersRepository.insert({
            ...params
        })
    }
}
