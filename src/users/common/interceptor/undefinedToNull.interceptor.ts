import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        // 컨트롤러 실행 전 부분
        return next.handle().pipe(map((data) => data === undefined ? null : data))
    }
}

// data === user 라면
// (data 가 undefined 라면 null 아니면 data)