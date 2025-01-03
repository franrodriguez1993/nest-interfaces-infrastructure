import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUserRepository } from '../../shared/interfaces/user.repository';
import { HashService } from '../../shared/utils/hash.service';
import { ModuleRef } from '@nestjs/core';
import { IIdGenerator } from '../../shared/interfaces/id-generator';

@Injectable()
export class UsersService {
  private hashService: HashService;
  constructor(
    @Inject('UserRepository') private readonly userRepository: IUserRepository,
    @Inject('IdGenerator') private readonly idGenerator: IIdGenerator,
    private readonly moduleRef: ModuleRef,
  ) {}

  onModuleInit() {
    this.hashService = this.moduleRef.get(HashService, { strict: false });
  }
  async create(createUserDto: CreateUserDto) {
    const password = await this.hashService.encrypt(createUserDto.password);
    return await this.userRepository.registerUser({
      ...createUserDto,
      password,
      _id: this.idGenerator.generate(),
    });
  }

  findOne(id: string) {
    return this.userRepository.getById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepository.updateById(id, updateUserDto);
  }

  remove(id: string) {
    return this.userRepository.deleteById(id);
  }
}
