import { InjectRepository } from '@nestjs/typeorm';
import { IUserRepository } from '../../../shared/interfaces/user.repository';
import { Users } from '../../../database/entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserSQLRepository implements IUserRepository {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async registerUser(dto: CreateUserDto): Promise<UserDto> {
    const user = this.usersRepository.create(dto);

    return await this.usersRepository.save(user);
  }

  async getById(id: string): Promise<UserDto> {
    return await this.usersRepository.findOne({ where: { _id:id } });
  }

  async updateById(id: string, user: UpdateUserDto): Promise<UserDto> {
    const userToUpdate = await this.usersRepository.findOne({ where: { _id:id } });
    userToUpdate.username = user.username;
    userToUpdate.name = user.name;
    userToUpdate.lastname = user.lastname;
    userToUpdate.email = user.email;
    await this.usersRepository.save(userToUpdate);
    delete userToUpdate.password;
    return userToUpdate;
  }

  async deleteById(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
