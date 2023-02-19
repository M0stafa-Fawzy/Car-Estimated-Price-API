import { UsersService } from './../users.service';
import { NestInterceptor, CallHandler, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private usersService: UsersService) { }

    async intercept(ctx: ExecutionContext, handler: CallHandler) {
        const request = ctx.switchToHttp().getRequest()
        const { userId } = request.session || {}

        if (userId) {
            const user = await this.usersService.findUser(userId)
            request.user = user
        }
        return handler.handle()
    }
}