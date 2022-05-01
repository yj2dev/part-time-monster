import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const JwtCookie = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('request >> ', request);
    return data ? request.cookies?.[data] : request.cookies;
  },
);
