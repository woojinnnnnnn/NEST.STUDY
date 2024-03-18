import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const Token = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const response = ctx.switchToHttp().getResponse();
        return response.locals.jwt;
    }
)
// 데코레이터를 만들면 

// @Token() token 컨트롤러에서 이런식으로 작성 가능.