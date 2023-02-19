import { User } from './../users/user.entity';
import { UsersService } from './../users/users.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from "express";

// modify request interface to may be hase a prop named user
declare global {
    namespace Express {
        interface Request {
            user?: User
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private usersService: UsersService) { }

    async use(req: Request, res: Response, next: NextFunction) {
        const { userId } = req.session || {}

        if (userId) {
            const user = await this.usersService.findUser(userId)
            req.user = user[0]
        }
        next()
    }
}