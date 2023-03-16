import { RequestWithUser } from '../modules/auth/interface/requests/requestUser.request';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const HttpUser: () => any = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: RequestWithUser = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
