import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../modules/user/schemas/user.schema';
import { auth } from 'firebase-admin';
import DecodedIdToken = auth.DecodedIdToken;

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let user: User | null = null;

    const firebaseUser: DecodedIdToken = request.firebaseAuthInfo;

    if (firebaseUser === undefined) {
      return false;
    }

    const emailFromFirebase = firebaseUser.email;
    const phoneNumberFromFirebase = firebaseUser.phone_number;

    if (emailFromFirebase) {
      user = await this.userModel.findOne({
        email: emailFromFirebase,
      });
    } else if (phoneNumberFromFirebase) {
      user = await this.userModel.findOne({
        phoneNumber: phoneNumberFromFirebase,
      });
    } else {
      return false;
    }

    if (user === null) {
      return false;
    }

    request.user = user;
    return true;
  }
}
