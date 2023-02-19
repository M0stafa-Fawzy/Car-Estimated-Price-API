import { CanActivate, ExecutionContext } from '@nestjs/common'

export class AdminGuard implements CanActivate {
    canActivate(ctx: ExecutionContext) {
        const req = ctx.switchToHttp().getRequest()
        if (!req.user) return false
        return req.user.isAdmin
    }
}