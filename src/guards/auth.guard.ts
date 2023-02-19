import { CanActivate, ExecutionContext } from '@nestjs/common'

// implement CanActivate to insure that this class perform as right guard
export class Auth implements CanActivate {
    canActivate(ctx: ExecutionContext) {
        // if returned any falsy value then this req will be refused
        const request = ctx.switchToHttp().getRequest()
        return request.session.userId
    }
}