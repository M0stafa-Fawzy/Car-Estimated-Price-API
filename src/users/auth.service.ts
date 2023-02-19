import { UsersService } from './users.service';
import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { randomBytes, scrypt } from 'crypto';
// promisify function is used to convert functioan that need call back 
// to make it make use of promises instead
import { promisify } from 'util'
const promisedScrypt = promisify(scrypt)

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) { }

    async signup(email: string, password: string) {
        const users = await this.userService.findAllUsers(email)
        if (users.length) throw new BadRequestException('email is already in use')

        const salt = randomBytes(8).toString('hex')
        // as buffer to make TS know what is hash variable type is
        const hash = (await promisedScrypt(password, salt, 32)) as Buffer
        const hashedPassword = salt + '.' + hash.toString('hex')

        const user = await this.userService.createUser(email, hashedPassword)
        return user
    }

    async login(email: string, password: string) {
        const [user] = await this.userService.findAllUsers(email)
        if (!user) throw new NotFoundException('user not found')

        const [salt, hashed] = user.password.split('.')
        const hash = (await promisedScrypt(password, salt, 32)) as Buffer

        if (hashed != hash.toString('hex')) throw new BadRequestException('wrong password')
        return user
    }
}