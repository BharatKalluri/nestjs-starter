import { Injectable } from '@nestjs/common';
import { UserDao } from './user.dao';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}

  async create(context: { email?: string; phoneNumber?: string }) {
    return await this.userDao.create(context);
  }

  async get(context: { email?: string; phoneNumber?: string }) {
    return await this.userDao.getByEmailOrPhoneNumber(context);
  }
}
