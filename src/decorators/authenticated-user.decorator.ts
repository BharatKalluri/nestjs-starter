import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../modules/user/schemas/user.schema';

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserDocument => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
