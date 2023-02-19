import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable, map } from 'rxjs'
// import { map } from 'rxjs/operators'
import { plainToClass } from 'class-transformer'

interface DecoratorConstructor {
    new(...args: any[]): {}
}
export function Serialize(dto: DecoratorConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) { }
    intercept(ctx: ExecutionContext, handler: CallHandler): Observable<any> {
        // ctx here is a wrapper for incoming request
        // handler is route handler to be run after that
        // here to run something between req and res

        // this mean go ahead and run the route handler
        return handler.handle().pipe(
            // run something on res before sent to client
            map((data: any) => {
                // here to convert user dto into json
                return plainToClass(this.dto, data, {
                    // this property set to true to run @Expose() in user dto
                    excludeExtraneousValues: true
                })
            })
        )
    }
}