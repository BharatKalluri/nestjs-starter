import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

export class UserDao {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(context: { email?: string; phoneNumber?: string }) {
    const { email, phoneNumber } = context;
    return this.userModel.create({
      _id: Types.ObjectId(),
      email: email,
      phoneNumber: phoneNumber,
    });
  }

  async getByEmail(email: string) {
    return this.userModel.findOne({
      email: email,
    });
  }

  async getByPhoneNumber(phoneNumber: string) {
    return this.userModel.findOne({
      phoneNumber: phoneNumber,
    });
  }

  async getByEmailOrPhoneNumber(context: {
    email?: string;
    phoneNumber?: string;
  }): Promise<UserDocument | null> {
    const { email, phoneNumber } = context;
    const userByEmail: UserDocument | null = email
      ? await this.getByEmail(email)
      : null;
    if (userByEmail) {
      return userByEmail;
    }
    return phoneNumber ? this.getByPhoneNumber(phoneNumber) : null;
  }

  async updateUser(
    user: UserDocument,
    context: {
      phoneNumber?: string;
    },
  ): Promise<UserDocument> {
    const { phoneNumber } = context;
    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }
    return user.save();
  }
}
