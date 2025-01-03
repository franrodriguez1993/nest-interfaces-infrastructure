import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUserRepository } from '../../../shared/interfaces/user.repository';
import { User, UserDocument } from '../../../database/schemas/user.schema';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserMongoRepository implements IUserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async registerUser(dto: CreateUserDto): Promise<UserDto> {
    return  await this.userModel.create(dto);
  }

  async getById(id: string): Promise<UserDto> {
    return await this.userModel.findById(id);
  }

  async updateById(id: string, user: UpdateUserDto): Promise<UserDto> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    }).exec();
    if (updatedUser) {
      updatedUser.password = undefined; // Elimina la contraseña del objeto retornado
    }
    return updatedUser;
  }

  async deleteById(id: string): Promise<void> {
    await this.userModel.findByIdAndDelete(id).exec();
  }
}
