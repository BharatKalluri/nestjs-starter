import { Injectable } from '@nestjs/common';
import { UserDao } from './user.dao';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}

  async create(context: { email?: string; phoneNumber?: string }) {
    return await this.userDao.create(context);
  }

  async get(context: { email?: string; phoneNumber?: string }) {
    return await this.userDao.getByEmailOrPhoneNumber(context);
  }

  async update(user: UserDocument, updateUserDto: UpdateUserDto) {
    return await this.userDao.updateUser(user, updateUserDto);
  }
}
