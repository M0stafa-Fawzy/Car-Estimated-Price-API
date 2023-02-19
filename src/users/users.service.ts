import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UsersService {
    // use InjectRepository just to tell DI stystem to deal with generic types
    // use <User> becase repository need to deal with entity of generic
    constructor(@InjectRepository(User) private repo: Repository<User>) { }

    createUser(email: string, password: string) {
        const user = this.repo.create({ email, password })
        // we can use save with out ceate but we use create first to create an instance
        // of this entity to perform any logic may be in entity.ts like validation in dto
        // we can use hooks only with create as there are applied to an entity
        return this.repo.save(user)
    }

    findUser(id: number) {
        if (!id) return null
        return this.repo.find({
            where: { id }
        })
    }

    findAllUsers(email: string) {
        return this.repo.find({
            where: {
                email
            }
        })
    }

    async updateUser(id: number, updates: Partial<User>) {
        const user = await this.findUser(id)
        if (user.length == 0) {
            throw new NotFoundException('user not found')
        }

        Object.assign(user[0], updates)
        return this.repo.save(user[0])

        // return this.repo.update({ id }, updates)
        // return this.repo.save(user)
    }

    async deleteUser(id: number) {
        const user = await this.findUser(id)
        if (user.length == 0) {
            throw new NotFoundException('user not found')
        }
        return this.repo.remove(user)
    }
}
