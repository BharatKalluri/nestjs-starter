import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { FirebaseService } from '../providers/firebase/firebase.service';
import * as _ from 'lodash';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseService) {}

  extractBearerToken(bearerTokenRaw: string | undefined): string {
    if (
      bearerTokenRaw === undefined ||
      bearerTokenRaw?.startsWith('Bearer ') === false
    ) {
      throw new Error('token is invalid');
    } else {
      return _.trimStart(bearerTokenRaw, 'Bearer').trim();
    }
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const bearerToken: string = this.extractBearerToken(
        request.headers.authorization,
      );

      request.firebaseAuthInfo = await this.firebaseService.verifyUserWithToken(
        bearerToken,
      );

      return true;
    } catch (e) {
      return false;
    }
  }
}
