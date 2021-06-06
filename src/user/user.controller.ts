import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDocument } from './schemas/user.schema';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../shared/guards/firebase-auth.guard';
import { FirebaseAuthUserInfo } from '../shared/decorators/firebaseAuthUserInfo.decorator';
import { auth } from 'firebase-admin/lib/auth';
import { firebaseToken } from '../shared/constants/bearer-auth-token-names';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth(firebaseToken)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @UseGuards(FirebaseAuthGuard)
  async getOrCreate(
    @FirebaseAuthUserInfo() firebaseUserInfo: auth.DecodedIdToken,
  ): Promise<UserDocument> {
    const email = firebaseUserInfo.email;
    const phoneNumber = firebaseUserInfo.phone_number;
    return this.userService.create({
      email: email,
      phoneNumber: phoneNumber,
    });
  }
}
