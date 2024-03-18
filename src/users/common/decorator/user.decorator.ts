import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const requests = ctx.switchToHttp().getRequest();
        return requests.user;
    }
)