import { User } from './user.entity';
import { Test } from '@nestjs/testing';
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";

describe('AuthService', () => {
    let service: AuthService
    let fakeUsersService: Partial<UsersService>

    beforeEach(async () => {
        // create fake auth service instance to be used
        let users: User[] = []
        fakeUsersService = {
            // only 2 function used inside auth service
            findAllUsers: (email: string) => Promise.resolve(users.filter(user => user.email === email)),
            createUser: (email: string, password: string) => {
                const user = { id: Math.round(Math.random() * 9999), email, password }
                users.push(user)
                return Promise.resolve(user)
            }
        }
        const module = await Test.createTestingModule({
            providers: [AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService
                }]
        }).compile()

        service = module.get(AuthService)
    })

    it('create test auth service instance', async () => {
        expect(service).toBeDefined()
    })

    it('should sign up and hash password', async () => {
        const user = await service.signup('mostafa@example.com', '123456')
        expect(user.password).not.toEqual('123456')

        // make sure that password hashed and salted
        const [salt, hash] = user.password.split('.')
        expect(salt).toBeDefined()
        expect(hash).toBeDefined()
    })

    it('should throw an error  if email in use', async () => {
        await service.signup('mos@ex.com', '123456')
        await expect(service.signup('mos@ex.com', '123456')).rejects.toThrow(BadRequestException)
    })

    it('should throw an error if sign in called with unused email', async () => {
        await expect(service.login('mos@ex.com', '123456')).rejects.toThrow(NotFoundException)
    })

    it('should throw an error if password is wrong', async () => {
        await service.signup('mos@ex.com', '1234567')
        await expect(service.login('mos@ex.com', '123456')).rejects.toThrow(BadRequestException);
    })

    it('should return a user if password is correct', async () => {
        await service.signup('a@a.com', 'blablabla')
        const user = await service.login('a@a.com', 'blablabla')
        expect(user).toBeDefined()
    })
})
