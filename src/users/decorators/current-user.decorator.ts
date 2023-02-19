// we connot simply import UsersService and create an object of it and start using it
// because it use DI and it has access to userRepository which only can be used through DI
// so we are gonna create interceptor which willhandle this issue
import { UsersService } from './../users.service';
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const CurrentUser = createParamDecorator((data: never, ctx: ExecutionContext) => {
    // data here contains any args i provide where i use this decorator
    // ctx here is the incoming request data
    // we cal simply put its type annotation to be req type
    // but we use ExecutionContext because incoming req may be web socket message
    // or http req graphql req or any kind of requests or any communication protocols
    const req = ctx.switchToHttp().getRequest() // get incoming request
    return req.user
})