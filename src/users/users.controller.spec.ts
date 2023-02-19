import { User } from './user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { NotFoundException } from '@nestjs/common'

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>

  beforeEach(async () => {
    // create fake auth and users service instances to be used
    // let users: User[] = [],
    //   fakeUsersService = {
    //     // only 2 function used inside auth service
    //     findAllUsers: (email: string) => Promise.resolve(users.filter(user => user.email === email)),
    //     createUser: (email: string, password: string) => {
    //       const user = { id: Math.round(Math.random() * 9999), email, password }
    //       users.push(user)
    //       return Promise.resolve(user)
    //     }
    //   },
    //   fakeAuthService = {
    //     login: (email: string, password: string) => Promise.resolve({ id: Math.round(Math.random() * 999), email, password }),
    //     signup: (email: string, password: string) => Promise.resolve({ id: Math.round(Math.random() * 999), email, password })
    //   }

    let users: User[] = [],
      fakeUsersService = {
        findAllUsers: (email: string) => {
          return Promise.resolve([{
            id: Math.round(Math.random() * 9999),
            email: 'asdf@asdf.com',
            password: 'asdf',
          }]);
        },
        findUser: (id: number) => Promise.resolve({
          id,
          email: 'asdf@asdf.com',
          password: 'asdf'
        })
        // remove: () => {},
        // update: () => {},
      };
    fakeAuthService = {
      // signup: () => {},
      // signin: () => {},
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{
        provide: UsersService,
        useValue: fakeUsersService
      }, {
        provide: AuthService,
        useValue: fakeAuthService
      }]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return list with all users', async () => {
    const users = await controller.findAllUsers('asdf@asdf.com')
    expect(users.length).toEqual(1);
    expect(users[0].email).toEqual('asdf@asdf.com');
  })

  it('should return a selected user by id', async () => {
    const user = await controller.findUser('1')
    expect(user).toBeDefined()
  })
});
