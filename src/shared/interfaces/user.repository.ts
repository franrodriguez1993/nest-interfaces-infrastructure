import { CreateUserRepositoryDto } from '../../modules/users/dto/create-user-repository.dto';
import { UpdateUserDto } from '../../modules/users/dto/update-user.dto';
import { UserDto } from '../../modules/users/dto/user.dto';

export interface IUserRepository {
  registerUser: (dto: CreateUserRepositoryDto) => Promise<UserDto>;
  getById: (id: string) => Promise<UserDto>;
  updateById: (id: string, user: UpdateUserDto) => Promise<UserDto>;
  deleteById: (id: string) => Promise<void>;
}
