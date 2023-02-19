import { Auth } from './../guards/auth.guard';
import { User } from './user.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { CurrentUser } from './decorators/current-user.decorator';
import { AuthService } from './auth.service';
import { UserDto } from './../dtos/user.dto';
import { UsersService } from './users.service';
import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    Param,
    // UseInterceptors,
    Session,
    UseGuards,
    NotFoundException,
    // ClassSerializerInterceptor 
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto'
import { UpdateUserDto } from '../dtos/update-user.dto'
import { Query } from '@nestjs/common/decorators'
import { Serialize } from '../interceptors/serialize.interceptor'

@Controller('auth')
@Serialize(UserDto)
// @UseInterceptors(CurrentUserInterceptor)
export class UsersController {
    constructor(private userService: UsersService, private authService: AuthService) { }

    @Post('/signup')
    async signup(@Body() body: CreateUserDto, @Session() session: any) {
        const { email, password } = body
        const user = await this.authService.signup(email, password)
        session.userId = user.id
        return user
    }

    @Post('/login')
    async login(@Body() body: CreateUserDto, @Session() session: any) {
        const { email, password } = body
        const user = await this.authService.login(email, password)
        session.userId = user.id
        return user
    }

    @Post('/logout')
    logout(@Session() session: any) {
        session.userId = null
    }

    // @UseInterceptors(ClassSerializerInterceptor)
    @Get('')
    findAllUsers(@Query('email') email: string) {
        return this.userService.findAllUsers(email)
    }

    // @Get('/profile')
    // async getMyProfile(@Session() session: any) {
    //     const { userId } = session;
    //     const user = await this.userService.findUser(userId)
    //     return user
    // }

    @Get('/profile')
    @UseGuards(Auth)
    async getMyProfile(@CurrentUser() user: User) {
        // const { userId } = session;
        // const user = await this.userService.findUser(userId)
        return user
    }
    // nest recommented
    // @UseInterceptors(ClassSerializerInterceptor)
    @Get('/:id')
    findUser(@Param('id') id: string) {
        return this.userService.findUser(parseInt(id))
    }

    @Put('/:id')
    updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
        return this.userService.updateUser(parseInt(id), body)
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(parseInt(id))
    }
}
