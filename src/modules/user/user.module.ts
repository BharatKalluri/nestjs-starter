import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { UserDao } from './user.dao';
import { FirebaseModule } from '../../providers/firebase/firebase.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    FirebaseModule,
  ],
  providers: [UserService, UserDao],
  controllers: [UserController],
})
export class UserModule {}
