import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { auth } from 'firebase-admin/lib/auth';

export const FirebaseAuthUserInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): auth.DecodedIdToken => {
    const request = ctx.switchToHttp().getRequest();
    return request.firebaseAuthInfo;
  },
);
