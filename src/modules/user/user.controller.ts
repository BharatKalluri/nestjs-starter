import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDocument } from './schemas/user.schema';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from '../../guards/firebase-auth.guard';
import { FirebaseAuthUserInfo } from '../../decorators/firebaseAuthUserInfo.decorator';
import { auth } from 'firebase-admin/lib/auth';
import { firebaseToken } from '../../constants/bearer-auth-token-names';
import { UserAuthGuard } from '../../guards/user-auth.guard';
import { AuthenticatedUser } from '../../decorators/authenticated-user.decorator';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth(firebaseToken)
@UseGuards(FirebaseAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
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

  @Patch('/')
  @UseGuards(UserAuthGuard)
  async update(
    @AuthenticatedUser() user: UserDocument,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.update(user, updateUserDto);
  }
}
